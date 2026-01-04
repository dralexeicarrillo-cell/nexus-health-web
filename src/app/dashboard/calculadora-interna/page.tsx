"use client";

import { useState, useEffect, useMemo } from "react";
import { Printer, Calculator, DollarSign, PieChart } from "lucide-react";

// --- TU BASE DE DATOS (DATA SOURCE) ---
const DB: Record<string, any> = {
    "A-01": {
        desc: "Centro Integrado de Agendamiento (Full)",
        tiers: [
            { limit: "0-500", channel: 436.44, public: 991.91, imp: 476.11, interop: 1500 },
            { limit: "1k", channel: 602.10, public: 1368.42, imp: 656.84, interop: 1500 },
            { limit: "2k", channel: 924.53, public: 2101.21, imp: 1008.58, interop: 1500 },
            { limit: "3k", channel: 1229.83, public: 2795.08, imp: 1341.64, interop: 1500 },
            { limit: "4k", channel: 1521.68, public: 3458.36, imp: 1660.01, interop: 1500 },
            { limit: "5k", channel: 1802.76, public: 4097.18, imp: 1966.64, interop: 2300 },
            { limit: "7k", channel: 2378.04, public: 5404.63, imp: 2594.22, interop: 2300 },
            { limit: "10k", channel: 3232.85, public: 7347.39, imp: 3526.75, interop: 2300 },
            { limit: "15k", channel: 4648.54, public: 10564.86, imp: 5071.13, interop: 2800 },
            { limit: "20k", channel: 5948.97, public: 13520.39, imp: 6489.79, interop: 2800 },
            { limit: "25k", channel: 7284.39, public: 16555.44, imp: 7946.61, interop: 2800 },
            { limit: "30k", channel: 8594.37, public: 19532.66, imp: 9375.68, interop: 2800 },
            { limit: "35k", channel: 9882.22, public: 22459.59, imp: 10780.60, interop: 2800 },
            { limit: "40k", channel: 11150.71, public: 25342.52, imp: 12164.41, interop: 2800 },
            { limit: "45k", channel: 12402.16, public: 28186.73, imp: 13529.63, interop: 3000 },
            { limit: "50k", channel: 13638.54, public: 30996.69, imp: 14878.41, interop: 3000 },
            { limit: "55k", channel: 14861.53, public: 33776.20, imp: 16212.58, interop: 3000 },
            { limit: "60k", channel: 16072.55, public: 36528.53, imp: 17533.69, interop: 3000 },
            { limit: "70k", channel: 18581.73, public: 42231.21, imp: 20270.98, interop: 3000 },
            { limit: "80k", channel: 21064.37, public: 47873.56, imp: 22979.31, interop: 3000 },
            { limit: "100k", channel: 26108.10, public: 59336.59, imp: 28481.56, interop: 3000 },
            { limit: "120k", channel: 31100.48, public: 70682.91, imp: 33927.80, interop: 3000 },
            { limit: "150k", channel: 38602.52, public: 87733.00, imp: 42111.84, interop: 3000 },
            { limit: "180k", channel: 46035.80, public: 104626.81, imp: 50220.87, interop: 3000 },
            { limit: "200k", channel: 50875.32, public: 115625.72, imp: 55500.34, interop: 3000 }
        ]
    },
    "A-02": {
        desc: "Plan sin Chatbot",
        tiers: [
            { limit: "0-500", channel: 427.90, public: 972.51, imp: 466.80, interop: 1500 },
            { limit: "1k", channel: 585.03, public: 1329.62, imp: 638.22, interop: 1500 },
            { limit: "2k", channel: 890.39, public: 2023.62, imp: 971.34, interop: 1500 },
            { limit: "3k", channel: 1178.62, public: 2678.69, imp: 1285.77, interop: 1500 },
            { limit: "4k", channel: 1453.40, public: 3303.18, imp: 1585.52, interop: 1500 },
            { limit: "5k", channel: 1717.41, public: 3903.20, imp: 1873.53, interop: 2300 },
            { limit: "7k", channel: 2258.54, public: 5133.06, imp: 2463.87, interop: 2300 },
            { limit: "10k", channel: 3062.15, public: 6959.43, imp: 3340.53, interop: 2300 },
            { limit: "15k", channel: 4392.48, public: 9982.92, imp: 4791.80, interop: 2800 },
            { limit: "20k", channel: 5607.57, public: 12744.47, imp: 6117.35, interop: 2800 },
            { limit: "25k", channel: 6857.64, public: 15585.54, imp: 7481.06, interop: 2800 },
            { limit: "30k", channel: 8082.27, public: 18368.79, imp: 8817.02, interop: 2800 },
            { limit: "35k", channel: 9284.77, public: 21101.74, imp: 10128.83, interop: 2800 },
            { limit: "40k", channel: 10467.90, public: 23790.69, imp: 11419.53, interop: 2800 },
            { limit: "45k", channel: 11634.01, public: 26440.92, imp: 12691.64, interop: 3000 },
            { limit: "50k", channel: 12785.04, public: 29056.90, imp: 13947.31, interop: 3000 },
            { limit: "55k", channel: 13922.67, public: 31642.43, imp: 15188.37, interop: 3000 },
            { limit: "60k", channel: 15048.34, public: 34200.78, imp: 16416.37, interop: 3000 },
            { limit: "70k", channel: 17386.82, public: 39515.50, imp: 18967.44, interop: 3000 },
            { limit: "80k", channel: 19698.76, public: 44769.90, imp: 21489.55, interop: 3000 },
            { limit: "100k", channel: 24401.09, public: 55457.01, imp: 26619.37, interop: 3000 },
            { limit: "120k", channel: 29052.06, public: 66027.42, imp: 31693.16, interop: 3000 },
            { limit: "150k", channel: 36042.00, public: 81913.63, imp: 39318.54, interop: 3000 },
            { limit: "180k", channel: 42963.17, public: 97643.57, imp: 46868.91, interop: 3000 },
            { limit: "200k", channel: 47461.29, public: 107866.56, imp: 51775.95, interop: 3000 }
        ]
    },
    "A-03": {
        desc: "Plan sin Confirmaciones por Llamada",
        tiers: [
            { limit: "0-500", channel: 384.49, public: 873.83, imp: 419.44, interop: 1500 },
            { limit: "1k", channel: 498.20, public: 1132.28, imp: 543.49, interop: 1500 },
            { limit: "2k", channel: 716.73, public: 1628.92, imp: 781.88, interop: 1500 },
            { limit: "3k", channel: 918.12, public: 2086.64, imp: 1001.59, interop: 1500 },
            { limit: "4k", channel: 1106.06, public: 2513.78, imp: 1206.62, interop: 1500 },
            { limit: "5k", channel: 1283.24, public: 2916.45, imp: 1399.90, interop: 2300 },
            { limit: "7k", channel: 1650.71, public: 3751.62, imp: 1800.78, interop: 2300 },
            { limit: "10k", channel: 2193.81, public: 4985.94, imp: 2393.25, interop: 2300 },
            { limit: "15k", channel: 3089.98, public: 7022.69, imp: 3370.89, interop: 2800 },
            { limit: "20k", channel: 3870.90, public: 8797.50, imp: 4222.80, interop: 2800 },
            { limit: "25k", channel: 4686.80, public: 10651.83, imp: 5112.88, interop: 2800 },
            { limit: "30k", channel: 5477.26, public: 12448.32, imp: 5975.20, interop: 2800 },
            { limit: "35k", channel: 6245.60, public: 14194.53, imp: 6813.38, interop: 2800 },
            { limit: "40k", channel: 6994.57, public: 15896.74, imp: 7630.44, interop: 2800 },
            { limit: "45k", channel: 7726.50, public: 17560.23, imp: 8428.91, interop: 3000 },
            { limit: "50k", channel: 8443.37, public: 19189.47, imp: 9210.94, interop: 3000 },
            { limit: "55k", channel: 9146.83, public: 20788.26, imp: 9978.36, interop: 3000 },
            { limit: "60k", channel: 9838.34, public: 22359.86, imp: 10732.73, interop: 3000 },
            { limit: "70k", channel: 11308.48, public: 25701.09, imp: 12336.52, interop: 3000 },
            { limit: "80k", channel: 12752.08, public: 28982.01, imp: 13911.36, interop: 3000 },
            { limit: "100k", channel: 15717.74, public: 35722.14, imp: 17146.63, interop: 3000 },
            { limit: "120k", channel: 18632.05, public: 42345.57, imp: 20325.88, interop: 3000 },
            { limit: "150k", channel: 23016.98, public: 52311.32, imp: 25109.44, interop: 3000 },
            { limit: "180k", channel: 27333.15, public: 62120.81, imp: 29817.99, interop: 3000 },
            { limit: "200k", channel: 30094.60, public: 68396.82, imp: 32830.48, interop: 3000 }
        ]
    },
    "A-04": {
        desc: "Plan sin WhatsApp General",
        tiers: [
            { limit: "0-500", channel: 125.42, public: 285.06, imp: 136.83, interop: 1500 },
            { limit: "1k", channel: 237.49, public: 539.75, imp: 259.08, interop: 1500 },
            { limit: "2k", channel: 452.72, public: 1028.90, imp: 493.87, interop: 1500 },
            { limit: "3k", channel: 650.82, public: 1479.13, imp: 709.98, interop: 1500 },
            { limit: "4k", channel: 835.46, public: 1898.77, imp: 911.41, interop: 1500 },
            { limit: "5k", channel: 1009.34, public: 2293.95, imp: 1101.10, interop: 2300 },
            { limit: "7k", channel: 1370.21, public: 3114.12, imp: 1494.78, interop: 2300 },
            { limit: "10k", channel: 1903.42, public: 4325.96, imp: 2076.46, interop: 2300 },
            { limit: "15k", channel: 2783.10, public: 6325.23, imp: 3036.11, interop: 2800 },
            { limit: "20k", channel: 3547.53, public: 8062.57, imp: 3870.03, interop: 2800 },
            { limit: "25k", channel: 4346.95, public: 9879.42, imp: 4742.12, interop: 2800 },
            { limit: "30k", channel: 5120.92, public: 11638.44, imp: 5586.45, interop: 2800 },
            { limit: "35k", channel: 5872.76, public: 13347.18, imp: 6406.65, interop: 2800 },
            { limit: "40k", channel: 6605.24, public: 15011.91, imp: 7205.72, interop: 2800 },
            { limit: "45k", channel: 7320.69, public: 16637.93, imp: 7986.20, interop: 3000 },
            { limit: "50k", channel: 8021.06, public: 18229.69, imp: 8750.25, interop: 3000 },
            { limit: "55k", channel: 8708.04, public: 19791.00, imp: 9499.68, interop: 3000 },
            { limit: "60k", channel: 9383.06, public: 21325.13, imp: 10236.06, interop: 3000 },
            { limit: "70k", channel: 10820.22, public: 24591.41, imp: 11803.88, interop: 3000 },
            { limit: "80k", channel: 12230.84, public: 27797.37, imp: 13342.74, interop: 3000 },
            { limit: "100k", channel: 15130.55, public: 34387.61, imp: 16506.05, interop: 3000 },
            { limit: "120k", channel: 17978.90, public: 40861.14, imp: 19613.35, interop: 3000 },
            { limit: "150k", channel: 22264.90, public: 50602.04, imp: 24288.98, interop: 3000 },
            { limit: "180k", channel: 26482.13, public: 60186.67, imp: 28889.60, interop: 3000 },
            { limit: "200k", channel: 29177.62, public: 66312.78, imp: 31830.14, interop: 3000 }
        ]
    },
    "A-05": {
        desc: "Plan de Autogestión (Sin Confirmaciones)",
        tiers: [
            { limit: "0-500", channel: 339.42, public: 771.41, imp: 370.28, interop: 1500 },
            { limit: "1k", channel: 408.07, public: 927.43, imp: 445.17, interop: 1500 },
            { limit: "2k", channel: 536.46, public: 1219.23, imp: 585.23, interop: 1500 },
            { limit: "3k", channel: 647.73, public: 1472.11, imp: 706.61, interop: 1500 },
            { limit: "4k", channel: 745.54, public: 1694.41, imp: 813.32, interop: 1500 },
            { limit: "5k", channel: 832.58, public: 1892.23, imp: 908.27, interop: 2300 },
            { limit: "7k", channel: 1019.79, public: 2317.71, imp: 1112.50, interop: 2300 },
            { limit: "10k", channel: 1292.50, public: 2937.50, imp: 1410.00, interop: 2300 },
            { limit: "15k", channel: 1738.01, public: 3950.03, imp: 1896.02, interop: 2800 },
            { limit: "20k", channel: 2068.28, public: 4700.63, imp: 2256.30, interop: 2800 },
            { limit: "25k", channel: 2433.52, public: 5530.73, imp: 2654.75, interop: 2800 },
            { limit: "30k", channel: 2773.33, public: 6303.01, imp: 3025.45, interop: 2800 },
            { limit: "35k", channel: 3091.00, public: 7025.00, imp: 3372.00, interop: 2800 },
            { limit: "40k", channel: 3389.32, public: 7702.99, imp: 3697.44, interop: 2800 },
            { limit: "45k", channel: 3670.60, public: 8342.26, imp: 4004.29, interop: 3000 },
            { limit: "50k", channel: 3936.80, public: 8947.28, imp: 4294.69, interop: 3000 },
            { limit: "55k", channel: 4189.61, public: 9521.85, imp: 4570.49, interop: 3000 },
            { limit: "60k", channel: 4430.46, public: 10069.23, imp: 4833.23, interop: 3000 },
            { limit: "70k", channel: 4999.29, public: 11362.03, imp: 5453.77, interop: 3000 },
            { limit: "80k", channel: 5541.58, public: 12594.51, imp: 6045.36, interop: 3000 },
            { limit: "100k", channel: 6704.62, public: 15237.77, imp: 7314.13, interop: 3000 },
            { limit: "120k", channel: 7816.30, public: 17764.32, imp: 8526.88, interop: 3000 },
            { limit: "150k", channel: 9497.30, public: 21584.76, imp: 10360.69, interop: 3000 },
            { limit: "180k", channel: 11109.53, public: 25248.93, imp: 12119.49, interop: 3000 },
            { limit: "200k", channel: 12068.35, public: 27428.07, imp: 13165.48, interop: 3000 }
        ]
    },
    "T-01": {
        desc: "Turnero / Sala de Espera",
        tiers: [
            { limit: "0-500", channel: 97.96, public: 222.65, imp: 106.87, interop: 1500 },
            { limit: "1k", channel: 178.12, public: 404.81, imp: 194.31, interop: 1500 },
            { limit: "2k", channel: 326.55, public: 742.15, imp: 356.23, interop: 1500 },
            { limit: "3k", channel: 452.14, public: 1027.59, imp: 493.25, interop: 1500 },
            { limit: "4k", channel: 559.79, public: 1272.26, imp: 610.68, interop: 1500 },
            { limit: "5k", channel: 653.09, public: 1484.30, imp: 712.47, interop: 2300 },
            { limit: "7k", channel: 857.18, public: 1948.15, imp: 935.11, interop: 2300 },
            { limit: "10k", channel: 1152.52, public: 2619.36, imp: 1257.29, interop: 2300 },
            { limit: "15k", channel: 1632.73, public: 3710.76, imp: 1781.16, interop: 2800 },
            { limit: "20k", channel: 1959.28, public: 4452.91, imp: 2137.40, interop: 2800 },
            { limit: "25k", channel: 2332.48, public: 5301.08, imp: 2544.52, interop: 2800 },
            { limit: "30k", channel: 2671.74, public: 6072.15, imp: 2914.63, interop: 2800 },
            { limit: "35k", channel: 2981.51, public: 6776.16, imp: 3252.56, interop: 2800 },
            { limit: "40k", channel: 3265.47, public: 7421.51, imp: 3562.33, interop: 2800 },
            { limit: "45k", channel: 3526.70, public: 8015.23, imp: 3847.31, interop: 3000 },
            { limit: "50k", channel: 3767.84, public: 8563.28, imp: 4110.38, interop: 3000 },
            { limit: "55k", channel: 3991.12, public: 9070.74, imp: 4353.95, interop: 3000 },
            { limit: "60k", channel: 4198.46, public: 9541.94, imp: 4580.13, interop: 3000 },
            { limit: "70k", channel: 4729.29, public: 10748.40, imp: 5159.23, interop: 3000 },
            { limit: "80k", channel: 5224.74, public: 11874.42, imp: 5699.72, interop: 3000 },
            { limit: "100k", channel: 6320.26, public: 14364.22, imp: 6894.82, interop: 3000 },
            { limit: "120k", channel: 7347.30, public: 16698.40, imp: 8015.23, interop: 3000 },
            { limit: "150k", channel: 8905.81, public: 20240.49, imp: 9715.43, interop: 3000 },
            { limit: "180k", channel: 10372.65, public: 23574.21, imp: 11315.62, interop: 3000 },
            { limit: "200k", channel: 11195.88, public: 25445.18, imp: 12213.69, interop: 3000 }
        ]
    }
};

const fmt = (num: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(num);
};

export default function CalculatorInternalPage() {
    // --- ESTADOS (REACT STATE) ---
    const [selectedPlan, setSelectedPlan] = useState("A-01");
    const [selectedTierIdx, setSelectedTierIdx] = useState(0);
    const [publicPrice, setPublicPrice] = useState(0);
    const [checkImp, setCheckImp] = useState(false);
    const [checkInterop, setCheckInterop] = useState(false);
    const [ivaRate, setIvaRate] = useState(0.13);
    const [commBasis, setCommBasis] = useState("total"); // 'margin' or 'total'

    // --- EFECTOS: Cuando cambia el plan o el tier, reseteamos el precio sugerido
    useEffect(() => {
        const planData = DB[selectedPlan];
        const tierData = planData.tiers[selectedTierIdx];
        setPublicPrice(tierData.public);
    }, [selectedPlan, selectedTierIdx]);

    // --- CÁLCULOS (LOGIC) ---
    const calculations = useMemo(() => {
        const planData = DB[selectedPlan];
        const tierData = planData.tiers[selectedTierIdx];

        // 1. Costos Base
        const channelPrice = tierData.channel;
        const impCost = checkImp ? tierData.imp : 0;
        const interopCost = checkInterop ? tierData.interop : 0;

        // 2. Totales Facturación
        const subtotalOneOff = impCost + interopCost;
        const subtotalMonthly = publicPrice;
        const totalTaxable = subtotalOneOff + subtotalMonthly;
        const ivaAmount = totalTaxable * ivaRate;
        const grandTotal = totalTaxable + ivaAmount;

        // 3. Rentabilidad
        const margin = publicPrice - channelPrice;

        // 4. Comisiones
        let salesCommission = 0;
        if (commBasis === 'margin') {
            salesCommission = margin * 0.05;
        } else {
            salesCommission = publicPrice * 0.05;
        }

        // 5. Distribución
        const remainder = margin - salesCommission;
        const cocoShare = remainder * 0.80;
        const nexusShare = remainder * 0.20;

        return {
            desc: planData.desc,
            limit: tierData.limit,
            channelPrice,
            impCost,
            interopCost,
            ivaAmount,
            grandTotal,
            margin,
            salesCommission,
            remainder,
            cocoShare,
            nexusShare
        };

    }, [selectedPlan, selectedTierIdx, publicPrice, checkImp, checkInterop, ivaRate, commBasis]);

    // --- IMPRESIÓN ---
    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="max-w-6xl mx-auto space-y-6 print:p-0">
            {/* Header (No se imprime para ahorrar tinta) */}
            <div className="flex justify-between items-center print:hidden">
                <h2 className="text-2xl font-bold text-[#1A1F2C] flex items-center gap-2">
                    <Calculator className="text-[#F7941D]" />
                    Calculadora de Costos & Márgenes
                </h2>
                <button 
                    onClick={handlePrint}
                    className="flex items-center gap-2 px-4 py-2 bg-[#1A1F2C] text-white rounded-lg hover:bg-slate-800 transition-colors"
                >
                    <Printer size={18} />
                    Imprimir Cotización
                </button>
            </div>

            {/* Layout Principal */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 print:block">
                
                {/* COLUMNA IZQUIERDA: CONFIGURACIÓN (Inputs) */}
                <div className="lg:col-span-4 space-y-6 bg-white p-6 rounded-xl border border-slate-200 shadow-sm print:hidden">
                    <h3 className="font-bold text-slate-700 mb-4 border-b pb-2">1. Configuración del Plan</h3>
                    
                    {/* Select Plan */}
                    <div>
                        <label className="block text-sm font-medium text-slate-600 mb-1">Plan Base</label>
                        <select 
                            value={selectedPlan}
                            onChange={(e) => { setSelectedPlan(e.target.value); setSelectedTierIdx(0); }}
                            className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#262262] outline-none"
                        >
                            {Object.keys(DB).map(key => (
                                <option key={key} value={key}>{key} - {DB[key].desc}</option>
                            ))}
                        </select>
                    </div>

                    {/* Select Tier */}
                    <div>
                        <label className="block text-sm font-medium text-slate-600 mb-1">Volumen (Tier)</label>
                        <select 
                            value={selectedTierIdx}
                            onChange={(e) => setSelectedTierIdx(Number(e.target.value))}
                            className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#262262] outline-none"
                        >
                            {DB[selectedPlan].tiers.map((tier: any, idx: number) => (
                                <option key={idx} value={idx}>Citas/Turnos: {tier.limit}</option>
                            ))}
                        </select>
                    </div>

                    {/* Precio Público (Editable) */}
                    <div>
                        <label className="block text-sm font-medium text-slate-600 mb-1">Precio Público (Mensual)</label>
                        <div className="relative">
                            <span className="absolute left-3 top-2 text-slate-400">$</span>
                            <input 
                                type="number"
                                value={publicPrice}
                                onChange={(e) => setPublicPrice(parseFloat(e.target.value) || 0)}
                                className="w-full pl-8 p-2 border border-slate-300 rounded-lg font-bold text-[#262262]"
                            />
                        </div>
                        <p className="text-xs text-slate-400 mt-1">Modifica este valor para ajustar el margen.</p>
                    </div>

                    <div className="space-y-3 pt-4 border-t">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input type="checkbox" checked={checkImp} onChange={(e) => setCheckImp(e.target.checked)} className="w-4 h-4 text-[#F7941D]" />
                            <span className="text-sm">Incluir Implementación</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input type="checkbox" checked={checkInterop} onChange={(e) => setCheckInterop(e.target.checked)} className="w-4 h-4 text-[#F7941D]" />
                            <span className="text-sm">Incluir Interoperabilidad</span>
                        </label>
                    </div>

                    <div className="pt-4 border-t">
                        <label className="block text-sm font-medium text-slate-600 mb-1">Impuesto (IVA)</label>
                        <select 
                            value={ivaRate} 
                            onChange={(e) => setIvaRate(parseFloat(e.target.value))}
                            className="w-full p-2 border border-slate-300 rounded-lg"
                        >
                            <option value="0.13">13% (Costa Rica)</option>
                            <option value="0">0% (Exento/Exportación)</option>
                        </select>
                    </div>
                </div>

                {/* COLUMNA DERECHA: RESULTADOS */}
                <div className="lg:col-span-8 space-y-6">
                    
                    {/* Tarjeta de Totales para el Cliente */}
                    <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm print:border-none print:shadow-none print:p-0">
                        
                        {/* Encabezado de Impresión */}
                        <div className="hidden print:block mb-8 border-b pb-4">
                            <h1 className="text-2xl font-bold font-serif text-[#1A1F2C]">NexusHealth Strategies</h1>
                            <p className="text-sm text-slate-500">Cotización Generada: {new Date().toLocaleDateString()}</p>
                            <p className="mt-2"><strong>Plan:</strong> {calculations.desc}</p>
                            <p><strong>Volumen:</strong> Hasta {calculations.limit} Citas/Mes</p>
                        </div>

                        <h3 className="font-bold text-slate-700 mb-6 flex items-center gap-2 print:hidden">
                            <DollarSign className="text-green-600" size={20}/> Resumen Financiero (Cliente)
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-4">
                                <Row label="Costo del Canal (Base)" value={fmt(calculations.channelPrice)} isCost />
                                {checkImp && <Row label="Implementación (One-off)" value={fmt(calculations.impCost)} />}
                                {checkInterop && <Row label="Interoperabilidad (One-off)" value={fmt(calculations.interopCost)} />}
                            </div>
                            <div className="space-y-4 bg-slate-50 p-6 rounded-lg print:bg-transparent print:p-0">
                                <Row label="Precio Público Mensual" value={fmt(publicPrice)} bold />
                                <div className="border-t border-slate-300 my-2"></div>
                                <Row label={`IVA (${ivaRate * 100}%)`} value={fmt(calculations.ivaAmount)} />
                                <div className="flex justify-between items-center text-xl font-bold text-[#262262] mt-2">
                                    <span>Gran Total:</span>
                                    <span>{fmt(calculations.grandTotal)}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Tarjeta de Rentabilidad INTERNA (No se imprime) */}
                    <div className="bg-[#1A1F2C] text-white p-8 rounded-xl shadow-lg print:hidden relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                            <PieChart size={120} />
                        </div>
                        
                        <div className="flex justify-between items-start mb-6 relative z-10">
                            <h3 className="font-bold text-lg flex items-center gap-2">
                                <PieChart className="text-[#F7941D]" /> 
                                Distribución de Utilidad
                            </h3>
                            
                            <select 
                                value={commBasis}
                                onChange={(e) => setCommBasis(e.target.value)}
                                className="bg-white/10 text-xs border border-white/20 rounded px-2 py-1 text-white outline-none"
                            >
                                <option value="total">Comisión sobre Total</option>
                                <option value="margin">Comisión sobre Margen</option>
                            </select>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
                            <StatCard label="Margen Bruto" value={fmt(calculations.margin)} color="text-green-400" />
                            <StatCard label="Comisión Ventas (5%)" value={fmt(calculations.salesCommission)} color="text-yellow-400" />
                            <StatCard label="Neto Distribuible" value={fmt(calculations.remainder)} color="text-white" bold />
                        </div>

                        <div className="mt-8 pt-6 border-t border-white/10 grid grid-cols-2 gap-8 relative z-10">
                            <div>
                                <span className="text-slate-400 text-sm block mb-1">Coco Share (80%)</span>
                                <span className="text-2xl font-light">{fmt(calculations.cocoShare)}</span>
                            </div>
                            <div>
                                <span className="text-[#F7941D] text-sm block mb-1 font-bold">Nexus Share (20%)</span>
                                <span className="text-3xl font-bold text-white">{fmt(calculations.nexusShare)}</span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

// Componentes pequeños para la UI
function Row({ label, value, bold = false, isCost = false }: any) {
    return (
        <div className={`flex justify-between items-center ${bold ? 'font-bold text-slate-800' : 'text-slate-600'}`}>
            <span>{label}</span>
            <span className={isCost ? 'text-red-500' : ''}>{value}</span>
        </div>
    );
}

function StatCard({ label, value, color, bold }: any) {
    return (
        <div className="bg-white/5 p-4 rounded-lg backdrop-blur-sm">
            <span className="block text-xs text-slate-400 uppercase tracking-wider mb-1">{label}</span>
            <span className={`block text-xl ${color} ${bold ? 'font-bold' : 'font-light'}`}>{value}</span>
        </div>
    );
}