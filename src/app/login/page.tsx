import { SignIn } from "@clerk/nextjs";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-serif font-bold tracking-tight text-[#1A1F2C]">
            Bienvenido a NexusHealth
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Ingresa tus credenciales para acceder al Dashboard.
          </p>
        </div>
        
        <div className="flex justify-center mt-8">
          {/* El componente de Login oficial de Clerk */}
          <SignIn routing="hash" />
        </div>
      </div>
    </div>
  );
}