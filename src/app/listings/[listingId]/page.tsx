"use client";

import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function ListingDetailPage() {
  const params = useParams();
  const listingId = params.listingId as Id<"listings">;
  
  const listing = useQuery(api.listings.getListing, { id: listingId });

  if (listing === undefined) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
         <div className="animate-pulse flex flex-col items-center">
            <div className="h-4 bg-gray-200 rounded w-32 mb-4"></div>
            <div className="h-64 bg-gray-200 rounded w-96"></div>
         </div>
      </div>
    );
  }

  if (listing === null) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center text-center p-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Listing Not Found</h1>
        <p className="text-gray-500 mb-8">The property you are looking for does not exist or has been removed.</p>
        <Link href="/" className="px-6 py-3 bg-black text-white rounded-full font-medium hover:bg-zinc-800 transition-colors">
          Back to Listings
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-black font-sans pb-20">
      {/* Navigation Bar Placeholder (if needed, or just back button) */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
             <Link href="/" className="text-sm font-medium text-gray-500 hover:text-black transition-colors flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Home
             </Link>
             <div className="font-bold text-lg tracking-tight">HouseListings</div>
             {/* Placeholder for Auth/Profile if needed */}
             <div className="w-8"></div> 
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* Title and Price Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
                <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-2">{listing.title}</h1>
                <div className="flex items-center text-gray-500">
                    <svg className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="text-lg">{listing.location}</span>
                </div>
            </div>
            <div className="text-left md:text-right">
                <div className="text-4xl font-bold text-gray-900">KSh {listing.price.toLocaleString()}</div>
                <div className="text-gray-500 font-medium capitalize">{listing.type}</div>
            </div>
        </div>

        {/* Gallery Section */}
        {/* Gallery Section - Grid of Images */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
            {listing.imageUrls && listing.imageUrls.length > 0 ? (
                listing.imageUrls.map((url, index) => (
                    <div key={index} className={`relative w-full ${index === 0 ? 'col-span-1 md:col-span-2 aspect-[16/9]' : 'aspect-[4/3]'} bg-gray-100 rounded-3xl overflow-hidden shadow-lg`}>
                        <Image
                            src={url!}
                            alt={`${listing.title} - Image ${index + 1}`}
                            fill
                            className="object-cover"
                            priority={index === 0}
                            unoptimized
                        />
                    </div>
                ))
            ) : (
                <div className="col-span-1 md:col-span-2 relative w-full aspect-[16/9] bg-gray-100 rounded-3xl overflow-hidden shadow-lg flex items-center justify-center text-gray-400">
                    No Image Available
                </div>
            )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
                
                {/* Specs */}
                <div className="flex flex-wrap gap-8 py-8 border-y border-gray-100">
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-gray-50 rounded-full">
                            <svg className="w-6 h-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 font-medium">Bedrooms</p>
                            <p className="text-xl font-bold text-gray-900">{listing.bedrooms}</p>
                        </div>
                    </div>
                     <div className="flex items-center gap-3">
                        <div className="p-3 bg-gray-50 rounded-full">
                            <svg className="w-6 h-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 font-medium">Bathrooms</p>
                            <p className="text-xl font-bold text-gray-900">{listing.bathrooms}</p>
                        </div>
                    </div>
                </div>

                {/* Description */}
                <div>
                     <h2 className="text-2xl font-bold text-gray-900 mb-6">About this home</h2>
                     <div className="prose prose-lg text-gray-600 leading-relaxed whitespace-pre-line">
                         {listing.description}
                     </div>
                </div>

            </div>

            {/* Sidebar / Contact Card */}
            <div className="lg:col-span-1">
                <div className="sticky top-24 bg-white border border-gray-100 rounded-2xl shadow-xl p-8">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Interested in this property?</h3>
                    <p className="text-gray-500 mb-6 font-light">Contact the owner to schedule a viewing or ask questions.</p>
                    
                    <button className="w-full bg-black text-white py-4 rounded-xl font-bold text-lg hover:bg-zinc-800 transition-transform active:scale-95 shadow-md">
                        Request a Tour
                    </button>
                     <button className="w-full mt-4 bg-white text-black border border-gray-200 py-4 rounded-xl font-bold text-lg hover:bg-gray-50 transition-colors">
                        Contact Owner
                    </button>
                    
                    <div className="mt-6 text-center text-sm text-gray-400">
                        Listed {new Date(listing.createdAt).toLocaleDateString()}
                    </div>
                </div>
            </div>

        </div>

      </main>
    </div>
  );
}
