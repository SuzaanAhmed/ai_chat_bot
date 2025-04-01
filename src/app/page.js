import Image from "next/image";

export default function Home() {
  return (
  <div className="bg-red-100 min-h-screen flex flex-col items-center justify-center gap-2">
    <strong className="text-[50px]">Welcome to NihongoTrainer</strong>
    <p className="text-[20px]">Konnichiwa, I am hear to provide assistance in learning Japanese.</p>
  </div>
    );
}
