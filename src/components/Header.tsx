import Link from 'next/link'
import { ArrowRight, Lock } from 'lucide-react'

export default function Header() {
  return (
    <header className="bg-white/95 backdrop-blur-md sticky top-0 z-50 border-b border-slate-100 shadow-sm py-2">
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center h-20">
        
        {/* --- LOGO --- */}
        <Link href="/" className="flex items-center">
          <img 
            src="/LOGO-NHS.png" 
            alt="Nexus Health Strategies" 
            className="h-16 w-auto object-contain" 
          />
        </Link>

        {/* --- NAVEGACIÓN --- */}
        <nav className="flex items-center gap-6">
          
          {/* Enlace al Dashboard (Acceso Interno) */}
          <Link 
            href="/dashboard" 
            className="flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-[#1A1F2C] transition hidden md:flex uppercase tracking-widest"
          >
            <Lock size={12} /> Acceso Interno
          </Link>
          
          {/* Botón a la Calculadora Pública */}
          <a 
            href="https://calc.nhealths.com" 
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 bg-[#1A1F2C] hover:bg-[#2a3245] text-white rounded-lg text-xs font-bold transition flex items-center gap-2 shadow-lg shadow-slate-900/10 uppercase tracking-widest"
          >
            Diagnóstico Gratuito <ArrowRight size={14} className="text-[#F7941D]" />
          </a>
        </nav>
      </div>
    </header>
  )
}