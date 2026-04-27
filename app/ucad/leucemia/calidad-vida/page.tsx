"use client";

import Link from "next/link";
import { ArrowLeft, Calendar, Filter, Search, Heart, Target, ClipboardCheck, Activity, Brain } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, LineChart, Line, Cell, RadarChart, PolarGrid, PolarAngleAxis, Radar } from "recharts";

// Datos de Puntuación por Dimensiones PedsQL
const dataDimensionesVida = [
  { subject: 'Físico', A: 85, fullMark: 100 },
  { subject: 'Emocional', A: 72, fullMark: 100 },
  { subject: 'Social', A: 78, fullMark: 100 },
  { subject: 'Escolar', A: 65, fullMark: 100 },
];

// Tendencia Mensual de Puntuación Media de Calidad de Vida
const dataTendenciaVida = [
  { mes: 'Ene', score: 72 },
  { mes: 'Feb', score: 74 },
  { mes: 'Mar', score: 75 },
  { mes: 'Abr', score: 78 },
  { mes: 'May', score: 80 },
  { mes: 'Jun', score: 82 },
];

// Registro de Evaluaciones de Pacientes
const registroCalidadVida = [
  { id: "QoL-26-001", paciente: "Julian Castro", edad: "6 años", puntuacion: 88, riesgo: "Bajo", fecha: "15/06/2026", estado: "Evaluado" },
  { id: "QoL-26-005", paciente: "Valentina Meza", edad: "4 años", puntuacion: 72, riesgo: "Moderado", fecha: "18/06/2026", estado: "Evaluado" },
  { id: "QoL-26-008", paciente: "Samuel Restrepo", edad: "12 años", puntuacion: 55, riesgo: "Alto", fecha: "20/06/2026", estado: "Requiere Intervención" },
  { id: "QoL-26-012", paciente: "Elena Villalba", edad: "9 años", puntuacion: 92, riesgo: "Bajo", fecha: "22/06/2026", estado: "Evaluado" },
];

export default function CalidadVidaDashboard() {
  
  // Lógica de Cumplimiento Gerencial
  const pacientesTotales = 85;
  const pacientesEvaluados = 87; // Caso de estudio: más evaluaciones que la cohorte base
  const metaEvaluacion = 100; // Meta es el 100% de la cohorte
  
  const tasaReal = (pacientesEvaluados / pacientesTotales) * 100;
  // Aplicación de regla de auditoría: Tope conservador al 100%
  const cumplimientoMostrado = tasaReal > 100 ? 100 : Math.round(tasaReal);

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
          <Link href="/ucad/leucemia" className="p-2 hover:bg-white/80 rounded-full transition-colors flex items-center gap-2 text-sm font-medium text-slate-600 bg-white/50 border border-slate-200 shadow-sm">
            <ArrowLeft className="w-4 h-4" /> Volver
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-[#324D6D] tracking-tight">Evaluación Instrumento Calidad de Vida (PedsQL)</h1>
            <p className="text-sm text-slate-500">Unidad de Leucemia • Experiencia al Cliente • Bienestar Bio-psicosocial</p>
          </div>
        </div>

        {/* Filtros */}
        <div className="flex flex-wrap items-center gap-4 mb-8 text-sm">
          <div className="bg-white/90 backdrop-blur-sm px-3 py-2 rounded-xl border border-slate-200 shadow-sm flex items-center gap-2">
            <Calendar className="w-4 h-4 text-slate-400" />
            <select className="bg-transparent outline-none cursor-pointer font-medium"><option>Semestre Actual</option></select>
          </div>
          <div className="bg-white/90 backdrop-blur-sm px-3 py-2 rounded-xl border border-slate-200 shadow-sm flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-400" />
            <select className="bg-transparent outline-none cursor-pointer font-medium"><option>Todos los Grupos Etarios</option></select>
          </div>
        </div>

        {/* KPIs Estratégicos */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between border-l-4 border-l-cyan-500">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Cobertura Evaluación</p>
              <p className="text-3xl font-bold text-slate-800">{cumplimientoMostrado}%</p>
            </div>
            <ClipboardCheck className="w-8 h-8 text-cyan-500 opacity-20" />
          </div>
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between border-l-4 border-l-emerald-500">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Puntuación Media</p>
              <p className="text-3xl font-bold text-emerald-600">82.5</p>
            </div>
            <Activity className="w-8 h-8 text-emerald-500 opacity-20" />
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
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Alertas de Bienestar</p>
              <p className="text-3xl font-bold text-rose-600">5</p>
            </div>
            <Brain className="w-8 h-8 text-rose-500 opacity-20" />
          </div>
        </div>

        {/* Gráficas de Análisis */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          
          {/* Gráfico de Radar: Dimensiones de Vida */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="text-sm font-bold text-slate-700 mb-1">Perfil de Calidad de Vida (Dimensiones)</h3>
            <p className="text-[10px] text-slate-400 mb-6">Puntuación promedio por cada eje del instrumento PedsQL</p>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={dataDimensionesVida}>
                  <PolarGrid stroke="#e2e8f0" />
                  <PolarAngleAxis dataKey="subject" tick={{fontSize: 10, fontWeight: 600, fill: '#64748b'}} />
                  <Radar name="Puntuación" dataKey="A" stroke="#06b6d4" fill="#06b6d4" fillOpacity={0.4} />
                  <RechartsTooltip />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Gráfico de Líneas: Evolución de Puntuación */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="text-sm font-bold text-slate-700 mb-1">Tendencia de Bienestar Percibido</h3>
            <p className="text-[10px] text-slate-400 mb-6">Evolución del Score promedio de los pacientes evaluados</p>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={dataTendenciaVida} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="mes" axisLine={false} tickLine={false} tick={{fontSize: 12}} />
                  <YAxis domain={[50, 100]} axisLine={false} tickLine={false} tick={{fontSize: 10}} />
                  <RechartsTooltip />
                  <Line type="monotone" dataKey="score" stroke="#0ea5e9" strokeWidth={3} dot={{ r: 5, fill: "#0ea5e9", strokeWidth: 2, stroke: "#fff" }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Tabla de Seguimiento Clínico */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-50 bg-cyan-50/30 flex justify-between items-center">
            <h3 className="text-sm font-bold text-cyan-800 flex items-center gap-2">
              <Heart className="w-4 h-4" /> Registro Individual de Calidad de Vida
            </h3>
            <button className="text-[10px] font-bold text-cyan-600 bg-white px-3 py-1.5 rounded-lg border border-cyan-200">Exportar Resultados</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="text-slate-500 border-b border-slate-100 uppercase tracking-wider font-semibold bg-slate-50/50">
                  <th className="px-6 py-4">ID Evaluación</th>
                  <th className="px-6 py-4">Paciente</th>
                  <th className="px-6 py-4 text-center">Score (0-100)</th>
                  <th className="px-6 py-4">Nivel de Riesgo</th>
                  <th className="px-6 py-4">Fecha Evaluación</th>
                  <th className="px-6 py-4 text-right">Estatus</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {registroCalidadVida.map((p, i) => (
                  <tr key={i} className="hover:bg-slate-50 transition-colors text-slate-600">
                    <td className="px-6 py-4 font-bold">{p.id}</td>
                    <td className="px-6 py-4 font-medium text-slate-800">{p.paciente} <span className="text-[10px] text-slate-400">({p.edad})</span></td>
                    <td className="px-6 py-4 text-center font-bold text-slate-700">{p.puntuacion}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-md font-bold text-[10px] ${
                        p.riesgo === 'Bajo' ? 'text-emerald-600 bg-emerald-50' : 
                        p.riesgo === 'Moderado' ? 'text-amber-600 bg-amber-50' : 
                        'text-rose-600 bg-rose-50'
                      }`}>
                        {p.riesgo}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-mono text-slate-400">{p.fecha}</td>
                    <td className="px-6 py-4 text-right">
                      <span className="font-medium text-slate-500">{p.estado}</span>
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