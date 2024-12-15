import { CardSection } from "@/components/card-section";
import Container from "@/components/container";
import Header from "@/components/header/header";
// import PythonOutput from "@/components/python-output";
// import { getHotelsAction } from "@/hooks/get-hotels-action";
// import getNotifications from "@/hooks/getNotification";
// import { db } from "@/lib/db";
// import { Notification } from "@/lib/types";
// import { auth } from "../../auth";
// import { redirect } from "next/navigation";
import { HydrationBoundary, dehydrate } from '@tanstack/react-query'
// import {ExpandableCardDemo} from '../components/expandable-card-demo-grid';
import { isAuth } from "@/modules/auth/is-auth";
import { getQueryClient } from "@/shared/get-query-client";
import { getHotelsAction } from "@/modules/hotels/get-hotels-action";

export default async function HomePage() {

  const { userId, isAuthenticated } = await isAuth();

	if (!isAuthenticated) return null;

	const queryClient = getQueryClient();

	await queryClient.prefetchQuery({
		queryKey: ['hotels', userId],
		queryFn: () => getHotelsAction(userId)
	})


	// const percentageDiff: number = Math.max(...hotels.map((hotel) => hotel.percentage_price_diff ?? 0));
	// if (percentageDiff > 5) {

	// 	await db.notification.create({
	// 		data: {
	// 			userId: userId,
	// 			message: 'Price difference is greater than 5%',
	// 		}
	// 	});
	// }

	// const notifications: Notification[] = await getNotifications({
	// 	id: '',
	// 	message: '',
	// })


  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Header />
			<Container>
				<CardSection />
				{/* <ExpandableCardDemo /> */}
				
				{/* <PythonOutput /> */}
			</Container>
		</HydrationBoundary>
    
  );
}