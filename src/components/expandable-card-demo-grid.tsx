"use client";
import Image from "next/image";
import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "@/hooks/use-outside-click";
import { imgURL, fallbackImage } from "@/lib/data";
import { useQuery } from "@tanstack/react-query";
import { Hotel } from "@/lib/types";
import { getHotelsAction } from "@/modules/hotels/get-hotels-action";
import { useAuth } from "@/hooks/use-auth";

export function ExpandableCardDemo() {
  const { userId, isAuthenticated, isLoading: isAuthLoading } = useAuth();
  const [activeHotel, setActiveHotel] = useState<Hotel | null>(null);
  const id = useId();
  const ref = useRef<HTMLDivElement>(null);
  
  const { data: hotels = [], isLoading: isHotelsLoading, error } = useQuery<Hotel[]>({
    queryKey: ['hotels', userId],
    queryFn: () => getHotelsAction(userId),
    enabled: !!userId && isAuthenticated,
  });

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActiveHotel(null);
      }
    }

    if (activeHotel) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeHotel]);

  useOutsideClick(ref, () => setActiveHotel(null));

  if (isAuthLoading || isHotelsLoading) {
    return <div className="text-3xl text-center mt-32">Loading...</div>;
  }
  if (error) return <div>Error: {error.toString()}</div>;
  if (hotels.length === 0) return <div className="my-8">No hotels found</div>;

  return (
    <>
      <AnimatePresence>
        {activeHotel && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 h-full w-full z-10"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {activeHotel ? (
          <div className="fixed inset-0 grid place-items-center z-[100]">
            <motion.button
              key={`button-${activeHotel.index}-${id}`}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex absolute top-2 right-2 lg:hidden items-center justify-center bg-white rounded-full h-6 w-6"
              onClick={() => setActiveHotel(null)}
            >
              <CloseIcon />
            </motion.button>
            <motion.div
              layoutId={`card-${activeHotel.index}-${id}`}
              ref={ref}
              className="w-full max-w-[500px] h-full md:h-fit md:max-h-[90%] flex flex-col bg-white dark:bg-neutral-900 sm:rounded-3xl overflow-hidden"
            >
              <motion.div layoutId={`image-${activeHotel.index}-${id}`}>
                <Image
                  priority
                  width={500}
                  height={300}
                  src={imgURL[hotels.indexOf(activeHotel) % imgURL.length] || fallbackImage}
                  alt={activeHotel.hotel_name}
                  className="w-full h-80 lg:h-80 sm:rounded-tr-lg sm:rounded-tl-lg object-cover object-top"
                />
              </motion.div>

              <div>
                <div className="flex justify-between items-start p-4">
                  <div>
                    <motion.h3
                      layoutId={`title-${activeHotel.index}-${id}`}
                      className="font-medium text-neutral-700 dark:text-neutral-200 text-base"
                    >
                      {activeHotel.hotel_name}
                    </motion.h3>
                    <motion.p
                      layoutId={`description-${activeHotel.index}-${id}`}
                      className="text-neutral-600 dark:text-neutral-400 text-base"
                    >
                      {activeHotel.room_name}
                    </motion.p>
                  </div>

                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="px-4 py-3 text-sm rounded-full font-bold bg-green-500 text-white"
                  >
                    {Math.floor(activeHotel.percentage_price_diff ?? 0)}% diff
                  </motion.div>
                </div>
                <div className="pt-4 relative px-4">
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-neutral-600 text-xs md:text-sm lg:text-base h-40 md:h-fit pb-10 flex flex-col items-start gap-4 overflow-auto dark:text-neutral-400"
                  >
                    <p>Ostrovok price: {activeHotel.price}₽</p>
                    <p>Yandex price: {activeHotel.yandex_price}₽</p>
                    <p>Price difference: {activeHotel.price_diff}₽</p>
                    {activeHotel.meal && <p>Meal plan: {activeHotel.meal}</p>}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
      <ul className="max-w-6xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 items-start gap-4">
        {hotels.map((hotel, i) => (
          <motion.div
            layoutId={`card-${hotel.index}-${id}`}
            key={hotel.index}
            onClick={() => setActiveHotel(hotel)}
            className="p-4 flex flex-col hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-xl cursor-pointer"
          >
            <div className="flex gap-4 flex-col w-full">
              <motion.div layoutId={`image-${hotel.index}-${id}`}>
                <Image
                  width={400}
                  height={300}
                  src={imgURL[i % imgURL.length] || fallbackImage}
                  alt={hotel.hotel_name}
                  className="h-60 w-full rounded-lg object-cover object-top"
                />
              </motion.div>
              <div className="flex justify-between items-start">
                <div>
                  <motion.h3
                    layoutId={`title-${hotel.index}-${id}`}
                    className="font-medium text-neutral-800 dark:text-neutral-200 text-base"
                  >
                    {hotel.hotel_name}
                  </motion.h3>
                  <motion.p
                    layoutId={`description-${hotel.index}-${id}`}
                    className="text-neutral-600 dark:text-neutral-400 text-base"
                  >
                    {hotel.room_name}
                  </motion.p>
                </div>
                <div className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                  {Math.floor(hotel.percentage_price_diff ?? 0)}% diff
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </ul>
    </>
  );
}

export const CloseIcon = () => {
  return (
    <motion.svg
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
        transition: {
          duration: 0.05,
        },
      }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 text-black"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </motion.svg>
  );
};
