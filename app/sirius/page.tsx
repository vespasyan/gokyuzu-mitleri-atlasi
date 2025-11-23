"use client";
import dynamic from "next/dynamic";
const SiriusScene = dynamic(() => import("@/components/SiriusModel"), { ssr: false });

export default function Page() {
  return <main className="h-[85vh]"><SiriusScene /></main>;
}