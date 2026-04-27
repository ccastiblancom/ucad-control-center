"use client";

import Link from "next/link";
import { ArrowLeft, Calendar, Filter, Search, ShieldAlert, Target, TrendingDown, Scissors, CheckCircle2 } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, BarChart, Bar, Cell } from "recharts";

const dataTendenciaISO = [
  { mes: 'Ene', tasa: 0.8 },
  { mes: 'Feb', tasa: 0.6 },
  { mes: 'Mar', tasa: 0.9 },
  { mes: 'Abr', tasa: 0.4 },
  { mes: 'May', tasa: 0.5 },
  { mes: 'Jun', tasa: 0.3 },
];

const dataTipoHerida = [
  { name: 'Limpia', tasa: 0.2, color: '#2563eb' },
  { name: 'Limpia/Contaminada', tasa: 0.8, color: '#3b82f6' },
  { name: 'Contaminada', tasa: 1.5, color: '#60a5fa' },
  { name: 'Sucia', tasa: 2.1, color: '#93c5fd' },
];

const registrosISO = [
  { id: "CIR-2026-001", paciente: "Andrés Ruiz", procedimiento: "Apendicectomía", tipo: "ISO Superficial", fecha: "15/04/2026", germen: "S. aureus" },
  { id: "CIR-2026-015", paciente: "Mariana Gómez", procedimiento: "Herniorrafia Inguinal", tipo: "ISO Profunda", fecha: "22/05/2026", germen: "E. coli" },
];

export default function TasaISODashboard() {
  return (
    <div className="relative min-h-screen w-full pb-12">
      {/* Fondo */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <img src="/fondo.jpg" className="w-full h-full object-cover opacity-10" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto mt-4 px-4">
        {/* Encabezado */}
        <div className="flex items-center gap-4 mb-6">
          <Link href="/ucad/cirugia-pediatrica" className="p-2 hover:bg-white/80 rounded-full transition-colors flex items-center gap-2 text-sm font-medium text-slate-600 bg-white/50 border border-slate-200">
            <ArrowLeft className="w-4 h-4" /> Volver
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-[#324D6D] tracking-tight">Tasa de Infección de Sitio Operatorio (ISO)</h1>
            <p className="text-sm text-slate-500">Unidad de Cirugía Pediátrica • Excelencia Clínica • Meta &lt; 1%</p>
          </div>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between border-l-4 border-l-blue-600">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Procedimientos</p>
              <p className="text-3xl font-bold text-slate-800">452</p>
            </div>
            <Scissors className="w-8 h-8 text-blue-600 opacity-20" />
          </div>
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between border-l-4 border-l-emerald-500">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Tasa Actual ISO</p>
              <p className="text-3xl font-bold text-emerald-600">0.3%</p>
            </div>
            <ShieldAlert className="w-8 h-8 text-emerald-600 opacity-20" />
          </div>
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between border-l-4 border-l-slate-400">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Meta Institucional</p>
              <p className="text-3xl font-bold text-slate-800">&lt; 1.0%</p>
            </div>
            <Target className="w-8 h-8 text-slate-400 opacity-20" />
          </div>
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between border-l-4 border-l-blue-400">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Cumplimiento Meta</p>
              <p className="text-3xl font-bold text-blue-600">100%</p>
            </div>
            <CheckCircle2 className="w-8 h-8 text-blue-600 opacity-20" />
          </div>
        </div>

        {/* Gráficas */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="text-sm font-bold text-slate-700 mb-6">Evolución Mensual de la Tasa ISO</h3>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={dataTendenciaISO} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="mes" axisLine={false} tickLine={false} tick={{fontSize: 12}} />
                  <YAxis domain={[0, 2]} axisLine={false} tickLine={false} tick={{fontSize: 10}} />
                  <RechartsTooltip cursor={{ fill: '#f8fafc' }} formatter={(value) => [`${value}%`, 'Tasa ISO']} />
                  <Line type="monotone" dataKey={() => 1.0} stroke="#ef4444" strokeWidth={1} strokeDasharray="5 5" dot={false} name="Límite Meta" />
                  <Line type="monotone" dataKey="tasa" stroke="#2563eb" strokeWidth={3} dot={{ r: 4, fill: "#2563eb", strokeWidth: 2, stroke: "#fff" }} name="Tasa Real" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="text-sm font-bold text-slate-700 mb-6">ISO por Tipo de Herida</h3>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dataTipoHerida} layout="vertical" margin={{ left: -10, right: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                  <XAxis type="number" domain={[0, 3]} hide />
                  <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 600}} width={110} />
                  <RechartsTooltip formatter={(value) => [`${value}%`, 'Tasa']} />
                  <Bar dataKey="tasa" radius={[0, 4, 4, 0]} barSize={20}>
                    {dataTipoHerida.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Tabla Log */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-50 bg-blue-50/30">
            <h3 className="text-sm font-bold text-blue-800">Casos en Vigilancia Epidemiológica</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="text-slate-500 border-b border-slate-100 uppercase tracking-wider font-semibold bg-slate-50/50">
                  <th className="px-6 py-4">ID</th>
                  <th className="px-6 py-4">Paciente</th>
                  <th className="px-6 py-4">Procedimiento</th>
                  <th className="px-6 py-4">Tipo ISO</th>
                  <th className="px-6 py-4">Microorganismo</th>
                  <th className="px-6 py-4 text-right">Fecha</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {registrosISO.map((p, i) => (
                  <tr key={i} className="hover:bg-slate-50 transition-colors text-slate-600">
                    <td className="px-6 py-4 font-bold">{p.id}</td>
                    <td className="px-6 py-4 font-medium text-slate-800">{p.paciente}</td>
                    <td className="px-6 py-4">{p.procedimiento}</td>
                    <td className="px-6 py-4">
                      <span className="bg-rose-50 text-rose-600 px-2 py-1 rounded-md font-bold text-[10px]">{p.tipo}</span>
                    </td>
                    <td className="px-6 py-4 italic">{p.germen}</td>
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