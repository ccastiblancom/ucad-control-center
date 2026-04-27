"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  ArrowLeft, TrendingUp, Activity, AlertCircle, Heart, ShieldAlert, UserX, 
  Clock, Microscope, ClipboardCheck, ShieldCheck, Users, Smile, BookOpen, FileCheck 
} from "lucide-react";
import IndicatorCard from "../../../components/IndicatorCard";

export default function LeucemiaDashboard() {
  const [activeTab, setActiveTab] = useState("resultados");

  return (
    <div className="relative min-h-screen w-full pb-12">
      {/* Capa de Fondo Translucida */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <img 
          src="/fondo.jpg" 
          alt="Fondo Institucional" 
          className="w-full h-full object-cover opacity-20 grayscale-[20%]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50/10 via-transparent to-slate-50/90"></div>
      </div>

      {/* Contenido Principal */}
      <div className="relative z-10 max-w-5xl mx-auto mt-4 px-4">
        {/* Encabezado */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/" className="p-2 hover:bg-slate-200 rounded-full transition-colors bg-white/50 backdrop-blur-sm border border-slate-200 shadow-sm">
            <ArrowLeft className="w-5 h-5 text-slate-600" />
          </Link>
          <div>
            <h1 className="text-xl font-bold text-[#324D6D] uppercase tracking-tight">
              Unidad Clínica Alto Desempeño Leucemia
            </h1>
            <p className="text-sm text-slate-600 font-medium">Torre de Control UCAD – Leucemia</p>
          </div>
        </div>

        {/* SECCIÓN CENTRAL: ECOSISTEMA (IMAGEN ACTUALIZADA) */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-sm border border-slate-200 mb-8 flex flex-col items-center justify-center overflow-hidden">
           <img 
              src="/Ecosistema-Leucemia.jpg" 
              alt="Ecosistema UCAD Leucemia" 
              className="w-full max-w-3xl h-auto object-contain rounded-xl"
           />
        </div>

        {/* Navegación de Pestañas */}
        <div className="grid grid-cols-3 gap-2 bg-white/95 backdrop-blur-sm p-2 rounded-xl shadow-sm border border-slate-200 text-sm font-medium text-center mb-8">
          <div 
            onClick={() => setActiveTab("resultados")}
            className={`py-3 px-4 rounded-lg cursor-pointer transition-colors ${
              activeTab === "resultados" ? "bg-[#10b981] text-white shadow-sm" : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            Resultados Clínicos
          </div>
          <div 
            onClick={() => setActiveTab("proceso")}
            className={`py-3 px-4 rounded-lg cursor-pointer transition-colors ${
              activeTab === "proceso" ? "bg-[#10b981] text-white shadow-sm" : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            Calidad de Proceso
          </div>
          <div 
            onClick={() => setActiveTab("experiencia")}
            className={`py-3 px-4 rounded-lg cursor-pointer transition-colors ${
              activeTab === "experiencia" ? "bg-[#10b981] text-white shadow-sm" : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            Experiencia al cliente
          </div>
        </div>

        {/* VISTA: RESULTADOS CLÍNICOS */}
        {activeTab === "resultados" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link href="/ucad/leucemia/supervivencia-global" className="block transition-transform hover:-translate-y-1">
              <IndicatorCard titulo="% de Supervivencia Global" icono={<TrendingUp className="w-6 h-6" />} colorFondo="bg-[#10b981]" />
            </Link>
            <Link href="/ucad/leucemia/remision-induccion" className="block transition-transform hover:-translate-y-1">
              <IndicatorCard titulo="% Remisión completa al final de la inducción (LLA)" icono={<Activity className="w-6 h-6" />} colorFondo="bg-teal-500" />
            </Link>
            <Link href="/ucad/leucemia/mortalidad-induccion" className="block transition-transform hover:-translate-y-1">
              <IndicatorCard titulo="Proporción de Mortalidad en inducción" icono={<AlertCircle className="w-6 h-6" />} colorFondo="bg-purple-500" />
            </Link>
            <Link href="/ucad/leucemia/neutropenia-febril-atb" className="block transition-transform hover:-translate-y-1">
              <IndicatorCard titulo="% de pacientes con LLA y neutropenia febril (ATB <60 min)" icono={<Heart className="w-6 h-6" />} colorFondo="bg-blue-600" />
            </Link>
            <Link href="/ucad/leucemia/its-ac" className="block transition-transform hover:-translate-y-1">
              <IndicatorCard titulo="Tasa de Incidencia de Infección Asociada a Catéter (ITS-AC)" icono={<ShieldAlert className="w-6 h-6" />} colorFondo="bg-cyan-500" />
            </Link>
            <Link href="/ucad/leucemia/abandono-tratamiento" className="block transition-transform hover:-translate-y-1">
              <IndicatorCard titulo="Porcentaje de abandono al tratamiento" icono={<UserX className="w-6 h-6" />} colorFondo="bg-indigo-500" />
            </Link>
          </div>
        )}

        {/* VISTA: CALIDAD DE PROCESO */}
        {activeTab === "proceso" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link href="/ucad/leucemia/tiempo-confirmacion-diagnostica" className="block transition-transform hover:-translate-y-1">
              <IndicatorCard titulo="Tiempo promedio espera: Confirmación diagnóstica" icono={<Clock className="w-6 h-6" />} colorFondo="bg-blue-600" />
            </Link>
            <Link href="/ucad/leucemia/tiempo-inicio-tratamiento" className="block transition-transform hover:-translate-y-1">
              <IndicatorCard titulo="Tiempo promedio espera: Inicio de tratamiento" icono={<Clock className="w-6 h-6" />} colorFondo="bg-[#10b981]" />
            </Link>
            <Link href="/ucad/leucemia/oportunidad-citometria" className="block transition-transform hover:-translate-y-1">
              <IndicatorCard titulo="Oportunidad en resultado de citometría de flujo" icono={<Microscope className="w-6 h-6" />} colorFondo="bg-purple-600" />
            </Link>
            <Link href="/ucad/leucemia/adherencia-protocolo" className="block transition-transform hover:-translate-y-1">
              <IndicatorCard titulo="% Adherencia al protocolo ALLIC 2022" icono={<ClipboardCheck className="w-6 h-6" />} colorFondo="bg-[#10b981]" />
            </Link>
            <Link href="/ucad/leucemia/adherencia-tratamiento" className="block transition-transform hover:-translate-y-1">
              <IndicatorCard titulo="% Adherencia al tratamiento" icono={<ShieldCheck className="w-6 h-6" />} colorFondo="bg-cyan-500" />
            </Link>
            <Link href="/ucad/leucemia/atencion-multidisciplinaria" className="block transition-transform hover:-translate-y-1">
              <IndicatorCard titulo="Oportunidad en la atención multidisciplinaria" icono={<Users className="w-6 h-6" />} colorFondo="bg-indigo-500" />
            </Link>
            <Link href="/ucad/leucemia/barreras-administrativas" className="block transition-transform hover:-translate-y-1">
              <IndicatorCard titulo="% de barreras administrativas (Navegación)" icono={<AlertCircle className="w-6 h-6" />} colorFondo="bg-rose-500" />
            </Link>
            <Link href="/ucad/leucemia/publicaciones-cientificas" className="block transition-transform hover:-translate-y-1">
              <IndicatorCard titulo="Número de publicaciones científicas en LLA" icono={<BookOpen className="w-6 h-6" />} colorFondo="bg-violet-500" />
            </Link>
          </div>
        )}

        {/* VISTA: EXPERIENCIA AL CLIENTE */}
        {activeTab === "experiencia" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link href="/ucad/leucemia/satisfaccion-global" className="block transition-transform hover:-translate-y-1">
              <IndicatorCard titulo="Porcentaje global de satisfacción (Pacientes y Familias)" icono={<Smile className="w-6 h-6" />} colorFondo="bg-[#10b981]" />
            </Link>
            <Link href="/ucad/leucemia/satisfaccion-educacion" className="block transition-transform hover:-translate-y-1">
              <IndicatorCard titulo="Satisfacción frente a la educación recibida" icono={<BookOpen className="w-6 h-6" />} colorFondo="bg-blue-600" />
            </Link>
            <Link href="/ucad/leucemia/calidad-vida" className="block transition-transform hover:-translate-y-1">
              <IndicatorCard titulo="Evaluación del 100% instrumento Calidad de Vida" icono={<FileCheck className="w-6 h-6" />} colorFondo="bg-cyan-500" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}