"use client";
import "leaflet/dist/leaflet.css";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";

// Loads Map component safely only on client-side context to protect appendChild hooks
const MapComponent = dynamic(
  () => import("./components/MapComponent"),
  { 
    ssr: false,
    loading: () => <div className="h-full w-full flex items-center justify-center bg-zinc-900 text-zinc-500 font-mono text-sm">Hydrating Mapping Architecture Viewport...</div>
  }
);

export default function DashboardPage() {
  const [rails, setRails] = useState([]);
  const [activeNode, setActiveNode] = useState<any>(null);

  // Hydrate platform array datasets upon initialization
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/v1/rails")
      .then((res) => res.json())
      .then((data) => {
        setRails(data);
        if (data && data.length > 0) {
          // Default selection fallback tracking match to video
          const defaultTarget = data.find((r: any) => r.id === "fednow") || data[0];
          setActiveNode(defaultTarget);
        }
      })
      .catch((err) => console.error("Error communicating with dynamic backend service layer:", err));
  }, []);

  // Triggers dynamic data package assembly and saves structural file down seamlessly
  const handlePackageDownload = (targetId: string, name: string) => {
    fetch(`http://127.0.0.1:8000/api/v1/rails/download/${targetId}`)
      .then((res) => res.json())
      .then((data) => {
        const jsonContentString = JSON.stringify(data, null, 2);
        const dataBlob = new Blob([jsonContentString], { type: "application/json" });
        const URLInstance = window.URL.createObjectURL(dataBlob);
        
        const transientLinkElement = document.createElement("a");
        transientLinkElement.href = URLInstance;
        transientLinkElement.download = `${targetId}_metrics_export.json`;
        document.body.appendChild(transientLinkElement);
        transientLinkElement.click();
        
        // Garbage collection cleaning cycle
        document.body.removeChild(transientLinkElement);
        window.URL.revokeObjectURL(URLInstance);
      })
      .catch((err) => console.error("Download pipeline failed:", err));
  };

  if (!activeNode) return <div className="h-screen w-screen bg-[#0B111E]" />;

  return (
    <main className="flex h-screen w-screen bg-[#0B111E] overflow-hidden text-white font-sans relative select-none">
      
      {/* Absolute Quick Navigation Bar Component Layer */}
      <div className="absolute top-4 left-4 z-[1000] flex gap-2 bg-slate-900/80 backdrop-blur-md p-1.5 rounded-lg border border-zinc-800/60">
        {rails.map((node: any) => (
          <button
            key={node.id}
            onClick={() => setActiveNode(node)}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition ${
              activeNode.id === node.id 
                ? "bg-blue-600 text-white shadow-md" 
                : "text-zinc-400 hover:text-white hover:bg-zinc-800/50"
            }`}
          >
            {node.name}
          </button>
        ))}
      </div>

      {/* 70% Geospatial Visualization Theater View */}
      <section className="w-[70%] h-full relative">
        <MapComponent rails={rails} activeRailId={activeNode.id} onSelectRail={(node: any) => setActiveNode(node)} />
      </section>

      {/* 30% Control Studio Information Side-Drawer Matrix */}
      <section className="w-[30%] h-full bg-[#0B0F19] p-8 flex flex-col justify-between overflow-y-auto border-l border-zinc-900">
        <div className="space-y-6">
          <div>
            <p className="text-[10px] uppercase font-bold tracking-widest text-zinc-500">Network Intelligence Workspace</p>
            <h1 className="text-2xl font-black text-white tracking-tight mt-0.5">RealRails Control Studio</h1>
          </div>

          <div className="space-y-1">
            <h2 className="text-3xl font-extrabold tracking-tight text-white">{activeNode.name}</h2>
            <p className="text-xs font-mono text-zinc-500">Clearing Network Identifier: <span className="text-blue-400 uppercase font-bold">{activeNode.id}</span></p>
          </div>

          <div className="bg-zinc-950/40 rounded-xl p-4 border border-zinc-900/80 space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-10 bg-blue-950/50 border border-blue-900/60 rounded-lg flex items-center justify-center font-black text-sm text-blue-400 tracking-wider">
                {activeNode.country_code}
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold tracking-wider text-zinc-500">Region Anchor Profile</p>
                <p className="text-sm font-bold text-zinc-200">{activeNode.region}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3 pt-2 border-t border-zinc-900">
              <div>
                <p className="text-[10px] uppercase font-bold text-zinc-500">Settlement Efficiency</p>
                <p className="text-sm font-semibold text-emerald-400">{activeNode.efficiency}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold text-zinc-500">Operation Integrity</p>
                <p className="text-sm font-semibold text-zinc-300">{activeNode.integrity}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold text-zinc-500">Volume Metric Trend</p>
                <p className="text-sm font-semibold text-blue-400">{activeNode.volume_trend}</p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-[10px] uppercase font-bold tracking-wider text-zinc-500">Timeline of Infrastructure Launches</p>
            <div className="space-y-2 font-mono text-xs">
              <div className={`flex items-center gap-3 p-1.5 rounded ${activeNode.id === 'upi' ? 'bg-blue-950/20 text-blue-400' : 'text-zinc-500'}`}>
                <span className="font-bold">2016</span> <span>• UPI Network Launch (India)</span>
              </div>
              <div className={`flex items-center gap-3 p-1.5 rounded ${activeNode.id === 'sepa' ? 'bg-blue-950/20 text-blue-400' : 'text-zinc-500'}`}>
                <span className="font-bold">2017</span> <span>• SEPA Instant Deployment (Eurozone)</span>
              </div>
              <div className={`flex items-center gap-3 p-1.5 rounded ${activeNode.id === 'fednow' ? 'bg-blue-950/20 text-blue-400' : 'text-zinc-500'}`}>
                <span className="font-bold">2023</span> <span>• FedNow System Go-Live (USA)</span>
              </div>
            </div>
          </div>

          <div className="border-t border-zinc-900 pt-4 space-y-3">
            <div>
              <p className="text-[10px] uppercase font-bold text-zinc-500">Why This Matters</p>
              <p className="text-xs text-zinc-400 leading-relaxed mt-0.5">{activeNode.why_this_matters}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-zinc-500">Who Controls the Rail</p>
              <p className="text-xs text-zinc-300 font-medium mt-0.5">{activeNode.who_controls}</p>
            </div>
          </div>
        </div>

        {/* Dynamic Action Trigger Hook */}
        <div className="pt-6 border-t border-zinc-900 mt-6">
          <button
            onClick={() => handlePackageDownload(activeNode.id, activeNode.name)}
            className="w-full bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-bold text-xs py-3 px-4 rounded-lg transition-all shadow-lg tracking-wide uppercase"
          >
            Download Sample Data
          </button>
        </div>
      </section>
    </main>
  );
}