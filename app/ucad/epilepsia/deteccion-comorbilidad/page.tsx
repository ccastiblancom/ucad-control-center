"use client";

import Link from "next/link";
import { ArrowLeft, Calendar, Filter, Search, TrendingUp, Users, CheckCircle2, AlertTriangle, Brain, Activity, Heart, Eye } from "lucide-react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

// Datos de prueba para gráficos
const dataTiempo = [
  { name: 'Enero', valor: 65 }, { name: 'Febrero', valor: 61 },
  { name: 'Marzo', valor: 57 }, { name: 'Abril', valor: 57.1 },
  { name: 'Mayo', valor: 57.1 }, { name: 'Junio', valor: 57.1 },
];

const dataInstrumento = [
  { name: 'PHQ-9', valor: 90 },
  { name: 'GAD-7', valor: 75 },
  { name: 'Cognitivo', valor: 50 },
  { name: 'Físico', valor: 50 },
  { name: 'BDI-II', valor: 25 },
  { name: 'BAI', valor: 18 },
];

const dataCategoria = [
  { name: 'Salud mental', valor: 40 },
  { name: 'Cognitivo', valor: 45 },
  { name: 'Salud física', valor: 18 },
  { name: 'Sensorial', valor: 12.5 },
];

const dataUnidad = [
  { name: 'Consulta Externa', valor: 85 },
  { name: 'UCI', valor: 60 },
  { name: 'Hospitalización', valor: 45 },
  { name: 'Urgencias', valor: 0 },
];

const pacientes = [
  { unidad: "Consulta Externa", doc: "7981231567", paciente: "Ana María López Cruz", edad: "12 años", estado: "Tamizado", categoria: "Mental", instrumento: "PHQ-9", resultado: "Positivo", severidad: "Moderada", fecha: "15/02/2024" },
  { unidad: "Hospitalización", doc: "7982345678", paciente: "Carlos Gómez Rivera", edad: "9 años", estado: "Tamizado", categoria: "Mental", instrumento: "GAD-7", resultado: "Negativo", severidad: "Leve", fecha: "12/01/2024" },
  { unidad: "Consulta Externa", doc: "7983456789", paciente: "Laura Pérez Santos", edad: "11 años", estado: "Tamizado", categoria: "Mental", instrumento: "PHQ-9", resultado: "Positivo", severidad: "Moderada", fecha: "22/05/2024" },
  { unidad: "Consulta Externa", doc: "7984567890", paciente: "Miguel Torres Ruiz", edad: "11 años", estado: "Tamizado", categoria: "Cognitivo", instrumento: "Cognitivo", resultado: "Positivo", severidad: "Moderada", fecha: "18/01/2024" },
  { unidad: "Consulta Externa", doc: "7985678901", paciente: "Sofía Hernández Cruz", edad: "13 años", estado: "Tamizado", categoria: "Mental", instrumento: "GAD-7", resultado: "Positivo", severidad: "Moderada", fecha: "22/01/2024" },
  { unidad: "Consulta Externa", doc: "7986789012", paciente: "Daniel Vargas Luna", edad: "8 años", estado: "Tamizado", categoria: "Mental", instrumento: "PHQ-9", resultado: "Negativo", severidad: "Leve", fecha: "25/01/2024" },
  { unidad: "Consulta Externa", doc: "7987890123", paciente: "Valentina Castro Díaz", edad: "7 años", estado: "Tamizado", categoria: "Física", instrumento: "Físico", resultado: "Negativo", severidad: "Leve", fecha: "26/01/2024" },
  { unidad: "Consulta Externa", doc: "7988901234", paciente: "Mateo Morales Reyes", edad: "10 años", estado: "Tamizado", categoria: "Mental", instrumento: "BDI-II", resultado: "Positivo", severidad: "Moderada", fecha: "05/02/2024" },
  { unidad: "Consulta Externa", doc: "7989012345", paciente: "Isabella Rojas Ortiz", edad: "12 años", estado: "Tamizado", categoria: "Mental", instrumento: "GAD-7", resultado: "Negativo", severidad: "Leve", fecha: "08/02/2024" },
  { unidad: "Consulta Externa", doc: "7990123456", paciente: "Sebastián Navarro Ríos", edad: "9 años", estado: "Tamizado", categoria: "Cognitivo", instrumento: "Cognitivo", resultado: "Negativo", severidad: "Leve", fecha: "12/02/2024" },
];

export default function DeteccionComorbilidadDashboard() {
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
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Detección de comorbilidad</h1>
          <p className="text-sm text-slate-500">Tamizaje sistemático - salud mental, cognitiva y física</p>
          <p className="text-xs text-slate-400 mt-1">% screening de comorbilidades frecuentes: depresión, ansiedad, cognitivo, salud física.</p>
        </div>
      </div>

      {/* 2. Barra de Filtros */}
      <div className="flex flex-wrap items-center gap-4 mb-8 text-sm text-slate-600">
        <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-md border border-slate-200 shadow-sm"><Calendar className="w-4 h-4 text-slate-400" /><select className="bg-transparent outline-none cursor-pointer"><option>Últimos 6 meses</option></select></div>
        <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-md border border-slate-200 shadow-sm"><Filter className="w-4 h-4 text-slate-400" /><select className="bg-transparent outline-none cursor-pointer"><option>Todas las unidades</option></select></div>
        <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-md border border-slate-200 shadow-sm flex-1 max-w-md"><Search className="w-4 h-4 text-slate-400" /><input type="text" placeholder="Buscar por documento o nombre" className="w-full bg-transparent outline-none" /></div>
      </div>

      {/* 3. KPIs Superiores (Ajustado a grid de 4 para 8 tarjetas simétricas) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 border-t-4 border-t-teal-500">
          <div className="p-1.5 bg-teal-50 rounded-md w-fit mb-2"><TrendingUp className="w-4 h-4 text-teal-600" /></div>
          <p className="text-[10px] text-slate-500 mb-1 font-semibold">% Pacientes tamizados</p>
          <p className="text-xl font-bold text-slate-800">57.1%</p>
          <p className="text-[9px] text-slate-400">cobertura global</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 border-t-4 border-t-blue-500">
          <div className="p-1.5 bg-blue-50 rounded-md w-fit mb-2"><Users className="w-4 h-4 text-blue-600" /></div>
          <p className="text-[10px] text-slate-500 mb-1 font-semibold">Pacientes elegibles</p>
          <p className="text-xl font-bold text-slate-800">91</p>
          <p className="text-[9px] text-slate-400">con epilepsia activa</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 border-t-4 border-t-emerald-500">
          <div className="p-1.5 bg-emerald-50 rounded-md w-fit mb-2"><CheckCircle2 className="w-4 h-4 text-emerald-600" /></div>
          <p className="text-[10px] text-slate-500 mb-1 font-semibold">Pacientes tamizados</p>
          <p className="text-xl font-bold text-slate-800">52</p>
          <p className="text-[9px] text-slate-400">al menos 1 instrumento</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 border-t-4 border-t-amber-500">
          <div className="p-1.5 bg-amber-50 rounded-md w-fit mb-2"><AlertTriangle className="w-4 h-4 text-amber-600" /></div>
          <p className="text-[10px] text-slate-500 mb-1 font-semibold">% Positivos (cualquier)</p>
          <p className="text-xl font-bold text-slate-800">42.3%</p>
          <p className="text-[9px] text-slate-400">22 pacientes</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 border-t-4 border-t-purple-500">
          <div className="p-1.5 bg-purple-50 rounded-md w-fit mb-2"><Brain className="w-4 h-4 text-purple-600" /></div>
          <p className="text-[10px] text-slate-500 mb-1 font-semibold">% Positivos salud mental</p>
          <p className="text-xl font-bold text-slate-800">44.4%</p>
          <p className="text-[9px] text-slate-400">depresión/ansiedad</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 border-t-4 border-t-sky-500">
          <div className="p-1.5 bg-sky-50 rounded-md w-fit mb-2"><Activity className="w-4 h-4 text-sky-600" /></div>
          <p className="text-[10px] text-slate-500 mb-1 font-semibold">% Positivos cognitivo</p>
          <p className="text-xl font-bold text-slate-800">50.0%</p>
          <p className="text-[9px] text-slate-400">déficit atención/memoria</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 border-t-4 border-t-rose-500">
          <div className="p-1.5 bg-rose-50 rounded-md w-fit mb-2"><Heart className="w-4 h-4 text-rose-600" /></div>
          <p className="text-[10px] text-slate-500 mb-1 font-semibold">% Positivos salud física</p>
          <p className="text-xl font-bold text-slate-800">25.0%</p>
          <p className="text-[9px] text-slate-400">cardiovascular/metabólico</p>
        </div>
        
        {/* NUEVA TARJETA: Alteración Sensorial */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 border-t-4 border-t-orange-500">
          <div className="p-1.5 bg-orange-50 rounded-md w-fit mb-2"><Eye className="w-4 h-4 text-orange-600" /></div>
          <p className="text-[10px] text-slate-500 mb-1 font-semibold">% Alteración sensorial</p>
          <p className="text-xl font-bold text-slate-800">12.5%</p>
          <p className="text-[9px] text-slate-400">visión / audición</p>
        </div>
      </div>

      {/* 4. Gráficos Fila 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-base font-bold text-slate-800 mb-6">Cobertura de tamizaje en el tiempo</h3>
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={dataTiempo} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10 }} axisLine={false} tickLine={false} domain={[0, 80]} />
                <Tooltip />
                <Line type="monotone" dataKey="valor" stroke="#14b8a6" strokeWidth={2} dot={{ r: 4 }} name="% Tamizados" />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center mt-2 text-xs font-medium text-slate-600">
            <span className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-[#14b8a6]"></div> % Tamizados</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-base font-bold text-slate-800 mb-6">Cobertura por instrumento</h3>
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart layout="vertical" data={dataInstrumento} margin={{ top: 0, right: 20, left: 20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} domain={[0, 100]} />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} width={60} />
                <Tooltip cursor={{ fill: '#f1f5f9' }} />
                <Bar dataKey="valor" fill="#8b5cf6" barSize={16} name="% Pacientes" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="text-center text-xs text-slate-500 mt-2 font-medium">% Pacientes</div>
        </div>
      </div>

      {/* 5. Gráficos Fila 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-base font-bold text-slate-800 mb-6">Positividad por categoría</h3>
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dataCategoria} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10 }} axisLine={false} tickLine={false} domain={[0, 60]} />
                <Tooltip cursor={{ fill: '#f1f5f9' }} />
                <Bar dataKey="valor" fill="#f59e0b" barSize={60} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex flex-col">
          <h3 className="text-base font-bold text-slate-800 mb-6">Matriz de priorización</h3>
          <div className="grid grid-cols-2 gap-4 flex-1">
            <div className="border border-amber-200 rounded-lg p-4 bg-amber-50/30 flex flex-col justify-center">
              <p className="text-xs font-bold text-amber-600 mb-1">Alta prioridad</p>
              <p className="text-2xl font-bold text-slate-800">39</p>
              <p className="text-xs text-slate-600">No tamizado</p>
            </div>
            <div className="border border-blue-200 rounded-lg p-4 bg-blue-50/30 flex flex-col justify-center">
              <p className="text-xs font-bold text-blue-600 mb-1">Seguimiento estándar</p>
              <p className="text-2xl font-bold text-slate-800">30</p>
              <p className="text-xs text-slate-600">Tamizado negativo</p>
            </div>
            <div className="border border-rose-200 rounded-lg p-4 bg-rose-50/30 flex flex-col justify-center">
              <p className="text-xs font-bold text-rose-600 mb-1">Alerta clínica</p>
              <p className="text-2xl font-bold text-slate-800">7</p>
              <p className="text-xs text-slate-600">Positivo sin plan</p>
            </div>
            <div className="border border-emerald-200 rounded-lg p-4 bg-emerald-50/30 flex flex-col justify-center">
              <p className="text-xs font-bold text-emerald-600 mb-1">En seguimiento</p>
              <p className="text-2xl font-bold text-slate-800">15</p>
              <p className="text-xs text-slate-600">Positivo con plan</p>
            </div>
          </div>
        </div>
      </div>

      {/* 6. Cobertura por unidad */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 mb-6">
        <h3 className="text-base font-bold text-slate-800 mb-6">Cobertura por unidad de servicio</h3>
        <div className="h-40 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart layout="vertical" data={dataUnidad} margin={{ top: 0, right: 20, left: 30, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} domain={[0, 100]} />
              <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} width={100} />
              <Tooltip cursor={{ fill: '#f1f5f9' }} />
              <Bar dataKey="valor" fill="#0ea5e9" barSize={24} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="text-center text-xs text-slate-500 mt-2 font-medium">% Cobertura</div>
      </div>

      {/* 7. Tabla de Pacientes */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-100">
          <h3 className="text-lg font-bold text-slate-800">Pacientes (91)</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-[11px] text-left">
            <thead className="text-slate-500 bg-slate-50/50">
              <tr>
                <th className="px-4 py-3 font-medium">Unidad</th>
                <th className="px-4 py-3 font-medium">Documento</th>
                <th className="px-4 py-3 font-medium">Paciente</th>
                <th className="px-4 py-3 font-medium">Edad</th>
                <th className="px-4 py-3 font-medium">Estado tamizaje</th>
                <th className="px-4 py-3 font-medium">Categoría</th>
                <th className="px-4 py-3 font-medium">Instrumento</th>
                <th className="px-4 py-3 font-medium">Resultado</th>
                <th className="px-4 py-3 font-medium">Severidad</th>
                <th className="px-4 py-3 font-medium">Fecha</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {pacientes.map((p, index) => (
                <tr key={index} className="hover:bg-slate-50">
                  <td className="px-4 py-3">
                    <span className={`font-semibold ${p.unidad === 'Hospitalización' ? 'text-blue-600' : 'text-teal-600'}`}>{p.unidad}</span>
                  </td>
                  <td className="px-4 py-3 font-medium text-slate-800">{p.doc}</td>
                  <td className="px-4 py-3 text-slate-700">{p.paciente}</td>
                  <td className="px-4 py-3 text-slate-600">{p.edad}</td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-0.5 rounded-sm font-bold text-[9px] bg-emerald-100 text-emerald-700">{p.estado}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded-sm font-bold text-[9px] ${
                      p.categoria === 'Mental' ? 'bg-purple-100 text-purple-700' : p.categoria === 'Cognitivo' ? 'bg-sky-100 text-sky-700' : 'bg-rose-100 text-rose-700'
                    }`}>{p.categoria}</span>
                  </td>
                  <td className="px-4 py-3 text-slate-600">{p.instrumento}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded-sm font-bold text-[9px] ${
                      p.resultado === 'Positivo' ? 'bg-rose-100 text-rose-700' : 'bg-emerald-100 text-emerald-700'
                    }`}>{p.resultado}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded-sm font-bold text-[9px] ${
                      p.severidad === 'Moderada' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'
                    }`}>{p.severidad}</span>
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