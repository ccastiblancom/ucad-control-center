"use client";

import Link from "next/link";
import { ArrowLeft, Calendar, Filter, Search, AlertTriangle, Activity, Clock, ShieldAlert, UserPlus, Repeat } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

// Datos de prueba
const dataMensual = [
  { name: 'Enero', casos: 4 }, { name: 'Febrero', casos: 4 }, { name: 'Marzo', casos: 3 },
  { name: 'Abril', casos: 4 }, { name: 'Mayo', casos: 4 }, { name: 'Junio', casos: 6 },
  { name: 'Julio', casos: 4 }, { name: 'Agosto', casos: 4 }, { name: 'Septiembre', casos: 4 },
  { name: 'Octubre', casos: 4 }, { name: 'Noviembre', casos: 4 }, { name: 'Diciembre', casos: 4 },
];

const dataPie = [
  { name: 'Focal', value: 40, color: '#009988' },
  { name: 'Generalizada', value: 30, color: '#3b82f6' },
  { name: 'Febril', value: 15, color: '#f59e0b' },
  { name: 'No convulsiva', value: 15, color: '#a855f7' },
];

// NUEVOS DATOS: Cumplimiento de Ventanas Críticas
const dataVentanasCriticas = [
  { name: 'T1', valor: 85 },
  { name: 'T2', valor: 65 },
  { name: 'Control Instaurado', valor: 78 },
  { name: 'Refractario', valor: 22 },
];

const dataComplicaciones = [
  { name: 'Respiratorias', valor: 12 },
  { name: 'Cardiovasculares', valor: 8 },
  { name: 'Renales', valor: 3 },
  { name: 'Otras', valor: 5 },
];

const pacientesEE = [
  { fecha: "05/01/2024", unidad: "Urgencias", doc: "1001234567", paciente: "Ana Martínez López", edad: "8 años", tipo: "Focal", duracion: "25", stepss: "4 - Alto", etiologia: "Infecciosa", desenlace: "Alta" },
  { fecha: "12/01/2024", unidad: "Hospitalización", doc: "1002345678", paciente: "Luis García Pérez", edad: "12 años", tipo: "Generalizada", duracion: "35", stepss: "5 - Alto", etiologia: "Estructural", desenlace: "UCI" },
  { fecha: "18/01/2024", unidad: "Urgencias", doc: "1003456789", paciente: "Sofía Rodríguez Castro", edad: "6 años", tipo: "No convulsiva", duracion: "12", stepss: "2 - Bajo", etiologia: "Metabólica", desenlace: "Alta" },
  { fecha: "25/01/2024", unidad: "Consulta Externa", doc: "1004567890", paciente: "Diego Fernández Torres", edad: "10 años", tipo: "Focal", duracion: "8", stepss: "1 - Bajo", etiologia: "Desconocida", desenlace: "Alta" },
  { fecha: "02/02/2024", unidad: "Reanimación", doc: "1005678901", paciente: "María Hernández Silva", edad: "7 años", tipo: "Febril", duracion: "40", stepss: "5 - Alto", etiologia: "Estructural", desenlace: "Fallece" },
  { fecha: "08/02/2024", unidad: "Hospitalización", doc: "1006789012", paciente: "Juan López Moreno", edad: "11 años", tipo: "Generalizada", duracion: "15", stepss: "3 - Medio", etiologia: "Infecciosa", desenlace: "Alta" },
];

export default function TasaEstadoEpilepticoDashboard() {
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
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Tasa de Estado Epiléptico</h1>
          <p className="text-sm text-slate-500">UCAD Epilepsia • Resultados Clínicos • por 1.000 pacientes atendidos</p>
        </div>
      </div>

      {/* 2. Barra de Filtros */}
      <div className="flex flex-wrap items-center gap-4 mb-8 text-sm text-slate-600">
        <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-md border border-slate-200 shadow-sm"><Calendar className="w-4 h-4 text-slate-400" /><select className="bg-transparent outline-none cursor-pointer"><option>Últimos 12 meses</option></select></div>
        <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-md border border-slate-200 shadow-sm"><Filter className="w-4 h-4 text-slate-400" /><select className="bg-transparent outline-none cursor-pointer"><option>Todas las unidades</option></select></div>
        <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-md border border-slate-200 shadow-sm"><Filter className="w-4 h-4 text-slate-400" /><select className="bg-transparent outline-none cursor-pointer"><option>Todas las edades</option></select></div>
        <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-md border border-slate-200 shadow-sm"><Filter className="w-4 h-4 text-slate-400" /><select className="bg-transparent outline-none cursor-pointer"><option>Todos los tipos</option></select></div>
        <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-md border border-slate-200 shadow-sm flex-1 max-w-md"><Search className="w-4 h-4 text-slate-400" /><input type="text" placeholder="Buscar por documento o nombre" className="w-full bg-transparent outline-none" /></div>
      </div>

      {/* 3. KPIs Superiores (Grid de 6 columnas) */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-6">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 border-t-4 border-t-purple-500 flex flex-col justify-between">
          <div className="p-1.5 bg-purple-50 rounded-md w-fit mb-2"><AlertTriangle className="w-4 h-4 text-purple-600" /></div>
          <p className="text-xs text-slate-500 mb-1">Tasa EE</p>
          <p className="text-xl font-bold text-slate-800">24.50</p>
          <p className="text-[10px] text-slate-400">por 1.000 pacientes</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 border-t-4 border-t-blue-500 flex flex-col justify-between">
          <div className="p-1.5 bg-blue-50 rounded-md w-fit mb-2"><Activity className="w-4 h-4 text-blue-600" /></div>
          <p className="text-xs text-slate-500 mb-1">Casos EE</p>
          <p className="text-xl font-bold text-slate-800">49</p>
          <p className="text-[10px] text-slate-400">en el periodo</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 border-t-4 border-t-teal-500 flex flex-col justify-between">
          <div className="p-1.5 bg-teal-50 rounded-md w-fit mb-2"><UserPlus className="w-4 h-4 text-teal-600" /></div>
          <p className="text-[10px] text-slate-500 mb-1 font-semibold leading-tight">Tasa EE 1ra vez</p>
          <p className="text-xl font-bold text-slate-800">18.2</p>
          <p className="text-[10px] text-slate-400">por 1.000 pacientes</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 border-t-4 border-t-amber-500 flex flex-col justify-between">
          <div className="p-1.5 bg-amber-50 rounded-md w-fit mb-2"><Repeat className="w-4 h-4 text-amber-600" /></div>
          <p className="text-[10px] text-slate-500 mb-1 font-semibold leading-tight">Tasa reingreso EE</p>
          <p className="text-xl font-bold text-slate-800">6.3</p>
          <p className="text-[10px] text-slate-400">por 1.000 pacientes</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 border-t-4 border-t-sky-500 flex flex-col justify-between">
          <div className="p-1.5 bg-sky-50 rounded-md w-fit mb-2"><Clock className="w-4 h-4 text-sky-600" /></div>
          <p className="text-[10px] text-slate-500 mb-1 font-semibold leading-tight">Duración de EE</p>
          <p className="text-xl font-bold text-slate-800">18</p>
          <p className="text-[10px] text-slate-400">minutos (mediana)</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 border-t-4 border-t-red-500 flex flex-col justify-between">
          <div className="p-1.5 bg-red-50 rounded-md w-fit mb-2"><ShieldAlert className="w-4 h-4 text-red-600" /></div>
          <p className="text-xs text-slate-500 mb-1">Mortalidad asociada</p>
          <p className="text-xl font-bold text-slate-800">3 (6.1%)</p>
          <p className="text-[10px] text-slate-400">casos fatales</p>
        </div>
      </div>

      {/* 4. Gráficos Principales (Fila 1) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Tasa y Casos por mes */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-base font-bold text-slate-800 mb-6">Tasa y casos por mes</h3>
          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dataMensual} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                <Tooltip cursor={{ fill: '#f1f5f9' }} />
                <Bar dataKey="casos" fill="#0ea5e9" name="Casos EE" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center mt-2 text-xs text-slate-500 font-medium">
            <span className="flex items-center gap-1"><div className="w-3 h-3 bg-[#0ea5e9]"></div> Casos EE</span>
          </div>
        </div>

        {/* Tipo de Estado Epiléptico */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 relative">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-base font-bold text-slate-800">Tipo de Estado Epiléptico</h3>
          </div>
          <p className="text-xs text-slate-500 mb-4">Distribución clínica reportada</p>
          
          <div className="h-48 w-full relative flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={dataPie} innerRadius={50} outerRadius={80} paddingAngle={2} dataKey="value" stroke="none">
                  {dataPie.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            {/* Etiquetas manuales actualizadas */}
            <div className="absolute top-4 left-6 text-[10px] font-medium text-[#009988]">Focal: 40%</div>
            <div className="absolute bottom-4 left-6 text-[10px] font-medium text-blue-500">Generalizada: 30%</div>
            <div className="absolute top-4 right-6 text-[10px] font-medium text-amber-500">Febril: 15%</div>
            <div className="absolute bottom-4 right-6 text-[10px] font-medium text-purple-500">No convulsiva: 15%</div>
          </div>
        </div>
      </div>

      {/* 5. Gráficos Secundarios (Fila 2) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Complicaciones Asociadas */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-base font-bold text-slate-800 mb-6">Complicaciones asociadas al estado epiléptico</h3>
          <div className="h-32 w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart layout="vertical" data={dataComplicaciones} margin={{ top: 0, right: 20, left: 30, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748b' }} width={90} />
                <Tooltip cursor={{ fill: '#f1f5f9' }} />
                <Bar dataKey="valor" fill="#f43f5e" barSize={16} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* NUEVO GRÁFICO: Cumplimiento de ventanas críticas */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-base font-bold text-slate-800 mb-6">Cumplimiento de ventanas críticas</h3>
          <div className="h-32 w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart layout="vertical" data={dataVentanasCriticas} margin={{ top: 0, right: 20, left: 30, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} domain={[0, 100]} />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748b' }} width={120} />
                <Tooltip cursor={{ fill: '#f1f5f9' }} formatter={(value) => [`${value}%`, 'Cumplimiento']} />
                <Bar dataKey="valor" barSize={16}>
                  {dataVentanasCriticas.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={
                      entry.name === 'Refractario' ? '#ef4444' :
                      entry.name === 'Control Instaurado' ? '#10b981' :
                      entry.name === 'T1' ? '#009988' : '#3b82f6'
                    } />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* 6. Por Unidad Funcional */}
      <div className="mb-6">
        <h3 className="text-sm font-bold text-slate-700 mb-3 ml-1">Por Unidad Funcional</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
            <p className="text-xs text-slate-500 mb-1">Urgencias</p>
            <p className="text-lg font-bold text-slate-800">32 casos</p>
            <p className="text-[10px] text-slate-400">Tasa: 40 x1000</p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
            <p className="text-xs text-slate-500 mb-1">Hospitalización</p>
            <p className="text-lg font-bold text-slate-800">12 casos</p>
            <p className="text-[10px] text-slate-400">Tasa: 30 x1000</p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
            <p className="text-xs text-slate-500 mb-1">UCI</p>
            <p className="text-lg font-bold text-slate-800">4 casos</p>
            <p className="text-[10px] text-slate-400">Tasa: 133 x1000</p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
            <p className="text-xs text-slate-500 mb-1">Reanimación</p>
            <p className="text-lg font-bold text-slate-800">3 casos</p>
            <p className="text-[10px] text-slate-400">Tasa: 85 x1000</p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
            <p className="text-xs text-slate-500 mb-1">Consulta Externa</p>
            <p className="text-lg font-bold text-slate-800">1 casos</p>
            <p className="text-[10px] text-slate-400">Tasa: 2.5 x1000</p>
          </div>
        </div>
      </div>

      {/* 7. Tabla de Detalles */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-100">
          <h3 className="text-lg font-bold text-slate-800">Casos de Estado Epiléptico (49)</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="text-slate-500 bg-slate-50/50">
              <tr>
                <th className="px-4 py-3 font-medium">Fecha</th>
                <th className="px-4 py-3 font-medium">Unidad</th>
                <th className="px-4 py-3 font-medium">Documento</th>
                <th className="px-4 py-3 font-medium">Paciente</th>
                <th className="px-4 py-3 font-medium">Edad</th>
                <th className="px-4 py-3 font-medium">Tipo EE</th>
                <th className="px-4 py-3 font-medium">Duración (min)</th>
                <th className="px-4 py-3 font-medium text-center">STEPSS</th>
                <th className="px-4 py-3 font-medium">Etiología</th>
                <th className="px-4 py-3 font-medium text-center">Desenlace</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {pacientesEE.map((p, index) => (
                <tr key={index} className="hover:bg-slate-50">
                  <td className="px-4 py-3 text-slate-600">{p.fecha}</td>
                  <td className="px-4 py-3">
                    <span className={`text-[10px] font-bold ${
                      p.unidad === 'Urgencias' ? 'text-red-500' : p.unidad === 'Hospitalización' ? 'text-blue-500' : p.unidad === 'Reanimación' ? 'text-orange-500' : 'text-teal-500'
                    }`}>{p.unidad}</span>
                  </td>
                  <td className="px-4 py-3 font-medium text-slate-800">{p.doc}</td>
                  <td className="px-4 py-3 text-slate-600">{p.paciente}</td>
                  <td className="px-4 py-3 text-slate-600">{p.edad}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                      p.tipo === 'Focal' ? 'bg-teal-50 text-teal-700 border-teal-200' : 
                      p.tipo === 'Generalizada' ? 'bg-blue-50 text-blue-700 border-blue-200' : 
                      p.tipo === 'Febril' ? 'bg-amber-50 text-amber-700 border-amber-200' : 
                      'bg-purple-50 text-purple-700 border-purple-200'
                    }`}>{p.tipo}</span>
                  </td>
                  <td className="px-4 py-3 font-medium text-slate-800 text-center">{p.duracion}</td>
                  <td className="px-4 py-3 text-center">
                    <span className={`px-2 py-0.5 rounded border text-[10px] font-bold tracking-wide ${
                      p.stepss.includes('Alto') ? 'bg-red-50 text-red-600 border-red-200' : p.stepss.includes('Medio') ? 'bg-amber-50 text-amber-600 border-amber-200' : 'bg-green-50 text-green-600 border-green-200'
                    }`}>{p.stepss}</span>
                  </td>
                  <td className="px-4 py-3 text-slate-500">{p.etiologia}</td>
                  <td className="px-4 py-3 text-center">
                    <span className={`px-2 py-0.5 rounded-sm text-[10px] font-bold text-white ${
                      p.desenlace === 'Alta' ? 'bg-green-500' : p.desenlace === 'Fallece' ? 'bg-red-500' : 'bg-amber-500'
                    }`}>{p.desenlace}</span>
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