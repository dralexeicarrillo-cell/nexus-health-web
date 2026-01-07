import { SignUp } from "@clerk/nextjs";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex bg-white">
      
      {/* COLUMNA IZQUIERDA */}
      <div className="hidden lg:flex w-1/2 bg-[#1A1F2C] relative items-center justify-center overflow-hidden">
        <div className="absolute inset-0 opacity-30">
           <img 
             src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop" 
             alt="Lab Tech"
             className="w-full h-full object-cover"
           />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A1F2C] to-transparent"></div>

        <div className="relative z-10 max-w-lg px-12 text-white">
           <h1 className="font-serif text-4xl mb-6">Únete al ecosistema de salud digital líder.</h1>
           <p className="text-slate-300 text-lg">Comienza tu expansión a nuevos mercados con el respaldo de Nexus Health Strategies.</p>
        </div>
      </div>

      {/* COLUMNA DERECHA */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-8 relative">
        <Link href="/" className="absolute top-8 left-8 text-slate-400 hover:text-[#262262] flex items-center gap-2 transition-colors">
           <ArrowLeft size={20} /> Volver
        </Link>

        <div className="flex justify-center">
             <SignUp 
               appearance={{
                 elements: {
                   formButtonPrimary: 'bg-[#262262] hover:bg-[#1A1F2C] text-white',
                   footerActionLink: 'text-[#262262] hover:text-[#1A1F2C]',
                   card: 'shadow-none border-0'
                 }
               }}
             />
        </div>
      </div>

    </div>
  );
}