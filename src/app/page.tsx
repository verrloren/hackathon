import CardSection from "@/components/card-section";
import Container from "@/components/container";
import Header from "@/components/header/header";
// import PythonOutput from "@/components/python-output";
import getHotels from "@/hooks/getHotels";
import getNotifications from "@/hooks/getNotification";
import { db } from "@/lib/db";
import { Notification } from "@/lib/types";
import { auth } from "../../auth";
import { redirect } from "next/navigation";
import ExpandableCardDemo from '../components/expandable-card-demo-grid';

export default async function HomePage() {

	const session = await auth();
	const userId = session?.user?.id;

	if (!userId) {
		redirect('/auth/login')
	}

	const hotels = await getHotels({
		hotel_name: '',
		hotel_id: '',
		room_name: '',
		price: 0,
		meal: '',
		yandex_name: '',
		yandex_price: 0,
		price_diff: 0,
		percentage_price_diff: 0,
		checkin: 0,
		checkout: 0,
		})

	const percentageDiff: number = Math.max(...hotels.map((hotel) => hotel.percentage_price_diff ?? 0));
	if (percentageDiff > 5) {

		await db.notification.create({
			data: {
				userId: session?.user?.id as string,
				message: 'Price difference is greater than 5%',
			}
		});
	}

	const notifications: Notification[] = await getNotifications({
		id: '',
		message: '',
	})


  return (
    <>
      <Header notifications={notifications} />
			<Container>
				<CardSection hotels={hotels} />
				{/* <ExpandableCardDemo /> */}
				
				{/* <PythonOutput /> */}
			</Container>
    </>
  );
}