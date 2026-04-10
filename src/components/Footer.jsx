import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full pt-24 pb-12 bg-surface">
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          <div className="col-span-1 md:col-span-2">
            <div className="text-2xl font-black text-primary mb-6 font-headline">CivicEase</div>
            <p className="text-on-surface-variant max-w-xs leading-relaxed">
              Bridging the gap between complex governance and everyday citizens through empathetic technology.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-6 font-headline text-on-background">Explore</h4>
            <ul className="space-y-4 text-sm text-on-surface-variant">
              <li><Link className="hover:text-primary transition-colors" href="#">How it works</Link></li>
              <li><Link className="hover:text-primary transition-colors" href="#">Pricing</Link></li>
              <li><Link className="hover:text-primary transition-colors" href="#">Community</Link></li>
              <li><Link className="hover:text-primary transition-colors" href="#">Blog</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6 font-headline text-on-background">Connect</h4>
            <ul className="space-y-4 text-sm text-on-surface-variant">
              <li><Link className="hover:text-primary transition-colors" href="#">Twitter</Link></li>
              <li><Link className="hover:text-primary transition-colors" href="#">LinkedIn</Link></li>
              <li><Link className="hover:text-primary transition-colors" href="#">Instagram</Link></li>
              <li><Link className="hover:text-primary transition-colors" href="#">YouTube</Link></li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center border-t border-outline/20 pt-10 gap-6">
          <div className="text-on-surface-variant font-inter text-sm">© 2024 CivicEase. The Digital Diplomat.</div>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 items-center">
            <Link className="text-on-surface-variant hover:text-primary transition-colors font-inter text-sm" href="#">Privacy Policy</Link>
            <Link className="text-on-surface-variant hover:text-primary transition-colors font-inter text-sm" href="#">Terms of Service</Link>
            <Link className="text-on-surface-variant hover:text-primary transition-colors font-inter text-sm" href="#">Accessibility</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
