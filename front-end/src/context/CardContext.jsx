import { createContext, useContext } from 'react';
import useCard from '../hooks/userCard';

/**
 * Context para manejar el estado global de la tarjeta
 */
const CardContext = createContext();

/**
 * Provider del contexto de tarjeta
 * @param {Object} props - Propiedades del provider
 * @param {React.ReactNode} props.children - Componentes hijos
 */
export const CardProvider = ({ children }) => {
  const cardHook = useCard();

  return (
    <CardContext.Provider value={cardHook}>
      {children}
    </CardContext.Provider>
  );
};

/**
 * Hook personalizado para usar el contexto de tarjeta
 * @returns {Object} Estado y funciones del hook useCard
 */
export const useCardContext = () => {
  const context = useContext(CardContext);
  
  if (!context) {
    throw new Error('useCardContext debe ser usado dentro de CardProvider');
  }
  
  return context;
};