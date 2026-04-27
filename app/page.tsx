import Link from "next/link";

export default function Home() {
  return (
    <main className="relative min-h-screen w-full flex items-center justify-center bg-slate-50 overflow-hidden">
      
      {/* Capa de Fondo Translucida */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <img 
          src="/fondo.jpg" 
          alt="Fondo Institucional" 
          className="w-full h-full object-cover opacity-20 grayscale-[20%]"
        />
        {/* Degradado sutil para suavizar los bordes y mejorar el contraste */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50/10 via-transparent to-slate-50/80"></div>
      </div>

      {/* Contenido Principal - Centrado absoluto sin scroll */}
      <div className="relative z-10 w-full max-w-6xl px-6 py-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">

          {/* 1. Tarjeta Epilepsia */}
          <Link href="/ucad/epilepsia" className="group">
            <div className="relative w-full aspect-[4/3] rounded-[2.5rem] overflow-hidden shadow-xl transition-all duration-500 transform group-hover:-translate-y-3 group-hover:shadow-2xl cursor-pointer border border-white/60 bg-white/10 backdrop-blur-sm">
              <img 
                src="/Epilepsia.jpg" 
                alt="Unidad de Epilepsia" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              {/* Overlay sutil para mejorar el look profesional */}
              <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-500"></div>
            </div>
          </Link>

          {/* 2. Tarjeta Cirugía Pediátrica */}
          <Link href="/ucad/cirugia-pediatrica" className="group">
            <div className="relative w-full aspect-[4/3] rounded-[2.5rem] overflow-hidden shadow-xl transition-all duration-500 transform group-hover:-translate-y-3 group-hover:shadow-2xl cursor-pointer border border-white/60 bg-white/10 backdrop-blur-sm">
              <img 
                src="/cirugia.jpg" 
                alt="Cirugía Pediátrica" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-500"></div>
            </div>
          </Link>

          {/* 3. Tarjeta Leucemia */}
          <Link href="/ucad/leucemia" className="group">
            <div className="relative w-full aspect-[4/3] rounded-[2.5rem] overflow-hidden shadow-xl transition-all duration-500 transform group-hover:-translate-y-3 group-hover:shadow-2xl cursor-pointer border border-white/60 bg-white/10 backdrop-blur-sm">
              <img 
                src="/leucemia.jpg" 
                alt="Unidad de Leucemia" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-500"></div>
            </div>
          </Link>

        </div>
      </div>
    </main>
  );
}