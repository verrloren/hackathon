"use client";
import Image from "next/image";
import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "@/hooks/use-outside-click";
import { imgURL, fallbackImage, overviewChartData } from "@/lib/data";
import { useQuery } from "@tanstack/react-query";
import { Hotel } from "@/lib/types";
import { getHotelsAction } from "@/modules/hotels/get-hotels-action";
import { useAuth } from "@/hooks/use-auth";
import OverviewChart from "./overview-chart";
import { formatPrice } from "@/lib/utils";
import { ArrowTopRightIcon } from "@radix-ui/react-icons";

export function ExpandableCardDemo() {
  const { userId, isAuthenticated, isLoading: isAuthLoading } = useAuth();
  const [activeHotel, setActiveHotel] = useState<Hotel | null>(null);
  const id = useId();
  const ref = useRef<HTMLDivElement>(null);

  const {
    data: hotels = [],
    isLoading: isHotelsLoading,
    error,
  } = useQuery<Hotel[]>({
    queryKey: ["hotels", userId],
    queryFn: () => getHotelsAction(userId),
    enabled: !!userId && isAuthenticated,
  });
	console.log(hotels)

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
            className="fixed inset-0 bg-black/40 h-full w-full z-10"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {activeHotel ? (
          <div className="fixed inset-0 grid place-items-center z-[100]">
            {/* <motion.button
              key={`button-${activeHotel.index}-${id}`}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex absolute top-2 right-2 lg:hidden items-center justify-center bg-white rounded-full h-6 w-6"
              onClick={() => setActiveHotel(null)}
            >
              <CloseIcon />
            </motion.button> */}

            {/* CARD BODY */}
            <motion.div
              layoutId={`card-${activeHotel.index}-${id}`}
              ref={ref}
              className="w-full max-w-[800px] h-full md:h-fit md:max-h-[90%] flex flex-col bg-background sm:rounded-3xl overflow-hidden overflow-y-scroll"
            >
              <motion.div layoutId={`image-${activeHotel.index}-${id}`}>
                <Image
                  priority
                  width={500}
                  height={300}
                  src={
                    imgURL[hotels.indexOf(activeHotel) % imgURL.length] ||
                    fallbackImage
                  }
                  alt={activeHotel.hotel_name}
                  className="w-full h-80 lg:h-80 sm:rounded-tr-lg sm:rounded-tl-lg object-cover object-top"
                />
              </motion.div>

              {/* CONTENT */}
              <div className="mt-8 px-8">
                {/* HEADER */}
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <motion.h3
                      layoutId={`title-${activeHotel.index}-${id}`}
                      className="font-medium font-manrope text-neutral-900 dark:text-white text-4xl"
                    >
                      {activeHotel.hotel_name}
                    </motion.h3>
                  </div>

                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="group w-12 h-12 text-sm rounded-full font-bold bg-secondary cursor-pointer text-foreground flex justify-center items-center"
                  >
                    <ArrowTopRightIcon className="transition-transform duration-200 ease-out group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </motion.div>
                </div>

                <div className="pt-4 relative">
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-neutral-600 text-xs md:text-sm lg:text-base h-40 md:h-fit pb-10 pt-4 
										flex flex-col items-start gap-4 dark:text-neutral-400"
                  >
                    <div className="flex justify-between items-start gap-x-12">
                      {/* DESCRIPTION */}
                      <div className="w-2/5">
                        <motion.p
                          layoutId={`description-${activeHotel.index}-${id}`}
                          className="font-light font-manrope text-textGrayDark pb-3 text-lg"
                        >
                          {activeHotel.room_name}
                        </motion.p>
                        <p className="text-textGray text-sm font-light font-manrope">
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Harum veritatis voluptatem vel aspernatur dicta
                          illo pariatur totam, ex fuga est, voluptates hic sint
                          nam quos odio, nesciunt laborum doloribus ducimus!
                        </p>
                        {activeHotel.meal && (
                          <p className="text-textGray font-manrope font-light text-sm">
                            Meal plan: {activeHotel.meal}
                          </p>
                        )}
                      </div>
                      {/* COMPARISON */}
                      <motion.div
											                      layoutId={`comparison-${activeHotel.index}-${id}`}
                        className="w-[50%] flex flex-col items-start justify-center rounded-2xl 
                         gap-y-1 bg-secondary py-8 px-8 "
                      >
                        <p className=" font-manrope font-light text-base flex items-end w-full">
                          <span className="text-textDark">Ostrovok:</span>
                          <span className="flex-grow mx-2 border-b border-dashed border-textGray/50 mb-1"></span>
                          <span className="text-foreground">
                            {formatPrice(activeHotel.price)}₽
                          </span>
                        </p>
                        <p className="font-manrope font-light text-base flex items-end w-full">
                          <span className="text-textGray">vs </span><span className="text-dar ml-1"> Yandex:</span>
                          <span className="flex-grow mx-3 border-b border-dashed border-textGray/50 mb-1"></span>
                          <span className="text-foreground">
                            {formatPrice(activeHotel.yandex_price!)} ₽
                          </span>
                        </p>
                        <p className="font-manrope font-light text-base flex items-end w-full">
                          <span className="text-textGrayDark"><span className="text-textGray">vs</span> Booking:</span>
                          <span className="flex-grow mx-2 border-b border-dashed border-textGray/50 mb-1"></span>
                          <span className="text-foreground">
                            {formatPrice(activeHotel.yandex_price!)} ₽
                          </span>
                        </p>
                        <p className="font-manrope font-light text-base flex justify-between w-full ">
												<p><span className="text-textGray">= </span><span className="text-textGrayDark"> Difference:</span></p>
												<span className="flex-grow mx-2 border-b border-dashed border-textGray/50 mb-1"></span>

                          {activeHotel.price_diff! == 0 ? (
                            <p className="text-foreground">0 ₽</p>
                          ) : (
                            activeHotel.price_diff! < 0 
                            ? <p className="text-red-400">{formatPrice(activeHotel.price_diff!)}</p>
                            : <p className="text-green-400">{formatPrice(activeHotel.price_diff!)}</p>
                             + "₽"
                          )}
                        </p>
                        {/* <p className="text-textGrayDark font-manrope font-light text-lg ">
                          {activeHotel.price_diff! == 0 ? <p className="text-textGray">= 0</p> : ('= Difference:' + formatPrice(activeHotel.price_diff!) + '₽')}
                        </p> */}
                      </motion.div>
                    </div>

                    <div className="w-full  mt-4">
                      <div className="w-full h-[22rem] mt-4">
                        <h5 className="font-medium font-manrope text-neutral-900 dark:text-neutral-200 text-2xl pb-8">
                          Stats for last week
                        </h5>
                        <OverviewChart data={overviewChartData} />
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>

      {/* GRID */}
      <ul className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 items-start gap-4">
        {hotels.map((hotel, i) => (
          <motion.div
            layoutId={`card-${hotel.index}-${id}`}
            key={hotel.index}
            onClick={() => setActiveHotel(hotel)}
            className="group p-4 flex flex-col rounded-xl cursor-pointer relative"
            whileHover={{
              scale: 1.02,
              transition: { duration: 0.2 },
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.4,
            }}
          >
            <div className="flex gap-4 flex-col w-full">
              <motion.div
                className="relative overflow-hidden rounded-2xl"
                layoutId={`image-${hotel.index}-${id}`}
              >
                <Image
                  width={400}
                  height={300}
                  src={imgURL[i % imgURL.length] || fallbackImage}
                  alt={hotel.hotel_name}
                  className="h-60 w-full object-cover object-top transform transition-transform duration-300 group-hover:scale-110"
                />
                <div
                  className="absolute bottom-3 left-3 backdrop-blur-md text-white bg-black/40
                  rounded-xl font-outfit font-light py-1 px-3"
                >
                  {formatPrice(hotel.price)} ₽
                </div>
              </motion.div>

              <div className="flex justify-between items-start group-hover:translate-x-2 transition-transform duration-200">
                <div>
                  <motion.h3
                    layoutId={`title-${hotel.index}-${id}`}
                    className="font-medium font-manrope text-neutral-900 dark:text-neutral-200 text-base"
                  >
                    {hotel.hotel_name}
                  </motion.h3>
                  <motion.p
                    layoutId={`description-${hotel.index}-${id}`}
                    className="text-textGray font-manrope font-light text-sm mt-1"
                  >
                    {hotel.room_name}
                  </motion.p>
                </div>
              </div>
            </div>

            {/* Hover gradient overlay */}
            <div className="absolute inset-0  rounded-xl transition-opacity duration-300 opacity-0 group-hover:opacity-100 bg-gradient-to-t from-black/5 to-transparent dark:from-white/5" />
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
