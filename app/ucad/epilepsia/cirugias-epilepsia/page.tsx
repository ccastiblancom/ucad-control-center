"use client";

import Link from "next/link";
import { ArrowLeft, Calendar, Filter, Search, Activity, UserPlus, Scissors, Clock, AlertTriangle, CheckCircle2 } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

// Datos de prueba
const dataFases = [
  { name: 'Remisión a Evaluación', dias: 45 },
  { name: 'Pruebas Pre-Qx', dias: 60 },
  { name: 'Junta Quirúrgica', dias: 15 },
  { name: 'Programación a Cirugía', dias: 30 },
];

const dataEngel = [
  { name: 'Clase I (Libre de crisis)', value: 65, color: '#10b981' },
  { name: 'Clase II (Raras crisis)', value: 20, color: '#3b82f6' },
  { name: 'Clase III (Mejoría notable)', value: 10, color: '#f59e0b' },
  { name: 'Clase IV (Sin mejoría)', value: 5, color: '#ef4444' },
];

const dataTipoProcedimiento = [
  { name: 'Resección Focal', casos: 8 },
  { name: 'Implante VNS', casos: 5 },
  { name: 'Hemisferectomía', casos: 2 },
  { name: 'Callosotomía', casos: 1 },
];

const pacientes = [
  { doc: "1001234567", paciente: "Ana Martínez López", edad: "8 años", procedimiento: "Resección Focal", fechaQx: "15/01/2024", engel: "Clase I", complicacion: "Ninguna" },
  { doc: "1002345678", paciente: "Luis García Pérez", edad: "12 años", procedimiento: "Hemisferectomía", fechaQx: "28/01/2024", engel: "Clase II", complicacion: "Fiebre Post-Qx" },
  { doc: "1003456789", paciente: "Sofía Rodríguez Castro", edad: "6 años", procedimiento: "Implante VNS", fechaQx: "10/02/2024", engel: "Clase III", complicacion: "Ninguna" },
  { doc: "1004567890", paciente: "Diego Fernández Torres", edad: "10 años", procedimiento: "Resección Focal", fechaQx: "22/02/2024", engel: "Clase I", complicacion: "Ninguna" },
  { doc: "1005678901", paciente: "María Hernández Silva", edad: "14 años", procedimiento: "Callosotomía", fechaQx: "05/03/2024", engel: "Clase IV", complicacion: "Infección de herida" },
  { doc: "1006789012", paciente: "Juan López Moreno", edad: "7 años", procedimiento: "Implante VNS", fechaQx: "En espera", engel: "N/A", complicacion: "N/A" },
];

export default function CirugiasEpilepsiaDashboard() {
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
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Cirugías de Epilepsia</h1>
          <p className="text-sm text-slate-500">UCAD Epilepsia • Programa de Cirugía para Epilepsia Refractaria</p>
        </div>
      </div>

      {/* 2. Barra de Filtros */}
      <div className="flex flex-wrap items-center gap-4 mb-8 text-sm text-slate-600">
        <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-md border border-slate-200 shadow-sm"><Calendar className="w-4 h-4 text-slate-400" /><select className="bg-transparent outline-none cursor-pointer"><option>Últimos 12 meses</option></select></div>
        <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-md border border-slate-200 shadow-sm"><Filter className="w-4 h-4 text-slate-400" /><select className="bg-transparent outline-none cursor-pointer"><option>Todos los procedimientos</option></select></div>
        <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-md border border-slate-200 shadow-sm flex-1 max-w-md"><Search className="w-4 h-4 text-slate-400" /><input type="text" placeholder="Buscar por documento o nombre" className="w-full bg-transparent outline-none" /></div>
      </div>

      {/* 3. KPIs Superiores */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 border-t-4 border-t-blue-500 flex flex-col justify-between">
          <div className="p-1.5 bg-blue-50 rounded-md w-fit mb-2"><UserPlus className="w-4 h-4 text-blue-600" /></div>
          <p className="text-xs text-slate-500 mb-1">Pacientes Remitidos</p>
          <p className="text-2xl font-bold text-slate-800">24</p>
          <p className="text-[10px] text-slate-400">candidatos en evaluación</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 border-t-4 border-t-emerald-500 flex flex-col justify-between">
          <div className="p-1.5 bg-emerald-50 rounded-md w-fit mb-2"><Scissors className="w-4 h-4 text-emerald-600" /></div>
          <p className="text-xs text-slate-500 mb-1">Pacientes Operados</p>
          <p className="text-2xl font-bold text-slate-800">16</p>
          <p className="text-[10px] text-slate-400">tasa de conversión 66.6%</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 border-t-4 border-t-teal-500 flex flex-col justify-between">
          <div className="p-1.5 bg-teal-50 rounded-md w-fit mb-2"><CheckCircle2 className="w-4 h-4 text-teal-600" /></div>
          <p className="text-xs text-slate-500 mb-1">Éxito Clínico (Engel I & II)</p>
          <p className="text-2xl font-bold text-slate-800">85%</p>
          <p className="text-[10px] text-slate-400">reducción significativa de crisis</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 border-t-4 border-t-rose-500 flex flex-col justify-between">
          <div className="p-1.5 bg-rose-50 rounded-md w-fit mb-2"><AlertTriangle className="w-4 h-4 text-rose-600" /></div>
          <p className="text-xs text-slate-500 mb-1">Complicaciones Qx</p>
          <p className="text-2xl font-bold text-slate-800">2 <span className="text-sm font-normal text-slate-500">(12.5%)</span></p>
          <p className="text-[10px] text-slate-400">eventos adversos reportados</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 border-t-4 border-t-indigo-500 flex flex-col justify-between">
          <div className="p-1.5 bg-indigo-50 rounded-md w-fit mb-2"><Clock className="w-4 h-4 text-indigo-600" /></div>
          <p className="text-xs text-slate-500 mb-1">Tiempo Total Promedio</p>
          <p className="text-2xl font-bold text-slate-800">150</p>
          <p className="text-[10px] text-slate-400">días (remisión a cirugía)</p>
        </div>
      </div>

      {/* 4. Gráficos Principales */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        
        {/* Tiempos de Fases */}
        <div className="lg:col-span-1 bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-base font-bold text-slate-800 mb-1">Tiempos por Fase Quirúrgica</h3>
          <p className="text-xs text-slate-500 mb-6">Promedio de días en cada etapa del proceso</p>
          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart layout="vertical" data={dataFases} margin={{ top: 0, right: 20, left: 20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} width={110} />
                <Tooltip cursor={{ fill: '#f1f5f9' }} />
                <Bar dataKey="dias" fill="#6366f1" barSize={20} radius={[0, 4, 4, 0]} name="Días" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Control de Crisis (Engel) */}
        <div className="lg:col-span-1 bg-white p-6 rounded-xl shadow-sm border border-slate-200 relative">
          <h3 className="text-base font-bold text-slate-800 mb-1">Control de Crisis Post-Qx</h3>
          <p className="text-xs text-slate-500 mb-4">Clasificación en Escala de Engel</p>
          
          <div className="h-48 w-full relative flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={dataEngel} innerRadius={50} outerRadius={80} paddingAngle={2} dataKey="value" stroke="none">
                  {dataEngel.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute top-4 left-4 text-[10px] font-bold text-emerald-600">Clase I: 65%</div>
            <div className="absolute bottom-4 left-4 text-[10px] font-bold text-blue-600">Clase II: 20%</div>
            <div className="absolute top-4 right-4 text-[10px] font-bold text-amber-500">Clase III: 10%</div>
            <div className="absolute bottom-4 right-4 text-[10px] font-bold text-rose-500">Clase IV: 5%</div>
          </div>
        </div>

        {/* Tipo de Procedimiento */}
        <div className="lg:col-span-1 bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-base font-bold text-slate-800 mb-1">Tipos de Procedimientos</h3>
          <p className="text-xs text-slate-500 mb-6">Distribución de cirugías realizadas</p>
          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dataTipoProcedimiento} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" tick={{ fontSize: 9 }} axisLine={false} tickLine={false} interval={0} />
                <YAxis tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                <Tooltip cursor={{ fill: '#f1f5f9' }} />
                <Bar dataKey="casos" fill="#0ea5e9" radius={[4, 4, 0, 0]} name="Casos" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* 5. Tabla de Pacientes */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-800">Registro de Pacientes del Programa (24)</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="text-slate-500 bg-slate-50/50">
              <tr>
                <th className="px-4 py-3 font-medium">Documento</th>
                <th className="px-4 py-3 font-medium">Paciente</th>
                <th className="px-4 py-3 font-medium">Edad</th>
                <th className="px-4 py-3 font-medium">Procedimiento</th>
                <th className="px-4 py-3 font-medium">Fecha Cirugía</th>
                <th className="px-4 py-3 font-medium text-center">Escala Engel</th>
                <th className="px-4 py-3 font-medium">Complicación</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {pacientes.map((p, index) => (
                <tr key={index} className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-medium text-slate-800">{p.doc}</td>
                  <td className="px-4 py-3 text-slate-700">{p.paciente}</td>
                  <td className="px-4 py-3 text-slate-600">{p.edad}</td>
                  <td className="px-4 py-3 font-semibold text-blue-600">{p.procedimiento}</td>
                  <td className="px-4 py-3 text-slate-600">{p.fechaQx}</td>
                  <td className="px-4 py-3 text-center">
                    <span className={`px-2 py-0.5 rounded-sm font-bold text-[10px] uppercase border ${
                      p.engel === 'Clase I' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 
                      p.engel === 'Clase II' ? 'bg-blue-50 text-blue-700 border-blue-200' : 
                      p.engel === 'Clase III' ? 'bg-amber-50 text-amber-700 border-amber-200' : 
                      p.engel === 'Clase IV' ? 'bg-rose-50 text-rose-700 border-rose-200' : 
                      'bg-slate-50 text-slate-500 border-slate-200'
                    }`}>{p.engel}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded-sm font-bold text-[10px] ${
                      p.complicacion === 'Ninguna' || p.complicacion === 'N/A' ? 'text-slate-400' : 'bg-rose-100 text-rose-700'
                    }`}>{p.complicacion}</span>
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