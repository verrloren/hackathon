"use client";

import usePreviewModal from "@/hooks/use-preview-modal";
import Modal from "./ui/modal";
import Image from "next/image";
import OverviewChart from "./overview-chart";
import { overviewChartData } from "@/lib/data";

export function PreviewModal() {
  const previewModal = usePreviewModal();
  const listing = usePreviewModal((state) => state.data);

  if (!listing) return null;

  return (
    <Modal open={previewModal.isOpen} onClose={previewModal.onClose}>
      <div className="w-full h-full flex flex-col">
        {/* CARD */}
					<div className="w-full flex items-center justify-evently gap-x-8">
						{/* IMAGE */}
							<Image
								width={200}
								height={400}
								alt="Listing"
								src={listing.url ?? ""}
								className=" h-full w-1/2
												 rounded-xl brightness-[.85]"
							/>
						{/* INFO */}
						<div className="flex gap-y-4 flex-col">
							<h3 className="z-10 text-4xl font-semibold mt-40 text-neutral-50">
								{listing.title}
							</h3>
							<p className="z-10 text-sm text-slate-300">
								{listing.numberOfGuests} Guests · {listing.numberOfRooms} Rooms
							</p>
							<h5 className="z-10 text-xl text-neutral-50">{listing.price}$</h5>
						</div>
					</div>
        {/* STATS */}
        <div className="w-full  my-8 border-t border-border flex flex-col ">
          <div className="mx-8">
            <h3 className="text-4xl my-8 text-neutral-50">Stats</h3>
            <div className="w-full flex flex-row items-center justify-between gap-x-4">
              <div className="w-full h-[22rem]">
								<OverviewChart data={overviewChartData} />
							</div>
							{/* <div className="w-1/3">prices comparison</div> */}
						</div>	
          </div>
        </div>
      </div>
    </Modal>
  );
}
