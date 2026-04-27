"use client";

import Link from "next/link";
import { ArrowLeft, Calendar, Filter, Search, ShieldCheck, Target, AlertCircle, Users, Pill } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, LineChart, Line, Cell, PieChart, Pie } from "recharts";

// Datos para Barreras de Adherencia
const dataBarreras = [
  { name: 'Olvido de dosis', valor: 45, color: '#0ea5e9' },
  { name: 'Efectos Adversos', valor: 25, color: '#6366f1' },
  { name: 'Dificultad Acceso', valor: 20, color: '#f59e0b' },
  { name: 'Otros', valor: 10, color: '#94a3b8' },
];

// Datos para Tendencia Mensual
const dataTendenciaAdherencia = [
  { mes: 'Ene', valor: 88 },
  { mes: 'Feb', valor: 90 },
  { mes: 'Mar', valor: 87 },
  { mes: 'Abr', valor: 92 },
  { mes: 'May', valor: 95 },
  { mes: 'Jun', valor: 93 },
];

// Detalle de Pacientes con Riesgo de No Adherencia
const pacientesAdherencia = [
  { id: "L2024-205", paciente: "Andrés Felipe Ruiz", adherencia: 98, barrera: "Ninguna", estado: "Óptimo" },
  { id: "L2024-210", paciente: "Mariana Gómez", adherencia: 85, barrera: "Náuseas/Vómito", estado: "Riesgo Bajo" },
  { id: "L2024-215", paciente: "Samuel Restrepo", adherencia: 72, barrera: "Olvido frecuente", estado: "Riesgo Alto" },
  { id: "L2024-220", paciente: "Elena Villalba", adherencia: 94, barrera: "Transporte", estado: "En Meta" },
];

export default function AdherenciaTratamientoDashboard() {
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
            <h1 className="text-2xl font-bold text-[#324D6D] tracking-tight">% Adherencia al Tratamiento</h1>
            <p className="text-sm text-slate-500">Unidad de Leucemia • Calidad de Proceso (Cumplimiento Terapéutico)</p>
          </div>
        </div>

        {/* Filtros */}
        <div className="flex flex-wrap items-center gap-4 mb-8 text-sm">
          <div className="bg-white/90 backdrop-blur-sm px-3 py-2 rounded-xl border border-slate-200 shadow-sm flex items-center gap-2">
            <Calendar className="w-4 h-4 text-slate-400" />
            <select className="bg-transparent outline-none cursor-pointer font-medium"><option>Cohorte Actual</option></select>
          </div>
          <div className="bg-white/90 backdrop-blur-sm px-3 py-2 rounded-xl border border-slate-200 shadow-sm flex-1 max-w-xs flex items-center gap-2">
            <Search className="w-4 h-4 text-slate-400" />
            <input type="text" placeholder="Buscar paciente..." className="bg-transparent outline-none w-full" />
          </div>
        </div>

        {/* KPIs Estratégicos */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between border-l-4 border-l-cyan-500">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Pacientes Evaluados</p>
              <p className="text-3xl font-bold text-slate-800">112</p>
            </div>
            <Users className="w-8 h-8 text-cyan-500 opacity-20" />
          </div>
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between border-l-4 border-l-teal-500">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Adherencia Promedio</p>
              <p className="text-3xl font-bold text-teal-600">93%</p>
            </div>
            <ShieldCheck className="w-8 h-8 text-teal-600 opacity-20" />
          </div>
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between border-l-4 border-l-slate-400">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Meta (Mínima)</p>
              <p className="text-3xl font-bold text-slate-800">95%</p>
            </div>
            <Target className="w-8 h-8 text-slate-400 opacity-20" />
          </div>
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between border-l-4 border-l-rose-500">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Alerta de Riesgo</p>
              <p className="text-3xl font-bold text-rose-600">8</p>
            </div>
            <AlertCircle className="w-8 h-8 text-rose-500 opacity-20" />
          </div>
        </div>

        {/* Gráficas */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Gráfico de Torta: Barras de Adherencia */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="text-sm font-bold text-slate-700 mb-1">Barreras Identificadas</h3>
            <p className="text-[10px] text-slate-400 mb-6">Razones principales de no adherencia</p>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={dataBarreras} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="valor">
                    {dataBarreras.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <RechartsTooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Gráfico de Línea: Tendencia */}
          <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="text-sm font-bold text-slate-700 mb-1">Evolución de la Adherencia</h3>
            <p className="text-[10px] text-slate-400 mb-6">Cumplimiento mensual del grupo de pacientes</p>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={dataTendenciaAdherencia} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="mes" axisLine={false} tickLine={false} tick={{fontSize: 12}} />
                  <YAxis domain={[70, 100]} axisLine={false} tickLine={false} tick={{fontSize: 10}} />
                  <RechartsTooltip />
                  <Line type="monotone" dataKey="valor" stroke="#0ea5e9" strokeWidth={3} dot={{ r: 5, fill: "#0ea5e9", strokeWidth: 2, stroke: "#fff" }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Tabla Detallada */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-50 bg-cyan-50/30 flex justify-between items-center">
            <h3 className="text-sm font-bold text-cyan-800 flex items-center gap-2">
              <Pill className="w-4 h-4" /> Seguimiento Individual de Adherencia
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="text-slate-500 border-b border-slate-100 uppercase tracking-wider font-semibold bg-slate-50/50">
                  <th className="px-6 py-4">ID Paciente</th>
                  <th className="px-6 py-4">Nombre</th>
                  <th className="px-6 py-4 text-center">% Adherencia</th>
                  <th className="px-6 py-4">Barrera Principal</th>
                  <th className="px-6 py-4 text-right">Estatus</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {pacientesAdherencia.map((p, i) => (
                  <tr key={i} className="hover:bg-slate-50 transition-colors text-slate-600">
                    <td className="px-6 py-4 font-bold">{p.id}</td>
                    <td className="px-6 py-4 font-medium text-slate-800">{p.paciente}</td>
                    <td className="px-6 py-4 text-center font-bold text-slate-700">{p.adherencia}%</td>
                    <td className="px-6 py-4">{p.barrera}</td>
                    <td className="px-6 py-4 text-right">
                      <span className={`px-3 py-1 rounded-md font-bold ${
                        p.estado === 'Óptimo' ? 'text-emerald-600 bg-emerald-50' : 
                        p.estado === 'En Meta' ? 'text-blue-600 bg-blue-50' : 
                        p.estado === 'Riesgo Bajo' ? 'text-amber-600 bg-amber-50' : 
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