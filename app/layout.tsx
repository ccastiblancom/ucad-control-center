import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from '@/components/Footer'; 

export const metadata: Metadata = {
  title: "Torre de Control UCADs",
  description: "Plataforma de gestión y control de resultados clínicos de las UCADs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="bg-slate-50 min-h-screen font-sans antialiased text-slate-900 flex flex-col">
        {/* Encabezado global */}
        <Header />
        
        {/* Contenido principal: Crece para empujar el footer hacia abajo */}
        <main className="flex-1 p-8">
          {children}
        </main>

        {/* Footer global: Fuera del main para que ocupe todo el ancho inferior */}
        <Footer />
      </body>
    </html>
  );
}