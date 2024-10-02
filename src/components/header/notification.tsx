'use client'

import { AiOutlineExclamation } from "react-icons/ai"

// interface NotificationClientProps {}

export function Notification() {
	return (
		<>
		<div className="w-6 h-6 flex justify-center items-center rounded-full bg-red-600">
		<AiOutlineExclamation size="14" className="text-neutral-50" />
	</div>
		<p className="text-xs font-normal">Price is invalid</p>
		</>
	)
}
