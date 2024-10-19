'use client'

import { useRouter } from "next/navigation"

export function Logo() {

	const router = useRouter();

	return (
		<h1 className="text-neural-800 dark:text-neutral-50 text-2xl cursor-pointer hover:text-black dark:hover:text-white transition-colors" onClick={() => router.push('/')}>Complexity</h1>
	)
}
