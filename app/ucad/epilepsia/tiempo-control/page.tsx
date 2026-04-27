"use client";

import Link from "next/link";
import { ArrowLeft, Calendar, Filter, Search, Clock, TrendingDown, CheckCircle2, AlertTriangle, Zap, Activity } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

// Datos de prueba para gráficos
const dataDistribucion = [
  { name: '<10', casos: 15 },
  { name: '10-30', casos: 48 },
  { name: '30-60', casos: 22 },
  { name: '>60', casos: 26 },
];

const dataPrimeraLinea = [
  { name: '<5', casos: 8 },
  { name: '5-10', casos: 58 },
  { name: '10-20', casos: 25 },
  { name: '>20', casos: 24 },
];

const dataSegundaLinea = [
  { name: '<20', casos: 18 },
  { name: '20-40', casos: 38 },
  { name: '40-60', casos: 40 },
  { name: '>60', casos: 10 },
];

// Se agregó Reanimación a los datos de Unidad
const dataUnidad = [
  { name: 'UCI', tiempo: 85 },
  { name: 'Reanimación', tiempo: 45 },
  { name: 'Hospitalización', tiempo: 80 },
  { name: 'Urgencias', tiempo: 18 },
  { name: 'Consulta Externa', tiempo: 0 },
];

const pacientes = [
  { fecha: "05/01/2024", unidad: "Urgencias", doc: "1001234567", paciente: "Ana María Rodríguez", edad: "8 años", tipo: "Convulsivo", tbzd: "7 min", t2l: "N/A", tcontrol: "12 min", bzdOK: "Sí", controlOK: "Sí", ref: "No", eeg: "Sí" },
  { fecha: "12/01/2024", unidad: "UCI", doc: "1002345678", paciente: "Carlos López Martínez", edad: "6 años", tipo: "Convulsivo", tbzd: "8 min", t2l: "28 min", tcontrol: "35 min", bzdOK: "Sí", controlOK: "Sí", ref: "No", eeg: "Sí" },
  { fecha: "18/01/2024", unidad: "Urgencias", doc: "1003456789", paciente: "Laura Pérez Santos", edad: "12 años", tipo: "Convulsivo", tbzd: "6 min", t2l: "N/A", tcontrol: "15 min", bzdOK: "Sí", controlOK: "Sí", ref: "No", eeg: "No" },
  { fecha: "25/01/2024", unidad: "Urgencias", doc: "1004567890", paciente: "Miguel Torres Ruiz", edad: "10 años", tipo: "Convulsivo", tbzd: "9 min", t2l: "N/A", tcontrol: "18 min", bzdOK: "Sí", controlOK: "Sí", ref: "No", eeg: "Sí" },
  { fecha: "28/01/2024", unidad: "UCI", doc: "1005678901", paciente: "Sofía Hernández Cruz", edad: "14 años", tipo: "Convulsivo", tbzd: "12 min", t2l: "45 min", tcontrol: "85 min", bzdOK: "No", controlOK: "No", ref: "Sí", eeg: "Sí" },
  { fecha: "02/02/2024", unidad: "UCI", doc: "1006789012", paciente: "Daniel Vargas Luna", edad: "9 años", tipo: "No convulsivo", tbzd: "25 min", t2l: "55 min", tcontrol: "95 min", bzdOK: "No", controlOK: "No", ref: "Sí", eeg: "Sí" },
  { fecha: "08/02/2024", unidad: "Urgencias", doc: "1007890123", paciente: "Valentina Castro Díaz", edad: "7 años", tipo: "Convulsivo", tbzd: "5 min", t2l: "N/A", tcontrol: "10 min", bzdOK: "Sí", controlOK: "Sí", ref: "No", eeg: "No" },
];

export default function TiempoControlDashboard() {
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
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Tiempo control paciente por estado epiléptico</h1>
          <p className="text-sm text-slate-500">EE agudo • ventanas críticas 5-10 / 20-40 / {'<60 min'}</p>
          <p className="text-xs text-slate-400 mt-1">Objetivo: BZD en 5-10 min, 2ª línea en 20-40 min si procede, control total {'<60 min'}</p>
        </div>
      </div>

      {/* 2. Barra de Filtros */}
      <div className="flex flex-wrap items-center gap-4 mb-8 text-sm text-slate-600">
        <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-md border border-slate-200 shadow-sm"><Calendar className="w-4 h-4 text-slate-400" /><select className="bg-transparent outline-none cursor-pointer"><option>Últimos 12 meses</option></select></div>
        <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-md border border-slate-200 shadow-sm"><Filter className="w-4 h-4 text-slate-400" /><select className="bg-transparent outline-none cursor-pointer"><option>Todas las unidades</option></select></div>
        <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-md border border-slate-200 shadow-sm"><Filter className="w-4 h-4 text-slate-400" /><select className="bg-transparent outline-none cursor-pointer"><option>Todos</option></select></div>
        <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-md border border-slate-200 shadow-sm"><Filter className="w-4 h-4 text-slate-400" /><select className="bg-transparent outline-none cursor-pointer"><option>Todos</option></select></div>
        <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-md border border-slate-200 shadow-sm flex-1 max-w-md"><Search className="w-4 h-4 text-slate-400" /><input type="text" placeholder="Buscar por documento o nombre" className="w-full bg-transparent outline-none" /></div>
      </div>

      {/* 3. KPIs Superiores (7 columnas) */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-6">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 border-t-4 border-t-sky-500">
          <div className="p-1.5 bg-sky-50 rounded-md w-fit mb-2"><Clock className="w-4 h-4 text-sky-600" /></div>
          <p className="text-[10px] text-slate-500 mb-1 font-semibold">T_control mediana</p>
          <p className="text-lg font-bold text-slate-800">18.0 min</p>
          <p className="text-[9px] text-slate-400">tiempo total</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 border-t-4 border-t-purple-500">
          <div className="p-1.5 bg-purple-50 rounded-md w-fit mb-2"><TrendingDown className="w-4 h-4 text-purple-600" /></div>
          <p className="text-[10px] text-slate-500 mb-1 font-semibold">T_control P90</p>
          <p className="text-lg font-bold text-slate-800">95.0 min</p>
          <p className="text-[9px] text-slate-400">percentil 90</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 border-t-4 border-t-emerald-500">
          <div className="p-1.5 bg-emerald-50 rounded-md w-fit mb-2"><CheckCircle2 className="w-4 h-4 text-emerald-600" /></div>
          <p className="text-[10px] text-slate-500 mb-1 font-semibold">% Control {'<60 min'}</p>
          <p className="text-lg font-bold text-slate-800">73.9%</p>
          <p className="text-[9px] text-slate-400">68 casos</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 border-t-4 border-t-rose-500">
          <div className="p-1.5 bg-rose-50 rounded-md w-fit mb-2"><AlertTriangle className="w-4 h-4 text-rose-600" /></div>
          <p className="text-[10px] text-slate-500 mb-1 font-semibold">% Refractario</p>
          <p className="text-lg font-bold text-slate-800">26.1%</p>
          <p className="text-[9px] text-slate-400">{'>60 min'} o falla 2-3 fármacos</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 border-t-4 border-t-blue-500">
          <div className="p-1.5 bg-blue-50 rounded-md w-fit mb-2"><Zap className="w-4 h-4 text-blue-600" /></div>
          <p className="text-[10px] text-slate-500 mb-1 font-semibold">T_BZD mediana</p>
          <p className="text-lg font-bold text-slate-800">9.0 min</p>
          <p className="text-[9px] text-slate-400">1ª línea</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 border-t-4 border-t-teal-500">
          <div className="p-1.5 bg-teal-50 rounded-md w-fit mb-2"><CheckCircle2 className="w-4 h-4 text-teal-600" /></div>
          <p className="text-[10px] text-slate-500 mb-1 font-semibold">% BZD 5-10 min</p>
          <p className="text-lg font-bold text-slate-800">71.7%</p>
          <p className="text-[9px] text-slate-400">ventana ideal</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 border-t-4 border-t-indigo-500">
          <div className="p-1.5 bg-indigo-50 rounded-md w-fit mb-2"><Activity className="w-4 h-4 text-indigo-600" /></div>
          <p className="text-[10px] text-slate-500 mb-1 font-semibold">% 2ª línea 20-40 min</p>
          <p className="text-lg font-bold text-slate-800">41.5%</p>
          <p className="text-[9px] text-slate-400">41 casos aplicables</p>
        </div>
      </div>

      {/* 4. Gráficos Fila 1 (Ajustado a una sola tarjeta centrada) */}
      <div className="flex justify-center mb-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 w-full max-w-3xl">
          <h3 className="text-base font-bold text-slate-800 mb-6">Cumplimiento de ventanas críticas</h3>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between text-sm font-bold text-slate-700 mb-1"><span>T1 5-10 min</span><span className="text-[#009988]">71.7%</span></div>
              <div className="w-full bg-slate-100 rounded-full h-2.5"><div className="bg-[#009988] h-2.5 rounded-full" style={{ width: '71.7%' }}></div></div>
            </div>
            <div>
              <div className="flex justify-between text-sm font-bold text-slate-700 mb-1"><span>T2 20-40 min</span><span className="text-indigo-500">41.5%</span></div>
              <div className="w-full bg-slate-100 rounded-full h-2.5"><div className="bg-indigo-500 h-2.5 rounded-full" style={{ width: '41.5%' }}></div></div>
            </div>
            <div>
              <div className="flex justify-between text-sm font-bold text-slate-700 mb-1"><span>Control Instaurado {'<60 min'}</span><span className="text-emerald-500">73.9%</span></div>
              <div className="w-full bg-slate-100 rounded-full h-2.5"><div className="bg-emerald-500 h-2.5 rounded-full" style={{ width: '73.9%' }}></div></div>
            </div>
            <div>
              <div className="flex justify-between text-sm font-bold text-slate-700 mb-1"><span>Refractario ({'>60 o falla 2-3'})</span><span className="text-rose-500">26.1%</span></div>
              <div className="w-full bg-slate-100 rounded-full h-2.5"><div className="bg-rose-500 h-2.5 rounded-full" style={{ width: '26.1%' }}></div></div>
            </div>
          </div>
        </div>
      </div>

      {/* 5. Gráfico Distribución (Ancho completo) */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 mb-6">
        <h3 className="text-base font-bold text-slate-800 mb-6">Distribución tiempo de control</h3>
        <div className="h-48 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={dataDistribucion} margin={{ top: 0, right: 0, left: -20, bottom: 0 }} barCategoryGap="5%">
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
              <Tooltip cursor={{ fill: '#f1f5f9' }} />
              <Bar dataKey="casos" fill="#06b6d4" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="text-center text-xs text-slate-500 mt-2 font-medium">Tiempo de control (min)</div>
      </div>

      {/* 6. Gráficos Fila 3 (Tiempos específicos) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="flex justify-between items-start mb-6">
            <h3 className="text-base font-bold text-slate-800">Tiempo a primera línea (BZD)</h3>
            <span className="text-[10px] font-medium bg-emerald-50 text-emerald-600 px-2 py-1 rounded border border-emerald-100">71.7% en ventana ideal 5-10 min</span>
          </div>
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dataPrimeraLinea} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                <Tooltip cursor={{ fill: '#f1f5f9' }} />
                <Bar dataKey="casos" fill="#14b8a6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="text-center text-xs text-slate-500 mt-2 font-medium">Tiempo (min)</div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="flex justify-between items-start mb-6">
            <h3 className="text-base font-bold text-slate-800">Tiempo a segunda línea (si aplica)</h3>
            <span className="text-[10px] font-medium bg-indigo-50 text-indigo-600 px-2 py-1 rounded border border-indigo-100">41.5% en ventana 20-40 min (41 casos aplicables)</span>
          </div>
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dataSegundaLinea} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                <Tooltip cursor={{ fill: '#f1f5f9' }} />
                <Bar dataKey="casos" fill="#6366f1" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="text-center text-xs text-slate-500 mt-2 font-medium">Tiempo (min)</div>
        </div>
      </div>

      {/* 7. Gráfico Barras Horizontales por Unidad */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 mb-6">
        <h3 className="text-base font-bold text-slate-800 mb-6">Tiempo de control por unidad de servicio</h3>
        <div className="h-48 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart layout="vertical" data={dataUnidad} margin={{ top: 0, right: 20, left: 30, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} width={90} />
              <Tooltip cursor={{ fill: '#f1f5f9' }} />
              <Bar dataKey="tiempo" fill="#8b5cf6" barSize={20} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="text-center text-xs text-slate-500 mt-2 font-medium">Mediana tiempo control (min)</div>
      </div>

      {/* 8. Tabla de Pacientes */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-100">
          <h3 className="text-lg font-bold text-slate-800">Casos de estado epiléptico (92)</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-[11px] text-left">
            <thead className="text-slate-500 bg-slate-50/50">
              <tr>
                <th className="px-3 py-3 font-medium">Fecha</th>
                <th className="px-3 py-3 font-medium">Unidad</th>
                <th className="px-3 py-3 font-medium">Documento</th>
                <th className="px-3 py-3 font-medium">Paciente</th>
                <th className="px-3 py-3 font-medium">Edad</th>
                <th className="px-3 py-3 font-medium">Tipo EE</th>
                <th className="px-3 py-3 font-medium">T_BZD</th>
                <th className="px-3 py-3 font-medium">T_2L</th>
                <th className="px-3 py-3 font-medium">T_Control</th>
                <th className="px-3 py-3 font-medium text-center">BZD 5-10</th>
                <th className="px-3 py-3 font-medium text-center">Control {'<60'}</th>
                <th className="px-3 py-3 font-medium text-center">Refractario</th>
                <th className="px-3 py-3 font-medium text-center">EEG</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {pacientes.map((p, index) => (
                <tr key={index} className="hover:bg-slate-50">
                  <td className="px-3 py-3 text-slate-600">{p.fecha}</td>
                  <td className="px-3 py-3">
                    <span className={`font-semibold ${
                      p.unidad === 'Urgencias' ? 'text-rose-500' : p.unidad === 'UCI' ? 'text-purple-600' : 'text-blue-500'
                    }`}>{p.unidad}</span>
                  </td>
                  <td className="px-3 py-3 font-medium text-slate-800">{p.doc}</td>
                  <td className="px-3 py-3 text-slate-700">{p.paciente}</td>
                  <td className="px-3 py-3 text-slate-600">{p.edad}</td>
                  <td className="px-3 py-3">
                    <span className={`px-2 py-0.5 rounded-sm font-bold text-[9px] uppercase ${
                      p.tipo === 'Convulsivo' ? 'bg-rose-50 text-rose-600' : 'bg-amber-50 text-amber-600'
                    }`}>{p.tipo}</span>
                  </td>
                  <td className="px-3 py-3 font-medium text-slate-800">{p.tbzd}</td>
                  <td className="px-3 py-3 text-slate-600">{p.t2l}</td>
                  <td className="px-3 py-3 font-bold text-slate-800">{p.tcontrol}</td>
                  <td className="px-3 py-3 text-center">
                    <span className={`px-2 py-0.5 rounded-sm font-bold text-[9px] ${p.bzdOK === 'Sí' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>{p.bzdOK}</span>
                  </td>
                  <td className="px-3 py-3 text-center">
                    <span className={`px-2 py-0.5 rounded-sm font-bold text-[9px] ${p.controlOK === 'Sí' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>{p.controlOK}</span>
                  </td>
                  <td className="px-3 py-3 text-center">
                    <span className={`px-2 py-0.5 rounded-sm font-bold text-[9px] ${p.ref === 'No' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>{p.ref}</span>
                  </td>
                  <td className="px-3 py-3 text-center">
                    <span className={`px-2 py-0.5 rounded-sm font-bold text-[9px] ${p.eeg === 'Sí' ? 'bg-purple-100 text-purple-700' : 'bg-slate-100 text-slate-500'}`}>{p.eeg}</span>
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