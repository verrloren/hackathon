'use client'

import { PreviewModal } from "@/components/preview-modal";
import { HotelsParams } from "@/lib/types";
import { useEffect, useState } from "react"

export default function ModalProvider({ hotel } : { hotel: HotelsParams }) {

	const [isMounted, setIsMounted] = useState(false)

	useEffect(() => {
		setIsMounted(true)
	}, []);

	if(!isMounted) return null

	return (
		<>
			<PreviewModal hotel={hotel} />
		</>
	)
}
