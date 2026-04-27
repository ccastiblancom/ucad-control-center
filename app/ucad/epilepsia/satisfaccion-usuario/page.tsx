"use client";

import Link from "next/link";
import { ArrowLeft, Calendar, Filter, Search, Star, CheckCircle2, Users, Phone, Building2, Activity, MessageSquare } from "lucide-react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";

// Datos de prueba para gráficos
const dataTendencia = [
  { name: 'Ene', score: 3.5 }, { name: 'Feb', score: 3.8 },
  { name: 'Mar', score: 3.9 }, { name: 'Abr', score: 3.8 },
  { name: 'May', score: 3.7 }, { name: 'Jun', score: 3.79 },
];

const dataDistribucion = [
  { name: '1', valor: 2, color: '#ef4444' },
  { name: '2', valor: 25, color: '#f43f5e' },
  { name: '3', valor: 50, color: '#f59e0b' },
  { name: '4', valor: 190, color: '#10b981' },
  { name: '5', valor: 45, color: '#059669' },
];

const dataCanal = [
  { name: 'Presencial', valor: 75 },
  { name: 'Telemedicina', valor: 77 },
];

const dataUnidad = [
  { name: 'Consulta Externa', valor: 78 },
  { name: 'UCI', valor: 75 },
  { name: 'Hospitalización', valor: 72 },
  { name: 'Urgencias', valor: 65 },
];

const comentarios = [
  { fecha: "28/06/2024", score: 4, canal: "Presencial", texto: "Excelente atención, todo muy claro.", tag: "Claridad tratamiento" },
  { fecha: "25/06/2024", score: 4, canal: "Presencial", texto: "Excelente atención, todo muy claro.", tag: "Claridad tratamiento" },
  { fecha: "22/06/2024", score: 2, canal: "Presencial", texto: "No entendí bien el tratamiento y me quedaron dudas.", tag: "Dudas no resueltas" },
  { fecha: "15/06/2024", score: 5, canal: "Telemedicina", texto: "La doctora fue muy empática y resolvió mis preguntas rápido.", tag: "Empatía" },
  { fecha: "10/06/2024", score: 3, canal: "Urgencias", texto: "Mucho tiempo de espera para que me dieran la información de salida.", tag: "Tiempos de espera" },
];

const respuestas = [
  { fecha: "05/01/2024", unidad: "Consulta Externa", canal: "Presencial", encuestado: "Acudiente", punto: "Consulta", score: 5, clasificacion: "Satisfecho", comentario: "Excelente explicación sobre el tratamiento, todo muy claro." },
  { fecha: "08/01/2024", unidad: "Consulta Externa", canal: "Telemedicina", encuestado: "Paciente", punto: "Consulta", score: 5, clasificacion: "Satisfecho", comentario: "-" },
  { fecha: "10/01/2024", unidad: "Hospitalización", canal: "Presencial", encuestado: "Egreso", punto: "Consulta", score: 4, clasificacion: "Satisfecho", comentario: "Buena atención, me orientaron bien." },
  { fecha: "12/01/2024", unidad: "Urgencias", canal: "Presencial", encuestado: "Acudiente", punto: "Consulta", score: 2, clasificacion: "Insatisfecho", comentario: "Tiempo de espera muy largo, poca información mientras esperaba." },
  { fecha: "15/01/2024", unidad: "Consulta Externa", canal: "Telemedicina", encuestado: "Paciente", punto: "Seguimiento", score: 5, clasificacion: "Satisfecho", comentario: "Muy fácil acceder, resolvieron todas mis dudas." },
  { fecha: "18/01/2024", unidad: "Consulta Externa", canal: "Presencial", encuestado: "Acudiente", punto: "Educación", score: 4, clasificacion: "Satisfecho", comentario: "-" },
  { fecha: "20/01/2024", unidad: "UCI", canal: "Presencial", encuestado: "Acudiente", punto: "Consulta", score: 3, clasificacion: "Neutro", comentario: "La información fue un poco técnica, no entendí todo." },
];

export default function SatisfaccionUsuarioDashboard() {
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
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Satisfacción usuario - información recibida</h1>
          <p className="text-sm text-slate-500">Calidad de comunicación y orientación - paciente/acudiente</p>
          <p className="text-xs text-slate-400 mt-1">Escala 1-5 • Umbral satisfacción ≥ 4</p>
        </div>
      </div>

      {/* 2. Barra de Filtros */}
      <div className="flex flex-wrap items-center gap-4 mb-8 text-sm text-slate-600">
        <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-md border border-slate-200 shadow-sm"><Calendar className="w-4 h-4 text-slate-400" /><select className="bg-transparent outline-none cursor-pointer"><option>Últimos 6 meses</option></select></div>
        <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-md border border-slate-200 shadow-sm"><Filter className="w-4 h-4 text-slate-400" /><select className="bg-transparent outline-none cursor-pointer"><option>Todas las unidades</option></select></div>
        <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-md border border-slate-200 shadow-sm"><Filter className="w-4 h-4 text-slate-400" /><select className="bg-transparent outline-none cursor-pointer"><option>Todos los canales</option></select></div>
        <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-md border border-slate-200 shadow-sm"><Filter className="w-4 h-4 text-slate-400" /><select className="bg-transparent outline-none cursor-pointer"><option>Todos</option></select></div>
        <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-md border border-slate-200 shadow-sm flex-1 max-w-md"><Search className="w-4 h-4 text-slate-400" /><input type="text" placeholder="Buscar por documento o nombre" className="w-full bg-transparent outline-none" /></div>
      </div>

      {/* 3. KPIs Superiores */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-6">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 border-t-4 border-t-emerald-500">
          <div className="p-1.5 bg-emerald-50 rounded-md w-fit mb-2"><Star className="w-4 h-4 text-emerald-600" /></div>
          <p className="text-[11px] text-slate-500 mb-1 font-semibold leading-tight">Satisfacción global</p>
          <p className="text-xl font-bold text-slate-800">3.79</p>
          <p className="text-[9px] text-slate-400">escala 1-5</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 border-t-4 border-t-teal-500">
          <div className="p-1.5 bg-teal-50 rounded-md w-fit mb-2"><CheckCircle2 className="w-4 h-4 text-teal-600" /></div>
          <p className="text-[11px] text-slate-500 mb-1 font-semibold leading-tight">% Satisfechos</p>
          <p className="text-xl font-bold text-slate-800">74.6%</p>
          <p className="text-[9px] text-slate-400">score {'>'} 4</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 border-t-4 border-t-blue-500">
          <div className="p-1.5 bg-blue-50 rounded-md w-fit mb-2"><Users className="w-4 h-4 text-blue-600" /></div>
          <p className="text-[11px] text-slate-500 mb-1 font-semibold leading-tight">N encuestas</p>
          <p className="text-xl font-bold text-slate-800">350</p>
          <p className="text-[9px] text-slate-400">respuestas</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 border-t-4 border-t-purple-500">
          <div className="p-1.5 bg-purple-50 rounded-md w-fit mb-2"><Phone className="w-4 h-4 text-purple-600" /></div>
          <p className="text-[11px] text-slate-500 mb-1 font-semibold leading-tight">Telemedicina</p>
          <p className="text-xl font-bold text-slate-800">3.81</p>
          <p className="text-[9px] text-slate-400">satisfacción</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 border-t-4 border-t-sky-500">
          <div className="p-1.5 bg-sky-50 rounded-md w-fit mb-2"><Building2 className="w-4 h-4 text-sky-600" /></div>
          <p className="text-[11px] text-slate-500 mb-1 font-semibold leading-tight">Presencial</p>
          <p className="text-xl font-bold text-slate-800">3.78</p>
          <p className="text-[9px] text-slate-400">satisfacción</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 border-t-4 border-t-amber-500">
          <div className="p-1.5 bg-amber-50 rounded-md w-fit mb-2"><Activity className="w-4 h-4 text-amber-600" /></div>
          <p className="text-[11px] text-slate-500 mb-1 font-semibold leading-tight">Calidad del dato</p>
          <p className="text-xl font-bold text-slate-800">100.0%</p>
          <p className="text-[9px] text-slate-400">completos</p>
        </div>
      </div>

      {/* 4. Gráficos Fila 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-base font-bold text-slate-800 mb-6">Tendencia de satisfacción</h3>
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

      {/* 5. Gráficos Fila 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-base font-bold text-slate-800 mb-6">Comparación por canal</h3>
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dataCanal} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10 }} axisLine={false} tickLine={false} domain={[0, 100]} />
                <Tooltip cursor={{ fill: '#f1f5f9' }} />
                <Bar dataKey="valor" fill="#14b8a6" barSize={80} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-base font-bold text-slate-800 mb-6">Ranking por unidad</h3>
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart layout="vertical" data={dataUnidad} margin={{ top: 0, right: 20, left: 30, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} domain={[0, 100]} />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} width={100} />
                <Tooltip cursor={{ fill: '#f1f5f9' }} />
                <Bar dataKey="valor" fill="#8b5cf6" barSize={24} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* 6. Dimensiones SEC-E */}
      <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 mb-6">
        <h3 className="text-sm font-bold text-slate-500 mb-4 uppercase tracking-wider">Dimensiones SEC-E</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white border border-slate-200 rounded-lg p-4">
            <p className="text-xs font-bold text-slate-700 mb-1">Organización</p>
            <p className="text-2xl font-bold text-slate-800">3.72 <span className="text-sm font-normal text-slate-400">/5</span></p>
            <p className="text-[10px] text-emerald-600 font-medium flex items-center gap-1 mt-1"><CheckCircle2 className="w-3 h-3" /> 82.6% satisfechos</p>
          </div>
          <div className="bg-white border border-slate-200 rounded-lg p-4">
            <p className="text-xs font-bold text-slate-700 mb-1">Comunicación</p>
            <p className="text-2xl font-bold text-slate-800">3.88 <span className="text-sm font-normal text-slate-400">/5</span></p>
            <p className="text-[10px] text-emerald-600 font-medium flex items-center gap-1 mt-1"><CheckCircle2 className="w-3 h-3" /> 89.0% satisfechos</p>
          </div>
          <div className="bg-white border border-slate-200 rounded-lg p-4">
            <p className="text-xs font-bold text-slate-700 mb-1">Información</p>
            <p className="text-2xl font-bold text-slate-800">3.67 <span className="text-sm font-normal text-slate-400">/5</span></p>
            <p className="text-[10px] text-emerald-600 font-medium flex items-center gap-1 mt-1"><CheckCircle2 className="w-3 h-3" /> 67.7% satisfechos</p>
          </div>
        </div>
      </div>

      {/* 7. Análisis de Comentarios */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Temas Frecuentes */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-base font-bold text-slate-800 mb-6">Temas frecuentes</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-slate-50 border border-slate-100 rounded-lg">
              <div className="flex items-center gap-2"><MessageSquare className="w-4 h-4 text-slate-400" /><span className="text-xs font-medium text-slate-700">Claridad tratamiento</span></div>
              <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-xs font-bold">44</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-slate-50 border border-slate-100 rounded-lg">
              <div className="flex items-center gap-2"><MessageSquare className="w-4 h-4 text-slate-400" /><span className="text-xs font-medium text-slate-700">Dudas no resueltas</span></div>
              <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-xs font-bold">18</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-slate-50 border border-slate-100 rounded-lg">
              <div className="flex items-center gap-2"><MessageSquare className="w-4 h-4 text-slate-400" /><span className="text-xs font-medium text-slate-700">Acceso a citas</span></div>
              <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-xs font-bold">12</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-slate-50 border border-slate-100 rounded-lg">
              <div className="flex items-center gap-2"><MessageSquare className="w-4 h-4 text-slate-400" /><span className="text-xs font-medium text-slate-700">Tiempos de espera</span></div>
              <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-xs font-bold">10</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-slate-50 border border-slate-100 rounded-lg">
              <div className="flex items-center gap-2"><MessageSquare className="w-4 h-4 text-slate-400" /><span className="text-xs font-medium text-slate-700">Empatía</span></div>
              <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-xs font-bold">7</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-slate-50 border border-slate-100 rounded-lg">
              <div className="flex items-center gap-2"><MessageSquare className="w-4 h-4 text-slate-400" /><span className="text-xs font-medium text-slate-700">Telemedicina facilidad</span></div>
              <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-xs font-bold">5</span>
            </div>
          </div>
        </div>

        {/* Comentarios Recientes */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex flex-col">
          <h3 className="text-base font-bold text-slate-800 mb-6">Comentarios recientes</h3>
          <div className="flex-1 overflow-y-auto max-h-[340px] pr-2 space-y-4">
            {comentarios.map((com, index) => (
              <div key={index} className="border-b border-slate-100 pb-4 last:border-0 last:pb-0">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      com.score >= 4 ? 'bg-emerald-100 text-emerald-700' : com.score === 3 ? 'bg-amber-100 text-amber-700' : 'bg-rose-100 text-rose-700'
                    }`}>Score {com.score}</span>
                    <span className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-[10px] font-bold">{com.canal}</span>
                  </div>
                  <span className="text-[10px] text-slate-400">{com.fecha}</span>
                </div>
                <p className="text-xs text-slate-700 italic mb-2">"{com.texto}"</p>
                <span className="text-[10px] font-semibold text-blue-600 border border-blue-200 bg-blue-50 px-2 py-0.5 rounded inline-block">{com.tag}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 8. Tabla de Respuestas */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-800">Respuestas (350)</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-[11px] text-left">
            <thead className="text-slate-500 bg-slate-50/50">
              <tr>
                <th className="px-4 py-3 font-medium">Fecha</th>
                <th className="px-4 py-3 font-medium">Unidad</th>
                <th className="px-4 py-3 font-medium">Canal</th>
                <th className="px-4 py-3 font-medium">Encuestado</th>
                <th className="px-4 py-3 font-medium">Punto contacto</th>
                <th className="px-4 py-3 font-medium">Score</th>
                <th className="px-4 py-3 font-medium">Clasificación</th>
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
                  <td className="px-4 py-3 text-slate-600">{r.encuestado}</td>
                  <td className="px-4 py-3 text-slate-600">{r.punto}</td>
                  <td className="px-4 py-3 font-bold text-slate-800 flex items-center gap-1">
                    <Star className={`w-3 h-3 ${r.score >= 4 ? 'text-emerald-500 fill-emerald-500' : r.score === 3 ? 'text-amber-500 fill-amber-500' : 'text-rose-500 fill-rose-500'}`} /> {r.score}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded-sm font-bold text-[9px] ${
                      r.clasificacion === 'Satisfecho' ? 'bg-emerald-100 text-emerald-700' : r.clasificacion === 'Neutro' ? 'bg-amber-100 text-amber-700' : 'bg-rose-100 text-rose-700'
                    }`}>{r.clasificacion}</span>
                  </td>
                  <td className="px-4 py-3 text-slate-500 truncate max-w-[200px]" title={r.comentario}>{r.comentario}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}