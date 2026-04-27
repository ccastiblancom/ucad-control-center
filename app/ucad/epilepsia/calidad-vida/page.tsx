"use client";

import Link from "next/link";
import { ArrowLeft, HeartPulse, Activity, Brain, TrendingUp, Download, AlertCircle, Users, Filter, ClipboardSignature } from "lucide-react";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";

// Datos de prueba para Gráfico de Radar (ECAVINAE)
const dataRadar = [
  { dimension: 'Físico', valor: 75, fullMark: 100 },
  { dimension: 'Social', valor: 68, fullMark: 100 },
  { dimension: 'Escolar', valor: 61, fullMark: 100 },
  { dimension: 'Psicológico', valor: 58, fullMark: 100 },
];

// Datos de prueba para Cohorte por Edad (Dona)
const dataEdades = [
  { name: 'Preescolar (< 7 años)', value: 25, color: '#6366f1' }, // Indigo
  { name: 'Escolares (7 a 12 años)', value: 42, color: '#3b82f6' }, // Blue
  { name: 'Adolescentes (13 a 18 años)', value: 18, color: '#38bdf8' }, // Sky
];

// Datos de la tabla de pacientes
const pacientes = [
  { id: "P001", nombre: "Ana Maria González", edad: "8 años", score: 85, clasificacion: "Óptimo", evolucion: "Mejora", alerta: false },
  { id: "P002", nombre: "Carlos Andrés Pérez", edad: "12 años", score: 45, clasificacion: "Bajo", detalle: "Afectación: Psicológica", evolucion: "Declive", alerta: true },
  { id: "P003", nombre: "Laura Sofía Ramírez", edad: "6 años", score: 68, clasificacion: "Moderado", evolucion: "Mejora", alerta: false },
  { id: "P004", nombre: "Miguel Ángel Torres", edad: "10 años", score: 52, clasificacion: "Bajo", detalle: "Afectación: Escolar", evolucion: "Declive", alerta: true },
  { id: "P005", nombre: "Valentina Martínez", edad: "14 años", score: 78, clasificacion: "Adecuado", evolucion: "Mejora", alerta: false },
];

export default function CalidadVidaDashboard() {
  return (
    <div className="relative min-h-screen w-full pb-12">
      {/* CAPA DE FONDO INTEGRADA */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <img 
          src="/fondo.jpg" 
          alt="Fondo Institucional" 
          className="w-full h-full object-cover opacity-10 grayscale-[30%]"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-violet-50/40 via-transparent to-slate-100/90"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto mt-4 px-4 pb-12"></div>
      {/* 1. Encabezado */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Link href="/ucad/epilepsia" className="p-2 hover:bg-slate-200 rounded-full transition-colors flex items-center gap-2 text-sm font-medium text-slate-600">
            <ArrowLeft className="w-4 h-4" /> Volver
          </Link>
          <div>
            <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded-full uppercase tracking-wider mb-1 block w-fit border border-indigo-100">Módulo Psicosocial</span>
            <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Calidad de Vida (ECAVINAE-LICCE)</h1>
            <p className="text-sm text-slate-500">Medición multidimensional del impacto de la epilepsia pediátrica</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <select className="bg-white border border-slate-200 text-slate-600 text-sm rounded-lg px-4 py-2 outline-none shadow-sm cursor-pointer">
            <option>Último Mes</option>
            <option>Últimos 3 meses</option>
            <option>Último año</option>
          </select>
          <button className="flex items-center gap-2 bg-white text-indigo-600 border border-indigo-200 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-indigo-50 transition-colors shadow-sm">
            <Download className="w-4 h-4" />
            Exportar QoL
          </button>
        </div>
      </div>

      {/* 2. KPIs Superiores */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200 flex items-center gap-4">
          <div className="p-3 bg-blue-50 rounded-full"><HeartPulse className="w-6 h-6 text-blue-500" /></div>
          <div>
            <p className="text-xs text-slate-500 mb-0.5 font-medium">Promedio Global (QoL)</p>
            <p className="text-2xl font-bold text-slate-800">72<span className="text-lg text-slate-400 font-medium">/100</span></p>
            <p className="text-[11px] text-slate-400">Calidad de vida moderada</p>
          </div>
        </div>
        <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200 flex items-center gap-4">
          <div className="p-3 bg-emerald-50 rounded-full"><Activity className="w-6 h-6 text-emerald-500" /></div>
          <div>
            <p className="text-xs text-slate-500 mb-0.5 font-medium">Pacientes Evaluados</p>
            <p className="text-2xl font-bold text-slate-800">85</p>
            <p className="text-[11px] text-slate-400">Últimos 30 días</p>
          </div>
        </div>
        <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200 flex items-center gap-4">
          <div className="p-3 bg-rose-50 rounded-full"><Brain className="w-6 h-6 text-rose-500" /></div>
          <div>
            <p className="text-xs text-slate-500 mb-0.5 font-medium">Alerta Psicológica</p>
            <p className="text-2xl font-bold text-slate-800">18%</p>
            <p className="text-[11px] text-slate-400">Requieren apoyo prioritario</p>
          </div>
        </div>
        <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200 flex items-center gap-4">
          <div className="p-3 bg-indigo-50 rounded-full"><TrendingUp className="w-6 h-6 text-indigo-500" /></div>
          <div>
            <p className="text-xs text-slate-500 mb-0.5 font-medium">Mejora Interanual</p>
            <p className="text-2xl font-bold text-slate-800">+12%</p>
            <p className="text-[11px] text-slate-400">Frente al periodo anterior</p>
          </div>
        </div>
      </div>

      {/* 3. Sección Central (Radar + Dona) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        
        {/* Panel Izquierdo: Análisis Multidimensional (Ocupa 2 columnas) */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex flex-col">
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center gap-2">
              <Brain className="w-5 h-5 text-indigo-600" />
              <div>
                <h3 className="text-base font-bold text-slate-800">Análisis Multidimensional ECAVINAE</h3>
                <p className="text-xs text-slate-500">Visualización radial de dimensiones (0 - 100)</p>
              </div>
            </div>
            <select className="text-sm border border-slate-200 rounded-md px-2 py-1 text-slate-600 outline-none">
              <option>Promedio de la Cohorte</option>
            </select>
          </div>

          <div className="flex flex-col md:flex-row flex-1 items-center">
            {/* Gráfico de Radar */}
            <div className="h-64 w-full md:w-1/2">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={dataRadar}>
                  <PolarGrid stroke="#e2e8f0" />
                  <PolarAngleAxis dataKey="dimension" tick={{ fill: '#64748b', fontSize: 12, fontWeight: 600 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                  <Radar name="Cohorte" dataKey="valor" stroke="#6366f1" fill="#818cf8" fillOpacity={0.4} />
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            {/* Barras de Progreso por Dimensión */}
            <div className="w-full md:w-1/2 flex flex-col justify-center gap-6 pr-4">
              {/* Físico */}
              <div>
                <div className="flex justify-between items-end mb-1">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-emerald-100 rounded-md"><Activity className="w-4 h-4 text-emerald-600" /></div>
                    <div>
                      <p className="text-sm font-bold text-slate-700 leading-none">Aspectos Físicos</p>
                      <p className="text-[10px] text-slate-500">Impacto de las crisis y FAEs</p>
                    </div>
                  </div>
                  <span className="font-bold text-slate-800 text-lg leading-none">75</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2.5 mt-2">
                  <div className="bg-emerald-500 h-2.5 rounded-full" style={{ width: '75%' }}></div>
                </div>
              </div>

              {/* Psicológico */}
              <div>
                <div className="flex justify-between items-end mb-1">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-rose-100 rounded-md"><Brain className="w-4 h-4 text-rose-600" /></div>
                    <div>
                      <p className="text-sm font-bold text-slate-700 leading-none">Aspectos Psicológicos</p>
                      <p className="text-[10px] text-slate-500">Manejo de tristeza, ansiedad y miedos</p>
                    </div>
                  </div>
                  <span className="font-bold text-slate-800 text-lg leading-none">58</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2.5 mt-2">
                  <div className="bg-rose-500 h-2.5 rounded-full" style={{ width: '58%' }}></div>
                </div>
              </div>

              {/* Social */}
              <div>
                <div className="flex justify-between items-end mb-1">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-blue-100 rounded-md"><Users className="w-4 h-4 text-blue-600" /></div>
                    <div>
                      <p className="text-sm font-bold text-slate-700 leading-none">Aspectos Sociales</p>
                      <p className="text-[10px] text-slate-500">Interacción y rechazo social</p>
                    </div>
                  </div>
                  <span className="font-bold text-slate-800 text-lg leading-none">68</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2.5 mt-2">
                  <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: '68%' }}></div>
                </div>
              </div>

              {/* Escolar */}
              <div>
                <div className="flex justify-between items-end mb-1">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-amber-100 rounded-md"><TrendingUp className="w-4 h-4 text-amber-600" /></div>
                    <div>
                      <p className="text-sm font-bold text-slate-700 leading-none">Aspectos Escolares</p>
                      <p className="text-[10px] text-slate-500">Rendimiento y atención cognitiva</p>
                    </div>
                  </div>
                  <span className="font-bold text-slate-800 text-lg leading-none">61</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2.5 mt-2">
                  <div className="bg-amber-500 h-2.5 rounded-full" style={{ width: '61%' }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Alerta Inferior */}
          <div className="mt-6 bg-rose-50 border border-rose-100 rounded-lg p-4 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-rose-500 mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-bold text-rose-800">Alerta Clínica Detectada</p>
              <p className="text-xs text-rose-600 mt-0.5">El dominio <strong>Psicológico</strong> presenta una puntuación de riesgo (58/100). Se sugiere activar ruta de atención con Trabajo Social y Psicología Pediátrica.</p>
            </div>
          </div>
        </div>

        {/* Panel Derecho: Cohorte por Edad */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex flex-col">
          <div className="flex items-center gap-2 mb-2">
            <Users className="w-5 h-5 text-blue-600" />
            <h3 className="text-base font-bold text-slate-800">Cohorte por Edad</h3>
          </div>
          <p className="text-xs text-slate-500 mb-6">Pacientes evaluados según grupos</p>

          <div className="h-48 w-full relative flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={dataEdades} innerRadius={55} outerRadius={80} paddingAngle={2} dataKey="value" stroke="none">
                  {dataEdades.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            {/* Número central de la Dona */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-bold text-slate-800">85</span>
              <span className="text-[10px] text-slate-500">Pacientes</span>
            </div>
          </div>

          {/* Leyenda Personalizada */}
          <div className="mt-8 flex flex-col gap-4">
            {dataEdades.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <span className="text-xs text-slate-600 font-medium">{item.name}</span>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-slate-800">{item.value} px</p>
                  <p className="text-[10px] text-slate-400">{Math.round((item.value/85)*100)}%</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 4. Tabla de Resultados Individuales */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <div>
            <h3 className="text-lg font-bold text-slate-800">Resultados Individuales (Tamizaje Activo)</h3>
            <p className="text-sm text-slate-500">Puntajes recientes de calidad de vida aplicados en consulta</p>
          </div>
          <div className="flex gap-2">
            <button className="px-3 py-1.5 border border-slate-200 text-slate-600 text-xs font-medium rounded-lg flex items-center gap-2 hover:bg-slate-50">
              <Filter className="w-3.5 h-3.5" /> Filtrar Alertas
            </button>
            <button className="px-3 py-1.5 bg-indigo-600 text-white text-xs font-medium rounded-lg shadow-sm hover:bg-indigo-700 transition-colors flex items-center gap-2">
              <ClipboardSignature className="w-3.5 h-3.5" /> Registrar Encuesta
            </button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="text-slate-500 bg-slate-50/50 uppercase tracking-wider text-[10px]">
              <tr>
                <th className="px-6 py-4 font-bold">ID Paciente</th>
                <th className="px-6 py-4 font-bold">Nombre Completo</th>
                <th className="px-6 py-4 font-bold">Edad</th>
                <th className="px-6 py-4 font-bold text-center">Score ECAVINAE</th>
                <th className="px-6 py-4 font-bold">Clasificación QoL</th>
                <th className="px-6 py-4 font-bold">Evolución</th>
                <th className="px-6 py-4 font-bold text-right">Intervención Recomendada</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {pacientes.map((p, index) => (
                <tr key={index} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-500">{p.id}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {p.alerta && <div className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse"></div>}
                      <span className={`font-bold ${p.alerta ? 'text-slate-800' : 'text-slate-600'}`}>{p.nombre}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-600">{p.edad}</td>
                  <td className="px-6 py-4 text-center">
                    <span className={`px-3 py-1 rounded-full font-bold border ${
                      p.score >= 70 ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : p.score >= 60 ? 'bg-amber-50 text-amber-700 border-amber-200' : 'bg-rose-50 text-rose-700 border-rose-200'
                    }`}>
                      {p.score} <span className="text-[10px] opacity-70">/ 100</span>
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-semibold text-slate-800">{p.clasificacion}</p>
                    {p.detalle && <p className="text-[9px] text-slate-400 uppercase mt-0.5">{p.detalle}</p>}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`flex items-center gap-1 font-medium ${p.evolucion === 'Mejora' ? 'text-emerald-500' : 'text-rose-500'}`}>
                      {p.evolucion === 'Mejora' ? <TrendingUp className="w-3 h-3" /> : <TrendingUp className="w-3 h-3 rotate-180" />}
                      {p.evolucion}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    {p.alerta ? (
                      <button className="px-3 py-1.5 bg-rose-600 text-white rounded-md text-[10px] font-bold shadow-sm hover:bg-rose-700 transition-colors">
                        Derivar a Psiquiatría
                      </button>
                    ) : (
                      <button className="px-3 py-1.5 text-indigo-600 hover:text-indigo-800 hover:underline text-[10px] font-bold transition-colors">
                        Ver en Radar
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}