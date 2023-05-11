import { Head, Footer, Gpt } from "@/components";
import { Analytics } from '@vercel/analytics/react';

export default function App() {
  return (
    <>
      <Head />
      <Analytics />
      <div className="flex flex-col h-full w-full">
        <main className="flex-1 overflow-hidden flex items-center">
          <div className="w-full lg:h-5/6 h-full lg:max-w-screen-lg mx-auto">
            <Gpt></Gpt>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
