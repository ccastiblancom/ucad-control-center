"use client";

import Link from "next/link";
import { ArrowLeft, Calendar, Filter, Search, AlertCircle, Target, Activity, HeartPulse } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, BarChart, Bar, Cell } from "recharts";

// Datos simulados para análisis
const dataTendenciaMortalidad = [
  { mes: 'Ene', tasa: 2.1 },
  { mes: 'Feb', tasa: 1.8 },
  { mes: 'Mar', tasa: 0.0 },
  { mes: 'Abr', tasa: 1.5 },
  { mes: 'May', tasa: 0.0 },
  { mes: 'Jun', tasa: 1.2 },
];

const dataCausasMortalidad = [
  { name: 'Sepsis / Choque Séptico', valor: 65, color: '#ef4444' },
  { name: 'Hemorragia del SNC', valor: 20, color: '#f59e0b' },
  { name: 'Toxicidad Severa', valor: 10, color: '#8b5cf6' },
  { name: 'Falla Multiorgánica', valor: 5, color: '#3b82f6' },
];

const pacientesMortalidad = [
  { id: "L2024-033", paciente: "Tomás Rincón", edad: "6 años", fenotipo: "LLA-T", causa: "Choque Séptico (Neutropenia)", diasInduccion: "Día 14", fecha: "12/02/2026" },
  { id: "L2024-058", paciente: "Luciana Vargas", edad: "3 años", fenotipo: "LLA-B", causa: "Hemorragia Intracraneal", diasInduccion: "Día 8", fecha: "05/04/2026" },
  { id: "L2024-081", paciente: "Camilo Salazar", edad: "12 años", fenotipo: "LMA", causa: "Sepsis Fúngica", diasInduccion: "Día 21", fecha: "28/06/2026" },
];

export default function MortalidadInduccionDashboard() {
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
            <h1 className="text-2xl font-bold text-[#324D6D] tracking-tight">Proporción de Mortalidad en Inducción</h1>
            <p className="text-sm text-slate-500">Unidad Clínica de Alto Desempeño Leucemia • Resultados Clínicos (Seguridad)</p>
          </div>
        </div>

        {/* Filtros Profesionales */}
        <div className="flex flex-wrap items-center gap-4 mb-8 text-sm">
          <div className="bg-white/90 backdrop-blur-sm px-3 py-2 rounded-xl border border-slate-200 shadow-sm flex items-center gap-2">
            <Calendar className="w-4 h-4 text-slate-400" />
            <select className="bg-transparent outline-none cursor-pointer font-medium"><option>Últimos 6 meses</option></select>
          </div>
          <div className="bg-white/90 backdrop-blur-sm px-3 py-2 rounded-xl border border-slate-200 shadow-sm flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-400" />
            <select className="bg-transparent outline-none cursor-pointer font-medium"><option>Todos los Inmunofenotipos</option></select>
          </div>
          <div className="bg-white/90 backdrop-blur-sm px-3 py-2 rounded-xl border border-slate-200 shadow-sm flex-1 max-w-xs flex items-center gap-2">
            <Search className="w-4 h-4 text-slate-400" />
            <input type="text" placeholder="Buscar paciente o causa..." className="bg-transparent outline-none w-full" />
          </div>
        </div>

        {/* KPIs Estratégicos */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between border-l-4 border-l-blue-500">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Inducciones</p>
              <p className="text-3xl font-bold text-slate-800">145</p>
            </div>
            <Activity className="w-8 h-8 text-blue-500 opacity-20" />
          </div>
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between border-l-4 border-l-purple-500">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Tasa de Mortalidad</p>
              <p className="text-3xl font-bold text-purple-600">2.1%</p>
            </div>
            <HeartPulse className="w-8 h-8 text-purple-600 opacity-20" />
          </div>
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between border-l-4 border-l-emerald-500">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Meta (Límite Máximo)</p>
              <p className="text-3xl font-bold text-slate-800">&lt; 3.0%</p>
            </div>
            <Target className="w-8 h-8 text-emerald-500 opacity-20" />
          </div>
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between border-l-4 border-l-rose-500">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Eventos Fatales</p>
              <p className="text-3xl font-bold text-rose-500">3</p>
            </div>
            <AlertCircle className="w-8 h-8 text-rose-500 opacity-20" />
          </div>
        </div>

        {/* Gráficas de Análisis */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          
          {/* Gráfico de Líneas: Tendencia */}
          <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-sm font-bold text-slate-700">Tendencia de Mortalidad en Inducción</h3>
                <p className="text-[10px] text-slate-400">Evolución mensual vs límite de seguridad establecido (3%)</p>
              </div>
            </div>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={dataTendenciaMortalidad} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="mes" axisLine={false} tickLine={false} tick={{fontSize: 12}} />
                  <YAxis domain={[0, 5]} axisLine={false} tickLine={false} tick={{fontSize: 10}} />
                  <RechartsTooltip cursor={{ fill: '#f8fafc' }} formatter={(value) => [`${value}%`, 'Mortalidad']} />
                  {/* Línea de Meta (Límite de seguridad) */}
                  <Line type="monotone" dataKey={() => 3.0} stroke="#ef4444" strokeWidth={1} strokeDasharray="5 5" dot={false} name="Límite Seguridad" />
                  {/* Línea de Tasa Real */}
                  <Line type="monotone" dataKey="tasa" stroke="#a855f7" strokeWidth={3} dot={{ r: 4, fill: "#a855f7", strokeWidth: 2, stroke: "#fff" }} name="Tasa Real" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Gráfico de Barras Horizontales: Causas */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="text-sm font-bold text-slate-700 mb-1">Análisis de Causas (Eventos)</h3>
            <p className="text-[10px] text-slate-400 mb-6">Distribución de complicaciones fatales</p>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dataCausasMortalidad} layout="vertical" margin={{ top: 0, right: 20, left: -10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                  <XAxis type="number" hide />
                  <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#475569'}} width={110} />
                  <RechartsTooltip cursor={{fill: 'transparent'}} formatter={(value) => [`${value}%`, 'Proporción']} />
                  <Bar dataKey="valor" radius={[0, 4, 4, 0]} barSize={20}>
                    {dataCausasMortalidad.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Tabla Detallada de Auditoría Clínica */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-50 bg-rose-50/30 flex justify-between items-center">
            <div>
              <h3 className="text-sm font-bold text-rose-800 flex items-center gap-2">
                <AlertCircle className="w-4 h-4" /> Registro de Mortalidad en Inducción
              </h3>
              <p className="text-[10px] text-slate-500 mt-1">Revisión de morbimortalidad obligatoria para análisis de comité</p>
            </div>
            <button className="text-[10px] font-bold text-rose-600 bg-white px-3 py-1.5 rounded-lg border border-rose-200 shadow-sm">Descargar Informe M&M</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="text-slate-500 border-b border-slate-100 uppercase tracking-wider font-semibold bg-slate-50/50">
                  <th className="px-6 py-4">ID Paciente</th>
                  <th className="px-6 py-4">Nombre</th>
                  <th className="px-6 py-4">Fenotipo</th>
                  <th className="px-6 py-4">Día de Inducción</th>
                  <th className="px-6 py-4">Causa Principal</th>
                  <th className="px-6 py-4 text-right">Fecha del Evento</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {pacientesMortalidad.map((p, i) => (
                  <tr key={i} className="hover:bg-slate-50 transition-colors text-slate-600">
                    <td className="px-6 py-4 font-bold">{p.id}</td>
                    <td className="px-6 py-4 font-medium text-slate-800">{p.paciente} <span className="text-[10px] text-slate-400 font-normal">({p.edad})</span></td>
                    <td className="px-6 py-4">
                      <span className="bg-slate-100 px-2 py-1 rounded-md font-bold text-[10px]">{p.fenotipo}</span>
                    </td>
                    <td className="px-6 py-4 font-medium">{p.diasInduccion}</td>
                    <td className="px-6 py-4">
                      <span className="text-rose-600 font-medium">{p.causa}</span>
                    </td>
                    <td className="px-6 py-4 text-right text-slate-400 font-mono">{p.fecha}</td>
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