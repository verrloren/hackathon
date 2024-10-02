'use client'

import Image from "next/image"

// interface ProfileImageNavbarProps {}

export function ProfileImageNavbar() {
	return (
		<Image className="cursor-pointer rounded-full w-6 h-6" width={18} height={18} src="https://lh3.googleusercontent.com/a/ACg8ocIeEuGetN1mrNaHTB63TEbEtnkl5mr8TewlxqFYuwCMeQbfh6ia=s96-c-rg-br100" alt="profile-img"/>
	)
}
