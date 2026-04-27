"use client";

import Link from "next/link";
import { ArrowLeft, Calendar, Search, ClipboardList, Target, CheckCircle2, Users, BarChart3, ShieldCheck } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, LineChart, Line, Cell } from "recharts";

// Datos: Cumplimiento por Grupo Etario
const dataGruposEtarios = [
  { name: 'Toddlers (2-4)', valor: 92, color: '#6366f1' },
  { name: 'Child (5-7)', valor: 98, color: '#818cf8' },
  { name: 'Young Child (8-12)', valor: 95, color: '#a5b4fc' },
  { name: 'Adolescent (13-18)', valor: 94, color: '#c7d2fe' },
];

// Datos: Tendencia Mensual de Aplicación
const dataTendenciaPedsql = [
  { mes: 'Ene', tasa: 85 },
  { mes: 'Feb', tasa: 88 },
  { mes: 'Mar', tasa: 90 },
  { mes: 'Abr', tasa: 93 },
  { mes: 'May', tasa: 96 },
  { mes: 'Jun', tasa: 97.2 },
];

// Registro de Auditoría PEDSqL
const logAuditoriaPedsql = [
  { id: "QOL-AUD-001", paciente: "Julian Castro", edad: "6 años", modulo: "Core Pediatric", auditoria: "Correcto", responsable: "Psic. Ana María" },
  { id: "QOL-AUD-005", paciente: "Valentina Meza", edad: "4 años", modulo: "Toddler", auditoria: "Correcto", responsable: "Psic. Ana María" },
  { id: "QOL-AUD-008", paciente: "Mateo Ospina", edad: "12 años", modulo: "Young Child", auditoria: "Pendiente Firma", responsable: "Dr. Roberto Silva" },
  { id: "QOL-AUD-012", paciente: "Luciana Rivas", edad: "15 años", modulo: "Adolescent", auditoria: "Correcto", responsable: "Psic. Ana María" },
];

export default function CumplimientoPedsqlDashboard() {
  
  // Lógica de Gestión Gerencial
  const tasaActual = 97.2;
  const metaEstablecida = 95.0;
  
  // Regla institucional: Tope del 100% para indicadores de cumplimiento
  const calculoCumplimiento = Math.round((tasaActual / metaEstablecida) * 100);
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
            <h1 className="text-2xl font-bold text-[#324D6D] tracking-tight">Cumplimiento Escala PEDSqL</h1>
            <p className="text-sm text-slate-500">Unidad de Cirugía Pediátrica • Integridad y Humanización • Calidad de Vida</p>
          </div>
        </div>

        {/* KPIs Estratégicos */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between border-l-4 border-l-indigo-500">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Pacientes Elegibles</p>
              <p className="text-3xl font-bold text-slate-800">186</p>
            </div>
            <Users className="w-8 h-8 text-indigo-500 opacity-20" />
          </div>
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between border-l-4 border-l-emerald-500">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Tasa de Aplicación</p>
              <p className="text-3xl font-bold text-emerald-600">{tasaActual}%</p>
            </div>
            <ClipboardList className="w-8 h-8 text-emerald-500 opacity-20" />
          </div>
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between border-l-4 border-l-slate-400">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Meta Institucional</p>
              <p className="text-3xl font-bold text-slate-800">&gt; {metaEstablecida}%</p>
            </div>
            <Target className="w-8 h-8 text-slate-400 opacity-20" />
          </div>
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between border-l-4 border-l-blue-500">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Cumplimiento Auditado</p>
              <p className="text-3xl font-bold text-blue-600">{cumplimientoMostrado}%</p>
            </div>
            <ShieldCheck className="w-8 h-8 text-blue-600 opacity-20" />
          </div>
        </div>

        {/* Gráficas */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          
          {/* Cumplimiento por Grupos Etarios */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="text-sm font-bold text-slate-700 mb-1">Eficacia por Grupo Etario</h3>
            <p className="text-[10px] text-slate-400 mb-6">Porcentaje de aplicación correcta según la edad del paciente</p>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dataGruposEtarios} layout="vertical" margin={{ left: -10, right: 30 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                  <XAxis type="number" domain={[0, 100]} hide />
                  <YAxis dataKey="name" type="category" tick={{fontSize: 9, fontWeight: 700}} axisLine={false} tickLine={false} width={110} />
                  <RechartsTooltip cursor={{fill: '#f8fafc'}} formatter={(value) => [`${value}%`, 'Cumplimiento']} />
                  <Bar dataKey="valor" radius={[0, 4, 4, 0]} barSize={25}>
                    {dataGruposEtarios.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Tendencia Mensual */}
          <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="text-sm font-bold text-slate-700 mb-1">Tendencia de Aplicación PEDSqL</h3>
            <p className="text-[10px] text-slate-400 mb-6">Evolución mensual de la captura de datos de calidad de vida</p>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={dataTendenciaPedsql} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="mes" axisLine={false} tickLine={false} tick={{fontSize: 12}} />
                  <YAxis domain={[70, 100]} axisLine={false} tickLine={false} tick={{fontSize: 10}} />
                  <RechartsTooltip />
                  <Line type="monotone" dataKey="tasa" stroke="#6366f1" strokeWidth={3} dot={{ r: 5, fill: "#6366f1", strokeWidth: 2, stroke: "#fff" }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Tabla de Auditoría */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-50 bg-indigo-50/30 flex justify-between items-center">
            <h3 className="text-sm font-bold text-indigo-800 flex items-center gap-2">
              <BarChart3 className="w-4 h-4" /> Bitácora de Validación PEDSqL
            </h3>
            <button className="text-[10px] font-bold text-indigo-600 bg-white px-3 py-1.5 rounded-lg border border-indigo-200">Generar Informe Auditoría</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="text-slate-500 border-b border-slate-100 uppercase tracking-wider font-semibold bg-slate-50/50">
                  <th className="px-6 py-4">ID Auditoría</th>
                  <th className="px-6 py-4">Paciente</th>
                  <th className="px-6 py-4">Edad</th>
                  <th className="px-6 py-4">Módulo Aplicado</th>
                  <th className="px-6 py-4 text-center">Estatus</th>
                  <th className="px-6 py-4 text-right">Responsable</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {logAuditoriaPedsql.map((p, i) => (
                  <tr key={i} className="hover:bg-slate-50 transition-colors text-slate-600">
                    <td className="px-6 py-4 font-bold">{p.id}</td>
                    <td className="px-6 py-4 font-medium text-slate-800">{p.paciente}</td>
                    <td className="px-6 py-4 text-slate-500 font-mono">{p.edad}</td>
                    <td className="px-6 py-4 text-indigo-600 font-medium">{p.modulo}</td>
                    <td className="px-6 py-4 text-center">
                      <span className={`px-2 py-1 rounded-md font-bold text-[10px] ${
                        p.auditoria === 'Correcto' ? 'text-emerald-600 bg-emerald-50' : 'text-rose-600 bg-rose-50'
                      }`}>
                        {p.auditoria}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right italic text-slate-400">{p.responsable}</td>
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