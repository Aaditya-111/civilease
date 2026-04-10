import Link from "next/link";

export default function Home() {
  return (
    <>
      <section className="relative min-h-[921px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img alt="Community interaction" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDLHmMO39fZJMNmW36qalIjGP2XanR2iuDZPMD-4Waqn47wiUrxtsFsHoLBHuJubGSg7eKaV117nCGiYI9f1PKRaiLCkEJtIpeKFsy2KV1cUGNmHElxeiF5LGBXIBboCuTXwXxMdMTegDqbfIXqDaUcwxSkG1iT6DbDv7mWScNQC0mEqH9loB4iA_41q_G6jIssZXhnvtRWJ64XbTwfTS5b48_naJJgCjotv8TFDD7bto2SiiQpCoYHk41hOvInAH2Fr3Xmzj1zHoA"/>
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent"></div>
        </div>
        <div className="relative z-20 max-w-7xl mx-auto px-8 grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              <span className="text-primary font-label text-[10px] font-black tracking-[0.2em] uppercase">THE DIGITAL DIPLOMAT</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold font-headline tracking-tight leading-[1.1] text-on-background">
              Understand Any Government Document — Instantly
            </h1>
            <p className="text-lg md:text-xl text-on-surface-variant leading-relaxed font-body">
              Upload any legal notice, government form, or administrative document and get plain-language guidance, step-by-step actions, and visual workflows in your language.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/document" className="px-10 py-5 bg-primary text-white rounded-full font-headline font-extrabold text-lg shadow-xl hover:translate-y-[-2px] transition-all flex items-center justify-center gap-3">
                <span className="material-symbols-outlined">upload_file</span>
                Upload Document
              </Link>
              <button className="px-10 py-5 bg-white/80 backdrop-blur-sm text-primary rounded-full font-headline font-bold text-lg border border-primary/20 hover:bg-white transition-all flex items-center justify-center gap-3">
                <span className="material-symbols-outlined text-primary">play_circle</span>
                See How It Works
              </button>
            </div>
          </div>
          <div className="hidden lg:block relative group">
            <div className="absolute -inset-10 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors"></div>
            <div className="relative rotate-6 translate-x-12 translate-y-8 w-64 h-80 bg-white shadow-2xl rounded-lg p-6 border border-outline/20 scale-110">
              <div className="w-12 h-12 bg-primary-container rounded-lg flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-primary">description</span>
              </div>
              <div className="space-y-3">
                <div className="h-3 w-3/4 bg-surface-variant rounded"></div>
                <div className="h-3 w-full bg-surface-variant rounded opacity-60"></div>
                <div className="h-3 w-5/6 bg-surface-variant rounded opacity-40"></div>
              </div>
              <div className="mt-12 pt-12 border-t border-surface-variant">
                <div className="flex justify-between items-center">
                  <div className="h-8 w-8 rounded-full bg-tertiary/20"></div>
                  <div className="h-2 w-20 bg-primary/20 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-24 bg-surface overflow-hidden">
        <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row items-center gap-16">
          <div className="md:w-1/3">
            <span className="text-8xl md:text-9xl font-extrabold font-headline text-primary/10 block mb-2">500M+</span>
          </div>
          <div className="md:w-2/3">
            <p className="text-2xl md:text-4xl font-headline font-semibold tracking-tight text-on-background leading-snug">
              Indians interact with government documents they don&apos;t understand — <span className="text-primary italic">CivicEase changes that</span>
            </p>
          </div>
        </div>
      </section>
      <section className="py-32 space-y-48">
        <div className="max-w-7xl mx-auto px-8 relative grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 relative">
            <img alt="Person reading calmly" className="w-full aspect-[4/3] object-cover rounded-3xl editorial-shadow" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCGvKebyR03gRbcb1hbuy8U7JJCuWav04cirii8fV9QiKbu5fj6b1Gc-8LNBIlK2-IGlUM3sqDIlZYxHEhbJES55SjL25QqsGU0-XHid-h7e5jRSl-UAxXkvUuHaGLdr3gGcjn4eXCpMBzuhl5nzAStCYR32rowPC5V9phRsDA_xzdMIaG2vbgSX0H0Kq988u-_1EZGFdRw5QpGL_4D1OuH7HLqUNzPQEOuWoE0X7atbOAT1Hmo6JT098SI-b4sDvv03kE6kneQ8Uo"/>
            <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-tertiary rounded-2xl hidden lg:flex items-center justify-center p-8 text-white rotate-3">
              <span className="material-symbols-outlined text-6xl">summarize</span>
            </div>
          </div>
          <div className="lg:col-span-5 space-y-6 lg:pl-12">
            <h2 className="text-4xl md:text-5xl font-extrabold font-headline tracking-tight text-on-background">Plain Language Summaries</h2>
            <p className="text-xl text-on-surface-variant leading-relaxed">Complex legal jargon stripped away. We provide concise summaries that focus only on what you need to know, saving you hours of frustration.</p>
            <Link className="text-primary text-xl font-bold inline-flex items-center gap-3 group border-b-2 border-primary/20 pb-1 hover:border-primary transition-all" href="#">
              Learn more <span className="material-symbols-outlined group-hover:translate-x-2 transition-transform">arrow_forward</span>
            </Link>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-8 relative grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 space-y-6 lg:pr-12 order-2 lg:order-1">
            <h2 className="text-4xl md:text-5xl font-extrabold font-headline tracking-tight text-on-background">Visual Workflows</h2>
            <p className="text-xl text-on-surface-variant leading-relaxed">See exactly where you are in the administrative process with step-by-step interactive flowcharts and deadlines. Never miss a requirement again.</p>
            <Link className="text-primary text-xl font-bold inline-flex items-center gap-3 group border-b-2 border-primary/20 pb-1 hover:border-primary transition-all" href="#">
              Learn more <span className="material-symbols-outlined group-hover:translate-x-2 transition-transform">arrow_forward</span>
            </Link>
          </div>
          <div className="lg:col-span-7 relative order-1 lg:order-2">
            <img alt="Planning workflow" className="w-full aspect-[4/3] object-cover rounded-3xl editorial-shadow" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAk-4gtfG-0vVm1tN-V3PT2DjPWsonnHVNpD2qHLisdS6WJyLgn4XbQ6-n6_iIBFUgDeJE28RDEFToonxu-8cmdSH9pSPvBWSMqIfk2QmLzccC1vQ-cRRWLH_wOK2wRLTbiP4sALsO3TYO9VvVuEzeCJiUdp5NfViLJ1YeYPVkIbJBeonKVvpbxFMobXVFE-wBE5RWWUIgx8lVrmjGEvmyjoZXDd8A1x5D0zy9Glt5Dqa2HmkxAgMeFlllGrOofqKeXIled3mXBWdY"/>
            <div className="absolute -top-10 -left-10 w-48 h-48 bg-primary rounded-full hidden lg:flex items-center justify-center p-8 text-white -rotate-6">
              <span className="material-symbols-outlined text-6xl">account_tree</span>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-8 relative grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 relative">
            <img alt="Listening to audio guide" className="w-full aspect-[4/3] object-cover rounded-3xl editorial-shadow" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCCbR7lIX1CMPfTG9el1MawbXw_DkkZ0tHhyESyU5ATnj919ifhBMEFpPmq7696wjr8lnelzAGhmuRyGvflR__9A_pbrXjCqbEJutAWphssxsdgi499H4-CYmqCQtIeRAZevSig2OSLRIAjlyxmopa12tIZHXpWouDsn-VkOLnvUIBgcK7R301_CZUyzh4JiWcrYzO0aauPuMsqdjwM_00QkqUM1LrdhOKN8OGN9EUFojw4AdrFJp2Tp0-3thbvFBXaqyKSNCbAgRk"/>
            <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-secondary rounded-[30%_70%_70%_30%_/_30%_30%_70%_70%] hidden lg:flex items-center justify-center p-8 text-white">
              <span className="material-symbols-outlined text-6xl">record_voice_over</span>
            </div>
          </div>
          <div className="lg:col-span-5 space-y-6 lg:pl-12">
            <h2 className="text-4xl md:text-5xl font-extrabold font-headline tracking-tight text-on-background">Voice Guidance</h2>
            <p className="text-xl text-on-surface-variant leading-relaxed">Accessibility at its core. Listen to your document breakdown in your local dialect with AI-powered narration that speaks your language.</p>
            <Link className="text-primary text-xl font-bold inline-flex items-center gap-3 group border-b-2 border-primary/20 pb-1 hover:border-primary transition-all" href="#">
              Learn more <span className="material-symbols-outlined group-hover:translate-x-2 transition-transform">arrow_forward</span>
            </Link>
          </div>
        </div>
      </section>
      <section className="bg-surface-variant/30 py-32">
        <div className="max-w-7xl mx-auto px-8">
          <div className="max-w-3xl mb-24">
            <h2 className="text-5xl md:text-7xl font-extrabold font-headline tracking-tight mb-8">From Chaos to Clarity in Three Steps</h2>
          </div>
          <div className="space-y-32">
            <div className="flex flex-col lg:flex-row gap-16 items-center">
              <div className="w-full lg:w-1/2 order-2 lg:order-1">
                <div className="text-7xl font-black text-primary/20 font-headline mb-4">01</div>
                <h3 className="text-4xl font-bold font-headline mb-6">Upload Your Document</h3>
                <p className="text-xl text-on-surface-variant leading-relaxed max-w-lg">Scan or upload a PDF/Image. We support 22+ Indian languages and multiple document types, from local municipality notices to supreme court orders.</p>
              </div>
              <div className="w-full lg:w-1/2 order-1 lg:order-2">
                <img alt="Uploading document" className="w-full aspect-video object-cover rounded-2xl shadow-xl" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD_N-2h6F-IE1-ug15Z0aqNbmQGgakleFHL3xApNibT-nzog40kRWZlfm5zbLyZNsfu415Vyi635kxZuNnMXzAvdzAAwmGL-hGB1-xZsxfKKYYdo4chG9I1s6ZqNevIvyZ0Er_ZdRkedxOArRyrWlBFBz0KCaiiYZcapf_Z95AAPOPxfzK5UW3ksK59peqFkehfRh-EFZUcYvbN5xbOttzwk8UTfvIWPvbS8QXRM0xWeqM0ALEOYZ71ypc2VJLrSIFqjmNNrwKnCuc"/>
              </div>
            </div>
            <div className="flex flex-col lg:flex-row-reverse gap-16 items-center">
              <div className="w-full lg:w-1/2 order-2">
                <div className="text-7xl font-black text-primary/20 font-headline mb-4">02</div>
                <h3 className="text-4xl font-bold font-headline mb-6">AI Semantic Analysis</h3>
                <p className="text-xl text-on-surface-variant leading-relaxed max-w-lg">Our legal-trained AI breaks down clauses, dates, and mandates into structured data, identifying critical actions and deadlines hidden in fine print.</p>
              </div>
              <div className="w-full lg:w-1/2 order-1">
                <img alt="AI processing" className="w-full aspect-video object-cover rounded-2xl shadow-xl" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAaP-w3UvJMK3YvU9YFidVMLpXEdRXnsC7Rus6yCt06i3Ja0T9_gvCH5FIHJ4nvAlNUQ5acDqa3TiPUGPtZyplTSMk2pL1S6Ng8m58NSBhp4b2gtoj2AhtOzGASJwMAFfLbBl04DprJdpv3BduaY9N1V3AePTuNwi_sshZCmNkhJksHkZnMjuqLB-NywUuaWhQnWScA0gMpXcNygBIaYgSSh2h1wxxO1YUBIqere7xeEZC3BVjWqsc1Ip6r-QiJjQ8dEfqlcId0Jfw"/>
              </div>
            </div>
            <div className="flex flex-col lg:flex-row gap-16 items-center">
              <div className="w-full lg:w-1/2 order-2 lg:order-1">
                <div className="text-7xl font-black text-primary/20 font-headline mb-4">03</div>
                <h3 className="text-4xl font-bold font-headline mb-6">Get Action Plan</h3>
                <p className="text-xl text-on-surface-variant leading-relaxed max-w-lg">Receive a personalized dashboard with summaries, next steps, and direct links to portals. Transition from confusion to decisive action in minutes.</p>
              </div>
              <div className="w-full lg:w-1/2 order-1 lg:order-2">
                <img alt="Relieved user" className="w-full aspect-video object-cover rounded-2xl shadow-xl" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDgyi1lLTVuTw672gq-XYsLfrfaqraADlhd4eL9tFTZ_W46q-9ENS9gZ_3eKFyLnuFwK31CF2CH21G6IZ6BMyMgXDgZ2qVghOGHfxVz0dpCbR-p-fOMueUjcUyBSZ_JiIFrE3myof49wP7_UtPw1XslO18ZEMCBFpaXUiX06JMZYNgVEQ29AmyIt_Lrqy0ShmdA27I-AO3cOypvAL2Mp7nRYnPs3Zil1pUACU63Z_fWUW2MP4dhxuKqjXeG9qfpoCeptlzOxrCC5zo"/>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-48 px-8 bg-background">
        <div className="max-w-6xl mx-auto rounded-[3rem] bg-primary text-white p-12 md:p-24 relative overflow-hidden flex flex-col items-center text-center">
          <div className="absolute inset-0 opacity-20">
            <img alt="Abstract texture" className="w-full h-full object-cover mix-blend-overlay" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCEtykWSU1_izUnSE7alCobJC6nzpg-Npmw3p3PMguWNxFVOLT9B6nKDpmPEm_paGI4oL4lAIUCiAeBg3Q4TqJr2D2Hf-mqAPhkaNeUS7ZgXxeg17tTYLHfvfVF9VUVXJ2tcryQWo7-NuIRMBX50A9vyNyloSUaC6UGp0eJP5P_fiWUyAZiP3bWrycDWVircIxU6NxX-kABVaNyS0smMmv58ZlR003nRj2SVv-W8cyNnFUG6EEs7d-6ggSN8aGmGahL44gQ9IENyEk"/>
          </div>
          <div className="relative z-10 max-w-3xl">
            <h2 className="text-4xl md:text-7xl font-extrabold font-headline tracking-tighter mb-8">Ready to reclaim your time?</h2>
            <p className="text-xl md:text-2xl text-white/80 mb-12">Join 10,000+ citizens who navigate bureaucracy with confidence.</p>
            <button className="px-12 py-6 bg-white text-primary rounded-full font-headline font-extrabold text-2xl hover:scale-105 transition-transform shadow-2xl">
              Start Your First Analysis
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
