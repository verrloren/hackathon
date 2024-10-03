import { motion } from "framer-motion";
import {
  Card,
  // CardContent,
  // CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import usePreviewModal from "@/hooks/use-preview-modal";

interface ListingCardProps {
  listing: {
    title: string;
    numberOfGuests: number;
    price: number;
    numberOfRooms: number;
    url?: string | null;
  };
  index: number;
}

function ListingCard({ listing, index }: ListingCardProps) {

	const previewModal = usePreviewModal();

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: index % 2 === 0 ? 25 : -25,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        transition: {
          duration: 1,
        },
      }}
      viewport={{ once: true }}
    >
      <Card onClick={() => previewModal.onOpen(listing)} className="overflow-hidden cursor-pointer h-64 -z-50 group">
        <Image
          fill
          alt="Listing"
          src={listing.url ?? ""}
          className="object-cover h-full w-full z-0
						group-hover:scale-105 transition rounded-xl brightness-[.85] will-change-auto"
        />
        <CardHeader>
          <CardTitle className="z-10 text-3xl mt-40 text-neutral-50">
            {listing.title}
          </CardTitle>
          {/* <CardDescription className="z-10 text-sm text-slate-300">
            {listing.numberOfGuests} Guests · {listing.numberOfRooms} Rooms
          </CardDescription> */}
        </CardHeader>
        {/* <CardContent className="z-10 text-xl text-neutral-50">{listing.price}$</CardContent> */}
      </Card>
    </motion.div>
  );
}

export default ListingCard;
