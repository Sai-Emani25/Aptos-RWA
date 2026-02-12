import { InvoiceList } from "./InvoiceList";

interface InvestorViewProps {
    invoices: any[];
    searchTerm: string;
    setSearchTerm: (term: string) => void;
}

export function InvestorView({ invoices, searchTerm, setSearchTerm }: InvestorViewProps) {
    return (
        <div className="space-y-10">
            <section className="bg-[#0F172A] p-10 rounded-2xl relative overflow-hidden shadow-xl shadow-slate-900/10">
                <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 rounded-full blur-[100px] -mr-32 -mt-32 opacity-20 pointer-events-none"></div>
                <div className="relative z-10">
                    <h3 className="text-sm font-bold text-blue-400 uppercase tracking-widest mb-3">
                        Marketplace
                    </h3>
                    <h2 className="text-3xl font-bold text-white mb-4 tracking-tight">Investment Terminal</h2>
                    <p className="text-slate-400 max-w-xl text-lg mb-8">
                        Deploy capital into verified real-world asset receivables with transparent on-chain settlement.
                    </p>

                    <div className="inline-flex items-center gap-3 px-4 py-2 bg-slate-800/50 rounded-full border border-slate-700 backdrop-blur-sm">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                        <span className="text-sm font-medium text-slate-300">
                            Current APY: <span className="text-white font-bold">12.4%</span>
                        </span>
                    </div>
                </div>
            </section>

            <InvoiceList
                invoices={invoices}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                view="investor"
            />
        </div>
    );
}
