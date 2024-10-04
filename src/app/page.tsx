import CardSection from "@/components/card-section";
import Container from "@/components/container";
import Header from "@/components/header/header";
// import PythonOutput from "@/components/python-output";
import getHotels from "@/hooks/getHotels";
import getNotifications from "@/hooks/getNotification";
import { NotificationProps } from "@/lib/types";

export default async function HomePage() {


	const notifications: NotificationProps[] = await getNotifications({
		id: '',
		message: '',
	})

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



  return (
    <>
      <Header notifications={notifications} />
			<Container>
				<CardSection hotels={hotels} />
				{/* <PythonOutput /> */}
			</Container>
    </>
  );
}