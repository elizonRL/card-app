import { useState, useEffect, useCallback } from 'react';
import Cards from 'react-credit-cards-2';
import { masknumber } from '../utils/formatted';
import { useFetch } from '../hooks/useFetch';

// Constantes
const AUTO_FLIP_DELAY = 3000; // 3 segundos

/**
 * Componente CardItem - Renderiza una tarjeta de crédito individual con funcionalidades interactivas
 * 
 * Características:
 * - Click para mostrar/ocultar CVC con auto-flip en móviles
 * - Botón de eliminación responsive (siempre visible en móvil, hover en desktop)
 * - Animaciones suaves y transiciones
 * - Manejo de memoria para evitar memory leaks
 * 
 * @param {Object} props - Propiedades del componente
 * @param {Object} props.card - Objeto con datos de la tarjeta
 * @param {string} props.card._id - ID único de la tarjeta
 * @param {string} props.card.number - Número de la tarjeta
 * @param {string} props.card.name - Nombre del titular
 * @param {string} props.card.expiry - Fecha de vencimiento (MM/YY)
 * @param {string} props.card.cvc - Código de seguridad
 * @param {Function} props.onDelete - Función para eliminar la tarjeta
 * 
 * @returns {JSX.Element} Componente de tarjeta renderizado
 */
const CardItem = ({ card, onDelete }) => {
  // Estados locales
  const [isFlipped, setIsFlipped] = useState(false);
  const [flipTimeout, setFlipTimeout] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);
  
  /**
   * Limpia el timeout activo si existe
   */
  const clearActiveTimeout = useCallback(() => {
    if (flipTimeout) {
      clearTimeout(flipTimeout);
      setFlipTimeout(null);
    }
  }, [flipTimeout]);

  /**
   * Maneja el click en la tarjeta para alternar la vista del CVC
   * 
   * Comportamiento:
   * - Alterna entre frente y reverso de la tarjeta
   * - En dispositivos móviles, programa auto-flip después de 3 segundos
   * - Limpia timeouts anteriores para evitar conflictos
   */
  const handleCardClick = useCallback(() => {
    // Limpiar cualquier timeout anterior
    clearActiveTimeout();
    
    const newFlippedState = !isFlipped;
    setIsFlipped(newFlippedState);
    
    // Auto-flip solo cuando se muestra el CVC (newFlippedState = true)
    if (newFlippedState) {
      const timeout = setTimeout(() => {
        setIsFlipped(false);
        setFlipTimeout(null);
      }, AUTO_FLIP_DELAY);
      setFlipTimeout(timeout);
    }
  }, [isFlipped, clearActiveTimeout]);

  /**
   * Maneja la eliminación de la tarjeta usando useFetch
   * 
   * @param {Event} e - Evento del click
   */
  const handleDeleteClick = useCallback(async (e) => {
    e.stopPropagation();
    
    if (isDeleting) {
      return;
    }
    
    try {
      setIsDeleting(true);
      setIsRemoving(true);
      
      // Esperar animación antes de eliminar
      setTimeout(async () => {
        try {
          await onDelete(card._id || card.id);
        } catch (error) {
          console.error('❌ Error al eliminar tarjeta:', error);
          setIsRemoving(false);
        }
      }, 300);
      
    } catch (error) {
      console.error('❌ Error al eliminar tarjeta:', error);
      setIsDeleting(false);
      setIsRemoving(false);
    }
  }, [card._id, card.id, onDelete, isDeleting]);

  /**
   * Maneja cuando el mouse sale de la tarjeta (comportamiento solo para desktop)
   * 
   * Acciones:
   * - Limpia timeouts activos
   * - Regresa la tarjeta al frente inmediatamente
   */
  const handleMouseLeave = useCallback(() => {
    clearActiveTimeout();
    setIsFlipped(false);
  }, [clearActiveTimeout]);
  
  /**
   * Efecto de limpieza para prevenir memory leaks
   * Limpia timeouts cuando el componente se desmonta
   */
  useEffect(() => {
    return () => {
      if (flipTimeout) {
        clearTimeout(flipTimeout);
      }
    };
  }, [flipTimeout]);

  // Clases CSS organizadas por responsabilidad
  const containerClasses = `relative group transition-all duration-300 ${
    isRemoving ? 'animate-fadeOutScale' : ''
  }`;
  const cardClasses = 'cursor-pointer hover:-translate-y-2 transition-transform duration-300 ease-in-out';
  const deleteButtonClasses = `
    absolute -top-2 -right-2 
    bg-red-500 hover:bg-red-600 disabled:bg-red-300
    text-white p-2 rounded-full shadow-lg 
    opacity-100 lg:opacity-0 lg:group-hover:opacity-100 
    transition-all duration-200 z-10
    ${isDeleting ? 'cursor-not-allowed' : 'cursor-pointer'}
  `.trim();

  return (
    <div className={containerClasses}>
      {/* Contenedor de la tarjeta con interactividad */}
      <div 
        className={cardClasses}
        onClick={handleCardClick} 
        onMouseLeave={handleMouseLeave}
        role="button"
        tabIndex={0}
        aria-label={`Tarjeta terminada en ${card.number?.slice(-4)}. Click para ver CVC`}
      >
        <Cards
          number={masknumber(card.number)}
          name={card.name}
          expiry={card.expiry}
          cvc={card.cvc}
          focused={isFlipped ? 'cvc' : ''}
        />
      </div>
      
      {/* Botón de eliminación con comportamiento responsive */}
      <button 
        onClick={handleDeleteClick}
        disabled={isDeleting}
        className={deleteButtonClasses}
        aria-label={`Eliminar tarjeta terminada en ${card.number?.slice(-4)}`}
        title="Eliminar tarjeta"
      >
        {isDeleting ? (
          // Spinner simple para estado de carga
          <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
        ) : (
          // Icono de papelera
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M3 6h18v2H3V6zm2 3h14l-1 14H6L5 9zm5-6h4v1H10V3z"/>
          </svg>
        )}
      </button>
    </div>
  );
};

export default CardItem;

/**
 * Notas de implementación:
 * 
 * 1. Responsive Design:
 *    - Móvil/Tablet: Botón eliminar siempre visible
 *    - Desktop: Botón eliminar visible solo en hover
 * 
 * 2. Accesibilidad:
 *    - Labels descriptivos para lectores de pantalla
 *    - Roles y tabIndex apropiados
 *    - Estados disabled manejados correctamente
 * 
 * 3. Performance:
 *    - useCallback para prevenir re-renders innecesarios
 *    - Cleanup de timeouts para evitar memory leaks
 *    - Estados de carga para prevenir múltiples requests
 * 
 * 4. UX:
 *    - Auto-flip en móviles después de 3 segundos
 *    - Animaciones suaves y feedback visual
 *    - Prevención de clicks múltiples durante eliminación
 */