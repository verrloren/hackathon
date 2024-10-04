import { motion } from "framer-motion";
import {
  Card,
  CardDescription,
  CardFooter,

  CardHeader,
  CardTitle,
} from "@/components/ui/card";
// import Image from "next/image";
import usePreviewModal from "@/hooks/use-preview-modal";

interface ListingCardProps {
  hotel: {
    hotel_name: string;
    room_name: string;
    meal: string;
    price: number;
    yandex_price: number;
    yandex_name: string;
    price_diff: number;
    percentage_price_diff: number;
    checkin: string | number | null;
    checkout: string | number | null;
  };
  index: number;
}

function ListingCard({ hotel, index }: ListingCardProps) {
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
      <Card
        onClick={() => previewModal.onOpen(hotel)}
        className="overflow-hidden cursor-pointer h-auto -z-50 group"
      >

        <CardHeader>
          <CardTitle className="z-10 text-2xl text-neutral-900 dark:text-neutral-50">
					{hotel.hotel_name}
          </CardTitle>
          <CardDescription className="z-10 text-sm dark:text-neutral-400 text-neutral-600">
						<span className="text-neutral-400">{hotel.room_name}</span> <br />
            {hotel.yandex_name} · {hotel.meal} meal plan
          </CardDescription>
        </CardHeader>

        <CardFooter className="z-10 text-xl dark:text-neutral-50 text-neutral-900 flex flex-col items-start gap-y-4">
          Our {hotel.price}$ <br /> Yandex price {hotel.yandex_price}$<br /> Difference{" "}
          <span className="text-sm text-neutral-600 dark:text-neutral-400">{hotel.price_diff}. <br /> Diff is {hotel.percentage_price_diff}%</span>
        </CardFooter>
      </Card>
    </motion.div>
  );
}

export default ListingCard;
