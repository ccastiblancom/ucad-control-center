"use client";

import Link from "next/link";
import { ArrowLeft, Calendar, Search, Award, Target, CheckCircle2, Users, Star, GraduationCap } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Cell, PieChart, Pie } from "recharts";

// Datos: Composición del Equipo de Investigación (Categorías Minciencias)
const dataInvestigadores = [
  { name: 'Investigador Senior', valor: 2, color: '#4338ca' },
  { name: 'Investigador Asociado', valor: 3, color: '#6366f1' },
  { name: 'Investigador Junior', valor: 5, color: '#818cf8' },
  { name: 'Integrante / Semillero', valor: 8, color: '#c7d2fe' },
];

// Datos: Evolución Histórica de la Calificación del Grupo (Puntaje simulado para gráfica)
const dataEvolucionGrupo = [
  { convocatoria: '2019', categoria: 'C', puntaje: 25 },
  { convocatoria: '2021', categoria: 'B', puntaje: 50 },
  { convocatoria: '2024', categoria: 'A', puntaje: 75 },
  { convocatoria: '2026', categoria: 'A1', puntaje: 100 }, // Año actual
];

// Registro del Equipo de Investigación
const logEquipo = [
  { id: "INV-001", nombre: "Dr. Carlos Mesa", rol: "Líder de Grupo", categoriaCvLAC: "Investigador Senior", proyectosActivos: 3, estado: "Vigente" },
  { id: "INV-002", nombre: "Dra. Ana López", rol: "Coinvestigadora", categoriaCvLAC: "Investigador Asociado", proyectosActivos: 2, estado: "Vigente" },
  { id: "INV-005", nombre: "Dr. Luis Pérez", rol: "Coinvestigador", categoriaCvLAC: "Investigador Junior", proyectosActivos: 1, estado: "Vigente" },
  { id: "INV-010", nombre: "Enf. Martha Ruiz", rol: "Asistente Investigación", categoriaCvLAC: "Integrante Vinculado", proyectosActivos: 2, estado: "En Formación" },
];

export default function CalificacionMincienciasDashboard() {
  
  // Lógica de Gestión Gerencial
  // Escala Minciencias: Reconocido (1), C (2), B (3), A (4), A1 (5)
  const valorMeta = 4; // Meta: Categoría A
  const valorActual = 5; // Realidad: Categoría A1 (Superó la meta)
  
  // Regla institucional PMO: Tope del 100% para indicadores de cumplimiento en reportes
  const calculoCumplimiento = Math.round((valorActual / valorMeta) * 100);
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
            <h1 className="text-2xl font-bold text-[#324D6D] tracking-tight">Calificación Grupo de Investigación (Minciencias)</h1>
            <p className="text-sm text-slate-500">Unidad de Cirugía Pediátrica • Investigación y Docencia • Prestigio Académico</p>
          </div>
        </div>

        {/* KPIs Estratégicos */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between border-l-4 border-l-indigo-600">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Categoría Actual</p>
              <p className="text-3xl font-bold text-indigo-700">A1</p>
            </div>
            <Award className="w-8 h-8 text-indigo-600 opacity-20" />
          </div>
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between border-l-4 border-l-blue-500">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Investigadores (CvLAC)</p>
              <p className="text-3xl font-bold text-blue-600">18</p>
            </div>
            <Users className="w-8 h-8 text-blue-500 opacity-20" />
          </div>
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between border-l-4 border-l-slate-400">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Meta Institucional</p>
              <p className="text-3xl font-bold text-slate-800">Cat. A</p>
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
          
          {/* Gráfico de Torta: Composición del Equipo */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="text-sm font-bold text-slate-700 mb-1">Estructura del Equipo</h3>
            <p className="text-[10px] text-slate-400 mb-6">Categorización individual de investigadores según Minciencias</p>
            <div className="h-64 w-full relative flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={dataInvestigadores} innerRadius={60} outerRadius={85} paddingAngle={2} dataKey="valor" stroke="none">
                    {dataInvestigadores.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <RechartsTooltip formatter={(value) => [`${value} Investigadores`, 'Cantidad']} />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute flex flex-col items-center">
                <span className="text-3xl font-bold text-indigo-700">18</span>
                <span className="text-[9px] text-slate-500 font-bold uppercase tracking-tighter">Miembros</span>
              </div>
            </div>
          </div>

          {/* Gráfico de Barras: Evolución Histórica */}
          <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="text-sm font-bold text-slate-700 mb-1">Escalafón Histórico del Grupo</h3>
            <p className="text-[10px] text-slate-400 mb-6">Evolución de la calificación en las convocatorias nacionales de medición</p>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dataEvolucionGrupo} margin={{ top: 20, right: 30, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="convocatoria" axisLine={false} tickLine={false} tick={{fontSize: 12}} />
                  <YAxis hide />
                  <RechartsTooltip cursor={{ fill: '#f8fafc' }} formatter={(value, name, props) => [props.payload.categoria, 'Categoría Obtenida']} />
                  <Bar dataKey="puntaje" radius={[6, 6, 0, 0]} barSize={50}>
                    {dataEvolucionGrupo.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.categoria === 'A1' ? '#4f46e5' : '#818cf8'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Tabla Detallada: Registro de Investigadores */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-50 bg-indigo-50/30 flex justify-between items-center">
            <h3 className="text-sm font-bold text-indigo-800 flex items-center gap-2">
              <GraduationCap className="w-4 h-4" /> Directorio de Investigadores (GrupLAC / CvLAC)
            </h3>
            <button className="text-[10px] font-bold text-indigo-600 bg-white px-3 py-1.5 rounded-lg border border-indigo-200">Actualizar CvLACs</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="text-slate-500 border-b border-slate-100 uppercase tracking-wider font-semibold bg-slate-50/50">
                  <th className="px-6 py-4">ID Investigador</th>
                  <th className="px-6 py-4">Nombre Completo</th>
                  <th className="px-6 py-4">Rol en el Grupo</th>
                  <th className="px-6 py-4 text-center">Categoría Minciencias</th>
                  <th className="px-6 py-4 text-center">Proyectos Activos</th>
                  <th className="px-6 py-4 text-right">Estatus</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {logEquipo.map((p, i) => (
                  <tr key={i} className="hover:bg-slate-50 transition-colors text-slate-600">
                    <td className="px-6 py-4 font-bold">{p.id}</td>
                    <td className="px-6 py-4 font-medium text-slate-800">{p.nombre}</td>
                    <td className="px-6 py-4 text-slate-500 italic">{p.rol}</td>
                    <td className="px-6 py-4 text-center">
                      <span className={`px-2 py-1 rounded-md font-bold text-[10px] ${
                        p.categoriaCvLAC.includes('Senior') ? 'bg-indigo-100 text-indigo-700' : 
                        p.categoriaCvLAC.includes('Asociado') ? 'bg-blue-100 text-blue-700' : 
                        p.categoriaCvLAC.includes('Junior') ? 'bg-sky-100 text-sky-700' :
                        'bg-slate-100 text-slate-600'
                      }`}>
                        {p.categoriaCvLAC}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center font-bold text-slate-700">{p.proyectosActivos}</td>
                    <td className="px-6 py-4 text-right">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        p.estado === 'Vigente' ? 'text-emerald-600 bg-emerald-50' : 'text-amber-600 bg-amber-50'
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