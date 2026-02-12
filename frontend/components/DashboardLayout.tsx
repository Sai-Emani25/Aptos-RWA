import { ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { useWallet } from "@aptos-labs/wallet-adapter-react";

interface DashboardLayoutProps {
    children: ReactNode;
    view: "issuer" | "investor";
    setView: (view: "issuer" | "investor") => void;
    totalValue: number;
}

export function DashboardLayout({ children, view, setView, totalValue }: DashboardLayoutProps) {
    const { connected, disconnect } = useWallet();

    return (
        <div className="flex min-h-screen bg-[#F8FAFC] font-sans selection:bg-blue-100 selection:text-blue-900">
            <Sidebar view={view} setView={setView} />

            <div className="flex-1 flex flex-col h-screen overflow-hidden">
                <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-200/60 flex items-center justify-between px-8 sticky top-0 z-10">
                    <div>
                        <h2 className="text-xl font-bold text-slate-900 tracking-tight">
                            {view === "issuer" ? "Dashboard" : "Marketplace"}
                        </h2>
                        <p className="text-sm text-slate-500 font-medium">
                            {view === "issuer" ? "Manage your assets and invoices" : "Discover and fund verified real-world assets"}
                        </p>
                    </div>

                    <div className="flex items-center gap-6">
                        {connected ? (
                            <div className="flex items-center gap-4 bg-white border border-slate-200 p-1.5 pr-2 rounded-full shadow-sm hover:shadow-md transition-shadow cursor-default group">
                                <div className="pl-4">
                                    <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider group-hover:text-blue-500 transition-colors">
                                        {view === "issuer" ? "Receivables" : "Allocated"}
                                    </div>
                                    <div className="text-sm font-bold text-slate-900 leading-none">
                                        ${totalValue.toLocaleString()}
                                    </div>
                                </div>
                                <button
                                    onClick={disconnect}
                                    className="px-4 py-2 text-xs font-bold text-slate-600 bg-slate-100 rounded-full hover:bg-slate-200 hover:text-slate-900 transition-all"
                                >
                                    Disconnect
                                </button>
                            </div>
                        ) : null}
                    </div>
                </header>

                <main className="flex-1 p-8 overflow-y-auto bg-[#F8FAFC]">
                    <div className="max-w-7xl mx-auto pb-10">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
