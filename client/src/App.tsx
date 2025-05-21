import { useState, useCallback } from 'react';
import { QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { queryClient } from "./lib/queryClient";
import Header from './components/Header';
import Footer from './components/Footer';
import WelcomeSection from './components/WelcomeSection';
import CustomizeSection from './components/CustomizeSection';
import GallerySection from './components/GallerySection';
import PricingSection from './components/PricingSection';

function App() {
  const [activeSection, setActiveSection] = useState('welcome');

  // Change active section
  const handleSectionChange = useCallback((section: string) => {
    setActiveSection(section);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Handle adding sticker from gallery to canvas
  const handleAddStickerToCanvas = useCallback((src: string, size: string) => {
    // Store the selected sticker and redirect to customize section
    localStorage.setItem('pendingSticker', JSON.stringify({
      src,
      size
    }));
    handleSectionChange('customize');
  }, [handleSectionChange]);

  // Handle size selection from pricing section
  const handleSelectSize = useCallback((sizeId: string) => {
    // Store the selected size and redirect to customize section
    localStorage.setItem('selectedSize', sizeId);
    handleSectionChange('customize');
  }, [handleSectionChange]);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen flex flex-col bg-neutral-light text-neutral-dark font-inter">
          <Header 
            activeSection={activeSection} 
            onSectionChange={handleSectionChange}
          />
          
          <main className="container mx-auto px-4 pt-20 pb-8 flex-1">
            {activeSection === 'welcome' && (
              <WelcomeSection onSectionChange={handleSectionChange} />
            )}
            
            {activeSection === 'customize' && (
              <CustomizeSection />
            )}
            
            {activeSection === 'gallery' && (
              <GallerySection onAddStickerToCanvas={handleAddStickerToCanvas} />
            )}
            
            {activeSection === 'pricing' && (
              <PricingSection onSelectSize={handleSelectSize} />
            )}
          </main>
          
          <Footer onSectionChange={handleSectionChange} />
        </div>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
