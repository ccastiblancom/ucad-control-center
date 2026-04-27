"use client";

import Link from "next/link";
import { ArrowLeft, Calendar, Search, Heart, Target, Star, CheckCircle2, Activity, UserCheck } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, LineChart, Line, Cell } from "recharts";

// Datos: Promedio de las Dimensiones Post-Cirugía
const dataDimensiones = [
  { name: 'Emocional', valor: 82, color: '#2563eb' }, // Ítem más alto actual
  { name: 'Social', valor: 78, color: '#3b82f6' },
  { name: 'Físico', valor: 70, color: '#60a5fa' },
  { name: 'Escolar', valor: 65, color: '#93c5fd' },
];

// Datos: Tendencia Mensual del Ítem Más Alto
const dataTendenciaAlta = [
  { mes: 'Ene', score: 72 },
  { mes: 'Feb', score: 74 },
  { mes: 'Mar', score: 76 },
  { mes: 'Abr', score: 78 },
  { mes: 'May', score: 80 },
  { mes: 'Jun', score: 82 },
];

// Registro Individual: Enfoque en Fortalezas
const logCalidadVida = [
  { id: "QOL-2026-301", paciente: "Julian Castro", cirugia: "Gastrostomía", fortaleza: "Emocional", puntaje: 85, estado: "Óptimo" },
  { id: "QOL-2026-305", paciente: "Valentina Meza", cirugia: "Apendicectomía", fortaleza: "Físico", puntaje: 88, estado: "Óptimo" },
  { id: "QOL-2026-308", paciente: "Mateo Ospina", cirugia: "Herniorrafia", fortaleza: "Social", puntaje: 72, estado: "En Seguimiento" },
  { id: "QOL-2026-312", paciente: "Luciana Rivas", cirugia: "Resección Tumor", fortaleza: "Emocional", puntaje: 76, estado: "En Meta" },
];

export default function CalidadVidaAltaDashboard() {
  
  // Lógica de cumplimiento gerencial
  const metaPuntaje = 75;
  const puntajeMasAlto = 82; // Basado en el área Emocional
  
  // Regla institucional: Tope del 100% para indicadores de cumplimiento
  const calculoCumplimiento = Math.round((puntajeMasAlto / metaPuntaje) * 100);
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
            <h1 className="text-2xl font-bold text-[#324D6D] tracking-tight">Evaluación Positiva de Calidad de Vida</h1>
            <p className="text-sm text-slate-500">Unidad de Cirugía Pediátrica • Integridad y Humanización • PEDSqL</p>
          </div>
        </div>

        {/* Filtros */}
        <div className="flex flex-wrap items-center gap-4 mb-8 text-sm">
          <div className="bg-white/90 backdrop-blur-sm px-3 py-2 rounded-xl border border-slate-200 shadow-sm flex items-center gap-2">
            <Calendar className="w-4 h-4 text-slate-400" />
            <select className="bg-transparent outline-none cursor-pointer font-medium"><option>Trimestre Actual</option></select>
          </div>
          <div className="bg-white/90 backdrop-blur-sm px-3 py-2 rounded-xl border border-slate-200 shadow-sm flex-1 max-w-xs flex items-center gap-2">
            <Search className="w-4 h-4 text-slate-400" />
            <input type="text" placeholder="Buscar paciente..." className="bg-transparent outline-none w-full" />
          </div>
        </div>

        {/* KPIs Estratégicos */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between border-l-4 border-l-blue-500">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Encuestas PEDSqL</p>
              <p className="text-3xl font-bold text-slate-800">156</p>
            </div>
            <UserCheck className="w-8 h-8 text-blue-500 opacity-20" />
          </div>
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between border-l-4 border-l-emerald-500">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Ítem Más Alto</p>
              <div className="flex items-baseline gap-1">
                <p className="text-3xl font-bold text-emerald-600">{puntajeMasAlto}</p>
                <p className="text-[10px] font-bold text-slate-400">Pts</p>
              </div>
            </div>
            <Star className="w-8 h-8 text-emerald-500 opacity-20" />
          </div>
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between border-l-4 border-l-slate-400">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Meta Institucional</p>
              <div className="flex items-baseline gap-1">
                <p className="text-3xl font-bold text-slate-800">&gt; {metaPuntaje}</p>
                <p className="text-[10px] font-bold text-slate-400">Pts</p>
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
          
          {/* Gráfico de Barras: Dimensiones */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="text-sm font-bold text-slate-700 mb-1">Mapeo de Fortalezas (Promedio)</h3>
            <p className="text-[10px] text-slate-400 mb-6">Identificación de la dimensión con mayor puntaje (PEDSqL)</p>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dataDimensiones} layout="vertical" margin={{ left: -10, right: 30 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                  <XAxis type="number" domain={[0, 100]} hide />
                  <YAxis dataKey="name" type="category" tick={{fontSize: 10, fontWeight: 600}} axisLine={false} tickLine={false} width={80} />
                  <RechartsTooltip cursor={{fill: '#f8fafc'}} formatter={(value) => [`${value} Pts`, 'Puntaje']} />
                  <Bar dataKey="valor" radius={[0, 4, 4, 0]} barSize={25}>
                    {dataDimensiones.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Gráfico de Línea: Tendencia */}
          <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="text-sm font-bold text-slate-700 mb-1">Tendencia del Bienestar Superior</h3>
            <p className="text-[10px] text-slate-400 mb-6">Evolución del puntaje más alto frente a la meta de 75 puntos</p>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={dataTendenciaAlta} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="mes" axisLine={false} tickLine={false} tick={{fontSize: 12}} />
                  <YAxis domain={[50, 100]} axisLine={false} tickLine={false} tick={{fontSize: 10}} />
                  <RechartsTooltip />
                  <Line type="monotone" dataKey={() => 75} stroke="#ef4444" strokeWidth={1} strokeDasharray="5 5" dot={false} name="Meta Mínima (75)" />
                  <Line type="monotone" dataKey="score" stroke="#2563eb" strokeWidth={3} dot={{ r: 5, fill: "#2563eb", strokeWidth: 2, stroke: "#fff" }} name="Puntaje Máximo" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Tabla Detallada */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-50 bg-blue-50/30 flex justify-between items-center">
            <h3 className="text-sm font-bold text-blue-800 flex items-center gap-2">
              <Heart className="w-4 h-4" /> Bitácora de Humanización y Seguimiento
            </h3>
            <button className="text-[10px] font-bold text-blue-600 bg-white px-3 py-1.5 rounded-lg border border-blue-200">Exportar Resultados</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="text-slate-500 border-b border-slate-100 uppercase tracking-wider font-semibold bg-slate-50/50">
                  <th className="px-6 py-4">ID Evaluación</th>
                  <th className="px-6 py-4">Paciente</th>
                  <th className="px-6 py-4">Procedimiento Base</th>
                  <th className="px-6 py-4 text-center">Dimensión Fortaleza</th>
                  <th className="px-6 py-4 text-center">Puntaje Obtenido</th>
                  <th className="px-6 py-4 text-right">Estatus Clínico</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {logCalidadVida.map((p, i) => (
                  <tr key={i} className="hover:bg-slate-50 transition-colors text-slate-600">
                    <td className="px-6 py-4 font-bold">{p.id}</td>
                    <td className="px-6 py-4 font-medium text-slate-800">{p.paciente}</td>
                    <td className="px-6 py-4 text-slate-500">{p.cirugia}</td>
                    <td className="px-6 py-4 text-center">
                      <span className="bg-blue-50 text-blue-600 px-2 py-1 rounded-md font-bold text-[10px]">{p.fortaleza}</span>
                    </td>
                    <td className="px-6 py-4 text-center font-bold text-slate-700">{p.puntaje}</td>
                    <td className="px-6 py-4 text-right">
                      <span className={`px-2 py-1 rounded-md font-bold text-[10px] ${
                        p.estado === 'Óptimo' ? 'text-emerald-600 bg-emerald-50' : 
                        p.estado === 'En Meta' ? 'text-blue-600 bg-blue-50' : 
                        'text-amber-600 bg-amber-50'
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