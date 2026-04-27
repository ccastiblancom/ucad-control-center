"use client";

import Link from "next/link";
import { ArrowLeft, Calendar, Filter, Search, Clock, Target, TrendingDown, Users, FileText } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, LineChart, Line, Cell } from "recharts";

// Datos para la distribución de tiempos
const dataDistribucionTiempos = [
  { name: '< 3 Días', valor: 65, color: '#10b981' },
  { name: '3 - 5 Días', valor: 45, color: '#3b82f6' },
  { name: '> 5 Días', valor: 10, color: '#ef4444' },
];

// Datos para Tendencia Mensual
const dataTendenciaMensual = [
  { mes: 'Ene', dias: 4.8 },
  { mes: 'Feb', dias: 4.5 },
  { mes: 'Mar', dias: 4.1 },
  { mes: 'Abr', dias: 3.8 },
  { mes: 'May', dias: 3.5 },
  { mes: 'Jun', dias: 3.2 },
];

// Registro de oportunidad diagnóstica
const pacientesConfirmacion = [
  { id: "L2024-112", paciente: "Andrés Felipe Ruiz", ingreso: "10/05/2026", aspirado: "11/05/2026", resultado: "13/05/2026", dias: 3, estado: "Cumple" },
  { id: "L2024-115", paciente: "Mariana Gómez", ingreso: "12/05/2026", aspirado: "12/05/2026", resultado: "14/05/2026", dias: 2, estado: "Cumple" },
  { id: "L2024-118", paciente: "Samuel Restrepo", ingreso: "15/05/2026", aspirado: "18/05/2026", resultado: "22/05/2026", dias: 7, estado: "Retraso" },
  { id: "L2024-120", paciente: "Elena Villalba", ingreso: "20/05/2026", aspirado: "21/05/2026", resultado: "24/05/2026", dias: 4, estado: "Cumple" },
];

export default function TiempoConfirmacionDashboard() {
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
            <h1 className="text-2xl font-bold text-[#324D6D] tracking-tight">Tiempo Promedio de Espera: Confirmación Diagnóstica</h1>
            <p className="text-sm text-slate-500">Unidad de Leucemia • Calidad de Proceso (Oportunidad)</p>
          </div>
        </div>

        {/* Filtros Profesionales */}
        <div className="flex flex-wrap items-center gap-4 mb-8 text-sm">
          <div className="bg-white/90 backdrop-blur-sm px-3 py-2 rounded-xl border border-slate-200 shadow-sm flex items-center gap-2">
            <Calendar className="w-4 h-4 text-slate-400" />
            <select className="bg-transparent outline-none cursor-pointer font-medium"><option>Año 2026</option></select>
          </div>
          <div className="bg-white/90 backdrop-blur-sm px-3 py-2 rounded-xl border border-slate-200 shadow-sm flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-400" />
            <select className="bg-transparent outline-none cursor-pointer font-medium"><option>Todos los Tipos</option></select>
          </div>
          <div className="bg-white/90 backdrop-blur-sm px-3 py-2 rounded-xl border border-slate-200 shadow-sm flex-1 max-w-xs flex items-center gap-2">
            <Search className="w-4 h-4 text-slate-400" />
            <input type="text" placeholder="Buscar paciente..." className="bg-transparent outline-none w-full" />
          </div>
        </div>

        {/* KPIs Estratégicos */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between border-l-4 border-l-blue-500">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Pacientes Sospecha</p>
              <p className="text-3xl font-bold text-slate-800">120</p>
            </div>
            <Users className="w-8 h-8 text-blue-500 opacity-20" />
          </div>
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between border-l-4 border-l-teal-500">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Tiempo Promedio</p>
              <div className="flex items-baseline gap-1">
                <p className="text-3xl font-bold text-teal-600">3.2</p>
                <p className="text-[10px] font-bold text-slate-400">Días</p>
              </div>
            </div>
            <Clock className="w-8 h-8 text-teal-600 opacity-20" />
          </div>
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between border-l-4 border-l-slate-400">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Meta Institucional</p>
              <div className="flex items-baseline gap-1">
                <p className="text-3xl font-bold text-slate-800">&lt; 5</p>
                <p className="text-[10px] font-bold text-slate-400">Días</p>
              </div>
            </div>
            <Target className="w-8 h-8 text-slate-400 opacity-20" />
          </div>
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between border-l-4 border-l-emerald-500">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Brecha vs Meta</p>
              <div className="flex items-baseline gap-1">
                <p className="text-3xl font-bold text-emerald-500">-1.8</p>
                <p className="text-[10px] font-bold text-emerald-600">Días</p>
              </div>
            </div>
            <TrendingDown className="w-8 h-8 text-emerald-500 opacity-20" />
          </div>
        </div>

        {/* Gráficas de Análisis */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          
          {/* Gráfico de Barras: Distribución */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="text-sm font-bold text-slate-700 mb-1">Distribución de Tiempos</h3>
            <p className="text-[10px] text-slate-400 mb-6">Agrupación de pacientes según los días de espera</p>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dataDistribucionTiempos} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 600}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10}} />
                  <RechartsTooltip cursor={{fill: '#f8fafc'}} formatter={(value) => [`${value} pacientes`, 'Cantidad']} />
                  <Bar dataKey="valor" radius={[4, 4, 0, 0]} barSize={40}>
                    {dataDistribucionTiempos.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Gráfico de Líneas: Tendencia Mensual */}
          <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-sm font-bold text-slate-700">Tendencia de Tiempos de Diagnóstico</h3>
                <p className="text-[10px] text-slate-400">Promedio mensual de días de espera comparado con la meta de 5 días</p>
              </div>
            </div>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={dataTendenciaMensual} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="mes" axisLine={false} tickLine={false} tick={{fontSize: 12}} />
                  <YAxis domain={[0, 6]} axisLine={false} tickLine={false} tick={{fontSize: 10}} />
                  <RechartsTooltip cursor={{ fill: '#f8fafc' }} formatter={(value) => [`${value} Días`, 'Promedio']} />
                  {/* Línea de Meta */}
                  <Line type="monotone" dataKey={() => 5.0} stroke="#ef4444" strokeWidth={2} strokeDasharray="5 5" dot={false} name="Límite (Meta <5)" />
                  {/* Línea Real */}
                  <Line type="monotone" dataKey="dias" stroke="#0ea5e9" strokeWidth={3} dot={{ r: 5, fill: "#0ea5e9", strokeWidth: 2, stroke: "#fff" }} name="Días Promedio" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Tabla Detallada: Registro de Oportunidad */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-50 bg-blue-50/30 flex justify-between items-center">
            <div>
              <h3 className="text-sm font-bold text-blue-800 flex items-center gap-2">
                <FileText className="w-4 h-4" /> Registro de Oportunidad Diagnóstica
              </h3>
            </div>
            <button className="text-[10px] font-bold text-blue-600 bg-white px-3 py-1.5 rounded-lg border border-blue-200 shadow-sm">Exportar Tiempos</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="text-slate-500 border-b border-slate-100 uppercase tracking-wider font-semibold bg-slate-50/50">
                  <th className="px-6 py-4">ID Paciente</th>
                  <th className="px-6 py-4">Nombre</th>
                  <th className="px-6 py-4">Fecha Ingreso / Sospecha</th>
                  <th className="px-6 py-4">Fecha Aspirado (MO)</th>
                  <th className="px-6 py-4">Fecha Resultado (CMF)</th>
                  <th className="px-6 py-4 text-center">Días de Espera</th>
                  <th className="px-6 py-4 text-right">Estado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {pacientesConfirmacion.map((p, i) => (
                  <tr key={i} className="hover:bg-slate-50 transition-colors text-slate-600">
                    <td className="px-6 py-4 font-bold">{p.id}</td>
                    <td className="px-6 py-4 font-medium text-slate-800">{p.paciente}</td>
                    <td className="px-6 py-4 font-mono text-slate-500">{p.ingreso}</td>
                    <td className="px-6 py-4 font-mono text-slate-500">{p.aspirado}</td>
                    <td className="px-6 py-4 font-mono text-slate-500">{p.resultado}</td>
                    <td className="px-6 py-4 text-center font-bold text-slate-700">{p.dias}</td>
                    <td className="px-6 py-4 text-right">
                      <span className={`px-3 py-1 rounded-md font-bold ${p.estado === 'Cumple' ? 'text-emerald-600 bg-emerald-50' : 'text-rose-600 bg-rose-50'}`}>
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