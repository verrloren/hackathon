import { LoginForm } from "@/components/login/login-form";
import Link from "next/link";



export default function LoginPage() {
	return (
		<main className="w-full h-screen relative flex flex-col justify-center items-center">
		<h1
			className="font-semibold text-7xl text-neutral-100"
		>
			Complexity Login
		</h1>

		<LoginForm />

		<Link className="text-neutral-600" href="/register">create an account</Link>

	</main>
	)
}
