'use client'

import { useRouter } from "next/navigation"

export function Logo() {

	const router = useRouter();

	return (
		<h1 className="text-textGrayDark text-3xl cursor-pointer font-raleway 
		 transition-colors" onClick={() => router.push('/')}>Complexity</h1>
	)
}
