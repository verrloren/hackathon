"use client";
import ListingCard from "./listing-card";
import { imgURL, fallbackImage } from "@/lib/data";
import { useQuery } from "@tanstack/react-query";
import { Hotel } from "@/lib/types";
import { getHotelsAction } from "@/modules/hotels/get-hotels-action";
import { useAuth } from "@/hooks/use-auth";

export function CardSection() {
  const { userId, isAuthenticated, isLoading: isAuthLoading } = useAuth();
  
  const { data: hotels = [], isLoading: isHotelsLoading, error } = useQuery<Hotel[]>({
    queryKey: ['hotels', userId],
    queryFn: () => getHotelsAction(userId),
    enabled: !!userId && isAuthenticated,
  });

  if (isAuthLoading || isHotelsLoading) {
    return <div className="text-3xl text-center mt-32">Loading...</div>;
  }
  if (error) return <div>Error: {error.toString()}</div>; // Render error as string
  if (hotels.length === 0) return <div className="my-8">No hotels found</div>; 
  return (
    <div
      className="my-8 grid grid-cols-1 -z-50 sm:grid-cols-2
			md:grid-cols-3 lg:grid-cols-3 2xl:grid-cols-4 gap-4 "
    >
      {hotels.map((hotel: Hotel, index: number) => (
				<ListingCard 
          key={hotel.index} 
          url={imgURL[index % imgURL.length] || fallbackImage} 
          hotel={hotel} 
          index={index} 
        />
			))}

    </div>
  );
}
