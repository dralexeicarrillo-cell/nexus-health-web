import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Definimos que solo lo que empiece por /dashboard es zona restringida
const isProtectedRoute = createRouteMatcher(['/dashboard(.*)']);

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  // CAMBIO AQUÍ: Solo ejecutamos el middleware en rutas que empiecen por /dashboard
  matcher: [
    "/dashboard(.*)"
  ],
};