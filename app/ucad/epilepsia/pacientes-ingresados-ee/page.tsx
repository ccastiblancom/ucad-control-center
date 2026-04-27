"use client";

import Link from "next/link";
import { ArrowLeft, Calendar, Filter, Search, UserPlus, RotateCcw, Clock, Activity, ShieldAlert } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

// Datos de prueba
const dataMensual = [
  { name: 'Ene', ingresos: 5 }, { name: 'Feb', ingresos: 4 },
  { name: 'Mar', ingresos: 6 }, { name: 'Abr', ingresos: 3 },
  { name: 'May', ingresos: 7 }, { name: 'Jun', ingresos: 5 },
  { name: 'Jul', ingresos: 4 }, { name: 'Ago', ingresos: 6 },
  { name: 'Sep', ingresos: 8 }, { name: 'Oct', ingresos: 5 },
  { name: 'Nov', ingresos: 4 }, { name: 'Dic', ingresos: 6 },
];

const dataEtiologia = [
  { name: 'Infección/Fiebre', casos: 25 },
  { name: 'Baja Adherencia', casos: 18 },
  { name: 'Cambio Medicación', casos: 12 },
  { name: 'Estructural/Lesión', casos: 5 },
  { name: 'Metabólica', casos: 3 },
];

const dataEdad = [
  { name: '< 2 años', value: 15, color: '#3b82f6' },
  { name: '2 - 5 años', value: 25, color: '#10b981' },
  { name: '6 - 12 años', value: 18, color: '#f59e0b' },
  { name: '> 12 años', value: 5, color: '#8b5cf6' },
];

const pacientes = [
  { fecha: "15/02/2024", unidad: "UCI", doc: "1001234567", paciente: "Martín Gómez Ruiz", edad: "3 años", causa: "Infección/Fiebre", estancia: "5 días", uci: "Sí", reingreso: "No" },
  { fecha: "12/02/2024", unidad: "Urgencias", doc: "1002345678", paciente: "Lucía Fernández Torres", edad: "8 años", causa: "Baja Adherencia", estancia: "1 día", uci: "No", reingreso: "Sí" },
  { fecha: "08/02/2024", unidad: "Hospitalización", doc: "1003456789", paciente: "Simón López Castro", edad: "5 años", causa: "Cambio Medicación", estancia: "3 días", uci: "No", reingreso: "No" },
  { fecha: "02/02/2024", unidad: "UCI", doc: "1004567890", paciente: "Valeria Díaz Morales", edad: "11 años", causa: "Estructural/Lesión", estancia: "8 días", uci: "Sí", reingreso: "No" },
  { fecha: "28/01/2024", unidad: "Urgencias", doc: "1005678901", paciente: "Mateo Silva Rojas", edad: "1 año", causa: "Infección/Fiebre", estancia: "2 días", uci: "No", reingreso: "Sí" },
];

export default function PacientesIngresadosDashboard() {
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
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Pacientes ingresados por Estado Epiléptico</h1>
          <p className="text-sm text-slate-500">UCAD Epilepsia • Calidad de Proceso • Gestión de Camas y Reingresos</p>
        </div>
      </div>

      {/* 2. Barra de Filtros */}
      <div className="flex flex-wrap items-center gap-4 mb-8 text-sm text-slate-600">
        <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-md border border-slate-200 shadow-sm"><Calendar className="w-4 h-4 text-slate-400" /><select className="bg-transparent outline-none cursor-pointer"><option>Últimos 12 meses</option></select></div>
        <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-md border border-slate-200 shadow-sm"><Filter className="w-4 h-4 text-slate-400" /><select className="bg-transparent outline-none cursor-pointer"><option>Todas las edades</option></select></div>
        <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-md border border-slate-200 shadow-sm flex-1 max-w-md"><Search className="w-4 h-4 text-slate-400" /><input type="text" placeholder="Buscar por documento o nombre" className="w-full bg-transparent outline-none" /></div>
      </div>

      {/* 3. KPIs Superiores */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 border-t-4 border-t-blue-500">
          <div className="p-1.5 bg-blue-50 rounded-md w-fit mb-2"><UserPlus className="w-4 h-4 text-blue-600" /></div>
          <p className="text-xs text-slate-500 mb-1">Total Ingresos EE</p>
          <p className="text-xl font-bold text-slate-800">63</p>
          <p className="text-[10px] text-slate-400">en el periodo seleccionado</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 border-t-4 border-t-purple-500">
          <div className="p-1.5 bg-purple-50 rounded-md w-fit mb-2"><Activity className="w-4 h-4 text-purple-600" /></div>
          <p className="text-xs text-slate-500 mb-1">Traslados a UCI</p>
          <p className="text-xl font-bold text-slate-800">18</p>
          <p className="text-[10px] text-slate-400">28.5% de los ingresos</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 border-t-4 border-t-emerald-500">
          <div className="p-1.5 bg-emerald-50 rounded-md w-fit mb-2"><Clock className="w-4 h-4 text-emerald-600" /></div>
          <p className="text-xs text-slate-500 mb-1">Estancia Promedio</p>
          <p className="text-xl font-bold text-slate-800">3.2 días</p>
          <p className="text-[10px] text-emerald-600 font-medium">↓ 0.4 vs anterior</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 border-t-4 border-t-rose-500">
          <div className="p-1.5 bg-rose-50 rounded-md w-fit mb-2"><RotateCcw className="w-4 h-4 text-rose-600" /></div>
          <p className="text-xs text-slate-500 mb-1">Reingreso {'< 30 días'}</p>
          <p className="text-xl font-bold text-slate-800">8.5%</p>
          <p className="text-[10px] text-rose-600 font-medium">↑ 1.2% vs anterior</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 border-t-4 border-t-amber-500">
          <div className="p-1.5 bg-amber-50 rounded-md w-fit mb-2"><ShieldAlert className="w-4 h-4 text-amber-600" /></div>
          <p className="text-xs text-slate-500 mb-1">Mortalidad intrahospitalaria</p>
          <p className="text-xl font-bold text-slate-800">1.5%</p>
          <p className="text-[10px] text-slate-400">1 caso</p>
        </div>
      </div>

      {/* 4. Gráficos Principales */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-base font-bold text-slate-800 mb-6">Tendencia de Ingresos Mensuales</h3>
          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dataMensual} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                <Tooltip cursor={{ fill: '#f1f5f9' }} />
                <Bar dataKey="ingresos" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-base font-bold text-slate-800 mb-6">Etiología / Causa del Estado Epiléptico</h3>
          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart layout="vertical" data={dataEtiologia} margin={{ top: 0, right: 20, left: 30, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} width={100} />
                <Tooltip cursor={{ fill: '#f1f5f9' }} />
                <Bar dataKey="casos" fill="#8b5cf6" barSize={20} radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* 5. Tabla de Pacientes */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-800">Registro de Ingresos Hospitalarios (63)</h3>
          <button className="text-sm text-blue-600 font-semibold hover:underline">Exportar Excel</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="text-slate-500 bg-slate-50/50">
              <tr>
                <th className="px-4 py-3 font-medium">Fecha Ingreso</th>
                <th className="px-4 py-3 font-medium">Unidad Destino</th>
                <th className="px-4 py-3 font-medium">Documento</th>
                <th className="px-4 py-3 font-medium">Paciente</th>
                <th className="px-4 py-3 font-medium">Edad</th>
                <th className="px-4 py-3 font-medium">Causa Principal</th>
                <th className="px-4 py-3 font-medium text-center">Días Estancia</th>
                <th className="px-4 py-3 font-medium text-center">Ingreso a UCI</th>
                <th className="px-4 py-3 font-medium text-center">Reingreso {'<30d'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {pacientes.map((p, index) => (
                <tr key={index} className="hover:bg-slate-50">
                  <td className="px-4 py-3 text-slate-600">{p.fecha}</td>
                  <td className="px-4 py-3">
                    <span className={`font-semibold ${p.unidad === 'UCI' ? 'text-purple-600' : p.unidad === 'Urgencias' ? 'text-rose-500' : 'text-blue-500'}`}>
                      {p.unidad}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-medium text-slate-800">{p.doc}</td>
                  <td className="px-4 py-3 text-slate-700">{p.paciente}</td>
                  <td className="px-4 py-3 text-slate-600">{p.edad}</td>
                  <td className="px-4 py-3 text-slate-600">{p.causa}</td>
                  <td className="px-4 py-3 text-center font-medium text-slate-800">{p.estancia}</td>
                  <td className="px-4 py-3 text-center">
                    <span className={`px-2 py-0.5 rounded-sm font-bold text-[10px] ${p.uci === 'Sí' ? 'bg-purple-100 text-purple-700' : 'bg-slate-100 text-slate-500'}`}>{p.uci}</span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className={`px-2 py-0.5 rounded-sm font-bold text-[10px] ${p.reingreso === 'Sí' ? 'bg-rose-100 text-rose-700' : 'bg-emerald-100 text-emerald-700'}`}>{p.reingreso}</span>
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