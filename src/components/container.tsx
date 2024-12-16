'use client'

import { ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
}

export default function Container({ children }: ContainerProps) {
	return (
		<div className="mx-12 md:mx-16 lg:mx-24 xl:mx-28 2xl:mx-32">{children}</div>
	)
}
