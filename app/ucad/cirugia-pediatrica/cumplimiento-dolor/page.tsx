"use client";

import Link from "next/link";
import { ArrowLeft, Calendar, Search, Smile, Target, ClipboardCheck, Thermometer, Clock, ShieldCheck } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, LineChart, Line, Cell, PieChart, Pie } from "recharts";

// Datos: Uso de Escalas por Tipo (FLACC, Wong-Baker, EVA)
const dataEscalas = [
  { name: 'Escala FLACC', valor: 98, color: '#2563eb' },
  { name: 'Wong-Baker', valor: 96, color: '#3b82f6' },
  { name: 'EVA (Visual)', valor: 92, color: '#60a5fa' },
];

// Datos: Cumplimiento por Turno (Mañana, Tarde, Noche)
const dataTurnos = [
  { name: 'Mañana', cumplimiento: 97, color: '#10b981' },
  { name: 'Tarde', cumplimiento: 95, color: '#3b82f6' },
  { name: 'Noche', cumplimiento: 91, color: '#f59e0b' },
];

// Datos: Tendencia Mensual de Cumplimiento
const dataTendenciaDolor = [
  { mes: 'Ene', valor: 89 },
  { mes: 'Feb', valor: 92 },
  { mes: 'Mar', valor: 94 },
  { mes: 'Abr', valor: 95 },
  { mes: 'May', valor: 96 },
  { mes: 'Jun', valor: 97.5 },
];

// Registro de Auditoría de Recuperación
const logDolor = [
  { id: "PAIN-26-401", paciente: "Julian Castro", escala: "FLACC", resultado: "2/10", cumplimiento: "Correcto", turno: "Mañana" },
  { id: "PAIN-26-405", paciente: "Valentina Meza", escala: "Wong-Baker", resultado: "0/10", cumplimiento: "Correcto", turno: "Tarde" },
  { id: "PAIN-26-410", paciente: "Mateo Ospina", escala: "FLACC", resultado: "4/10", cumplimiento: "Omitido", turno: "Noche" },
  { id: "PAIN-26-415", paciente: "Luciana Rivas", escala: "EVA", resultado: "1/10", cumplimiento: "Correcto", turno: "Mañana" },
];

export default function CumplimientoDolorDashboard() {
  
  // Lógica de Gestión Gerencial
  const cumplimientoReal = 97.5;
  const metaEstablecida = 95.0;
  
  // Regla institucional: Tope del 100% para indicadores de cumplimiento
  const calculoCumplimiento = Math.round((cumplimientoReal / metaEstablecida) * 100);
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
            <h1 className="text-2xl font-bold text-[#324D6D] tracking-tight">Cumplimiento Escalas de Dolor</h1>
            <p className="text-sm text-slate-500">Unidad de Cirugía Pediátrica • Integridad y Humanización • Recuperación</p>
          </div>
        </div>

        {/* KPIs Estratégicos */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between border-l-4 border-l-blue-500">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Pacientes Auditados</p>
              <p className="text-3xl font-bold text-slate-800">248</p>
            </div>
            <ClipboardCheck className="w-8 h-8 text-blue-500 opacity-20" />
          </div>
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between border-l-4 border-l-emerald-500">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Cumplimiento Real</p>
              <p className="text-3xl font-bold text-emerald-600">{cumplimientoReal}%</p>
            </div>
            <Smile className="w-8 h-8 text-emerald-500 opacity-20" />
          </div>
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between border-l-4 border-l-slate-400">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Meta Institucional</p>
              <p className="text-3xl font-bold text-slate-800">&gt; {metaEstablecida}%</p>
            </div>
            <Target className="w-8 h-8 text-slate-400 opacity-20" />
          </div>
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between border-l-4 border-l-indigo-500">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Cumplimiento Auditado</p>
              <p className="text-3xl font-bold text-indigo-600">{cumplimientoMostrado}%</p>
            </div>
            <ShieldCheck className="w-8 h-8 text-indigo-500 opacity-20" />
          </div>
        </div>

        {/* Gráficas */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          
          {/* Cumplimiento por Turno */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="text-sm font-bold text-slate-700 mb-1">Cumplimiento por Turno</h3>
            <p className="text-[10px] text-slate-400 mb-6">Identificación de brechas operativas por jornada</p>
            <div className="h-64 w-full relative flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={dataTurnos} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="cumplimiento" stroke="none">
                    {dataTurnos.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <RechartsTooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute flex flex-col items-center">
                <span className="text-2xl font-bold text-[#324D6D]">Global</span>
                <span className="text-[9px] text-slate-500 font-bold uppercase tracking-tighter">95%</span>
              </div>
            </div>
          </div>

          {/* Tendencia Mensual */}
          <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="text-sm font-bold text-slate-700 mb-1">Evolución de la Adherencia</h3>
            <p className="text-[10px] text-slate-400 mb-6">Progreso mensual del uso de escalas de dolor en recuperación</p>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={dataTendenciaDolor} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="mes" axisLine={false} tickLine={false} tick={{fontSize: 12}} />
                  <YAxis domain={[80, 100]} axisLine={false} tickLine={false} tick={{fontSize: 10}} />
                  <RechartsTooltip />
                  <Line type="monotone" dataKey="valor" stroke="#2563eb" strokeWidth={3} dot={{ r: 5, fill: "#2563eb", strokeWidth: 2, stroke: "#fff" }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Tabla de Auditoría Detallada */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-50 bg-blue-50/30 flex justify-between items-center">
            <h3 className="text-sm font-bold text-blue-800 flex items-center gap-2">
              <Thermometer className="w-4 h-4" /> Bitácora de Monitorización del Dolor
            </h3>
            <button className="text-[10px] font-bold text-blue-600 bg-white px-3 py-1.5 rounded-lg border border-blue-200 shadow-sm">Generar Reporte Calidad</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="text-slate-500 border-b border-slate-100 uppercase tracking-wider font-semibold bg-slate-50/50">
                  <th className="px-6 py-4">ID Auditoría</th>
                  <th className="px-6 py-4">Paciente</th>
                  <th className="px-6 py-4">Escala Aplicada</th>
                  <th className="px-6 py-4 text-center">Registro Dolor</th>
                  <th className="px-6 py-4">Turno</th>
                  <th className="px-6 py-4 text-right">Estatus</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {logDolor.map((p, i) => (
                  <tr key={i} className="hover:bg-slate-50 transition-colors text-slate-600">
                    <td className="px-6 py-4 font-bold">{p.id}</td>
                    <td className="px-6 py-4 font-medium text-slate-800">{p.paciente}</td>
                    <td className="px-6 py-4 text-blue-600 font-medium">{p.escala}</td>
                    <td className="px-6 py-4 text-center font-bold text-slate-700">{p.resultado}</td>
                    <td className="px-6 py-4 text-slate-500">{p.turno}</td>
                    <td className="px-6 py-4 text-right">
                      <span className={`px-3 py-1 rounded-md font-bold text-[10px] ${
                        p.cumplimiento === 'Correcto' ? 'text-emerald-600 bg-emerald-50' : 'text-rose-600 bg-rose-50'
                      }`}>
                        {p.cumplimiento}
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