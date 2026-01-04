import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Definimos que solo lo que empiece por /dashboard es zona restringida
const isProtectedRoute = createRouteMatcher(['/dashboard(.*)']);

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    await auth.protect();
  }
}, {
  // ⚠️ PEGA TUS LLAVES REALES AQUÍ ABAJO (DENTRO DE LAS COMILLAS)
  publishableKey: "pk_test_bmVhdC1vcmNhLTEwLmNsZXJrLmFjY291bnRzLmRldiQ",
  secretKey: "sk_test_eMcsGxmvLb9Mz8fIQL8ZXmS3jN6JnOJW3pWiUj9n2s"
});

export const config = {
  matcher: [
    // Solo ejecutamos el middleware en rutas que empiecen por /dashboard
    "/dashboard(.*)"
  ],
};