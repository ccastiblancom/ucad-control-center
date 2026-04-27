"use client";

import Link from "next/link";
import { ArrowLeft, Calendar, Filter, Search, Star, CheckCircle2, TrendingUp, GraduationCap, Activity, Heart, Award, Users, MessageSquare } from "lucide-react";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

// Datos de prueba
const dataTendenciaCSAT = [
  { name: 'Ene', score: 3.8 }, { name: 'Feb', score: 0 }, { name: 'Mar', score: 3.6 },
  { name: 'Abr', score: 3.8 }, { name: 'May', score: 3.9 }, { name: 'Jun', score: 3.78 },
];

const dataTendenciaEducacion = [
  { name: 'Ene', score: 60 }, { name: 'Feb', score: 58 }, { name: 'Mar', score: 62 },
  { name: 'Abr', score: 60 }, { name: 'May', score: 64 }, { name: 'Jun', score: 61.7 },
];

const dataDistribucionCSAT = [
  { name: '1', valor: 5, color: '#ef4444' },
  { name: '2', valor: 15, color: '#f43f5e' },
  { name: '3', valor: 25, color: '#f59e0b' },
  { name: '4', valor: 100, color: '#10b981' },
  { name: '5', valor: 35, color: '#059669' },
];

const dataNPS = [
  { name: 'Promotor', value: 55.8, color: '#10b981' },
  { name: 'Pasivo', value: 32.5, color: '#f59e0b' },
  { name: 'Detractor', value: 11.7, color: '#ef4444' },
];

const dataImpacto = [
  { name: 'Pre', valor: 45, color: '#f59e0b' },
  { name: 'Post', valor: 68, color: '#10b981' },
];

const dataRankingUnidad = [
  { name: 'Consulta Externa', valor: 4.8 },
  { name: 'Urgencias', valor: 4.5 },
  { name: 'UCI', valor: 4.2 },
  { name: 'Hospitalización', valor: 3.8 },
];

const dataComparacionCanal = [
  { name: 'Presencial', csat: 4.5, educacion: 60 },
  { name: 'Telemedicina', csat: 4.8, educacion: 68 },
];

const comentarios = [
  { fecha: "28/06/2024", tag: "Educación", texto: "Poca claridad en explicación", subtitulo: "Comunicación/claridad" },
  { fecha: "25/06/2024", tag: "Educación", texto: "Falta empatía", subtitulo: "Empatía" },
  { fecha: "25/06/2024", tag: "CSAT", texto: "Rápido acceso por telemedicina", subtitulo: "Telemedicina: rapidez" },
];

const respuestas = [
  { fecha: "05/01/2024", unidad: "Consulta Externa", canal: "Presencial", tipo: "CSAT", score: "5", clasificacion: "Alto", programa: "Ninguno", momento: "NA", comentario: "Excelente atención, todo muy claro" },
  { fecha: "08/01/2024", unidad: "Consulta Externa", canal: "Telemedicina", tipo: "NPS", score: "Promotor", clasificacion: "Alto", programa: "Ninguno", momento: "NA", comentario: "-" },
  { fecha: "10/01/2024", unidad: "Consulta Externa", canal: "Presencial", tipo: "Educación", score: "45", clasificacion: "Medio", programa: "Programa A", momento: "Pre", comentario: "-" },
  { fecha: "12/01/2024", unidad: "Urgencias", canal: "Presencial", tipo: "CSAT", score: "2", clasificacion: "Bajo", programa: "Ninguno", momento: "NA", comentario: "Tiempo de espera muy largo" },
  { fecha: "15/01/2024", unidad: "Consulta Externa", canal: "Telemedicina", tipo: "CSAT", score: "5", clasificacion: "Alto", programa: "Ninguno", momento: "NA", comentario: "Muy fácil acceder, rápido" },
  { fecha: "18/01/2024", unidad: "Consulta Externa", canal: "Presencial", tipo: "Educación", score: "72", clasificacion: "Alto", programa: "Ninguno", momento: "NA", comentario: "-" },
  { fecha: "20/01/2024", unidad: "Hospitalización", canal: "Presencial", tipo: "NPS", score: "Pasivo", clasificacion: "Medio", programa: "Ninguno", momento: "NA", comentario: "-" },
];

export default function SatisfaccionClienteEducacionDashboard() {
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
      <div className="flex items-center gap-4 mb-6">
        <Link href="/ucad/epilepsia" className="p-2 hover:bg-slate-200 rounded-full transition-colors flex items-center gap-2 text-sm font-medium text-slate-600">
          <ArrowLeft className="w-4 h-4" /> Volver
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Satisfacción cliente y educación</h1>
          <p className="text-sm text-slate-500">Experiencia del paciente + educación sanitaria (autoeficacia y empoderamiento)</p>
          <p className="text-xs text-slate-400 mt-1">CSAT (1-5) • NPS • Score Educación (0-100) • Pre/post programas</p>
        </div>
      </div>

      {/* 2. Barra de Filtros */}
      <div className="flex flex-wrap items-center gap-4 mb-8 text-sm text-slate-600">
        <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-md border border-slate-200 shadow-sm"><Calendar className="w-4 h-4 text-slate-400" /><select className="bg-transparent outline-none cursor-pointer"><option>Últimos 6 meses</option></select></div>
        <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-md border border-slate-200 shadow-sm"><Filter className="w-4 h-4 text-slate-400" /><select className="bg-transparent outline-none cursor-pointer"><option>Todas las unidades</option></select></div>
        <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-md border border-slate-200 shadow-sm"><Filter className="w-4 h-4 text-slate-400" /><select className="bg-transparent outline-none cursor-pointer"><option>Todos los canales</option></select></div>
        <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-md border border-slate-200 shadow-sm"><Filter className="w-4 h-4 text-slate-400" /><select className="bg-transparent outline-none cursor-pointer"><option>Todos</option></select></div>
        <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-md border border-slate-200 shadow-sm"><Filter className="w-4 h-4 text-slate-400" /><select className="bg-transparent outline-none cursor-pointer"><option>Todos</option></select></div>
        <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-md border border-slate-200 shadow-sm flex-1 max-w-md"><Search className="w-4 h-4 text-slate-400" /><input type="text" placeholder="Buscar por documento o nombre" className="w-full bg-transparent outline-none" /></div>
      </div>

      {/* 3. KPIs Superiores */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3 mb-6">
        <div className="bg-white p-3 rounded-xl shadow-sm border border-slate-200 border-t-4 border-t-emerald-400">
          <div className="p-1.5 bg-emerald-50 rounded-md w-fit mb-2"><Star className="w-4 h-4 text-emerald-600" /></div>
          <p className="text-[10px] text-slate-500 mb-1 font-semibold leading-tight">CSAT promedio</p>
          <p className="text-lg font-bold text-slate-800">3.78</p>
          <p className="text-[9px] text-slate-400">escala 1-5</p>
        </div>
        <div className="bg-white p-3 rounded-xl shadow-sm border border-slate-200 border-t-4 border-t-teal-400">
          <div className="p-1.5 bg-teal-50 rounded-md w-fit mb-2"><CheckCircle2 className="w-4 h-4 text-teal-600" /></div>
          <p className="text-[10px] text-slate-500 mb-1 font-semibold leading-tight">% Satisfechos</p>
          <p className="text-lg font-bold text-slate-800">73.9%</p>
          <p className="text-[9px] text-slate-400">CSAT ≥ 4</p>
        </div>
        <div className="bg-white p-3 rounded-xl shadow-sm border border-slate-200 border-t-4 border-t-blue-500">
          <div className="p-1.5 bg-blue-50 rounded-md w-fit mb-2"><TrendingUp className="w-4 h-4 text-blue-600" /></div>
          <p className="text-[10px] text-slate-500 mb-1 font-semibold leading-tight">NPS</p>
          <p className="text-lg font-bold text-slate-800">44.2</p>
          <p className="text-[9px] text-slate-400">%P - %D</p>
        </div>
        <div className="bg-white p-3 rounded-xl shadow-sm border border-slate-200 border-t-4 border-t-purple-500">
          <div className="p-1.5 bg-purple-50 rounded-md w-fit mb-2"><GraduationCap className="w-4 h-4 text-purple-600" /></div>
          <p className="text-[10px] text-slate-500 mb-1 font-semibold leading-tight">Score educación</p>
          <p className="text-lg font-bold text-slate-800">61.7</p>
          <p className="text-[9px] text-slate-400">escala 0-100</p>
        </div>
        <div className="bg-white p-3 rounded-xl shadow-sm border border-slate-200 border-t-4 border-t-cyan-500 opacity-70">
          <div className="p-1.5 bg-cyan-50 rounded-md w-fit mb-2"><Activity className="w-4 h-4 text-cyan-600" /></div>
          <p className="text-[10px] text-slate-500 mb-1 font-semibold leading-tight">Autoeficacia</p>
          <p className="text-lg font-bold text-slate-400">-</p>
          <p className="text-[9px] text-slate-400">no disponible</p>
        </div>
        <div className="bg-white p-3 rounded-xl shadow-sm border border-slate-200 border-t-4 border-t-pink-500 opacity-70">
          <div className="p-1.5 bg-pink-50 rounded-md w-fit mb-2"><Heart className="w-4 h-4 text-pink-600" /></div>
          <p className="text-[10px] text-slate-500 mb-1 font-semibold leading-tight">Empoderamiento</p>
          <p className="text-lg font-bold text-slate-400">-</p>
          <p className="text-[9px] text-slate-400">no disponible</p>
        </div>
        <div className="bg-white p-3 rounded-xl shadow-sm border border-slate-200 border-t-4 border-t-amber-500">
          <div className="p-1.5 bg-amber-50 rounded-md w-fit mb-2"><Award className="w-4 h-4 text-amber-600" /></div>
          <p className="text-[10px] text-slate-500 mb-1 font-semibold leading-tight">Mejora pre→post</p>
          <p className="text-lg font-bold text-slate-800">+ 13.0</p>
          <p className="text-[9px] text-slate-400">puntos (Δ)</p>
        </div>
        <div className="bg-white p-3 rounded-xl shadow-sm border border-slate-200 border-t-4 border-t-slate-400">
          <div className="p-1.5 bg-slate-100 rounded-md w-fit mb-2"><Users className="w-4 h-4 text-slate-600" /></div>
          <p className="text-[10px] text-slate-500 mb-1 font-semibold leading-tight">Calidad del dato</p>
          <p className="text-lg font-bold text-slate-800">100.0%</p>
          <p className="text-[9px] text-slate-400">completos</p>
        </div>
      </div>

      {/* 4. Gráficos de Tendencias */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-base font-bold text-slate-800 mb-6">Tendencia CSAT</h3>
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={dataTendenciaCSAT} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10 }} axisLine={false} tickLine={false} domain={[0, 5]} />
                <Tooltip />
                <Line type="monotone" dataKey="score" stroke="#10b981" strokeWidth={2} dot={{ r: 4 }} name="Promedio CSAT" />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center mt-2 text-xs font-medium text-slate-600">
            <span className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-[#10b981]"></div> Promedio CSAT</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-base font-bold text-slate-800 mb-6">Tendencia Educación</h3>
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={dataTendenciaEducacion} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10 }} axisLine={false} tickLine={false} domain={[0, 100]} />
                <Tooltip />
                <Line type="monotone" dataKey="score" stroke="#8b5cf6" strokeWidth={2} dot={{ r: 4 }} name="Score Educación" />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center mt-2 text-xs font-medium text-slate-600">
            <span className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-[#8b5cf6]"></div> Score Educación</span>
          </div>
        </div>
      </div>

      {/* 5. Distribuciones CSAT y NPS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-base font-bold text-slate-800 mb-6">Distribución CSAT (1-5)</h3>
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dataDistribucionCSAT} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                <Tooltip cursor={{ fill: '#f1f5f9' }} />
                <Bar dataKey="valor">
                  {dataDistribucionCSAT.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex flex-col items-center relative">
          <h3 className="text-base font-bold text-slate-800 mb-2 w-full text-left">Distribución NPS</h3>
          <div className="h-48 w-full flex justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={dataNPS} cx="50%" cy="50%" innerRadius={40} outerRadius={70} paddingAngle={2} dataKey="value" startAngle={180} endAngle={-180}>
                  {dataNPS.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          {/* Etiquetas personalizadas NPS */}
          <div className="absolute top-16 left-1/4 text-xs font-bold text-[#10b981]">Promotor: 55.8%</div>
          <div className="absolute top-1/2 left-[20%] text-xs font-bold text-[#f59e0b]">Pasivo: 32.5%</div>
          <div className="absolute top-[45%] right-1/4 text-xs font-bold text-[#ef4444]">Detractor: 11.7%</div>
          <div className="absolute bottom-6 text-xl font-black text-blue-700">NPS: 44.2</div>
        </div>
      </div>

      {/* 6. Impacto Programas y Matriz */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 mb-6 flex flex-col md:flex-row gap-6 items-center">
        <div className="w-full md:w-1/3">
          <h3 className="text-base font-bold text-slate-800 mb-4">Impacto Programas Educativos (Pre vs Post)</h3>
          <div className="border-2 border-emerald-100 bg-emerald-50 rounded-xl p-6 text-center">
            <p className="text-sm font-semibold text-emerald-800 mb-2">Mejora promedio</p>
            <p className="text-4xl font-bold text-emerald-600">+13.0</p>
            <p className="text-[10px] text-emerald-600 mt-1">puntos (post - pre)</p>
          </div>
        </div>
        <div className="flex-1 h-48 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={dataImpacto} margin={{ top: 20, right: 20, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10 }} axisLine={false} tickLine={false} domain={[0, 100]} />
              <Tooltip cursor={{ fill: '#f1f5f9' }} />
              <Bar dataKey="valor" barSize={100}>
                {dataImpacto.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 mb-6">
        <h3 className="text-sm font-bold text-slate-500 mb-4 uppercase tracking-wider">Matriz de Brechas (Satisfacción × Educación)</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border border-rose-200 rounded-lg p-6 bg-rose-50/50">
            <p className="text-xs font-bold text-rose-600 mb-1">Prioridad ALTA</p>
            <p className="text-3xl font-bold text-slate-800 mb-2">0</p>
            <p className="text-xs text-slate-600">Baja Satisfacción<br/>+ Baja Educación</p>
          </div>
          <div className="border border-emerald-200 rounded-lg p-6 bg-emerald-50/50">
            <p className="text-xs font-bold text-emerald-600 mb-1">Reforzar educación</p>
            <p className="text-3xl font-bold text-slate-800 mb-2">0</p>
            <p className="text-xs text-slate-600">Alta Satisfacción<br/>+ Baja Educación</p>
          </div>
          <div className="border border-amber-200 rounded-lg p-6 bg-amber-50/50">
            <p className="text-xs font-bold text-amber-600 mb-1">Problema experiencia</p>
            <p className="text-3xl font-bold text-slate-800 mb-2">0</p>
            <p className="text-xs text-slate-600">Baja Satisfacción<br/>+ Alta Educación</p>
          </div>
          <div className="border border-blue-200 rounded-lg p-6 bg-blue-50/50">
            <p className="text-xs font-bold text-blue-600 mb-1">Excelente</p>
            <p className="text-3xl font-bold text-slate-800 mb-2">0</p>
            <p className="text-xs text-slate-600">Alta Satisfacción<br/>+ Alta Educación</p>
          </div>
        </div>
      </div>

      {/* 7. Ranking y Comparación Canal */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-base font-bold text-slate-800 mb-6">Ranking por Unidad (CSAT)</h3>
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart layout="vertical" data={dataRankingUnidad} margin={{ top: 0, right: 20, left: 30, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} domain={[0, 5]} />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} width={100} />
                <Tooltip cursor={{ fill: '#f1f5f9' }} />
                <Bar dataKey="valor" fill="#8b5cf6" barSize={24} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-base font-bold text-slate-800 mb-6">Comparación por Canal</h3>
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dataComparacionCanal} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis yAxisId="left" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} domain={[0, 5]} />
                <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} domain={[0, 100]} />
                <Tooltip cursor={{ fill: '#f1f5f9' }} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '10px' }} />
                <Bar yAxisId="left" dataKey="csat" fill="#14b8a6" name="CSAT (1-5)" barSize={40} />
                <Bar yAxisId="right" dataKey="educacion" fill="#8b5cf6" name="Educación (0-100)" barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* 8. Análisis Cualitativo */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-base font-bold text-slate-800 mb-6">Temas frecuentes</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-slate-50 border border-slate-100 rounded-lg">
              <div className="flex items-center gap-2"><MessageSquare className="w-4 h-4 text-slate-400" /><span className="text-xs font-medium text-slate-700">Comunicación/claridad</span></div>
              <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-xs font-bold">56</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-slate-50 border border-slate-100 rounded-lg">
              <div className="flex items-center gap-2"><MessageSquare className="w-4 h-4 text-slate-400" /><span className="text-xs font-medium text-slate-700">Empatía</span></div>
              <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-xs font-bold">30</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-slate-50 border border-slate-100 rounded-lg">
              <div className="flex items-center gap-2"><MessageSquare className="w-4 h-4 text-slate-400" /><span className="text-xs font-medium text-slate-700">Organización/tiempos</span></div>
              <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-xs font-bold">25</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-slate-50 border border-slate-100 rounded-lg">
              <div className="flex items-center gap-2"><MessageSquare className="w-4 h-4 text-slate-400" /><span className="text-xs font-medium text-slate-700">Acceso</span></div>
              <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-xs font-bold">19</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-slate-50 border border-slate-100 rounded-lg">
              <div className="flex items-center gap-2"><MessageSquare className="w-4 h-4 text-slate-400" /><span className="text-xs font-medium text-slate-700">Telemedicina: rapidez</span></div>
              <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-xs font-bold">15</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex flex-col">
          <h3 className="text-base font-bold text-slate-800 mb-6">Comentarios recientes</h3>
          <div className="flex-1 overflow-y-auto max-h-[300px] pr-2 space-y-4">
            {comentarios.map((com, index) => (
              <div key={index} className="border-b border-slate-100 pb-4 last:border-0 last:pb-0">
                <div className="flex justify-between items-start mb-2">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${com.tag === 'Educación' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>{com.tag}</span>
                  <span className="text-[10px] text-slate-400">{com.fecha}</span>
                </div>
                <p className="text-xs text-slate-700 italic mb-2">"{com.texto}"</p>
                <span className="text-[10px] font-semibold text-slate-600 border border-slate-200 bg-slate-50 px-2 py-0.5 rounded inline-block">{com.subtitulo}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 9. Tabla de Datos */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="border-b border-slate-100 bg-slate-50 flex">
          <button className="px-6 py-3 text-sm font-bold text-slate-800 bg-white border-b-2 border-blue-600">Respuestas (450)</button>
          <button className="px-6 py-3 text-sm font-medium text-slate-500 hover:text-slate-800">Pacientes (449)</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-[11px] text-left">
            <thead className="text-slate-500 bg-white">
              <tr>
                <th className="px-4 py-3 font-medium">Fecha</th>
                <th className="px-4 py-3 font-medium">Unidad</th>
                <th className="px-4 py-3 font-medium">Canal</th>
                <th className="px-4 py-3 font-medium">Tipo</th>
                <th className="px-4 py-3 font-medium">Score/Segmento</th>
                <th className="px-4 py-3 font-medium">Clasificación</th>
                <th className="px-4 py-3 font-medium">Programa</th>
                <th className="px-4 py-3 font-medium">Momento</th>
                <th className="px-4 py-3 font-medium">Comentario</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {respuestas.map((r, index) => (
                <tr key={index} className="hover:bg-slate-50">
                  <td className="px-4 py-3 text-slate-600">{r.fecha}</td>
                  <td className="px-4 py-3 font-semibold text-teal-600">{r.unidad}</td>
                  <td className="px-4 py-3 text-slate-700">
                    <span className={`px-2 py-0.5 rounded-sm font-bold text-[9px] ${r.canal === 'Telemedicina' ? 'bg-purple-100 text-purple-700' : 'bg-sky-100 text-sky-700'}`}>{r.canal}</span>
                  </td>
                  <td className="px-4 py-3 text-slate-600 font-medium">{r.tipo}</td>
                  <td className="px-4 py-3 text-slate-800 font-bold">{r.score}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded-sm font-bold text-[9px] ${
                      r.clasificacion === 'Alto' ? 'bg-emerald-100 text-emerald-700' : r.clasificacion === 'Medio' ? 'bg-amber-100 text-amber-700' : 'bg-rose-100 text-rose-700'
                    }`}>{r.clasificacion}</span>
                  </td>
                  <td className="px-4 py-3 text-slate-600">{r.programa}</td>
                  <td className="px-4 py-3 text-slate-600">{r.momento}</td>
                  <td className="px-4 py-3 text-slate-500 truncate max-w-[150px]" title={r.comentario}>{r.comentario}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}