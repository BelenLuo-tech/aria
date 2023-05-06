import { Head, Footer } from "@/components";
import { Analytics } from '@vercel/analytics/react';

export default function App() {
  return (
    <>
      <Head />
      <Analytics />
      <div className="flex flex-col h-screen">
        <Footer />
      </div>
    </>
  );
}
