import RegisterForm from "@/components/authUI/register-form";
import Link from "next/link";
import { Suspense } from "react";



export default function LoginPage() {
	return (
		<main className="w-full h-screen relative flex flex-col justify-center items-center">
		<h1
			className="font-semibold text-center text-6xl lg:text-7xl text-neutral-100 mb-12"
		>
			Create an account
		</h1>

		<Suspense>
			<RegisterForm />
		</Suspense>


		<Link 
		className="fixed text-center bottom-12 font-semibold text-base text-neutral-600
		hover:text-neutral-400 transition-colors duration-300 " 
		href="/auth/login">
			sign in
		</Link>
	</main>
	)
}
