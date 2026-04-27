"use client";

import Link from "next/link";
import { ArrowLeft, Calendar, Filter, Search, BookOpen, Target, Award, CheckCircle2, FileText } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, LineChart, Line, Cell, PieChart, Pie } from "recharts";

// Tipología de Publicaciones
const dataTiposPublicacion = [
  { name: 'Artículos Originales', valor: 8, color: '#8b5cf6' },
  { name: 'Reportes de Caso', valor: 4, color: '#a78bfa' },
  { name: 'Revisiones', valor: 2, color: '#c4b5fd' },
  { name: 'Guías Clínicas', valor: 1, color: '#ede9fe' },
];

// Tendencia Anual de Publicaciones
const dataTendenciaAnual = [
  { year: '2022', publicaciones: 1 },
  { year: '2023', publicaciones: 2 },
  { year: '2024', publicaciones: 4 },
  { year: '2025', publicaciones: 5 },
  { year: '2026', publicaciones: 3 }, // Año en curso
];

// Registro detallado de la producción científica
const logPublicaciones = [
  { id: "PUB-26-01", titulo: "Supervivencia global en LLA pediátrica: Cohorte 5 años", autorPrincipal: "Dr. Carlos Mesa", revista: "Pediatric Blood & Cancer", cuartil: "Q1", estado: "Publicado", fecha: "15/02/2026" },
  { id: "PUB-26-02", titulo: "Manejo de toxicidad por L-Asparaginasa", autorPrincipal: "Dra. Ana López", revista: "Journal of Clinical Oncology", cuartil: "Q1", estado: "En Revisión", fecha: "10/04/2026" },
  { id: "PUB-26-03", titulo: "Caso Clínico: Recaída extramedular atípica en LLA-T", autorPrincipal: "Dr. Luis Pérez", revista: "Leukemia Research Reports", cuartil: "Q3", estado: "Aceptado", fecha: "22/05/2026" },
  { id: "PUB-25-05", titulo: "Impacto del equipo multidisciplinario en adherencia", autorPrincipal: "Psic. María Gómez", revista: "Psycho-Oncology", cuartil: "Q2", estado: "Publicado", fecha: "18/11/2025" },
];

export default function PublicacionesCientificasDashboard() {
  
  // Lógica de cumplimiento con tope conservador del 100%
  const metaAnual = 2;
  const publicacionesActuales = 3;
  const calculoCumplimiento = Math.round((publicacionesActuales / metaAnual) * 100);
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
          <Link href="/ucad/leucemia" className="p-2 hover:bg-white/80 rounded-full transition-colors flex items-center gap-2 text-sm font-medium text-slate-600 bg-white/50 border border-slate-200 shadow-sm">
            <ArrowLeft className="w-4 h-4" /> Volver
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-[#324D6D] tracking-tight">Producción Científica en LLA</h1>
            <p className="text-sm text-slate-500">Unidad de Leucemia • Calidad de Proceso (Investigación y Academia)</p>
          </div>
        </div>

        {/* Filtros */}
        <div className="flex flex-wrap items-center gap-4 mb-8 text-sm">
          <div className="bg-white/90 backdrop-blur-sm px-3 py-2 rounded-xl border border-slate-200 shadow-sm flex items-center gap-2">
            <Calendar className="w-4 h-4 text-slate-400" />
            <select className="bg-transparent outline-none cursor-pointer font-medium">
              <option>Todos los Años</option>
              <option>2026</option>
            </select>
          </div>
          <div className="bg-white/90 backdrop-blur-sm px-3 py-2 rounded-xl border border-slate-200 shadow-sm flex-1 max-w-xs flex items-center gap-2">
            <Search className="w-4 h-4 text-slate-400" />
            <input type="text" placeholder="Buscar por título o autor..." className="bg-transparent outline-none w-full" />
          </div>
        </div>

        {/* KPIs Estratégicos */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between border-l-4 border-l-violet-500">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Histórico</p>
              <p className="text-3xl font-bold text-slate-800">15</p>
            </div>
            <BookOpen className="w-8 h-8 text-violet-500 opacity-20" />
          </div>
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between border-l-4 border-l-blue-500">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Alto Impacto (Q1/Q2)</p>
              <p className="text-3xl font-bold text-blue-600">9</p>
            </div>
            <Award className="w-8 h-8 text-blue-600 opacity-20" />
          </div>
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between border-l-4 border-l-slate-400">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Meta Anual (2026)</p>
              <p className="text-3xl font-bold text-slate-800">{metaAnual}</p>
            </div>
            <Target className="w-8 h-8 text-slate-400 opacity-20" />
          </div>
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between border-l-4 border-l-emerald-500">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Cumplimiento Meta</p>
              <p className="text-3xl font-bold text-emerald-600">{cumplimientoMostrado}%</p>
            </div>
            <CheckCircle2 className="w-8 h-8 text-emerald-600 opacity-20" />
          </div>
        </div>

        {/* Gráficas */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Gráfico de Torta: Tipos de Publicación */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="text-sm font-bold text-slate-700 mb-1">Tipología de Publicaciones</h3>
            <p className="text-[10px] text-slate-400 mb-6">Distribución de la producción científica histórica</p>
            <div className="h-64 w-full relative flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={dataTiposPublicacion} innerRadius={60} outerRadius={85} paddingAngle={2} dataKey="valor" stroke="none">
                    {dataTiposPublicacion.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <RechartsTooltip formatter={(value) => [`${value} Artículos`, 'Cantidad']} />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute flex flex-col items-center">
                <span className="text-3xl font-bold text-violet-600">15</span>
                <span className="text-[9px] text-slate-500 font-bold uppercase tracking-tighter">Artículos</span>
              </div>
            </div>
          </div>

          {/* Gráfico de Línea: Evolución Anual */}
          <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="text-sm font-bold text-slate-700 mb-1">Evolución Anual de Producción</h3>
            <p className="text-[10px] text-slate-400 mb-6">Crecimiento de publicaciones generadas por la unidad</p>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dataTendenciaAnual} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{fontSize: 12}} />
                  <YAxis domain={[0, 6]} axisLine={false} tickLine={false} tick={{fontSize: 10}} />
                  <RechartsTooltip cursor={{ fill: '#f8fafc' }} formatter={(value) => [`${value} Publicaciones`, 'Total']} />
                  <Bar dataKey="publicaciones" name="Publicaciones" fill="#8b5cf6" radius={[4, 4, 0, 0]} barSize={40} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Tabla Detallada */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-50 bg-violet-50/30 flex justify-between items-center">
            <h3 className="text-sm font-bold text-violet-800 flex items-center gap-2">
              <FileText className="w-4 h-4" /> Bitácora de Investigación
            </h3>
            <button className="text-[10px] font-bold text-violet-600 bg-white px-3 py-1.5 rounded-lg border border-violet-200">Exportar Referencias</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="text-slate-500 border-b border-slate-100 uppercase tracking-wider font-semibold bg-slate-50/50">
                  <th className="px-6 py-4 w-1/3">Título del Artículo</th>
                  <th className="px-6 py-4">Autor Principal</th>
                  <th className="px-6 py-4">Revista (Journal)</th>
                  <th className="px-6 py-4 text-center">Cuartil</th>
                  <th className="px-6 py-4 text-right">Estado / Fecha</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {logPublicaciones.map((p, i) => (
                  <tr key={i} className="hover:bg-slate-50 transition-colors text-slate-600">
                    <td className="px-6 py-4 font-bold text-slate-700 leading-relaxed">{p.titulo}</td>
                    <td className="px-6 py-4 font-medium text-slate-800">{p.autorPrincipal}</td>
                    <td className="px-6 py-4 italic text-slate-600">{p.revista}</td>
                    <td className="px-6 py-4 text-center">
                      <span className={`px-2 py-1 rounded-md font-bold text-[10px] ${
                        p.cuartil === 'Q1' || p.cuartil === 'Q2' ? 'bg-blue-50 text-blue-700' : 'bg-slate-100 text-slate-600'
                      }`}>
                        {p.cuartil}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex flex-col items-end gap-1">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          p.estado === 'Publicado' ? 'text-emerald-600 bg-emerald-50' : 
                          p.estado === 'Aceptado' ? 'text-blue-600 bg-blue-50' : 
                          'text-amber-600 bg-amber-50'
                        }`}>
                          {p.estado}
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono">{p.fecha}</span>
                      </div>
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