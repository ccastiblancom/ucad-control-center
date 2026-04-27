"use client";

import Link from "next/link";
import { ArrowLeft, Calendar, Filter, Search, AlertCircle, CheckCircle2, Clock, TrendingUp, FileSearch } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, LineChart, Line, Cell } from "recharts";

// Tipología de barreras encontradas
const dataTiposBarreras = [
  { name: 'Autorizaciones EPS', valor: 45, color: '#f43f5e' },
  { name: 'Falta de Medicamentos', valor: 30, color: '#fb923c' },
  { name: 'Citas Especialistas', valor: 15, color: '#3b82f6' },
  { name: 'Transporte / Logística', valor: 10, color: '#94a3b8' },
];

// Tendencia de resolución de barreras
const dataResolucionMensual = [
  { mes: 'Ene', resolucion: 78 },
  { mes: 'Feb', resolucion: 82 },
  { mes: 'Mar', resolucion: 80 },
  { mes: 'Abr', resolucion: 85 },
  { mes: 'May', resolucion: 89 },
  { mes: 'Jun', resolucion: 92 },
];

// Registro detallado de la navegación de pacientes
const logBarreras = [
  { id: "NAV-2026-045", paciente: "Julian Castro", barrera: "Autorización QT", tiempo: "24h", estado: "Resuelta" },
  { id: "NAV-2026-048", paciente: "Valentina Meza", barrera: "Entrega L-Asparaginasa", tiempo: "72h", estado: "En Gestión" },
  { id: "NAV-2026-052", paciente: "Mateo Ospina", barrera: "Cita Cardiología", tiempo: "48h", estado: "Resuelta" },
  { id: "NAV-2026-055", paciente: "Lucía Pineda", barrera: "Autorización Hospitalización", tiempo: "12h", estado: "Resuelta" },
];

export default function BarrerasAdministrativasDashboard() {
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
            <h1 className="text-2xl font-bold text-[#324D6D] tracking-tight">% de Barreras Administrativas</h1>
            <p className="text-sm text-slate-500">Unidad de Leucemia • Calidad de Proceso (Gestión de Navegación)</p>
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
            <input type="text" placeholder="Buscar barrera o paciente..." className="bg-transparent outline-none w-full" />
          </div>
        </div>

        {/* KPIs Estratégicos */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between border-l-4 border-l-rose-500">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Barreras Identificadas</p>
              <p className="text-3xl font-bold text-slate-800">28</p>
            </div>
            <AlertCircle className="w-8 h-8 text-rose-500 opacity-20" />
          </div>
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between border-l-4 border-l-emerald-500">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">% Resolución</p>
              <p className="text-3xl font-bold text-emerald-600">92%</p>
            </div>
            <CheckCircle2 className="w-8 h-8 text-emerald-600 opacity-20" />
          </div>
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between border-l-4 border-l-blue-500">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Tiempo Promedio Res.</p>
              <div className="flex items-baseline gap-1">
                <p className="text-3xl font-bold text-blue-600">32</p>
                <p className="text-[10px] font-bold text-slate-400">Horas</p>
              </div>
            </div>
            <Clock className="w-8 h-8 text-blue-600 opacity-20" />
          </div>
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between border-l-4 border-l-slate-400">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Meta Resolución</p>
              <p className="text-3xl font-bold text-slate-800">&gt; 95%</p>
            </div>
            <TrendingUp className="w-8 h-8 text-slate-400 opacity-20" />
          </div>
        </div>

        {/* Gráficas */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Gráfico de Barras: Tipos de Barreras */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="text-sm font-bold text-slate-700 mb-1">Tipología de Barreras</h3>
            <p className="text-[10px] text-slate-400 mb-6">Principales obstáculos administrativos detectados</p>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dataTiposBarreras} layout="vertical" margin={{ left: -10, right: 30 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                  <XAxis type="number" hide />
                  <YAxis dataKey="name" type="category" tick={{fontSize: 10, fontWeight: 600}} axisLine={false} tickLine={false} width={100} />
                  <RechartsTooltip cursor={{fill: '#f8fafc'}} />
                  <Bar dataKey="valor" radius={[0, 4, 4, 0]} barSize={25}>
                    {dataTiposBarreras.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Gráfico de Tendencia de Resolución */}
          <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="text-sm font-bold text-slate-700 mb-1">Eficacia de Resolución Mensual</h3>
            <p className="text-[10px] text-slate-400 mb-6">Evolución de la capacidad de respuesta del equipo de navegación</p>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={dataResolucionMensual} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="mes" axisLine={false} tickLine={false} tick={{fontSize: 12}} />
                  <YAxis domain={[70, 100]} axisLine={false} tickLine={false} tick={{fontSize: 10}} />
                  <RechartsTooltip />
                  <Line type="monotone" dataKey="resolucion" stroke="#10b981" strokeWidth={3} dot={{ r: 5, fill: "#10b981", strokeWidth: 2, stroke: "#fff" }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Tabla de Navegación */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-50 bg-rose-50/30 flex justify-between items-center">
            <h3 className="text-sm font-bold text-rose-800 flex items-center gap-2">
              <FileSearch className="w-4 h-4" /> Bitácora de Gestión de Navegación
            </h3>
            <button className="text-[10px] font-bold text-rose-600 bg-white px-3 py-1.5 rounded-lg border border-rose-200">Reportar Nueva Barrera</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="text-slate-500 border-b border-slate-100 uppercase tracking-wider font-semibold bg-slate-50/50">
                  <th className="px-6 py-4">ID Gestión</th>
                  <th className="px-6 py-4">Paciente</th>
                  <th className="px-6 py-4">Barrera Identificada</th>
                  <th className="px-6 py-4 text-center">Tiempo en Gestión</th>
                  <th className="px-6 py-4 text-right">Estatus</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {logBarreras.map((p, i) => (
                  <tr key={i} className="hover:bg-slate-50 transition-colors text-slate-600">
                    <td className="px-6 py-4 font-bold">{p.id}</td>
                    <td className="px-6 py-4 font-medium text-slate-800">{p.paciente}</td>
                    <td className="px-6 py-4 font-medium text-rose-600">{p.barrera}</td>
                    <td className="px-6 py-4 text-center font-bold text-slate-700">{p.tiempo}</td>
                    <td className="px-6 py-4 text-right">
                      <span className={`px-3 py-1 rounded-md font-bold ${
                        p.estado === 'Resuelta' ? 'text-emerald-600 bg-emerald-50' : 'text-amber-600 bg-amber-50'
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