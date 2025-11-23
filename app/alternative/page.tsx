"use client";

import dynamic from "next/dynamic";

const AlternativeGLBTest = dynamic(() => import("../../components/AlternativeGLBTest"), {
  ssr: false,
});

export default function AlternativeTestPage() {
  return <AlternativeGLBTest />;
}