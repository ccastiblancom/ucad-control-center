"use client";

import Link from "next/link";
import { ArrowLeft, Calendar, Search, Presentation, Target, Globe, CheckCircle2, Mic2, Users } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, LineChart, Line, Cell, PieChart, Pie } from "recharts";

// Datos: Alcance de las participaciones
const dataAlcance = [
  { name: 'Internacional', valor: 3, color: '#2563eb' },
  { name: 'Nacional', valor: 5, color: '#60a5fa' },
];

// Datos: Tendencia Mensual de Ponencias
const dataTendenciaCongresos = [
  { mes: 'Ene', valor: 0 },
  { mes: 'Feb', valor: 1 },
  { mes: 'Mar', valor: 2 },
  { mes: 'Abr', valor: 2 },
  { mes: 'May', valor: 1 },
  { mes: 'Jun', valor: 2 },
];

// Registro de Ponencias y Exposiciones
const logCongresos = [
  { id: "CONG-2026-01", titulo: "Innovación en Cirugía Neonatal Mínimamente Invasiva", congreso: "Congreso Mundial de Cirugía Pediátrica", lugar: "Praga, República Checa", expositor: "Dr. Carlos Mesa", fecha: "12/03/2026" },
  { id: "CONG-2026-02", titulo: "Manejo del Dolor Postoperatorio: Protocolos UCAD", congreso: "Congreso Nacional de Pediatría", lugar: "Cartagena, Colombia", expositor: "Dra. Ana López", fecha: "20/04/2026" },
  { id: "CONG-2026-03", titulo: "Reconstrucción Esofágica en Pacientes Complejos", congreso: "Ibero-American Pediatric Surgery Forum", lugar: "Madrid, España", expositor: "Dr. Luis Pérez", fecha: "15/05/2026" },
  { id: "CONG-2026-04", titulo: "Seguridad Quirúrgica y Tasa ISO < 1%", congreso: "Simposio Regional de Calidad en Salud", lugar: "Bogotá, Colombia", expositor: "Enf. Martha Ruiz", fecha: "02/06/2026" },
];

export default function ParticipacionCongresosDashboard() {
  
  // Lógica de Gestión PMO
  const metaAnual = 6;
  const participacionesActuales = 8;
  
  // Regla institucional: Tope del 100% para indicadores de cumplimiento
  const cumplimientoReal = Math.round((participacionesActuales / metaAnual) * 100);
  const cumplimientoMostrado = cumplimientoReal > 100 ? 100 : cumplimientoReal;

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
            <h1 className="text-2xl font-bold text-[#324D6D] tracking-tight">Participaciones en Congresos (Expositores)</h1>
            <p className="text-sm text-slate-500">Unidad de Cirugía Pediátrica • Investigación y Docencia • Impacto Académico</p>
          </div>
        </div>

        {/* KPIs Estratégicos */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between border-l-4 border-l-blue-600">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Ponencias (Año)</p>
              <p className="text-3xl font-bold text-slate-800">{participacionesActuales}</p>
            </div>
            <Mic2 className="w-8 h-8 text-blue-600 opacity-20" />
          </div>
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between border-l-4 border-l-indigo-500">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Alcance Internacional</p>
              <p className="text-3xl font-bold text-indigo-600">3</p>
            </div>
            <Globe className="w-8 h-8 text-indigo-500 opacity-20" />
          </div>
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between border-l-4 border-l-slate-400">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Meta Anual</p>
              <p className="text-3xl font-bold text-slate-800">{metaAnual}</p>
            </div>
            <Target className="w-8 h-8 text-slate-400 opacity-20" />
          </div>
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between border-l-4 border-l-emerald-500">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Cumplimiento Auditado</p>
              <p className="text-3xl font-bold text-emerald-600">{cumplimientoMostrado}%</p>
            </div>
            <CheckCircle2 className="w-8 h-8 text-emerald-600 opacity-20" />
          </div>
        </div>

        {/* Gráficas */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          
          {/* Distribución de Alcance */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="text-sm font-bold text-slate-700 mb-1">Distribución Geográfica</h3>
            <p className="text-[10px] text-slate-400 mb-6">Proporción de participaciones nacionales vs. internacionales</p>
            <div className="h-64 w-full relative flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={dataAlcance} innerRadius={60} outerRadius={85} paddingAngle={5} dataKey="valor" stroke="none">
                    {dataAlcance.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <RechartsTooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute flex flex-col items-center">
                <span className="text-3xl font-bold text-blue-600">{participacionesActuales}</span>
                <span className="text-[9px] text-slate-500 font-bold uppercase tracking-tighter">Eventos</span>
              </div>
            </div>
          </div>

          {/* Tendencia Mensual */}
          <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="text-sm font-bold text-slate-700 mb-1">Tendencia Mensual de Ponencias</h3>
            <p className="text-[10px] text-slate-400 mb-6">Volumen de presentaciones realizadas por el equipo UCAD</p>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dataTendenciaCongresos} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="mes" axisLine={false} tickLine={false} tick={{fontSize: 12}} />
                  <YAxis domain={[0, 4]} axisLine={false} tickLine={false} tick={{fontSize: 10}} />
                  <RechartsTooltip cursor={{fill: '#f8fafc'}} />
                  <Bar dataKey="valor" name="Ponencias" fill="#2563eb" radius={[4, 4, 0, 0]} barSize={40} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Tabla Detallada: Registro de Congresos */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-50 bg-blue-50/30 flex justify-between items-center">
            <h3 className="text-sm font-bold text-blue-800 flex items-center gap-2">
              <Users className="w-4 h-4" /> Bitácora de Participación Académica
            </h3>
            <button className="text-[10px] font-bold text-blue-600 bg-white px-3 py-1.5 rounded-lg border border-blue-200">Exportar Certificados</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="text-slate-500 border-b border-slate-100 uppercase tracking-wider font-semibold bg-slate-50/50">
                  <th className="px-6 py-4 w-1/3">Título de la Ponencia</th>
                  <th className="px-6 py-4">Evento / Congreso</th>
                  <th className="px-6 py-4">Ubicación</th>
                  <th className="px-6 py-4 text-center">Expositor</th>
                  <th className="px-6 py-4 text-right">Fecha</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {logCongresos.map((p, i) => (
                  <tr key={i} className="hover:bg-slate-50 transition-colors text-slate-600">
                    <td className="px-6 py-4 font-bold text-slate-700 leading-relaxed">{p.titulo}</td>
                    <td className="px-6 py-4 font-medium text-blue-600">{p.congreso}</td>
                    <td className="px-6 py-4 text-slate-500 italic">{p.lugar}</td>
                    <td className="px-6 py-4 text-center font-semibold text-slate-700">{p.expositor}</td>
                    <td className="px-6 py-4 text-right font-mono text-slate-400">{p.fecha}</td>
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