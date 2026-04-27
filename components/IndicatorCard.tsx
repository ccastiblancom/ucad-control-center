import React from "react";

export default function IndicatorCard({ 
  titulo, 
  icono, 
  colorFondo 
}: { 
  titulo: string; 
  icono: React.ReactNode; 
  colorFondo: string; 
}) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-start gap-4 hover:shadow-md transition-shadow">
      <div className={`p-3 rounded-xl text-white ${colorFondo}`}>
        {icono}
      </div>
      <h3 className="text-slate-700 font-semibold text-sm leading-tight">
        {titulo}
      </h3>
    </div>
  );
}