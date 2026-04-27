"use client";

import Link from "next/link";
import { ArrowLeft, Calendar, Search, RefreshCw, Target, AlertTriangle, CheckCircle2, Scissors, Activity } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, LineChart, Line, Cell } from "recharts";

// Datos: Causas de Reoperación
const dataCausasReoperacion = [
  { name: 'Hemorragia / Sangrado', valor: 40, color: '#0ea5e9' },
  { name: 'Infección Profunda', valor: 30, color: '#3b82f6' },
  { name: 'Falla Técnica / Sutura', valor: 20, color: '#6366f1' },
  { name: 'Obstrucción Intestinal', valor: 10, color: '#94a3b8' },
];

// Datos: Tendencia Mensual de Tasa de Reoperación
const dataTendenciaReoperacion = [
  { mes: 'Ene', tasa: 4.2 },
  { mes: 'Feb', tasa: 3.8 },
  { mes: 'Mar', tasa: 4.5 },
  { mes: 'Abr', tasa: 2.1 },
  { mes: 'May', tasa: 1.8 },
  { mes: 'Jun', tasa: 1.5 },
];

// Registro de Casos de Reintervención
const logReoperaciones = [
  { id: "RE-2026-012", paciente: "Julian Castro", procedimientoInicial: "Gastrostomía", causa: "Desplazamiento de sonda", intervalo: "12 horas", estado: "Auditado" },
  { id: "RE-2026-015", paciente: "Valentina Meza", procedimientoInicial: "Apendicectomía Lap.", causa: "Absceso residual", intervalo: "5 días", estado: "Auditado" },
  { id: "RE-2026-022", paciente: "Mateo Ospina", procedimientoInicial: "Cierre de Colostomía", causa: "Obstrucción mecánica", intervalo: "48 horas", estado: "En Revisión" },
];

export default function ReoperacionNoPlaneadaDashboard() {
  
  // Lógica de cumplimiento gerencial (Meta < 5%)
  const metaTasa = 5.0;
  const tasaActual = 1.5;
  
  // Regla institucional: Tope del 100% para indicadores de cumplimiento
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
            <h1 className="text-2xl font-bold text-[#324D6D] tracking-tight">% Reoperación No Planeada</h1>
            <p className="text-sm text-slate-500">Unidad de Cirugía Pediátrica • Excelencia Clínica • Meta &lt; 5%</p>
          </div>
        </div>

        {/* KPIs Estratégicos */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between border-l-4 border-l-sky-500">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Cirugías</p>
              <p className="text-3xl font-bold text-slate-800">324</p>
            </div>
            <Scissors className="w-8 h-8 text-sky-500 opacity-20" />
          </div>
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between border-l-4 border-l-emerald-500">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Tasa Actual</p>
              <p className="text-3xl font-bold text-emerald-600">{tasaActual}%</p>
            </div>
            <RefreshCw className="w-8 h-8 text-emerald-500 opacity-20" />
          </div>
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between border-l-4 border-l-slate-400">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Meta (Máxima)</p>
              <p className="text-3xl font-bold text-slate-800">&lt; {metaTasa}%</p>
            </div>
            <Target className="w-8 h-8 text-slate-400 opacity-20" />
          </div>
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between border-l-4 border-l-indigo-500">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Cumplimiento</p>
              <p className="text-3xl font-bold text-indigo-600">{cumplimientoMostrado}%</p>
            </div>
            <CheckCircle2 className="w-8 h-8 text-indigo-500 opacity-20" />
          </div>
        </div>

        {/* Gráficas */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          
          {/* Gráfico de Barras: Causas */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="text-sm font-bold text-slate-700 mb-1">Causas de Reintervención</h3>
            <p className="text-[10px] text-slate-400 mb-6">Distribución de motivos para el regreso a quirófano</p>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dataCausasReoperacion} layout="vertical" margin={{ left: -10, right: 30 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                  <XAxis type="number" hide />
                  <YAxis dataKey="name" type="category" tick={{fontSize: 10, fontWeight: 600}} axisLine={false} tickLine={false} width={110} />
                  <RechartsTooltip cursor={{fill: '#f8fafc'}} />
                  <Bar dataKey="valor" radius={[0, 4, 4, 0]} barSize={25}>
                    {dataCausasReoperacion.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Gráfico de Línea: Tendencia */}
          <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="text-sm font-bold text-slate-700 mb-1">Tendencia de Reoperación</h3>
            <p className="text-[10px] text-slate-400 mb-6">Evolución mensual frente al umbral máximo de seguridad (5%)</p>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={dataTendenciaReoperacion} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="mes" axisLine={false} tickLine={false} tick={{fontSize: 12}} />
                  <YAxis domain={[0, 6]} axisLine={false} tickLine={false} tick={{fontSize: 10}} />
                  <RechartsTooltip />
                  <Line type="monotone" dataKey={() => 5.0} stroke="#ef4444" strokeWidth={1} strokeDasharray="5 5" dot={false} name="Límite Máximo" />
                  <Line type="monotone" dataKey="tasa" stroke="#0ea5e9" strokeWidth={3} dot={{ r: 5, fill: "#0ea5e9", strokeWidth: 2, stroke: "#fff" }} name="Tasa Real" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Tabla Detallada */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-50 bg-sky-50/30 flex justify-between items-center">
            <h3 className="text-sm font-bold text-sky-800 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" /> Registro de Reintervenciones No Planeadas
            </h3>
            <button className="text-[10px] font-bold text-sky-600 bg-white px-3 py-1.5 rounded-lg border border-sky-200">Exportar Casos M&M</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="text-slate-500 border-b border-slate-100 uppercase tracking-wider font-semibold bg-slate-50/50">
                  <th className="px-6 py-4">ID Caso</th>
                  <th className="px-6 py-4">Paciente</th>
                  <th className="px-6 py-4">Procedimiento Inicial</th>
                  <th className="px-6 py-4">Motivo de Reoperación</th>
                  <th className="px-6 py-4 text-center">Intervalo (h/d)</th>
                  <th className="px-6 py-4 text-right">Estatus Auditoría</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {logReoperaciones.map((p, i) => (
                  <tr key={i} className="hover:bg-slate-50 transition-colors text-slate-600">
                    <td className="px-6 py-4 font-bold">{p.id}</td>
                    <td className="px-6 py-4 font-medium text-slate-800">{p.paciente}</td>
                    <td className="px-6 py-4 font-medium text-slate-500">{p.procedimientoInicial}</td>
                    <td className="px-6 py-4 font-bold text-rose-600">{p.causa}</td>
                    <td className="px-6 py-4 text-center font-mono">{p.intervalo}</td>
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