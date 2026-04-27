"use client";

import Link from "next/link";
import { ArrowLeft, Calendar, Search, AlertTriangle, Target, CheckCircle2, Stethoscope, Activity, ClipboardList } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, LineChart, Line, Cell } from "recharts";

// Datos: Severidad Clavien-Dindo
const dataClavienDindo = [
  { grade: 'Grado I (Leve)', valor: 55, color: '#fbbf24' },
  { grade: 'Grado II (Med.)', valor: 25, color: '#f59e0b' },
  { grade: 'Grado III (Int.)', valor: 15, color: '#d97706' },
  { grade: 'Grado IV (Grave)', valor: 5, color: '#ef4444' },
];

// Datos: Tendencia Mensual de Complicaciones
const dataTendenciaComplicaciones = [
  { mes: 'Ene', tasa: 4.8 },
  { mes: 'Feb', tasa: 4.2 },
  { mes: 'Mar', tasa: 5.1 },
  { mes: 'Abr', tasa: 3.9 },
  { mes: 'May', tasa: 3.5 },
  { mes: 'Jun', tasa: 3.2 },
];

// Registro de Casos con Hallazgos
const logComplicaciones = [
  { id: "CMP-2026-042", paciente: "Julian Castro", cirugia: "Toracoscopia", tipo: "Neumotórax residual", severidad: "Grado II", estado: "Auditado" },
  { id: "CMP-2026-045", paciente: "Valentina Meza", cirugia: "Pieloplastia", tipo: "Ileo Adinámico", severidad: "Grado I", estado: "Auditado" },
  { id: "CMP-2026-050", paciente: "Mateo Ospina", cirugia: "Apendicectomía", tipo: "Absceso de pared", severidad: "Grado IIIb", estado: "En Revisión" },
];

export default function ComplicacionesDashboard() {
  
  // Lógica de Gestión Gerencial (Meta < 5%)
  const metaTasa = 5.0;
  const tasaActual = 3.2;
  
  // Regla de Auditoría: Tope al 100% para cumplimiento conservador
  const calculoCumplimiento = Math.round((metaTasa / tasaActual) * 100);
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
            <h1 className="text-2xl font-bold text-[#324D6D] tracking-tight">% de Complicaciones Quirúrgicas</h1>
            <p className="text-sm text-slate-500">Unidad de Cirugía Pediátrica • Excelencia Clínica • Meta &lt; 5%</p>
          </div>
        </div>

        {/* KPIs Estratégicos */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between border-l-4 border-l-amber-500">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Procedimientos</p>
              <p className="text-3xl font-bold text-slate-800">254</p>
            </div>
            <Stethoscope className="w-8 h-8 text-amber-500 opacity-20" />
          </div>
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between border-l-4 border-l-emerald-500">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Tasa de Complicación</p>
              <p className="text-3xl font-bold text-emerald-600">{tasaActual}%</p>
            </div>
            <Activity className="w-8 h-8 text-emerald-500 opacity-20" />
          </div>
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between border-l-4 border-l-slate-400">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Umbral de Seguridad</p>
              <p className="text-3xl font-bold text-slate-800">&lt; {metaTasa}%</p>
            </div>
            <Target className="w-8 h-8 text-slate-400 opacity-20" />
          </div>
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between border-l-4 border-l-indigo-500">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Cumplimiento Auditado</p>
              <p className="text-3xl font-bold text-indigo-600">{cumplimientoMostrado}%</p>
            </div>
            <CheckCircle2 className="w-8 h-8 text-indigo-500 opacity-20" />
          </div>
        </div>

        {/* Gráficas */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          
          {/* Clasificación Clavien-Dindo */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="text-sm font-bold text-slate-700 mb-1">Severidad (Clavien-Dindo)</h3>
            <p className="text-[10px] text-slate-400 mb-6">Categorización internacional de complicaciones postquirúrgicas</p>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dataClavienDindo} margin={{ left: -10, right: 30 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="grade" axisLine={false} tickLine={false} tick={{fontSize: 9, fontWeight: 700}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10}} />
                  <RechartsTooltip cursor={{fill: '#f8fafc'}} formatter={(value) => [`${value}%`, 'Distribución']} />
                  <Bar dataKey="valor" radius={[4, 4, 0, 0]} barSize={35}>
                    {dataClavienDindo.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Tendencia Mensual */}
          <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="text-sm font-bold text-slate-700 mb-1">Tendencia de Complicaciones</h3>
            <p className="text-[10px] text-slate-400 mb-6">Evolución mensual de la tasa frente al límite del 5%</p>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={dataTendenciaComplicaciones} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="mes" axisLine={false} tickLine={false} tick={{fontSize: 12}} />
                  <YAxis domain={[0, 6]} axisLine={false} tickLine={false} tick={{fontSize: 10}} />
                  <RechartsTooltip />
                  <Line type="monotone" dataKey={() => 5.0} stroke="#ef4444" strokeWidth={1} strokeDasharray="5 5" dot={false} name="Límite Máximo" />
                  <Line type="monotone" dataKey="tasa" stroke="#f59e0b" strokeWidth={3} dot={{ r: 5, fill: "#f59e0b", strokeWidth: 2, stroke: "#fff" }} name="Tasa Real" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Tabla Detallada */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-50 bg-amber-50/30 flex justify-between items-center">
            <h3 className="text-sm font-bold text-amber-800 flex items-center gap-2">
              <ClipboardList className="w-4 h-4" /> Bitácora de Eventos Quirúrgicos
            </h3>
            <button className="text-[10px] font-bold text-amber-600 bg-white px-3 py-1.5 rounded-lg border border-amber-200">Exportar Comité M&M</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="text-slate-500 border-b border-slate-100 uppercase tracking-wider font-semibold bg-slate-50/50">
                  <th className="px-6 py-4">ID Reporte</th>
                  <th className="px-6 py-4">Paciente</th>
                  <th className="px-6 py-4">Cirugía Realizada</th>
                  <th className="px-6 py-4">Tipo de Hallazgo</th>
                  <th className="px-6 py-4 text-center">Clavien-Dindo</th>
                  <th className="px-6 py-4 text-right">Estatus SAC</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {logComplicaciones.map((p, i) => (
                  <tr key={i} className="hover:bg-slate-50 transition-colors text-slate-600">
                    <td className="px-6 py-4 font-bold">{p.id}</td>
                    <td className="px-6 py-4 font-medium text-slate-800">{p.paciente}</td>
                    <td className="px-6 py-4 text-slate-500">{p.cirugia}</td>
                    <td className="px-6 py-4 font-medium text-amber-600">{p.tipo}</td>
                    <td className="px-6 py-4 text-center">
                      <span className="bg-slate-100 px-2 py-1 rounded-md font-bold text-[10px]">{p.severidad}</span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className={`px-2 py-1 rounded-md font-bold text-[10px] ${
                        p.estado === 'Auditado' ? 'text-emerald-600 bg-emerald-50' : 'text-amber-600 bg-amber-50'
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