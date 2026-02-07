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
                     
                    {listing.phone && (
                        <div className="mt-4 space-y-3">
                             <a 
                                href={`https://wa.me/${listing.phone.replace(/\D/g, '')}`} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="flex items-center justify-center w-full bg-[#25D366] text-white py-4 rounded-xl font-bold text-lg hover:bg-[#128C7E] transition-transform active:scale-95 shadow-md"
                            >
                                <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.015-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                                </svg>
                                Chat on WhatsApp
                            </a>
                            <a 
                                href={`tel:${listing.phone}`} 
                                className="flex items-center justify-center w-full bg-white text-black border border-gray-200 py-4 rounded-xl font-bold text-lg hover:bg-gray-50 transition-colors"
                            >
                                <svg className="w-6 h-6 mr-2 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                Call {listing.phone}
                            </a>
                        </div>
                    )}
                    
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
