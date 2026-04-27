"use client";

import Link from "next/link";
import { ArrowLeft, Calendar, Filter, Search, Syringe, ShieldCheck, AlertTriangle, Activity, FileText } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

// Datos de prueba basados en archivos adjuntos (Morisky, Naranjo, Hartwig)
const dataMorisky = [
  { name: 'Adherente (NO a 4 pts)', valor: 82, color: '#10b981' },
  { name: 'No Adherente', valor: 18, color: '#f43f5e' },
];

const dataNaranjo = [
  { name: 'Definitiva (≥9)', valor: 5 },
  { name: 'Probable (5-8)', valor: 25 },
  { name: 'Posible (1-4)', valor: 45 },
  { name: 'Dudosa (0)', valor: 25 },
];

const dataHartwig = [
  { name: 'Leve (Nivel 1-2)', valor: 60, color: '#3b82f6' },
  { name: 'Moderada (Nivel 3-4)', valor: 35, color: '#f59e0b' },
  { name: 'Grave (Nivel 5-7)', valor: 5, color: '#ef4444' },
];

const pacientesFarmacoterapia = [
  { doc: "1001234567", paciente: "Ana Martínez López", edad: "8 años", meds: "Levetiracetam", morisky: "Adherente", efectividad: "Crisis reducidas", ram: "Sí", naranjo: "Posible (4)", hartwig: "Leve (Nivel 1)" },
  { doc: "1002345678", paciente: "Luis García Pérez", edad: "12 años", meds: "Ácido Valproico", morisky: "No Adherente", efectividad: "Sin cambios", ram: "Sí", naranjo: "Probable (6)", hartwig: "Moderada (Nivel 3)" },
  { doc: "1003456789", paciente: "Sofía Rodríguez Castro", edad: "6 años", meds: "Lamotrigina", morisky: "Adherente", efectividad: "Crisis controladas", ram: "No", naranjo: "N/A", hartwig: "N/A" },
  { doc: "1004567890", paciente: "Diego Fernández Torres", edad: "10 años", meds: "Carbamazepina", morisky: "Adherente", efectividad: "Crisis controladas", ram: "Sí", naranjo: "Definitiva (9)", hartwig: "Grave (Nivel 5)" },
  { doc: "1005678901", paciente: "María Hernández Silva", edad: "14 años", meds: "Topiramato", morisky: "No Adherente", efectividad: "Aumento crisis", ram: "No", naranjo: "N/A", hartwig: "N/A" },
  { doc: "1006789012", paciente: "Juan López Moreno", edad: "7 años", meds: "Clobazam", morisky: "Adherente", efectividad: "Crisis reducidas", ram: "Sí", naranjo: "Posible (3)", hartwig: "Leve (Nivel 2)" },
];

export default function FarmacoterapiaDashboard() {
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
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Seguimiento Farmacoterapéutico</h1>
          <p className="text-sm text-slate-500">UCAD Epilepsia • Adherencia (Morisky), Efectividad y Seguridad (Naranjo/Hartwig)</p>
        </div>
      </div>

      {/* 2. Barra de Filtros */}
      <div className="flex flex-wrap items-center gap-4 mb-8 text-sm text-slate-600">
        <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-md border border-slate-200 shadow-sm"><Calendar className="w-4 h-4 text-slate-400" /><select className="bg-transparent outline-none cursor-pointer"><option>Últimos 12 meses</option></select></div>
        <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-md border border-slate-200 shadow-sm"><Filter className="w-4 h-4 text-slate-400" /><select className="bg-transparent outline-none cursor-pointer"><option>Todos los FAEs</option></select></div>
        <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-md border border-slate-200 shadow-sm flex-1 max-w-md"><Search className="w-4 h-4 text-slate-400" /><input type="text" placeholder="Buscar por documento o paciente" className="w-full bg-transparent outline-none" /></div>
      </div>

      {/* 3. KPIs Superiores */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200 border-l-4 border-l-emerald-500 flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wide mb-1">Adherencia al Tratamiento</p>
            <div className="flex items-end gap-2">
              <p className="text-3xl font-bold text-slate-800">82%</p>
            </div>
            <p className="text-[10px] text-emerald-600 font-semibold mt-1">Test Morisky-Green</p>
          </div>
          <div className="p-3 bg-emerald-50 rounded-lg"><ShieldCheck className="w-6 h-6 text-emerald-600" /></div>
        </div>
        
        <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200 border-l-4 border-l-blue-500 flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wide mb-1">Efectividad Terapéutica</p>
            <div className="flex items-end gap-2">
              <p className="text-3xl font-bold text-slate-800">76%</p>
            </div>
            <p className="text-[10px] text-slate-400 mt-1">Reducción de crisis reportada</p>
          </div>
          <div className="p-3 bg-blue-50 rounded-lg"><Activity className="w-6 h-6 text-blue-600" /></div>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200 border-l-4 border-l-amber-500 flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wide mb-1">Tasa de Eventos (RAM)</p>
            <div className="flex items-end gap-2">
              <p className="text-3xl font-bold text-slate-800">15%</p>
            </div>
            <p className="text-[10px] text-slate-400 mt-1">Pacientes con reportes</p>
          </div>
          <div className="p-3 bg-amber-50 rounded-lg"><AlertTriangle className="w-6 h-6 text-amber-600" /></div>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200 border-l-4 border-l-rose-500 flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wide mb-1">RAM Graves</p>
            <div className="flex items-end gap-2">
              <p className="text-3xl font-bold text-slate-800">2%</p>
            </div>
            <p className="text-[10px] text-slate-400 mt-1">Escala Hartwig (Nivel 5-7)</p>
          </div>
          <div className="p-3 bg-rose-50 rounded-lg"><Syringe className="w-6 h-6 text-rose-600" /></div>
        </div>
      </div>

      {/* 4. Gráficos Principales */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        
        {/* Gráfico 1: Test Morisky-Green */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-sm font-bold text-slate-800 mb-1">Adherencia (Morisky-Green)</h3>
          <p className="text-[10px] text-slate-500 mb-2">Evaluación del compromiso terapéutico</p>
          <div className="h-48 w-full relative flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={dataMorisky} innerRadius={55} outerRadius={75} paddingAngle={2} dataKey="valor" stroke="none">
                  {dataMorisky.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value}%`, 'Pacientes']} />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
               <span className="text-2xl font-bold text-slate-800">82%</span>
               <span className="text-[9px] text-slate-500 uppercase font-bold text-center">Adherentes</span>
            </div>
          </div>
          <div className="flex flex-col gap-1 mt-2 px-4">
            {dataMorisky.map((item, i) => (
               <div key={i} className="flex justify-between items-center text-[10px] font-medium text-slate-600">
                 <div className="flex items-center gap-1">
                   <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></div> {item.name}
                 </div>
                 <span>{item.valor}%</span>
               </div>
            ))}
          </div>
        </div>

        {/* Gráfico 2: Algoritmo de Naranjo */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-sm font-bold text-slate-800 mb-1">Causalidad RAM (Naranjo)</h3>
          <p className="text-[10px] text-slate-500 mb-6">Clasificación de probabilidad de los eventos</p>
          <div className="h-52 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dataNaranjo} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" tick={{ fontSize: 9 }} axisLine={false} tickLine={false} interval={0} />
                <YAxis tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                <Tooltip cursor={{ fill: '#f8fafc' }} formatter={(value) => [`${value}%`, 'Eventos']} />
                <Bar dataKey="valor" fill="#8b5cf6" radius={[4, 4, 0, 0]} barSize={30}>
                  {dataNaranjo.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.name.includes('Definitiva') ? '#ef4444' : entry.name.includes('Probable') ? '#f59e0b' : '#c4b5fd'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Gráfico 3: Escala Hartwig */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-sm font-bold text-slate-800 mb-1">Gravedad RAM (Hartwig)</h3>
          <p className="text-[10px] text-slate-500 mb-6">Impacto clínico de las reacciones adversas</p>
          <div className="h-52 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart layout="vertical" data={dataHartwig} margin={{ left: 0, right: 20 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} width={100} />
                <Tooltip cursor={{ fill: 'transparent' }} formatter={(value) => [`${value}%`, 'Eventos']} />
                <Bar dataKey="valor" radius={[0, 4, 4, 0]} barSize={20}>
                  {dataHartwig.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* 5. Tabla de Detalles Cruzados */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <div>
            <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <FileText className="w-5 h-5 text-slate-400" /> Registro Detallado de Pacientes
            </h3>
            <p className="text-xs text-slate-500 mt-1">Consolidado Entrevista Semi-Efectividad, Adherencia y RAM</p>
          </div>
          <button className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-2 rounded-lg border border-blue-100 hover:bg-blue-100 transition-colors">
            Exportar Consolidado
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="text-slate-500 bg-slate-50/50">
              <tr>
                <th className="px-4 py-3 font-medium uppercase tracking-wider">Documento</th>
                <th className="px-4 py-3 font-medium uppercase tracking-wider">Paciente</th>
                <th className="px-4 py-3 font-medium uppercase tracking-wider">FAEs Principales</th>
                <th className="px-4 py-3 font-medium uppercase tracking-wider text-center">Test Morisky</th>
                <th className="px-4 py-3 font-medium uppercase tracking-wider">Efectividad</th>
                <th className="px-4 py-3 font-medium uppercase tracking-wider text-center">RAM Presente</th>
                <th className="px-4 py-3 font-medium uppercase tracking-wider">Algoritmo Naranjo</th>
                <th className="px-4 py-3 font-medium uppercase tracking-wider">Escala Hartwig</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {pacientesFarmacoterapia.map((p, index) => (
                <tr key={index} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3 font-bold text-slate-800">{p.doc}</td>
                  <td className="px-4 py-3 text-slate-700 font-medium">{p.paciente}</td>
                  <td className="px-4 py-3 text-slate-600 font-medium">{p.meds}</td>
                  <td className="px-4 py-3 text-center">
                    <span className={`px-2 py-1 rounded font-bold text-[10px] ${
                      p.morisky === 'Adherente' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-rose-50 text-rose-700 border border-rose-100'
                    }`}>{p.morisky}</span>
                  </td>
                  <td className="px-4 py-3 text-slate-600">{p.efectividad}</td>
                  <td className="px-4 py-3 text-center">
                    <span className={`px-2 py-0.5 rounded font-bold text-[10px] ${
                      p.ram === 'Sí' ? 'text-amber-600 bg-amber-50' : 'text-slate-500 bg-slate-100'
                    }`}>{p.ram}</span>
                  </td>
                  <td className="px-4 py-3 text-slate-600 text-[11px] font-medium">{p.naranjo}</td>
                  <td className="px-4 py-3 text-slate-600 text-[11px] font-medium">{p.hartwig}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}