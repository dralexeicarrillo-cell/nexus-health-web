import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Definimos las rutas protegidas
const isProtectedRoute = createRouteMatcher(['/dashboard(.*)']);

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    await auth.protect();
  }
}, {
  // TUS LLAVES (Mantenlas aquí si te funcionaron bien así)
  publishableKey: "pk_test_bmVhdC1vcmNhLTEwLmNsZXJrLmFjY291bnRzLmRldiQ",
  secretKey: "sk_test_eMcsGxmvLb9Mz8fIQL8ZXmS3jN6JnOJW3pWiUj9n2s"
});

export const config = {
  // ESTE ES EL CAMBIO CLAVE: El matcher estándar que no rompe Next.js
  matcher: [
    // Excluir archivos estáticos y de sistema (_next)
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Siempre ejecutar en rutas API
    '/(api|trpc)(.*)',
  ],
};