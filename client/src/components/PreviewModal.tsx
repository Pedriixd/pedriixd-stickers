import { useRef, useEffect } from 'react';
import html2canvas from 'html2canvas';

interface PreviewModalProps {
  isOpen: boolean;
  canvasRef: React.RefObject<HTMLDivElement>;
  onClose: () => void;
  onConfirm: () => void;
}

export default function PreviewModal({ 
  isOpen, 
  canvasRef, 
  onClose, 
  onConfirm 
}: PreviewModalProps) {
  const previewContentRef = useRef<HTMLDivElement>(null);

  // Generate preview when modal opens
  useEffect(() => {
    if (isOpen && canvasRef.current && previewContentRef.current) {
      // Clear previous content
      previewContentRef.current.innerHTML = '';
      
      // Generate screenshot of canvas and add to preview
      html2canvas(canvasRef.current).then(canvas => {
        canvas.style.width = '100%';
        canvas.style.height = 'auto';
        previewContentRef.current?.appendChild(canvas);
      });
    }
  }, [isOpen, canvasRef]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-auto">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h3 className="font-poppins font-medium text-lg">Vista previa de tu plancha</h3>
          <button 
            id="close-preview" 
            className="text-neutral-dark hover:text-neutral-dark/80"
            onClick={onClose}
          >
            <i className="fas fa-times text-xl"></i>
          </button>
        </div>
        <div className="p-6">
          <div 
            id="preview-content" 
            ref={previewContentRef}
            className="w-full aspect-[3/4] bg-white border border-gray-300 rounded-lg mb-6"
          >
            {/* Preview content will be generated here */}
          </div>
          <div className="text-center">
            <button 
              id="confirm-design" 
              className="bg-primary text-white px-6 py-3 rounded-lg shadow-custom hover:bg-primary-dark transition duration-300 ease-in-out"
              onClick={onConfirm}
            >
              Confirmar diseño
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
