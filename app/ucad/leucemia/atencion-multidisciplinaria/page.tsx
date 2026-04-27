"use client";

import Link from "next/link";
import { ArrowLeft, Calendar, Filter, Search, Users, Target, Clock, Stethoscope, HeartHandshake, CheckCircle2 } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, LineChart, Line, Cell, PieChart, Pie } from "recharts";

// Datos para la distribución por especialidad
const dataEspecialidades = [
  { name: 'Psicología', valor: 98, color: '#6366f1' },
  { name: 'Trabajo Social', valor: 100, color: '#818cf8' },
  { name: 'Nutrición', valor: 92, color: '#a5b4fc' },
  { name: 'Cuidado Paliativo', valor: 85, color: '#c7d2fe' },
];

// Datos para la tendencia de días de espera
const dataTendenciaAtencion = [
  { mes: 'Ene', dias: 6.5 },
  { mes: 'Feb', dias: 5.8 },
  { mes: 'Mar', dias: 6.1 },
  { mes: 'Abr', dias: 5.2 },
  { mes: 'May', dias: 4.8 },
  { mes: 'Jun', dias: 4.5 },
];

// Detalle de la primera atención integral
const pacientesAtencion = [
  { id: "L2024-305", paciente: "Andrés Felipe Ruiz", dx: "10/05/2026", valoracion: "12/05/2026", dias: 2, especialidad: "Integral Completa", estado: "Óptimo" },
  { id: "L2024-310", paciente: "Mariana Gómez", dx: "12/05/2026", valoracion: "15/05/2026", dias: 3, especialidad: "Pendiente Nutrición", estado: "En Meta" },
  { id: "L2024-315", paciente: "Samuel Restrepo", dx: "15/05/2026", valoracion: "23/05/2026", dias: 8, especialidad: "Integral Completa", estado: "Fuera de Meta" },
  { id: "L2024-320", paciente: "Elena Villalba", dx: "20/05/2026", valoracion: "24/05/2026", dias: 4, especialidad: "Integral Completa", estado: "En Meta" },
];

export default function AtencionMultidisciplinariaDashboard() {
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
            <h1 className="text-2xl font-bold text-[#324D6D] tracking-tight">Oportunidad en la Atención Multidisciplinaria</h1>
            <p className="text-sm text-slate-500">Unidad de Leucemia • Calidad de Proceso (Soporte Integral)</p>
          </div>
        </div>

        {/* Filtros */}
        <div className="flex flex-wrap items-center gap-4 mb-8 text-sm">
          <div className="bg-white/90 backdrop-blur-sm px-3 py-2 rounded-xl border border-slate-200 shadow-sm flex items-center gap-2">
            <Calendar className="w-4 h-4 text-slate-400" />
            <select className="bg-transparent outline-none cursor-pointer font-medium"><option>Semestre 2026-1</option></select>
          </div>
          <div className="bg-white/90 backdrop-blur-sm px-3 py-2 rounded-xl border border-slate-200 shadow-sm flex-1 max-w-xs flex items-center gap-2">
            <Search className="w-4 h-4 text-slate-400" />
            <input type="text" placeholder="Buscar por paciente o especialista..." className="bg-transparent outline-none w-full" />
          </div>
        </div>

        {/* KPIs Estratégicos */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between border-l-4 border-l-indigo-500">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Pacientes Atendidos</p>
              <p className="text-3xl font-bold text-slate-800">132</p>
            </div>
            <Users className="w-8 h-8 text-indigo-500 opacity-20" />
          </div>
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between border-l-4 border-l-blue-500">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Promedio de Espera</p>
              <div className="flex items-baseline gap-1">
                <p className="text-3xl font-bold text-blue-600">4.5</p>
                <p className="text-[10px] font-bold text-slate-400">Días</p>
              </div>
            </div>
            <Clock className="w-8 h-8 text-blue-600 opacity-20" />
          </div>
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between border-l-4 border-l-slate-400">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Meta (Máximo)</p>
              <div className="flex items-baseline gap-1">
                <p className="text-3xl font-bold text-slate-800">&lt; 7</p>
                <p className="text-[10px] font-bold text-slate-400">Días</p>
              </div>
            </div>
            <Target className="w-8 h-8 text-slate-400 opacity-20" />
          </div>
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between border-l-4 border-l-emerald-500">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Cumplimiento Global</p>
              <p className="text-3xl font-bold text-emerald-600">94%</p>
            </div>
            <CheckCircle2 className="w-8 h-8 text-emerald-600 opacity-20" />
          </div>
        </div>

        {/* Gráficas */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Gráfico de Barras: Especialidades */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="text-sm font-bold text-slate-700 mb-1">Cumplimiento por Especialidad</h3>
            <p className="text-[10px] text-slate-400 mb-6">% de pacientes valorados en &lt; 7 días</p>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dataEspecialidades} layout="vertical" margin={{ left: -10, right: 30 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                  <XAxis type="number" domain={[0, 100]} hide />
                  <YAxis dataKey="name" type="category" tick={{fontSize: 10, fontWeight: 600}} axisLine={false} tickLine={false} width={100} />
                  <RechartsTooltip cursor={{fill: '#f8fafc'}} formatter={(value) => [`${value}%`, 'Cumplimiento']} />
                  <Bar dataKey="valor" radius={[0, 4, 4, 0]} barSize={25}>
                    {dataEspecialidades.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Gráfico de Tendencia Mensual */}
          <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="text-sm font-bold text-slate-700 mb-1">Tendencia de Oportunidad Multidisciplinaria</h3>
            <p className="text-[10px] text-slate-400 mb-6">Evolución mensual de los días de espera para valoración integral</p>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={dataTendenciaAtencion} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="mes" axisLine={false} tickLine={false} tick={{fontSize: 12}} />
                  <YAxis domain={[0, 10]} axisLine={false} tickLine={false} tick={{fontSize: 10}} />
                  <RechartsTooltip />
                  <Line type="monotone" dataKey={() => 7.0} stroke="#ef4444" strokeWidth={1} strokeDasharray="5 5" dot={false} name="Límite Meta (7d)" />
                  <Line type="monotone" dataKey="dias" stroke="#6366f1" strokeWidth={3} dot={{ r: 5, fill: "#6366f1", strokeWidth: 2, stroke: "#fff" }} name="Días Promedio" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Tabla Detallada */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-50 bg-indigo-50/30 flex justify-between items-center">
            <h3 className="text-sm font-bold text-indigo-800 flex items-center gap-2">
              <HeartHandshake className="w-4 h-4" /> Bitácora de Intervención Integral
            </h3>
            <button className="text-[10px] font-bold text-indigo-600 bg-white px-3 py-1.5 rounded-lg border border-indigo-200">Exportar Auditoría</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="text-slate-500 border-b border-slate-100 uppercase tracking-wider font-semibold bg-slate-50/50">
                  <th className="px-6 py-4">ID Paciente</th>
                  <th className="px-6 py-4">Nombre</th>
                  <th className="px-6 py-4 text-center">Confirmación Dx</th>
                  <th className="px-6 py-4 text-center">Valoración Integral</th>
                  <th className="px-6 py-4 text-center">Días Transcurridos</th>
                  <th className="px-6 py-4 text-right">Estatus</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {pacientesAtencion.map((p, i) => (
                  <tr key={i} className="hover:bg-slate-50 transition-colors text-slate-600">
                    <td className="px-6 py-4 font-bold">{p.id}</td>
                    <td className="px-6 py-4 font-medium text-slate-800">{p.paciente}</td>
                    <td className="px-6 py-4 text-center font-mono text-slate-500">{p.dx}</td>
                    <td className="px-6 py-4 text-center font-mono text-slate-500">{p.valoracion}</td>
                    <td className="px-6 py-4 text-center font-bold text-slate-700">{p.dias} Días</td>
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