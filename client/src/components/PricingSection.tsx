import { SizeData } from '../lib/types';
import { sizeOptions } from '../lib/stickerData';

interface PricingSectionProps {
  onSelectSize: (size: string) => void;
}

export default function PricingSection({ onSelectSize }: PricingSectionProps) {
  const handleSelectSize = (sizeId: string) => {
    onSelectSize(sizeId);
  };

  return (
    <section className="py-8">
      <h2 className="font-poppins font-semibold text-2xl md:text-3xl text-center mb-8">
        Precios y Opciones
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {sizeOptions.map((size: SizeData) => (
          <div 
            key={size.id}
            className={`bg-white rounded-lg overflow-hidden shadow-custom transition duration-300 ease-in-out hover:shadow-custom-hover ${
              size.isPopular ? 'transform scale-105 z-10 relative' : ''
            }`}
          >
            {size.isPopular && (
              <div className="absolute top-0 right-0 bg-accent text-neutral-dark text-xs font-medium px-3 py-1 rounded-bl-lg">
                MÁS POPULAR
              </div>
            )}
            <div className="p-6 border-b border-gray-200">
              <h3 className="font-poppins font-semibold text-xl mb-1">Plancha {size.description}</h3>
              <p className="text-gray-600">{size.dimensions}</p>
            </div>
            <div className="p-6">
              <p className="text-2xl font-poppins font-semibold text-primary mb-6">${size.price}</p>
              <ul className="mb-6 space-y-3">
                <li className="flex items-start">
                  <i className="fas fa-check text-green-500 mt-1 mr-2"></i>
                  <span>Máximo {size.maxStickers5cm} stickers de 5 cm</span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-check text-green-500 mt-1 mr-2"></i>
                  <span>Máximo {size.maxStickers7cm} stickers de 7 cm</span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-check text-green-500 mt-1 mr-2"></i>
                  <span>Diseño personalizado</span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-check text-green-500 mt-1 mr-2"></i>
                  <span>Alta calidad de impresión</span>
                </li>
              </ul>
              <button 
                className="select-size-btn w-full bg-primary text-white py-3 rounded-md hover:bg-primary-dark transition duration-300 ease-in-out" 
                data-size={size.id}
                onClick={() => handleSelectSize(size.id)}
              >
                Seleccionar
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {/* Additional Information */}
      <div className="mt-12">
        <h3 className="font-poppins font-semibold text-xl mb-6 text-center">Información adicional</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-custom">
            <h4 className="font-poppins font-medium text-lg mb-3">Material de alta calidad</h4>
            <p className="text-sm">Nuestros stickers están hechos con vinilo de alta calidad, resistentes al agua y a los rayos UV, lo que garantiza una larga duración.</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-custom">
            <h4 className="font-poppins font-medium text-lg mb-3">Tiempos de entrega</h4>
            <p className="text-sm">Una vez confirmado tu diseño, el tiempo de producción es de 3-5 días hábiles más el tiempo de envío según tu ubicación.</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-custom">
            <h4 className="font-poppins font-medium text-lg mb-3">Métodos de pago</h4>
            <p className="text-sm">Aceptamos transferencias bancarias, Mercado Pago y efectivo (en caso de retiro en persona).</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-custom">
            <h4 className="font-poppins font-medium text-lg mb-3">¿Necesitas ayuda?</h4>
            <p className="text-sm">Contáctanos por WhatsApp al <a href="https://wa.me/543755298440" className="text-primary hover:underline">+54 3755 29-8440</a> o por Instagram <a href="https://www.instagram.com/pedriixd.alvez" className="text-primary hover:underline">@pedriixd.alvez</a>.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
