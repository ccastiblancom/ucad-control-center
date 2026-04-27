"use client";

import Link from "next/link";
// ¡Aquí está la corrección! Agregué CheckCircle2 y AlertCircle a la lista de importaciones
import { ArrowLeft, Calendar, Filter, Search, PersonStanding, GraduationCap, Brain, Activity, TrendingUp, CheckCircle2, AlertCircle } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from "recharts";

// Datos de prueba para gráficos
const dataLansky = [
  { name: '80-100 (Independiente)', valor: 65, color: '#10b981' },
  { name: '50-70 (Restricción Moderada)', valor: 25, color: '#f59e0b' },
  { name: '<50 (Dependencia Severa)', valor: 10, color: '#ef4444' },
];

const dataEscolaridad = [
  { name: 'Regular (Sin apoyo)', valor: 45, color: '#3b82f6' },
  { name: 'Con apoyo escolar/PIAR', valor: 35, color: '#0ea5e9' },
  { name: 'Aula Hospitalaria', valor: 8, color: '#8b5cf6' },
  { name: 'Deserción / Incapacidad', valor: 12, color: '#f43f5e' },
];

const dataEvolucion = [
  { name: 'Q1', lanskyPromedio: 68 },
  { name: 'Q2', lanskyPromedio: 72 },
  { name: 'Q3', lanskyPromedio: 75 },
  { name: 'Q4', lanskyPromedio: 78 },
];

const dataDesarrollo = [
  { name: 'Motor Grueso', normal: 70, retraso: 30 },
  { name: 'Motor Fino', normal: 65, retraso: 35 },
  { name: 'Lenguaje', normal: 55, retraso: 45 },
  { name: 'Social/Cognitivo', normal: 60, retraso: 40 },
];

const pacientesFuncionalidad = [
  { doc: "1001234567", paciente: "Ana Martínez López", edad: "8 años", dx: "G402", lansky: "90", escolaridad: "Regular", desarrollo: "Normal", apoyo: "No requiere" },
  { doc: "1002345678", paciente: "Luis García Pérez", edad: "12 años", dx: "G405", lansky: "60", escolaridad: "Con apoyo (PIAR)", desarrollo: "Retraso Lenguaje", apoyo: "Terapia Ocupacional" },
  { doc: "1003456789", paciente: "Sofía Rodríguez Castro", edad: "6 años", dx: "G409", lansky: "100", escolaridad: "Regular", desarrollo: "Normal", apoyo: "No requiere" },
  { doc: "1004567890", paciente: "Diego Fernández Torres", edad: "10 años", dx: "G402", lansky: "40", escolaridad: "Deserción", desarrollo: "Retraso Global", apoyo: "Cuidado crónico" },
  { doc: "1005678901", paciente: "María Hernández Silva", edad: "14 años", dx: "G402", lansky: "80", escolaridad: "Regular", desarrollo: "Normal", apoyo: "Psicología" },
  { doc: "1006789012", paciente: "Juan López Moreno", edad: "7 años", dx: "G405", lansky: "70", escolaridad: "Aula Hospitalaria", desarrollo: "Retraso Motor", apoyo: "Fisioterapia" },
];

export default function FuncionalidadDashboard() {
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
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Funcionalidad y Escolaridad</h1>
          <p className="text-sm text-slate-500">UCAD Epilepsia • Resultados Clínicos • Escalas de Desempeño y Calidad de Vida</p>
        </div>
      </div>

      {/* 2. Barra de Filtros */}
      <div className="flex flex-wrap items-center gap-4 mb-8 text-sm text-slate-600">
        <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-md border border-slate-200 shadow-sm"><Calendar className="w-4 h-4 text-slate-400" /><select className="bg-transparent outline-none cursor-pointer"><option>Últimos 12 meses</option></select></div>
        <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-md border border-slate-200 shadow-sm"><Filter className="w-4 h-4 text-slate-400" /><select className="bg-transparent outline-none cursor-pointer"><option>Todos los rangos de edad</option></select></div>
        <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-md border border-slate-200 shadow-sm flex-1 max-w-md"><Search className="w-4 h-4 text-slate-400" /><input type="text" placeholder="Buscar por documento o nombre" className="w-full bg-transparent outline-none" /></div>
      </div>

      {/* 3. KPIs Superiores */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200 border-l-4 border-l-emerald-50 flex items-center justify-between border-l-emerald-500">
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">Escala Lansky Promedio</p>
            <div className="flex items-end gap-2">
              <p className="text-3xl font-bold text-slate-800">78</p>
              <p className="text-xs font-bold text-emerald-500 mb-1">/ 100</p>
            </div>
          </div>
          <div className="p-3 bg-emerald-50 rounded-lg"><Activity className="w-6 h-6 text-emerald-600" /></div>
        </div>
        
        <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200 border-l-4 border-l-blue-500 flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">Escolaridad Activa</p>
            <div className="flex items-end gap-2">
              <p className="text-3xl font-bold text-slate-800">80%</p>
            </div>
            <p className="text-[10px] text-slate-400 mt-1">Con o sin apoyo educativo</p>
          </div>
          <div className="p-3 bg-blue-50 rounded-lg"><GraduationCap className="w-6 h-6 text-blue-600" /></div>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200 border-l-4 border-l-amber-500 flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">Independencia (AVD)</p>
            <div className="flex items-end gap-2">
              <p className="text-3xl font-bold text-slate-800">65%</p>
            </div>
            <p className="text-[10px] text-slate-400 mt-1">Actividades vida diaria</p>
          </div>
          <div className="p-3 bg-amber-50 rounded-lg"><PersonStanding className="w-6 h-6 text-amber-600" /></div>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200 border-l-4 border-l-purple-500 flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">Desarrollo Normal</p>
            <div className="flex items-end gap-2">
              <p className="text-3xl font-bold text-slate-800">55%</p>
            </div>
            <p className="text-[10px] text-slate-400 mt-1">Sin retraso psicomotor</p>
          </div>
          <div className="p-3 bg-purple-50 rounded-lg"><Brain className="w-6 h-6 text-purple-600" /></div>
        </div>
      </div>

      {/* 4. Gráficos Principales */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        
        {/* Gráfico 1: Escala Lansky */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-sm font-bold text-slate-800 mb-1">Nivel Funcional (Escala Lansky)</h3>
          <p className="text-[10px] text-slate-500 mb-6">Distribución de capacidad funcional</p>
          <div className="h-52 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart layout="vertical" data={dataLansky} margin={{ left: -10, right: 20 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} width={120} />
                <Tooltip cursor={{ fill: 'transparent' }} formatter={(value) => [`${value}%`, 'Pacientes']} />
                <Bar dataKey="valor" radius={[0, 4, 4, 0]} barSize={20}>
                  {dataLansky.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Gráfico 2: Escolaridad */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-sm font-bold text-slate-800 mb-1">Estado de Escolaridad</h3>
          <p className="text-[10px] text-slate-500 mb-2">Integración académica de los pacientes</p>
          <div className="h-48 w-full relative flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={dataEscolaridad} innerRadius={55} outerRadius={75} paddingAngle={2} dataKey="valor" stroke="none">
                  {dataEscolaridad.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value}%`, 'Pacientes']} />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
               <span className="text-2xl font-bold text-slate-800">80%</span>
               <span className="text-[9px] text-slate-500 uppercase font-bold">Activos</span>
            </div>
          </div>
          <div className="flex flex-wrap justify-center gap-3 mt-2">
            {dataEscolaridad.map((item, i) => (
               <div key={i} className="flex items-center gap-1 text-[9px] font-medium text-slate-600">
                 <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></div> {item.name}
               </div>
            ))}
          </div>
        </div>

        {/* Gráfico 3: Desarrollo Psicomotor */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-sm font-bold text-slate-800 mb-1">Hitos del Desarrollo</h3>
          <p className="text-[10px] text-slate-500 mb-6">Pacientes con desarrollo normal vs retraso</p>
          <div className="h-52 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dataDesarrollo} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" tick={{ fontSize: 9 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                <Tooltip cursor={{ fill: '#f8fafc' }} />
                <Bar dataKey="normal" stackId="a" fill="#2dd4bf" name="Normal (%)" radius={[0, 0, 0, 0]} barSize={25} />
                <Bar dataKey="retraso" stackId="a" fill="#f43f5e" name="Retraso (%)" radius={[4, 4, 0, 0]} barSize={25} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* 5. Tendencia Funcional & Soporte */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
         <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-sm font-bold text-slate-800">Evolución de Funcionalidad Promedio</h3>
                <p className="text-[10px] text-slate-500">Puntaje Lansky promedio a lo largo de los trimestres (Cohorte actual)</p>
              </div>
              <div className="flex items-center gap-2 text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-1 rounded">
                 <TrendingUp className="w-3 h-3" /> +10 Puntos de mejora
              </div>
            </div>
            <div className="h-48 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={dataEvolucion} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                  <YAxis domain={[50, 100]} tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                  <Tooltip />
                  <Line type="monotone" dataKey="lanskyPromedio" stroke="#10b981" strokeWidth={3} dot={{ r: 6, strokeWidth: 2, fill: "#fff" }} name="Lansky Promedio" />
                </LineChart>
              </ResponsiveContainer>
            </div>
         </div>

         <div className="lg:col-span-1 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl p-6 text-white shadow-sm flex flex-col justify-center">
            <h3 className="text-lg font-bold mb-2">Requerimientos de Soporte</h3>
            <p className="text-sm opacity-90 mb-6 leading-relaxed">El 45% de los pacientes en la UCAD requiere apoyo multidisciplinario activo para mantener su funcionalidad.</p>
            
            <div className="space-y-4">
               <div>
                  <div className="flex justify-between text-xs font-bold mb-1"><span>Terapia Física / Ocupacional</span><span>25%</span></div>
                  <div className="w-full bg-white/20 rounded-full h-1.5"><div className="bg-white h-1.5 rounded-full" style={{ width: '25%' }}></div></div>
               </div>
               <div>
                  <div className="flex justify-between text-xs font-bold mb-1"><span>Fonoaudiología</span><span>18%</span></div>
                  <div className="w-full bg-white/20 rounded-full h-1.5"><div className="bg-white h-1.5 rounded-full" style={{ width: '18%' }}></div></div>
               </div>
               <div>
                  <div className="flex justify-between text-xs font-bold mb-1"><span>Soporte Psicológico Escolar</span><span>30%</span></div>
                  <div className="w-full bg-white/20 rounded-full h-1.5"><div className="bg-white h-1.5 rounded-full" style={{ width: '30%' }}></div></div>
               </div>
            </div>
         </div>
      </div>

      {/* 6. Tabla de Detalles */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <div>
            <h3 className="text-lg font-bold text-slate-800">Detalle Clínico de Funcionalidad</h3>
          </div>
          <button className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-2 rounded-lg border border-blue-100 hover:bg-blue-100 transition-colors">
            Exportar Registro
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="text-slate-500 bg-slate-50/50">
              <tr>
                <th className="px-4 py-3 font-medium uppercase tracking-wider">Documento</th>
                <th className="px-4 py-3 font-medium uppercase tracking-wider">Paciente</th>
                <th className="px-4 py-3 font-medium uppercase tracking-wider">Edad</th>
                <th className="px-4 py-3 font-medium uppercase tracking-wider text-center">Escala Lansky</th>
                <th className="px-4 py-3 font-medium uppercase tracking-wider">Escolaridad</th>
                <th className="px-4 py-3 font-medium uppercase tracking-wider">Desarrollo</th>
                <th className="px-4 py-3 font-medium uppercase tracking-wider">Apoyo Requerido</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {pacientesFuncionalidad.map((p, index) => (
                <tr key={index} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3 font-bold text-slate-800">{p.doc}</td>
                  <td className="px-4 py-3 text-slate-700 font-medium">{p.paciente}</td>
                  <td className="px-4 py-3 text-slate-600">{p.edad}</td>
                  <td className="px-4 py-3 text-center">
                    <span className={`px-2 py-1 rounded font-bold text-[11px] ${
                      Number(p.lansky) >= 80 ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 
                      Number(p.lansky) >= 50 ? 'bg-amber-50 text-amber-700 border border-amber-100' : 
                      'bg-rose-50 text-rose-700 border border-rose-100'
                    }`}>{p.lansky}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded font-bold text-[10px] ${
                      p.escolaridad === 'Regular' ? 'text-blue-600 bg-blue-50' : 
                      p.escolaridad.includes('apoyo') ? 'text-sky-600 bg-sky-50' : 
                      p.escolaridad.includes('Hospitalaria') ? 'text-purple-600 bg-purple-50' : 
                      'text-rose-600 bg-rose-50'
                    }`}>{p.escolaridad}</span>
                  </td>
                  <td className="px-4 py-3 text-slate-600 font-medium flex items-center gap-1">
                    {p.desarrollo === 'Normal' ? <CheckCircle2 className="w-3 h-3 text-emerald-500" /> : <AlertCircle className="w-3 h-3 text-amber-500" />}
                    {p.desarrollo}
                  </td>
                  <td className="px-4 py-3 text-slate-500 text-[11px]">{p.apoyo}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}