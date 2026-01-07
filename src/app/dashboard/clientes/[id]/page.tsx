'use client'

import { useEffect, useState, use } from 'react' // <--- Agregamos 'use'
import { supabase } from '@/lib/supabase'
import ClientDetailView from '@/components/ClientDetailView'
import { notFound } from 'next/navigation'

// Definimos params como una Promesa
export default function ClientPage({ params }: { params: Promise<{ id: string }> }) {
  // Desempaquetamos el ID usando el hook 'use'
  const { id } = use(params) 
  
  const [assessment, setAssessment] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAssessment = async () => {
      try {
        const { data, error } = await supabase
          .from('assessments')
          .select('*')
          .eq('id', id) // Usamos el id ya desempaquetado
          .single()

        if (error) {
          console.error('Error fetching assessment:', error)
          setAssessment(null)
        } else {
          setAssessment(data)
        }
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    if (id) {
        fetchAssessment()
    }
  }, [id])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-slate-400">
        Cargando radiografía...
      </div>
    )
  }

  if (!assessment) {
    return notFound()
  }

  return <ClientDetailView assessment={assessment} />
}