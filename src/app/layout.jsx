import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ChatAssistant } from "@/components/shared/ChatAssistant";
import "./globals.css";

export const metadata = {
  title: "CivicEase | The Digital Diplomat",
  description:
    "CivicEase helps citizens navigate complex government documents, procedures, and compliance requirements with ease.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="light" suppressHydrationWarning>
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;600;700;800&family=Inter:wght@400;500;600&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght@400&display=swap" rel="stylesheet" />
      </head>
      <body suppressHydrationWarning className="bg-background text-text-main font-body selection:bg-secondary/20 selection:text-primary min-h-screen flex flex-col">
        <div className="fixed top-0 left-0 w-full h-[3px] z-[200] flex">
          <div className="flex-1 bg-secondary"></div>
          <div className="flex-1 bg-white"></div>
          <div className="flex-1 bg-success"></div>
        </div>
        <Navbar />
        <main className="flex-1 pt-20">{children}</main>
        <Footer />
        <ChatAssistant />
      </body>
    </html>
  );
}
