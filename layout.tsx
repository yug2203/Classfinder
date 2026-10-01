import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/navigation/Footer';

export const metadata: Metadata = {
  title: 'ClassFinder – Smart Classroom Finder & Reservation System',
  description:
    'Find an available classroom instantly and know when an occupied classroom will be available. Real-time BScIT timetable integration and clash-free booking.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-[#07090e] text-slate-100 antialiased selection:bg-cyan-500 selection:text-black">
        {/* Ambient background glows */}
        <div className="fixed inset-0 cyber-grid pointer-events-none z-0 opacity-40" />
        <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[450px] cyber-glow pointer-events-none z-0" />
        
        <div className="relative z-10 flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
