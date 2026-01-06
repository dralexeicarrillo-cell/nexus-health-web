'use client' // Importante si usas Next.js App Router (carpetas nuevas)

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase' // Asegúrate que esta ruta coincida con el paso 2

export default function LeadsPage() {
  const [leads, setLeads] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchLeads()
  }, [])

  async function fetchLeads() {
    try {
      // Pedimos todos los datos a la tabla 'assessments'
      const { data, error } = await supabase
        .from('assessments')
        .select('*')
        .order('created_at', { ascending: false }) // Los más nuevos primero

      if (error) throw error
      setLeads(data || [])
    } catch (error) {
      console.error('Error cargando leads:', error.message)
    } finally {
      setLoading(false)
    }
  }

  // Función para determinar el color según el puntaje
  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-600 bg-green-100'
    if (score >= 60) return 'text-blue-600 bg-blue-100'
    if (score >= 40) return 'text-yellow-600 bg-yellow-100'
    return 'text-red-600 bg-red-100'
  }

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-slate-800">🚀 Leads de Calculadora</h1>
        <button 
          onClick={fetchLeads}
          className="px-4 py-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition"
        >
          🔄 Actualizar
        </button>
      </div>

      {loading ? (
        <p className="text-center text-gray-500">Cargando datos...</p>
      ) : (
        <div className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-100">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 text-slate-600 uppercase text-xs tracking-wider">
                  <th className="p-4 font-semibold">Fecha</th>
                  <th className="p-4 font-semibold">Empresa</th>
                  <th className="p-4 font-semibold">Contacto</th>
                  <th className="p-4 font-semibold text-center">Puntaje</th>
                  <th className="p-4 font-semibold text-center">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {leads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-slate-50 transition">
                    <td className="p-4 text-sm text-gray-500">
                      {new Date(lead.created_at).toLocaleDateString()}
                    </td>
                    <td className="p-4">
                      <div className="font-semibold text-gray-900">{lead.company_name}</div>
                      <div className="text-xs text-gray-400">{lead.company_email}</div>
                    </td>
                    <td className="p-4 text-gray-700">
                      {lead.contact_name}
                      <div className="text-xs text-gray-400">{lead.contact_position}</div>
                    </td>
                    <td className="p-4 text-center">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${getScoreColor(lead.total_score)}`}>
                        {lead.total_score}/100
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      <a 
                        href={`mailto:${lead.company_email}`}
                        className="text-blue-500 hover:text-blue-700 font-medium text-sm"
                      >
                        Enviar Correo
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {leads.length === 0 && (
            <div className="p-10 text-center text-gray-400">
              No hay leads registrados todavía. ¡Usa la calculadora para crear uno!
            </div>
          )}
        </div>
      )}
    </div>
  )
}