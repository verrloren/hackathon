import LoginForm from "@/components/login/login-form";
import Link from "next/link";



export default function LoginPage() {
	return (
		<main className="w-full h-screen relative flex flex-col justify-center items-center">
		<h1
			className="font-semibold text-7xl text-neutral-100 mb-12"
		>
			Sign in
		</h1>

		<LoginForm />

		<Link 
	className="fixed text-center bottom-12 font-semibold text-base text-neutral-600
		hover:text-neutral-400 transition-colors duration-300 " 
		href="/register">
			create an account
		</Link>

	</main>
	)
}
