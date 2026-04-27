"use client";

import Link from "next/link";
import { ArrowLeft, Calendar, Filter, Search, BookOpen, Target, GraduationCap, CheckCircle2, FileText } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, LineChart, Line, Cell, ComposedChart } from "recharts";

// Datos de Satisfacción por Ejes Temáticos Educativos
const dataTemas = [
  { name: 'Manejo de Quimioterapia', valor: 98, color: '#3b82f6' }, // Azul
  { name: 'Signos de Alarma', valor: 95, color: '#ef4444' }, // Rojo
  { name: 'Nutrición Oncológica', valor: 92, color: '#10b981' }, // Verde
  { name: 'Cuidados del Catéter', valor: 88, color: '#8b5cf6' }, // Púrpura
];

// Tendencia Mensual: Sesiones impartidas vs Nivel de Satisfacción
const dataTendenciaEducacion = [
  { mes: 'Ene', sesiones: 45, satisfaccion: 90 },
  { mes: 'Feb', sesiones: 52, satisfaccion: 92 },
  { mes: 'Mar', sesiones: 48, satisfaccion: 91 },
  { mes: 'Abr', sesiones: 60, satisfaccion: 94 },
  { mes: 'May', sesiones: 55, satisfaccion: 96 },
  { mes: 'Jun', sesiones: 65, satisfaccion: 98.2 },
];

// Registro Cualitativo de Educación
const sesionesEducativas = [
  { id: "EDU-26-112", paciente: "Andrés Felipe Ruiz", tema: "Signos de Alarma (Neutropenia)", educador: "Enf. Patricia Gómez", calificacion: "5/5", estado: "Excelente" },
  { id: "EDU-26-115", paciente: "Mariana Gómez", tema: "Cuidados del Catéter (PICC)", educador: "Enf. Carlos Díaz", calificacion: "4/5", estado: "Bueno" },
  { id: "EDU-26-118", paciente: "Samuel Restrepo", tema: "Nutrición Oncológica", educador: "Nut. Laura Santos", calificacion: "3/5", estado: "Refuerzo Requerido" },
  { id: "EDU-26-120", paciente: "Elena Villalba", tema: "Manejo de Quimioterapia Oral", educador: "Q.F. Roberto Silva", calificacion: "5/5", estado: "Excelente" },
];

export default function SatisfaccionEducacionDashboard() {
  
  // Variables de Gestión Gerencial
  const satisfaccionActual = 98.2;
  const metaSatisfaccion = 95.0;
  
  // Regla institucional: Tope del 100% para indicadores de cumplimiento
  const calculoCumplimiento = Math.round((satisfaccionActual / metaSatisfaccion) * 100);
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
            <h1 className="text-2xl font-bold text-[#324D6D] tracking-tight">Satisfacción frente a la Educación Recibida</h1>
            <p className="text-sm text-slate-500">Unidad de Leucemia • Experiencia al Cliente (Empoderamiento Familiar)</p>
          </div>
        </div>

        {/* Filtros */}
        <div className="flex flex-wrap items-center gap-4 mb-8 text-sm">
          <div className="bg-white/90 backdrop-blur-sm px-3 py-2 rounded-xl border border-slate-200 shadow-sm flex items-center gap-2">
            <Calendar className="w-4 h-4 text-slate-400" />
            <select className="bg-transparent outline-none cursor-pointer font-medium"><option>Mes Actual</option></select>
          </div>
          <div className="bg-white/90 backdrop-blur-sm px-3 py-2 rounded-xl border border-slate-200 shadow-sm flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-400" />
            <select className="bg-transparent outline-none cursor-pointer font-medium"><option>Todos los Temas</option></select>
          </div>
        </div>

        {/* KPIs Estratégicos */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between border-l-4 border-l-blue-500">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Familias Educadas</p>
              <p className="text-3xl font-bold text-slate-800">65</p>
            </div>
            <GraduationCap className="w-8 h-8 text-blue-500 opacity-20" />
          </div>
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between border-l-4 border-l-emerald-500">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Satisfacción Global</p>
              <p className="text-3xl font-bold text-emerald-600">{satisfaccionActual}%</p>
            </div>
            <BookOpen className="w-8 h-8 text-emerald-500 opacity-20" />
          </div>
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between border-l-4 border-l-slate-400">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Meta Institucional</p>
              <p className="text-3xl font-bold text-slate-800">&gt; {metaSatisfaccion}%</p>
            </div>
            <Target className="w-8 h-8 text-slate-400 opacity-20" />
          </div>
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between border-l-4 border-l-indigo-500">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Cumplimiento</p>
              <p className="text-3xl font-bold text-indigo-600">{cumplimientoMostrado}%</p>
            </div>
            <CheckCircle2 className="w-8 h-8 text-indigo-500 opacity-20" />
          </div>
        </div>

        {/* Gráficas */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Gráfico de Barras: Satisfacción por Ejes Temáticos */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="text-sm font-bold text-slate-700 mb-1">Claridad por Tema Educativo</h3>
            <p className="text-[10px] text-slate-400 mb-6">Nivel de comprensión y utilidad percibida por las familias</p>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dataTemas} layout="vertical" margin={{ left: -10, right: 30 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                  <XAxis type="number" domain={[0, 100]} hide />
                  <YAxis dataKey="name" type="category" tick={{fontSize: 10, fontWeight: 600}} axisLine={false} tickLine={false} width={120} />
                  <RechartsTooltip cursor={{fill: '#f8fafc'}} formatter={(value) => [`${value}%`, 'Satisfacción']} />
                  <Bar dataKey="valor" radius={[0, 4, 4, 0]} barSize={25}>
                    {dataTemas.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Gráfico Compuesto: Sesiones vs Satisfacción */}
          <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="text-sm font-bold text-slate-700 mb-1">Evolución del Programa Educativo</h3>
            <p className="text-[10px] text-slate-400 mb-6">Volumen de sesiones impartidas vs % de satisfacción global</p>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={dataTendenciaEducacion} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="mes" axisLine={false} tickLine={false} tick={{fontSize: 12}} />
                  <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{fontSize: 10}} />
                  <YAxis yAxisId="right" orientation="right" domain={[80, 100]} axisLine={false} tickLine={false} tick={{fontSize: 10}} hide />
                  <RechartsTooltip />
                  <Bar yAxisId="left" dataKey="sesiones" name="Sesiones Educativas" fill="#e2e8f0" barSize={30} radius={[4, 4, 0, 0]} />
                  <Line yAxisId="right" type="monotone" dataKey="satisfaccion" name="% Satisfacción" stroke="#3b82f6" strokeWidth={3} dot={{ r: 5, fill: "#3b82f6", strokeWidth: 2, stroke: "#fff" }} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Tabla Detallada: Registro de Educación */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-50 bg-blue-50/30 flex justify-between items-center">
            <h3 className="text-sm font-bold text-blue-800 flex items-center gap-2">
              <FileText className="w-4 h-4" /> Bitácora de Sesiones Educativas a Familias
            </h3>
            <button className="text-[10px] font-bold text-blue-600 bg-white px-3 py-1.5 rounded-lg border border-blue-200">Exportar Evaluaciones</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="text-slate-500 border-b border-slate-100 uppercase tracking-wider font-semibold bg-slate-50/50">
                  <th className="px-6 py-4">ID Sesión</th>
                  <th className="px-6 py-4">Paciente / Familia</th>
                  <th className="px-6 py-4">Eje Temático</th>
                  <th className="px-6 py-4">Educador a Cargo</th>
                  <th className="px-6 py-4 text-center">Calificación</th>
                  <th className="px-6 py-4 text-right">Estatus de Comprensión</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {sesionesEducativas.map((p, i) => (
                  <tr key={i} className="hover:bg-slate-50 transition-colors text-slate-600">
                    <td className="px-6 py-4 font-bold">{p.id}</td>
                    <td className="px-6 py-4 font-medium text-slate-800">{p.paciente}</td>
                    <td className="px-6 py-4 text-blue-600 font-medium">{p.tema}</td>
                    <td className="px-6 py-4 text-slate-500 italic">{p.educador}</td>
                    <td className="px-6 py-4 text-center font-bold text-slate-700">{p.calificacion}</td>
                    <td className="px-6 py-4 text-right">
                      <span className={`px-2 py-1 rounded-md font-bold text-[10px] ${
                        p.estado === 'Excelente' ? 'text-emerald-600 bg-emerald-50' : 
                        p.estado === 'Bueno' ? 'text-blue-600 bg-blue-50' : 
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