import React, { useState, useEffect } from "react";
import { X, Calculator, Info } from "lucide-react";

const QualityPriceCalculator = ({ cropName, basePrice, onClose, onApplyPrice }) => {
    const [grade, setGrade] = useState("A");
    const [moisture, setMoisture] = useState("");
    const [foreignMatter, setForeignMatter] = useState("");
    const [calculatedPrice, setCalculatedPrice] = useState(null);

    // Mock Base Prices if not provided
    const getBasePrice = (name) => {
        if (basePrice) return Number(basePrice);
        const n = name?.toLowerCase() || "";
        if (n.includes("wheat")) return 2200;
        if (n.includes("rice")) return 2800;
        if (n.includes("tomato")) return 1500;
        return 2000; // Default
    };

    const handleCalculate = () => {
        let price = getBasePrice(cropName);
        let reasons = [];

        // 1. Grade Adjustment
        if (grade === "A") {
            price *= 1.15; // +15%
            reasons.push("Grade A Premium (+15%)");
        } else if (grade === "B") {
            price *= 1.05; // +5%
            reasons.push("Grade B Standard (+5%)");
        } else {
            price *= 0.90; // -10%
            reasons.push("Grade C Discount (-10%)");
        }

        // 2. Moisture Penalty (Ideal < 12%)
        const m = parseFloat(moisture);
        if (!isNaN(m) && m > 14) {
            price *= 0.95; // -5%
            reasons.push(`High Moisture > 14% (-5%)`);
        }

        // 3. Foreign Matter Penalty (Ideal < 2%)
        const fm = parseFloat(foreignMatter);
        if (!isNaN(fm) && fm > 2) {
            price *= 0.98; // -2%
            reasons.push(`High Foreign Matter > 2% (-2%)`);
        }

        setCalculatedPrice({
            total: Math.round(price),
            breakdown: reasons
        });
    };

    return (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">

                {/* Header */}
                <div className="bg-emerald-900 p-6 text-white flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-emerald-700 rounded-xl"><Calculator size={20} /></div>
                        <div>
                            <h3 className="font-black text-lg">Price Estimator</h3>
                            <p className="text-emerald-300 text-xs font-bold uppercase tracking-wider">Quality Based</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-emerald-800 rounded-full transition"><X size={20} /></button>
                </div>

                <div className="p-6 space-y-6">
                    {/* Inputs */}
                    <div className="space-y-4">
                        <div>
                            <label className="text-xs font-black text-slate-400 uppercase tracking-wider block mb-2">Crop Grade</label>
                            <div className="grid grid-cols-3 gap-2">
                                {['A', 'B', 'C'].map((g) => (
                                    <button
                                        key={g}
                                        onClick={() => setGrade(g)}
                                        className={`py-2 rounded-xl text-sm font-bold border-2 transition-all ${grade === g
                                                ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                                                : 'border-slate-100 text-slate-500 hover:border-emerald-200'
                                            }`}
                                    >
                                        Grade {g}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-xs font-black text-slate-400 uppercase tracking-wider block mb-2">Moisture (%)</label>
                                <input
                                    type="number"
                                    placeholder="e.g. 12"
                                    className="w-full bg-slate-50 border-2 border-slate-50 rounded-xl p-3 focus:bg-white focus:border-emerald-400 outline-none font-bold text-slate-700"
                                    value={moisture}
                                    onChange={(e) => setMoisture(e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="text-xs font-black text-slate-400 uppercase tracking-wider block mb-2">Impurities (%)</label>
                                <input
                                    type="number"
                                    placeholder="e.g. 1"
                                    className="w-full bg-slate-50 border-2 border-slate-50 rounded-xl p-3 focus:bg-white focus:border-emerald-400 outline-none font-bold text-slate-700"
                                    value={foreignMatter}
                                    onChange={(e) => setForeignMatter(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Result Area */}
                    {calculatedPrice ? (
                        <div className="bg-emerald-50 rounded-2xl p-5 border border-emerald-100 animate-in fade-in slide-in-from-bottom-4">
                            <div className="flex justify-between items-end mb-4">
                                <span className="text-slate-500 text-xs font-bold uppercase tracking-widest">Suggested Price</span>
                                <span className="text-3xl font-black text-emerald-700">₹{calculatedPrice.total}</span>
                            </div>
                            <div className="space-y-1 mb-4">
                                {calculatedPrice.breakdown.map((item, idx) => (
                                    <div key={idx} className="flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> {item}
                                    </div>
                                ))}
                            </div>
                            <button
                                onClick={() => onApplyPrice(calculatedPrice.total)}
                                className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-xl shadow-lg shadow-emerald-200 transition-all active:scale-95"
                            >
                                USE SUGGESTED PRICE
                            </button>
                        </div>
                    ) : (
                        <div className="bg-slate-50 rounded-2xl p-4 flex gap-3 text-slate-400 text-sm">
                            <Info size={18} className="flex-shrink-0 mt-0.5" />
                            <p>Fill in quality parameters to generate a fair market price estimate.</p>
                        </div>
                    )}

                    {!calculatedPrice && (
                        <button
                            onClick={handleCalculate}
                            className="w-full py-4 bg-slate-800 text-white font-bold rounded-2xl shadow-xl hover:bg-slate-900 transition-all"
                        >
                            CALCULATE PRICE
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default QualityPriceCalculator;
