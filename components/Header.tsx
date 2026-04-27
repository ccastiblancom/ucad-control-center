import { Upload } from "lucide-react";
import Link from "next/link";
// Importamos el componente de Imagen optimizado de Next.js
import Image from "next/image"; 

export default function Header() {
  return (
    <header className="flex items-center justify-between px-8 py-4 bg-white border-b border-gray-200 shadow-sm">
      {/* Lado Izquierdo: Títulos con enlace al Home */}
      <Link href="/" className="hover:opacity-80 transition-opacity">
        <div>
          <h1 className="text-[26px] font-semibold text-[#324D6D] tracking-wide">
            UNIDAD CLÍNICA ALTO DESEMPEÑO
          </h1>
          <p className="text-sm text-slate-500 font-medium">Torre de Control UCADs</p>
        </div>
      </Link>

      {/* Lado Derecho: Botón de Cargar Datos y Logo Real */}
      <div className="flex items-center gap-6">
        {/* Botón Cargar Datos */}
        <button className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-teal-600 bg-white border-2 border-teal-500 rounded-lg hover:bg-teal-50 transition-colors">
          <Upload className="w-4 h-4" />
          Cargar Datos
        </button>

        {/* Separador visual */}
        <div className="h-10 w-px bg-gray-200"></div>

        {/* CONTENEDOR DEL LOGO (png) */}
        <div className="relative w-[150px] h-[60px] flex items-center justify-center">
          <Image 
            src="/logo-homi.png" // ¡Aquí estaba el detalle! Con la 'e' de png
            alt="Logo HOMI Hospital Pediátrico"
            fill 
            sizes="150px" // Esto elimina la advertencia naranja de la terminal
            className="object-contain" 
            priority 
          />
        </div>
      </div>
    </header>
  );
}