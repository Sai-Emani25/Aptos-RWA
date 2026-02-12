import { Search } from "lucide-react";

interface Invoice {
    id: string;
    amount: string;
}

interface InvoiceListProps {
    invoices: Invoice[];
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    view: "issuer" | "investor";
}

export function InvoiceList({ invoices, searchTerm, setSearchTerm, view }: InvoiceListProps) {
    const filteredInvoices = invoices.filter((inv) =>
        inv.id.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="relative max-w-md">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                    type="text"
                    placeholder="Search by ID..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredInvoices.map((inv, i) => (
                    <div
                        key={i}
                        className="group bg-white p-6 rounded-2xl border border-slate-100 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-blue-600">
                                <span className="font-bold text-xs">INV</span>
                            </div>
                            <div className="px-2.5 py-1 bg-green-50 text-green-700 text-[10px] font-bold tracking-wide uppercase rounded-full border border-green-100">
                                Verified
                            </div>
                        </div>

                        <div className="space-y-1 mb-6">
                            <p className="text-xs text-slate-400 font-medium">Invoice ID</p>
                            <div className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{inv.id}</div>
                        </div>

                        <div className="flex justify-between items-center pt-4 border-t border-slate-50">
                            <div>
                                <p className="text-xs text-slate-400 font-medium">Amount</p>
                                <span className="text-lg font-bold text-slate-900">
                                    ${parseInt(inv.amount).toLocaleString()}
                                </span>
                            </div>

                            {view === "investor" ? (
                                <button
                                    onClick={() => alert(`Investing in ${inv.id}`)}
                                    className="px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-lg hover:bg-blue-600 transition-colors shadow-sm"
                                >
                                    Fund
                                </button>
                            ) : (
                                <span className="flex items-center gap-1.5 text-xs font-bold text-amber-500 bg-amber-50 px-2 py-1 rounded-md">
                                    <div className="w-1.5 h-1.5 rounded-full bg-amber-500"></div>
                                    Pending
                                </span>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
