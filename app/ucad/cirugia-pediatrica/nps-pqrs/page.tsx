"use client";

import Link from "next/link";
import { ArrowLeft, Calendar, Search, MessageSquare, Target, ThumbsUp, AlertCircle, CheckCircle2, HeartHandshake } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, LineChart, Line, Cell, PieChart, Pie } from "recharts";

// Datos: Composición del NPS (Promotores, Neutros, Detractores)
const dataNpsComposicion = [
  { name: 'Promotores (9-10)', valor: 85, color: '#10b981' },
  { name: 'Neutros (7-8)', valor: 8, color: '#f59e0b' },
  { name: 'Detractores (0-6)', valor: 7, color: '#ef4444' },
];

// Datos: Tendencia Mensual NPS
const dataTendenciaNPS = [
  { mes: 'Ene', nps: 72 },
  { mes: 'Feb', nps: 74 },
  { mes: 'Mar', nps: 71 },
  { mes: 'Abr', nps: 75 },
  { mes: 'May', nps: 76 },
  { mes: 'Jun', nps: 78 }, // NPS = % Promotores - % Detractores
];

// Registro de PQRS (Peticiones, Quejas, Reclamos, Sugerencias, Felicitaciones)
const logPQRS = [
  { id: "PQRS-2026-801", tipo: "Felicitación", paciente: "Familia Castro", detalle: "Excelente trato de la enfermera jefe de turno.", estado: "Cerrado", tiempoRespuesta: "24h" },
  { id: "PQRS-2026-802", tipo: "Queja", paciente: "Familia Meza", detalle: "Demora de 2 horas en la sala de recuperación post anestesia.", estado: "En Gestión", tiempoRespuesta: "Pendiente" },
  { id: "PQRS-2026-803", tipo: "Sugerencia", paciente: "Familia Ospina", detalle: "Mejorar la señalización en la sala de espera quirúrgica.", estado: "Cerrado", tiempoRespuesta: "48h" },
  { id: "PQRS-2026-804", tipo: "Reclamo", paciente: "Familia Rivas", detalle: "Cobro doble en facturación de materiales de osteosíntesis.", estado: "Resuelto", tiempoRespuesta: "72h" },
];

export default function NpsPqrsDashboard() {
  
  // Lógica de Gestión Gerencial
  const npsActual = 78;
  const metaNps = 70;
  
  // Regla institucional: Tope del 100% para indicadores de cumplimiento en reportes clínicos/administrativos
  const calculoCumplimiento = Math.round((npsActual / metaNps) * 100);
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
            <h1 className="text-2xl font-bold text-[#324D6D] tracking-tight">Lealtad del Paciente (NPS) y PQRS</h1>
            <p className="text-sm text-slate-500">Unidad de Cirugía Pediátrica • Integridad y Humanización • Voz del Cliente</p>
          </div>
        </div>

        {/* Filtros */}
        <div className="flex flex-wrap items-center gap-4 mb-8 text-sm">
          <div className="bg-white/90 backdrop-blur-sm px-3 py-2 rounded-xl border border-slate-200 shadow-sm flex items-center gap-2">
            <Calendar className="w-4 h-4 text-slate-400" />
            <select className="bg-transparent outline-none cursor-pointer font-medium"><option>Mes Actual</option></select>
          </div>
          <div className="bg-white/90 backdrop-blur-sm px-3 py-2 rounded-xl border border-slate-200 shadow-sm flex-1 max-w-xs flex items-center gap-2">
            <Search className="w-4 h-4 text-slate-400" />
            <input type="text" placeholder="Buscar ticket de PQRS..." className="bg-transparent outline-none w-full" />
          </div>
        </div>

        {/* KPIs Estratégicos */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between border-l-4 border-l-cyan-600">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Net Promoter Score</p>
              <p className="text-3xl font-bold text-slate-800">{npsActual}</p>
            </div>
            <ThumbsUp className="w-8 h-8 text-cyan-600 opacity-20" />
          </div>
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between border-l-4 border-l-slate-400">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Meta Institucional</p>
              <p className="text-3xl font-bold text-slate-800">&gt; {metaNps}</p>
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
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between border-l-4 border-l-rose-500">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">PQRS Abiertas</p>
              <p className="text-3xl font-bold text-rose-600">1</p>
            </div>
            <AlertCircle className="w-8 h-8 text-rose-500 opacity-20" />
          </div>
        </div>

        {/* Gráficas */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          
          {/* Gráfico de Torta: Composición NPS */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="text-sm font-bold text-slate-700 mb-1">Composición de Lealtad</h3>
            <p className="text-[10px] text-slate-400 mb-6">Distribución de encuestados según su nivel de recomendación</p>
            <div className="h-64 w-full relative flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={dataNpsComposicion} innerRadius={60} outerRadius={85} paddingAngle={5} dataKey="valor" stroke="none">
                    {dataNpsComposicion.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <RechartsTooltip formatter={(value) => [`${value}%`, 'Pacientes']} />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute flex flex-col items-center">
                <span className="text-3xl font-bold text-[#324D6D]">{npsActual}</span>
                <span className="text-[9px] text-slate-500 font-bold uppercase tracking-tighter">Score Actual</span>
              </div>
            </div>
          </div>

          {/* Gráfico de Línea: Tendencia NPS */}
          <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="text-sm font-bold text-slate-700 mb-1">Evolución Histórica del NPS</h3>
            <p className="text-[10px] text-slate-400 mb-6">Tendencia del Net Promoter Score frente al estándar de clase mundial (&gt;70)</p>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={dataTendenciaNPS} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="mes" axisLine={false} tickLine={false} tick={{fontSize: 12}} />
                  <YAxis domain={[50, 100]} axisLine={false} tickLine={false} tick={{fontSize: 10}} />
                  <RechartsTooltip />
                  <Line type="monotone" dataKey={() => 70} stroke="#ef4444" strokeWidth={1} strokeDasharray="5 5" dot={false} name="Meta Mínima (70)" />
                  <Line type="monotone" dataKey="nps" stroke="#0891b2" strokeWidth={3} dot={{ r: 5, fill: "#0891b2", strokeWidth: 2, stroke: "#fff" }} name="NPS Real" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Tabla de PQRS */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-50 bg-cyan-50/30 flex justify-between items-center">
            <h3 className="text-sm font-bold text-cyan-800 flex items-center gap-2">
              <MessageSquare className="w-4 h-4" /> Bitácora de Gestión SAC (PQRS)
            </h3>
            <button className="text-[10px] font-bold text-cyan-600 bg-white px-3 py-1.5 rounded-lg border border-cyan-200">Exportar Gestión</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="text-slate-500 border-b border-slate-100 uppercase tracking-wider font-semibold bg-slate-50/50">
                  <th className="px-6 py-4">ID Ticket</th>
                  <th className="px-6 py-4 text-center">Tipo</th>
                  <th className="px-6 py-4">Usuario / Familia</th>
                  <th className="px-6 py-4 w-1/3">Detalle del Caso</th>
                  <th className="px-6 py-4 text-center">T. Respuesta</th>
                  <th className="px-6 py-4 text-right">Estatus</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {logPQRS.map((p, i) => (
                  <tr key={i} className="hover:bg-slate-50 transition-colors text-slate-600">
                    <td className="px-6 py-4 font-bold">{p.id}</td>
                    <td className="px-6 py-4 text-center">
                      <span className={`px-2 py-1 rounded-md font-bold text-[9px] uppercase ${
                        p.tipo === 'Felicitación' ? 'text-emerald-600 bg-emerald-50' : 
                        p.tipo === 'Queja' || p.tipo === 'Reclamo' ? 'text-rose-600 bg-rose-50' : 
                        'text-blue-600 bg-blue-50'
                      }`}>
                        {p.tipo}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-medium text-slate-800">{p.paciente}</td>
                    <td className="px-6 py-4 italic text-slate-500">{p.detalle}</td>
                    <td className="px-6 py-4 text-center font-mono text-slate-400">{p.tiempoRespuesta}</td>
                    <td className="px-6 py-4 text-right">
                      <span className={`font-bold ${
                        p.estado === 'Cerrado' || p.estado === 'Resuelto' ? 'text-slate-400' : 'text-amber-600'
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