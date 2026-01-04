import type { Metadata } from "next";
import { Playfair_Display, Lato } from "next/font/google";
import { ClerkProvider } from '@clerk/nextjs';
import "./globals.css";

const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const lato = Lato({ 
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "NexusHealth Strategies | Consultoría en Salud Digital",
  description: "Transformación digital, regulación y estrategia sanitaria en América Latina y EE.UU.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // CAMBIO AQUÍ: Pasamos la llave explícitamente
    <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
      <html lang="es" className={`${playfair.variable} ${lato.variable}`}>
        <body className="font-sans antialiased bg-white text-slate-900">
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}