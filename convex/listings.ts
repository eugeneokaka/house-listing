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
    storageId: v.id("_storage"),
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

// 3. List all listings with image URLs
export const list = query({
  args: {},
  handler: async (ctx) => {
    const listings = await ctx.db.query("listings").collect();
    
    // Map over listings to generate the image URL
    return await Promise.all(
      listings.map(async (listing) => ({
        ...listing,
        imageUrl: await ctx.storage.getUrl(listing.storageId),
      }))
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
    let imageUrl = null;
    if (listing.storageId) {
      imageUrl = await ctx.storage.getUrl(listing.storageId);
    }
    return {
      ...listing,
      imageUrl,
    };
  },
});
