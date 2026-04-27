"use client";

import Link from "next/link";
import { ArrowLeft, Calendar, Filter, Search, Activity, CheckCircle2, Info, Link as LinkIcon, AlertTriangle, Clock, FileText, TrendingUp, BarChart3, PieChart, FileDigit } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, PieChart as RePieChart, Pie } from "recharts";

// Datos de prueba para gráficos
const dataCrisis = [
  { name: 'Ene', nuevos: 0, recurrentes: 0 }, { name: 'Feb', nuevos: 0, recurrentes: 0 },
  { name: 'Mar', nuevos: 0, recurrentes: 0 }, { name: 'Abr', nuevos: 0, recurrentes: 0 },
  { name: 'May', nuevos: 0, recurrentes: 0 }, { name: 'Jun', nuevos: 0, recurrentes: 0 },
  { name: 'Jul', nuevos: 0, recurrentes: 0 }, { name: 'Ago', nuevos: 0, recurrentes: 0 },
  { name: 'Sep', nuevos: 0, recurrentes: 0 }, { name: 'Oct', nuevos: 0, recurrentes: 0 },
  { name: 'Nov', nuevos: 0, recurrentes: 0 }, { name: 'Dic', nuevos: 0, recurrentes: 0 },
];

const pacientes = [
  { tipo: "Hospitalización", doc: "1028498346", nombre: "DAVID CAMILO RODRIGUEZ MAYORGA", edad: "13 años", medico: "LAURA VICTORIA GUIO...", fecha: "2023-11-01", severidad: "Moderada estable", diagInst: "Moderada estable", tasaHosp: "15%", refrac: "No", estatus: "Sí" },
  { tipo: "Consulta Externa", doc: "1120395322", nombre: "ANNA VICTORIA MARTINEZ GUERRERO", edad: "1 años", medico: "LAURA VICTORIA GUIO...", fecha: "-", severidad: "Moderada inestable", diagInst: "Moderada inestable", tasaHosp: "25%", refrac: "Sí", estatus: "No" },
  { tipo: "Consulta Externa", doc: "1093506529", nombre: "EVELYN TAILETH LOPEZ MONSALVA", edad: "3 años", medico: "LAURA VICTORIA GUIO...", fecha: "-", severidad: "Severa", diagInst: "Severa", tasaHosp: "40%", refrac: "Sí", estatus: "No" },
  { tipo: "Consulta Externa", doc: "1230345002", nombre: "ANA SALOME PIÑEROS GUTIERREZ", edad: "7 años", medico: "LAURA VICTORIA GUIO...", fecha: "2024-01-03", severidad: "Moderada inestable", diagInst: "Leve", tasaHosp: "5%", refrac: "Sí", estatus: "No" },
  { tipo: "Consulta Externa", doc: "1011268334", nombre: "DULCE MARIA HERNANDEZ QUITIAN", edad: "1 años", medico: "EDWIN FABIAN FORERO...", fecha: "-", severidad: "Severa", diagInst: "Severa", tasaHosp: "35%", refrac: "Sí", estatus: "No" },
];

export default function ControlCrisisDashboard() {
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

      <div className="relative z-10 max-w-7xl mx-auto mt-4 px-4 pb-12">
        {/* 1. Encabezado */}
        <div className="flex items-center gap-4 mb-6">
          <Link href="/ucad/epilepsia" className="p-2 hover:bg-slate-200 rounded-full transition-colors flex items-center gap-2 text-sm font-medium text-slate-600 bg-white/50 border border-slate-200 shadow-sm">
            <ArrowLeft className="w-4 h-4" /> Volver
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Control de Crisis</h1>
            <p className="text-sm text-slate-500">UCAD Epilepsia • Resultados Clínicos</p>
          </div>
        </div>

        {/* 2. Barra de Filtros */}
        <div className="flex flex-wrap items-center gap-4 mb-8 text-sm text-slate-600">
          <div className="flex items-center gap-2 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-md border border-slate-200 shadow-sm">
            <Calendar className="w-4 h-4 text-slate-400" />
            <select className="bg-transparent outline-none cursor-pointer font-medium"><option>Últimos 6 meses</option></select>
          </div>
          <div className="flex items-center gap-2 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-md border border-slate-200 shadow-sm">
            <Filter className="w-4 h-4 text-slate-400" />
            <select className="bg-transparent outline-none cursor-pointer font-medium"><option>Todas las unidades</option></select>
          </div>
          <div className="flex items-center gap-2 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-md border border-slate-200 shadow-sm">
            <Filter className="w-4 h-4 text-slate-400" />
            <select className="bg-transparent outline-none cursor-pointer font-medium"><option>Todas las fuentes</option></select>
          </div>
          <div className="flex items-center gap-2 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-md border border-slate-200 shadow-sm flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400" />
            <input type="text" placeholder="Buscar paciente..." className="w-full bg-transparent outline-none" />
          </div>
        </div>

        {/* 3. KPIs Superiores */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
          <div className="bg-white/90 backdrop-blur-sm p-4 rounded-xl shadow-sm border border-slate-200 flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs text-slate-500 mb-1">Frecuencia de crisis</p>
                <p className="text-2xl font-bold text-[#009988]">5.6</p>
                <p className="text-xs text-slate-500">crisis/mes promedio</p>
              </div>
              <div className="p-2 bg-teal-50 rounded-lg"><Activity className="w-5 h-5 text-teal-600" /></div>
            </div>
            <div className="mt-4 text-xs font-medium text-teal-600 flex items-center gap-1">↘ -8% vs anterior</div>
          </div>

          <div className="bg-white/90 backdrop-blur-sm p-4 rounded-xl shadow-sm border border-slate-200 flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs text-slate-500 mb-1">Pacientes sin crisis</p>
                <p className="text-2xl font-bold text-[#009988]">52%</p>
                <p className="text-xs text-slate-500">con 0 crisis</p>
              </div>
              <div className="p-2 bg-green-50 rounded-lg"><CheckCircle2 className="w-5 h-5 text-green-600" /></div>
            </div>
          </div>

          <div className="bg-white/90 backdrop-blur-sm p-4 rounded-xl shadow-sm border border-slate-200 flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs text-slate-500 mb-1">Severidad promedio</p>
                <p className="text-2xl font-bold text-blue-600">0</p>
                <p className="text-xs text-slate-500">índice 1 - 5</p>
              </div>
              <div className="p-2 bg-blue-50 rounded-lg"><Info className="w-5 h-5 text-blue-600" /></div>
            </div>
          </div>

          <div className="bg-white/90 backdrop-blur-sm p-4 rounded-xl shadow-sm border border-slate-200 flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs text-slate-500 mb-1">Adherencia terapéutica</p>
                <p className="text-2xl font-bold text-indigo-600">0%</p>
                <p className="text-xs text-slate-500">adherencia promedio</p>
              </div>
              <div className="p-2 bg-indigo-50 rounded-lg"><LinkIcon className="w-5 h-5 text-indigo-600" /></div>
            </div>
            <div className="mt-4 text-xs font-medium text-amber-600">0 con baja adherencia</div>
          </div>

          <div className="bg-white/90 backdrop-blur-sm p-4 rounded-xl shadow-sm border border-slate-200 flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs text-slate-500 mb-1">Eventos de riesgo</p>
                <p className="text-2xl font-bold text-amber-500">56</p>
                <p className="text-xs text-slate-500">eventos</p>
              </div>
              <div className="p-2 bg-amber-50 rounded-lg"><AlertTriangle className="w-5 h-5 text-amber-600" /></div>
            </div>
            <div className="mt-4 text-xs font-medium text-amber-600 flex items-center gap-1">↗ +5% vs anterior</div>
          </div>
        </div>

        {/* 4. Gráficos Principales */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-sm border border-slate-200">
            <h3 className="text-base font-bold text-slate-800">Crisis por mes</h3>
            <p className="text-xs text-slate-500 mb-6">Distribución mensual de crisis epilépticas</p>
            <div className="h-48 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dataCrisis} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 10 }} axisLine={false} tickLine={false} domain={[0, 4]} />
                  <Tooltip cursor={{ fill: '#f8fafc' }} />
                  <Bar dataKey="nuevos" fill="#009988" stackId="a" radius={[2, 2, 0, 0]} />
                  <Bar dataKey="recurrentes" fill="#3b82f6" stackId="a" radius={[2, 2, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-sm border border-slate-200">
            <h3 className="text-base font-bold text-slate-800">Severidad</h3>
            <p className="text-xs text-slate-500 mb-6">Distribución por nivel de severidad</p>
            <div className="h-48 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dataCrisis} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 10 }} axisLine={false} tickLine={false} domain={[0, 4]} />
                  <Tooltip cursor={{ fill: '#f8fafc' }} />
                  <Bar dataKey="nuevos" fill="#22c55e" radius={[4, 4, 0, 0]} barSize={25} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* 5. Heatmap y Tipos de Epilepsia */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-sm border border-slate-200">
            <h3 className="text-base font-bold text-slate-800">¿Cuándo ocurren las crisis?</h3>
            <p className="text-xs text-slate-500 mb-6">Patrón de ocurrencia por día y franja horaria</p>
            <div className="grid grid-cols-5 gap-1 text-center text-xs">
              <div className="col-span-1"></div>
              <div className="font-medium text-slate-500 pb-2">Madrugada</div>
              <div className="font-medium text-slate-500 pb-2">Mañana</div>
              <div className="font-medium text-slate-500 pb-2">Tarde</div>
              <div className="font-medium text-slate-500 pb-2">Noche</div>

              <div className="flex items-center text-slate-500 font-medium">Lunes</div>
              <div className="bg-blue-400 text-white p-2 rounded-sm">3</div>
              <div className="bg-blue-200 text-blue-800 p-2 rounded-sm">1</div>
              <div className="bg-blue-400 text-white p-2 rounded-sm">3</div>
              <div className="bg-blue-200 text-blue-800 p-2 rounded-sm">1</div>

              <div className="flex items-center text-slate-500 font-medium mt-1">Martes</div>
              <div className="bg-blue-300 text-blue-900 p-2 rounded-sm mt-1">2</div>
              <div className="bg-blue-200 text-blue-800 p-2 rounded-sm mt-1">1</div>
              <div className="bg-blue-500 text-white p-2 rounded-sm mt-1">4</div>
              <div className="bg-blue-200 text-blue-800 p-2 rounded-sm mt-1">1</div>

              <div className="flex items-center text-slate-500 font-medium mt-1">Miércoles</div>
              <div className="bg-blue-600 text-white p-2 rounded-sm mt-1">5</div>
              <div className="bg-blue-200 text-blue-800 p-2 rounded-sm mt-1">1</div>
              <div className="bg-blue-500 text-white p-2 rounded-sm mt-1">4</div>
              <div className="bg-blue-300 text-blue-900 p-2 rounded-sm mt-1">2</div>

              <div className="flex items-center text-slate-500 font-medium mt-1">Jueves</div>
              <div className="bg-blue-400 text-white p-2 rounded-sm mt-1">3</div>
              <div className="bg-blue-600 text-white p-2 rounded-sm mt-1">6</div>
              <div className="bg-blue-500 text-white p-2 rounded-sm mt-1">4</div>
              <div className="bg-slate-50 rounded-sm mt-1"></div>
            </div>
          </div>

          <div className="bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-sm border border-slate-200 flex flex-col">
            <h3 className="text-base font-bold text-slate-800">Tipo de Epilepsia</h3>
            <p className="text-xs text-slate-500 mb-8">Distribución por tipo de epilepsia</p>
            <div className="space-y-6 flex-1">
              <div>
                <div className="flex justify-between text-sm font-medium text-slate-700 mb-1"><span>Focal</span><span>95</span></div>
                <div className="w-full bg-slate-100 rounded-full h-2"><div className="bg-blue-600 h-2 rounded-full" style={{ width: '80%' }}></div></div>
              </div>
              <div>
                <div className="flex justify-between text-sm font-medium text-slate-700 mb-1"><span>Multifocal</span><span>10</span></div>
                <div className="w-full bg-slate-100 rounded-full h-2"><div className="bg-blue-600 h-2 rounded-full" style={{ width: '15%' }}></div></div>
              </div>
              <div>
                <div className="flex justify-between text-sm font-medium text-slate-700 mb-1"><span>Generalizada</span><span>8</span></div>
                <div className="w-full bg-slate-100 rounded-full h-2"><div className="bg-slate-300 h-2 rounded-full" style={{ width: '10%' }}></div></div>
              </div>
              <div>
                <div className="flex justify-between text-sm font-medium text-slate-700 mb-1"><span>Desconocida</span><span>3</span></div>
                <div className="w-full bg-slate-100 rounded-full h-2"><div className="bg-slate-300 h-2 rounded-full" style={{ width: '5%' }}></div></div>
              </div>
            </div>
            <div className="mt-8 pt-4 border-t border-slate-100 flex justify-between text-sm font-medium">
              <span className="text-slate-500">Crisis con tipo registrado</span>
              <span className="text-[#009988]">100%</span>
            </div>
          </div>
        </div>

        {/* 6. Tarjetas Inferiores */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white/90 backdrop-blur-sm p-4 rounded-xl shadow-sm border border-slate-200">
            <div className="flex justify-between items-start mb-2">
              <h4 className="text-sm text-slate-600 font-medium">Recuperación post crisis</h4>
              <div className="p-1.5 bg-teal-50 rounded-md"><Clock className="w-4 h-4 text-teal-600" /></div>
            </div>
            <p className="text-2xl font-bold text-[#009988]">18 min</p>
            <p className="text-xs text-slate-500 mb-4">mediana de recuperación</p>
            <div className="flex gap-1 items-end h-8">
              {[4,6,5,7,6,5,8,9,7].map((h, i) => <div key={i} className="flex-1 bg-teal-300 rounded-t-sm" style={{ height: `${h}0%`}}></div>)}
            </div>
          </div>

          <div className="bg-white/90 backdrop-blur-sm p-4 rounded-xl shadow-sm border border-slate-200">
            <div className="flex justify-between items-start mb-2">
              <h4 className="text-sm text-slate-600 font-medium">Requiere revisión clínica</h4>
              <div className="p-1.5 bg-amber-50 rounded-md"><AlertTriangle className="w-4 h-4 text-amber-600" /></div>
            </div>
            <p className="text-2xl font-bold text-amber-600">7</p>
            <p className="text-xs text-slate-500 mb-4">eventos que necesitan atención</p>
            <div className="flex justify-between text-xs text-slate-600 mb-1"><span>Crisis repetitivas (24h)</span><span>3</span></div>
            <div className="flex justify-between text-xs text-slate-600"><span>Recuperación prolongada</span><span>4</span></div>
          </div>

          <div className="bg-white/90 backdrop-blur-sm p-4 rounded-xl shadow-sm border border-slate-200">
            <div className="flex justify-between items-start mb-2">
              <h4 className="text-sm text-slate-600 font-medium">Registro completo</h4>
              <div className="p-1.5 bg-blue-50 rounded-md"><FileText className="w-4 h-4 text-blue-600" /></div>
            </div>
            <p className="text-2xl font-bold text-blue-600">84%</p>
            <p className="text-xs text-slate-500 mb-4">con datos completos</p>
            <p className="text-xs text-slate-400 mb-1 font-semibold">Campos más faltantes:</p>
            <div className="flex justify-between text-xs text-slate-600 mb-1"><span>• Desencadenante</span><span className="text-red-500 font-medium">16%</span></div>
            <div className="flex justify-between text-xs text-slate-600"><span>• Duración exacta</span><span className="text-red-500 font-medium">8%</span></div>
          </div>
        </div>

        {/* 7. Tabla de Pacientes */}
        <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-6 border-b border-slate-100 bg-white/50">
            <h3 className="text-lg font-bold text-slate-800">Pacientes</h3>
            <p className="text-sm text-slate-500">Mostrando 5 de 116 registros</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="text-slate-500 bg-slate-50/50">
                <tr>
                  <th className="px-4 py-3 font-bold uppercase tracking-wider">Unidad Funcional</th>
                  <th className="px-4 py-3 font-bold uppercase tracking-wider">Documento</th>
                  <th className="px-4 py-3 font-bold uppercase tracking-wider">Nombre Paciente</th>
                  <th className="px-4 py-3 font-bold uppercase tracking-wider">Edad</th>
                  <th className="px-4 py-3 font-bold uppercase tracking-wider">Fecha Crisis</th>
                  <th className="px-4 py-3 font-bold uppercase tracking-wider">Severidad</th>
                  <th className="px-4 py-3 font-bold uppercase tracking-wider text-center">Diag. Institucional</th>
                  <th className="px-4 py-3 font-bold uppercase tracking-wider text-center">Tasa Hosp.</th>
                  <th className="px-4 py-3 font-bold uppercase tracking-wider text-center">Refractaria</th>
                  <th className="px-4 py-3 font-bold uppercase tracking-wider text-center">Estatus Epiléptico</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white/30">
                {pacientes.map((p, index) => (
                  <tr key={index} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className={`px-2 py-1 font-bold text-[10px] uppercase rounded-md border ${p.tipo === "Hospitalización" ? "bg-blue-50 text-blue-600 border-blue-100" : "bg-teal-50 text-teal-600 border-teal-100"}`}>
                        {p.tipo}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-bold text-slate-800 whitespace-nowrap">{p.doc}</td>
                    <td className="px-4 py-3 text-slate-600 font-medium whitespace-nowrap">{p.nombre}</td>
                    <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{p.edad}</td>
                    <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{p.fecha}</td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded-sm border text-[10px] uppercase font-bold tracking-wider
                        ${p.severidad.includes("Moderada") ? "bg-amber-50 text-amber-600 border-amber-200" : ""}
                        ${p.severidad.includes("Severa") ? "bg-red-50 text-red-600 border-red-200" : ""}
                      `}>
                        {p.severidad}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center whitespace-nowrap">
                      <span className={`px-2 py-1 rounded-sm border text-[10px] uppercase font-bold tracking-wider
                        ${p.diagInst === 'Leve' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : ''}
                        ${p.diagInst.includes('Moderada') ? 'bg-amber-50 text-amber-600 border-amber-200' : ''}
                        ${p.diagInst === 'Severa' ? 'bg-red-50 text-red-600 border-red-200' : ''}
                      `}>
                        {p.diagInst}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center text-slate-600 font-bold whitespace-nowrap">
                      {p.tasaHosp}
                    </td>
                    <td className="px-4 py-3 text-center whitespace-nowrap">
                      <span className={`px-2 py-0.5 rounded-sm text-[10px] font-bold border ${p.refrac === "Sí" ? "bg-red-50 text-red-700 border-red-100" : "bg-green-50 text-green-700 border-green-100"}`}>{p.refrac}</span>
                    </td>
                    <td className="px-4 py-3 text-center whitespace-nowrap">
                      <span className={`px-2 py-0.5 rounded-sm text-[10px] font-bold border ${p.estatus === "Sí" ? "bg-amber-50 text-amber-700 border-amber-100" : "bg-green-50 text-green-700 border-green-100"}`}>{p.estatus}</span>
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