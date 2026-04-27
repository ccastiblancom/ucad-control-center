"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Calendar, Filter, Search, Info, Users, Activity, TrendingDown, ShieldAlert, CheckCircle2 } from "lucide-react";
import { ComposedChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

// Datos de prueba
const dataMensual = [
  { name: 'Ene', pacientes: 4, porcentaje: 4.5 }, { name: 'Feb', pacientes: 5, porcentaje: 3.8 },
  { name: 'Mar', pacientes: 4, porcentaje: 4.0 }, { name: 'Abr', pacientes: 6, porcentaje: 4.8 },
  { name: 'May', pacientes: 4, porcentaje: 3.5 }, { name: 'Jun', pacientes: 7, porcentaje: 5.2 },
  { name: 'Jul', pacientes: 4, porcentaje: 3.9 }, { name: 'Ago', pacientes: 5, porcentaje: 4.1 },
  { name: 'Sep', pacientes: 5, porcentaje: 4.0 }, { name: 'Oct', pacientes: 5, porcentaje: 4.2 },
  { name: 'Nov', pacientes: 4, porcentaje: 3.6 }, { name: 'Dic', pacientes: 4, porcentaje: 3.5 },
];

const dataPie = [
  { name: 'RAM', value: 36, color: '#3b82f6' },
  { name: 'Caídas', value: 16, color: '#a855f7' },
  { name: 'IAAS', value: 22, color: '#ef4444' },
  { name: 'Procedimiento', value: 13, color: '#f59e0b' },
  { name: 'Otro', value: 13, color: '#64748b' },
];

const dataPareto = [
  { name: 'UCI', eventos: 7 },
  { name: 'Hospitalización', eventos: 6 },
  { name: 'Consulta Externa', eventos: 4 },
  { name: 'Urgencias', eventos: 3 },
];

const eventos = [
  { fecha: "05/01/2024", unidad: "Hospitalización", doc: "2001234567", paciente: "Carlos Gómez Rivera", tipo: "RAM", severidad: "Leve", descripcion: "Rash cutáneo por antibiótico", resultado: "Alta", estado: "Cerrado" },
  { fecha: "08/01/2024", unidad: "Urgencias", doc: "2002345678", paciente: "Laura Pérez Santos", tipo: "Caídas", severidad: "Moderada", descripcion: "Caída de camilla, contusión", resultado: "Alta", estado: "Cerrado" },
  { fecha: "12/01/2024", unidad: "Hospitalización", doc: "2003456789", paciente: "Miguel Torres Ruiz", tipo: "IAAS", severidad: "Severa", descripcion: "Infección del torrente sanguíneo", resultado: "Prolongación estancia", estado: "Cerrado" },
  { fecha: "18/01/2024", unidad: "Consulta Externa", doc: "2004567890", paciente: "Ana Martínez López", tipo: "RAM", severidad: "Leve", descripcion: "Náuseas por medicación", resultado: "Alta", estado: "Cerrado" },
  { fecha: "22/01/2024", unidad: "Hospitalización", doc: "2005678901", paciente: "Sofía Hernández Cruz", tipo: "Procedimiento", severidad: "Moderada", descripcion: "Hematoma post-venopunción", resultado: "Alta", estado: "Cerrado" },
  { fecha: "28/01/2024", unidad: "Urgencias", doc: "2006789012", paciente: "Daniel Rodríguez Mora", tipo: "Otro", severidad: "Leve", descripcion: "Reacción alérgica a adhesivo", resultado: "Alta", estado: "Cerrado" },
  { fecha: "01/02/2024", unidad: "Hospitalización", doc: "2007890123", paciente: "Valentina Castro Díaz", tipo: "RAM", severidad: "Moderada", descripcion: "Hipotensión por medicamento", resultado: "Alta", estado: "Cerrado" },
  { fecha: "07/02/2024", unidad: "UCI", doc: "2008901234", paciente: "Mateo Vargas Luna", tipo: "IAAS", severidad: "Severa", descripcion: "Neumonía asociada a ventilador", resultado: "UCI", estado: "En investigación" },
];

export default function EventosAdversosDashboard() {
  const [activeTab, setActiveTab] = useState("eventos");

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
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">% Pacientes con eventos adversos</h1>
          <p className="text-sm text-slate-500">Seguridad del paciente • Hospitalización / Urgencias / Consulta Externa / UCIs</p>
          <p className="text-xs text-slate-400 mt-1">% = (Pacientes con ≥ 1 evento adverso / Total pacientes atendidos) x 100</p>
        </div>
      </div>

      {/* 2. Barra de Filtros */}
      <div className="flex flex-wrap items-center gap-4 mb-8 text-sm text-slate-600">
        <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-md border border-slate-200 shadow-sm"><Calendar className="w-4 h-4 text-slate-400" /><select className="bg-transparent outline-none cursor-pointer"><option>Últimos 12 meses</option></select></div>
        <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-md border border-slate-200 shadow-sm"><Filter className="w-4 h-4 text-slate-400" /><select className="bg-transparent outline-none cursor-pointer"><option>Todas las unidades</option></select></div>
        <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-md border border-slate-200 shadow-sm"><Filter className="w-4 h-4 text-slate-400" /><select className="bg-transparent outline-none cursor-pointer"><option>Todos los tipos</option></select></div>
        <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-md border border-slate-200 shadow-sm"><Filter className="w-4 h-4 text-slate-400" /><select className="bg-transparent outline-none cursor-pointer"><option>Todas</option></select></div>
        <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-md border border-slate-200 shadow-sm flex-1 max-w-md"><Search className="w-4 h-4 text-slate-400" /><input type="text" placeholder="Buscar por documento o nombre" className="w-full bg-transparent outline-none" /></div>
      </div>

      {/* 3. KPIs Superiores (Grid de 6) */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-6">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 border-t-4 border-t-cyan-500 flex flex-col justify-between">
          <div className="p-1.5 bg-cyan-50 rounded-md w-fit mb-2"><Info className="w-4 h-4 text-cyan-600" /></div>
          <p className="text-xs text-slate-500 mb-1">% pacientes afectados</p>
          <p className="text-xl font-bold text-slate-800">3.82%</p>
          <p className="text-[10px] text-teal-600 font-medium">↓ 0.5% vs anterior</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 border-t-4 border-t-purple-500 flex flex-col justify-between">
          <div className="p-1.5 bg-purple-50 rounded-md w-fit mb-2"><Users className="w-4 h-4 text-purple-600" /></div>
          <p className="text-xs text-slate-500 mb-1">Pacientes con EA</p>
          <p className="text-xl font-bold text-slate-800">84</p>
          <p className="text-[10px] text-slate-400">únicos</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 border-t-4 border-t-blue-500 flex flex-col justify-between">
          <div className="p-1.5 bg-blue-50 rounded-md w-fit mb-2"><Activity className="w-4 h-4 text-blue-600" /></div>
          <p className="text-xs text-slate-500 mb-1">Eventos adversos totales</p>
          <p className="text-xl font-bold text-slate-800">92</p>
          <p className="text-[10px] text-slate-400">en el periodo</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 border-t-4 border-t-indigo-500 flex flex-col justify-between">
          <div className="p-1.5 bg-indigo-50 rounded-md w-fit mb-2"><TrendingDown className="w-4 h-4 text-indigo-600" /></div>
          <p className="text-xs text-slate-500 mb-1">Tasa por 1.000 pacientes</p>
          <p className="text-xl font-bold text-slate-800">41.82</p>
          <p className="text-[10px] text-slate-400">eventos x 1000</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 border-t-4 border-t-red-500 flex flex-col justify-between">
          <div className="p-1.5 bg-red-50 rounded-md w-fit mb-2"><ShieldAlert className="w-4 h-4 text-red-600" /></div>
          <p className="text-xs text-slate-500 mb-1">Severos</p>
          <p className="text-xl font-bold text-slate-800">14 (15.2%)</p>
          <p className="text-[10px] text-slate-400">del total</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 border-t-4 border-t-green-500 flex flex-col justify-between">
          <div className="p-1.5 bg-green-50 rounded-md w-fit mb-2"><CheckCircle2 className="w-4 h-4 text-green-600" /></div>
          <p className="text-xs text-slate-500 mb-1">Calidad del dato</p>
          <p className="text-xl font-bold text-slate-800">100.0%</p>
          <p className="text-[10px] text-slate-400">datos completos</p>
        </div>
      </div>

      {/* 4. Gráficos - Fila 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Gráfico Combinado */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-base font-bold text-slate-800 mb-6">% pacientes con EA por mes</h3>
          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={dataMensual} margin={{ top: 0, right: -20, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis yAxisId="left" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                <Tooltip />
                <Bar yAxisId="left" dataKey="pacientes" fill="#0ea5e9" barSize={30} name="Pacientes afectados" />
                <Line yAxisId="right" type="monotone" dataKey="porcentaje" stroke="#a855f7" strokeWidth={2} dot={{ r: 4 }} name="% afectados" />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-4 mt-2 text-xs font-medium text-slate-600">
            <span className="flex items-center gap-1"><div className="w-3 h-3 bg-[#0ea5e9]"></div> Pacientes afectados</span>
            <span className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-[#a855f7]"></div> % afectados</span>
          </div>
        </div>

        {/* Dona Eventos por tipo */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 relative">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-base font-bold text-slate-800">Eventos por tipo</h3>
              <p className="text-xs text-slate-500">Calidad del dato</p>
            </div>
            <span className="text-[10px] font-medium bg-amber-50 text-amber-600 px-2 py-1 rounded border border-amber-100">13.0% Otro/No especificado</span>
          </div>
          <div className="h-48 w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={dataPie} innerRadius={40} outerRadius={80} paddingAngle={2} dataKey="value" stroke="none">
                  {dataPie.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            {/* Etiquetas simuladas (layout del mockup) */}
            <div className="absolute top-4 right-1/4 text-xs font-medium text-blue-500">RAM: 36%</div>
            <div className="absolute top-1/3 left-10 text-xs font-medium text-purple-500">Caídas: 16%</div>
            <div className="absolute bottom-6 left-1/4 text-xs font-medium text-red-500">IAAS: 22%</div>
            <div className="absolute bottom-2 right-1/4 text-xs font-medium text-amber-500">Procedimiento: 13%</div>
            <div className="absolute top-1/2 right-10 text-xs font-medium text-slate-500">Otro: 13%</div>
          </div>
        </div>
      </div>

      {/* 5. Gráficos - Fila 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Severidad del daño */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-base font-bold text-slate-800 mb-6">Severidad del daño</h3>
          <div className="space-y-4">
            <div className="border border-green-200 bg-green-50/30 rounded-lg p-4 flex justify-between items-center border-l-4 border-l-green-500">
              <div>
                <p className="font-bold text-green-700">Leve</p>
                <p className="text-xs text-slate-500">50 eventos</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-slate-800">54.3%</p>
                <p className="text-[10px] text-slate-400">del total</p>
              </div>
            </div>
            <div className="border border-amber-200 bg-amber-50/30 rounded-lg p-4 flex justify-between items-center border-l-4 border-l-amber-500">
              <div>
                <p className="font-bold text-amber-700">Moderada</p>
                <p className="text-xs text-slate-500">28 eventos</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-slate-800">30.4%</p>
                <p className="text-[10px] text-slate-400">del total</p>
              </div>
            </div>
            <div className="border border-red-200 bg-red-50/30 rounded-lg p-4 flex justify-between items-center border-l-4 border-l-red-500">
              <div>
                <p className="font-bold text-red-700">Severa</p>
                <p className="text-xs text-slate-500">14 eventos</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-slate-800">15.2%</p>
                <p className="text-[10px] text-slate-400">del total</p>
              </div>
            </div>
          </div>
        </div>

        {/* Pareto por unidad de servicio */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-base font-bold text-slate-800 mb-6">Pareto por unidad de servicio</h3>
          <div className="h-52 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart layout="vertical" data={dataPareto} margin={{ top: 0, right: 20, left: 40, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} />
                <Tooltip cursor={{ fill: '#f1f5f9' }} />
                <Bar dataKey="eventos" fill="#0ea5e9" barSize={24} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* 6. Tabla con Pestañas */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        {/* Pestañas (Tabs) */}
        <div className="flex border-b border-slate-200 px-6 pt-4 gap-4">
          <button 
            onClick={() => setActiveTab("eventos")}
            className={`pb-3 text-sm font-bold border-b-2 transition-colors ${activeTab === 'eventos' ? 'border-[#009988] text-[#009988]' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
          >
            Eventos (92)
          </button>
          <button 
            onClick={() => setActiveTab("pacientes")}
            className={`pb-3 text-sm font-bold border-b-2 transition-colors ${activeTab === 'pacientes' ? 'border-[#009988] text-[#009988]' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
          >
            Pacientes (84)
          </button>
        </div>

        {/* Tabla */}
        <div className="overflow-x-auto p-2">
          <table className="w-full text-xs text-left">
            <thead className="text-slate-500 border-b border-slate-100">
              <tr>
                <th className="px-4 py-3 font-medium">Fecha</th>
                <th className="px-4 py-3 font-medium">Unidad</th>
                <th className="px-4 py-3 font-medium">Documento</th>
                <th className="px-4 py-3 font-medium">Paciente</th>
                <th className="px-4 py-3 font-medium">Tipo Evento</th>
                <th className="px-4 py-3 font-medium">Severidad</th>
                <th className="px-4 py-3 font-medium">Descripción</th>
                <th className="px-4 py-3 font-medium">Resultado</th>
                <th className="px-4 py-3 font-medium">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {eventos.map((e, i) => (
                <tr key={i} className="hover:bg-slate-50">
                  <td className="px-4 py-3 text-slate-600">{e.fecha}</td>
                  <td className="px-4 py-3 font-semibold text-blue-600">{e.unidad}</td>
                  <td className="px-4 py-3 font-medium text-slate-800">{e.doc}</td>
                  <td className="px-4 py-3 text-slate-700 font-medium">{e.paciente}</td>
                  <td className="px-4 py-3">
                    <span className={`text-[10px] font-bold ${
                      e.tipo === 'RAM' ? 'text-blue-500' : e.tipo === 'Caídas' ? 'text-purple-500' : e.tipo === 'IAAS' ? 'text-red-500' : 'text-amber-500'
                    }`}>{e.tipo}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded border text-[10px] font-bold ${
                      e.severidad === 'Leve' ? 'bg-green-50 text-green-600 border-green-200' : e.severidad === 'Moderada' ? 'bg-amber-50 text-amber-600 border-amber-200' : 'bg-red-50 text-red-600 border-red-200'
                    }`}>{e.severidad}</span>
                  </td>
                  <td className="px-4 py-3 text-slate-500 truncate max-w-[150px]" title={e.descripcion}>{e.descripcion}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded-sm text-[10px] font-bold text-white ${e.resultado === 'Alta' ? 'bg-green-500' : 'bg-amber-500'}`}>{e.resultado}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-[10px] font-bold ${e.estado === 'Cerrado' ? 'text-slate-500' : 'text-blue-500'}`}>{e.estado}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Paginación */}
        <div className="p-4 border-t border-slate-100 flex justify-between items-center text-xs text-slate-500">
          <span>Página 1 de 10</span>
          <div className="flex gap-2">
            <button className="px-3 py-1 border border-slate-200 rounded text-slate-400 bg-slate-50 cursor-not-allowed">Anterior</button>
            <button className="px-3 py-1 border border-slate-200 rounded hover:bg-slate-50 font-medium">Siguiente</button>
          </div>
        </div>
      </div>
    </div>
  );
}