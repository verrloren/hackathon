'use client'

import { ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
}

export default function Container({ children }: ContainerProps) {
	return (
		<div className="mx-14 md:mx-20 lg:mx-26 xl:mx-42 2xl:mx-48">{children}</div>
	)
}
