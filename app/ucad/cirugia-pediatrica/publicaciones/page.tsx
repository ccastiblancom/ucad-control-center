"use client";

import Link from "next/link";
import { ArrowLeft, Calendar, Search, BookOpen, Target, Award, CheckCircle2, FileText } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Cell, PieChart, Pie } from "recharts";

// Datos: Distribución de Publicaciones por Cuartil (SJR/JCR)
const dataCuartiles = [
  { name: 'Q1 (Alto Impacto)', valor: 5, color: '#6366f1' },
  { name: 'Q2', valor: 4, color: '#8b5cf6' },
  { name: 'Q3', valor: 2, color: '#a855f7' },
  { name: 'Otras / Sin indexar', valor: 1, color: '#cbd5e1' },
];

// Datos: Tendencia Anual de Publicaciones Indexadas
const dataTendenciaAnual = [
  { year: '2022', q1: 1, q2: 1, q3: 0 },
  { year: '2023', q1: 2, q2: 0, q3: 1 },
  { year: '2024', q1: 1, q2: 2, q3: 1 },
  { year: '2025', q1: 3, q2: 1, q3: 0 },
  { year: '2026', q1: 2, q2: 2, q3: 1 }, // Año en curso
];

// Registro de Artículos Científicos
const logArticulos = [
  { id: "PUB-2026-01", titulo: "Manejo laparoscópico de quistes de colédoco: Serie de 50 casos", revista: "Journal of Pediatric Surgery", cuartil: "Q1", autor: "Dr. Carlos Mesa", estado: "Publicado", fecha: "15/02/2026" },
  { id: "PUB-2026-02", titulo: "Resultados a largo plazo en atresia biliar post-Kasai", revista: "Pediatric Surgery International", cuartil: "Q2", autor: "Dra. Ana López", estado: "Publicado", fecha: "10/04/2026" },
  { id: "PUB-2026-03", titulo: "Uso de realidad virtual en el manejo del dolor postquirúrgico", revista: "European Journal of Pediatric Surgery", cuartil: "Q1", autor: "Dr. Luis Pérez", estado: "Aceptado", fecha: "22/05/2026" },
  { id: "PUB-2026-04", titulo: "Complicaciones raras en apendicitis perforada", revista: "Revista Colombiana de Cirugía", cuartil: "Q3", autor: "Dra. Camila Ruiz", estado: "En Revisión", fecha: "05/06/2026" },
];

export default function PublicacionesDashboard() {
  
  // Lógica de Gestión Gerencial
  const metaAnual = 4; // Meta de artículos indexados Q1-Q3 por año
  const publicacionesActuales = 5; // Total de este año en Q1, Q2 y Q3
  const publicacionesQ1 = 2; // Artículos de máximo impacto
  
  // Regla institucional: Tope del 100% para indicadores de cumplimiento
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
          <Link href="/ucad/cirugia-pediatrica" className="p-2 hover:bg-white/80 rounded-full transition-colors flex items-center gap-2 text-sm font-medium text-slate-600 bg-white/50 border border-slate-200 shadow-sm">
            <ArrowLeft className="w-4 h-4" /> Volver
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-[#324D6D] tracking-tight">Publicaciones Científicas Indexadas (Q1, Q2, Q3)</h1>
            <p className="text-sm text-slate-500">Unidad de Cirugía Pediátrica • Investigación y Docencia • Producción Académica</p>
          </div>
        </div>

        {/* Filtros */}
        <div className="flex flex-wrap items-center gap-4 mb-8 text-sm">
          <div className="bg-white/90 backdrop-blur-sm px-3 py-2 rounded-xl border border-slate-200 shadow-sm flex items-center gap-2">
            <Calendar className="w-4 h-4 text-slate-400" />
            <select className="bg-transparent outline-none cursor-pointer font-medium">
              <option>Año 2026</option>
              <option>Año 2025</option>
            </select>
          </div>
          <div className="bg-white/90 backdrop-blur-sm px-3 py-2 rounded-xl border border-slate-200 shadow-sm flex-1 max-w-xs flex items-center gap-2">
            <Search className="w-4 h-4 text-slate-400" />
            <input type="text" placeholder="Buscar por título, autor o revista..." className="bg-transparent outline-none w-full" />
          </div>
        </div>

        {/* KPIs Estratégicos */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between border-l-4 border-l-violet-600">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Indexadas (Año)</p>
              <p className="text-3xl font-bold text-slate-800">{publicacionesActuales}</p>
            </div>
            <BookOpen className="w-8 h-8 text-violet-600 opacity-20" />
          </div>
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between border-l-4 border-l-blue-500">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Alto Impacto (Q1)</p>
              <p className="text-3xl font-bold text-blue-600">{publicacionesQ1}</p>
            </div>
            <Award className="w-8 h-8 text-blue-500 opacity-20" />
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
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Cumplimiento Meta</p>
              <p className="text-3xl font-bold text-emerald-600">{cumplimientoMostrado}%</p>
            </div>
            <CheckCircle2 className="w-8 h-8 text-emerald-500 opacity-20" />
          </div>
        </div>

        {/* Gráficas */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          
          {/* Gráfico de Torta: Distribución por Cuartil */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="text-sm font-bold text-slate-700 mb-1">Calidad Científica (SJR/JCR)</h3>
            <p className="text-[10px] text-slate-400 mb-6">Distribución histórica según el cuartil de la revista</p>
            <div className="h-64 w-full relative flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={dataCuartiles} innerRadius={60} outerRadius={85} paddingAngle={2} dataKey="valor" stroke="none">
                    {dataCuartiles.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <RechartsTooltip formatter={(value) => [`${value} Publicaciones`, 'Cantidad']} />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute flex flex-col items-center">
                <span className="text-3xl font-bold text-violet-600">12</span>
                <span className="text-[9px] text-slate-500 font-bold uppercase tracking-tighter">Histórico Q1-Q3</span>
              </div>
            </div>
          </div>

          {/* Gráfico de Barras Apiladas: Evolución Anual */}
          <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="text-sm font-bold text-slate-700 mb-1">Evolución Anual por Impacto</h3>
            <p className="text-[10px] text-slate-400 mb-6">Crecimiento sostenido de la producción académica de la unidad</p>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dataTendenciaAnual} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{fontSize: 12}} />
                  <YAxis domain={[0, 6]} axisLine={false} tickLine={false} tick={{fontSize: 10}} />
                  <RechartsTooltip cursor={{ fill: '#f8fafc' }} />
                  <Bar dataKey="q1" name="Revistas Q1" stackId="a" fill="#6366f1" barSize={35} />
                  <Bar dataKey="q2" name="Revistas Q2" stackId="a" fill="#8b5cf6" />
                  <Bar dataKey="q3" name="Revistas Q3" stackId="a" fill="#a855f7" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Tabla Detallada: Registro de Artículos */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-50 bg-violet-50/30 flex justify-between items-center">
            <h3 className="text-sm font-bold text-violet-800 flex items-center gap-2">
              <FileText className="w-4 h-4" /> Bitácora de Producción Científica
            </h3>
            <button className="text-[10px] font-bold text-violet-600 bg-white px-3 py-1.5 rounded-lg border border-violet-200">Exportar Referencias</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="text-slate-500 border-b border-slate-100 uppercase tracking-wider font-semibold bg-slate-50/50">
                  <th className="px-6 py-4 w-1/3">Título de la Publicación</th>
                  <th className="px-6 py-4">Revista Indexada</th>
                  <th className="px-6 py-4 text-center">Cuartil</th>
                  <th className="px-6 py-4">Autor Principal (UCAD)</th>
                  <th className="px-6 py-4 text-right">Estado / Fecha</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {logArticulos.map((p, i) => (
                  <tr key={i} className="hover:bg-slate-50 transition-colors text-slate-600">
                    <td className="px-6 py-4 font-bold text-slate-700 leading-relaxed">{p.titulo}</td>
                    <td className="px-6 py-4 italic text-slate-600">{p.revista}</td>
                    <td className="px-6 py-4 text-center">
                      <span className={`px-2 py-1 rounded-md font-bold text-[10px] ${
                        p.cuartil === 'Q1' ? 'bg-indigo-100 text-indigo-700' : 
                        p.cuartil === 'Q2' ? 'bg-violet-100 text-violet-700' : 
                        'bg-purple-100 text-purple-700'
                      }`}>
                        {p.cuartil}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-medium">{p.autor}</td>
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