import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    clerkId: v.string(),     // Unique ID from Clerk
    email: v.string(),
    firstName: v.optional(v.string()),
    lastName: v.optional(v.string()),
    role: v.union(v.literal("landlord"), v.literal("viewer")),
  }).index("by_clerk_id", ["clerkId"]),

  listings: defineTable({
    title: v.string(),
    description: v.string(),
    price: v.number(),
    location: v.string(),
    bedrooms: v.number(),
    bathrooms: v.number(),
    type: v.union(v.literal("sell"), v.literal("rent"), v.literal("bnb")),
    images: v.optional(v.array(v.id("_storage"))),
    storageId: v.optional(v.id("_storage")),
    userId: v.id("users"),       // Relationship: Foreign key to users table
    createdAt: v.number(),
  }).index("by_user", ["userId"])
    .searchIndex("search_title", {
      searchField: "title",
      filterFields: ["type"],
    }),
});
