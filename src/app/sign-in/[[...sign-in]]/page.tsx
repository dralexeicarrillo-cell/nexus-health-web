import { SignIn } from "@clerk/nextjs";
import Link from "next/link";
import { ArrowLeft, CheckCircle2 } from "lucide-react";

export default function SignInPage() {
  return (
    <div className="min-h-screen flex bg-white">
      
      {/* 1. COLUMNA IZQUIERDA (IMAGEN & BRANDING) - Oculta en móviles */}
      <div className="hidden lg:flex w-1/2 bg-[#1A1F2C] relative items-center justify-center overflow-hidden">
        
        {/* Imagen de fondo con overlay */}
        <div className="absolute inset-0 opacity-40">
           <img 
             src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2070&auto=format&fit=crop" 
             alt="Medical Tech"
             className="w-full h-full object-cover"
           />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1F2C] via-[#1A1F2C]/80 to-transparent"></div>

        {/* Contenido flotante */}
        <div className="relative z-10 max-w-lg px-12 text-white">
           <img src="/LOGO-NHS.png" alt="NHS Logo" className="h-16 mb-8 brightness-0 invert" />
           
           <h1 className="font-serif text-4xl mb-6 leading-tight">
             Estrategia regulatoria inteligente para <span className="text-[#F7941D]">LatAm.</span>
           </h1>
           
           <ul className="space-y-4 text-slate-300">
             <li className="flex items-center gap-3">
               <CheckCircle2 className="text-[#F7941D]" /> Diagnóstico de madurez en tiempo real.
             </li>
             <li className="flex items-center gap-3">
               <CheckCircle2 className="text-[#F7941D]" /> Hoja de ruta regulatoria personalizada.
             </li>
             <li className="flex items-center gap-3">
               <CheckCircle2 className="text-[#F7941D]" /> Gestión documental centralizada.
             </li>
           </ul>
        </div>
      </div>

      {/* 2. COLUMNA DERECHA (FORMULARIO CLERK) */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-8 relative">
        
        {/* Botón volver */}
        <Link href="/" className="absolute top-8 left-8 text-slate-400 hover:text-[#262262] flex items-center gap-2 transition-colors">
           <ArrowLeft size={20} /> Volver al inicio
        </Link>

        <div className="w-full max-w-md">
           <div className="mb-8 text-center lg:hidden">
              <img src="/LOGO-NHS.png" alt="NHS Logo" className="h-12 mx-auto" />
           </div>
           
           <div className="flex justify-center">
             <SignIn 
               appearance={{
                 elements: {
                   formButtonPrimary: 'bg-[#F7941D] hover:bg-[#d47c12] text-white',
                   footerActionLink: 'text-[#F7941D] hover:text-[#d47c12]',
                   card: 'shadow-none border-0'
                 }
               }}
             />
           </div>
        </div>
      </div>

    </div>
  );
}