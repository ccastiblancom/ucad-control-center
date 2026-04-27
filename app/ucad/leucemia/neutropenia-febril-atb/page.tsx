"use client";

import Link from "next/link";
import { ArrowLeft, Calendar, Filter, Search, Thermometer, Target, TrendingDown, Clock, CheckCircle2 } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, BarChart, Bar, Cell } from "recharts";

// Datos simulados basados en la imagen
const dataTiemposAdministracion = [
  { name: '< 60 min', valor: 90, color: '#10b981' }, // Verde (Óptimo)
  { name: '60 - 120 min', valor: 8, color: '#f59e0b' }, // Ámbar (Retraso moderado)
  { name: '> 120 min', valor: 2, color: '#ef4444' }, // Rojo (Retraso severo)
];

const dataCumplimientoMensual = [
  { mes: 'Ene', tasa: 88 },
  { mes: 'Feb', tasa: 85 },
  { mes: 'Mar', tasa: 89 },
  { mes: 'Abr', tasa: 90 },
  { mes: 'May', tasa: 92 },
  { mes: 'Jun', tasa: 90 },
];

const pacientesNeutropenia = [
  { id: "L2024-015", paciente: "Mariana López", fecha: "10/05/2026", horaAlerta: "08:15 AM", horaATB: "08:50 AM", tiempoTotal: "35 min", cumple: "Sí" },
  { id: "L2024-042", paciente: "Carlos Vargas", fecha: "12/05/2026", horaAlerta: "14:30 PM", horaATB: "15:45 PM", tiempoTotal: "75 min", cumple: "No" },
  { id: "L2024-068", paciente: "Lucía Gómez", fecha: "15/05/2026", horaAlerta: "20:00 PM", horaATB: "20:40 PM", tiempoTotal: "40 min", cumple: "Sí" },
  { id: "L2024-091", paciente: "Andrés Silva", fecha: "18/05/2026", horaAlerta: "02:10 AM", horaATB: "03:40 AM", tiempoTotal: "90 min", cumple: "No" },
];

export default function NeutropeniaFebrilDashboard() {
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
            <h1 className="text-2xl font-bold text-[#324D6D] tracking-tight">% de pacientes con LLA y neutropenia febril (ATB &lt; 60 min)</h1>
            <p className="text-sm text-slate-500">Unidad Clínica de Alto Desempeño Leucemia • Resultados Clínicos (Oportunidad)</p>
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
            <select className="bg-transparent outline-none cursor-pointer font-medium"><option>Todos los Servicios</option></select>
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
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Casos Neutropenia Febril</p>
              <p className="text-3xl font-bold text-slate-800">85</p>
            </div>
            <Thermometer className="w-8 h-8 text-blue-500 opacity-20" />
          </div>
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Tasa Cumplimiento (&lt; 60 min)</p>
              <p className="text-3xl font-bold text-teal-600">90%</p>
            </div>
            <CheckCircle2 className="w-8 h-8 text-teal-600 opacity-20" />
          </div>
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Meta Institucional</p>
              <p className="text-3xl font-bold text-slate-800">&gt; 95%</p>
            </div>
            <Target className="w-8 h-8 text-slate-400 opacity-20" />
          </div>
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Brecha vs Meta</p>
              <p className="text-3xl font-bold text-rose-500">-5.0%</p>
            </div>
            <TrendingDown className="w-8 h-8 text-rose-500 opacity-20" />
          </div>
        </div>

        {/* Gráficas de Análisis */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          
          {/* Gráfico de Barras: Distribución de Tiempos */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="text-sm font-bold text-slate-700 mb-1">Tiempos de Administración</h3>
            <p className="text-[10px] text-slate-400 mb-6">Distribución porcentual de oportunidad de ATB</p>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dataTiemposAdministracion} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 600}} />
                  <YAxis domain={[0, 100]} axisLine={false} tickLine={false} tick={{fontSize: 10}} />
                  <RechartsTooltip cursor={{fill: '#f8fafc'}} formatter={(value) => [`${value}%`, 'Pacientes']} />
                  <Bar dataKey="valor" radius={[4, 4, 0, 0]} barSize={40}>
                    {dataTiemposAdministracion.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Gráfico de Líneas: Cumplimiento Mensual */}
          <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-sm font-bold text-slate-700">Cumplimiento Mensual (ATB &lt; 60 min)</h3>
                <p className="text-[10px] text-slate-400">Evolución de la oportunidad frente a la meta del 95%</p>
              </div>
            </div>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={dataCumplimientoMensual} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="mes" axisLine={false} tickLine={false} tick={{fontSize: 12}} />
                  <YAxis domain={[50, 100]} axisLine={false} tickLine={false} tick={{fontSize: 10}} />
                  <RechartsTooltip cursor={{ fill: '#f8fafc' }} formatter={(value) => [`${value}%`, 'Cumplimiento']} />
                  {/* Línea de Meta */}
                  <Line type="monotone" dataKey={() => 95} stroke="#10b981" strokeWidth={2} strokeDasharray="5 5" dot={false} name="Meta (95%)" />
                  {/* Línea Real */}
                  <Line type="monotone" dataKey="tasa" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4, fill: "#3b82f6", strokeWidth: 2, stroke: "#fff" }} name="Tasa Lograda" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Tabla Detallada: Hora Dorada */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-50 bg-blue-50/30 flex justify-between items-center">
            <div>
              <h3 className="text-sm font-bold text-blue-800 flex items-center gap-2">
                <Clock className="w-4 h-4" /> Registro de Tiempos de Administración (Hora Dorada)
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
                  <th className="px-6 py-4">Fecha Evento</th>
                  <th className="px-6 py-4">Hora Triaje / Alerta</th>
                  <th className="px-6 py-4">Hora Inicio ATB</th>
                  <th className="px-6 py-4">Tiempo Puerta-Aguja</th>
                  <th className="px-6 py-4 text-center">Cumple &lt;60 min</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {pacientesNeutropenia.map((p, i) => (
                  <tr key={i} className="hover:bg-slate-50 transition-colors text-slate-600">
                    <td className="px-6 py-4 font-bold">{p.id}</td>
                    <td className="px-6 py-4 font-medium text-slate-800">{p.paciente}</td>
                    <td className="px-6 py-4 text-slate-500">{p.fecha}</td>
                    <td className="px-6 py-4 font-mono">{p.horaAlerta}</td>
                    <td className="px-6 py-4 font-mono">{p.horaATB}</td>
                    <td className="px-6 py-4 font-bold text-slate-700">{p.tiempoTotal}</td>
                    <td className="px-6 py-4 text-center">
                      <span className={`px-3 py-1 rounded-md font-bold ${p.cumple === 'Sí' ? 'text-emerald-600 bg-emerald-50' : 'text-rose-600 bg-rose-50'}`}>
                        {p.cumple}
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