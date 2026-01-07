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
const Divider = () => <div className="h-[1px] w-full bg-gray-100 my-0" />;

export default function Home() {
  const [activeAccordion, setActiveAccordion] = useState<number | null>(null);

  return (
    <main className="min-h-screen bg-white text-slate-900 selection:bg-[#262262] selection:text-white font-sans">
      
      {/* --- HEADER NUEVO CON LOGO --- */}
      <Header />

      {/* --- HERO SECTION (ACTUALIZADO CON IMAGEN) --- */}
      <section className="relative py-20 lg:py-32 px-6 overflow-hidden bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-[1400px] mx-auto grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Texto del Hero */}
          <div>
            <FadeUp>
              <span className="text-[#F7941D] font-bold tracking-widest text-xs uppercase mb-4 block">
                Nexus Health Strategies
              </span>
              <h1 className="font-serif text-5xl md:text-7xl text-[#1A1F2C] leading-[1.1] mb-8">
                Arquitectura <br />
                estratégica para la <br />
                <span className="italic text-[#262262] relative z-10">
                  salud digital.
                  {/* Subrayado sutil */}
                  <span className="absolute bottom-2 left-0 w-full h-3 bg-[#F7941D]/20 -z-10"></span>
                </span>
              </h1>
            </FadeUp>
            
            <FadeUp delay={0.2}>
              <p className="text-xl font-light text-slate-600 max-w-lg leading-relaxed mb-10 border-l-2 border-[#F7941D] pl-6">
                Consultoría especializada en la intersección crítica entre tecnología médica, regulación y estrategia de mercado en las Américas.
              </p>
              
              <div className="flex gap-4">
                 <Link href="#contacto" className="group flex items-center gap-3 bg-[#1A1F2C] text-white px-8 py-4 rounded-lg hover:bg-[#262262] hover:shadow-lg hover:-translate-y-1 transition-all font-medium">
                   Iniciar Conversación <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform"/>
                 </Link>
              </div>
            </FadeUp>
          </div>

          {/* IMAGEN PRINCIPAL (NUEVO) */}
          <FadeUp delay={0.4} className="relative hidden lg:block">
            {/* Elemento decorativo de fondo */}
            <div className="absolute top-0 right-0 w-full h-full bg-[#262262] rounded-3xl transform rotate-3 opacity-10 -z-10"></div>
            
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
              <img 
                // Imagen de Unsplash: Tecnología médica global/futurista
                src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Estrategia de Salud Digital Global" 
                className="w-full h-[600px] object-cover hover:scale-105 transition-transform duration-700"
              />
              {/* Overlay gradiente para que el texto resalte si decidimos poner algo encima */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A1F2C]/40 to-transparent pointer-events-none"></div>
            </div>
          </FadeUp>
        </div>
      </section>

      <Divider />

      {/* --- MISION & VISION (ACTUALIZADO CON IMAGEN LATERAL) --- */}
      <section id="vision" className="py-24 bg-slate-50 overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="grid md:grid-cols-12 gap-12 items-center">
            
            {/* Columna de Imagen (NUEVO) */}
            <div className="md:col-span-5 relative">
               <FadeUp>
                  <div className="relative rounded-2xl overflow-hidden shadow-xl">
                    <img 
                        // Imagen de Unsplash: Estrategia, visión, análisis
                        src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop&ixlib=rb-4.0.3" 
                        alt="Análisis Estratégico" 
                        className="w-full h-[500px] object-cover grayscale hover:grayscale-0 transition-all duration-500"
                    />
                    <div className="absolute inset-0 bg-[#262262]/20 mix-blend-multiply pointer-events-none"></div>
                  </div>
                  {/* Cuadro decorativo */}
                  <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-[#F7941D]/10 rounded-lg -z-10 hidden md:block"></div>
               </FadeUp>
            </div>

            {/* Columna de Texto */}
            <div className="md:col-span-7 grid gap-10">
              <div>
                  <FadeUp delay={0.1}>
                    <h2 className="font-serif text-3xl md:text-4xl text-[#1A1F2C] mb-6">
                      Nuestra <br/>Perspectiva
                    </h2>
                  </FadeUp>
                  <FadeUp delay={0.2}>
                    <h3 className="text-sm font-bold tracking-widest text-[#F7941D] uppercase mb-3 flex items-center gap-2">
                        <GoalIcon size={16}/> Misión
                    </h3>
                    <p className="text-xl text-slate-700 leading-relaxed font-light italic">
                      "Catalizar la adopción tecnológica segura en el sector salud, eliminando las barreras burocráticas y técnicas que separan la innovación de los pacientes."
                    </p>
                  </FadeUp>
              </div>
              
              <FadeUp delay={0.3}>
                 <div className="w-full h-[1px] bg-slate-200 my-2"></div>
              </FadeUp>

              <FadeUp delay={0.4}>
                <h3 className="text-sm font-bold tracking-widest text-[#F7941D] uppercase mb-3 flex items-center gap-2">
                    <EyeIcon size={16}/> Visión
                </h3>
                <p className="text-lg text-slate-600 leading-relaxed font-light">
                  Visualizamos un continente americano unido por estándares de datos interoperables, donde una startup en Costa Rica pueda escalar a EE.UU., y una tecnología global pueda aterrizar localmente con total cumplimiento regulatorio.
                </p>
              </FadeUp>
            </div>
          </div>
        </div>
      </section>

      <Divider />

      {/* --- EXPERTISE / SERVICIOS --- */}
      <section id="expertise" className="py-24 px-6 bg-white relative">
         {/* Fondo sutil */}
         <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px] opacity-30 pointer-events-none"></div>

        <div className="max-w-[1400px] mx-auto relative z-10">
          <FadeUp>
              <div className="flex flex-col md:flex-row justify-between items-end mb-16 md:border-b border-slate-100 md:pb-8">
                 <h2 className="font-serif text-4xl text-[#1A1F2C]">Capacidades Centrales</h2>
                 <p className="text-slate-500 max-w-md text-right mt-4 md:mt-0 font-light">Soluciones integrales diseñadas para instituciones, gobiernos y empresas healthtech.</p>
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

      {/* --- SECCIÓN CALCULADORA (ACTUALIZADO CON IMAGEN) --- */}
      <section className="bg-slate-50 py-24 px-8">
        <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-100 flex flex-col md:flex-row relative group">
          
          {/* Contenido de Texto */}
          <div className="p-10 md:p-14 flex-1 space-y-8 relative z-10">
            <div className="flex items-center gap-2 text-[#F7941D] font-bold text-sm uppercase tracking-wider">
              <Calculator size={18} />
              Diagnóstico Gratuito
            </div>
            
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#1A1F2C] leading-tight">
              ¿Pensando en expandir tu empresa de salud?
            </h2>
            
            <p className="text-slate-600 text-lg leading-relaxed font-light">
              Si planeas vender productos de interés sanitario o escalar tu operación, el primer paso es conocer tu terreno. 
              <br/><br/>
              <strong className="text-slate-800 font-semibold">Revisa tu estado actual de fortaleza. Nosotros te ayudamos con el resto.</strong>
            </p>

            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-slate-700 font-medium p-3 bg-slate-50 rounded-lg">
                <CheckCircle size={20} className="text-[#F7941D] flex-shrink-0" /> Estimación de costos regulatorios
              </li>
              <li className="flex items-center gap-3 text-slate-700 font-medium p-3 bg-slate-50 rounded-lg">
                <CheckCircle size={20} className="text-[#F7941D] flex-shrink-0" /> Análisis de tiempos de entrada
              </li>
            </ul>

            <div className="pt-6">
              <a 
                href="https://calc.nhealths.com" 
                target="_blank"
                className="inline-flex items-center gap-3 px-8 py-4 bg-[#F7941D] text-white rounded-lg font-bold text-lg hover:bg-[#d47c12] hover:shadow-lg hover:-translate-y-1 transition-all w-full md:w-auto justify-center"
              >
                Realizar Diagnóstico Ahora
                <ArrowRight size={20} />
              </a>
            </div>
          </div>
          
          {/* IMAGEN LATERAL DE LA CALCULADORA (NUEVO) */}
          <div className="hidden md:block w-2/5 relative overflow-hidden min-h-[500px]">
             {/* Imagen de Unsplash: Persona usando tablet con datos médicos */}
             <img 
                src="https://images.unsplash.com/photo-1551076805-e1869033e561?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3" 
                alt="Análisis de datos de salud"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
             />
             {/* Overlay azul oscuro para que el texto blanco resalte si hubiera, y para dar estilo */}
             <div className="absolute inset-0 bg-[#1A1F2C]/60 mix-blend-multiply"></div>
             
             <div className="absolute bottom-0 left-0 p-8 bg-gradient-to-t from-[#1A1F2C] to-transparent w-full">
                 <Calculator size={40} className="text-white/80 mb-2" />
                 <p className="text-white font-medium">Herramienta exclusiva de NHS+</p>
             </div>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer id="contacto" className="bg-[#1A1F2C] text-white pt-24 pb-12 px-6 relative overflow-hidden">
        {/* Decoración de fondo */}
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 pointer-events-none"></div>

        <div className="max-w-[1400px] mx-auto grid md:grid-cols-2 gap-16 mb-24 relative z-10">
           <div>
              <FadeUp>
                <h2 className="font-serif text-4xl md:text-5xl mb-6">Conectemos.</h2>
              </FadeUp>
              <FadeUp delay={0.1}>
                <p className="text-slate-300 text-lg font-light max-w-md mb-10 leading-relaxed">
                  Si su organización está lista para el siguiente nivel de madurez digital, estamos listos para guiar el camino.
                </p>
              </FadeUp>
              <FadeUp delay={0.2}>
                <a href="mailto:gerencia@nhealths.com" className="group inline-flex items-center gap-3 text-white text-xl font-bold hover:text-[#F7941D] transition-all bg-white/10 px-6 py-4 rounded-lg hover:bg-white/20">
                    gerencia@nhealths.com <ArrowRight className="group-hover:translate-x-2 transition-transform"/>
                </a>
              </FadeUp>
           </div>
           
           <div className="grid grid-cols-2 gap-10 text-sm text-slate-400">
             <FadeUp delay={0.3}>
                <h4 className="text-white font-bold uppercase tracking-widest mb-6 flex items-center gap-2 text-xs">
                   <Globe size={14} className="text-[#F7941D]"/> Sede
                </h4>
                <p className="text-lg text-slate-200">San José, Costa Rica</p>
                <p className="mt-1">Operaciones Globales</p>
             </FadeUp>
             <FadeUp delay={0.4}>
                <h4 className="text-white font-bold uppercase tracking-widest mb-6 flex items-center gap-2 text-xs">
                  <ShieldCheck size={14} className="text-[#F7941D]"/> Legal
                </h4>
                <ul className="space-y-3">
                  <li><Link href="#" className="hover:text-white transition-colors hover:underline">Aviso de Privacidad</Link></li>
                  <li><Link href="#" className="hover:text-white transition-colors hover:underline">Términos de Uso</Link></li>
                </ul>
             </FadeUp>
           </div>
        </div>

        <div className="max-w-[1400px] mx-auto border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500 relative z-10">
           <p>© {new Date().getFullYear()} NexusHealth Strategies. Todos los derechos reservados.</p>
           <p>Diseñado con excelencia.</p>
        </div>
      </footer>

      {/* Botón flotante WhatsApp */}
      <WhatsAppButton />
    </main>
  );
}

// --- SUB-COMPONENTES AUXILIARES ---

// Iconos simples para la sección de misión/visión
const GoalIcon = ({size}: {size: number}) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 13V2l8 4-8 4"/><path d="M20.55 10.23A9 9 0 1 1 8 4.94"/></svg>
);
const EyeIcon = ({size}: {size: number}) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
);

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
    <FadeUp className="group p-8 border border-gray-100 hover:border-[#262262] bg-white hover:shadow-xl transition-all duration-300 rounded-2xl relative overflow-hidden">
      {/* Hover decorativo */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#F7941D]/5 rounded-bl-full -mr-16 -mt-16 transition-transform group-hover:scale-150 z-0"></div>
      
      <div className="text-[#262262] mb-6 group-hover:scale-110 transition-transform origin-left relative z-10">
        {icon}
      </div>
      <h3 className="font-serif text-2xl text-[#1A1F2C] mb-6 relative z-10">{title}</h3>
      <ul className="space-y-3 relative z-10">
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