import CardSection from "@/components/card-section";
import Container from "@/components/container";
import Header from "@/components/header/header";
import PythonOutput from "@/components/python-output";

export default async function HomePage() {


	  // // Redirect to login page if not authenticated
		// if (!session) {
		// 	window.location.href = "/auth/login";
		// 	return null; // Prevent rendering the component
		// }


	


  return (
    <>
      <Header />
			<Container>
				<CardSection />
				<PythonOutput />
			</Container>
    </>
  );
}