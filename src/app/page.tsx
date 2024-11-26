"use client";

import { Suspense } from "react";
import Note from "./components/Note";

export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Note />
    </Suspense>
  );
}
