import Container from "@/components/container";
import Header from "@/components/header/header";
import OverviewChart from "@/components/overview-chart";
import { overviewChartData } from "@/lib/data";

export default function OverviewPage() {

  return (
    <>
      <Header />
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
