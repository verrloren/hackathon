"use client";
import { useEffect, useState } from "react";
import ListingCard from "./listing-card";
import { listings } from "@/lib/data";
import Container from "./container";

type HotelData = {
  title: string;
  body: string;
};

export default function CardSection() {
  const [data, setData] = useState<HotelData>({
    title: "",
    body: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts/1")
      .then((res) => res.json())
      .then((val) => {
        setData(val);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message); // Convert error to string
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="mt-4">Loading...</div>;
  if (error) return <div>Error: {error}</div>; // Render error as string
  if (listings.length === 0) return <div>No listings found</div>;
  return (
      <div
        className="my-8 grid grid-cols-1 -z-50 sm:grid-cols-2
			md:grid-cols-3 lg:grid-cols-3 2xl:grid-cols-4 gap-4 "
      >
        {listings.map((listing) => {
          return (
            <>
              <ListingCard key={data.title} listing={listing} index={2} />
            </>
          );
        })}
      </div>
  );
}
