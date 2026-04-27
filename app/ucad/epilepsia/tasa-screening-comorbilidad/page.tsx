"use client";

import Link from "next/link";
import { ArrowLeft, Calendar, Filter, Search, TrendingUp, Users, CheckCircle2, AlertTriangle, Brain, Target, ShieldAlert, Activity } from "lucide-react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";

// Datos de prueba para gráficos
const dataTendencia = [
  { name: 'Enero', screening: 65 }, { name: 'Febrero', screening: 60 },
  { name: 'Marzo', screening: 57 }, { name: 'Abril', screening: 57 },
  { name: 'Mayo', screening: 56 }, { name: 'Junio', screening: 56.5 },
];

const dataPrevalencia = [
  { name: 'Enero', detectada: 40, benchmark: 33 }, { name: 'Febrero', detectada: 12, benchmark: 33 },
  { name: 'Marzo', detectada: 32, benchmark: 33 }, { name: 'Abril', detectada: 18, benchmark: 33 },
  { name: 'Mayo', detectada: 38, benchmark: 33 }, { name: 'Junio', detectada: 12, benchmark: 33 },
];

const dataInstrumento = [
  { name: 'PHQ-9', valor: 18 },
  { name: 'GAD-7', valor: 15 },
  { name: 'CBCL', valor: 12 },
  { name: 'EpiTrack Jr', valor: 10 },
  { name: 'EpiTrack', valor: 9 },
];

const dataPositividad = [
  { name: 'Depresión', valor: 42 },
  { name: 'Ansiedad', valor: 35 },
  { name: 'Cognitiva', valor: 28 },
  { name: 'Neurodesarrollo', valor: 32 },
];

// Datos divergentes (positivos = brecha/falta tamizar, negativos = cobertura completa/superada)
const dataBrechaUnidad = [
  { name: 'Urgencias', gap: 35 },
  { name: 'UCI', gap: 28 },
  { name: 'Hospitalización', gap: 25 },
  { name: 'Consulta Externa', gap: -22 }, // Negativo para que vaya hacia la izquierda en verde
];

const pacientes = [
  { unidad: "Consulta Externa", doc: "9001234567", paciente: "Ana María López Cruz", edad: "12 años", estado: "Tamizado", categoria: "Psiquiátrica", instrumento: "GAD-7", resultado: "Positivo", fecha: "25/01/2024" },
  { unidad: "Consulta Externa", doc: "9002345678", paciente: "Carlos Gómez Rivera", edad: "9 años", estado: "Tamizado", categoria: "Psiquiátrica", instrumento: "GAD-7", resultado: "Negativo", fecha: "12/01/2024" },
  { unidad: "Consulta Externa", doc: "9003456789", paciente: "Laura Pérez Santos", edad: "14 años", estado: "Tamizado", categoria: "Psiquiátrica", instrumento: "PHQ-9", resultado: "Positivo", fecha: "15/01/2024" },
  { unidad: "Consulta Externa", doc: "9004567890", paciente: "Miguel Torres Ruiz", edad: "11 años", estado: "Tamizado", categoria: "Cognitiva", instrumento: "EpiTrack Jr", resultado: "Positivo", fecha: "18/01/2024" },
  { unidad: "Consulta Externa", doc: "9005678901", paciente: "Sofía Hernández Cruz", edad: "13 años", estado: "Tamizado", categoria: "Psiquiátrica", instrumento: "GAD-7", resultado: "Positivo", fecha: "22/01/2024" },
  { unidad: "Consulta Externa", doc: "9006789012", paciente: "Daniel Vargas Luna", edad: "8 años", estado: "Tamizado", categoria: "Neurodesarrollo", instrumento: "CBCL", resultado: "Positivo", fecha: "28/01/2024" },
  { unidad: "Consulta Externa", doc: "9007890123", paciente: "Valentina Castro Díaz", edad: "7 años", estado: "Tamizado", categoria: "Cognitiva", instrumento: "EpiTrack Jr", resultado: "Negativo", fecha: "05/02/2024" },
  { unidad: "Consulta Externa", doc: "9008901234", paciente: "Mateo Morales Reyes", edad: "10 años", estado: "Tamizado", categoria: "Psiquiátrica", instrumento: "PHQ-9", resultado: "Positivo", fecha: "08/02/2024" },
];

export default function TasaScreeningComorbilidadDashboard() {
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
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Tasa de screening para comorbilidad</h1>
          <p className="text-sm text-slate-500">Cobertura, positividad y brecha vs esperado (benchmark 33%)</p>
          <p className="text-xs text-slate-400 mt-1">Cribado sistemático de comorbilidades: psiquiátrica, cognitiva, neurodesarrollo</p>
        </div>
      </div>

      {/* 2. Barra de Filtros */}
      <div className="flex flex-wrap items-center gap-4 mb-8 text-sm text-slate-600">
        <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-md border border-slate-200 shadow-sm"><Calendar className="w-4 h-4 text-slate-400" /><select className="bg-transparent outline-none cursor-pointer"><option>Últimos 6 meses</option></select></div>
        <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-md border border-slate-200 shadow-sm"><Filter className="w-4 h-4 text-slate-400" /><select className="bg-transparent outline-none cursor-pointer"><option>Todas las unidades</option></select></div>
        <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-md border border-slate-200 shadow-sm"><Filter className="w-4 h-4 text-slate-400" /><select className="bg-transparent outline-none cursor-pointer"><option>Todas</option></select></div>
        <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-md border border-slate-200 shadow-sm"><Filter className="w-4 h-4 text-slate-400" /><select className="bg-transparent outline-none cursor-pointer"><option>Todos</option></select></div>
        <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-md border border-slate-200 shadow-sm"><Filter className="w-4 h-4 text-slate-400" /><select className="bg-transparent outline-none cursor-pointer"><option>Todos</option></select></div>
        <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-md border border-slate-200 shadow-sm flex-1 max-w-md"><Search className="w-4 h-4 text-slate-400" /><input type="text" placeholder="Buscar por documento o nombre" className="w-full bg-transparent outline-none" /></div>
      </div>

      {/* 3. KPIs Superiores (Grid de 8 columnas) */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3 mb-6">
        <div className="bg-white p-3 rounded-xl shadow-sm border border-slate-200 border-t-4 border-t-teal-500">
          <div className="p-1.5 bg-teal-50 rounded-md w-fit mb-2"><TrendingUp className="w-3.5 h-3.5 text-teal-600" /></div>
          <p className="text-[10px] text-slate-500 mb-1 font-semibold leading-tight">Tasa de screening</p>
          <p className="text-lg font-bold text-slate-800">69.8%</p>
          <p className="text-[9px] text-slate-400">cobertura</p>
        </div>
        <div className="bg-white p-3 rounded-xl shadow-sm border border-slate-200 border-t-4 border-t-blue-500">
          <div className="p-1.5 bg-blue-50 rounded-md w-fit mb-2"><Users className="w-3.5 h-3.5 text-blue-600" /></div>
          <p className="text-[10px] text-slate-500 mb-1 font-semibold leading-tight">Pacientes elegibles</p>
          <p className="text-lg font-bold text-slate-800">199</p>
          <p className="text-[9px] text-slate-400">con epilepsia</p>
        </div>
        <div className="bg-white p-3 rounded-xl shadow-sm border border-slate-200 border-t-4 border-t-emerald-500">
          <div className="p-1.5 bg-emerald-50 rounded-md w-fit mb-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /></div>
          <p className="text-[10px] text-slate-500 mb-1 font-semibold leading-tight">Con screening</p>
          <p className="text-lg font-bold text-slate-800">139</p>
          <p className="text-[9px] text-slate-400">pacientes</p>
        </div>
        <div className="bg-white p-3 rounded-xl shadow-sm border border-slate-200 border-t-4 border-t-amber-500">
          <div className="p-1.5 bg-amber-50 rounded-md w-fit mb-2"><AlertTriangle className="w-3.5 h-3.5 text-amber-600" /></div>
          <p className="text-[10px] text-slate-500 mb-1 font-semibold leading-tight">Tasa positividad</p>
          <p className="text-lg font-bold text-slate-800">36.0%</p>
          <p className="text-[9px] text-slate-400">sobre tamizados</p>
        </div>
        <div className="bg-white p-3 rounded-xl shadow-sm border border-slate-200 border-t-4 border-t-purple-500">
          <div className="p-1.5 bg-purple-50 rounded-md w-fit mb-2"><Brain className="w-3.5 h-3.5 text-purple-600" /></div>
          <p className="text-[10px] text-slate-500 mb-1 font-semibold leading-tight">Prevalencia detectada</p>
          <p className="text-lg font-bold text-slate-800">25.1%</p>
          <p className="text-[9px] text-slate-400">sobre elegibles</p>
        </div>
        <div className="bg-white p-3 rounded-xl shadow-sm border border-slate-200 border-t-4 border-t-sky-500">
          <div className="p-1.5 bg-sky-50 rounded-md w-fit mb-2"><Target className="w-3.5 h-3.5 text-sky-600" /></div>
          <p className="text-[10px] text-slate-500 mb-1 font-semibold leading-tight">Prevalencia esperada</p>
          <p className="text-lg font-bold text-slate-800">33%</p>
          <p className="text-[9px] text-slate-400">benchmark</p>
        </div>
        <div className="bg-white p-3 rounded-xl shadow-sm border border-slate-200 border-t-4 border-t-rose-500">
          <div className="p-1.5 bg-rose-50 rounded-md w-fit mb-2"><ShieldAlert className="w-3.5 h-3.5 text-rose-600" /></div>
          <p className="text-[10px] text-slate-500 mb-1 font-semibold leading-tight">Gap de detección</p>
          <p className="text-lg font-bold text-slate-800">7.9 pp</p>
          <p className="text-[9px] text-slate-400">esperada - detectada</p>
        </div>
        <div className="bg-white p-3 rounded-xl shadow-sm border border-slate-200 border-t-4 border-t-rose-400">
          <div className="p-1.5 bg-rose-50 rounded-md w-fit mb-2"><Activity className="w-3.5 h-3.5 text-rose-500" /></div>
          <p className="text-[10px] text-slate-500 mb-1 font-semibold leading-tight">Calidad del dato</p>
          <p className="text-lg font-bold text-slate-800">100.0%</p>
          <p className="text-[9px] text-slate-400">completos</p>
        </div>
      </div>

      {/* 4. Gráficos Fila 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Tendencia de screening */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-base font-bold text-slate-800 mb-6">Tendencia de screening</h3>
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={dataTendencia} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10 }} axisLine={false} tickLine={false} domain={[0, 80]} />
                <Tooltip />
                <Line type="monotone" dataKey="screening" stroke="#14b8a6" strokeWidth={2} dot={{ r: 4 }} name="% Screening" />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center mt-2 text-xs font-medium text-slate-600">
            <span className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-[#14b8a6]"></div> % Screening</span>
          </div>
        </div>

        {/* Prevalencia: detectada vs esperada */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-base font-bold text-slate-800 mb-6">Prevalencia: detectada vs esperada</h3>
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={dataPrevalencia} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10 }} axisLine={false} tickLine={false} domain={[0, 50]} />
                <Tooltip />
                <Line type="monotone" dataKey="detectada" stroke="#8b5cf6" strokeWidth={2} dot={{ r: 4 }} name="% Detectada" />
                <Line type="step" dataKey="benchmark" stroke="#0ea5e9" strokeWidth={2} strokeDasharray="5 5" dot={false} name="Esperada (benchmark)" />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-4 mt-2 text-xs font-medium text-slate-600">
            <span className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-[#8b5cf6]"></div> Detectada</span>
            <span className="flex items-center gap-1"><div className="w-3 h-3 rounded-full border-2 border-dashed border-[#0ea5e9]"></div> Esperada (benchmark)</span>
          </div>
        </div>
      </div>

      {/* 5. Gráfico Ancho Completo: Cobertura por instrumento */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 mb-6">
        <h3 className="text-base font-bold text-slate-800 mb-6">Cobertura por instrumento</h3>
        <div className="h-48 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart layout="vertical" data={dataInstrumento} margin={{ top: 0, right: 20, left: 30, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} width={80} />
              <Tooltip cursor={{ fill: '#f1f5f9' }} />
              <Bar dataKey="valor" fill="#8b5cf6" barSize={24} name="% Pacientes" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="text-center text-xs text-slate-500 mt-2 font-medium">% Pacientes</div>
      </div>

      {/* 6. Gráficos Fila 3 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Positividad por comorbilidad */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-base font-bold text-slate-800 mb-6">Positividad por comorbilidad</h3>
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dataPositividad} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10 }} axisLine={false} tickLine={false} domain={[0, 60]} />
                <Tooltip cursor={{ fill: '#f1f5f9' }} />
                <Bar dataKey="valor" fill="#f59e0b" barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Gap por comorbilidad (Diseño Personalizado HTML/CSS) */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex flex-col">
          <h3 className="text-base font-bold text-slate-800 mb-6">Gap por comorbilidad</h3>
          <div className="flex-1 space-y-6 flex flex-col justify-center">
            {/* Depresión */}
            <div className="flex items-center gap-4">
              <div className="w-24 text-xs font-bold text-slate-700">Depresión<br/><span className="bg-purple-100 text-purple-700 px-1.5 py-0.5 rounded text-[9px] mt-1 inline-block">8.0%</span></div>
              <div className="flex-1 relative h-2 bg-slate-100 rounded-full">
                <div className="absolute top-0 left-0 h-full bg-cyan-500 rounded-full" style={{ width: '25%' }}></div>
                {/* Meta Marker */}
                <div className="absolute top-[-10px] left-[33%] flex flex-col items-center">
                  <span className="text-[8px] text-cyan-600 font-bold mb-0.5">Meta 33%</span>
                  <div className="w-0.5 h-4 bg-cyan-500"></div>
                </div>
              </div>
              <div className="w-20 text-right text-xs font-bold text-rose-500">Gap: 25.0 pp</div>
            </div>

            {/* Ansiedad */}
            <div className="flex items-center gap-4">
              <div className="w-24 text-xs font-bold text-slate-700">Ansiedad<br/><span className="bg-purple-100 text-purple-700 px-1.5 py-0.5 rounded text-[9px] mt-1 inline-block">6.0%</span></div>
              <div className="flex-1 relative h-2 bg-slate-100 rounded-full">
                <div className="absolute top-0 left-0 h-full bg-cyan-500 rounded-full" style={{ width: '18%' }}></div>
                <div className="absolute top-[-10px] left-[33%] flex flex-col items-center">
                  <span className="text-[8px] text-cyan-600 font-bold mb-0.5">Meta 33%</span>
                  <div className="w-0.5 h-4 bg-cyan-500"></div>
                </div>
              </div>
              <div className="w-20 text-right text-xs font-bold text-rose-500">Gap: 27.0 pp</div>
            </div>

            {/* Cognitiva */}
            <div className="flex items-center gap-4">
              <div className="w-24 text-xs font-bold text-slate-700">Cognitiva<br/><span className="bg-purple-100 text-purple-700 px-1.5 py-0.5 rounded text-[9px] mt-1 inline-block">7.0%</span></div>
              <div className="flex-1 relative h-2 bg-slate-100 rounded-full">
                <div className="absolute top-0 left-0 h-full bg-cyan-500 rounded-full" style={{ width: '21%' }}></div>
                <div className="absolute top-[-10px] left-[33%] flex flex-col items-center">
                  <span className="text-[8px] text-cyan-600 font-bold mb-0.5">Meta 33%</span>
                  <div className="w-0.5 h-4 bg-cyan-500"></div>
                </div>
              </div>
              <div className="w-20 text-right text-xs font-bold text-rose-500">Gap: 26.0 pp</div>
            </div>

            {/* Neurodesarrollo */}
            <div className="flex items-center gap-4">
              <div className="w-24 text-xs font-bold text-slate-700">Neurodesarrollo<br/><span className="bg-purple-100 text-purple-700 px-1.5 py-0.5 rounded text-[9px] mt-1 inline-block">6%</span></div>
              <div className="flex-1 relative h-2 bg-slate-100 rounded-full">
                <div className="absolute top-0 left-0 h-full bg-cyan-500 rounded-full" style={{ width: '18%' }}></div>
                <div className="absolute top-[-10px] left-[33%] flex flex-col items-center">
                  <span className="text-[8px] text-cyan-600 font-bold mb-0.5">Meta 33%</span>
                  <div className="w-0.5 h-4 bg-cyan-500"></div>
                </div>
              </div>
              <div className="w-20 text-right text-xs font-bold text-rose-500">Gap: 28.5 pp</div>
            </div>
          </div>
        </div>
      </div>

      {/* 7. Gráfico Divergente Ancho Completo */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 mb-6">
        <h3 className="text-base font-bold text-slate-800 mb-6">Brecha por unidad de servicio</h3>
        <div className="h-48 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart layout="vertical" data={dataBrechaUnidad} margin={{ top: 0, right: 30, left: 30, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={false} />
              {/* Eje X auto-calcula los negativos y positivos */}
              <XAxis type="number" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} width={100} />
              <Tooltip cursor={{ fill: '#f1f5f9' }} />
              <Bar dataKey="gap" barSize={24}>
                {dataBrechaUnidad.map((entry, index) => (
                  // Rojo para valores positivos (brecha/falta), Verde para negativos (superávit)
                  <Cell key={`cell-${index}`} fill={entry.gap > 0 ? '#ef4444' : '#10b981'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="text-center text-xs text-slate-500 mt-2 font-medium">Gap (pp)</div>
      </div>

      {/* 8. Tarjetas Estados Operativos */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 mb-6">
        <h3 className="text-sm font-bold text-slate-500 mb-4 uppercase tracking-wider">Estados operativos</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="border border-amber-200 rounded-lg p-4 bg-white border-l-4 border-l-amber-400">
            <p className="text-xs font-bold text-amber-600 mb-1">Alta prioridad operativa</p>
            <p className="text-2xl font-bold text-slate-800">60</p>
            <p className="text-xs text-slate-500">No tamizados</p>
          </div>
          <div className="border border-emerald-200 rounded-lg p-4 bg-white border-l-4 border-l-emerald-400">
            <p className="text-xs font-bold text-emerald-600 mb-1">Seguimiento estándar</p>
            <p className="text-2xl font-bold text-slate-800">89</p>
            <p className="text-xs text-slate-500">Tamizados negativos</p>
          </div>
          <div className="border border-indigo-200 rounded-lg p-4 bg-white border-l-4 border-l-indigo-400">
            <p className="text-xs font-bold text-indigo-600 mb-1">En seguimiento</p>
            <p className="text-2xl font-bold text-slate-800">50</p>
            <p className="text-xs text-slate-500">Positivos detectados</p>
          </div>
          <div className="border border-rose-200 rounded-lg p-4 bg-white border-l-4 border-l-rose-400">
            <p className="text-xs font-bold text-rose-600 mb-1">Población (no detectados)</p>
            <p className="text-2xl font-bold text-slate-800">16</p>
            <p className="text-[10px] text-slate-500">Esperados no detectados<br/>(Prevalencia - Hit)</p>
          </div>
        </div>
      </div>

      {/* 9. Tabla de Pacientes */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-800">Pacientes (199)</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-[11px] text-left">
            <thead className="text-slate-500 bg-slate-50/50">
              <tr>
                <th className="px-4 py-3 font-medium">Unidad</th>
                <th className="px-4 py-3 font-medium">Documento</th>
                <th className="px-4 py-3 font-medium">Paciente</th>
                <th className="px-4 py-3 font-medium">Edad</th>
                <th className="px-4 py-3 font-medium">Estado screening</th>
                <th className="px-4 py-3 font-medium">Categoría</th>
                <th className="px-4 py-3 font-medium">Instrumento</th>
                <th className="px-4 py-3 font-medium">Resultado</th>
                <th className="px-4 py-3 font-medium">Fecha</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {pacientes.map((p, index) => (
                <tr key={index} className="hover:bg-slate-50">
                  <td className="px-4 py-3">
                    <span className="font-semibold text-teal-600">{p.unidad}</span>
                  </td>
                  <td className="px-4 py-3 font-medium text-slate-800">{p.doc}</td>
                  <td className="px-4 py-3 text-slate-700">{p.paciente}</td>
                  <td className="px-4 py-3 text-slate-600">{p.edad}</td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-0.5 rounded-sm font-bold text-[9px] bg-emerald-100 text-emerald-700">{p.estado}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded-sm font-bold text-[9px] ${
                      p.categoria === 'Psiquiátrica' ? 'bg-purple-100 text-purple-700' : p.categoria === 'Cognitiva' ? 'bg-sky-100 text-sky-700' : 'bg-rose-100 text-rose-700'
                    }`}>{p.categoria}</span>
                  </td>
                  <td className="px-4 py-3 text-slate-600">{p.instrumento}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded-sm font-bold text-[9px] ${
                      p.resultado === 'Positivo' ? 'bg-rose-100 text-rose-700' : 'bg-emerald-100 text-emerald-700'
                    }`}>{p.resultado}</span>
                  </td>
                  <td className="px-4 py-3 text-slate-600">{p.fecha}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}