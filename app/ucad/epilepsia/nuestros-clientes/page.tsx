"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Users, Calendar, Activity, MapPin, Building2, CreditCard, Home, HeartHandshake } from "lucide-react";
import { LineChart, Line, ResponsiveContainer } from "recharts";

// @ts-ignore
import { ComposableMap, Geographies, Geography, ZoomableGroup } from "react-simple-maps";

const geoUrl = "https://code.highcharts.com/mapdata/countries/co/co-all.topo.json";

const datosDepartamentos: Record<string, number> = {
  "BOGOTA": 58,
  "CUNDINAMARCA": 15,
  "ANTIOQUIA": 12,
  "VALLE DEL CAUCA": 8,
  "BOYACA": 6,
  "SANTANDER": 5,
  "META": 4,
  "TOLIMA": 3,
  "HUILA": 3,
  "CALDAS": 2,
};

const dataTendencia = [
  { value: 100 }, { value: 105 }, { value: 102 }, { value: 110 },
  { value: 108 }, { value: 115 }, { value: 116 }
];

// Datos Simulados
const datosRegimen = [
  { name: 'Contributivo', value: 75, color: '#3b82f6' },
  { name: 'Subsidiado', value: 38, color: '#10b981' },
  { name: 'Especial', value: 3, color: '#8b5cf6' },
];

const datosEstrato = [
  { name: 'Estrato 1', value: 15 },
  { name: 'Estrato 2', value: 35 },
  { name: 'Estrato 3', value: 42 },
  { name: 'Estrato 4', value: 18 },
  { name: 'Estrato 5', value: 4 },
  { name: 'Estrato 6', value: 2 },
];

// NUEVOS DATOS: Enfoque Diferencial
const datosEtnias = [
  { name: 'Afrocolombiano', value: 8 },
  { name: 'Indígena', value: 5 },
  { name: 'Raizal / Palenquero', value: 1 },
  { name: 'Ninguno / No reporta', value: 102 }
];

const datosPoblacionEspecial = [
  { name: 'Víctimas del conflicto armado', value: 12 },
  { name: 'Población migrante', value: 5 },
  { name: 'Gestantes', value: 2 },
  { name: 'Discapacidad múltiple', value: 7 }
];

export default function NuestrosClientesDashboard() {
  const [tooltipContent, setTooltipContent] = useState("");
  const [tooltipStyle, setTooltipStyle] = useState({ display: "none", top: 0, left: 0 });
  const [mapaCargado, setMapaCargado] = useState<any>(null);
  const [cargando, setCargando] = useState(true);
  const [errorMapa, setErrorMapa] = useState(false);
  
  const [regionSeleccionada, setRegionSeleccionada] = useState<string>("TODAS");

  useEffect(() => {
    fetch(geoUrl)
      .then(async (res) => {
        if (!res.ok) return null;
        const text = await res.text();
        try {
          return JSON.parse(text);
        } catch (e) {
          return null;
        }
      })
      .then((data) => {
        if (data) {
          setMapaCargado(data);
        } else {
          setErrorMapa(true);
        }
        setCargando(false);
      })
      .catch((error) => {
        console.error("Error de red:", error);
        setErrorMapa(true);
        setCargando(false);
      });
  }, []);

  const normalizarNombre = (rawName: string) => {
    if (!rawName) return "";
    let cleanName = rawName.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase();
    if (cleanName.includes("BOGOTA") || cleanName.includes("SANTAFE")) cleanName = "BOGOTA";
    if (cleanName.includes("VALLE")) cleanName = "VALLE DEL CAUCA";
    return cleanName;
  }

  const handleMouseEnter = (geo: any, e: any) => {
    const rawName = geo.properties?.name || geo.properties?.NAME_1 || geo.properties?.NOMBRE_DPT || "";
    const cleanName = normalizarNombre(rawName);
    const pacientes = datosDepartamentos[cleanName] || 0;
    
    const nombreBonito = cleanName.split(' ').map(w => w.charAt(0) + w.slice(1).toLowerCase()).join(' ');
    
    setTooltipContent(`${nombreBonito}: ${pacientes} paciente(s)`);
    setTooltipStyle({
      display: "block",
      top: e.clientY - 30,
      left: e.clientX + 15
    });
  };

  const handleMouseMove = (e: any) => {
    setTooltipStyle(prev => ({ ...prev, top: e.clientY - 30, left: e.clientX + 15 }));
  };

  const handleMouseLeave = () => {
    setTooltipStyle({ display: "none", top: 0, left: 0 });
  };

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
        <div 
          className="fixed z-[100] bg-slate-800 text-white text-xs font-bold px-3 py-2 rounded-lg shadow-lg pointer-events-none transition-opacity"
          style={tooltipStyle}
        >
          {tooltipContent}
        </div>

        <div className="flex items-center justify-between mb-6 border-b border-slate-200 pb-4">
          <div className="flex items-center gap-4">
            <Link href="/ucad/epilepsia" className="flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-slate-800 transition-colors bg-white/50 px-3 py-1 rounded-full border border-slate-200">
              <ArrowLeft className="w-4 h-4" /> Volver
            </Link>
            <div className="w-px h-6 bg-slate-300"></div>
            <div>
              <h1 className="text-xl font-bold text-slate-800 tracking-tight">Nuestros Clientes</h1>
              <p className="text-xs text-slate-500">Dashboard Demográfico UCAD Epilepsia</p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-lg font-bold shadow-sm border border-emerald-100">
            <Users className="w-4 h-4" /> 116 Pacientes
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-slate-600">
          <span className="font-bold text-slate-700">Filtros:</span>
          <select className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-md border border-slate-200 shadow-sm outline-none cursor-pointer"><option>Todos los años</option></select>
          
          <select 
            className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-md border border-slate-200 shadow-sm outline-none cursor-pointer font-medium"
            value={regionSeleccionada}
            onChange={(e) => setRegionSeleccionada(e.target.value)}
          >
            <option value="TODAS">Todas las Regiones</option>
            {Object.keys(datosDepartamentos).map(dpt => (
               <option key={dpt} value={dpt}>{dpt.charAt(0) + dpt.slice(1).toLowerCase()}</option>
            ))}
          </select>
          
          <select className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-md border border-slate-200 shadow-sm outline-none cursor-pointer"><option>Todos los diagnósticos</option></select>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          
          {/* MAPA */}
          <div className="xl:col-span-2 bg-white/90 backdrop-blur-sm rounded-2xl shadow-sm border border-slate-200 p-6 relative flex flex-col min-h-[600px]">
            <div className="flex justify-between items-start mb-4">
               <div>
                 <h2 className="text-lg font-bold text-slate-800">Estudio Demográfico Nacional</h2>
                 <p className="text-xs text-slate-500">Distribución geográfica de pacientes con epilepsia atendidos por la UCAD</p>
               </div>
               {regionSeleccionada !== "TODAS" && (
                  <button 
                    onClick={() => setRegionSeleccionada("TODAS")}
                    className="text-xs font-medium text-blue-600 hover:text-blue-800 bg-blue-50 px-3 py-1 rounded-full border border-blue-100 transition-colors"
                  >
                    Restablecer Mapa
                  </button>
               )}
            </div>
            
            <div className="absolute top-[80px] right-6 bg-blue-50/90 backdrop-blur-sm border border-blue-200 rounded-lg p-3 z-10 shadow-sm pointer-events-none">
              <p className="text-xs font-bold text-blue-800">Cobertura Nacional</p>
              <p className="text-[10px] text-blue-600 mt-1">{Object.keys(datosDepartamentos).length} Departamentos<br/>4 regiones con punto nodal</p>
            </div>

            <div className="flex-1 bg-[#f8fafc]/50 rounded-xl border border-slate-100 relative overflow-hidden flex items-center justify-center">
              {cargando ? (
                <div className="text-slate-400 flex flex-col items-center gap-2">
                  <MapPin className="w-8 h-8 animate-bounce text-blue-400" />
                  <p className="text-sm font-medium">Descargando mapa de Colombia...</p>
                </div>
              ) : errorMapa ? (
                <div className="bg-rose-50 p-6 rounded-xl border border-rose-200 text-center max-w-sm">
                  <MapPin className="w-8 h-8 text-rose-400 mx-auto mb-2" />
                  <p className="text-rose-600 text-sm font-bold mb-1">El mapa interactivo fue bloqueado por la red</p>
                  <p className="text-rose-500 text-xs">Esto suele ocurrir por firewalls corporativos. Puedes continuar analizando las métricas laterales.</p>
                </div>
              ) : (
                <ComposableMap
                  projection="geoMercator"
                  projectionConfig={{ scale: 2200, center: [-74, 4.5] }}
                  width={800}
                  height={600}
                  style={{ width: "100%", height: "100%" }}
                >
                  <ZoomableGroup center={[-74, 4.5]} zoom={1} maxZoom={5}>
                    <Geographies geography={mapaCargado}>
                      {({ geographies }: { geographies: any[] }) =>
                        geographies.map((geo: any) => {
                          const cleanName = normalizarNombre(geo.properties?.name || geo.properties?.NAME_1 || "");
                          const pacientes = datosDepartamentos[cleanName] || 0;
                          
                          const isSelected = regionSeleccionada === "TODAS" || regionSeleccionada === cleanName;
                          const isDimmed = regionSeleccionada !== "TODAS" && regionSeleccionada !== cleanName;

                          let fill = "#f1f5f9"; 
                          if (pacientes > 50) fill = "#fca5a5"; 
                          else if (pacientes > 10) fill = "#86efac"; 
                          else if (pacientes > 5) fill = "#fcd34d"; 
                          else if (pacientes > 0) fill = "#c4b5fd"; 

                          if (isDimmed) fill = "#e2e8f0";

                          return (
                            <Geography
                              key={geo.rsmKey}
                              geography={geo}
                              onMouseEnter={(e: any) => handleMouseEnter(geo, e)}
                              onMouseMove={(e: any) => handleMouseMove(e)}
                              onMouseLeave={handleMouseLeave}
                              onClick={() => {
                                  if(pacientes > 0) setRegionSeleccionada(cleanName);
                              }}
                              style={{
                                default: { fill, stroke: "#cbd5e1", strokeWidth: isSelected && regionSeleccionada !== "TODAS" ? 1.5 : 0.5, outline: "none", transition: "all 250ms" },
                                hover: { fill: isDimmed ? "#cbd5e1" : "#3b82f6", stroke: "#1e3a8a", strokeWidth: 1.5, outline: "none", cursor: "pointer", transition: "all 250ms" },
                                pressed: { fill: "#1d4ed8", outline: "none" },
                              }}
                            />
                          );
                        })
                      }
                    </Geographies>
                  </ZoomableGroup>
                </ComposableMap>
              )}
            </div>
          </div>

          {/* MÉTRICAS */}
          <div className="xl:col-span-1 flex flex-col gap-4">
            
            <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-sm border border-slate-200 p-5 flex justify-between items-center">
               <div>
                 <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Total de Clientes</p>
                 <div className="flex items-end gap-2 mt-1">
                   <p className="text-3xl font-bold text-[#009988]">116</p>
                   <p className="text-[10px] font-bold text-emerald-600 mb-1">↗ +12.5%</p>
                 </div>
               </div>
               <div className="w-24 h-12">
                 <ResponsiveContainer width="100%" height="100%">
                   <LineChart data={dataTendencia}>
                     <Line type="monotone" dataKey="value" stroke="#009988" strokeWidth={2} dot={false} />
                   </LineChart>
                 </ResponsiveContainer>
               </div>
            </div>

            <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-sm border border-slate-200 p-5">
              <div className="flex items-center gap-2 mb-4">
                <CreditCard className="w-4 h-4 text-blue-500" />
                <h3 className="text-sm font-bold text-slate-700">Clasificación por Régimen</h3>
              </div>
              <div className="space-y-3">
                {datosRegimen.map((item, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between text-xs font-medium text-slate-600 mb-1">
                      <span>{item.name}</span>
                      <span className="font-bold text-slate-800">{item.value} ({Math.round((item.value/116)*100)}%)</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-1.5">
                      <div className="h-1.5 rounded-full" style={{ width: `${(item.value/116)*100}%`, backgroundColor: item.color }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-sm border border-slate-200 p-5">
              <div className="flex items-center gap-2 mb-4">
                <Home className="w-4 h-4 text-amber-500" />
                <h3 className="text-sm font-bold text-slate-700">Estrato Sociodemográfico</h3>
              </div>
              <div className="grid grid-cols-3 gap-2">
                 {datosEstrato.map((estrato, idx) => (
                   <div key={idx} className="bg-slate-50 border border-slate-100 rounded-lg p-2 text-center">
                      <p className="text-[10px] text-slate-500 font-medium mb-0.5">{estrato.name}</p>
                      <p className="text-sm font-bold text-slate-800">{estrato.value}</p>
                   </div>
                 ))}
              </div>
            </div>

            {/* NUEVA TARJETA: Enfoque Diferencial */}
            <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-sm border border-slate-200 p-5">
              <div className="flex items-center gap-2 mb-4">
                <HeartHandshake className="w-4 h-4 text-rose-500" />
                <h3 className="text-sm font-bold text-slate-700">Enfoque Diferencial</h3>
              </div>
              
              <div className="space-y-5">
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Grupos Étnicos</p>
                  <div className="grid grid-cols-3 gap-2">
                    {datosEtnias.filter(e => e.name !== 'Ninguno / No reporta').map((etnia, idx) => (
                      <div key={idx} className="bg-slate-50 border border-slate-100 rounded-md p-2 flex flex-col justify-center items-center text-center">
                        <span className="text-[9px] text-slate-500 font-medium leading-tight mb-0.5">{etnia.name}</span>
                        <span className="text-sm font-bold text-slate-800">{etnia.value}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-2 text-[10px] text-slate-400 flex justify-between px-1">
                    <span>Ninguno / No reporta:</span>
                    <span className="font-bold text-slate-500">102 pacientes</span>
                  </div>
                </div>

                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Vulnerabilidad / Condición Especial</p>
                  <div className="space-y-2">
                    {datosPoblacionEspecial.map((item, idx) => (
                      <div key={idx} className="flex justify-between items-center text-xs">
                        <span className="text-slate-600 flex items-center gap-1.5">
                          <div className="w-1.5 h-1.5 rounded-full bg-rose-400"></div> 
                          {item.name}
                        </span>
                        <span className="font-bold text-slate-800">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-sm border border-slate-200 p-5 flex-1 flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-purple-500" />
                  <h3 className="text-sm font-bold text-slate-700">Región / Departamento</h3>
                </div>
                <span className="text-[10px] font-medium bg-slate-100 px-2 py-0.5 rounded text-slate-500">Top 10</span>
              </div>
              
              <div className="overflow-y-auto pr-2 max-h-[160px] space-y-2">
                 {Object.entries(datosDepartamentos)
                   .sort(([,a], [,b]) => b - a)
                   .map(([dpt, count], idx) => (
                     <div 
                      key={dpt} 
                      className={`flex justify-between items-center text-xs p-1.5 rounded transition-colors ${regionSeleccionada === dpt ? 'bg-blue-50 border border-blue-100' : 'hover:bg-slate-50 border border-transparent'}`}
                      onClick={() => setRegionSeleccionada(dpt)}
                      style={{cursor: 'pointer'}}
                     >
                       <div className="flex items-center gap-2">
                          <span className="text-slate-400 font-mono w-4">{idx + 1}.</span>
                          <span className={`font-medium ${regionSeleccionada === dpt ? 'text-blue-700' : 'text-slate-600'}`}>{dpt.charAt(0) + dpt.slice(1).toLowerCase()}</span>
                       </div>
                       <span className={`font-bold ${regionSeleccionada === dpt ? 'text-blue-700' : 'text-slate-800'}`}>{count}</span>
                     </div>
                 ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}