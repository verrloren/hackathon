'use client'

import { ExclamationMark } from "../ui/exclamation-mark"

// interface NotificationClientProps {}

export function Notification() {
	return (
		<>
		<ExclamationMark />
		<p className="text-xs font-normal">Price is invalid</p>
		</>
	)
}
