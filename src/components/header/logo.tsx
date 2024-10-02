'use client'

import { useRouter } from "next/navigation"

export function Logo() {

	const router = useRouter();

	return (
		<h1 className="text-textGray cursor-pointer hover:text-white transition-colors" onClick={() => router.push('/')}>Complexity</h1>
	)
}
