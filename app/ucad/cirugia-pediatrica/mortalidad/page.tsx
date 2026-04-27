"use client";

import Link from "next/link";
import { ArrowLeft, Calendar, Search, Activity, Target, ShieldCheck, Heart, AlertCircle, Clock } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, AreaChart, Area } from "recharts";

// Datos: Tendencia de Supervivencia Global (%)
const dataSupervivencia = [
  { mes: 'Ene', valor: 100 },
  { mes: 'Feb', valor: 100 },
  { mes: 'Mar', valor: 100 },
  { mes: 'Abr', valor: 100 },
  { mes: 'May', valor: 100 },
  { mes: 'Jun', valor: 100 },
];

// Registro de Auditoría de Mortalidad (Comité M&M)
const logMortalidad = [
  { id: "MM-2026-000", paciente: "N/A", diagnostico: "N/A", causa: "Sin eventos registrados", fecha: "N/A", estado: "Cumplimiento 100%" },
];

export default function MortalidadDashboard() {
  
  // Lógica de Gestión (Meta 0%)
  const muertesRegistradas = 0;
  const cirugiasTotales = 452;
  
  // Cálculo de cumplimiento: Si mortalidad es 0, cumplimiento es 100%
  // Aplicando regla de tope conservador del 100%
  const cumplimientoReal = muertesRegistradas === 0 ? 100 : 0; 
  const cumplimientoMostrado = cumplimientoReal > 100 ? 100 : cumplimientoReal;

  return (
    <div className="relative min-h-screen w-full pb-12">
      {/* Fondo Institucional */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <img src="/fondo.jpg" alt="Fondo" className="w-full h-full object-cover opacity-15 grayscale" />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50/10 via-transparent to-slate-50/90"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto mt-4 px-4">
        {/* Encabezado */}
        <div className="flex items-center gap-4 mb-6">
          <Link href="/ucad/cirugia-pediatrica" className="p-2 hover:bg-white/80 rounded-full transition-colors flex items-center gap-2 text-sm font-medium text-slate-600 bg-white/50 border border-slate-200 shadow-sm">
            <ArrowLeft className="w-4 h-4" /> Volver
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-[#324D6D] tracking-tight">% Mortalidad Quirúrgica</h1>
            <p className="text-sm text-slate-500">Unidad de Cirugía Pediátrica • Excelencia Clínica • Meta 0%</p>
          </div>
        </div>

        {/* KPIs Estratégicos */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between border-l-4 border-l-slate-600">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Procedimientos Totales</p>
              <p className="text-3xl font-bold text-slate-800">{cirugiasTotales}</p>
            </div>
            <Activity className="w-8 h-8 text-slate-600 opacity-20" />
          </div>
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between border-l-4 border-l-emerald-500">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Mortalidad Real</p>
              <p className="text-3xl font-bold text-emerald-600">0%</p>
            </div>
            <Heart className="w-8 h-8 text-emerald-500 opacity-20" />
          </div>
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between border-l-4 border-l-blue-500">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Días sin Eventos</p>
              <p className="text-3xl font-bold text-blue-600">184</p>
            </div>
            <Clock className="w-8 h-8 text-blue-600 opacity-20" />
          </div>
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between border-l-4 border-l-indigo-500">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Cumplimiento Auditado</p>
              <p className="text-3xl font-bold text-indigo-600">{cumplimientoMostrado}%</p>
            </div>
            <ShieldCheck className="w-8 h-8 text-indigo-500 opacity-20" />
          </div>
        </div>

        {/* Gráficas */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          
          {/* Gráfico de Área: Estabilidad de la Supervivencia */}
          <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="text-sm font-bold text-slate-700 mb-1">Monitor de Seguridad Quirúrgica</h3>
            <p className="text-[10px] text-slate-400 mb-6">Tasa de éxito quirúrgico mensual (Meta 100% supervivencia)</p>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={dataSupervivencia} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="mes" axisLine={false} tickLine={false} tick={{fontSize: 12}} />
                  <YAxis domain={[98, 100]} hide />
                  <RechartsTooltip />
                  <Area type="monotone" dataKey="valor" stroke="#10b981" fillOpacity={1} fill="url(#colorVal)" strokeWidth={3} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Información Institucional */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-center text-center">
            <div className="mb-4 inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 mx-auto">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-800">Cero Eventos Fatales</h3>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed px-4">
              La Unidad mantiene una trayectoria de seguridad impecable durante el periodo actual, cumpliendo con los estándares internacionales de excelencia quirúrgica.
            </p>
            <div className="mt-6 pt-6 border-t border-slate-50">
              <p className="text-[10px] font-bold text-slate-400 uppercase">Última revisión de Comité</p>
              <p className="text-sm font-bold text-slate-700">24 de Abril, 2026</p>
            </div>
          </div>
        </div>

        {/* Tabla de Auditoría (Comité M&M) */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-50 bg-slate-50/50 flex justify-between items-center">
            <h3 className="text-sm font-bold text-slate-700 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-slate-400" /> Registro Comité de Morbimortalidad (M&M)
            </h3>
            <button className="text-[10px] font-bold text-slate-600 bg-white px-3 py-1.5 rounded-lg border border-slate-200">Ver Histórico</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="text-slate-500 border-b border-slate-100 uppercase tracking-wider font-semibold bg-white">
                  <th className="px-6 py-4">ID Caso</th>
                  <th className="px-6 py-4">Paciente</th>
                  <th className="px-6 py-4">Diagnóstico</th>
                  <th className="px-6 py-4">Análisis de Causa</th>
                  <th className="px-6 py-4 text-center">Fecha</th>
                  <th className="px-6 py-4 text-right">Resultado Auditoría</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {logMortalidad.map((p, i) => (
                  <tr key={i} className="text-slate-400 italic">
                    <td className="px-6 py-4">{p.id}</td>
                    <td className="px-6 py-4">{p.paciente}</td>
                    <td className="px-6 py-4">{p.diagnostico}</td>
                    <td className="px-6 py-4">{p.causa}</td>
                    <td className="px-6 py-4 text-center">{p.fecha}</td>
                    <td className="px-6 py-4 text-right font-bold text-emerald-600 uppercase text-[9px]">{p.estado}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}