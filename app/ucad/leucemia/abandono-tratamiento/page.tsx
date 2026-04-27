"use client";

import Link from "next/link";
import { ArrowLeft, Calendar, Filter, Search, UserX, AlertTriangle, MapPin, TrendingUp, HeartHandshake } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from "recharts";

// Datos para Causas de Abandono
const dataCausasAbandono = [
  { name: 'Barreras Económicas', valor: 40, color: '#6366f1' },
  { name: 'Dificultad Geográfica', valor: 30, color: '#818cf8' },
  { name: 'Creencias Culturales', valor: 15, color: '#a5b4fc' },
  { name: 'Problemas Administrativos', valor: 15, color: '#c7d2fe' },
];

// Datos para Tendencia de Abandono (Anual)
const dataTendenciaAbandono = [
  { year: '2021', tasa: 8.2 },
  { year: '2022', tasa: 6.5 },
  { year: '2023', tasa: 5.1 },
  { year: '2024', tasa: 4.2 },
  { year: '2025', tasa: 3.8 },
  { year: '2026', tasa: 3.1 },
];

const pacientesRiesgoAbandono = [
  { id: "L2024-210", paciente: "Kevin Duarte", procedencia: "Rural (Vichada)", riesgo: "Alto", ultimaCita: "10/04/2026", estado: "En Seguimiento" },
  { id: "L2024-215", paciente: "Sara Montiel", procedencia: "Urbana (Bogotá)", riesgo: "Bajo", ultimaCita: "22/04/2026", estado: "Activo" },
  { id: "L2023-502", paciente: "Luis Paredes", procedencia: "Rural (Chocó)", riesgo: "Crítico", ultimaCita: "01/03/2026", estado: "Deserción Probable" },
  { id: "L2024-301", paciente: "Emma Rivas", procedencia: "Urbana (Soacha)", riesgo: "Medio", ultimaCita: "15/04/2026", estado: "Activo" },
];

export default function AbandonoTratamientoDashboard() {
  return (
    <div className="relative min-h-screen w-full pb-12">
      {/* Fondo Institucional */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <img src="/fondo.jpg" alt="Fondo" className="w-full h-full object-cover opacity-15 grayscale-[20%]" />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50/10 via-transparent to-slate-50/90"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto mt-4 px-4">
        {/* Encabezado */}
        <div className="flex items-center gap-4 mb-6">
          <Link href="/ucad/leucemia" className="p-2 hover:bg-white/80 rounded-full transition-colors flex items-center gap-2 text-sm font-medium text-slate-600 bg-white/50 border border-slate-200 shadow-sm">
            <ArrowLeft className="w-4 h-4" /> Volver
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-[#324D6D] tracking-tight">Porcentaje de Abandono al Tratamiento</h1>
            <p className="text-sm text-slate-500">Unidad de Leucemia • Impacto Social • Monitoreo de Deserción Terapéutica</p>
          </div>
        </div>

        {/* Filtros */}
        <div className="flex flex-wrap items-center gap-4 mb-8 text-sm">
          <div className="bg-white/90 backdrop-blur-sm px-3 py-2 rounded-xl border border-slate-200 shadow-sm flex items-center gap-2">
            <Calendar className="w-4 h-4 text-slate-400" />
            <select className="bg-transparent outline-none cursor-pointer font-medium"><option>Cohorte 2026</option></select>
          </div>
          <div className="bg-white/90 backdrop-blur-sm px-3 py-2 rounded-xl border border-slate-200 shadow-sm flex items-center gap-2">
            <MapPin className="w-4 h-4 text-slate-400" />
            <select className="bg-transparent outline-none cursor-pointer font-medium"><option>Todas las regiones</option></select>
          </div>
        </div>

        {/* KPIs Superiores */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between border-l-4 border-l-indigo-500">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Tasa de Abandono</p>
              <p className="text-3xl font-bold text-slate-800">3.1%</p>
            </div>
            <UserX className="w-8 h-8 text-indigo-500 opacity-20" />
          </div>
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between border-l-4 border-l-rose-500">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Pacientes en Riesgo</p>
              <p className="text-3xl font-bold text-rose-600">12</p>
            </div>
            <AlertTriangle className="w-8 h-8 text-rose-500 opacity-20" />
          </div>
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between border-l-4 border-l-emerald-500">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Casos Recuperados</p>
              <p className="text-3xl font-bold text-emerald-600">5</p>
            </div>
            <HeartHandshake className="w-8 h-8 text-emerald-500 opacity-20" />
          </div>
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between border-l-4 border-l-slate-400">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Meta 2026</p>
              <p className="text-3xl font-bold text-slate-800">&lt; 2.0%</p>
            </div>
            <TrendingUp className="w-8 h-8 text-slate-400 opacity-20" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Gráfico de Torta: Causas */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="text-sm font-bold text-slate-700 mb-1">Causas Identificadas de Abandono</h3>
            <p className="text-[10px] text-slate-400 mb-6">Análisis de barreras sociales y económicas</p>
            <div className="h-64 w-full relative flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={dataCausasAbandono} innerRadius={60} outerRadius={85} paddingAngle={5} dataKey="valor" stroke="none">
                    {dataCausasAbandono.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value}%`, 'Impacto']} />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute flex flex-col items-center">
                <span className="text-2xl font-bold text-indigo-600">Social</span>
                <span className="text-[9px] text-slate-500 font-bold uppercase tracking-tighter">Determinantes</span>
              </div>
            </div>
          </div>

          {/* Gráfico de Línea: Tendencia Histórica */}
          <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="text-sm font-bold text-slate-700 mb-1">Tendencia Histórica de Deserción</h3>
            <p className="text-[10px] text-slate-400 mb-6">Evolución anual del porcentaje de abandono</p>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={dataTendenciaAbandono} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{fontSize: 12}} />
                  <YAxis domain={[0, 10]} axisLine={false} tickLine={false} tick={{fontSize: 10}} />
                  <Tooltip />
                  <Line type="monotone" dataKey="tasa" name="% Abandono" stroke="#6366f1" strokeWidth={3} dot={{ r: 6, fill: "#6366f1", strokeWidth: 2, stroke: "#fff" }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Tabla de Alerta Temprana */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-50 bg-indigo-50/30 flex justify-between items-center">
            <div>
              <h3 className="text-sm font-bold text-indigo-800">Panel de Alerta Temprana (Seguimiento de Abandono)</h3>
              <p className="text-[10px] text-slate-500 mt-1">Pacientes con riesgo de deserción por factores socio-geográficos</p>
            </div>
            <button className="text-[10px] font-bold text-indigo-600 bg-white px-3 py-1.5 rounded-lg border border-indigo-200 shadow-sm">Generar Alertas Trabajo Social</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="text-slate-400 border-b border-slate-100 uppercase tracking-wider font-semibold bg-slate-50/50">
                  <th className="px-6 py-4">ID</th>
                  <th className="px-6 py-4">Paciente</th>
                  <th className="px-6 py-4">Procedencia</th>
                  <th className="px-6 py-4 text-center">Nivel de Riesgo</th>
                  <th className="px-6 py-4">Última Cita Registrada</th>
                  <th className="px-6 py-4 text-right">Estado Actual</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {pacientesRiesgoAbandono.map((p, i) => (
                  <tr key={i} className="hover:bg-slate-50 transition-colors text-slate-600">
                    <td className="px-6 py-4 font-bold">{p.id}</td>
                    <td className="px-6 py-4 font-medium text-slate-800">{p.paciente}</td>
                    <td className="px-6 py-4">{p.procedencia}</td>
                    <td className="px-6 py-4 text-center">
                      <span className={`px-2 py-1 rounded-md font-bold text-[10px] ${
                        p.riesgo === 'Bajo' ? 'bg-emerald-50 text-emerald-700' :
                        p.riesgo === 'Medio' ? 'bg-amber-50 text-amber-700' :
                        'bg-rose-50 text-rose-700'
                      }`}>{p.riesgo}</span>
                    </td>
                    <td className="px-6 py-4 font-mono">{p.ultimaCita}</td>
                    <td className="px-6 py-4 text-right">
                      <span className="font-medium text-slate-500 italic">{p.estado}</span>
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