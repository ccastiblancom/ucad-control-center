"use client";

import Link from "next/link";
import { ArrowLeft, Calendar, Filter, Search, ShieldAlert, Activity, Database, Clock, Bug } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Cell, ComposedChart } from "recharts";

// Datos para Perfil Microbiológico
const dataMicrobiologia = [
  { name: 'S. epidermidis', valor: 45, color: '#3b82f6' },
  { name: 'K. pneumoniae', valor: 30, color: '#0ea5e9' },
  { name: 'E. coli', valor: 15, color: '#2dd4bf' },
  { name: 'C. albicans', valor: 10, color: '#94a3b8' },
];

// Datos para Tendencia Mensual (Casos vs Tasa)
const dataTendenciaITS = [
  { mes: 'Ene', casos: 1, tasa: 2.5 },
  { mes: 'Feb', casos: 0, tasa: 0.0 },
  { mes: 'Mar', tasa: 1.8, casos: 1 },
  { mes: 'Abr', tasa: 4.2, casos: 2 },
  { mes: 'May', tasa: 3.1, casos: 2 },
  { mes: 'Jun', tasa: 1.5, casos: 1 },
];

// Datos para Desglose por Tipo de Catéter
const dataTiposCateter = [
  { type: 'Catéter PICC', tasa: 0.9, color: '#10b981', descripcion: 'Excelente - Bajo riesgo' },
  { type: 'Porth-A-Cath', tasa: 2.5, color: '#f59e0b', descripcion: 'En meta - Vigilancia' },
  { type: 'CVC No Tunelizado', tasa: 4.2, color: '#ef4444', descripcion: 'Alerta - Requiere Intervención' },
];

export default function ItsAcDashboard() {
  return (
    <div className="relative min-h-screen w-full pb-12">
      {/* Fondo Institucional */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <img src="/fondo.jpg" alt="Fondo" className="w-full h-full object-cover opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50/10 via-transparent to-slate-50/90"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto mt-4 px-4">
        {/* Encabezado */}
        <div className="flex items-center gap-4 mb-6">
          <Link href="/ucad/leucemia" className="p-2 hover:bg-white/80 rounded-full transition-colors flex items-center gap-2 text-sm font-medium text-slate-600 bg-white/50 border border-slate-200 shadow-sm">
            <ArrowLeft className="w-4 h-4" /> Volver
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-[#324D6D] tracking-tight">Vigilancia Epidemiológica: Infecciones Asociadas a Catéter (ITS-AC)</h1>
            <p className="text-sm text-slate-500">Unidad de Leucemia • Seguridad del Paciente • Tasa por 1.000 días catéter</p>
          </div>
        </div>

        {/* Filtros */}
        <div className="flex flex-wrap items-center gap-4 mb-8 text-sm">
          <div className="bg-white/90 backdrop-blur-sm px-3 py-2 rounded-xl border border-slate-200 shadow-sm flex items-center gap-2">
            <Calendar className="w-4 h-4 text-slate-400" />
            <select className="bg-transparent outline-none cursor-pointer font-medium"><option>Último Semestre</option></select>
          </div>
          <div className="bg-white/90 backdrop-blur-sm px-3 py-2 rounded-xl border border-slate-200 shadow-sm flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-400" />
            <select className="bg-transparent outline-none cursor-pointer font-medium"><option>Todos los Servicios</option></select>
          </div>
        </div>

        {/* KPIs Superiores */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between border-l-4 border-l-cyan-500">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Tasa Global</p>
              <div className="flex items-baseline gap-1">
                <p className="text-3xl font-bold text-slate-800">3.1</p>
                <p className="text-[10px] text-slate-400">/ 1000 días</p>
              </div>
            </div>
            <Activity className="w-8 h-8 text-cyan-500 opacity-20" />
          </div>
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between border-l-4 border-l-blue-500">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Días Catéter</p>
              <p className="text-3xl font-bold text-slate-800">4,520</p>
            </div>
            <Database className="w-8 h-8 text-blue-500 opacity-20" />
          </div>
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between border-l-4 border-l-rose-500">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Eventos (N)</p>
              <p className="text-3xl font-bold text-rose-600">2</p>
            </div>
            <Bug className="w-8 h-8 text-rose-500 opacity-20" />
          </div>
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between border-l-4 border-l-emerald-500">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Días desde última ITS</p>
              <p className="text-3xl font-bold text-emerald-600">45</p>
            </div>
            <Clock className="w-8 h-8 text-emerald-500 opacity-20" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Perfil Microbiológico */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="text-sm font-bold text-slate-700 mb-6 flex items-center gap-2">
              <Bug className="w-4 h-4 text-cyan-500" /> Perfil Microbiológico de ITS-AC
            </h3>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dataMicrobiologia} margin={{ left: -20 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" tick={{fontSize: 10}} axisLine={false} tickLine={false} />
                  <YAxis tick={{fontSize: 10}} axisLine={false} tickLine={false} />
                  <Tooltip cursor={{fill: '#f8fafc'}} />
                  <Bar dataKey="valor" radius={[4, 4, 0, 0]} barSize={40}>
                    {dataMicrobiologia.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Tendencia Mensual */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="text-sm font-bold text-slate-700 mb-6">Tendencia Mensual de Infecciones</h3>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={dataTendenciaITS}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="mes" tick={{fontSize: 11}} axisLine={false} />
                  <YAxis yAxisId="left" tick={{fontSize: 10}} axisLine={false} />
                  <YAxis yAxisId="right" orientation="right" tick={{fontSize: 10}} axisLine={false} />
                  <Tooltip />
                  <Bar yAxisId="left" dataKey="casos" name="N° Casos" fill="#cbd5e1" barSize={30} radius={[4, 4, 0, 0]} />
                  <Line yAxisId="right" type="monotone" dataKey="tasa" name="Tasa" stroke="#0ea5e9" strokeWidth={3} dot={{r: 4, fill: '#0ea5e9'}} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Desglose por Tipo de Acceso Vascular */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 mb-6">
          <h3 className="text-sm font-bold text-slate-700 mb-6 flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-rose-500" /> Desglose por Tipo de Acceso Vascular
          </h3>
          <div className="space-y-6">
            {dataTiposCateter.map((cat, idx) => (
              <div key={idx}>
                <div className="flex justify-between items-end mb-2">
                  <div>
                    <p className="text-xs font-bold text-slate-700">{cat.type}</p>
                    <p className="text-[10px] text-slate-400">{cat.descripcion}</p>
                  </div>
                  <p className="text-sm font-bold" style={{ color: cat.color }}>{cat.tasa} <span className="text-[10px] font-normal text-slate-400">casos/1k días</span></p>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-3">
                  <div 
                    className="h-3 rounded-full transition-all duration-1000" 
                    style={{ width: `${(cat.tasa / 5) * 100}%`, backgroundColor: cat.color }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Cumplimiento del Bundle */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-50 bg-slate-50/50">
            <h3 className="text-sm font-bold text-slate-700">Cumplimiento del Bundle de Mantenimiento</h3>
          </div>
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex justify-between text-xs font-medium"><span>Higiene de manos</span><span className="font-bold text-emerald-600">98%</span></div>
              <div className="w-full bg-slate-100 h-1.5 rounded-full"><div className="bg-emerald-500 w-[98%] h-1.5 rounded-full"></div></div>
              
              <div className="flex justify-between text-xs font-medium"><span>Desinfección de puertos (Hubs)</span><span className="font-bold text-emerald-600">95%</span></div>
              <div className="w-full bg-slate-100 h-1.5 rounded-full"><div className="bg-emerald-500 w-[95%] h-1.5 rounded-full"></div></div>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between text-xs font-medium"><span>Integridad del apósito</span><span className="font-bold text-amber-600">85%</span></div>
              <div className="w-full bg-slate-100 h-1.5 rounded-full"><div className="bg-amber-500 w-[85%] h-1.5 rounded-full"></div></div>
              
              <div className="flex justify-between text-xs font-medium"><span>Revisión diaria de necesidad</span><span className="font-bold text-emerald-600">100%</span></div>
              <div className="w-full bg-slate-100 h-1.5 rounded-full"><div className="bg-emerald-500 w-[100%] h-1.5 rounded-full"></div></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}