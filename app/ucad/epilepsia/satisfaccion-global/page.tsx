"use client";

import Link from "next/link";
import { ArrowLeft, Calendar, Filter, Search, Star, CheckCircle2, AlertTriangle, Users, Phone, Heart, Activity, MessageSquare } from "lucide-react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, Legend } from "recharts";

// Datos simulados basados en el diseño
const dataTendencia = [
  { name: 'Ene', score: 4.1 }, { name: 'Feb', score: 4.0 }, { name: 'Mar', score: 4.0 },
  { name: 'Abr', score: 4.05 }, { name: 'May', score: 4.1 }, { name: 'Jun', score: 4.03 },
];

const dataDistribucion = [
  { name: '1', valor: 25, color: '#ef4444' }, // Rojo
  { name: '2', valor: 25, color: '#f43f5e' }, // Rojo claro
  { name: '3', valor: 60, color: '#f59e0b' }, // Naranja
  { name: '4', valor: 150, color: '#10b981' }, // Verde claro
  { name: '5', valor: 240, color: '#059669' }, // Verde oscuro
];

const dataRankingUnidad = [
  { name: 'UCI', valor: 95 },
  { name: 'Consulta Externa', valor: 78 },
  { name: 'Hospitalización', valor: 78 },
  { name: 'Urgencias', valor: 68 },
];

const dataComparacionCanal = [
  { name: 'Presencial', promedio: 4.07, accesibilidad: 3.6 },
  { name: 'Telemedicina', promedio: 3.93, accesibilidad: 4.2 },
];

const temasFrecuentes = [
  { tema: "Manejo de crisis", count: 30 },
  { tema: "Seguimiento / continuidad", count: 23 },
  { tema: "Acceso a citas", count: 22 },
  { tema: "Claridad de información", count: 22 },
  { tema: "Empatía / trato digno", count: 13 },
  { tema: "Tiempos de espera / organización", count: 9 },
  { tema: "Estigma / discriminación", count: 3 },
];

const comentarios = [
  { fecha: "28/06/2024", score: 5, texto: "Buen seguimiento del tratamiento", tag: "Seguimiento / continuidad" },
  { fecha: "28/06/2024", score: 5, texto: "Personal muy empático y respetuoso", tag: "Empatía / trato digno" },
  { fecha: "28/06/2024", score: 5, texto: "Fácil acceso a citas", tag: "Acceso a citas" },
];

const respuestas = [
  { fecha: "05/01/2024", unidad: "Consulta Externa", canal: "Presencial", encuestado: "Acudiente", punto: "Consulta", score: 5, clasificacion: "Satisfecho", comentario: "Excelente atención, muy clara y empática" },
  { fecha: "08/01/2024", unidad: "Consulta Externa", canal: "Telemedicina", encuestado: "Paciente", punto: "Seguimiento", score: 5, clasificacion: "Satisfecho", comentario: "Muy rápido y fácil acceder por telemedicina" },
  { fecha: "10/01/2024", unidad: "Consulta Externa", canal: "Presencial", encuestado: "Acudiente", punto: "Consulta", score: 4, clasificacion: "Satisfecho", comentario: "-" },
  { fecha: "12/01/2024", unidad: "Urgencias", canal: "Presencial", encuestado: "Paciente", punto: "Urgencias", score: 3, clasificacion: "Neutro", comentario: "Tiempo de espera muy largo" },
  { fecha: "15/01/2024", unidad: "Urgencias", canal: "Presencial", encuestado: "Acudiente", punto: "Urgencias", score: 2, clasificacion: "Insatisfecho", comentario: "Poca claridad en las explicaciones" },
  { fecha: "01/02/2024", unidad: "Urgencias", canal: "Presencial", encuestado: "Paciente", punto: "Consulta", score: 5, clasificacion: "Satisfecho", comentario: "Excelente atención, muy clara" },
  { fecha: "02/02/2024", unidad: "Consulta Externa", canal: "Presencial", encuestado: "Acudiente", punto: "Seguimiento", score: 5, clasificacion: "Satisfecho", comentario: "Personal muy empático y respetuoso" },
  { fecha: "03/02/2024", unidad: "Consulta Externa", canal: "Presencial", encuestado: "Acudiente", punto: "Urgencias", score: 5, clasificacion: "Satisfecho", comentario: "-" },
  { fecha: "04/02/2024", unidad: "Consulta Externa", canal: "Presencial", encuestado: "Paciente", punto: "Egreso", score: 5, clasificacion: "Satisfecho", comentario: "-" },
  { fecha: "05/02/2024", unidad: "Urgencias", canal: "Presencial", encuestado: "Acudiente", punto: "Educación", score: 5, clasificacion: "Satisfecho", comentario: "Nos ayudaron a manejar la crisis" },
];

export default function SatisfaccionGlobalDashboard() {
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
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Satisfacción Global</h1>
          <p className="text-sm text-slate-500">Percepción general de la atención • trato digno y continuidad</p>
          <p className="text-xs text-slate-400 mt-1">Score global (1-5) • Satisfecho: ≥ 4 • Neutro: 3 • Insatisfecho: ≤ 2</p>
        </div>
      </div>

      {/* 2. Barra de Filtros */}
      <div className="flex flex-wrap items-center gap-4 mb-8 text-sm text-slate-600">
        <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-md border border-slate-200 shadow-sm"><Calendar className="w-4 h-4 text-slate-400" /><select className="bg-transparent outline-none cursor-pointer"><option>Últimos 6 meses</option></select></div>
        <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-md border border-slate-200 shadow-sm"><Filter className="w-4 h-4 text-slate-400" /><select className="bg-transparent outline-none cursor-pointer"><option>Todas las unidades</option></select></div>
        <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-md border border-slate-200 shadow-sm"><Filter className="w-4 h-4 text-slate-400" /><select className="bg-transparent outline-none cursor-pointer"><option>Todos</option></select></div>
        <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-md border border-slate-200 shadow-sm"><Filter className="w-4 h-4 text-slate-400" /><select className="bg-transparent outline-none cursor-pointer"><option>Todos</option></select></div>
        <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-md border border-slate-200 shadow-sm flex-1 max-w-md"><Search className="w-4 h-4 text-slate-400" /><input type="text" placeholder="Buscar por documento o nombre" className="w-full bg-transparent outline-none" /></div>
      </div>

      {/* 3. KPIs Superiores */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3 mb-6">
        <div className="bg-white p-3 rounded-xl shadow-sm border border-slate-200 border-t-4 border-t-emerald-400">
          <div className="p-1.5 bg-emerald-50 rounded-md w-fit mb-2"><Star className="w-4 h-4 text-emerald-600" /></div>
          <p className="text-[10px] text-slate-500 mb-1 font-semibold leading-tight">Satisfacción Global</p>
          <p className="text-lg font-bold text-slate-800">4.03</p>
          <p className="text-[9px] text-slate-400">promedio (1-5)</p>
        </div>
        <div className="bg-white p-3 rounded-xl shadow-sm border border-slate-200 border-t-4 border-t-teal-400">
          <div className="p-1.5 bg-teal-50 rounded-md w-fit mb-2"><CheckCircle2 className="w-4 h-4 text-teal-600" /></div>
          <p className="text-[10px] text-slate-500 mb-1 font-semibold leading-tight">% Satisfechos</p>
          <p className="text-lg font-bold text-slate-800">75.8%</p>
          <p className="text-[9px] text-slate-400">score ≥ 4</p>
        </div>
        <div className="bg-white p-3 rounded-xl shadow-sm border border-slate-200 border-t-4 border-t-rose-400">
          <div className="p-1.5 bg-rose-50 rounded-md w-fit mb-2"><AlertTriangle className="w-4 h-4 text-rose-600" /></div>
          <p className="text-[10px] text-slate-500 mb-1 font-semibold leading-tight">% Insatisfechos</p>
          <p className="text-lg font-bold text-slate-800">12.2%</p>
          <p className="text-[9px] text-slate-400">score ≤ 2</p>
        </div>
        <div className="bg-white p-3 rounded-xl shadow-sm border border-slate-200 border-t-4 border-t-blue-500">
          <div className="p-1.5 bg-blue-50 rounded-md w-fit mb-2"><Users className="w-4 h-4 text-blue-600" /></div>
          <p className="text-[10px] text-slate-500 mb-1 font-semibold leading-tight">N encuestas</p>
          <p className="text-lg font-bold text-slate-800">500</p>
          <p className="text-[9px] text-slate-400">respuestas</p>
        </div>
        <div className="bg-white p-3 rounded-xl shadow-sm border border-slate-200 border-t-4 border-t-purple-500">
          <div className="p-1.5 bg-purple-50 rounded-md w-fit mb-2"><Phone className="w-4 h-4 text-purple-600" /></div>
          <p className="text-[10px] text-slate-500 mb-1 font-semibold leading-tight">Telemedicina</p>
          <p className="text-lg font-bold text-slate-800">3.93</p>
          <p className="text-[9px] text-slate-400">promedio</p>
        </div>
        <div className="bg-white p-3 rounded-xl shadow-sm border border-slate-200 border-t-4 border-t-sky-500">
          <div className="p-1.5 bg-sky-50 rounded-md w-fit mb-2"><Heart className="w-4 h-4 text-sky-600" /></div>
          <p className="text-[10px] text-slate-500 mb-1 font-semibold leading-tight">Presencial</p>
          <p className="text-lg font-bold text-slate-800">4.07</p>
          <p className="text-[9px] text-slate-400">promedio</p>
        </div>
        <div className="bg-white p-3 rounded-xl shadow-sm border border-slate-200 border-t-4 border-t-slate-400">
          <div className="p-1.5 bg-slate-100 rounded-md w-fit mb-2"><Activity className="w-4 h-4 text-slate-600" /></div>
          <p className="text-[10px] text-slate-500 mb-1 font-semibold leading-tight">Calidad del dato</p>
          <p className="text-lg font-bold text-slate-800">100.0%</p>
          <p className="text-[9px] text-slate-400">completos</p>
        </div>
      </div>

      {/* 4. Gráficos Principales */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-base font-bold text-slate-800 mb-6">Tendencia mensual</h3>
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={dataTendencia} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10 }} axisLine={false} tickLine={false} domain={[0, 5]} />
                <Tooltip />
                <Line type="monotone" dataKey="score" stroke="#10b981" strokeWidth={2} dot={{ r: 4 }} name="Promedio" />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center mt-2 text-xs font-medium text-slate-600">
            <span className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-[#10b981]"></div> Promedio</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-base font-bold text-slate-800 mb-6">Distribución de calificaciones</h3>
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dataDistribucion} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                <Tooltip cursor={{ fill: '#f1f5f9' }} />
                <Bar dataKey="valor">
                  {dataDistribucion.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-base font-bold text-slate-800 mb-6">Ranking por unidad (% satisfechos)</h3>
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart layout="vertical" data={dataRankingUnidad} margin={{ top: 0, right: 20, left: 30, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} domain={[0, 100]} />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} width={100} />
                <Tooltip cursor={{ fill: '#f1f5f9' }} />
                <Bar dataKey="valor" fill="#14b8a6" barSize={32} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-base font-bold text-slate-800 mb-6">Comparación por canal</h3>
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dataComparacionCanal} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10 }} axisLine={false} tickLine={false} domain={[0, 5]} />
                <Tooltip cursor={{ fill: '#f1f5f9' }} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '10px' }} />
                <Bar dataKey="promedio" fill="#8b5cf6" name="Promedio" barSize={60} />
                <Bar dataKey="accesibilidad" fill="#0ea5e9" name="Accesibilidad" barSize={60} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* 5. Dimensiones de satisfacción */}
      <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 mb-6">
        <h3 className="text-sm font-bold text-slate-500 mb-4 uppercase tracking-wider">Dimensiones de satisfacción</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="bg-white border border-slate-200 rounded-lg p-4">
            <p className="text-xs font-bold text-slate-700 mb-1">Comunicación</p>
            <p className="text-2xl font-bold text-rose-600">3.91</p>
            <p className="text-[10px] text-slate-400 mt-1">70.0% satisfechos</p>
          </div>
          <div className="bg-white border border-slate-200 rounded-lg p-4">
            <p className="text-xs font-bold text-slate-700 mb-1">Empatía/Respeto</p>
            <p className="text-2xl font-bold text-rose-600">3.95</p>
            <p className="text-[10px] text-slate-400 mt-1">72.2% satisfechos</p>
          </div>
          <div className="bg-white border border-slate-200 rounded-lg p-4">
            <p className="text-xs font-bold text-slate-700 mb-1">Accesibilidad</p>
            <p className="text-2xl font-bold text-rose-600">3.82</p>
            <p className="text-[10px] text-slate-400 mt-1">67.4% satisfechos</p>
          </div>
          <div className="bg-white border border-slate-200 rounded-lg p-4">
            <p className="text-xs font-bold text-slate-700 mb-1">Manejo/Orientación</p>
            <p className="text-2xl font-bold text-rose-600">3.94</p>
            <p className="text-[10px] text-slate-400 mt-1">71.6% satisfechos</p>
          </div>
          <div className="bg-white border border-slate-200 rounded-lg p-4">
            <p className="text-xs font-bold text-slate-700 mb-1">Apoyo Psicosocial</p>
            <p className="text-2xl font-bold text-rose-600">3.96</p>
            <p className="text-[10px] text-slate-400 mt-1">72.4% satisfechos</p>
          </div>
        </div>
      </div>

      {/* 6. Brechas de satisfacción */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 mb-6">
        <h3 className="text-sm font-bold text-slate-500 mb-4 uppercase tracking-wider">Brechas de satisfacción</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="border border-rose-200 rounded-lg p-5 bg-rose-50/50 flex flex-col justify-center">
            <p className="text-[10px] font-bold text-rose-600 mb-1 uppercase tracking-wide">PRIORIDAD ALTA</p>
            <p className="text-3xl font-black text-slate-800 mb-1">61</p>
            <p className="text-xs text-slate-800 font-bold">Insatisfechos</p>
            <p className="text-[10px] text-slate-500">12.2%</p>
          </div>
          <div className="border border-amber-200 rounded-lg p-5 bg-amber-50/50 flex flex-col justify-center">
            <p className="text-[10px] font-bold text-amber-600 mb-1 uppercase tracking-wide">Oportunidad de mejora</p>
            <p className="text-3xl font-black text-slate-800 mb-1">60</p>
            <p className="text-xs text-slate-800 font-bold">Neutros</p>
            <p className="text-[10px] text-slate-500">12.0%</p>
          </div>
          <div className="border border-emerald-200 rounded-lg p-5 bg-emerald-50/50 flex flex-col justify-center">
            <p className="text-[10px] font-bold text-emerald-600 mb-1 uppercase tracking-wide">Mantener</p>
            <p className="text-3xl font-black text-slate-800 mb-1">379</p>
            <p className="text-xs text-slate-800 font-bold">Satisfechos</p>
            <p className="text-[10px] text-slate-500">75.8%</p>
          </div>
        </div>
      </div>

      {/* 7. Análisis Cualitativo */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-base font-bold text-slate-800 mb-6">Temas frecuentes</h3>
          <div className="space-y-3">
            {temasFrecuentes.map((t, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-slate-50 border border-slate-100 rounded-lg">
                <div className="flex items-center gap-2"><MessageSquare className="w-4 h-4 text-slate-400" /><span className="text-xs font-medium text-slate-700">{t.tema}</span></div>
                <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-xs font-bold">{t.count}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex flex-col">
          <h3 className="text-base font-bold text-slate-800 mb-6">Comentarios recientes</h3>
          <div className="flex-1 overflow-y-auto max-h-[350px] pr-2 space-y-4">
            {comentarios.map((com, index) => (
              <div key={index} className="border-b border-slate-100 pb-4 last:border-0 last:pb-0">
                <div className="flex justify-between items-start mb-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-700">Score {com.score}</span>
                  <span className="text-[10px] text-slate-400">{com.fecha}</span>
                </div>
                <p className="text-xs text-slate-700 italic mb-2">"{com.texto}"</p>
                <span className="text-[10px] font-semibold text-slate-600 border border-slate-200 bg-slate-50 px-2 py-0.5 rounded inline-block">{com.tag}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 8. Tabla de Datos */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-100">
          <h3 className="text-sm font-bold text-slate-800">Respuestas (500)</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-[11px] text-left">
            <thead className="text-slate-500 bg-white border-b border-slate-100">
              <tr>
                <th className="px-4 py-3 font-medium">Fecha</th>
                <th className="px-4 py-3 font-medium">Unidad</th>
                <th className="px-4 py-3 font-medium text-center">Canal</th>
                <th className="px-4 py-3 font-medium">Encuestado</th>
                <th className="px-4 py-3 font-medium">Punto contacto</th>
                <th className="px-4 py-3 font-medium text-center">Score</th>
                <th className="px-4 py-3 font-medium text-center">Clasificación</th>
                <th className="px-4 py-3 font-medium">Comentario</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {respuestas.map((r, index) => (
                <tr key={index} className="hover:bg-slate-50">
                  <td className="px-4 py-3 text-slate-600">{r.fecha}</td>
                  <td className="px-4 py-3 font-semibold text-teal-600">{r.unidad}</td>
                  <td className="px-4 py-3 text-center">
                    <span className={`px-2 py-0.5 rounded font-bold text-[9px] ${
                      r.canal === 'Telemedicina' ? 'bg-purple-100 text-purple-700' : 'bg-sky-100 text-sky-700'
                    }`}>{r.canal}</span>
                  </td>
                  <td className="px-4 py-3 text-slate-600">{r.encuestado}</td>
                  <td className="px-4 py-3 text-slate-600">{r.punto}</td>
                  <td className="px-4 py-3 text-center font-bold text-slate-800 flex justify-center items-center gap-1">
                    <span className={`text-lg ${r.score >= 4 ? 'text-emerald-500' : r.score === 3 ? 'text-amber-500' : 'text-rose-500'}`}>{r.score}</span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className={`px-2 py-0.5 rounded font-bold text-[9px] ${
                      r.clasificacion === 'Satisfecho' ? 'bg-emerald-100 text-emerald-700' : 
                      r.clasificacion === 'Neutro' ? 'bg-amber-100 text-amber-700' : 
                      'bg-rose-100 text-rose-700'
                    }`}>{r.clasificacion}</span>
                  </td>
                  <td className="px-4 py-3 text-slate-500 truncate max-w-[200px]" title={r.comentario}>{r.comentario}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t border-slate-100 flex justify-between items-center text-[11px] text-slate-500">
          <span>Página 1 de 50</span>
          <div className="flex gap-2">
            <button className="px-3 py-1 border border-slate-200 rounded text-slate-400 bg-slate-50 cursor-not-allowed">Anterior</button>
            <button className="px-3 py-1 border border-slate-200 rounded text-slate-700 hover:bg-slate-50 font-medium">Siguiente</button>
          </div>
        </div>
      </div>
    </div>
  );
}