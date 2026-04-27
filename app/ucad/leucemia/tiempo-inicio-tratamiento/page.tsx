"use client";

import Link from "next/link";
import { ArrowLeft, Calendar, Filter, Search, Clock, Target, History, PlayCircle, CheckCircle2 } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, LineChart, Line, Cell } from "recharts";

// Datos para la distribución de tiempos (En horas/días)
const dataDistribucionInicio = [
  { name: '< 24 Horas', valor: 55, color: '#10b981' },
  { name: '24 - 48 Horas', valor: 35, color: '#3b82f6' },
  { name: '> 48 Horas', valor: 10, color: '#ef4444' },
];

// Datos para Tendencia Mensual de Inicio de Tratamiento
const dataTendenciaInicio = [
  { mes: 'Ene', promedio: 1.8 },
  { mes: 'Feb', promedio: 2.1 },
  { mes: 'Mar', promedio: 1.5 },
  { mes: 'Abr', promedio: 1.2 },
  { mes: 'May', promedio: 0.9 },
  { mes: 'Jun', promedio: 1.1 },
];

// Registro de oportunidad de inicio
const pacientesInicioTratamiento = [
  { id: "L2024-150", paciente: "Julian Castro", dx: "12/05/2026 08:00", inicio: "12/05/2026 20:00", horas: 12, estado: "Óptimo" },
  { id: "L2024-155", paciente: "Valentina Meza", dx: "14/05/2026 10:00", inicio: "15/05/2026 09:00", horas: 23, estado: "Óptimo" },
  { id: "L2024-160", paciente: "Mateo Ospina", dx: "18/05/2026 15:00", inicio: "20/05/2026 10:00", horas: 43, estado: "En Meta" },
  { id: "L2024-165", paciente: "Lucía Pineda", dx: "21/05/2026 09:00", inicio: "23/05/2026 14:00", horas: 53, estado: "Retraso" },
];

export default function TiempoInicioTratamientoDashboard() {
  return (
    <div className="relative min-h-screen w-full pb-12">
      {/* Fondo Institucional Translúcido */}
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
            <h1 className="text-2xl font-bold text-[#324D6D] tracking-tight">Tiempo Promedio de Espera: Inicio de Tratamiento</h1>
            <p className="text-sm text-slate-500">Unidad de Leucemia • Calidad de Proceso (Oportunidad Terapéutica)</p>
          </div>
        </div>

        {/* Filtros */}
        <div className="flex flex-wrap items-center gap-4 mb-8 text-sm">
          <div className="bg-white/90 backdrop-blur-sm px-3 py-2 rounded-xl border border-slate-200 shadow-sm flex items-center gap-2">
            <Calendar className="w-4 h-4 text-slate-400" />
            <select className="bg-transparent outline-none cursor-pointer font-medium"><option>Mes Actual</option></select>
          </div>
          <div className="bg-white/90 backdrop-blur-sm px-3 py-2 rounded-xl border border-slate-200 shadow-sm flex-1 max-w-xs flex items-center gap-2">
            <Search className="w-4 h-4 text-slate-400" />
            <input type="text" placeholder="Buscar por paciente o ID..." className="bg-transparent outline-none w-full" />
          </div>
        </div>

        {/* KPIs Estratégicos */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between border-l-4 border-l-emerald-500">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Tratamientos Iniciados</p>
              <p className="text-3xl font-bold text-slate-800">42</p>
            </div>
            <PlayCircle className="w-8 h-8 text-emerald-500 opacity-20" />
          </div>
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between border-l-4 border-l-blue-500">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Promedio de Inicio</p>
              <div className="flex items-baseline gap-1">
                <p className="text-3xl font-bold text-blue-600">1.1</p>
                <p className="text-[10px] font-bold text-slate-400">Días</p>
              </div>
            </div>
            <Clock className="w-8 h-8 text-blue-600 opacity-20" />
          </div>
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between border-l-4 border-l-slate-400">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Meta Institucional</p>
              <div className="flex items-baseline gap-1">
                <p className="text-3xl font-bold text-slate-800">&lt; 2</p>
                <p className="text-[10px] font-bold text-slate-400">Días</p>
              </div>
            </div>
            <Target className="w-8 h-8 text-slate-400 opacity-20" />
          </div>
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between border-l-4 border-l-emerald-600">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Cumplimiento Meta</p>
              <p className="text-3xl font-bold text-emerald-600">92%</p>
            </div>
            <CheckCircle2 className="w-8 h-8 text-emerald-600 opacity-20" />
          </div>
        </div>

        {/* Gráficas de Análisis */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          
          {/* Distribución de Oportunidad */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="text-sm font-bold text-slate-700 mb-1">Distribución de Oportunidad</h3>
            <p className="text-[10px] text-slate-400 mb-6">Rango de tiempo desde el diagnóstico al inicio de quimio</p>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dataDistribucionInicio} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 600}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10}} />
                  <RechartsTooltip cursor={{fill: '#f8fafc'}} formatter={(value) => [`${value} pacientes`, 'Cantidad']} />
                  <Bar dataKey="valor" radius={[4, 4, 0, 0]} barSize={40}>
                    {dataDistribucionInicio.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Tendencia Mensual */}
          <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="text-sm font-bold text-slate-700 mb-1">Tendencia de Inicio de Tratamiento</h3>
            <p className="text-[10px] text-slate-400 mb-6">Evolución mensual del tiempo promedio (Meta: 48h / 2 días)</p>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={dataTendenciaInicio} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="mes" axisLine={false} tickLine={false} tick={{fontSize: 12}} />
                  <YAxis domain={[0, 3]} axisLine={false} tickLine={false} tick={{fontSize: 10}} />
                  <RechartsTooltip cursor={{ fill: '#f8fafc' }} formatter={(value) => [`${value} Días`, 'Promedio']} />
                  <Line type="monotone" dataKey={() => 2.0} stroke="#ef4444" strokeWidth={2} strokeDasharray="5 5" dot={false} name="Límite Meta" />
                  <Line type="monotone" dataKey="promedio" stroke="#10b981" strokeWidth={3} dot={{ r: 5, fill: "#10b981", strokeWidth: 2, stroke: "#fff" }} name="Días Promedio" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Tabla Detallada */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-50 bg-emerald-50/30 flex justify-between items-center">
            <h3 className="text-sm font-bold text-emerald-800 flex items-center gap-2">
              <History className="w-4 h-4" /> Seguimiento de Inicio de Quimioterapia (Inducción)
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="text-slate-500 border-b border-slate-100 uppercase tracking-wider font-semibold bg-slate-50/50">
                  <th className="px-6 py-4">ID Paciente</th>
                  <th className="px-6 py-4">Nombre</th>
                  <th className="px-6 py-4 text-center">Confirmación Dx</th>
                  <th className="px-6 py-4 text-center">Inicio Tratamiento</th>
                  <th className="px-6 py-4 text-center">Tiempo (Horas)</th>
                  <th className="px-6 py-4 text-right">Estatus</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {pacientesInicioTratamiento.map((p, i) => (
                  <tr key={i} className="hover:bg-slate-50 transition-colors text-slate-600">
                    <td className="px-6 py-4 font-bold">{p.id}</td>
                    <td className="px-6 py-4 font-medium text-slate-800">{p.paciente}</td>
                    <td className="px-6 py-4 text-center font-mono text-slate-500">{p.dx}</td>
                    <td className="px-6 py-4 text-center font-mono text-slate-500">{p.inicio}</td>
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