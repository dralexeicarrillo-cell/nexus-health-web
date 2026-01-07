'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import Link from 'next/link' // <--- IMPORTANTE: Necesario para navegar

interface Client {
  id: string
  created_at: string
  company_name: string
  company_email: string
  contact_name: string
  contact_position: string
  total_score: number
}

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchClients()
  }, [])

  async function fetchClients() {
    try {
      const { data, error } = await supabase
        .from('assessments')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      
      setClients((data as any) || [])
    } catch (error: any) {
      console.error('Error cargando clientes:', error.message)
    } finally {
      setLoading(false)
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'bg-green-100 text-green-800'
    if (score >= 60) return 'bg-blue-100 text-blue-800'
    if (score >= 40) return 'bg-yellow-100 text-yellow-800'
    return 'bg-red-100 text-red-800'
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Cartera de Clientes (En vivo)</h1>
          <p className="text-slate-500 text-sm">Leads generados desde la Calculadora LATAM</p>
        </div>
        <button 
          onClick={fetchClients}
          className="px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition text-sm flex items-center gap-2"
        >
          🔄 Actualizar Lista
        </button>
      </div>

      {loading ? (
        <div className="text-center py-20 text-slate-400">Cargando datos...</div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-xs uppercase text-slate-500 font-semibold">
              <tr>
                <th className="px-6 py-4">Empresa / Contacto</th>
                <th className="px-6 py-4">Fecha Registro</th>
                <th className="px-6 py-4 text-center">Nivel Preparación</th>
                <th className="px-6 py-4 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {clients.map((client) => (
                <tr key={client.id} className="hover:bg-slate-50 transition group">
                  <td className="px-6 py-4">
                    {/* ENLACE EN EL NOMBRE */}
                    <Link href={`/dashboard/clientes/${client.id}`} className="font-bold text-slate-900 hover:text-blue-600 hover:underline">
                        {client.company_name}
                    </Link>
                    <div className="text-sm text-slate-500">{client.contact_name}</div>
                    <div className="text-xs text-slate-400">{client.company_email}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">
                    {new Date(client.created_at).toLocaleDateString('es-CR', {
                      day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute:'2-digit'
                    })}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${getScoreColor(client.total_score)}`}>
                      {client.total_score}/100
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center gap-3">
                        {/* BOTÓN DE VER DETALLE */}
                        <Link 
                            href={`/dashboard/clientes/${client.id}`}
                            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md text-xs font-bold border border-slate-300 transition flex items-center gap-1"
                        >
                            👁️ Ver Radiografía
                        </Link>
                        
                        {/* EMAIL RÁPIDO */}
                        <a 
                        href={`mailto:${client.company_email}`}
                        title="Enviar correo"
                        className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded transition"
                        >
                        ✉️
                        </a>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {clients.length === 0 && (
            <div className="p-12 text-center text-slate-400">
              No se encontraron leads aún.
            </div>
          )}
        </div>
      )}
    </div>
  )
}