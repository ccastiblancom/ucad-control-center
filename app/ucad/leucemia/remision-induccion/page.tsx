"use client";

import Link from "next/link";
// ¡Aquí está la corrección! Agregamos TrendingUp a la lista
import { ArrowLeft, Calendar, Filter, Search, Activity, Target, UserCheck, TrendingUp } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";

const dataRemisionGlobal = [
  { name: 'Remisión Completa', valor: 92, color: '#0d9488' },
  { name: 'Sin Remisión', valor: 8, color: '#e2e8f0' },
];

const dataPorFenotipo = [
  { name: 'LLA-B', remision: 94, total: 65 },
  { name: 'LLA-T', remision: 85, total: 20 },
];

const pacientesRemision = [
  { id: "L2024-102", paciente: "Andrés Felipe Ruiz", edad: "5 años", tipo: "LLA B", remision: "Sí", mrd: "< 0.01%", fecha: "15/03/2026" },
  { id: "L2024-105", paciente: "Mariana Gómez", edad: "7 años", tipo: "LLA T", remision: "Sí", mrd: "0.02%", fecha: "18/03/2026" },
  { id: "L2024-108", paciente: "Samuel Restrepo", edad: "4 años", tipo: "LLA B", remision: "No", mrd: "1.5%", fecha: "20/03/2026" },
  { id: "L2024-110", paciente: "Elena Villalba", edad: "9 años", tipo: "LLA B", remision: "Sí", mrd: "< 0.01%", fecha: "22/03/2026" },
];

export default function RemisionInduccionDashboard() {
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
          <Link href="/ucad/leucemia" className="p-2 hover:bg-white/80 rounded-full transition-colors flex items-center gap-2 text-sm font-medium text-slate-600 bg-white/50 border border-slate-200">
            <ArrowLeft className="w-4 h-4" /> Volver
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-[#324D6D] tracking-tight">% Remisión completa al final de la inducción (LLA)</h1>
            <p className="text-sm text-slate-500">Unidad Clínica de Alto Desempeño Leucemia • Resultados Clínicos</p>
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
            <select className="bg-transparent outline-none cursor-pointer font-medium"><option>Todos los Inmunofenotipos</option></select>
          </div>
          <div className="bg-white/90 backdrop-blur-sm px-3 py-2 rounded-xl border border-slate-200 shadow-sm flex-1 max-w-xs flex items-center gap-2">
            <Search className="w-4 h-4 text-slate-400" />
            <input type="text" placeholder="Buscar paciente..." className="bg-transparent outline-none w-full" />
          </div>
        </div>

        {/* KPIs Estratégicos */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Inducciones Finalizadas</p>
              <p className="text-3xl font-bold text-slate-800">85</p>
            </div>
            <Activity className="w-8 h-8 text-teal-500 opacity-20" />
          </div>
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">% Remisión Completa</p>
              <p className="text-3xl font-bold text-teal-600">92%</p>
            </div>
            <UserCheck className="w-8 h-8 text-teal-600 opacity-20" />
          </div>
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Meta Institucional</p>
              <p className="text-3xl font-bold text-slate-800">90%</p>
            </div>
            <Target className="w-8 h-8 text-slate-400 opacity-20" />
          </div>
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Brecha vs Meta</p>
              <p className="text-3xl font-bold text-emerald-500">+2.0%</p>
            </div>
            <TrendingUp className="w-8 h-8 text-emerald-500 opacity-20" />
          </div>
        </div>

        {/* Gráficas de Análisis */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Gráfico Circular de Remisión Global */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="text-sm font-bold text-slate-700 mb-1">Efectividad Global de Inducción</h3>
            <p className="text-[10px] text-slate-400 mb-6">Comparativa de Remisión vs No Remisión</p>
            <div className="h-64 w-full relative flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={dataRemisionGlobal} innerRadius={60} outerRadius={85} paddingAngle={5} dataKey="valor" stroke="none">
                    {dataRemisionGlobal.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value}%`, 'Pacientes']} />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute flex flex-col items-center">
                <span className="text-3xl font-bold text-teal-600">92%</span>
                <span className="text-[9px] text-slate-500 font-bold uppercase tracking-tighter">Remisión</span>
              </div>
            </div>
          </div>

          {/* Gráfico de Barras por Fenotipo */}
          <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="text-sm font-bold text-slate-700 mb-1">Remisión por Inmunofenotipo</h3>
            <p className="text-[10px] text-slate-400 mb-6">% de Remisión Completa en LLA-B y LLA-T</p>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dataPorFenotipo} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fontWeight: 600}} />
                  <YAxis domain={[0, 100]} axisLine={false} tickLine={false} tick={{fontSize: 10}} />
                  <Tooltip cursor={{fill: '#f8fafc'}} />
                  <Bar dataKey="remision" name="% Remisión" fill="#0d9488" radius={[6, 6, 0, 0]} barSize={50} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Tabla Detallada de Auditoría */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-50 bg-slate-50/50 flex justify-between items-center">
            <h3 className="text-sm font-bold text-slate-700">Detalle Clínico de Fin de Inducción</h3>
            <button className="text-[10px] font-bold text-teal-600 bg-teal-50 px-3 py-1.5 rounded-lg border border-teal-100">Exportar Reporte</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="text-slate-400 border-b border-slate-50 uppercase tracking-wider font-semibold">
                  <th className="px-6 py-4">ID</th>
                  <th className="px-6 py-4">Paciente</th>
                  <th className="px-6 py-4">Edad</th>
                  <th className="px-6 py-4">Tipo LLA</th>
                  <th className="px-6 py-4 text-center">Remisión</th>
                  <th className="px-6 py-4">ERM (Enfermedad Residual)</th>
                  <th className="px-6 py-4 text-right">Fecha Evaluación</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {pacientesRemision.map((p, i) => (
                  <tr key={i} className="hover:bg-slate-50 transition-colors text-slate-600">
                    <td className="px-6 py-4 font-bold">{p.id}</td>
                    <td className="px-6 py-4 font-medium text-slate-800">{p.paciente}</td>
                    <td className="px-6 py-4">{p.edad}</td>
                    <td className="px-6 py-4">
                      <span className="bg-slate-100 px-2 py-1 rounded-md font-bold text-[10px]">{p.tipo}</span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={`px-2 py-1 rounded-md font-bold ${p.remision === 'Sí' ? 'text-emerald-600 bg-emerald-50' : 'text-rose-600 bg-rose-50'}`}>
                        {p.remision}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-mono text-slate-500">{p.mrd}</td>
                    <td className="px-6 py-4 text-right text-slate-400">{p.fecha}</td>
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