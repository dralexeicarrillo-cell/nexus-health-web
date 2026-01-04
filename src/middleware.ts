import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Definimos qué rutas son protegidas
const isProtectedRoute = createRouteMatcher(['/dashboard(.*)']);

// Agregamos 'async' antes de (auth, req)
export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    // Esperamos a que auth() resuelva y luego protegemos
    await auth.protect(); 
  }
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};