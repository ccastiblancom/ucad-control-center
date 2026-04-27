"use client";

import Link from "next/link";
import { ArrowLeft, Calendar, Filter, Search, Clock, Target, Timer, CheckCircle2, AlertCircle } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, LineChart, Line, Cell } from "recharts";

// Distribución de tiempos: Entrada Urgencias -> Inicio Cirugía
const dataDistribucionTiempos = [
  { name: '< 4 Horas', valor: 45, color: '#2563eb' },
  { name: '4 - 8 Horas', valor: 35, color: '#3b82f6' },
  { name: '8 - 12 Horas', valor: 15, color: '#f59e0b' },
  { name: '> 12 Horas', valor: 5, color: '#ef4444' },
];

// Tendencia mensual del promedio de horas
const dataTendenciaApendicitis = [
  { mes: 'Ene', horas: 7.2 },
  { mes: 'Feb', horas: 6.8 },
  { mes: 'Mar', horas: 6.5 },
  { mes: 'Abr', horas: 5.9 },
  { mes: 'May', horas: 5.2 },
  { mes: 'Jun', horas: 4.8 },
];

// Log de casos quirúrgicos
const casosApendicitis = [
  { id: "AP-2026-102", paciente: "Juan Diego Mora", ingreso: "08:15 AM", cirugia: "11:30 AM", total: "3.2h", estado: "Óptimo" },
  { id: "AP-2026-105", paciente: "Valeria Sopó", ingreso: "14:00 PM", cirugia: "18:45 PM", total: "4.7h", estado: "En Meta" },
  { id: "AP-2026-108", paciente: "Mateo Bernal", ingreso: "20:30 PM", cirugia: "06:00 AM", total: "9.5h", estado: "Retraso" },
  { id: "AP-2026-112", paciente: "Luciana Rivas", ingreso: "02:10 AM", cirugia: "05:40 AM", total: "3.5h", estado: "Óptimo" },
];

export default function TiempoApendicitisDashboard() {
  
  // Lógica de cumplimiento gerencial (Meta < 6 horas)
  const metaHoras = 6;
  const promedioActual = 4.8;
  const calculoCumplimiento = Math.round((metaHoras / promedioActual) * 100);
  // Regla: tope del 100% para resultados conservadores
  const cumplimientoMostrado = calculoCumplimiento > 100 ? 100 : calculoCumplimiento;

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
          <Link href="/ucad/cirugia-pediatrica" className="p-2 hover:bg-white/80 rounded-full transition-colors flex items-center gap-2 text-sm font-medium text-slate-600 bg-white/50 border border-slate-200 shadow-sm">
            <ArrowLeft className="w-4 h-4" /> Volver
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-[#324D6D] tracking-tight">Tiempo Urgencia en Apendicitis</h1>
            <p className="text-sm text-slate-500">Unidad de Cirugía Pediátrica • Excelencia Clínica • Oportunidad Quirúrgica</p>
          </div>
        </div>

        {/* Filtros */}
        <div className="flex flex-wrap items-center gap-4 mb-8 text-sm">
          <div className="bg-white/90 backdrop-blur-sm px-3 py-2 rounded-xl border border-slate-200 shadow-sm flex items-center gap-2">
            <Calendar className="w-4 h-4 text-slate-400" />
            <select className="bg-transparent outline-none cursor-pointer font-medium"><option>Mes de Junio 2026</option></select>
          </div>
          <div className="bg-white/90 backdrop-blur-sm px-3 py-2 rounded-xl border border-slate-200 shadow-sm flex-1 max-w-xs flex items-center gap-2">
            <Search className="w-4 h-4 text-slate-400" />
            <input type="text" placeholder="Buscar paciente o ID..." className="bg-transparent outline-none w-full" />
          </div>
        </div>

        {/* KPIs Estratégicos */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between border-l-4 border-l-blue-600">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Casos Intervenidos</p>
              <p className="text-3xl font-bold text-slate-800">128</p>
            </div>
            <Timer className="w-8 h-8 text-blue-600 opacity-20" />
          </div>
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between border-l-4 border-l-emerald-500">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Promedio de Espera</p>
              <div className="flex items-baseline gap-1">
                <p className="text-3xl font-bold text-emerald-600">{promedioActual}</p>
                <p className="text-[10px] font-bold text-slate-400">Horas</p>
              </div>
            </div>
            <Clock className="w-8 h-8 text-emerald-500 opacity-20" />
          </div>
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between border-l-4 border-l-slate-400">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Meta (D2OR)</p>
              <div className="flex items-baseline gap-1">
                <p className="text-3xl font-bold text-slate-800">&lt; {metaHoras}</p>
                <p className="text-[10px] font-bold text-slate-400">Horas</p>
              </div>
            </div>
            <Target className="w-8 h-8 text-slate-400 opacity-20" />
          </div>
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between border-l-4 border-l-indigo-500">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Cumplimiento Meta</p>
              <p className="text-3xl font-bold text-indigo-600">{cumplimientoMostrado}%</p>
            </div>
            <CheckCircle2 className="w-8 h-8 text-indigo-500 opacity-20" />
          </div>
        </div>

        {/* Gráficas */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Distribución de Oportunidad */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="text-sm font-bold text-slate-700 mb-1">Distribución de Oportunidad</h3>
            <p className="text-[10px] text-slate-400 mb-6">Tiempo desde el ingreso hasta el inicio de cirugía</p>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dataDistribucionTiempos} margin={{ left: -20 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" tick={{fontSize: 10, fontWeight: 600}} axisLine={false} tickLine={false} />
                  <YAxis tick={{fontSize: 10}} axisLine={false} tickLine={false} />
                  <RechartsTooltip cursor={{fill: '#f8fafc'}} formatter={(value) => [`${value}%`, 'Pacientes']} />
                  <Bar dataKey="valor" radius={[4, 4, 0, 0]} barSize={40}>
                    {dataDistribucionTiempos.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Tendencia Mensual */}
          <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="text-sm font-bold text-slate-700 mb-1">Tendencia de Respuesta Quirúrgica</h3>
            <p className="text-[10px] text-slate-400 mb-6">Evolución del promedio de horas para inicio de procedimiento</p>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={dataTendenciaApendicitis} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="mes" axisLine={false} tickLine={false} tick={{fontSize: 12}} />
                  <YAxis domain={[0, 10]} axisLine={false} tickLine={false} tick={{fontSize: 10}} />
                  <RechartsTooltip />
                  <Line type="monotone" dataKey={() => 6.0} stroke="#ef4444" strokeWidth={2} strokeDasharray="5 5" dot={false} name="Límite Meta (6h)" />
                  <Line type="monotone" dataKey="horas" stroke="#2563eb" strokeWidth={3} dot={{ r: 5, fill: "#2563eb", strokeWidth: 2, stroke: "#fff" }} name="Horas Promedio" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Tabla de Detalle */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-50 bg-blue-50/30 flex justify-between items-center">
            <h3 className="text-sm font-bold text-blue-800 flex items-center gap-2">
              <AlertCircle className="w-4 h-4" /> Registro de Oportunidad Quirúrgica (D2OR)
            </h3>
            <button className="text-[10px] font-bold text-blue-600 bg-white px-3 py-1.5 rounded-lg border border-blue-200">Exportar Auditoría</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="text-slate-500 border-b border-slate-100 uppercase tracking-wider font-semibold bg-slate-50/50">
                  <th className="px-6 py-4">ID Paciente</th>
                  <th className="px-6 py-4">Nombre</th>
                  <th className="px-6 py-4 text-center">Ingreso Urgencias</th>
                  <th className="px-6 py-4 text-center">Inicio Cirugía</th>
                  <th className="px-6 py-4 text-center">Tiempo Total</th>
                  <th className="px-6 py-4 text-right">Estatus</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {casosApendicitis.map((p, i) => (
                  <tr key={i} className="hover:bg-slate-50 transition-colors text-slate-600">
                    <td className="px-6 py-4 font-bold">{p.id}</td>
                    <td className="px-6 py-4 font-medium text-slate-800">{p.paciente}</td>
                    <td className="px-6 py-4 text-center font-mono text-slate-500">{p.ingreso}</td>
                    <td className="px-6 py-4 text-center font-mono text-slate-500">{p.cirugia}</td>
                    <td className="px-6 py-4 text-center font-bold text-slate-700">{p.total}</td>
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