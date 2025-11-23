"use client";

import dynamic from "next/dynamic";

const GLBDiagnostic = dynamic(() => import("../../components/GLBDiagnostic"), {
  ssr: false,
});

export default function DiagnosticPage() {
  return <GLBDiagnostic />;
}