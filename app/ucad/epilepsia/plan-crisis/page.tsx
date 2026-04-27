"use client";

import Link from "next/link";
import { ArrowLeft, Calendar, Filter, Search, ShieldCheck, Users, CheckCircle, FileText, CheckSquare, Clock, AlertTriangle } from "lucide-react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";

// Datos de prueba para gráficos
const dataTendencia = [
  { name: 'Ene', pac: 75 }, { name: 'Feb', pac: 78 }, { name: 'Mar', pac: 85 },
  { name: 'Abr', pac: 62 }, { name: 'May', pac: 82 }, { name: 'Jun', pac: 92 },
  { name: 'Jul', pac: 68 }, { name: 'Ago', pac: 62 }, { name: 'Sep', pac: 68 },
  { name: 'Oct', pac: 62 }, { name: 'Nov', pac: 76 }, { name: 'Dic', pac: 78 },
];

const dataFunnel = [
  { name: 'PAC Escrito', valor: 183, color: '#10b981' },
  { name: 'PAC Entregado', valor: 143, color: '#14b8a6' },
  { name: 'PAC Conocido', valor: 106, color: '#0ea5e9' },
];

const dataDistribucionDias = [
  { name: '0-7', valor: 62 },
  { name: '8-14', valor: 65 },
  { name: '15-30', valor: 30 },
  { name: '31-60', valor: 18 },
  { name: '>60', valor: 8 },
];

const dataOportunidadUnidad = [
  { name: 'Hospitalización', valor: 8.5 },
  { name: 'Urgencias', valor: 11.0 },
  { name: 'Consulta Externa', valor: 12.0 },
  { name: 'UCI', valor: 13.0 },
];

const dataCoberturaUnidad = [
  { name: 'Hospitalización', valor: 78 },
  { name: 'UCI', valor: 75 },
  { name: 'Urgencias', valor: 74 },
  { name: 'Consulta Externa', valor: 71 },
];

const dataCoberturaEdad = [
  { name: '6-9', valor: 74 },
  { name: '10-13', valor: 72 },
  { name: '14-17', valor: 76 },
];

const pacientes = [
  { unidad: "Consulta Externa", doc: "1001234567", paciente: "Ana María López", edad: "12 años", fecha1: "05/01/2024", escrito: "Sí", fechaPAC: "12/01/2024", entregado: "Sí", conocido: "Sí", dias: "7 días" },
  { unidad: "Consulta Externa", doc: "1002345678", paciente: "Carlos Gómez Rivera", edad: "9 años", fecha1: "08/01/2024", escrito: "Sí", fechaPAC: "22/01/2024", entregado: "Sí", conocido: "Sí", dias: "14 días" },
  { unidad: "Consulta Externa", doc: "1003456789", paciente: "Laura Pérez Santos", edad: "14 años", fecha1: "10/01/2024", escrito: "Sí", fechaPAC: "15/01/2024", entregado: "Sí", conocido: "No", dias: "5 días" },
  { unidad: "Urgencias", doc: "1004567890", paciente: "Miguel Torres Ruiz", edad: "11 años", fecha1: "12/01/2024", escrito: "No", fechaPAC: "-", entregado: "-", conocido: "-", dias: "-" },
  { unidad: "Consulta Externa", doc: "1005678901", paciente: "Sofía Hernández Cruz", edad: "13 años", fecha1: "15/01/2024", escrito: "Sí", fechaPAC: "18/01/2024", entregado: "Sí", conocido: "Sí", dias: "3 días" },
  { unidad: "Consulta Externa", doc: "1001000000", paciente: "Paciente 6", edad: "6 años", fecha1: "01/02/2024", escrito: "Sí", fechaPAC: "15/02/2024", entregado: "Sí", conocido: "Sí", dias: "14 días" },
  { unidad: "Consulta Externa", doc: "1001000001", paciente: "Paciente 7", edad: "7 años", fecha1: "02/02/2024", escrito: "No", fechaPAC: "-", entregado: "-", conocido: "-", dias: "-" },
  { unidad: "Consulta Externa", doc: "1001000002", paciente: "Paciente 8", edad: "8 años", fecha1: "03/02/2024", escrito: "No", fechaPAC: "-", entregado: "-", conocido: "-", dias: "-" },
  { unidad: "Hospitalización", doc: "1001000003", paciente: "Paciente 9", edad: "9 años", fecha1: "04/02/2024", escrito: "Sí", fechaPAC: "31/03/2024", entregado: "No", conocido: "-", dias: "56 días" },
  { unidad: "Urgencias", doc: "1001000004", paciente: "Paciente 10", edad: "10 años", fecha1: "05/02/2024", escrito: "No", fechaPAC: "-", entregado: "-", conocido: "-", dias: "-" },
];

export default function PlanCrisisDashboard() {
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
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">% Clientes plan crisis escrito (PAC)</h1>
          <p className="text-sm text-slate-500">Plan de Acción ante Crisis • educación y seguridad</p>
          <p className="text-xs text-slate-400 mt-1">PAC: documento escrito, entregado y conocido por paciente/cuidadores</p>
        </div>
      </div>

      {/* 2. Barra de Filtros */}
      <div className="flex flex-wrap items-center gap-4 mb-8 text-sm text-slate-600">
        <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-md border border-slate-200 shadow-sm"><Calendar className="w-4 h-4 text-slate-400" /><select className="bg-transparent outline-none cursor-pointer"><option>Últimos 12 meses</option></select></div>
        <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-md border border-slate-200 shadow-sm"><Filter className="w-4 h-4 text-slate-400" /><select className="bg-transparent outline-none cursor-pointer"><option>Todas las unidades</option></select></div>
        <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-md border border-slate-200 shadow-sm"><Filter className="w-4 h-4 text-slate-400" /><select className="bg-transparent outline-none cursor-pointer"><option>Todos</option></select></div>
        <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-md border border-slate-200 shadow-sm"><Filter className="w-4 h-4 text-slate-400" /><select className="bg-transparent outline-none cursor-pointer"><option>Todos</option></select></div>
        <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-md border border-slate-200 shadow-sm"><Filter className="w-4 h-4 text-slate-400" /><select className="bg-transparent outline-none cursor-pointer"><option>Todos</option></select></div>
        <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-md border border-slate-200 shadow-sm flex-1 max-w-md"><Search className="w-4 h-4 text-slate-400" /><input type="text" placeholder="Buscar por documento o nombre" className="w-full bg-transparent outline-none" /></div>
      </div>

      {/* 3. KPIs Superiores */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3 mb-6">
        <div className="bg-white p-3 rounded-xl shadow-sm border border-slate-200 border-t-4 border-t-emerald-400">
          <div className="p-1.5 bg-emerald-50 rounded-md w-fit mb-2"><ShieldCheck className="w-4 h-4 text-emerald-600" /></div>
          <p className="text-[10px] text-slate-500 mb-1 font-semibold leading-tight">% PAC escrito</p>
          <p className="text-lg font-bold text-slate-800">73.2%</p>
          <p className="text-[9px] text-slate-400">cobertura</p>
        </div>
        <div className="bg-white p-3 rounded-xl shadow-sm border border-slate-200 border-t-4 border-t-blue-500">
          <div className="p-1.5 bg-blue-50 rounded-md w-fit mb-2"><Users className="w-4 h-4 text-blue-600" /></div>
          <p className="text-[10px] text-slate-500 mb-1 font-semibold leading-tight">En seguimiento</p>
          <p className="text-lg font-bold text-slate-800">250</p>
          <p className="text-[9px] text-slate-400">pacientes</p>
        </div>
        <div className="bg-white p-3 rounded-xl shadow-sm border border-slate-200 border-t-4 border-t-teal-400">
          <div className="p-1.5 bg-teal-50 rounded-md w-fit mb-2"><CheckCircle className="w-4 h-4 text-teal-600" /></div>
          <p className="text-[10px] text-slate-500 mb-1 font-semibold leading-tight">Con PAC escrito</p>
          <p className="text-lg font-bold text-slate-800">183</p>
          <p className="text-[9px] text-slate-400">pacientes</p>
        </div>
        <div className="bg-white p-3 rounded-xl shadow-sm border border-slate-200 border-t-4 border-t-purple-500">
          <div className="p-1.5 bg-purple-50 rounded-md w-fit mb-2"><FileText className="w-4 h-4 text-purple-600" /></div>
          <p className="text-[10px] text-slate-500 mb-1 font-semibold leading-tight">% PAC entregado</p>
          <p className="text-lg font-bold text-slate-800">78.1%</p>
          <p className="text-[9px] text-slate-400">de escritos</p>
        </div>
        <div className="bg-white p-3 rounded-xl shadow-sm border border-slate-200 border-t-4 border-t-cyan-500">
          <div className="p-1.5 bg-cyan-50 rounded-md w-fit mb-2"><CheckSquare className="w-4 h-4 text-cyan-600" /></div>
          <p className="text-[10px] text-slate-500 mb-1 font-semibold leading-tight">% PAC conocido</p>
          <p className="text-lg font-bold text-slate-800">74.1%</p>
          <p className="text-[9px] text-slate-400">de entregados</p>
        </div>
        <div className="bg-white p-3 rounded-xl shadow-sm border border-slate-200 border-t-4 border-t-amber-500">
          <div className="p-1.5 bg-amber-50 rounded-md w-fit mb-2"><Clock className="w-4 h-4 text-amber-600" /></div>
          <p className="text-[10px] text-slate-500 mb-1 font-semibold leading-tight">Oportunidad mediana</p>
          <p className="text-lg font-bold text-slate-800">12 dias</p>
          <p className="text-[9px] text-slate-400">a PAC</p>
        </div>
        <div className="bg-white p-3 rounded-xl shadow-sm border border-slate-200 border-t-4 border-t-rose-500">
          <div className="p-1.5 bg-rose-50 rounded-md w-fit mb-2"><AlertTriangle className="w-4 h-4 text-rose-600" /></div>
          <p className="text-[10px] text-slate-500 mb-1 font-semibold leading-tight">Brecha</p>
          <p className="text-lg font-bold text-slate-800">67</p>
          <p className="text-[9px] text-slate-400">sin PAC</p>
        </div>
      </div>

      {/* 4. Gráficos Fila 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-base font-bold text-slate-800 mb-6">Tendencia de cobertura PAC</h3>
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={dataTendencia} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10 }} axisLine={false} tickLine={false} domain={[0, 100]} />
                <Tooltip />
                <Line type="monotone" dataKey="pac" stroke="#10b981" strokeWidth={2} dot={{ r: 4 }} name="% PAC escrito" />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center mt-2 text-xs font-medium text-slate-600">
            <span className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-[#10b981]"></div> % PAC escrito</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-base font-bold text-slate-800 mb-6">Funnel de completitud PAC</h3>
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart layout="vertical" data={dataFunnel} margin={{ top: 0, right: 20, left: 40, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} width={90} />
                <Tooltip cursor={{ fill: '#f1f5f9' }} />
                <Bar dataKey="valor" barSize={32}>
                  {dataFunnel.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* 5. Brechas y prioridad */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 mb-6">
        <h3 className="text-sm font-bold text-slate-500 mb-4 uppercase tracking-wider">Brechas y prioridad</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="border border-rose-200 rounded-lg p-5 bg-rose-50/30 flex flex-col justify-center">
            <p className="text-[10px] font-bold text-rose-600 mb-1 uppercase tracking-wide">Prioridad ALTA</p>
            <p className="text-3xl font-black text-slate-800 mb-1">67</p>
            <p className="text-xs text-slate-600 font-medium">Sin PAC</p>
          </div>
          <div className="border border-amber-200 rounded-lg p-5 bg-amber-50/30 flex flex-col justify-center">
            <p className="text-[10px] font-bold text-amber-600 mb-1 uppercase tracking-wide">Pendiente entrega</p>
            <p className="text-3xl font-black text-slate-800 mb-1">40</p>
            <p className="text-xs text-slate-600 font-medium">PAC escrito<br/><span className="text-slate-400 font-normal">no entregado</span></p>
          </div>
          <div className="border border-blue-200 rounded-lg p-5 bg-blue-50/30 flex flex-col justify-center">
            <p className="text-[10px] font-bold text-blue-600 mb-1 uppercase tracking-wide">Pendiente confirmación</p>
            <p className="text-3xl font-black text-slate-800 mb-1">37</p>
            <p className="text-xs text-slate-600 font-medium">PAC entregado<br/><span className="text-slate-400 font-normal">no conocido</span></p>
          </div>
          <div className="border border-emerald-200 rounded-lg p-5 bg-emerald-50/30 flex flex-col justify-center">
            <p className="text-[10px] font-bold text-emerald-600 mb-1 uppercase tracking-wide">COMPLETO</p>
            <p className="text-3xl font-black text-slate-800 mb-1">106</p>
            <p className="text-xs text-slate-600 font-medium">PAC completo<br/><span className="text-slate-400 font-normal">escrito + entregado + conocido</span></p>
          </div>
        </div>
      </div>

      {/* 6. Gráficos Fila 3 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-base font-bold text-slate-800 mb-6">Distribución: Días a PAC</h3>
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dataDistribucionDias} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                <Tooltip cursor={{ fill: '#f1f5f9' }} />
                <Bar dataKey="valor" fill="#f59e0b" barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-base font-bold text-slate-800 mb-6">Oportunidad por unidad (mediana días)</h3>
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart layout="vertical" data={dataOportunidadUnidad} margin={{ top: 0, right: 20, left: 30, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} width={100} />
                <Tooltip cursor={{ fill: '#f1f5f9' }} />
                <Bar dataKey="valor" fill="#8b5cf6" barSize={24} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* 7. Gráficos Fila 4 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-base font-bold text-slate-800 mb-6">Cobertura por unidad</h3>
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart layout="vertical" data={dataCoberturaUnidad} margin={{ top: 0, right: 20, left: 30, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} domain={[0, 100]} />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} width={100} />
                <Tooltip cursor={{ fill: '#f1f5f9' }} />
                <Bar dataKey="valor" fill="#14b8a6" barSize={24} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-base font-bold text-slate-800 mb-6">Cobertura por grupo etario</h3>
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dataCoberturaEdad} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10 }} axisLine={false} tickLine={false} domain={[0, 100]} />
                <Tooltip cursor={{ fill: '#f1f5f9' }} />
                <Bar dataKey="valor" fill="#8b5cf6" barSize={50} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* 8. Tabla de Datos */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-800">PAC por paciente (250)</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-[11px] text-left">
            <thead className="text-slate-500 bg-slate-50/50">
              <tr>
                <th className="px-4 py-3 font-medium">Unidad</th>
                <th className="px-4 py-3 font-medium">Documento</th>
                <th className="px-4 py-3 font-medium">Paciente</th>
                <th className="px-4 py-3 font-medium">Edad</th>
                <th className="px-4 py-3 font-medium">Fecha 1ª atención</th>
                <th className="px-4 py-3 font-medium text-center">PAC Escrito</th>
                <th className="px-4 py-3 font-medium text-center">Fecha PAC</th>
                <th className="px-4 py-3 font-medium text-center">PAC Entregado</th>
                <th className="px-4 py-3 font-medium text-center">PAC Conocido</th>
                <th className="px-4 py-3 font-medium">Días a PAC</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {pacientes.map((p, index) => (
                <tr key={index} className="hover:bg-slate-50">
                  <td className="px-4 py-3">
                    <span className={`font-semibold ${p.unidad === 'Urgencias' ? 'text-rose-600' : 'text-teal-600'}`}>
                      {p.unidad}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-medium text-slate-800">{p.doc}</td>
                  <td className="px-4 py-3 text-slate-700">{p.paciente}</td>
                  <td className="px-4 py-3 text-slate-600">{p.edad}</td>
                  <td className="px-4 py-3 text-slate-600">{p.fecha1}</td>
                  
                  {/* Status Pills */}
                  <td className="px-4 py-3 text-center">
                    <span className={`px-2 py-0.5 rounded font-bold text-[10px] inline-block w-8 text-center ${
                      p.escrito === 'Sí' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'
                    }`}>{p.escrito}</span>
                  </td>
                  <td className="px-4 py-3 text-center text-slate-600 font-medium">{p.fechaPAC}</td>
                  <td className="px-4 py-3 text-center">
                    <span className={`px-2 py-0.5 rounded font-bold text-[10px] inline-block w-8 text-center ${
                      p.entregado === 'Sí' ? 'bg-emerald-100 text-emerald-700' : p.entregado === 'No' ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-400'
                    }`}>{p.entregado}</span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className={`px-2 py-0.5 rounded font-bold text-[10px] inline-block w-8 text-center ${
                      p.conocido === 'Sí' ? 'bg-emerald-100 text-emerald-700' : p.conocido === 'No' ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-400'
                    }`}>{p.conocido}</span>
                  </td>
                  <td className="px-4 py-3 text-slate-600">{p.dias}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}