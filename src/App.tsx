import React, { useState, useEffect, useCallback } from 'react';
import { Navbar } from './components/Navbar';
import { MobileBottomNav } from './components/MobileBottomNav';
import { Hero } from './components/Hero';
import { ServicesSection } from './components/ServicesSection';
import { FreeDemoSection } from './components/FreeDemoSection';
import { ProjectsSection } from './components/ProjectsSection';
import { ApkSection } from './components/ApkSection';
import { TechSection } from './components/TechSection';
import { WhyChooseUs } from './components/WhyChooseUs';
import { ProcessTimeline } from './components/ProcessTimeline';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { LiveChatWidget } from './components/LiveChatWidget';
import { SplashScreen } from './components/SplashScreen';
import { Toast } from './components/Toast';
import { QuoteModal } from './components/QuoteModal';
import { ApkConverterModal } from './components/ApkConverterModal';
import { PWAInstallBanner } from './components/PWAInstallBanner';
import { ProModeModal } from './components/ProModeModal';
import { MessageCircle, ArrowUp, Crown } from 'lucide-react';
import { SITE_DATA } from './data/siteData';

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isProMode, setIsProMode] = useState<boolean>(() => {
    return localStorage.getItem('creator_studio_pro_mode') === 'true';
  });
  const [scrollProgress, setScrollProgress] = useState(0);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [isApkModalOpen, setIsApkModalOpen] = useState(false);
  const [isProModalOpen, setIsProModalOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  const handleToggleProMode = (active: boolean) => {
    setIsProMode(active);
    localStorage.setItem('creator_studio_pro_mode', active ? 'true' : 'false');
  };

  // Scroll listener for progress bar and back-to-top button
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const currentProgress = (window.scrollY / totalScroll) * 100;
        setScrollProgress(currentProgress);
      }
      setShowBackToTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleShowToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(prev => prev === msg ? null : prev);
    }, 3500);
  };

  const handleToggleTheme = () => {
    setIsDarkMode(prev => !prev);
    handleShowToast(!isDarkMode ? "Cyber Dark Mode Enabled" : "High-Tech Light Mode Enabled");
  };

  const handleSplashComplete = useCallback(() => {
    setShowSplash(false);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-[#060a17] text-slate-100' 
        : 'bg-[#f4f7fb] text-slate-900'
    }`}>
      
      {/* Top Scroll Progress Indicator */}
      <div className="fixed top-0 left-0 right-0 h-1 z-50 bg-slate-800/40">
        <div
          className="h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 shadow-[0_0_10px_#00f0ff] transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Splash Screen */}
      {showSplash && (
        <SplashScreen onComplete={handleSplashComplete} />
      )}

      {/* Main Sticky Navbar */}
      <Navbar
        isDarkMode={isDarkMode}
        onToggleTheme={handleToggleTheme}
        onRequestQuote={() => setIsQuoteModalOpen(true)}
        onOpenWelcomeAnimation={() => setShowSplash(true)}
        onOpenApkConverter={() => setIsApkModalOpen(true)}
        isProMode={isProMode}
        onOpenProMode={() => setIsProModalOpen(true)}
      />

      {/* Main Page Sections */}
      <main className="relative">
        <Hero 
          onOpenQuoteModal={() => setIsQuoteModalOpen(true)}
          onOpenApkConverter={() => setIsApkModalOpen(true)}
          isProMode={isProMode}
          onOpenProMode={() => setIsProModalOpen(true)}
        />
        <ServicesSection />
        <FreeDemoSection />
        <ProjectsSection />
        <ApkSection onOpenApkConverter={() => setIsApkModalOpen(true)} />
        <TechSection />
        <WhyChooseUs />
        <ProcessTimeline />
        <AboutSection />
        <ContactSection onShowToast={handleShowToast} />
      </main>

      {/* Footer */}
      <Footer onShowToast={handleShowToast} onOpenWelcomeAnimation={() => setShowSplash(true)} />

      {/* Sticky Bottom Navigation for Mobile */}
      <MobileBottomNav 
        isProMode={isProMode}
        onOpenProMode={() => setIsProModalOpen(true)}
      />

      {/* Live Chat Widget (Tawk.to / Crisp style with Lead Generation & WhatsApp Handoff) */}
      <LiveChatWidget />

      {/* Dedicated Floating WhatsApp Action Button on Left (for instant mobile access without clashing) */}
      <a
        id="floating-whatsapp-action"
        href={SITE_DATA.contact.getWhatsAppUrl("Hi Dhannjay, I would like to build a website/APK.")}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Direct WhatsApp Chat"
        className="fixed bottom-20 lg:bottom-6 left-4 sm:left-6 z-40 p-3.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black shadow-[0_0_25px_rgba(34,197,94,0.5)] border-2 border-emerald-300 hover:scale-110 active:scale-95 transition-all flex items-center justify-center group"
      >
        <MessageCircle className="w-6 h-6 text-black" />
        <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 text-xs font-black text-black ml-0 group-hover:ml-2">
          Chat on WhatsApp
        </span>
      </a>

      {/* Back to Top Floating Button (Middle right when scrolled) */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          aria-label="Back to Top"
          className="fixed bottom-36 lg:bottom-24 right-5 z-40 p-2.5 rounded-xl cyber-glass border border-cyan-400/40 text-cyan-300 hover:text-white hover:bg-cyan-500/20 transition-all shadow-lg cursor-pointer"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      )}

      {/* Fast Track Quote / Consultation Modal */}
      <QuoteModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
        onSuccess={handleShowToast}
      />

      {/* Web-to-APK Converter Studio Modal */}
      <ApkConverterModal
        isOpen={isApkModalOpen}
        onClose={() => setIsApkModalOpen(false)}
        onShowToast={handleShowToast}
      />

      {/* Creator Studio 2.0 Pro Mode & PhonePe UPI Modal */}
      <ProModeModal
        isOpen={isProModalOpen}
        onClose={() => setIsProModalOpen(false)}
        isProMode={isProMode}
        onToggleProMode={handleToggleProMode}
        onShowToast={handleShowToast}
      />

      {/* Persistent PWA & Android Install Floating Banner */}
      <PWAInstallBanner
        onOpenApkConverter={() => setIsApkModalOpen(true)}
        onShowToast={handleShowToast}
      />

      {/* Global Toast Notification */}
      <Toast
        message={toastMessage}
        onClose={() => setToastMessage(null)}
      />

    </div>
  );
}
