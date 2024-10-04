import Container from "@/components/container";
import Header from "@/components/header/header";
import OverviewChart from "@/components/overview-chart";
import { overviewChartData } from "@/lib/data";
import { NotificationProps } from "@/lib/types";
import { getNotificationsByUser } from "@/utils/getUserBy";
// import { getSession } from "next-auth/react";
import { auth } from "../auth";

export default async function OverviewPage() {

	const session = await auth();

	const notifications: NotificationProps[] = await getNotificationsByUser(session?.user?.id as string)

  return (
    <>
      <Header notifications={notifications} />
			<Container>
				<main className="w-full h-screen flex flex-col">
					<h1 className="text-5xl mt-16 text-neutral-900 dark:text-neutral-50">Overview </h1>
					<div className="h-[60dvh] w-full mt-6">
						<OverviewChart data={overviewChartData} />
					</div>
				</main>
			</Container>
    </>
  );
}
