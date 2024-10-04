'use client';

import { NotificationProps } from "@/lib/types";
import { ExclamationMark } from "../ui/exclamation-mark";


export function Notification({ id, message }: NotificationProps) {

	console.log(id)

  return (
    <div className="w-32 flex items-center space-x-2">
      <ExclamationMark />
      <p className="text-xs font-normal">{message}</p>
    </div>
  );
}