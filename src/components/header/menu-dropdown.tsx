"use client";

import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

export function MenuDropdown() {
  const router = useRouter();

  return (
    <div className="absolute top-[50%] right-0 w-32 h-40 bg-[#070707]/90 backdrop-blur-lg rounded-xl border border-border flex justify-center items-center flex-col">
      <Button className="w-full bg-transparent text-neutral-200 hover:text-neutral-50 transition-colors hover:bg-transparent" onClick={() => router.push("/overview")}>Overview</Button>
      <Button className="w-full bg-transparent text-neutral-200 hover:text-neutral-50 transition-colors hover:bg-transparent">Toggle theme</Button>
      <Button className="w-full bg-transparent text-neutral-200 hover:text-neutral-50 transition-colors hover:bg-transparent" onClick={() => router.push("/login")}>Login</Button>
    </div>
  );
}
