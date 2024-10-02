'use client'
import { BsThreeDots } from "react-icons/bs";
import useMenuDropdown from "@/modal/useMenuDropdown";


export function MenuNavbar() {

	const menuDropdown = useMenuDropdown();

	const openMenu = () => {
		if(!menuDropdown.isOpen) {
			menuDropdown.onOpen()
			console.log(menuDropdown.isOpen)
		} else {
			menuDropdown.onClose()
			console.log(menuDropdown.isOpen)
		}
	}

	return (
		<>
			<BsThreeDots 
				className="cursor-pointer w-6 h-6" 
				onClick={openMenu}
			/>
		</>
	)
}
