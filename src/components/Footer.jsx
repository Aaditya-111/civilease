import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full pt-20 pb-12 bg-primary-dark text-white relative overflow-hidden">
      <div className="absolute right-[-5%] bottom-[-10%] opacity-5 pointer-events-none">
        <svg className="w-96 h-96" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1" />
          {[...Array(24)].map((_, i) => (
            <line
              key={i}
              x1="12"
              y1="12"
              x2={12 + 10 * Math.cos((i * 15 * Math.PI) / 180)}
              y2={12 + 10 * Math.sin((i * 15 * Math.PI) / 180)}
              stroke="currentColor"
              strokeWidth="0.5"
            />
          ))}
        </svg>
      </div>
      <div className="max-w-7xl mx-auto px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <div className="text-3xl font-black text-white mb-6 font-headline tracking-tight">CivilEase</div>
            <p className="text-white/70 max-w-xs leading-relaxed text-sm">
              An AI-powered initiative to simplify Indian government procedures and legal documents for every citizen.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-6 font-headline text-white uppercase text-xs tracking-widest">Platform</h4>
            <ul className="space-y-4 text-sm text-white/60">
              <li><Link className="hover:text-secondary transition-colors" href="/">Home</Link></li>
              <li><Link className="hover:text-secondary transition-colors" href="/solutions">Solutions</Link></li>
              <li><Link className="hover:text-secondary transition-colors" href="/governance">Governance</Link></li>
              <li><Link className="hover:text-secondary transition-colors" href="/resources">Resources</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6 font-headline text-white uppercase text-xs tracking-widest">Ecosystem</h4>
            <ul className="space-y-4 text-sm text-white/60">
              <li><Link className="hover:text-secondary transition-colors" href="https://mygov.in" target="_blank">MyGov Portal</Link></li>
              <li><Link className="hover:text-secondary transition-colors" href="https://india.gov.in" target="_blank">National Portal</Link></li>
              <li><Link className="hover:text-secondary transition-colors" href="https://digitalindia.gov.in" target="_blank">Digital India</Link></li>
              <li><Link className="hover:text-secondary transition-colors" href="https://ecourts.gov.in" target="_blank">eCourts India</Link></li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center border-t border-white/10 pt-10 gap-6">
          <div className="text-white/40 font-inter text-xs">© 2024 CivilEase. An AI Administrative Assistant.</div>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 items-center">
            <Link className="text-white/40 hover:text-white transition-colors font-inter text-xs" href="#">Privacy Policy</Link>
            <Link className="text-white/40 hover:text-white transition-colors font-inter text-xs" href="#">Terms</Link>
            <Link className="text-white/40 hover:text-white transition-colors font-inter text-xs" href="#">Compliance</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
