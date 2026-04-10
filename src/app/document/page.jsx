import Link from "next/link";

const summaryPoints = [
  "You have received an income tax notice under Section 143(1) for Assessment Year 2023–24.",
  "The department has identified a mismatch of ₹45,200 between your filed return and Form 26AS.",
  "You are required to respond within 30 days from the date of this notice.",
  "No penalty has been imposed yet — this is a preliminary inquiry notice.",
];

const steps = [
  {
    num: 1,
    title: "Don't panic — this is a routine notice",
    detail: "Section 143(1) notices are auto-generated. No officer visited your data.",
    done: false,
  },
  {
    num: 2,
    title: "Login to the Income Tax portal",
    detail: "Go to incometax.gov.in → e-Filing → My Account → e-Proceedings",
    done: false,
  },
  {
    num: 3,
    title: "Review the mismatch details",
    detail: "Check which income source is flagged. Usually salary, bank interest, or dividends.",
    done: false,
  },
  {
    num: 4,
    title: "Submit your response online",
    detail: "If income is correct, choose 'Agree' or 'Disagree with explanation' and file your reply.",
    done: false,
  },
];

const docsRequired = [
  { icon: "📋", label: "Form 26AS — download from your bank or IT portal" },
  { icon: "📄", label: "Original ITR-V acknowledgment copy" },
  { icon: "🏦", label: "Bank statements for the assessment year" },
];

export default function DocumentResult() {
  return (
    <div className="flex flex-col gap-10 px-6 py-10 bg-background font-body text-on-background">

      {/* Breadcrumb */}
      <nav className="mx-auto w-full max-w-7xl flex items-center gap-2 text-sm text-on-surface-variant font-headline">
        <Link href="/" className="hover:text-primary transition-colors">Home</Link>
        <span>/</span>
        <Link href="/" className="hover:text-primary transition-colors">Documents</Link>
        <span>/</span>
        <span className="text-primary font-bold truncate max-w-[200px]">Notice_2024.pdf</span>
      </nav>

      {/* Main grid */}
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-8 lg:grid-cols-5">

        {/* Left column — 60% */}
        <div className="flex flex-col gap-6 lg:col-span-3">

          {/* Document type badge + title */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-tertiary/30 bg-tertiary/10 px-3 py-1 mb-3">
              <div className="h-1.5 w-1.5 rounded-full bg-tertiary animate-pulse" />
              <span className="text-xs font-bold text-tertiary tracking-wide uppercase">Action Required within 30 days</span>
            </div>
            <h1 className="text-3xl font-extrabold text-on-background font-headline sm:text-4xl tracking-tight">Income Tax Notice — Section 143(1)</h1>
            <p className="mt-2 text-sm text-on-surface-variant">Income Tax Department · Assessment Year 2023–24 · Uploaded just now</p>
          </div>

          {/* Summary card */}
          <div className="bg-white rounded-2xl p-7 shadow-lg border border-outline/10">
            <div className="flex items-center gap-3 mb-5">
              <div className="h-10 w-10 rounded-xl bg-primary-container border border-primary/20 flex items-center justify-center text-primary shrink-0">
                <span className="material-symbols-outlined">summarize</span>
              </div>
              <h2 className="text-lg font-bold text-on-background font-headline">Plain Language Summary</h2>
            </div>
            <ul className="space-y-4">
              {summaryPoints.map((point, i) => (
                <li key={i} className="flex gap-4 text-base text-secondary leading-relaxed">
                  <span className="mt-0.5 h-6 w-6 shrink-0 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-xs text-primary font-bold">{i + 1}</span>
                  {point}
                </li>
              ))}
            </ul>
          </div>

          {/* Steps list */}
          <div className="bg-white rounded-2xl p-7 shadow-lg border border-outline/10">
            <div className="flex items-center gap-3 mb-8">
              <div className="h-10 w-10 rounded-xl bg-primary-container border border-primary/20 flex items-center justify-center text-primary shrink-0">
                <span className="material-symbols-outlined">route</span>
              </div>
              <h2 className="text-lg font-bold text-on-background font-headline">Your Action Steps</h2>
            </div>
            <div className="flex flex-col gap-6">
              {steps.map((s) => (
                <div key={s.num} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="h-8 w-8 shrink-0 rounded-full border-2 border-primary/30 bg-primary-container flex items-center justify-center text-sm font-bold text-primary">
                      {s.num}
                    </div>
                    {s.num < steps.length && (
                      <div className="mt-2 h-full min-h-[2rem] w-px bg-outline/30" />
                    )}
                  </div>
                  <div className="flex-1 pb-4">
                    <p className="text-base font-bold text-on-background font-headline mb-1">{s.title}</p>
                    <p className="text-sm text-secondary leading-relaxed">{s.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Documents required */}
          <div className="bg-white rounded-2xl p-7 shadow-lg border border-outline/10">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-10 w-10 rounded-xl bg-primary-container border border-primary/20 flex items-center justify-center text-primary shrink-0">
                <span className="material-symbols-outlined">folder</span>
              </div>
              <h2 className="text-lg font-bold text-on-background font-headline">Documents You Will Need</h2>
            </div>
            <div className="flex flex-col gap-3">
              {docsRequired.map((d, i) => (
                <div key={i} className="flex items-center gap-4 rounded-xl bg-surface border border-outline/10 p-4">
                  <span className="text-xl">{d.icon}</span>
                  <p className="text-sm font-medium text-on-background">{d.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right column — 40% */}
        <div className="flex flex-col gap-6 lg:col-span-2">

          {/* Authority card */}
          <div className="bg-white rounded-2xl p-7 shadow-lg border border-outline/10">
            <h2 className="text-lg font-bold text-on-background font-headline mb-6">Issuing Authority</h2>
            <div className="flex items-start gap-4 mb-6">
              <div className="h-14 w-14 shrink-0 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-2xl">
                🏛️
              </div>
              <div>
                <p className="text-base font-bold text-on-background font-headline">Income Tax Department</p>
                <p className="text-xs text-on-surface-variant mt-1">Ministry of Finance, Govt. of India</p>
                <div className="mt-3 flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                  <span className="text-xs text-primary font-bold uppercase tracking-wider">Official Government Body</span>
                </div>
              </div>
            </div>
            <div className="space-y-3 text-sm font-medium">
              <div className="flex items-center justify-between pb-3 border-b border-surface-variant">
                <span className="text-on-surface-variant">Helpline</span>
                <span className="text-on-background font-bold">1800-103-0025</span>
              </div>
              <div className="flex items-center justify-between pb-3 border-b border-surface-variant">
                <span className="text-on-surface-variant">Portal</span>
                <a href="#" className="text-primary hover:underline transition-all font-bold">incometax.gov.in</a>
              </div>
              <div className="flex items-center justify-between pb-1">
                <span className="text-on-surface-variant">Deadline</span>
                <span className="text-tertiary font-bold">30 days from notice</span>
              </div>
            </div>
            <Link
              href="#"
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-primary py-3.5 text-sm font-bold text-white hover:bg-primary/90 transition-all shadow-md shadow-primary/20"
            >
              Visit Official Portal
              <span className="material-symbols-outlined text-[18px]">open_in_new</span>
            </Link>
          </div>

          {/* Process flowchart */}
          <div className="bg-white rounded-2xl p-7 shadow-lg border border-outline/10">
            <h2 className="text-lg font-bold text-on-background font-headline mb-6">Process Flowchart</h2>
            <div className="flex flex-col items-center gap-0">
              {[
                { label: "Receive Notice", color: "bg-surface-variant border border-outline/20", text: "text-on-surface-variant" },
                { label: "Review on Portal", color: "bg-primary-container/50 border border-primary/20", text: "text-primary font-semibold" },
                { label: "Check Mismatch", color: "bg-primary-container/50 border border-primary/20", text: "text-primary font-semibold" },
                { label: "File Response", color: "bg-primary-container/50 border border-primary/20", text: "text-primary font-semibold" },
                { label: "Closure / Refund", color: "bg-tertiary/10 border border-tertiary/30", text: "text-tertiary font-semibold" },
              ].map((node, i, arr) => (
                <div key={i} className="flex flex-col items-center w-full">
                  <div className={`w-full rounded-xl ${node.color} px-5 py-3.5 flex items-center justify-between`}>
                    <div className="flex items-center gap-3">
                      <div className={`h-6 w-6 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 ${i === 0 ? "bg-outline/20 text-on-surface-variant" : "bg-white text-primary shadow-sm"}`}>
                        {i + 1}
                      </div>
                      <span className={`text-sm ${node.text}`}>{node.label}</span>
                    </div>
                    {i < arr.length - 1 && (
                      <span className="material-symbols-outlined text-outline text-[18px]">expand_more</span>
                    )}
                    {i === arr.length - 1 && (
                      <span className="material-symbols-outlined text-tertiary text-[18px]">check_circle</span>
                    )}
                  </div>
                  {i < arr.length - 1 && (
                    <div className="h-5 w-px bg-outline/30" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Voice button */}
      <div className="mx-auto w-full max-w-7xl">
        <div className="bg-white shadow-lg border border-outline/10 flex flex-col md:flex-row items-center justify-between gap-6 rounded-2xl px-8 py-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 h-full w-1/3 bg-gradient-to-l from-primary/5 to-transparent pointer-events-none" />
          <div>
            <p className="text-base font-bold text-on-background font-headline flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">record_voice_over</span>
              Voice Guidance Available
            </p>
            <p className="text-sm text-secondary mt-1">Hear this summary read aloud in your language</p>
          </div>
          <div className="flex items-center gap-4 z-10">
            <select className="rounded-full border border-outline/30 bg-surface px-4 py-2.5 text-sm font-medium text-on-background focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary cursor-pointer w-32 md:w-auto">
              <option>English</option>
              <option>Hindi</option>
              <option>Tamil</option>
            </select>
            <button className="flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-sm font-bold text-white hover:bg-primary/90 transition-all shadow-md shadow-primary/20 whitespace-nowrap">
              <span className="material-symbols-outlined text-[18px]">play_arrow</span>
              Read Aloud
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}
