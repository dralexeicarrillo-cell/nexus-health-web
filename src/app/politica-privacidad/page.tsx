import Header from "@/components/Header"; // Reusamos el Header público de la Landing
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-800">
      <Header />
      
      <main className="max-w-4xl mx-auto py-16 px-6">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-[#F7941D] mb-8 transition-colors">
            <ArrowLeft size={16} /> Volver al inicio
        </Link>

        <h1 className="text-4xl font-serif font-bold mb-4 text-[#1A1F2C]">Política de Privacidad</h1>
        <p className="text-slate-500 mb-12">Última actualización: {new Date().toLocaleDateString()}</p>

        <div className="prose prose-slate max-w-none space-y-8 leading-relaxed">
            
            <section>
                <h3 className="text-xl font-bold text-[#1A1F2C] mb-3">1. Introducción</h3>
                <p>
                    En <strong>Nexus Health Strategies</strong> ("nosotros", "nuestro"), respetamos su privacidad y estamos comprometidos a proteger sus datos personales. 
                    Esta política explica cómo recopilamos, usamos y protegemos su información cuando utiliza nuestra plataforma de estrategia regulatoria y nuestros servicios digitales.
                </p>
            </section>

            <section>
                <h3 className="text-xl font-bold text-[#1A1F2C] mb-3">2. Información que Recopilamos</h3>
                <p>Podemos recopilar los siguientes tipos de información:</p>
                <ul className="list-disc pl-5 space-y-2 mt-2">
                    <li><strong>Información de Identidad:</strong> Nombre, apellidos, usuario.</li>
                    <li><strong>Información de Contacto:</strong> Dirección de correo electrónico, número de teléfono.</li>
                    <li><strong>Datos Técnicos:</strong> Dirección IP, tipo de navegador, datos de inicio de sesión (a través de Clerk).</li>
                    <li><strong>Datos del Proyecto:</strong> Información sobre sus productos médicos, estado regulatorio y documentos cargados en su expediente digital.</li>
                </ul>
            </section>

            <section>
                <h3 className="text-xl font-bold text-[#1A1F2C] mb-3">3. Uso de la Información</h3>
                <p>Utilizamos sus datos para los siguientes fines:</p>
                <ul className="list-disc pl-5 space-y-2 mt-2">
                    <li>Proporcionar y gestionar su acceso a la plataforma.</li>
                    <li>Generar diagnósticos regulatorios y hojas de ruta personalizadas.</li>
                    <li>Comunicarnos con usted sobre actualizaciones del servicio o cambios regulatorios.</li>
                    <li>Mejorar la seguridad y funcionalidad de nuestro sitio.</li>
                </ul>
            </section>

            <section>
                <h3 className="text-xl font-bold text-[#1A1F2C] mb-3">4. Seguridad de Datos</h3>
                <p>
                    Implementamos medidas de seguridad técnicas y organizativas apropiadas (como encriptación y control de accesos) para proteger sus datos personales contra la pérdida accidental, el uso no autorizado o el acceso indebido. 
                    Sus documentos se almacenan en servidores seguros con protocolos de nivel empresarial.
                </p>
            </section>

            <section>
                <h3 className="text-xl font-bold text-[#1A1F2C] mb-3">5. Sus Derechos</h3>
                <p>
                    Dependiendo de su jurisdicción, usted tiene derecho a acceder, corregir, eliminar o restringir el uso de sus datos personales. 
                    Para ejercer estos derechos, puede contactarnos a través de nuestros canales oficiales o solicitar la baja de su cuenta desde el panel de usuario.
                </p>
            </section>

            <section>
                <h3 className="text-xl font-bold text-[#1A1F2C] mb-3">6. Contacto</h3>
                <p>
                    Si tiene preguntas sobre esta política de privacidad, por favor contáctenos en:<br/>
                    <strong>Email:</strong> legal@nhealths.com<br/>
                </p>
            </section>

        </div>
      </main>
      
      {/* Footer simple integrado */}
      <footer className="bg-[#1A1F2C] text-white py-12 text-center text-sm text-slate-500">
         <p>© {new Date().getFullYear()} Nexus Health Strategies. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}