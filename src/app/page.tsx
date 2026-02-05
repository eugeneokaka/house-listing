"use client";

import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const listings = useQuery(api.listings.list);

  return (
    <div className="min-h-screen bg-white text-black transition-colors duration-300">
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 text-center lg:pt-48 lg:px-12">
        <div className="max-w-4xl mx-auto space-y-6">
          <h1 className="text-5xl font-bold tracking-tight text-zinc-900 sm:text-6xl md:text-7xl font-sans">
            Find your place in the world.
          </h1>
          <p className="text-xl text-zinc-500 max-w-2xl mx-auto font-light">
            Discover a curated collection of premium properties. minimalist design, maximum comfort.
          </p>
          
          {/* Search Bar (Visual/Functional Placeholder) */}
          <div className="mt-10 max-w-lg mx-auto relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              className="block w-full pl-11 pr-4 py-4 bg-white border border-gray-200 rounded-full text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent shadow-lg transition-shadow group-hover:shadow-xl"
              placeholder="Search by city, neighborhood, or address..."
            />
             <button className="absolute right-2 top-2 bottom-2 bg-black text-white px-6 rounded-full text-sm font-medium hover:bg-zinc-800 transition-colors">
              Search
            </button>
          </div>
        </div>
      </section>

      {/* Listings Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-semibold text-zinc-900">Latest Arrivals</h2>
            <Link href="#" className="text-sm font-medium text-zinc-500 hover:text-zinc-900 underline underline-offset-4">
                View all properties
            </Link>
        </div>

        {!listings ? (
          // Loading State Skeleton
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-200 h-64 rounded-2xl mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        ) : listings.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl text-gray-500">No listings found yet.</p>
            <Link href="/create-listing" className="mt-4 inline-block text-blue-600 hover:underline">
              Be the first to create one!
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {listings.map((listing) => (
              <Link 
                href={`/listings/${listing._id}`}
                key={listing._id} 
                className="group cursor-pointer bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                {/* Image Container */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-100">
                  {listing.imageUrl ? (
                    <Image
                      src={listing.imageUrl}
                      alt={listing.title}
                      fill
                      unoptimized
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                        No Image
                    </div>
                  )}
                  <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-white shadow-sm uppercase tracking-wider">
                    {listing.type || "Sell"}
                  </div>
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-black shadow-sm">
                    ${listing.price.toLocaleString()}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold text-zinc-900 line-clamp-1 group-hover:text-blue-600 transition-colors">
                        {listing.title}
                    </h3>
                  </div>
                  
                  <div className="flex items-center text-gray-500 text-sm mb-4">
                    <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {listing.location}
                  </div>

                  <div className="flex items-center gap-4 text-sm text-gray-600 border-t border-gray-100 pt-4">
                    <div className="flex items-center gap-1">
                      <span className="font-semibold text-zinc-900">{listing.bedrooms}</span> Beds
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="font-semibold text-zinc-900">{listing.bathrooms}</span> Baths
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
