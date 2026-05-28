import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import InteractiveEstimator from './components/InteractiveEstimator';
import ProjectPortfolio from './components/ProjectPortfolio';
import Testimonials from './components/Testimonials';
import FaqAccordion from './components/FaqAccordion';
import BookingForm from './components/BookingForm';
import Footer from './components/Footer';
import ServiceModal from './components/ServiceModal';
import FinanceModal from './components/FinanceModal';
import ServicePage from './components/ServicePage';
import AdminPortal from './components/AdminPortal';

export default function App() {
  const [currentView, setCurrentView] = useState<{ type: 'home' } | { type: 'service'; id: string } | { type: 'admin' }>({ type: 'home' });
  const [selectedServiceId, setSelectedServiceId] = useState<string>('boilers');
  const [serviceModalOpen, setServiceModalOpen] = useState<boolean>(false);
  const [activeServiceId, setActiveServiceId] = useState<string>('');
  const [financeModalOpen, setFinanceModalOpen] = useState<boolean>(false);

  const scrollToSection = (id: string) => {
    if (currentView.type !== 'home') {
      setCurrentView({ type: 'home' });
      setTimeout(() => {
        const element = document.querySelector(id);
        if (element) {
          const offset = 100;
          const bodyRect = document.body.getBoundingClientRect().top;
          const elementRect = element.getBoundingClientRect().top;
          const elementPosition = elementRect - bodyRect;
          const offsetPosition = elementPosition - offset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }, 100);
    } else {
      const element = document.querySelector(id);
      if (element) {
        const offset = 100;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = element.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
  };

  const handleSelectServiceFromCard = (serviceId: string) => {
    setSelectedServiceId(serviceId);
  };

  const handleOpenServiceModal = (id: string) => {
    setCurrentView({ type: 'service', id });
  };

  const handleOpenFinanceModal = () => {
    setFinanceModalOpen(true);
  };

  const handlePreBookService = (serviceTitle: string) => {
    // Select a suitable general category for the form input
    if (serviceTitle.toLowerCase().includes('boiler') || serviceTitle.toLowerCase().includes('heating')) {
      setSelectedServiceId('boilers');
    } else if (serviceTitle.toLowerCase().includes('bathroom') || serviceTitle.toLowerCase().includes('washroom') || serviceTitle.toLowerCase().includes('wet')) {
      setSelectedServiceId('bathrooms');
    } else if (serviceTitle.toLowerCase().includes('emergency')) {
      setSelectedServiceId('emergencies');
    } else {
      setSelectedServiceId('plumbing');
    }

    scrollToSection('#contact');

    // Smoothly pre-populate the description textarea in the booking form
    setTimeout(() => {
      const textArea = document.querySelector('textarea') as HTMLTextAreaElement;
      if (textArea) {
        textArea.value = `Hello northHeat, I would like to book a site survey or get detailed pricing for: ${serviceTitle}. Please call me back.`;
        // Trigger a fake input event so React state tracking triggers
        const event = new Event('input', { bubbles: true });
        textArea.dispatchEvent(event);
      }
    }, 450);
  };

  const handleApplyFinancePlan = (financeDescription: string) => {
    // Finance defaults to boilers category in form
    setSelectedServiceId('boilers');
    scrollToSection('#contact');

    // Pre-populate description textarea inside booking form
    setTimeout(() => {
      const textArea = document.querySelector('textarea') as HTMLTextAreaElement;
      if (textArea) {
        textArea.value = `Hello northHeat, I am interested in pre-applying for your: ${financeDescription}. Please contact me to organize pre-qualification.`;
        const event = new Event('input', { bubbles: true });
        textArea.dispatchEvent(event);
      }
    }, 450);
  };

  if (currentView.type === 'admin') {
    return <AdminPortal onClose={() => setCurrentView({ type: 'home' })} />;
  }

  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans antialiased overflow-x-hidden">
      {/* Header element */}
      <Header 
        onQuoteClick={() => scrollToSection('#estimator')} 
        onContactClick={() => scrollToSection('#contact')} 
        onOpenService={handleOpenServiceModal}
        onOpenFinance={handleOpenFinanceModal}
      />

      {/* Main content body */}
      <main>
        {currentView.type === 'home' ? (
          <>
            {/* Hero Section */}
            <Hero 
              onQuoteClick={() => scrollToSection('#estimator')} 
              onContactClick={() => scrollToSection('#contact')} 
              onOpenService={handleOpenServiceModal}
              onOpenFinance={handleOpenFinanceModal}
            />

            {/* Services Section */}
            <Services onSelectService={handleSelectServiceFromCard} />

            {/* Interactive Estimator / Multi-step pricing tools */}
            <InteractiveEstimator />

            {/* Project Work Showcase Portfolio */}
            <ProjectPortfolio />

            {/* Reviews and Testimonials Star ratings */}
            <Testimonials />

            {/* Frequently Asked Questions */}
            <FaqAccordion />

            {/* Booking & Enquiry Dispatch Forms */}
            <BookingForm selectedServiceId={selectedServiceId} />
          </>
        ) : (
          <ServicePage 
            serviceId={currentView.id} 
            onBackToHome={() => setCurrentView({ type: 'home' })}
            onOpenFinance={handleOpenFinanceModal}
            onNavigateService={(nextId) => setCurrentView({ type: 'service', id: nextId })}
          />
        )}
      </main>

      {/* Footer layout */}
      <Footer 
        onScrollToSection={scrollToSection} 
        onAdminClick={() => {
          setCurrentView({ type: 'admin' });
          window.scrollTo({ top: 0 });
        }}
      />

      {/* Interactive Global Service Detail Popover overlay */}
      <ServiceModal 
        isOpen={serviceModalOpen}
        onClose={() => setServiceModalOpen(false)}
        serviceId={activeServiceId}
        onBookNow={handlePreBookService}
      />

      {/* Interactive Finance Calculator Overlay */}
      <FinanceModal 
        isOpen={financeModalOpen}
        onClose={() => setFinanceModalOpen(false)}
        onApply={handleApplyFinancePlan}
      />
    </div>
  );
}
