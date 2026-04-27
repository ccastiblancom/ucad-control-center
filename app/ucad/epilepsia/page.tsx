"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  ArrowLeft, Users, Activity, AlertTriangle, AlertCircle, Heart, Pill, 
  Clock, UserPlus, Stethoscope, ClipboardCheck, FileText, Smile, Star, BrainCircuit, PersonStanding, Syringe
} from "lucide-react";

import IndicatorCard from "../../../components/IndicatorCard";

export default function EpilepsiaDashboard() {
  const [activeTab, setActiveTab] = useState("resultados");

  return (
    <div className="relative min-h-screen w-full pb-12">
      {/* Capa de Fondo Translucida (Idéntica al Home) */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <img 
          src="/fondo.jpg" 
          alt="Fondo Institucional" 
          className="w-full h-full object-cover opacity-20 grayscale-[20%]"
        />
        {/* Degradado sutil para suavizar el contraste */}
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
              Unidad Clínica Alto Desempeño Epilepsia
            </h1>
            <p className="text-sm text-slate-600 font-medium">Torre de Control UCAD – Epilepsia</p>
          </div>
        </div>

        {/* SECCIÓN CENTRAL: ECOSISTEMA */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-2 shadow-sm border border-slate-200 mb-8 overflow-hidden">
          <img 
            src="/Ecosistema-Epilepsia.jpg" 
            alt="Ecosistema de Atención UCAD Epilepsia" 
            className="w-full h-auto object-contain rounded-xl"
          />
        </div>

        {/* Navegación de Pestañas (Tabs) Interactiva */}
        <div className="grid grid-cols-3 gap-2 bg-white/95 backdrop-blur-sm p-2 rounded-xl shadow-sm border border-slate-200 text-sm font-medium text-center mb-8">
          <div 
            onClick={() => setActiveTab("resultados")}
            className={`py-3 px-4 rounded-lg cursor-pointer transition-colors ${
              activeTab === "resultados" ? "bg-[#009988] text-white shadow-sm" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            }`}
          >
            Resultados Clínicos
          </div>
          
          <div 
            onClick={() => setActiveTab("proceso")}
            className={`py-3 px-4 rounded-lg cursor-pointer transition-colors ${
              activeTab === "proceso" ? "bg-[#009988] text-white shadow-sm" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            }`}
          >
            Calidad de Proceso
          </div>

          <div 
            onClick={() => setActiveTab("experiencia")}
            className={`py-3 px-4 rounded-lg cursor-pointer transition-colors ${
              activeTab === "experiencia" ? "bg-[#009988] text-white shadow-sm" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            }`}
          >
            Experiencia al cliente
          </div>
        </div>

        {/* VISTA: RESULTADOS CLÍNICOS */}
        {activeTab === "resultados" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link href="/ucad/epilepsia/numero-pacientes" className="block transition-transform hover:-translate-y-1">
              <IndicatorCard titulo="Número de pacientes con epilepsia" icono={<Users className="w-6 h-6" />} colorFondo="bg-[#009988]" />
            </Link>
            <Link href="/ucad/epilepsia/control-crisis" className="block transition-transform hover:-translate-y-1">
              <IndicatorCard titulo="Control de Crisis" icono={<Activity className="w-6 h-6" />} colorFondo="bg-blue-600" />
            </Link>
            <Link href="/ucad/epilepsia/tasa-estado-epileptico" className="block transition-transform hover:-translate-y-1">
              <IndicatorCard titulo="Tasa en estado epiléptico" icono={<AlertTriangle className="w-6 h-6" />} colorFondo="bg-purple-500" />
            </Link>
            <Link href="/ucad/epilepsia/eventos-adversos" className="block transition-transform hover:-translate-y-1">
              <IndicatorCard titulo="% pacientes con eventos adversos" icono={<AlertCircle className="w-6 h-6" />} colorFondo="bg-cyan-500" />
            </Link>
            <Link href="/ucad/epilepsia/calidad-vida" className="block transition-transform hover:-translate-y-1">
              <IndicatorCard titulo="Calidad de Vida" icono={<Heart className="w-6 h-6" />} colorFondo="bg-[#009988]" />
            </Link>
            <Link href="/ucad/epilepsia/adherencia-tratamiento" className="block transition-transform hover:-translate-y-1">
              <IndicatorCard titulo="Adherencia al tratamiento" icono={<Pill className="w-6 h-6" />} colorFondo="bg-indigo-500" />
            </Link>
            <Link href="/ucad/epilepsia/cirugias-epilepsia" className="block transition-transform hover:-translate-y-1">
              <IndicatorCard titulo="Cirugías de Epilepsia" icono={<BrainCircuit className="w-6 h-6" />} colorFondo="bg-emerald-600" />
            </Link>
            <Link href="/ucad/epilepsia/funcionalidad" className="block transition-transform hover:-translate-y-1">
              <IndicatorCard titulo="Funcionalidad y Escolaridad" icono={<PersonStanding className="w-6 h-6" />} colorFondo="bg-orange-500" />
            </Link>
            <Link href="/ucad/epilepsia/farmacoterapia" className="block transition-transform hover:-translate-y-1">
              <IndicatorCard titulo="Farmacoterapia y RAM" icono={<Syringe className="w-6 h-6" />} colorFondo="bg-teal-600" />
            </Link>
          </div>
        )}

        {/* VISTA: CALIDAD DE PROCESO */}
        {activeTab === "proceso" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link href="/ucad/epilepsia/tiempo-control" className="block transition-transform hover:-translate-y-1">
              <IndicatorCard titulo="Tiempo control paciente por estado epiléptico" icono={<Clock className="w-6 h-6" />} colorFondo="bg-[#009988]" />
            </Link>
            <Link href="/ucad/epilepsia/pacientes-ingresados-ee" className="block transition-transform hover:-translate-y-1">
              <IndicatorCard titulo="Número de pacientes ingresados por estado epiléptico" icono={<UserPlus className="w-6 h-6" />} colorFondo="bg-blue-500" />
            </Link>
            <Link href="/ucad/epilepsia/deteccion-comorbilidad" className="block transition-transform hover:-translate-y-1">
              <IndicatorCard titulo="Detección de comorbilidad" icono={<Stethoscope className="w-6 h-6" />} colorFondo="bg-purple-600" />
            </Link>
            <Link href="/ucad/epilepsia/tasa-screening-comorbilidad" className="block transition-transform hover:-translate-y-1">
              <IndicatorCard titulo="Tasa de screening para comorbilidad" icono={<ClipboardCheck className="w-6 h-6" />} colorFondo="bg-cyan-500" />
            </Link>
          </div>
        )}

        {/* VISTA: EXPERIENCIA AL CLIENTE */}
        {activeTab === "experiencia" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link href="/ucad/epilepsia/nuestros-clientes" className="block transition-transform hover:-translate-y-1">
              <IndicatorCard titulo="Nuestros Clientes" icono={<Users className="w-6 h-6" />} colorFondo="bg-[#009988]" />
            </Link>
            <Link href="/ucad/epilepsia/satisfaccion-usuario" className="block transition-transform hover:-translate-y-1">
              <IndicatorCard titulo="Satisfacción usuario" icono={<Smile className="w-6 h-6" />} colorFondo="bg-orange-500" />
            </Link>
            <Link href="/ucad/epilepsia/satisfaccion-cliente-educacion" className="block transition-transform hover:-translate-y-1">
              <IndicatorCard titulo="Satisfacción cliente" icono={<Star className="w-6 h-6" />} colorFondo="bg-green-500" />
            </Link>
            <Link href="/ucad/epilepsia/plan-crisis" className="block transition-transform hover:-translate-y-1">
              <IndicatorCard titulo="Plan crisis" icono={<FileText className="w-6 h-6" />} colorFondo="bg-rose-400" />
            </Link>
            <Link href="/ucad/epilepsia/satisfaccion-global" className="block transition-transform hover:-translate-y-1">
              <IndicatorCard titulo="Satisfacción Global" icono={<Star className="w-6 h-6" />} colorFondo="bg-indigo-500" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}