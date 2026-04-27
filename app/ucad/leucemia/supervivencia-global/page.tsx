"use client";

import Link from "next/link";
import { ArrowLeft, Calendar, Filter, Search, TrendingUp, Users, Target, Activity } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from "recharts";

const dataCurvaSupervivencia = [
  { mes: 'Mes 0', valor: 100 }, { mes: 'Mes 12', valor: 95 },
  { mes: 'Mes 24', valor: 92 }, { mes: 'Mes 36', valor: 89 },
  { mes: 'Mes 48', valor: 87 }, { mes: 'Mes 60', valor: 85 },
];

const dataRiesgo = [
  { name: 'Riesgo Bajo', valor: 94, color: '#10b981' },
  { name: 'Riesgo Estándar', valor: 88, color: '#3b82f6' },
  { name: 'Riesgo Alto', valor: 72, color: '#f59e0b' },
  { name: 'Riesgo Muy Alto', valor: 65, color: '#ef4444' },
];

const pacientesSupervivencia = [
  { id: "L2024-001", paciente: "Julian Castro", dx: "LLA B", riesgo: "Estándar", seguimiento: "60 meses", estado: "Vivo / Remisión" },
  { id: "L2024-042", paciente: "Valentina Meza", dx: "LLA T", riesgo: "Alto", seguimiento: "36 meses", estado: "Vivo / Remisión" },
  { id: "L2023-115", paciente: "Mateo Ospina", dx: "LMA", riesgo: "Muy Alto", seguimiento: "12 meses", estado: "Fallecido" },
  { id: "L2024-089", paciente: "Lucía Pineda", dx: "LLA B", riesgo: "Bajo", seguimiento: "48 meses", estado: "Vivo / Remisión" },
];

export default function SupervivenciaGlobalDashboard() {
  return (
    <div className="relative min-h-screen w-full pb-12">
      {/* Fondo Institucional */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <img src="/fondo.jpg" className="w-full h-full object-cover opacity-10" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto mt-4 px-4">
        {/* Encabezado */}
        <div className="flex items-center gap-4 mb-6">
          <Link href="/ucad/leucemia" className="p-2 hover:bg-white rounded-full transition-colors flex items-center gap-2 text-sm font-medium text-slate-600">
            <ArrowLeft className="w-4 h-4" /> Volver
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-[#324D6D] tracking-tight">% de Supervivencia Global</h1>
            <p className="text-sm text-slate-500">Unidad Clínica de Alto Desempeño Leucemia • Resultados Clínicos</p>
          </div>
        </div>

        {/* Filtros */}
        <div className="flex flex-wrap items-center gap-4 mb-8 text-sm">
          <div className="bg-white px-3 py-2 rounded-lg border border-slate-200 shadow-sm flex items-center gap-2">
            <Calendar className="w-4 h-4 text-slate-400" />
            <select className="bg-transparent outline-none"><option>Todos los años</option></select>
          </div>
          <div className="bg-white px-3 py-2 rounded-lg border border-slate-200 shadow-sm flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-400" />
            <select className="bg-transparent outline-none"><option>Todos los Riesgos</option></select>
          </div>
          <div className="bg-white px-3 py-2 rounded-lg border border-slate-200 shadow-sm flex-1 max-w-xs flex items-center gap-2">
            <Search className="w-4 h-4 text-slate-400" />
            <input type="text" placeholder="Buscar paciente..." className="bg-transparent outline-none w-full" />
          </div>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase">Pacientes en Seguimiento</p>
              <p className="text-3xl font-bold text-slate-800">245</p>
            </div>
            <Users className="w-8 h-8 text-blue-500 opacity-20" />
          </div>
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase">Supervivencia (5 años)</p>
              <p className="text-3xl font-bold text-emerald-600">85%</p>
            </div>
            <TrendingUp className="w-8 h-8 text-emerald-500 opacity-20" />
          </div>
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase">Meta Institucional</p>
              <p className="text-3xl font-bold text-slate-800">90%</p>
            </div>
            <Target className="w-8 h-8 text-slate-400 opacity-20" />
          </div>
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase">Brecha de Mejora</p>
              <p className="text-3xl font-bold text-rose-500">-5.0%</p>
            </div>
            <Activity className="w-8 h-8 text-rose-500 opacity-20" />
          </div>
        </div>

        {/* Gráficas Principales */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Curva de Supervivencia */}
          <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="text-sm font-bold text-slate-700 mb-6">Curva de Supervivencia Estimada (Kaplan-Meier)</h3>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={dataCurvaSupervivencia}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="mes" tick={{fontSize: 10}} axisLine={false} />
                  <YAxis domain={[0, 100]} tick={{fontSize: 10}} axisLine={false} />
                  <Tooltip />
                  <Line type="stepAfter" dataKey="valor" stroke="#10b981" strokeWidth={4} dot={{r: 4}} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Supervivencia por Grupo de Riesgo */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="text-sm font-bold text-slate-700 mb-6">Supervivencia por Riesgo</h3>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dataRiesgo} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                  <XAxis type="number" domain={[0, 100]} hide />
                  <YAxis dataKey="name" type="category" tick={{fontSize: 9}} width={80} axisLine={false} />
                  <Tooltip />
                  <Bar dataKey="valor" radius={[0, 4, 4, 0]} barSize={20}>
                    {dataRiesgo.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Tabla de Detalle */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-50 bg-slate-50/50">
            <h3 className="text-sm font-bold text-slate-700">Pacientes en Seguimiento de Supervivencia</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="text-slate-400 border-b border-slate-50 uppercase tracking-wider">
                  <th className="px-6 py-4 font-medium">ID Paciente</th>
                  <th className="px-6 py-4 font-medium">Nombre</th>
                  <th className="px-6 py-4 font-medium">Diagnóstico</th>
                  <th className="px-6 py-4 font-medium">Riesgo</th>
                  <th className="px-6 py-4 font-medium">Tiempo Seguimiento</th>
                  <th className="px-6 py-4 font-medium text-right">Estado Actual</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {pacientesSupervivencia.map((p, i) => (
                  <tr key={i} className="hover:bg-slate-50 transition-colors text-slate-600">
                    <td className="px-6 py-4 font-bold">{p.id}</td>
                    <td className="px-6 py-4">{p.paciente}</td>
                    <td className="px-6 py-4">{p.dx}</td>
                    <td className="px-6 py-4">
                      <span className="bg-slate-100 px-2 py-1 rounded text-[10px] font-bold">{p.riesgo}</span>
                    </td>
                    <td className="px-6 py-4">{p.seguimiento}</td>
                    <td className="px-6 py-4 text-right">
                      <span className={`px-2 py-1 rounded font-bold ${p.estado.includes('Vivo') ? 'text-emerald-600 bg-emerald-50' : 'text-rose-600 bg-rose-50'}`}>
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