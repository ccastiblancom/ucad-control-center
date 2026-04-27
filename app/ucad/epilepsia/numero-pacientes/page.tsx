"use client";

import Link from "next/link";
import { ArrowLeft, Calendar, Filter, Search, Users, FileDigit, TrendingUp, BarChart3, PieChart } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, PieChart as RePieChart, Pie } from "recharts";

// Datos de prueba para el gráfico mensual
const dataMensual = [
  { name: 'Ene', pacientes: 4 }, { name: 'Feb', pacientes: 4 },
  { name: 'Mar', pacientes: 8 }, { name: 'Abr', pacientes: 6 },
  { name: 'May', pacientes: 15 }, { name: 'Jun', pacientes: 20 },
  { name: 'Jul', pacientes: 6 }, { name: 'Ago', pacientes: 6 },
  { name: 'Sep', pacientes: 14 }, { name: 'Oct', pacientes: 10 },
  { name: 'Nov', pacientes: 7 }, { name: 'Dic', pacientes: 16 },
];

// --- NUEVOS DATOS RELACIONADOS (Distribución Clínica) ---
const dataDiagInstitucional = [
  { name: 'Leve', valor: 25, color: '#10b981' },
  { name: 'Mod. Estable', valor: 45, color: '#f59e0b' },
  { name: 'Mod. Inestable', valor: 30, color: '#f97316' },
  { name: 'Severa', valor: 16, color: '#ef4444' },
];

const dataTipoEpilepsia = [
  { name: 'Focal', valor: 68, color: '#0ea5e9' },
  { name: 'Generalizada', valor: 32, color: '#6366f1' },
  { name: 'Desconocida', valor: 16, color: '#94a3b8' },
];

const dataEtiologia = [
  { name: 'Estructural', valor: 40 },
  { name: 'Genética', valor: 35 },
  { name: 'Infecciosa', valor: 15 },
  { name: 'Metabólica', valor: 10 },
  { name: 'Inmune', valor: 8 },
  { name: 'Desconocida', valor: 8 },
];

// Datos de prueba ampliados para la tabla
const pacientes = [
  { 
    tipo: "Hospitalización", fecha: "2025-12-28", doc: "1028498346", nombre: "DAVID CAMILO RODRIGUEZ MAYORGA", edad: "13 años", medico: "LAURA VICTORIA GUIO MAHECHA", dx: "G402", diag: "Epilepsia y síndromes epilépticos sintomáticos...",
    diagInst: "Mod. Inestable", tipoEpi: "Focal", etiologia: "Estructural", severidad: "Alta", refractaria: "Sí", estatus: "No"
  },
  { 
    tipo: "Consulta Externa", fecha: "2025-12-23", doc: "1120395322", nombre: "ANNA VICTORIA MARTINEZ GUERRERO", edad: "1 años", medico: "LAURA VICTORIA GUIO MAHECHA", dx: "G402", diag: "Epilepsia y síndromes epilépticos sintomáticos...",
    diagInst: "Leve", tipoEpi: "Generalizada", etiologia: "Genética", severidad: "Baja", refractaria: "No", estatus: "No"
  },
  { 
    tipo: "Consulta Externa", fecha: "2025-12-22", doc: "1093506529", nombre: "EVELYN TAILETH LOPEZ MONSALVA", edad: "3 años", medico: "LAURA VICTORIA GUIO MAHECHA", dx: "G402", diag: "Epilepsia y síndromes epilépticos sintomáticos...",
    diagInst: "Severa", tipoEpi: "Focal", etiologia: "Desconocida", severidad: "Alta", refractaria: "Sí", estatus: "Sí"
  },
  { 
    tipo: "Consulta Externa", fecha: "2025-12-16", doc: "1230345002", nombre: "ANA SALOME PIÑEROS GUTIERREZ", edad: "7 años", medico: "LAURA VICTORIA GUIO MAHECHA", dx: "G409", diag: "Epilepsia, tipo no especificado",
    diagInst: "Mod. Estable", tipoEpi: "Generalizada", etiologia: "Infecciosa", severidad: "Media", refractaria: "No", estatus: "No"
  },
  { 
    tipo: "Consulta Externa", fecha: "2025-12-11", doc: "1011268334", nombre: "DULCE MARIA HERNANDEZ QUITIAN", edad: "1 años", medico: "EDWIN FABIAN FORERO SANCHEZ", dx: "G402", diag: "Epilepsia y síndromes epilépticos sintomáticos...",
    diagInst: "Leve", tipoEpi: "Focal", etiologia: "Genética", severidad: "Baja", refractaria: "No", estatus: "No"
  },
];

export default function NumeroPacientesDashboard() {
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

      <div className="relative z-10 max-w-7xl mx-auto mt-4 px-4">
        {/* 1. Encabezado */}
        <div className="flex items-center gap-4 mb-6">
          <Link href="/ucad/epilepsia" className="p-2 hover:bg-white/80 rounded-full transition-colors bg-white/50 border border-slate-200 shadow-sm">
            <ArrowLeft className="w-5 h-5 text-slate-600" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Número de pacientes con epilepsia</h1>
            <p className="text-sm text-slate-500">Resultados clínicos – UCAD Epilepsia</p>
          </div>
        </div>

        {/* 2. Barra de Filtros */}
        <div className="flex flex-wrap items-center gap-4 mb-8 text-sm text-slate-600">
          <div className="flex items-center gap-2 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-md border border-slate-200 shadow-sm">
            <Calendar className="w-4 h-4 text-slate-400" />
            <select className="bg-transparent outline-none cursor-pointer text-slate-700 font-medium">
              <option>Últimos 12 meses</option>
            </select>
          </div>
          <div className="flex items-center gap-2 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-md border border-slate-200 shadow-sm flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400" />
            <input type="text" placeholder="Buscar por documento o nombre" className="w-full bg-transparent outline-none" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          {/* Tarjeta Principal Izquierda */}
          <div className="lg:col-span-1 bg-gradient-to-br from-[#0099e5] to-[#00b3f0] rounded-xl p-6 text-white shadow-md relative overflow-hidden flex flex-col justify-center">
            <h2 className="text-sm font-medium opacity-90 mb-1">Total Pacientes</h2>
            <div className="text-5xl font-bold mb-2">116</div>
            <p className="text-xs opacity-80 leading-tight">Conteo por documento único en el periodo actual</p>
            <Users className="absolute -right-4 -bottom-4 w-24 h-24 opacity-20" />
          </div>

          {/* Gráfico Tendencia Mensual */}
          <div className="lg:col-span-3 bg-white/90 backdrop-blur-sm p-5 rounded-xl shadow-sm border border-slate-200">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-bold text-slate-800">Distribución mensual de ingresos</h3>
              <div className="flex items-center gap-2 text-[10px] text-slate-400 uppercase font-bold tracking-wider">
                <TrendingUp className="w-3 h-3" /> Tendencia 2024
              </div>
            </div>
            <div className="h-40 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dataMensual}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} />
                  <Tooltip cursor={{ fill: '#f8fafc' }} />
                  <Bar dataKey="pacientes" fill="#14b8a6" radius={[4, 4, 0, 0]} barSize={25} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* --- SECCIÓN NUEVA: RELACIÓN CLÍNICA --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Gráfico 1: Diagnóstico Institucional */}
          <div className="bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-sm border border-slate-200">
            <div className="flex items-center gap-2 mb-6">
              <div className="p-2 bg-amber-50 rounded-lg"><BarChart3 className="w-4 h-4 text-amber-600" /></div>
              <h3 className="text-sm font-bold text-slate-800">Diagnóstico Institucional</h3>
            </div>
            <div className="h-52 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dataDiagInstitucional} layout="vertical" margin={{ left: -10, right: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                  <XAxis type="number" hide />
                  <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748b' }} width={80} />
                  <Tooltip cursor={{ fill: 'transparent' }} />
                  <Bar dataKey="valor" radius={[0, 4, 4, 0]} barSize={18}>
                    {dataDiagInstitucional.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Gráfico 2: Tipo de Epilepsia */}
          <div className="bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-sm border border-slate-200 flex flex-col">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-2 bg-blue-50 rounded-lg"><PieChart className="w-4 h-4 text-blue-600" /></div>
              <h3 className="text-sm font-bold text-slate-800">Tipo de Epilepsia</h3>
            </div>
            <div className="flex-1 flex items-center">
              <div className="h-44 w-1/2">
                <ResponsiveContainer width="100%" height="100%">
                  <RePieChart>
                    <Pie data={dataTipoEpilepsia} innerRadius={45} outerRadius={65} paddingAngle={5} dataKey="valor">
                      {dataTipoEpilepsia.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </RePieChart>
                </ResponsiveContainer>
              </div>
              <div className="w-1/2 space-y-3 pl-4">
                {dataTipoEpilepsia.map((item, i) => (
                  <div key={i} className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></div>
                      <span className="text-[11px] font-medium text-slate-500 uppercase">{item.name}</span>
                    </div>
                    <span className="text-sm font-bold text-slate-800 ml-4">{item.valor}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Gráfico 3: Etiología */}
          <div className="bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-sm border border-slate-200">
            <div className="flex items-center gap-2 mb-6">
              <div className="p-2 bg-teal-50 rounded-lg"><Users className="w-4 h-4 text-teal-600" /></div>
              <h3 className="text-sm font-bold text-slate-800">Etiología (Top Causas)</h3>
            </div>
            <div className="h-52 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dataEtiologia} margin={{ left: -25 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 9, fill: '#94a3b8' }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 9, fill: '#94a3b8' }} />
                  <Tooltip />
                  <Bar dataKey="valor" fill="#2dd4bf" radius={[3, 3, 0, 0]} barSize={20} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* 5. Mini Tarjetas de Resumen */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-sm border border-slate-200 flex justify-between items-center">
            <div>
              <p className="text-sm text-slate-500 mb-1 font-semibold uppercase tracking-wider">Consulta Externa</p>
              <p className="text-3xl font-bold text-slate-800">93</p>
              <p className="text-xs text-slate-400 mt-1">Pacientes únicos registrados</p>
            </div>
            <div className="p-3 bg-teal-500 text-white rounded-xl shadow-sm">
              <FileDigit className="w-8 h-8" />
            </div>
          </div>
          <div className="bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-sm border border-slate-200 flex justify-between items-center">
            <div>
              <p className="text-sm text-slate-500 mb-1 font-semibold uppercase tracking-wider">Hospitalización</p>
              <p className="text-3xl font-bold text-slate-800">23</p>
              <p className="text-xs text-slate-400 mt-1">Pacientes únicos registrados</p>
            </div>
            <div className="p-3 bg-blue-600 text-white rounded-xl shadow-sm">
              <TrendingUp className="w-8 h-8" />
            </div>
          </div>
        </div>

        {/* 6. Tabla de Detalles */}
        <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-white/50">
            <div>
              <h3 className="text-lg font-bold text-slate-800">Detalle de pacientes</h3>
              <p className="text-sm text-slate-500">Listado clínico detallado (Población total: 116)</p>
            </div>
            <button className="text-xs font-bold text-blue-600 bg-white px-3 py-2 rounded-lg border border-blue-100 hover:bg-blue-50 transition-colors">
              Exportar CSV
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-slate-500 bg-slate-50/50">
                <tr>
                  <th className="px-6 py-4 font-bold uppercase tracking-wider">Unidad</th>
                  <th className="px-6 py-4 font-bold uppercase tracking-wider">Documento</th>
                  <th className="px-6 py-4 font-bold uppercase tracking-wider">Paciente</th>
                  <th className="px-6 py-4 font-bold uppercase tracking-wider">Edad</th>
                  <th className="px-6 py-4 font-bold uppercase tracking-wider">Diag. Institucional</th>
                  <th className="px-6 py-4 font-bold uppercase tracking-wider">Tipo Epilepsia</th>
                  <th className="px-6 py-4 font-bold uppercase tracking-wider">Etiología</th>
                  <th className="px-6 py-4 font-bold uppercase tracking-wider text-center">Refractaria</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white/30">
                {pacientes.map((p, index) => (
                  <tr key={index} className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-[10px] font-bold rounded-md uppercase ${
                        p.tipo === "Hospitalización" ? "bg-blue-50 text-blue-600 border border-blue-100" : "bg-teal-50 text-teal-600 border border-teal-100"
                      }`}>
                        {p.tipo}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-bold text-slate-800">{p.doc}</td>
                    <td className="px-6 py-4 text-slate-600 font-medium">{p.nombre}</td>
                    <td className="px-6 py-4 text-slate-500">{p.edad}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-[10px] font-bold rounded-md border ${
                        p.diagInst.includes('Leve') ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                        p.diagInst.includes('Severa') ? 'bg-rose-50 text-rose-700 border-rose-200' :
                        'bg-amber-50 text-amber-700 border-amber-200'
                      }`}>
                        {p.diagInst}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-600">{p.tipoEpi}</td>
                    <td className="px-6 py-4 text-slate-600">{p.etiologia}</td>
                    <td className="px-6 py-4 text-center">
                      <span className={`px-2 py-0.5 rounded font-bold text-[10px] ${
                        p.refractaria === 'Sí' ? 'bg-rose-100 text-rose-700' : 'bg-slate-100 text-slate-500'
                      }`}>{p.refractaria}</span>
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