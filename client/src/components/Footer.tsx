interface FooterProps {
  onSectionChange: (section: string) => void;
}

export default function Footer({ onSectionChange }: FooterProps) {
  return (
    <footer className="bg-neutral-dark text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h4 className="font-poppins font-medium text-lg mb-4">PEDRIIXD Stickers</h4>
            <p className="text-sm text-gray-300 mb-4">Personaliza planchas de stickers para tu equipo de mate, computadora y más.</p>
            <div className="flex space-x-4">
              <a href="https://www.instagram.com/pedriixd.alvez" className="text-white hover:text-primary transition duration-300 ease-in-out" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-instagram text-xl"></i>
              </a>
              <a href="https://wa.me/543755298440" className="text-white hover:text-primary transition duration-300 ease-in-out" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-whatsapp text-xl"></i>
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-poppins font-medium text-lg mb-4">Enlaces rápidos</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button 
                  onClick={() => onSectionChange('customize')}
                  className="text-gray-300 hover:text-primary transition duration-300 ease-in-out"
                >
                  Personalizar plancha
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onSectionChange('gallery')}
                  className="text-gray-300 hover:text-primary transition duration-300 ease-in-out"
                >
                  Galería de stickers
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onSectionChange('pricing')}
                  className="text-gray-300 hover:text-primary transition duration-300 ease-in-out"
                >
                  Precios y opciones
                </button>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-poppins font-medium text-lg mb-4">Contacto</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <i className="fab fa-whatsapp text-primary mt-1 mr-2"></i>
                <span>+54 3755 29-8440</span>
              </li>
              <li className="flex items-start">
                <i className="fab fa-instagram text-primary mt-1 mr-2"></i>
                <span>@pedriixd.alvez</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} PEDRIIXD Stickers. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
