"use client";

import Link from "next/link";
import { ArrowLeft, Calendar, Search, FileText, ShieldCheck, AlertCircle, CheckCircle2, Target, ClipboardList } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Cell, PieChart, Pie } from "recharts";

// Datos: Cumplimiento por Especialidad Quirúrgica
const dataPorEspecialidad = [
  { name: 'Cirugía General', valor: 100, color: '#2563eb' },
  { name: 'Ortopedia', valor: 98, color: '#3b82f6' },
  { name: 'Urología', valor: 96, color: '#60a5fa' },
  { name: 'Neurocirugía', valor: 100, color: '#93c5fd' },
];

// Datos: Errores más comunes en auditoría
const dataErrores = [
  { name: 'Falta Firma Testigo', valor: 12, color: '#f43f5e' },
  { name: 'Fecha Incorrecta', valor: 8, color: '#fb923c' },
  { name: 'Letra Legible', valor: 5, color: '#f59e0b' },
  { name: 'Enmendaduras', valor: 3, color: '#94a3b8' },
];

// Log de Auditoría Diaria
const logAuditoria = [
  { id: "CONS-2026-501", paciente: "Mateo Bernal", especialidad: "Cirugía General", auditoria: "Correcto", fecha: "25/04/2026", observacion: "Diligenciado en consulta previa" },
  { id: "CONS-2026-505", paciente: "Luciana Rivas", especialidad: "Ortopedia", auditoria: "Incompleto", fecha: "25/04/2026", observacion: "Falta firma de cirujano" },
  { id: "CONS-2026-510", paciente: "Juan Diego Mora", especialidad: "Urología", auditoria: "Correcto", fecha: "26/04/2026", observacion: "Sin observaciones" },
];

export default function AseguramientoConsentimientosDashboard() {
  
  // Lógica de cumplimiento: Meta 100%
  const cumplimientoReal = 98.5;
  const cumplimientoAuditado = cumplimientoReal > 100 ? 100 : cumplimientoReal;

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
            <h1 className="text-2xl font-bold text-[#324D6D] tracking-tight">Aseguramiento de Consentimientos Informados</h1>
            <p className="text-sm text-slate-500">Unidad de Cirugía Pediátrica • Seguridad y Marco Legal • Meta 100%</p>
          </div>
        </div>

        {/* KPIs Estratégicos */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between border-l-4 border-l-indigo-600">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Cirugías Auditadas</p>
              <p className="text-3xl font-bold text-slate-800">452</p>
            </div>
            <ClipboardList className="w-8 h-8 text-indigo-600 opacity-20" />
          </div>
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between border-l-4 border-l-emerald-500">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Cumplimiento Actual</p>
              <p className="text-3xl font-bold text-emerald-600">{cumplimientoAuditado}%</p>
            </div>
            <ShieldCheck className="w-8 h-8 text-emerald-600 opacity-20" />
          </div>
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between border-l-4 border-l-slate-400">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Meta Institucional</p>
              <p className="text-3xl font-bold text-slate-800">100%</p>
            </div>
            <Target className="w-8 h-8 text-slate-400 opacity-20" />
          </div>
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between border-l-4 border-l-rose-500">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Hallazgos Críticos</p>
              <p className="text-3xl font-bold text-rose-600">2</p>
            </div>
            <AlertCircle className="w-8 h-8 text-rose-600 opacity-20" />
          </div>
        </div>

        {/* Gráficas */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          
          {/* Cumplimiento por Especialidad */}
          <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="text-sm font-bold text-slate-700 mb-6">Cumplimiento por Especialidad Quirúrgica</h3>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dataPorEspecialidad} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fontWeight: 600}} />
                  <YAxis domain={[0, 100]} axisLine={false} tickLine={false} tick={{fontSize: 10}} />
                  <RechartsTooltip cursor={{fill: '#f8fafc'}} formatter={(value) => [`${value}%`, 'Cumplimiento']} />
                  <Bar dataKey="valor" radius={[6, 6, 0, 0]} barSize={50}>
                    {dataPorEspecialidad.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Errores frecuentes */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="text-sm font-bold text-slate-700 mb-1">Motivos de Inconsistencia</h3>
            <p className="text-[10px] text-slate-400 mb-6">Hallazgos más comunes en auditoría de historias clínicas</p>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dataErrores} layout="vertical" margin={{ left: -10, right: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                  <XAxis type="number" hide />
                  <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 600}} width={110} />
                  <RechartsTooltip />
                  <Bar dataKey="valor" radius={[0, 4, 4, 0]} barSize={20}>
                    {dataErrores.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Tabla de Auditoría */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-50 bg-indigo-50/30 flex justify-between items-center">
            <h3 className="text-sm font-bold text-indigo-800 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" /> Bitácora de Validación Pre-Quirúrgica
            </h3>
            <button className="text-[10px] font-bold text-indigo-600 bg-white px-3 py-1.5 rounded-lg border border-indigo-200">Nueva Auditoría</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="text-slate-500 border-b border-slate-100 uppercase tracking-wider font-semibold bg-slate-50/50">
                  <th className="px-6 py-4">ID Caso</th>
                  <th className="px-6 py-4">Paciente</th>
                  <th className="px-6 py-4">Especialidad</th>
                  <th className="px-6 py-4 text-center">Estatus Auditoría</th>
                  <th className="px-6 py-4">Observaciones del Hallazgo</th>
                  <th className="px-6 py-4 text-right">Fecha</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {logAuditoria.map((p, i) => (
                  <tr key={i} className="hover:bg-slate-50 transition-colors text-slate-600">
                    <td className="px-6 py-4 font-bold">{p.id}</td>
                    <td className="px-6 py-4 font-medium text-slate-800">{p.paciente}</td>
                    <td className="px-6 py-4">{p.especialidad}</td>
                    <td className="px-6 py-4 text-center">
                      <span className={`px-2 py-1 rounded-md font-bold text-[10px] ${
                        p.auditoria === 'Correcto' ? 'text-emerald-600 bg-emerald-50' : 'text-rose-600 bg-rose-50'
                      }`}>
                        {p.auditoria}
                      </span>
                    </td>
                    <td className="px-6 py-4 italic text-slate-500">{p.observacion}</td>
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