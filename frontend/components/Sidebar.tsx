import { LayoutDashboard, Store, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

interface SidebarProps {
    view: "issuer" | "investor";
    setView: (view: "issuer" | "investor") => void;
}

export function Sidebar({ view, setView }: SidebarProps) {
    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
        <div
            className={`${isCollapsed ? "w-20" : "w-72"} bg-[#0F172A] text-slate-300 min-h-screen p-4 flex flex-col border-r border-[#1E293B] transition-all duration-300 relative`}
        >
            {/* Toggle Button */}
            <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="absolute -right-3 top-9 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white border border-[#0F172A] hover:bg-blue-700 transition-colors shadow-lg z-20"
            >
                {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
            </button>

            <div className={`mb-10 px-2 flex items-center ${isCollapsed ? "justify-center" : "gap-2"}`}>
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-900/20 flex-shrink-0">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                </div>
                {!isCollapsed && (
                    <h1 className="text-xl font-bold tracking-tight text-white whitespace-nowrap overflow-hidden transition-opacity duration-300">
                        INVOICE.OS
                    </h1>
                )}
            </div>

            <nav className="flex-1 space-y-2">
                <button
                    onClick={() => setView("issuer")}
                    className={`w-full flex items-center ${isCollapsed ? "justify-center px-0" : "gap-3 px-4"} py-3.5 rounded-xl transition-all duration-200 group relative ${view === "issuer"
                        ? "bg-blue-600/10 text-blue-500 shadow-inner"
                        : "hover:bg-slate-800/50 hover:text-white"
                        }`}
                >
                    <LayoutDashboard size={20} className={view === "issuer" ? "text-blue-500" : "text-slate-500 group-hover:text-white transition-colors"} />
                    {!isCollapsed && <span className="font-medium text-sm whitespace-nowrap">Create Invoice</span>}

                    {/* Tooltip */}
                    {isCollapsed && (
                        <div className="absolute left-full top-1/2 -translate-y-1/2 ml-3 px-2 py-1 bg-slate-800 text-white text-xs font-medium rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50 shadow-lg border border-slate-700/50">
                            Create Invoice
                        </div>
                    )}
                </button>

                <button
                    onClick={() => setView("investor")}
                    className={`w-full flex items-center ${isCollapsed ? "justify-center px-0" : "gap-3 px-4"} py-3.5 rounded-xl transition-all duration-200 group relative ${view === "investor"
                        ? "bg-blue-600/10 text-blue-500 shadow-inner"
                        : "hover:bg-slate-800/50 hover:text-white"
                        }`}
                >
                    <Store size={20} className={view === "investor" ? "text-blue-500" : "text-slate-500 group-hover:text-white transition-colors"} />
                    {!isCollapsed && <span className="font-medium text-sm whitespace-nowrap">Marketplace</span>}

                    {/* Tooltip */}
                    {isCollapsed && (
                        <div className="absolute left-full top-1/2 -translate-y-1/2 ml-3 px-2 py-1 bg-slate-800 text-white text-xs font-medium rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50 shadow-lg border border-slate-700/50">
                            Marketplace
                        </div>
                    )}
                </button>
            </nav>

            <div className="mt-auto">
                <div className={`px-4 py-4 bg-slate-800/50 rounded-xl border border-slate-700/50 backdrop-blur-sm ${isCollapsed ? "flex justify-center px-0" : ""}`}>
                    {isCollapsed ? (
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.5)]" title="Aptos Testnet"></div>
                    ) : (
                        <>
                            <div className="text-[10px] uppercase tracking-wider text-slate-500 font-bold mb-1 whitespace-nowrap">Current Network</div>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.5)]"></div>
                                <span className="text-sm font-semibold text-slate-200 whitespace-nowrap">Aptos Testnet</span>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
