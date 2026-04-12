import { FraudUpload } from "@/components/dashboard/FraudUpload";
import Link from "next/link";
import { ShieldCheck, Crosshair, AlertTriangle } from "lucide-react";

export default function FraudCheckHome() {
  return (
    <>
      <section className="relative min-h-[500px] flex items-center bg-zinc-900 overflow-hidden pt-12 pb-24 border-b-8 border-red-600">
        <div className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-red-600 via-zinc-900 to-zinc-900"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        
        <div className="relative z-20 max-w-7xl mx-auto px-8 w-full text-center space-y-8">
           <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-red-500/10 border border-red-500/20 backdrop-blur-md mx-auto">
             <ShieldCheck className="w-5 h-5 text-red-500" />
             <span className="text-red-400 font-bold text-xs tracking-[0.2em] uppercase">Advanced Threat Intelligence</span>
           </div>
           
           <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-[1] text-white mx-auto max-w-3xl">
             Detect Fake Notices in <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-600">Seconds.</span>
           </h1>
           
           <p className="text-xl text-zinc-400 leading-relaxed max-w-2xl mx-auto">
             Don't fall victim to fraudulent government demands. Our AI agent forensically analyzes documents for authenticity markers, urgency manipulation, and financial threats.
           </p>
        </div>
      </section>

      <section className="py-24 bg-surface relative -mt-32 z-30 border-b border-border">
        <div className="max-w-7xl mx-auto px-8">
          <FraudUpload />
        </div>
      </section>

      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-8 grid md:grid-cols-3 gap-16">
          <div className="p-10 bg-surface rounded-2xl border-l-[6px] border-zinc-800 gov-shadow space-y-6">
            <div className="w-14 h-14 bg-zinc-800 text-white flex items-center justify-center rounded-xl shadow-lg">
              <Crosshair className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-zinc-900">Signature & Seal Intel</h3>
            <p className="text-zinc-600 leading-relaxed">Cross-references issuing authorities and formatting standards to spot deep-faked or forged official mandates.</p>
          </div>
          <div className="p-10 bg-surface rounded-2xl border-l-[6px] border-red-600 gov-shadow space-y-6">
            <div className="w-14 h-14 bg-red-600 text-white flex items-center justify-center rounded-xl shadow-lg shadow-red-600/20">
              <AlertTriangle className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-zinc-900">Urgency Analysis</h3>
            <p className="text-zinc-600 leading-relaxed">Identifies manipulative psychological tactics common in scam notices, such as false threats of immediate arrest or asset seizure.</p>
          </div>
          <div className="p-10 bg-surface rounded-2xl border-l-[6px] border-zinc-800 gov-shadow space-y-6">
             <div className="w-14 h-14 bg-zinc-800 text-white flex items-center justify-center rounded-xl shadow-lg">
               <span className="material-symbols-outlined text-3xl">account_balance</span>
            </div>
            <h3 className="text-2xl font-bold text-zinc-900">Financial Red Flags</h3>
            <p className="text-zinc-600 leading-relaxed">Flags suspicious demands for payment, such as directing funds to unofficial accounts, UPI IDs, or utilizing cryptocurrency.</p>
          </div>
        </div>
      </section>
    </>
  );
}
