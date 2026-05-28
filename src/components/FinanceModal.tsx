import React, { useState, useEffect } from 'react';
import { X, Check, Calculator, Clock, CreditCard, Shield, Flame } from 'lucide-react';

interface FinanceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (financeType: string) => void;
}

export default function FinanceModal({ isOpen, onClose, onApply }: FinanceModalProps) {
  const [cost, setCost] = useState<number>(2500);
  const [deposit, setDeposit] = useState<number>(150);
  const [term, setTerm] = useState<number>(60); // 12, 36, 60, 120
  const [monthlyPayment, setMonthlyPayment] = useState<number>(0);
  const [totalFinanced, setTotalFinanced] = useState<number>(0);
  const [totalRepayable, setTotalRepayable] = useState<number>(0);
  const [interestCharged, setInterestCharged] = useState<number>(0);

  useEffect(() => {
    const financedAmount = Math.max(0, cost - deposit);
    setTotalFinanced(financedAmount);

    if (financedAmount <= 0) {
      setMonthlyPayment(0);
      setTotalRepayable(0);
      setInterestCharged(0);
      return;
    }

    if (term === 12) {
      // 0% APR Interest-Free
      const monthly = financedAmount / 12;
      setMonthlyPayment(monthly);
      setTotalRepayable(cost);
      setInterestCharged(0);
    } else {
      // 11.9% APR representative rate
      const annualRate = 0.119;
      const monthlyRate = annualRate / 12;
      
      const payment = financedAmount * (monthlyRate * Math.pow(1 + monthlyRate, term)) / (Math.pow(1 + monthlyRate, term) - 1);
      
      const totalRepaidIncludeDeposit = (payment * term) + deposit;
      setMonthlyPayment(payment);
      setTotalRepayable(totalRepaidIncludeDeposit);
      setInterestCharged(Math.max(0, (payment * term) - financedAmount));
    }
  }, [cost, deposit, term]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal Card Layout */}
      <div className="relative bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden border border-slate-100 z-10 max-h-[92vh] flex flex-col animate-in fade-in zoom-in duration-300">
        
        {/* Banner */}
        <div className="bg-gradient-to-r from-orange-600 to-amber-500 px-6 py-6 text-white relative">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 text-white rounded-full p-2 transition-colors duration-200"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center border border-white/20">
              <CreditCard className="w-6 h-6 text-orange-200" />
            </div>
            <div>
              <span className="block text-[10px] uppercase tracking-widest font-bold text-orange-100 font-mono">
                Flexible Payment Options
              </span>
              <h3 className="font-display font-extrabold text-2xl tracking-tight mt-0.5 text-white">
                northHeat Finance Plans™
              </h3>
            </div>
          </div>
        </div>

        {/* Dynamic Calculator body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <div className="text-left">
            <h4 className="font-display font-bold text-lg text-slate-800">
              Spread the Cost of Yours New Boiler
            </h4>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 leading-relaxed">
              We offer representative <strong className="text-orange-600 font-semibold">0% APR interest-free plans</strong> for 12 months, or flexible longer-term payments spanning up to 10 years with <strong>no deposit required</strong>.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            {/* Inputs Column */}
            <div className="space-y-5 text-left border border-slate-100 p-5 rounded-2xl bg-slate-50/50">
              <div className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-400 uppercase tracking-widest font-mono">
                <Calculator className="w-4 h-4 text-slate-400" /> Dynamic Estimator
              </div>

              {/* Slider: cost */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <label className="font-semibold text-slate-700">Estimated Project Cost</label>
                  <span className="font-mono font-bold text-teal-600 text-sm">£{cost.toLocaleString()}</span>
                </div>
                <input 
                  type="range" 
                  min="1500" 
                  max="5000" 
                  step="100"
                  value={cost} 
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    setCost(val);
                    if (deposit > val) setDeposit(Math.floor(val * 0.1));
                  }}
                  className="w-full accent-teal-600 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                  <span>£1,500</span>
                  <span>£5,000 (Premium/Combi Pack)</span>
                </div>
              </div>

              {/* Slider: deposit */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <label className="font-semibold text-slate-700">Optional Deposit Contribution</label>
                  <span className="font-mono font-bold text-orange-600 text-sm">£{deposit.toLocaleString()}</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max={Math.floor(cost * 0.6)} 
                  step="50"
                  value={deposit} 
                  onChange={(e) => setDeposit(Number(e.target.value))}
                  className="w-full accent-orange-600 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                  <span>£0 (No Deposit)</span>
                  <span>Max deposit: £{(Math.floor(cost * 0.6)).toLocaleString()}</span>
                </div>
              </div>

              {/* Selection Buttons: Terms */}
              <div className="space-y-2.5">
                <label className="text-xs font-semibold text-slate-700">Choose Repayment Period</label>
                <div className="grid grid-cols-4 gap-2">
                  {[12, 36, 60, 120].map((m) => (
                    <button
                      key={m}
                      onClick={() => setTerm(m)}
                      className={`py-2.5 px-1.5 rounded-xl border font-bold text-xs font-mono transition-all duration-200 ${
                        term === m 
                          ? 'border-orange-500 bg-orange-50 text-orange-700 shadow-md shadow-orange-500/5' 
                          : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-600'
                      }`}
                    >
                      {m} mo
                      {m === 12 && <span className="block text-[8px] text-orange-600 font-bold tracking-tight">0% APR</span>}
                      {m !== 12 && <span className="block text-[8px] text-slate-400 font-medium">11.9% APR</span>}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Calculations Display Column */}
            <div className="bg-slate-900 text-white rounded-2xl p-6 flex flex-col justify-between h-full border border-slate-800">
              <div className="space-y-4">
                <div className="text-center pb-4 border-b border-slate-800">
                  <span className="text-[10px] uppercase tracking-widest text-slate-400 font-bold font-mono">Estimated Monthly Cost</span>
                  <div className="text-4xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-400 mt-1">
                    £{monthlyPayment.toFixed(2)}
                  </div>
                  <span className="text-[10px] text-slate-400">
                    {term === 12 ? 'Interest Free - 12 Monthly Payments' : `Repayments over ${term} calendar months`}
                  </span>
                </div>

                <div className="space-y-2.5 text-xs">
                  <div className="flex justify-between text-slate-300">
                    <span>Cash retail price:</span>
                    <span className="font-mono text-white">£{cost.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>Less deposit:</span>
                    <span className="font-mono text-white">- £{deposit.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>Total financed:</span>
                    <span className="font-mono text-white">£{totalFinanced.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Representative Rate:</span>
                    <span className="font-mono text-teal-400 font-semibold">{term === 12 ? '0.00% APR' : '11.9% APR representative'}</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>Interest charged:</span>
                    <span className="font-mono text-white">£{interestCharged.toFixed(2)}</span>
                  </div>
                  <div className="h-px bg-slate-800 my-2"></div>
                  <div className="flex justify-between font-bold text-sm text-amber-400">
                    <span>Total pay repayable:</span>
                    <span className="font-mono">£{totalRepayable.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Guarantees list inside result */}
              <div className="mt-6 pt-4 border-t border-slate-800/80 space-y-1.5 text-[10px] text-slate-400 text-left">
                <div className="flex items-center gap-1.5">
                  <Check className="w-3 h-3 text-emerald-400" />
                  <span>No hidden fees or penalty charges</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="w-3 h-3 text-emerald-400" />
                  <span>Full early repayment permitted free</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="w-3 h-3 text-emerald-400" />
                  <span>FCA accredited lender protection</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-50 border-t border-slate-100 p-4 flex flex-col sm:flex-row gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 px-4 rounded-xl hover:bg-slate-100 text-slate-600 font-semibold text-xs sm:text-sm transition-colors text-center border border-slate-200"
          >
            Go Back
          </button>
          
          <button
            onClick={() => {
              onApply(`Finance Plan (${term} Months at ${term === 12 ? '0%' : '11.9%'} APR representative)`);
              onClose();
            }}
            className="flex-2 py-3 px-6 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-extrabold text-xs sm:text-sm transition-all duration-200 text-center shadow-lg shadow-orange-600/10"
          >
            Pre-Apply for Finance Plan™
          </button>
        </div>

      </div>
    </div>
  );
}
