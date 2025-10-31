import { useState } from 'react';
import { useCardContext } from '../context/CardContext';
import Spinner from './Spinner';
import{ lengthCheck } from '../utils/formatted';



const FormComponet = ({ onAddCard }) => {
  const { cardData, handleInputChange, handleInputFocus, handleReset, validationErrors } = useCardContext();
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  // Maneja el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    
    if (cardData.number === '') newErrors.number = "El número de tarjeta es obligatorio";
    if (lengthCheck(cardData) && cardData.number != '') newErrors.number = "El número de tarjeta debe tener 16 dígitos";
    if (cardData.name === '') newErrors.name = "El nombre del titular es obligatorio";
    if (cardData.expiry === '') newErrors.expiry = "La fecha de vencimiento es obligatoria";
    if (cardData.cvc === '') newErrors.cvc = "El CVV es obligatorio";
    
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length > 0) return;

    try {
      setIsSubmitting(true);
      
      // Crear copia sin el campo focus
      const { focus, ...cardDataToSend } = cardData;
      
      await onAddCard(cardDataToSend);
      
      handleReset();
      setErrors({});
    } catch (error) {
      console.error('Error al agregar tarjeta:', error);
      // El error ya se maneja en el hook useCards
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className='space-y-6'>
      {/* Número de tarjeta */}
      <div>
        <label htmlFor="number" className='block text-sm font-semibold text-slate-700 mb-2'>Número de Tarjeta</label>
        <input
          type="text"
          name="number"
          placeholder="1234 5678 9012 3456"
          value={cardData.number}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          maxLength="19"
          className='w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors'
        />
        {errors.number && <p className='text-red-500 text-sm mt-2'>{errors.number}</p>}
      </div>

      {/* Nombre del titular */}
      <div>
        <label htmlFor="name" className='block text-sm font-semibold text-slate-700 mb-2'>Nombre del Titular</label>
        <input
          type="text"
          name="name"
          placeholder="Juan Pérez"
          value={cardData.name}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          className='w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors'
        />
        {errors.name && <p className='text-red-500 text-sm mt-2'>{errors.name}</p>}
      </div>

      {/* Fecha y CVV en una fila */}
      <div className='grid grid-cols-2 gap-4'>
        <div>
          <label htmlFor="expiry" className='block text-sm font-semibold text-slate-700 mb-2 leading-tight'>
            <span className='sm:hidden'>Vencimiento</span>
            <span className='hidden sm:inline'>Fecha de Vencimiento</span>
          </label>
          <input
            type="text"
            name="expiry"
            placeholder="MM/YY"
            value={cardData.expiry}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            maxLength="5"
            className='w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors'
          />
          {errors.expiry && <p className='text-red-500 text-sm mt-2'>{errors.expiry}</p>}
          {validationErrors.expiry && <p className='text-red-500 text-sm mt-2'>{validationErrors.expiry}</p>}
        </div>
        
        <div>
          <label htmlFor="cvc" className='block text-sm font-semibold text-slate-700 mb-2 leading-tight'>CVV</label>
          <input
            type="number"
            name="cvc"
            placeholder="123"
            value={cardData.cvc}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            maxLength="4"
            className='w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors cvv-input'
          />
          {errors.cvc && <p className='text-red-500 text-sm mt-2'>{errors.cvc}</p>}
        </div>
      </div>

      {/* Botones */}
      <div className='flex gap-3 pt-4'>
        <button 
          type="submit" 
          onClick={handleSubmit}
          disabled={isSubmitting}
          className='flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center justify-center gap-2'
        >
          {isSubmitting ? (
            <>
              <Spinner />
              Agregando...
            </>
          ) : (
            'Agregar Tarjeta'
          )}
        </button>
        <button 
          type="button" 
          onClick={handleReset} 
          className='px-6 py-3 border border-slate-300 text-slate-700 font-semibold rounded-lg hover:bg-slate-50 transition-colors focus:ring-2 focus:ring-slate-500 focus:ring-offset-2'
        >
          Limpiar
        </button>
      </div>
    </form>
  );
}

export default FormComponet;