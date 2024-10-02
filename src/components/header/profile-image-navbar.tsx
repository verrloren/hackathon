'use client'

import Image from "next/image"

// interface ProfileImageNavbarProps {}

export function ProfileImageNavbar() {
	return (
		<Image 
		style={{ MozUserSelect: "none", WebkitUserSelect: "none", msUserSelect: "none", userSelect: "none" }} 
		src="https://lh3.googleusercontent.com/a/ACg8ocIeEuGetN1mrNaHTB63TEbEtnkl5mr8TewlxqFYuwCMeQbfh6ia=s96-c-rg-br100" 
		className="cursor-pointer rounded-full w-6 h-6" 
		width={18} 
		height={18} 
		alt="profile-img"
		/>
	)
}
