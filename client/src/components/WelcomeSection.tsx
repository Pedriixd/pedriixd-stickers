import logo from '../assets/logo.svg';

interface WelcomeSectionProps {
  onSectionChange: (section: string) => void;
}

export default function WelcomeSection({ onSectionChange }: WelcomeSectionProps) {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center text-center py-8 opacity-100 transform translate-y-0 transition-all duration-500">
      <div className="max-w-[200px] mx-auto mb-8">
        <img src={logo} alt="PEDRIIXD Logo" className="w-full h-auto" />
      </div>
      
      <h1 className="font-poppins font-semibold text-2xl md:text-3xl max-w-3xl mb-8">
        Personalizá tu equipo de mate o compu con stickers de tu elección.
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-3xl mb-12">
        <button 
          onClick={() => onSectionChange('customize')}
          className="welcome-btn bg-primary text-white flex flex-col items-center justify-center p-4 rounded-lg shadow-custom hover:shadow-custom-hover hover:-translate-y-1 transition duration-300 ease-in-out font-poppins font-semibold"
        >
          <span className="text-4xl mb-2">📌</span>
          <span>Personaliza tu plancha</span>
        </button>
        
        <button 
          onClick={() => onSectionChange('gallery')}
          className="welcome-btn bg-secondary text-neutral-dark flex flex-col items-center justify-center p-4 rounded-lg shadow-custom hover:shadow-custom-hover hover:-translate-y-1 transition duration-300 ease-in-out font-poppins font-semibold"
        >
          <span className="text-4xl mb-2">🖼️</span>
          <span>Galería</span>
        </button>
        
        <button 
          onClick={() => onSectionChange('pricing')}
          className="welcome-btn bg-accent text-neutral-dark flex flex-col items-center justify-center p-4 rounded-lg shadow-custom hover:shadow-custom-hover hover:-translate-y-1 transition duration-300 ease-in-out font-poppins font-semibold"
        >
          <span className="text-4xl mb-2">📦</span>
          <span>Precios</span>
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-4xl">
        {/* A mate with personalized stickers on it */}
        <div className="overflow-hidden rounded-lg shadow-custom hover:shadow-custom-hover hover:scale-105 transition duration-300 ease-in-out">
          <img 
            src="https://images.unsplash.com/photo-1627483297886-49710ae1fc22?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80" 
            alt="Mate con stickers personalizados" 
            className="w-full h-48 object-cover"
          />
        </div>
        
        {/* A laptop with stickers on its cover */}
        <div className="overflow-hidden rounded-lg shadow-custom hover:shadow-custom-hover hover:scale-105 transition duration-300 ease-in-out">
          <img 
            src="https://pixabay.com/get/gb1a0362a24c8d580df453b3bf31f3a63d2bd395e32d6b91a0405261abcb86d5387f7066406937c0f076991ed9b2e61ea296efeb77fce6ba1ac022db131052dd8_1280.jpg" 
            alt="Laptop con stickers" 
            className="w-full h-48 object-cover"
          />
        </div>
        
        {/* A sheet of various personalized stickers */}
        <div className="overflow-hidden rounded-lg shadow-custom hover:shadow-custom-hover hover:scale-105 transition duration-300 ease-in-out">
          <img 
            src="https://images.unsplash.com/photo-1572375992501-4b0892d50c69?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80" 
            alt="Plancha de stickers personalizados" 
            className="w-full h-48 object-cover"
          />
        </div>
      </div>
    </section>
  );
}
