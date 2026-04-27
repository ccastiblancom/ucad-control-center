"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  ArrowLeft, ShieldAlert, Clock, FileText, RefreshCw, RotateCcw, AlertTriangle, 
  Activity, Heart, Smile, ClipboardList, MessageSquare, BookOpen, Presentation, Award, Lightbulb 
} from "lucide-react";
import IndicatorCard from "../../../components/IndicatorCard";

export default function CirugiaPediatricaDashboard() {
  const [activeTab, setActiveTab] = useState("excelencia");

  return (
    <div className="relative min-h-screen w-full pb-12">
      {/* Capa de Fondo Translucida */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <img 
          src="/fondo.jpg" 
          alt="Fondo Institucional" 
          className="w-full h-full object-cover opacity-15 grayscale-[20%]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50/10 via-transparent to-slate-50/90"></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto mt-4 px-4">
        {/* Encabezado */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/" className="p-2 hover:bg-white rounded-full transition-colors bg-white/50 backdrop-blur-sm border border-slate-200 shadow-sm">
            <ArrowLeft className="w-5 h-5 text-slate-600" />
          </Link>
          <div>
            <h1 className="text-xl font-bold text-[#2563eb] uppercase tracking-tight">
              Unidad Clínica Alto Desempeño Cirugía Pediátrica
            </h1>
            <p className="text-sm text-slate-600 font-medium">Torre de Control UCAD – Cirugía Pediátrica</p>
          </div>
        </div>

        {/* SECCIÓN CENTRAL: ECOSISTEMA */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-sm border border-slate-200 mb-8 flex flex-col items-center justify-center min-h-[200px]">
           <Activity className="w-12 h-12 text-[#2563eb] mb-4 opacity-20" />
           <p className="text-slate-400 text-sm font-medium">Monitor de Resultados Quirúrgicos de Alta Complejidad</p>
        </div>

        {/* Navegación de Pestañas */}
        <div className="grid grid-cols-3 gap-2 bg-white/95 backdrop-blur-sm p-2 rounded-xl shadow-sm border border-slate-200 text-sm font-medium text-center mb-8">
          <div 
            onClick={() => setActiveTab("excelencia")}
            className={`py-3 px-4 rounded-lg cursor-pointer transition-colors ${
              activeTab === "excelencia" ? "bg-[#2563eb] text-white shadow-sm" : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            Excelencia Clínica
          </div>
          <div 
            onClick={() => setActiveTab("integridad")}
            className={`py-3 px-4 rounded-lg cursor-pointer transition-colors ${
              activeTab === "integridad" ? "bg-[#2563eb] text-white shadow-sm" : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            Integridad y Humanización
          </div>
          <div 
            onClick={() => setActiveTab("investigacion")}
            className={`py-3 px-4 rounded-lg cursor-pointer transition-colors ${
              activeTab === "investigacion" ? "bg-[#2563eb] text-white shadow-sm" : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            Investigación y Docencia
          </div>
        </div>

        {/* VISTA: EXCELENCIA CLÍNICA */}
{activeTab === "excelencia" && (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    <Link href="/ucad/cirugia-pediatrica/tasa-iso" className="block transition-transform hover:-translate-y-1">
      <IndicatorCard titulo="Tasa de infección de sitio operatorio < 1%" icono={<ShieldAlert className="w-6 h-6" />} colorFondo="bg-[#2563eb]" />
    </Link>
    <Link href="/ucad/cirugia-pediatrica/tiempo-atencion-apendicitis" className="block transition-transform hover:-translate-y-1">
      <IndicatorCard titulo="Tiempo de atención a Urgencia en apendicitis" icono={<Clock className="w-6 h-6" />} colorFondo="bg-blue-500" />
    </Link>
    <Link href="/ucad/cirugia-pediatrica/aseguramiento-consentimientos" className="block transition-transform hover:-translate-y-1">
      <IndicatorCard titulo="Aseguramiento consentimientos informados" icono={<FileText className="w-6 h-6" />} colorFondo="bg-indigo-600" />
    </Link>
    <Link href="/ucad/cirugia-pediatrica/reoperacion-no-planeada" className="block transition-transform hover:-translate-y-1">
      <IndicatorCard titulo="% reoperación no planeada (<5%)" icono={<RefreshCw className="w-6 h-6" />} colorFondo="bg-sky-500" />
    </Link>
    <Link href="/ucad/cirugia-pediatrica/reingreso-30-dias" className="block transition-transform hover:-translate-y-1">
      <IndicatorCard titulo="% reingreso a 30 días (meta < 2%)" icono={<RotateCcw className="w-6 h-6" />} colorFondo="bg-cyan-600" />
    </Link>
    {/* ACTUALIZADO: Enlace a Porcentaje de Complicaciones */}
    <Link href="/ucad/cirugia-pediatrica/complicaciones" className="block transition-transform hover:-translate-y-1">
      <IndicatorCard titulo="% de complicaciones (meta <5%)" icono={<AlertTriangle className="w-6 h-6" />} colorFondo="bg-amber-500" />
    </Link>
    <Link href="/ucad/cirugia-pediatrica/mortalidad" className="block transition-transform hover:-translate-y-1">
      <IndicatorCard titulo="% mortalidad (0%)" icono={<Activity className="w-6 h-6" />} colorFondo="bg-slate-600" />
    </Link>
  </div>
)}

{/* VISTA: INTEGRIDAD Y HUMANIZACIÓN */}
{activeTab === "integridad" && (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    <Link href="/ucad/cirugia-pediatrica/calidad-vida-alta" className="block transition-transform hover:-translate-y-1">
      <IndicatorCard titulo="75 puntos en el ítem más alto de calidad de vida" icono={<Heart className="w-6 h-6" />} colorFondo="bg-[#2563eb]" />
    </Link>
    <Link href="/ucad/cirugia-pediatrica/cumplimiento-dolor" className="block transition-transform hover:-translate-y-1">
      <IndicatorCard titulo="95% cumplimiento uso escalas de dolor en recuperación" icono={<Smile className="w-6 h-6" />} colorFondo="bg-blue-500" />
    </Link>
    <Link href="/ucad/cirugia-pediatrica/cumplimiento-pedsql" className="block transition-transform hover:-translate-y-1">
      <IndicatorCard titulo="95% cumplimiento uso de la escala PEDSqL" icono={<ClipboardList className="w-6 h-6" />} colorFondo="bg-indigo-500" />
    </Link>
    {/* ACTUALIZADO: Enlace a NPS y PQRS */}
    <Link href="/ucad/cirugia-pediatrica/nps-pqrs" className="block transition-transform hover:-translate-y-1">
      <IndicatorCard titulo="NPS (meta > 70), PQRS" icono={<MessageSquare className="w-6 h-6" />} colorFondo="bg-cyan-600" />
    </Link>
  </div>
)}

{/* VISTA: INVESTIGACIÓN Y DOCENCIA */}
{activeTab === "investigacion" && (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    <Link href="/ucad/cirugia-pediatrica/publicaciones" className="block transition-transform hover:-translate-y-1">
      <IndicatorCard titulo="N° de publicaciones en revistas Q1, Q2 y Q3" icono={<BookOpen className="w-6 h-6" />} colorFondo="bg-[#2563eb]" />
    </Link>
    <Link href="/ucad/cirugia-pediatrica/participacion-congresos" className="block transition-transform hover:-translate-y-1">
      <IndicatorCard titulo="N° de participaciones en congresos (como expositores)" icono={<Presentation className="w-6 h-6" />} colorFondo="bg-blue-600" />
    </Link>
    <Link href="/ucad/cirugia-pediatrica/calificacion-minciencias" className="block transition-transform hover:-translate-y-1">
      <IndicatorCard titulo="Calificación del Equipo de investigación de Minciencias" icono={<Award className="w-6 h-6" />} colorFondo="bg-indigo-600" />
    </Link>
    {/* ACTUALIZADO: Enlace a Cambios Clínicos */}
    <Link href="/ucad/cirugia-pediatrica/cambios-clinicos" className="block transition-transform hover:-translate-y-1">
      <IndicatorCard titulo="N° Cambios clínicos por causa de investigaciones" icono={<Lightbulb className="w-6 h-6" />} colorFondo="bg-amber-500" />
    </Link>
  </div>
)}

        {/* ... (Las demás pestañas se mantienen con la misma estructura) */}
      </div>
    </div>
  );
}