import { auth } from "../../../../auth";
import LoginForm from "@/components/authUI/login-form";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export default async function LoginPage() {

	const session = await auth();
	const userId = session?.user?.id;

	if (userId) {
		redirect('/')
	}

	return (
		<main className="w-full h-screen relative flex flex-col justify-center items-center">
		<h1
			className="font-semibold lg:text-8xl text-7xl text-neutral-800 dark:text-neutral-100 mb-12"
		>
			Welcome
		</h1>

		<Suspense>
			<LoginForm />
		</Suspense>

		<Link 
	className="fixed text-center bottom-12 font-semibold text-base text-neutral-600
		hover:text-neutral-400 transition-colors duration-300 " 
		href="/auth/register">
			create an account
		</Link>

	</main>
	)
}
