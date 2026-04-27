"use client";

import Link from "next/link";
import { ArrowLeft, Calendar, Filter, Search, Microscope, Target, Zap, Clock, FileSpreadsheet } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, LineChart, Line, Cell } from "recharts";

// Datos para la distribución de tiempos de reporte (en horas)
const dataDistribucionCitometria = [
  { name: '< 24 Horas', valor: 70, color: '#8b5cf6' }, // Púrpura (Óptimo)
  { name: '24 - 48 Horas', valor: 25, color: '#a78bfa' }, // Púrpura claro (En meta)
  { name: '> 48 Horas', valor: 5, color: '#ef4444' }, // Rojo (Fuera de meta)
];

// Datos para Tendencia Mensual de Oportunidad
const dataTendenciaCitometria = [
  { mes: 'Ene', horas: 32 },
  { mes: 'Feb', horas: 28 },
  { mes: 'Mar', horas: 30 },
  { mes: 'Abr', horas: 22 },
  { mes: 'May', horas: 19 },
  { mes: 'Jun', horas: 21 },
];

// Registro detallado de muestras
const muestrasCitometria = [
  { id: "CMF-2026-088", paciente: "Julian Castro", toma: "12/05/2026 09:00", reporte: "12/05/2026 21:00", horas: 12, estado: "Óptimo" },
  { id: "CMF-2026-092", paciente: "Valentina Meza", toma: "14/05/2026 11:30", reporte: "15/05/2026 10:00", horas: 22.5, estado: "Óptimo" },
  { id: "CMF-2026-095", paciente: "Mateo Ospina", toma: "18/05/2026 14:00", reporte: "20/05/2026 08:00", horas: 42, estado: "En Meta" },
  { id: "CMF-2026-101", paciente: "Lucía Pineda", toma: "21/05/2026 07:00", reporte: "23/05/2026 15:00", horas: 56, estado: "Retraso" },
];

export default function OportunidadCitometriaDashboard() {
  return (
    <div className="relative min-h-screen w-full pb-12">
      {/* Fondo Institucional */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <img src="/fondo.jpg" alt="Fondo" className="w-full h-full object-cover opacity-15" />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50/10 via-transparent to-slate-50/90"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto mt-4 px-4">
        {/* Encabezado */}
        <div className="flex items-center gap-4 mb-6">
          <Link href="/ucad/leucemia" className="p-2 hover:bg-white/80 rounded-full transition-colors flex items-center gap-2 text-sm font-medium text-slate-600 bg-white/50 border border-slate-200 shadow-sm">
            <ArrowLeft className="w-4 h-4" /> Volver
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-[#324D6D] tracking-tight">Oportunidad en Resultado de Citometría de Flujo</h1>
            <p className="text-sm text-slate-500">Unidad de Leucemia • Calidad de Proceso (Laboratorio Especializado)</p>
          </div>
        </div>

        {/* Filtros Profesionales */}
        <div className="flex flex-wrap items-center gap-4 mb-8 text-sm">
          <div className="bg-white/90 backdrop-blur-sm px-3 py-2 rounded-xl border border-slate-200 shadow-sm flex items-center gap-2">
            <Calendar className="w-4 h-4 text-slate-400" />
            <select className="bg-transparent outline-none cursor-pointer font-medium"><option>Mes de Junio</option></select>
          </div>
          <div className="bg-white/90 backdrop-blur-sm px-3 py-2 rounded-xl border border-slate-200 shadow-sm flex-1 max-w-xs flex items-center gap-2">
            <Search className="w-4 h-4 text-slate-400" />
            <input type="text" placeholder="Buscar por muestra o paciente..." className="bg-transparent outline-none w-full" />
          </div>
        </div>

        {/* KPIs Estratégicos */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between border-l-4 border-l-purple-500">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Muestras Procesadas</p>
              <p className="text-3xl font-bold text-slate-800">48</p>
            </div>
            <Microscope className="w-8 h-8 text-purple-500 opacity-20" />
          </div>
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between border-l-4 border-l-blue-500">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Tiempo Promedio</p>
              <div className="flex items-baseline gap-1">
                <p className="text-3xl font-bold text-blue-600">22</p>
                <p className="text-[10px] font-bold text-slate-400">Horas</p>
              </div>
            </div>
            <Clock className="w-8 h-8 text-blue-600 opacity-20" />
          </div>
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between border-l-4 border-l-slate-400">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Meta (TAT)</p>
              <div className="flex items-baseline gap-1">
                <p className="text-3xl font-bold text-slate-800">&lt; 48</p>
                <p className="text-[10px] font-bold text-slate-400">Horas</p>
              </div>
            </div>
            <Target className="w-8 h-8 text-slate-400 opacity-20" />
          </div>
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between border-l-4 border-l-emerald-500">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Cumplimiento Meta</p>
              <p className="text-3xl font-bold text-emerald-600">95%</p>
            </div>
            <Zap className="w-8 h-8 text-emerald-600 opacity-20" />
          </div>
        </div>

        {/* Gráficas de Análisis */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          
          {/* Distribución de Oportunidad */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="text-sm font-bold text-slate-700 mb-1">Distribución de Entrega (TAT)</h3>
            <p className="text-[10px] text-slate-400 mb-6">Eficiencia del laboratorio en el reporte de resultados</p>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dataDistribucionCitometria} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 600}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10}} />
                  <RechartsTooltip cursor={{fill: '#f8fafc'}} formatter={(value) => [`${value}%`, 'Proporción']} />
                  <Bar dataKey="valor" radius={[4, 4, 0, 0]} barSize={40}>
                    {dataDistribucionCitometria.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Tendencia Mensual */}
          <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="text-sm font-bold text-slate-700 mb-1">Evolución de Tiempos de Reporte</h3>
            <p className="text-[10px] text-slate-400 mb-6">Promedio mensual de horas desde toma de muestra a resultado</p>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={dataTendenciaCitometria} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="mes" axisLine={false} tickLine={false} tick={{fontSize: 12}} />
                  <YAxis domain={[0, 60]} axisLine={false} tickLine={false} tick={{fontSize: 10}} />
                  <RechartsTooltip cursor={{ fill: '#f8fafc' }} formatter={(value) => [`${value} Horas`, 'Promedio']} />
                  <Line type="monotone" dataKey={() => 48} stroke="#ef4444" strokeWidth={2} strokeDasharray="5 5" dot={false} name="Límite Meta (48h)" />
                  <Line type="monotone" dataKey="horas" stroke="#8b5cf6" strokeWidth={3} dot={{ r: 5, fill: "#8b5cf6", strokeWidth: 2, stroke: "#fff" }} name="Horas Promedio" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Tabla Detallada */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-50 bg-purple-50/30 flex justify-between items-center">
            <h3 className="text-sm font-bold text-purple-800 flex items-center gap-2">
              <FileSpreadsheet className="w-4 h-4" /> Registro Auditoría de Muestras CMF
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="text-slate-500 border-b border-slate-100 uppercase tracking-wider font-semibold bg-slate-50/50">
                  <th className="px-6 py-4">ID Muestra</th>
                  <th className="px-6 py-4">Paciente</th>
                  <th className="px-6 py-4 text-center">Toma de Muestra</th>
                  <th className="px-6 py-4 text-center">Fecha Reporte</th>
                  <th className="px-6 py-4 text-center">TAT (Horas)</th>
                  <th className="px-6 py-4 text-right">Calificación</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {muestrasCitometria.map((p, i) => (
                  <tr key={i} className="hover:bg-slate-50 transition-colors text-slate-600">
                    <td className="px-6 py-4 font-bold">{p.id}</td>
                    <td className="px-6 py-4 font-medium text-slate-800">{p.paciente}</td>
                    <td className="px-6 py-4 text-center font-mono text-slate-500">{p.toma}</td>
                    <td className="px-6 py-4 text-center font-mono text-slate-500">{p.reporte}</td>
                    <td className="px-6 py-4 text-center font-bold text-slate-700">{p.horas}h</td>
                    <td className="px-6 py-4 text-right">
                      <span className={`px-3 py-1 rounded-md font-bold ${
                        p.estado === 'Óptimo' ? 'text-emerald-600 bg-emerald-50' : 
                        p.estado === 'En Meta' ? 'text-blue-600 bg-blue-50' : 
                        'text-rose-600 bg-rose-50'
                      }`}>
                        {p.estado}
                      </span>
                    </td>
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