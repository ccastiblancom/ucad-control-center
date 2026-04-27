"use client";

import Link from "next/link";
import { ArrowLeft, Calendar, Filter, Search, Link as LinkIcon, TrendingUp, Zap, AlertTriangle, Users, BriefcaseMedical, Activity, HeartPulse, CheckCircle2, ShieldAlert } from "lucide-react";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

// Datos de prueba originales
const dataMensual = [
  { name: 'Julio', promedio: 85, baja: 15 }, { name: 'Agosto', promedio: 10, baja: 90 },
  { name: 'Septiembre', promedio: 5, baja: 95 }, { name: 'Octubre', promedio: 5, baja: 95 },
  { name: 'Noviembre', promedio: 5, baja: 95 }, { name: 'Diciembre', promedio: 5, baja: 95 },
];

const dataDistribucion = [
  { name: 'Alta', value: 52, color: '#10b981' },
  { name: 'Baja', value: 48, color: '#ef4444' },
];

const dataBarreras = [
  { name: 'Olvido', value: 68.5 },
  { name: 'Costo', value: 15 },
  { name: 'Creencias', value: 10 },
  { name: 'Efectos sec.', value: 5 },
  { name: 'Acceso', value: 1 },
  { name: 'Apoyo', value: 0.5 },
];

const dataCrisis = [
  { name: '0 crisis', valor: 82 },
  { name: 'Baja frecuencia', valor: 65 },
  { name: 'Alta frecuencia', valor: 68 },
];

const dataUrgencias = [
  { name: 'Alta', valor: 0 },
  { name: 'Media', valor: 0 },
  { name: 'Baja', valor: 85 },
];

// Nuevos datos de prueba para Mortalidad
const dataMortalidad = [
  { name: 'Adherencia Alta', valor: 0.5 },
  { name: 'Adherencia Media', valor: 2.1 },
  { name: 'Adherencia Baja', valor: 7.4 },
];

const pacientes = [
  { unidad: "Hospitalización", doc: "1028498346", paciente: "DAVID CAMILO RODRIGUEZ MAYORGA", edad: "13 años", severidad: "Moderada estable", adherencia: "96%", crisis: "Sin Crisis por el momento", refractaria: "No" },
  { unidad: "Consulta Externa", doc: "1120395322", paciente: "ANNA VICTORIA MARTINEZ GUERRERO", edad: "1 años", severidad: "Moderada inestable", adherencia: "60%", crisis: "Diaria", refractaria: "Sí" },
  { unidad: "Consulta Externa", doc: "1093506529", paciente: "EVELYN TAILETH LOPEZ MONSALVA", edad: "3 años", severidad: "Severa", adherencia: "61%", crisis: "Diaria", refractaria: "Sí" },
  { unidad: "Consulta Externa", doc: "1230345002", paciente: "ANA SALOME PIÑEROS GUTIERREZ", edad: "7 años", severidad: "Moderada", adherencia: "92%", crisis: "Sin Crisis por el momento", refractaria: "No" },
  { unidad: "Consulta Externa", doc: "1011268334", paciente: "DULCE MARIA HERNANDEZ QUITIAN", edad: "1 años", severidad: "Severa", adherencia: "90%", crisis: "Esporádica", refractaria: "Sí" },
];

export default function AdherenciaTratamientoDashboard() {
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
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Adherencia al tratamiento</h1>
          <p className="text-sm text-slate-500">UCAD Epilepsia • Medicación y soporte al paciente</p>
          <p className="text-xs text-slate-400 mt-1">Datos consolidados con tabla navegación_epilepsia • Categorización basada en frecuencia_crisis • 116 pacientes</p>
        </div>
      </div>

      {/* 2. Barra de Filtros */}
      <div className="flex flex-wrap items-center gap-4 mb-8 text-sm text-slate-600">
        <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-md border border-slate-200 shadow-sm"><Calendar className="w-4 h-4 text-slate-400" /><select className="bg-transparent outline-none cursor-pointer"><option>Últimos 6 meses</option></select></div>
        <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-md border border-slate-200 shadow-sm"><Filter className="w-4 h-4 text-slate-400" /><select className="bg-transparent outline-none cursor-pointer"><option>Todas las unidades</option></select></div>
        <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-md border border-slate-200 shadow-sm"><Filter className="w-4 h-4 text-slate-400" /><select className="bg-transparent outline-none cursor-pointer"><option>Todas</option></select></div>
        <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-md border border-slate-200 shadow-sm flex-1 max-w-md"><Search className="w-4 h-4 text-slate-400" /><input type="text" placeholder="Buscar por documento o nombre" className="w-full bg-transparent outline-none" /></div>
      </div>

      {/* 3. KPIs Superiores */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-6">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 border-t-4 border-t-indigo-500">
          <div className="p-1.5 bg-indigo-50 rounded-md w-fit mb-2"><LinkIcon className="w-4 h-4 text-indigo-600" /></div>
          <p className="text-xs text-slate-500 mb-1">Adherencia promedio</p>
          <p className="text-xl font-bold text-slate-800">82.1%</p>
          <p className="text-[10px] text-indigo-600 font-medium">↑ 1.8% vs anterior</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 border-t-4 border-t-emerald-500">
          <div className="p-1.5 bg-emerald-50 rounded-md w-fit mb-2"><TrendingUp className="w-4 h-4 text-emerald-600" /></div>
          <p className="text-xs text-slate-500 mb-1">% Adherencia alta</p>
          <p className="text-xl font-bold text-slate-800">51.7%</p>
          <p className="text-[10px] text-slate-400">60 pacientes</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 border-t-4 border-t-amber-500">
          <div className="p-1.5 bg-amber-50 rounded-md w-fit mb-2"><Zap className="w-4 h-4 text-amber-600" /></div>
          <p className="text-xs text-slate-500 mb-1">% Adherencia media</p>
          <p className="text-xl font-bold text-slate-800">0.0%</p>
          <p className="text-[10px] text-slate-400">0 pacientes</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 border-t-4 border-t-rose-500">
          <div className="p-1.5 bg-rose-50 rounded-md w-fit mb-2"><AlertTriangle className="w-4 h-4 text-rose-600" /></div>
          <p className="text-xs text-slate-500 mb-1">% Adherencia baja</p>
          <p className="text-xl font-bold text-slate-800">48.3%</p>
          <p className="text-[10px] text-slate-400">56 pacientes</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 border-t-4 border-t-purple-500">
          <div className="p-1.5 bg-purple-50 rounded-md w-fit mb-2"><Users className="w-4 h-4 text-purple-600" /></div>
          <p className="text-xs text-slate-500 mb-1">Pacientes en riesgo</p>
          <p className="text-xl font-bold text-slate-800">56</p>
          <p className="text-[10px] text-slate-400">requieren intervención</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 border-t-4 border-t-cyan-500">
          <div className="p-1.5 bg-cyan-50 rounded-md w-fit mb-2"><BriefcaseMedical className="w-4 h-4 text-cyan-600" /></div>
          <p className="text-xs text-slate-500 mb-1">Impacto (uso recursos)</p>
          <p className="text-xl font-bold text-slate-800">34.5%</p>
          <p className="text-[10px] text-slate-400">urgencias/hospitalización</p>
        </div>
      </div>

      {/* 4. Gráficos Fila 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-base font-bold text-slate-800 mb-6">Adherencia mensual</h3>
          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={dataMensual} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                <Tooltip />
                <Line type="monotone" dataKey="promedio" stroke="#6366f1" strokeWidth={2} dot={{ r: 4 }} name="Adherencia promedio (%)" />
                <Line type="monotone" dataKey="baja" stroke="#ef4444" strokeWidth={2} dot={{ r: 4 }} name="% baja adherencia" />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-4 mt-2 text-xs font-medium text-slate-600">
            <span className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-[#6366f1]"></div> Adherencia promedio (%)</span>
            <span className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-[#ef4444]"></div> % baja adherencia</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 relative">
          <h3 className="text-base font-bold text-slate-800 mb-2">Distribución de adherencia</h3>
          <div className="h-56 w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={dataDistribucion} innerRadius={0} outerRadius={80} dataKey="value" stroke="white" strokeWidth={2}>
                  {dataDistribucion.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            {/* Etiquetas simuladas */}
            <div className="absolute top-4 right-1/3 text-xs font-bold text-emerald-600">Alta: 52%</div>
            <div className="absolute bottom-4 right-1/3 text-xs font-bold text-rose-600">Baja: 48%</div>
            <div className="absolute top-1/2 left-1/4 text-xs font-bold text-amber-500">Media: 0%</div>
          </div>
        </div>
      </div>

      {/* 5. Gráficos Fila 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="flex justify-between items-start mb-6">
            <h3 className="text-base font-bold text-slate-800">Top barreras que afectan adherencia</h3>
            <span className="text-[10px] font-medium bg-indigo-50 text-indigo-600 px-2 py-1 rounded border border-indigo-100">68.5% con barrera registrada</span>
          </div>
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart layout="vertical" data={dataBarreras} margin={{ top: 0, right: 20, left: 20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} width={70} />
                <Tooltip cursor={{ fill: '#f1f5f9' }} />
                <Bar dataKey="value" fill="#8b5cf6" barSize={16} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex flex-col">
          <h3 className="text-base font-bold text-slate-800 mb-2">Adherencia por efectos secundarios</h3>
          <p className="text-sm text-slate-500 mb-6">Con efectos secundarios vs Sin efectos</p>
          <div className="flex flex-1 gap-4">
            <div className="flex-1 bg-slate-50 rounded-lg border border-slate-100 flex flex-col items-center justify-center p-4">
              <p className="text-sm font-medium text-slate-500 mb-1">Con efectos</p>
              <p className="text-3xl font-bold text-slate-800">0.0%</p>
              <p className="text-xs text-slate-400 mt-1">n=0</p>
            </div>
            <div className="flex-1 bg-slate-50 rounded-lg border border-slate-100 flex flex-col items-center justify-center p-4">
              <p className="text-sm font-medium text-slate-500 mb-1">Sin efectos</p>
              <p className="text-3xl font-bold text-slate-800">82.1%</p>
              <p className="text-xs text-slate-400 mt-1">n=116</p>
            </div>
          </div>
        </div>
      </div>

      {/* 6. Gráficos Fila 3 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-base font-bold text-slate-800 mb-6">Adherencia vs control de crisis</h3>
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dataCrisis} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                <Tooltip cursor={{ fill: '#f1f5f9' }} />
                <Bar dataKey="valor" fill="#0284c7" barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center mt-2 text-[10px] text-slate-400 -rotate-90 origin-left absolute -left-2 top-1/2">Adherencia prom.</div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-base font-bold text-slate-800 mb-6">Adherencia vs uso de urgencias/hospitalización</h3>
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dataUrgencias} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10 }} axisLine={false} tickLine={false} domain={[0, 100]} />
                <Tooltip cursor={{ fill: '#f1f5f9' }} />
                <Bar dataKey="valor" fill="#ef4444" barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center mt-2 text-[10px] text-slate-400 -rotate-90 origin-left absolute -left-2 top-1/2">% con uso de recursos</div>
        </div>
      </div>

      {/* 7. NUEVA SECCIÓN: Mortalidad y Resultados Quirúrgicos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        
        {/* Gráfico Mortalidad vs Adherencia */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="flex items-center gap-2 mb-6">
            <h3 className="text-base font-bold text-slate-800">Mortalidad vs Nivel de Adherencia</h3>
            <span className="text-[10px] font-medium bg-red-50 text-red-600 px-2 py-0.5 rounded border border-red-100">Tasa %</span>
          </div>
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dataMortalidad} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                <Tooltip cursor={{ fill: '#f1f5f9' }} />
                <Bar dataKey="valor" fill="#f43f5e" barSize={50} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Nuevo Indicador: Cirugía de Epilepsia */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex flex-col">
          <div className="flex justify-between items-start mb-6">
            <h3 className="text-base font-bold text-slate-800">Programa de Cirugía de Epilepsia</h3>
            <span className="text-[10px] font-medium bg-slate-100 text-slate-600 px-2 py-1 rounded border border-slate-200">Pacientes Refractarios</span>
          </div>
          
          <div className="grid grid-cols-2 gap-4 flex-1">
            <div className="bg-blue-50/50 border border-blue-100 rounded-lg p-4 flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-1">
                <Activity className="w-4 h-4 text-blue-500" />
                <p className="text-xs font-semibold text-blue-800">Remitidos</p>
              </div>
              <p className="text-2xl font-bold text-blue-700">18</p>
              <p className="text-[10px] text-blue-500 mt-1">candidatos a cirugía</p>
            </div>
            
            <div className="bg-indigo-50/50 border border-indigo-100 rounded-lg p-4 flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-1">
                <HeartPulse className="w-4 h-4 text-indigo-500" />
                <p className="text-xs font-semibold text-indigo-800">Operados</p>
              </div>
              <p className="text-2xl font-bold text-indigo-700">12</p>
              <p className="text-[10px] text-indigo-500 mt-1">procedimientos exitosos</p>
            </div>

            <div className="bg-emerald-50/50 border border-emerald-100 rounded-lg p-4 flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <p className="text-xs font-semibold text-emerald-800">Control Crisis</p>
              </div>
              <p className="text-2xl font-bold text-emerald-700">83.3%</p>
              <p className="text-[10px] text-emerald-500 mt-1">reducción post-cirugía</p>
            </div>

            <div className="bg-rose-50/50 border border-rose-100 rounded-lg p-4 flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-1">
                <ShieldAlert className="w-4 h-4 text-rose-500" />
                <p className="text-xs font-semibold text-rose-800">Complicaciones</p>
              </div>
              <p className="text-2xl font-bold text-rose-700">2 <span className="text-sm font-normal text-rose-500">(16%)</span></p>
              <p className="text-[10px] text-rose-500 mt-1">eventos adversos</p>
            </div>
          </div>
        </div>
      </div>

      {/* 8. Tabla de Pacientes */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center gap-2">
          <h3 className="text-sm font-bold text-slate-600">Pacientes (116) •</h3>
          <span className="text-xs text-emerald-600 font-medium flex items-center gap-1"><div className="w-2 h-2 bg-emerald-500 rounded-full"></div> Conectado a Supabase (116 registros)</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="text-slate-500 bg-slate-50/50">
              <tr>
                <th className="px-4 py-3 font-medium">Unidad</th>
                <th className="px-4 py-3 font-medium">Documento</th>
                <th className="px-4 py-3 font-medium">Paciente</th>
                <th className="px-4 py-3 font-medium">Edad</th>
                <th className="px-4 py-3 font-medium">Severidad</th>
                <th className="px-4 py-3 font-medium">Adherencia</th>
                <th className="px-4 py-3 font-medium text-center">Frecuencia de crisis</th>
                <th className="px-4 py-3 font-medium text-center">Refractaria</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {pacientes.map((p, index) => (
                <tr key={index} className="hover:bg-slate-50">
                  <td className="px-4 py-3 text-blue-600 font-medium">{p.unidad}</td>
                  <td className="px-4 py-3 font-medium text-slate-800">{p.doc}</td>
                  <td className="px-4 py-3 text-slate-700">{p.paciente}</td>
                  <td className="px-4 py-3 text-slate-600">{p.edad}</td>
                  <td className="px-4 py-3 text-slate-500">{p.severidad}</td>
                  <td className="px-4 py-3 font-bold text-slate-800">{p.adherencia}</td>
                  <td className="px-4 py-3 text-center">
                    <span className={`px-2 py-0.5 rounded-sm text-[10px] font-bold ${
                      p.crisis.includes('Sin Crisis') ? 'bg-emerald-100 text-emerald-700' : p.crisis === 'Diaria' ? 'bg-rose-100 text-rose-700' : 'bg-emerald-50 text-emerald-600'
                    }`}>{p.crisis}</span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className={`px-2 py-0.5 rounded-sm text-[10px] font-bold ${
                      p.refractaria === 'Sí' ? 'bg-rose-100 text-rose-700' : 'bg-emerald-100 text-emerald-700'
                    }`}>{p.refractaria}</span>
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