import Header from "@/components/Header";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function LegalPage() {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-800">
      <Header />
      
      <main className="max-w-4xl mx-auto py-16 px-6">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-[#F7941D] mb-8 transition-colors">
            <ArrowLeft size={16} /> Volver al inicio
        </Link>

        <h1 className="text-4xl font-serif font-bold mb-4 text-[#1A1F2C]">Aviso Legal</h1>
        <p className="text-slate-500 mb-12">Vigente desde: {new Date().getFullYear()}</p>

        <div className="prose prose-slate max-w-none space-y-8 leading-relaxed">
            
            <section>
                <h3 className="text-xl font-bold text-[#1A1F2C] mb-3">1. Datos Identificativos</h3>
                <p>
                    En cumplimiento con el deber de información, se notifica que la titularidad de este sitio web corresponde a <strong>Nexus Health Strategies</strong>, 
                    dedicada a la consultoría estratégica y regulatoria en el sector salud.
                </p>
            </section>

            <section>
                <h3 className="text-xl font-bold text-[#1A1F2C] mb-3">2. Propiedad Intelectual</h3>
                <p>
                    Todos los contenidos de este sitio web, incluyendo textos, gráficas, logos, iconos, imágenes, así como el diseño gráfico y código fuente (incluyendo los algoritmos de la calculadora de diagnóstico), 
                    son propiedad exclusiva de Nexus Health Strategies o de terceros que han autorizado su uso, estando protegidos por la legislación nacional e internacional sobre propiedad intelectual e industrial.
                </p>
            </section>

            <section>
                <h3 className="text-xl font-bold text-[#1A1F2C] mb-3">3. Exclusión de Responsabilidad</h3>
                <p>
                    <strong>Naturaleza de la Información:</strong> La información proporcionada por nuestra plataforma, incluyendo los diagnósticos automáticos y las hojas de ruta, tiene carácter meramente orientativo y estratégico. 
                    No sustituye el asesoramiento legal formal ni garantiza la aprobación de registros sanitarios por parte de las autoridades (como COFEPRIS, INVIMA, etc.), ya que estos dependen de criterios gubernamentales variables.
                </p>
                <p className="mt-4">
                    Nexus Health Strategies no se hace responsable de las decisiones tomadas basándose únicamente en la información automatizada de este sitio web sin la validación de uno de nuestros consultores expertos.
                </p>
            </section>

            <section>
                <h3 className="text-xl font-bold text-[#1A1F2C] mb-3">4. Uso del Portal</h3>
                <p>
                    El usuario asume la responsabilidad del uso del portal. Dicha responsabilidad se extiende al registro necesario para acceder a servicios o contenidos específicos. 
                    El usuario se compromete a hacer un uso adecuado de los contenidos y servicios, y a no emplearlos para actividades ilícitas o contrarias a la buena fe y al orden público.
                </p>
            </section>

            <section>
                <h3 className="text-xl font-bold text-[#1A1F2C] mb-3">5. Modificaciones</h3>
                <p>
                    Nos reservamos el derecho de efectuar sin previo aviso las modificaciones que consideremos oportunas en nuestro portal, pudiendo cambiar, suprimir o añadir tanto los contenidos y servicios 
                    como la forma en que éstos aparezcan presentados.
                </p>
            </section>

        </div>
      </main>

      <footer className="bg-[#1A1F2C] text-white py-12 text-center text-sm text-slate-500">
         <p>© {new Date().getFullYear()} Nexus Health Strategies. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}