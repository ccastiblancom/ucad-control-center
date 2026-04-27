"use client";

import Link from "next/link";
import { ArrowLeft, Calendar, Filter, Search, Smile, Star, Target, MessageCircle, Heart } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, LineChart, Line, Cell, ComposedChart } from "recharts";

// Datos de Satisfacción por Dimensiones de Atención
const dataDimensiones = [
  { name: 'Trato Digno', valor: 99, color: '#10b981' },
  { name: 'Información Médica', valor: 95, color: '#3b82f6' },
  { name: 'Confort / Entorno', valor: 92, color: '#8b5cf6' },
  { name: 'Tiempos de Espera', valor: 88, color: '#f59e0b' },
];

// Tendencia Mensual de Satisfacción y NPS (Net Promoter Score)
const dataTendenciaSatisfaccion = [
  { mes: 'Ene', nps: 75, satisfaccion: 92 },
  { mes: 'Feb', nps: 78, satisfaccion: 93 },
  { mes: 'Mar', nps: 80, satisfaccion: 94 },
  { mes: 'Abr', nps: 82, satisfaccion: 95 },
  { mes: 'May', nps: 85, satisfaccion: 97 },
  { mes: 'Jun', nps: 86, satisfaccion: 97.5 },
];

// Registro de Voz del Cliente (Encuestas cualitativas)
const vozDelCliente = [
  { id: "ENC-26-081", paciente: "Julian Castro", servicio: "Quimioterapia Ambulatoria", calificacion: 5, comentario: "Las enfermeras son unos ángeles, gracias por tanta paciencia.", estado: "Felicitación" },
  { id: "ENC-26-085", paciente: "Valentina Meza", servicio: "Hospitalización", calificacion: 4, comentario: "Muy buena atención médica, pero la comida demoró un poco.", estado: "Oportunidad Mejora" },
  { id: "ENC-26-090", paciente: "Mateo Ospina", servicio: "Consulta Externa", calificacion: 3, comentario: "Mucho tiempo en la sala de espera para pasar con el oncólogo.", estado: "Alerta de Servicio" },
  { id: "ENC-26-095", paciente: "Lucía Pineda", servicio: "Urgencias Oncológicas", calificacion: 5, comentario: "Rápidos y muy humanos. Salvaron a mi hija en su crisis.", estado: "Felicitación" },
];

export default function SatisfaccionGlobalDashboard() {
  
  // Variables de Gestión Gerencial
  const satisfaccionActual = 97.5;
  const metaSatisfaccion = 95.0;
  
  // Aplicación de regla institucional: El cumplimiento nunca debe exceder el 100% en el reporte
  const calculoCumplimiento = Math.round((satisfaccionActual / metaSatisfaccion) * 100);
  const cumplimientoMostrado = calculoCumplimiento > 100 ? 100 : calculoCumplimiento;

  return (
    <div className="relative min-h-screen w-full pb-12">
      {/* Fondo Institucional */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <img src="/fondo.jpg" alt="Fondo" className="w-full h-full object-cover opacity-15" />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50/10 via-transparent to-slate-50/90"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto mt-4 px-4">
        {/* Encabezado */}
        <div className="flex items-center gap-4 mb-6">
          <Link href="/ucad/leucemia" className="p-2 hover:bg-white/80 rounded-full transition-colors flex items-center gap-2 text-sm font-medium text-slate-600 bg-white/50 border border-slate-200 shadow-sm">
            <ArrowLeft className="w-4 h-4" /> Volver
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-[#324D6D] tracking-tight">Porcentaje Global de Satisfacción</h1>
            <p className="text-sm text-slate-500">Unidad de Leucemia • Experiencia al Cliente (Pacientes y Familias)</p>
          </div>
        </div>

        {/* Filtros */}
        <div className="flex flex-wrap items-center gap-4 mb-8 text-sm">
          <div className="bg-white/90 backdrop-blur-sm px-3 py-2 rounded-xl border border-slate-200 shadow-sm flex items-center gap-2">
            <Calendar className="w-4 h-4 text-slate-400" />
            <select className="bg-transparent outline-none cursor-pointer font-medium"><option>Mes Actual</option></select>
          </div>
          <div className="bg-white/90 backdrop-blur-sm px-3 py-2 rounded-xl border border-slate-200 shadow-sm flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-400" />
            <select className="bg-transparent outline-none cursor-pointer font-medium"><option>Todos los Servicios</option></select>
          </div>
        </div>

        {/* KPIs Estratégicos */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between border-l-4 border-l-blue-500">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Encuestas Recibidas</p>
              <p className="text-3xl font-bold text-slate-800">142</p>
            </div>
            <MessageCircle className="w-8 h-8 text-blue-500 opacity-20" />
          </div>
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between border-l-4 border-l-emerald-500">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Satisfacción Global</p>
              <p className="text-3xl font-bold text-emerald-600">{satisfaccionActual}%</p>
            </div>
            <Smile className="w-8 h-8 text-emerald-500 opacity-20" />
          </div>
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between border-l-4 border-l-slate-400">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Meta Institucional</p>
              <p className="text-3xl font-bold text-slate-800">&gt; {metaSatisfaccion}%</p>
            </div>
            <Target className="w-8 h-8 text-slate-400 opacity-20" />
          </div>
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between border-l-4 border-l-indigo-500">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Cumplimiento Auditado</p>
              <p className="text-3xl font-bold text-indigo-600">{cumplimientoMostrado}%</p>
            </div>
            <Star className="w-8 h-8 text-indigo-500 opacity-20" />
          </div>
        </div>

        {/* Gráficas */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Gráfico de Barras: Satisfacción por Dimensiones */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="text-sm font-bold text-slate-700 mb-1">Satisfacción por Dimensiones</h3>
            <p className="text-[10px] text-slate-400 mb-6">Desglose porcentual de los factores de atención</p>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dataDimensiones} layout="vertical" margin={{ left: -10, right: 30 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                  <XAxis type="number" domain={[0, 100]} hide />
                  <YAxis dataKey="name" type="category" tick={{fontSize: 10, fontWeight: 600}} axisLine={false} tickLine={false} width={110} />
                  <RechartsTooltip cursor={{fill: '#f8fafc'}} formatter={(value) => [`${value}%`, 'Aprobación']} />
                  <Bar dataKey="valor" radius={[0, 4, 4, 0]} barSize={25}>
                    {dataDimensiones.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Gráfico Compuesto: Tendencia y NPS */}
          <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="text-sm font-bold text-slate-700 mb-1">Evolución de Satisfacción y Lealtad (NPS)</h3>
            <p className="text-[10px] text-slate-400 mb-6">Tendencia mensual cruzada con el Índice de Recomendación Net Promoter Score</p>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={dataTendenciaSatisfaccion} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="mes" axisLine={false} tickLine={false} tick={{fontSize: 12}} />
                  <YAxis yAxisId="left" domain={[60, 100]} axisLine={false} tickLine={false} tick={{fontSize: 10}} />
                  <YAxis yAxisId="right" orientation="right" domain={[0, 100]} axisLine={false} tickLine={false} tick={{fontSize: 10}} hide />
                  <RechartsTooltip />
                  <Bar yAxisId="right" dataKey="nps" name="NPS (Lealtad)" fill="#cbd5e1" barSize={30} radius={[4, 4, 0, 0]} />
                  <Line yAxisId="left" type="monotone" dataKey="satisfaccion" name="% Satisfacción" stroke="#10b981" strokeWidth={3} dot={{ r: 5, fill: "#10b981", strokeWidth: 2, stroke: "#fff" }} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Tabla Detallada: Voz del Cliente */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-50 bg-emerald-50/30 flex justify-between items-center">
            <h3 className="text-sm font-bold text-emerald-800 flex items-center gap-2">
              <Heart className="w-4 h-4" /> Bitácora Cualitativa: La Voz del Cliente
            </h3>
            <button className="text-[10px] font-bold text-emerald-600 bg-white px-3 py-1.5 rounded-lg border border-emerald-200">Exportar Comentarios</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="text-slate-500 border-b border-slate-100 uppercase tracking-wider font-semibold bg-slate-50/50">
                  <th className="px-6 py-4 w-1/4">Paciente / Servicio</th>
                  <th className="px-6 py-4 text-center">Calificación</th>
                  <th className="px-6 py-4 w-1/2">Comentario Principal</th>
                  <th className="px-6 py-4 text-right">Estatus SAC</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {vozDelCliente.map((p, i) => (
                  <tr key={i} className="hover:bg-slate-50 transition-colors text-slate-600">
                    <td className="px-6 py-4">
                      <p className="font-bold text-slate-800">{p.paciente}</p>
                      <p className="text-[10px] text-slate-400">{p.servicio}</p>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex justify-center text-amber-400">
                        {/* Pequeño truco visual para estrellas */}
                        {Array.from({ length: 5 }).map((_, idx) => (
                          <Star key={idx} className={`w-3 h-3 ${idx < p.calificacion ? 'fill-current' : 'text-slate-200'}`} />
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 italic text-slate-600 leading-relaxed">"{p.comentario}"</td>
                    <td className="px-6 py-4 text-right">
                      <span className={`px-2 py-1 rounded-md font-bold text-[10px] ${
                        p.estado === 'Felicitación' ? 'text-emerald-600 bg-emerald-50' : 
                        p.estado === 'Oportunidad Mejora' ? 'text-amber-600 bg-amber-50' : 
                        'text-rose-600 bg-rose-50'
                      }`}>
                        {p.estado}
                      </span>
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