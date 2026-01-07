"use client";

import Header from '@/components/Header'
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Calculator, CheckCircle, MessageCircle, Globe, ShieldCheck, BrainCircuit } from "lucide-react";
import { useState } from "react";

// --- COMPONENTES UI REUTILIZABLES ---

// Animación de entrada suave (Fade Up)
const FadeUp = ({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

// Separador elegante
const Divider = () => <div className="h-[1px] w-full bg-gray-200 my-0" />;

export default function Home() {
  const [activeAccordion, setActiveAccordion] = useState<number | null>(null);

  return (
    <main className="min-h-screen bg-white text-slate-900 selection:bg-[#262262] selection:text-white font-sans">
      
      {/* --- HEADER NUEVO CON LOGO --- */}
      <Header />

      {/* --- HERO SECTION --- */}
      <section className="relative py-20 lg:py-32 px-6 overflow-hidden">
        <div className="max-w-[1400px] mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <FadeUp>
              <span className="text-[#F7941D] font-bold tracking-widest text-xs uppercase mb-4 block">
                Nexus Health Strategies
              </span>
              <h1 className="font-serif text-5xl md:text-7xl text-[#1A1F2C] leading-[1.1] mb-8">
                Arquitectura <br />
                estratégica para la <br />
                <span className="italic text-[#262262]">salud digital.</span>
              </h1>
            </FadeUp>
            
            <FadeUp delay={0.2}>
              <p className="text-xl font-light text-slate-600 max-w-lg leading-relaxed mb-10 border-l-2 border-[#F7941D] pl-6">
                Consultoría especializada en la intersección crítica entre tecnología médica, regulación y estrategia de mercado en las Américas.
              </p>
              
              <div className="flex gap-4">
                 <Link href="#contacto" className="group flex items-center gap-3 bg-[#1A1F2C] text-white px-8 py-4 rounded-none hover:bg-[#262262] transition-all">
                   Iniciar Conversación <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform"/>
                 </Link>
              </div>
            </FadeUp>
          </div>

          {/* Gráfico Abstracto Animado */}
          <FadeUp delay={0.4} className="relative h-[400px] hidden lg:flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-50 to-white rounded-full opacity-50 blur-3xl" />
            
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              className="w-[400px] h-[400px] border border-slate-200 rounded-full absolute"
            />
            <motion.div 
              animate={{ rotate: -360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="w-[300px] h-[300px] border border-slate-300 rounded-full absolute"
            />
            <motion.div 
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
              className="w-[150px] h-[150px] bg-[#262262]/5 rounded-full absolute backdrop-blur-sm z-10"
            />
            <div className="w-4 h-4 bg-[#F7941D] rounded-full z-20 shadow-[0_0_30px_rgba(247,148,29,0.5)]"></div>
          </FadeUp>
        </div>
      </section>

      <Divider />

      {/* --- MISION & VISION --- */}
      <section id="vision" className="py-24 bg-slate-50">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="grid md:grid-cols-12 gap-12">
            <div className="md:col-span-4">
               <FadeUp>
                 <h2 className="font-serif text-3xl md:text-4xl text-[#1A1F2C]">
                   Nuestra <br/>Perspectiva
                 </h2>
               </FadeUp>
            </div>
            <div className="md:col-span-8 grid gap-12">
              <FadeUp delay={0.1}>
                <h3 className="text-sm font-bold tracking-widest text-[#F7941D] uppercase mb-3">Misión</h3>
                <p className="text-2xl text-slate-700 leading-relaxed font-light">
                  "Catalizar la adopción tecnológica segura en el sector salud, eliminando las barreras burocráticas y técnicas que separan la innovación de los pacientes."
                </p>
              </FadeUp>
              <FadeUp delay={0.2}>
                <h3 className="text-sm font-bold tracking-widest text-[#F7941D] uppercase mb-3">Visión</h3>
                <p className="text-xl text-slate-600 leading-relaxed font-light">
                  Visualizamos un continente americano unido por estándares de datos interoperables, donde una startup en Costa Rica pueda escalar a EE.UU., y una tecnología global pueda aterrizar localmente con total cumplimiento regulatorio.
                </p>
              </FadeUp>
            </div>
          </div>
        </div>
      </section>

      <Divider />

      {/* --- EXPERTISE / SERVICIOS --- */}
      <section id="expertise" className="py-24 px-6 bg-white">
        <div className="max-w-[1400px] mx-auto">
          <FadeUp>
             <div className="flex flex-col md:flex-row justify-between items-end mb-16">
                <h2 className="font-serif text-4xl text-[#1A1F2C]">Capacidades Centrales</h2>
                <p className="text-slate-500 max-w-md text-right mt-4 md:mt-0">Soluciones integrales diseñadas para instituciones, gobiernos y empresas healthtech.</p>
             </div>
          </FadeUp>

          <div className="grid md:grid-cols-3 gap-8">
            <ServiceCard 
              icon={<BrainCircuit size={40} />}
              title="Transformación Digital"
              points={[
                "Implementación de Expedientes Electrónicos (EMR)",
                "Interoperabilidad (HL7, FHIR)",
                "Gestión del Cambio Organizacional",
                "Diseño de flujos de Telemedicina"
              ]}
            />
             <ServiceCard 
              icon={<ShieldCheck size={40} />}
              title="Regulación & Compliance"
              points={[
                "Registros Sanitarios (LatAm & FDA)",
                "Validación de Software como Dispositivo Médico (SaMD)",
                "Privacidad de Datos (HIPAA / Leyes Locales)",
                "Auditoría de Procesos Clínicos"
              ]}
            />
             <ServiceCard 
              icon={<Globe size={40} />}
              title="Expansión de Mercado"
              points={[
                "Estrategias Soft-Landing (USA <-> LatAm)",
                "Inteligencia de Mercado Público y Privado",
                "Alianzas Estratégicas y Joint Ventures",
                "Consultoría en Salud Pública"
              ]}
            />
          </div>
        </div>
      </section>

      {/* --- SECCIÓN CALCULADORA --- */}
      <section className="bg-slate-50 py-24 px-8">
        <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100 flex flex-col md:flex-row relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#F7941D]/10 rounded-bl-full -mr-8 -mt-8"></div>
          
          <div className="p-10 md:p-14 flex-1 space-y-6">
            <div className="flex items-center gap-2 text-[#F7941D] font-bold text-sm uppercase tracking-wider">
              <Calculator size={18} />
              Diagnóstico Gratuito
            </div>
            
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#1A1F2C]">
              ¿Pensando en expandir tu empresa de salud?
            </h2>
            
            <p className="text-slate-600 text-lg leading-relaxed">
              Si planeas vender productos de interés sanitario o escalar tu operación, el primer paso es conocer tu terreno. 
              <br/><br/>
              <strong>Revisa tu estado actual de fortaleza. Nosotros te ayudamos con el resto.</strong>
            </p>

            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-slate-700 font-medium">
                <CheckCircle size={18} className="text-[#F7941D]" /> Estimación de costos regulatorios
              </li>
              <li className="flex items-center gap-3 text-slate-700 font-medium">
                <CheckCircle size={18} className="text-[#F7941D]" /> Análisis de tiempos de entrada
              </li>
              <li className="flex items-center gap-3 text-slate-700 font-medium">
                <CheckCircle size={18} className="text-[#F7941D]" /> Proyección de retorno de inversión
              </li>
            </ul>

            <div className="pt-6">
              {/* --- AQUÍ ESTABA EL ERROR: AHORA APUNTA A LA URL REAL --- */}
              <a 
                href="https://calc.nhealths.com" 
                target="_blank"
                className="inline-flex items-center gap-3 px-8 py-4 bg-[#F7941D] text-white rounded-lg font-bold text-lg hover:bg-[#d47c12] hover:shadow-lg hover:-translate-y-1 transition-all"
              >
                Realizar Diagnóstico Ahora
                <ArrowRight size={20} />
              </a>
            </div>
          </div>
          
          <div className="hidden md:block w-1/3 bg-[#1A1F2C] relative overflow-hidden">
             <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white to-transparent"></div>
             <div className="h-full flex items-center justify-center text-white/10">
                <Calculator size={120} />
             </div>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer id="contacto" className="bg-[#1A1F2C] text-white pt-24 pb-12 px-6">
        <div className="max-w-[1400px] mx-auto grid md:grid-cols-2 gap-16 mb-24">
           <div>
              <h2 className="font-serif text-4xl md:text-5xl mb-6">Conectemos.</h2>
              <p className="text-slate-400 text-lg font-light max-w-md mb-8">
                Si su organización está lista para el siguiente nivel de madurez digital, estamos listos para guiar el camino.
              </p>
              <a href="mailto:gerencia@nhealths.com" className="inline-flex items-center gap-3 text-[#F7941D] text-xl font-bold hover:gap-6 transition-all">
                  gerencia@nhealths.com <ArrowRight />
              </a>
           </div>
           
           <div className="grid grid-cols-2 gap-8 text-sm text-slate-400">
             <div>
                <h4 className="text-white font-bold uppercase tracking-widest mb-4">Sede</h4>
                <p>San José, Costa Rica</p>
                <p>Operaciones Globales</p>
             </div>
             <div>
                <h4 className="text-white font-bold uppercase tracking-widest mb-4">Legal</h4>
                <Link href="#" className="block hover:text-white mb-2">Aviso de Privacidad</Link>
                <Link href="#" className="block hover:text-white">Términos de Uso</Link>
             </div>
           </div>
        </div>

        <div className="max-w-[1400px] mx-auto border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500">
           <p>© {new Date().getFullYear()} NexusHealth Strategies. Todos los derechos reservados.</p>
           <p>Diseñado con excelencia.</p>
        </div>
      </footer>

      {/* Botón flotante WhatsApp */}
      <WhatsAppButton />
    </main>
  );
}

// --- SUB-COMPONENTES FUERA DE LA FUNCIÓN PRINCIPAL ---

function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/50672467095?text=Hola,%20me%20interesa%20fortalecer%20mi%20empresa%20de%20salud."
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-8 right-8 z-50 flex items-center justify-center w-16 h-16 bg-[#25D366] text-white rounded-full shadow-2xl hover:bg-[#128C7E] hover:scale-110 transition-all duration-300 group"
      aria-label="Contactar por WhatsApp"
    >
      <MessageCircle size={32} />
      <span className="absolute right-full mr-4 bg-white text-slate-800 px-4 py-2 rounded-lg shadow-lg text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
        ¡Hablemos ahora!
      </span>
    </a>
  );
}

function ServiceCard({ icon, title, points }: { icon: React.ReactNode, title: string, points: string[] }) {
  return (
    <FadeUp className="group p-8 border border-gray-200 hover:border-[#262262] bg-white hover:shadow-xl transition-all duration-300">
      <div className="text-[#262262] mb-6 group-hover:scale-110 transition-transform origin-left">
        {icon}
      </div>
      <h3 className="font-serif text-2xl text-[#1A1F2C] mb-6">{title}</h3>
      <ul className="space-y-3">
        {points.map((point, index) => (
          <li key={index} className="flex items-start gap-3 text-sm text-slate-600 font-light">
             <span className="mt-1.5 w-1.5 h-1.5 bg-[#F7941D] rounded-full flex-shrink-0" />
             {point}
          </li>
        ))}
      </ul>
    </FadeUp>
  );
}