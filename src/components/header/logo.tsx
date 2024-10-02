'use client'

import { useRouter } from "next/navigation"

export function Logo() {

	const router = useRouter();

	return (
		<h1 className="text-neutral-100 cursor-pointer" onClick={() => router.push('/')}>Complexity</h1>
	)
}
