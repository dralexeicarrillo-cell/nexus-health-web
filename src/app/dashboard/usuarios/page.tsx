import { clerkClient, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Users, Shield, Mail } from "lucide-react";
import RoleToggleButton from "@/components/RoleToggleButton"; 

export default async function UsersPage() {
  
  // 1. OBTENER USUARIO ACTUAL
  const user = await currentUser();

  // --- CORRECCIÓN DEL ERROR ---
  // Verificamos que el usuario exista antes de continuar.
  // Esto elimina el error "'user' is possibly 'null'"
  if (!user) {
      redirect("/"); 
  }

  // 2. SEGURIDAD: Solo el Admin puede entrar aquí
  const metadata = user.publicMetadata as any;
  if (metadata?.role !== 'admin') {
    redirect('/dashboard');
  }

  // 3. OBTENER LISTA DE USUARIOS (Desde Clerk)
  const client = await clerkClient();
  const usersResponse = await client.users.getUserList({
    orderBy: '-created_at',
    limit: 50,
  });
  
  const users = usersResponse.data;

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 space-y-8 animate-in fade-in">
      
      <div className="flex items-center justify-between">
        <div>
            <h1 className="text-3xl font-serif font-bold text-slate-800">Gestión de Usuarios</h1>
            <p className="text-slate-500 mt-1">Administra accesos y roles de la plataforma.</p>
        </div>
        <div className="bg-white px-4 py-2 rounded-lg border border-slate-200 shadow-sm text-sm font-medium text-slate-600">
            Total Registrados: {usersResponse.totalCount}
        </div>
      </div>

      {/* TABLA DE USUARIOS */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 border-b border-slate-100 text-slate-500 uppercase tracking-wider text-xs font-semibold">
                <tr>
                    <th className="p-4">Usuario</th>
                    <th className="p-4">Fecha Registro</th>
                    <th className="p-4">Rol Actual</th>
                    <th className="p-4 text-right">Acciones</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
                {users.map((u) => {
                    const role = (u.publicMetadata.role as string) || 'user';
                    const isAdmin = role === 'admin';
                    const email = u.emailAddresses[0]?.emailAddress;

                    return (
                        <tr key={u.id} className="hover:bg-slate-50/50 transition-colors">
                            <td className="p-4">
                                <div className="flex items-center gap-3">
                                    <img src={u.imageUrl} alt="" className="w-8 h-8 rounded-full bg-slate-200" />
                                    <div>
                                        <p className="font-bold text-slate-700">
                                            {u.firstName} {u.lastName}
                                        </p>
                                        <div className="flex items-center gap-1 text-xs text-slate-400">
                                            <Mail size={12}/> {email}
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td className="p-4 text-slate-500">
                                {new Date(u.createdAt).toLocaleDateString()}
                            </td>
                            <td className="p-4">
                                <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold border ${
                                    isAdmin 
                                    ? 'bg-purple-100 text-purple-700 border-purple-200' 
                                    : 'bg-slate-100 text-slate-600 border-slate-200'
                                }`}>
                                    {isAdmin ? <Shield size={12}/> : <Users size={12}/>}
                                    {isAdmin ? 'ADMIN' : 'Usuario'}
                                </span>
                            </td>
                            <td className="p-4 text-right">
                                {/* Ahora TypeScript sabe que 'user' no es null */}
                                <RoleToggleButton userId={u.id} currentRole={role} isMe={u.id === user.id} />
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
      </div>
    </div>
  );
}