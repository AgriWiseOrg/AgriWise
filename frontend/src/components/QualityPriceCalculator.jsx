import React, { useState, useEffect } from 'react';
import { Leaf, DollarSign, Award, Droplets, AlertCircle } from 'lucide-react';

const QualityPriceCalculator = () => {
    const [crops, setCrops] = useState([]);
    const [formData, setFormData] = useState({
        crop: '',
        grade: 'B',
        moisture: '12',
        damage: '0'
    });
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchCrops();
    }, []);

    const fetchCrops = async () => {
        try {
            const response = await fetch('http://localhost:5001/api/market/crops');
            const data = await response.json();
            if (Array.isArray(data)) {
                setCrops(data);
                if (data.length > 0) setFormData(prev => ({ ...prev, crop: data[0] }));
            }
        } catch (err) {
            console.error('Failed to load crops', err);
        }
    };

    const handleCalculate = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setResult(null);

        try {
            const response = await fetch('http://localhost:5001/api/market/quality-price', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    crop: formData.crop,
                    grade: formData.grade,
                    params: {
                        moisture: parseFloat(formData.moisture),
                        damage: parseFloat(formData.damage)
                    }
                })
            });

            if (!response.ok) throw new Error('Calculation failed');

            const data = await response.json();
            setResult(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const getGradeColor = (grade) => {
        if (grade === 'A') return 'text-green-600 bg-green-50 border-green-200';
        if (grade === 'B') return 'text-yellow-600 bg-yellow-50 border-yellow-200';
        return 'text-red-600 bg-red-50 border-red-200';
    };

    return (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-emerald-100 rounded-lg">
                    <Award className="h-6 w-6 text-emerald-600" />
                </div>
                <div>
                    <h3 className="text-lg font-bold text-gray-800">Quality-Based Price Calculator</h3>
                    <p className="text-sm text-gray-500">Get a fair price estimate based on your crop's quality</p>
                </div>
            </div>

            <form onSubmit={handleCalculate} className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Crop Selection */}
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Select Crop</label>
                    <div className="relative">
                        <Leaf className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <select
                            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                            value={formData.crop}
                            onChange={(e) => setFormData({ ...formData, crop: e.target.value })}
                        >
                            {crops.map(crop => <option key={crop} value={crop}>{crop}</option>)}
                        </select>
                    </div>
                </div>

                {/* Grade Selection */}
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Quality Grade</label>
                    <div className="grid grid-cols-3 gap-2">
                        {['A', 'B', 'C'].map((grade) => (
                            <button
                                key={grade}
                                type="button"
                                onClick={() => setFormData({ ...formData, grade })}
                                className={`py-2 px-3 rounded-lg border text-sm font-medium transition-all ${formData.grade === grade
                                        ? 'bg-emerald-600 text-white border-emerald-600 shadow-md'
                                        : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                                    }`}
                            >
                                Grade {grade}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Parameters */}
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 flex items-center gap-2">
                        <Droplets className="h-4 w-4" /> Moisture Content (%)
                    </label>
                    <input
                        type="number"
                        className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500"
                        value={formData.moisture}
                        onChange={(e) => setFormData({ ...formData, moisture: e.target.value })}
                        step="0.1"
                    />
                </div>

                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 flex items-center gap-2">
                        <AlertCircle className="h-4 w-4" /> Damage / Foreign Matter (%)
                    </label>
                    <input
                        type="number"
                        className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500"
                        value={formData.damage}
                        onChange={(e) => setFormData({ ...formData, damage: e.target.value })}
                        step="0.1"
                    />
                </div>

                <div className="md:col-span-2">
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl transition-all shadow-lg hover:shadow-xl disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                        {loading ? 'Calculating...' : (
                            <>
                                <DollarSign className="h-5 w-5" /> Calculate Suggested Price
                            </>
                        )}
                    </button>
                </div>
            </form>

            {/* Results Section */}
            {result && (
                <div className="mt-8 p-6 bg-gradient-to-br from-gray-50 to-emerald-50 rounded-2xl border border-emerald-100 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4 pb-4 border-b border-emerald-200">
                        <div>
                            <p className="text-sm text-gray-500 mb-1">Estimated Market Value</p>
                            <h4 className="text-3xl font-bold text-gray-800">₹{result.suggestedPrice}<span className="text-lg text-gray-500 font-normal">/quintal</span></h4>
                        </div>
                        <div className={`px-4 py-2 rounded-full border ${getGradeColor(formData.grade)}`}>
                            <span className="font-semibold">Quality Score: {result.qualityScore}/100</span>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Base Market Price:</span>
                            <span className="font-medium">₹{result.originalPrice.toFixed(0)}</span>
                        </div>

                        {result.notes && result.notes.length > 0 && (
                            <div className="bg-white/60 rounded-lg p-3 space-y-2">
                                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Adjustment Factors</p>
                                {result.notes.map((note, idx) => (
                                    <div key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                                        <div className={`h-1.5 w-1.5 rounded-full ${note.includes('-') ? 'bg-red-500' : 'bg-green-500'}`}></div>
                                        {note}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default QualityPriceCalculator;
