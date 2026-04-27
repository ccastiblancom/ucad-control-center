"use client"; // Importante: Recharts requiere ejecución del lado del cliente

import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

// Definimos las propiedades que recibirá el componente
interface ComplianceGaugeProps {
  percentage: number; // Número del 0 al 100
}

const ComplianceGauge: React.FC<ComplianceGaugeProps> = ({ percentage }) => {
  // Aseguramos que el valor esté entre 0 y 100
  const normalizedValue = Math.min(100, Math.max(0, percentage));

  // Lógica de colores semánticos (idéntica a tus mockups)
  const getColor = (value: number) => {
    if (value < 50) return "#ef4444"; // Alerta Roja (crítico)
    if (value < 75) return "#f59e0b"; // Alerta Amarilla (prevención)
    return "#009988"; // Alerta Verde (Cumplimiento UCAD Epilepsia)
  };

  const fillColor = getColor(normalizedValue);

  // Estructura de datos para Recharts
  // Primer registro: La parte "llena" (progreso)
  // Segundo registro: La parte "vacía" (el fondo gris claro)
  const chartData = [
    { name: "Progress", value: normalizedValue, fill: fillColor },
    { name: "Remaining", value: 100 - normalizedValue, fill: "#f1f5f9" }, // slate-100 bg
  ];

  return (
    // Contenedor relativo para posicionar el texto en el centro
    <div className="relative w-full max-w-[300px] h-[180px] mx-auto flex items-end justify-center">
      
      {/* 1. El Gráfico SVG (Recharts) */}
      <ResponsiveContainer width="100%" height="100%">
        <PieChart margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
          <Pie
            data={chartData}
            cx="50%"       // Centro X (mitad)
            cy="100%"      // Centro Y (al fondo para que sea la base del semicírculo)
            startAngle={180} // Half-circle empieza a la izquierda
            endAngle={0}     // Half-circle termina a la derecha
            innerRadius={80}  // Radio interno (el agujero)
            outerRadius={120} // Radio externo (el arco)
            paddingAngle={0}
            dataKey="value"
            stroke="none"    // Sin borde en los segmentos
            cornerRadius={10} // Puntas redondeadas modernas
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>

      {/* 2. El Texto Central (Porcentaje & Etiqueta) CORREGIDO */}
      {/* Añadimos h-20 (80px) para que coincida con el hueco interior y quitamos el pb-4 para que no se suba */}
      <div className="absolute inset-x-0 bottom-0 h-20 flex flex-col items-center justify-center text-center">
        <div className="text-5xl font-extrabold text-slate-800 tracking-tighter tabular-nums">
          {normalizedValue}%
        </div>
        <div className="text-sm font-medium text-slate-500 mt-1">
          Cumplimiento
        </div>
      </div>
    </div>
  );
};

export default ComplianceGauge;