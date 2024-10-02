'use client'
import { RiNotification4Line } from "react-icons/ri";


export function NotificationNavbar() {
	return (
		<div className="flex justify-center items-center cursor-pointer rounded-full bg-none border border-neutral-400 w-6 h-6">
			<RiNotification4Line className="" size={14} />
		</div>
	)
}
