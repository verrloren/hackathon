import Link from "next/link";



export default function LoginPage() {
	return (
		<main className="w-full h-screen relative flex flex-col justify-center items-center">
		<h1
			className="font-semibold text-7xl text-neutral-100"
		>
			Complexity Register
		</h1>

		<Link className="text-neutral-600" href="/login">sign in</Link>
	</main>
	)
}
