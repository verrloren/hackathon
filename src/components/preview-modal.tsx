"use client";

import usePreviewModal from "@/hooks/use-preview-modal";
import Modal from "./ui/modal";
import OverviewChart from "./overview-chart";
import { overviewChartData } from "@/lib/data";

export function PreviewModal() {
  const previewModal = usePreviewModal();
  // const listing = usePreviewModal((state) => state.data);


  // if (!listing) return null;

  return (
    <Modal open={previewModal.isOpen} onClose={previewModal.onClose}>

        {/* STATS */}
          <div className="w-full h-full mx-8 flex flex-col">
            <h3 className="text-4xl my-8 dark:text-neutral-50 text-neutral-800">Stats</h3>
            <div className="w-full flex flex-row items-center justify-between gap-x-4">
              <div className="w-full h-[22rem]">
								<OverviewChart data={overviewChartData} />
							</div>
						</div>	
          </div>
    </Modal>
  );
}
