"use client";

import Link from "next/link";
import { ArrowLeft, Calendar, Filter, Search, Users, Target, TrendingUp, ClipboardCheck, AlertTriangle } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";

// Datos para Cumplimiento Global
const dataAdherenciaGlobal = [
  { name: 'Adherencia Total', valor: 96, color: '#10b981' }, // Verde esmeralda
  { name: 'Desviación', valor: 4, color: '#e2e8f0' }, // Gris claro
];

// Datos para Adherencia por Fase
const dataPorFase = [
  { fase: 'Inducción', adherencia: 98, color: '#0ea5e9' },
  { fase: 'Consolidación', adherencia: 95, color: '#3b82f6' },
  { fase: 'Mantenimiento', adherencia: 92, color: '#6366f1' },
];

// Registro de Desviaciones (Tabla)
const pacientesDesviaciones = [
  { id: "L2024-055", fase: "Inducción", desviacion: "Ajuste de dosis MTX", justificacion: "Toxicidad hepática grado 3", estado: "Aprobado" },
  { id: "L2024-082", fase: "Consolidación", desviacion: "Retraso quimioterapia > 7 días", justificacion: "Infección severa (Sepsis)", estado: "Aprobado" },
  { id: "L2024-110", fase: "Mantenimiento", desviacion: "Omisión de dosis 6-MP", justificacion: "Abandono temporal", estado: "No Justificado" },
];

export default function AdherenciaProtocoloDashboard() {
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
            <h1 className="text-2xl font-bold text-[#324D6D] tracking-tight">% Adherencia al Protocolo ALLIC 2022</h1>
            <p className="text-sm text-slate-500">Unidad de Leucemia • Calidad de Proceso (Estandarización Clínica)</p>
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
            <select className="bg-transparent outline-none cursor-pointer font-medium"><option>Todas las Fases</option></select>
          </div>
          <div className="bg-white/90 backdrop-blur-sm px-3 py-2 rounded-xl border border-slate-200 shadow-sm flex-1 max-w-xs flex items-center gap-2">
            <Search className="w-4 h-4 text-slate-400" />
            <input type="text" placeholder="Buscar paciente o justificación..." className="bg-transparent outline-none w-full" />
          </div>
        </div>

        {/* KPIs Estratégicos */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between border-l-4 border-l-blue-500">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Pacientes Activos</p>
              <p className="text-3xl font-bold text-slate-800">145</p>
            </div>
            <Users className="w-8 h-8 text-blue-500 opacity-20" />
          </div>
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between border-l-4 border-l-emerald-500">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Adherencia Global</p>
              <p className="text-3xl font-bold text-emerald-600">96%</p>
            </div>
            <ClipboardCheck className="w-8 h-8 text-emerald-500 opacity-20" />
          </div>
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between border-l-4 border-l-slate-400">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Meta Institucional</p>
              <p className="text-3xl font-bold text-slate-800">&gt; 95%</p>
            </div>
            <Target className="w-8 h-8 text-slate-400 opacity-20" />
          </div>
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between border-l-4 border-l-emerald-400">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Brecha vs Meta</p>
              <p className="text-3xl font-bold text-emerald-500">+1.0%</p>
            </div>
            <TrendingUp className="w-8 h-8 text-emerald-500 opacity-20" />
          </div>
        </div>

        {/* Gráficas de Análisis */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          
          {/* Gráfico Circular: Cumplimiento Global */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="text-sm font-bold text-slate-700 mb-1">Cumplimiento Global del Protocolo</h3>
            <p className="text-[10px] text-slate-400 mb-6">Porcentaje total de adherencia a las guías clínicas</p>
            <div className="h-64 w-full relative flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={dataAdherenciaGlobal} innerRadius={65} outerRadius={85} paddingAngle={2} dataKey="valor" stroke="none">
                    {dataAdherenciaGlobal.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <RechartsTooltip formatter={(value) => [`${value}%`, 'Proporción']} />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute flex flex-col items-center">
                <span className="text-4xl font-bold text-emerald-600">96%</span>
                <span className="text-[9px] text-slate-500 font-bold uppercase tracking-tighter">Adherencia</span>
              </div>
            </div>
          </div>

          {/* Gráfico de Barras: Adherencia por Fase */}
          <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="text-sm font-bold text-slate-700 mb-1">Adherencia por Fase de Tratamiento</h3>
            <p className="text-[10px] text-slate-400 mb-6">Cumplimiento detallado según la etapa clínica del paciente</p>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dataPorFase} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="fase" axisLine={false} tickLine={false} tick={{fontSize: 12, fontWeight: 600}} />
                  <YAxis domain={[0, 100]} axisLine={false} tickLine={false} tick={{fontSize: 10}} />
                  <RechartsTooltip cursor={{fill: '#f8fafc'}} formatter={(value) => [`${value}%`, 'Cumplimiento']} />
                  <Bar dataKey="adherencia" name="% Adherencia" radius={[6, 6, 0, 0]} barSize={60}>
                    {dataPorFase.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Tabla Detallada: Desviaciones */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-50 bg-slate-50/50 flex justify-between items-center">
            <div>
              <h3 className="text-sm font-bold text-slate-700 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-500" /> Registro de Desviaciones del Protocolo
              </h3>
              <p className="text-[10px] text-slate-500 mt-1">Análisis de justificaciones clínicas frente a alteraciones de dosis o tiempos</p>
            </div>
            <button className="text-[10px] font-bold text-slate-600 bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-sm hover:bg-slate-50">Exportar Comité</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="text-slate-500 border-b border-slate-100 uppercase tracking-wider font-semibold bg-white">
                  <th className="px-6 py-4">ID Paciente</th>
                  <th className="px-6 py-4">Fase</th>
                  <th className="px-6 py-4">Tipo de Desviación</th>
                  <th className="px-6 py-4">Justificación Clínica</th>
                  <th className="px-6 py-4 text-right">Estado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {pacientesDesviaciones.map((p, i) => (
                  <tr key={i} className="hover:bg-slate-50 transition-colors text-slate-600">
                    <td className="px-6 py-4 font-bold">{p.id}</td>
                    <td className="px-6 py-4 font-medium text-slate-800">
                      <span className="bg-slate-100 px-2 py-1 rounded-md text-[10px]">{p.fase}</span>
                    </td>
                    <td className="px-6 py-4 text-slate-700">{p.desviacion}</td>
                    <td className="px-6 py-4 italic text-slate-500">{p.justificacion}</td>
                    <td className="px-6 py-4 text-right">
                      <span className={`px-3 py-1 rounded-md font-bold ${
                        p.estado === 'Aprobado' ? 'text-emerald-600 bg-emerald-50' : 'text-rose-600 bg-rose-50'
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