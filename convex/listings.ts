import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// 1. Generate Upload URL (Step 1 of upload flow)
export const generateUploadUrl = mutation(async (ctx) => {
  return await ctx.storage.generateUploadUrl();
});

// 2. Create Listing (Step 3: Save storage ID and details)
export const createListing = mutation({
  args: {
    title: v.string(),
    description: v.string(),
    price: v.number(),
    location: v.string(),
    bedrooms: v.number(),
    bathrooms: v.number(),
    type: v.union(v.literal("sell"), v.literal("rent"), v.literal("bnb")),
    images: v.array(v.id("_storage")),
    phone: v.string(),
    userId: v.id("users"), // We pass the internal Convex User ID
  },
  handler: async (ctx, args) => {
    const listingId = await ctx.db.insert("listings", {
      ...args,
      createdAt: Date.now(),
    });
    return listingId;
  },
});

// 3. List all listings with image URLs (supports search and filtering)
export const list = query({
  args: {
    search: v.optional(v.string()),
    type: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    let listings;

    if (args.search) {
      // Search with text
      listings = await ctx.db
        .query("listings")
        .withSearchIndex("search_title", (q) => {
          let searchBuilder = q.search("title", args.search!);
          if (args.type) {
            searchBuilder = searchBuilder.eq("type", args.type as "sell" | "rent" | "bnb");
          }
          return searchBuilder;
        })
        .collect();
    } else if (args.type) {
      // Filter by type only
      listings = await ctx.db
        .query("listings")
        .filter((q) => q.eq(q.field("type"), args.type))
        .collect();
    } else {
      // Get all
      listings = await ctx.db.query("listings").collect();
    }
    
    // Map over listings to generate the image URL
    return await Promise.all(
      listings.map(async (listing) => {
        const images = listing.images || (listing.storageId ? [listing.storageId] : []);
        const imageUrls = await Promise.all(
          images.map((storageId) => ctx.storage.getUrl(storageId))
        );
        return {
          ...listing,
          imageUrls,
        };
      })
    );
  },
});

export const getListing = query({
  args: { id: v.id("listings") },
  handler: async (ctx, args) => {
    const listing = await ctx.db.get(args.id);
    if (!listing) {
      return null;
    }
    const images = listing.images || (listing.storageId ? [listing.storageId] : []);
    const imageUrls = await Promise.all(
      images.map((storageId) => ctx.storage.getUrl(storageId))
    );
    return {
      ...listing,
      imageUrls,
    };
  },
});
