import { useRef, useState } from "react";

/**
 * Hook personalizado para manejar el estado y validaciones de tarjetas de crédito
 * 
 * @returns {Object} Objeto con estado y funciones para manejar tarjetas
 * @returns {Object} cardData - Estado actual de la tarjeta
 * @returns {Function} handleInputChange - Maneja cambios en inputs con validaciones
 * @returns {Function} handleInputFocus - Maneja el enfoque de campos
 * @returns {Function} handleReset - Resetea todos los campos
 * @returns {Object} errorRef - Referencia para errores de validación
 */

const useCard = () => {
  // Estado inicial de la tarjeta
  const [cardData, setCardData] = useState({
    number: "",    // Número de tarjeta (formato: 1234 5678 9012 3456)
    name: "",      // Nombre del titular (máx 20 caracteres)
    expiry: "",    // Fecha vencimiento (formato: MM/YY)
    cvc: "",       // Código seguridad (3-4 dígitos)
    focus: ""      // Campo actualmente enfocado
  });
  
  // Estado para errores de validación
  const [validationErrors, setValidationErrors] = useState({});
  
  // Referencia para manejar errores de validación
  const errorRef = useRef(false);

  /**
   * Maneja los cambios en los inputs con validaciones específicas
   * @param {Event} e - Evento del input
   */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Validación para número de tarjeta
    if (name === "number") {
      return handleNumberChange(value, name);
    }
    // Validación para fecha de vencimiento
    if (name === "expiry") {
      return handleExpiryChange(value, name);
    }
    // Validación para CVC
    if (name === "cvc") {
      return handleCvcChange(value, name);
    }
    
    // Validación para nombre del titular
    if (name === "name") {
      return handleNameChange(value, name);
    }
    
    // Actualizar estado para otros campos
    setCardData({ ...cardData, [name]: value });
  };
  
  /**
   * Maneja y valida el número de tarjeta
   * @param {string} value - Valor del input
   * @param {string} name - Nombre del campo
   */
  const handleNumberChange = (value, name) => {
    // Remover caracteres no numéricos
    const input = value.replace(/\D/g, '');
    
    // Limitar a 16 dígitos
    if (input.length > 16) return;
    
    // Formatear con espacios cada 4 dígitos
    const formatted = input.replace(/(\d{4})(?=\d)/g, '$1 ');
    setCardData({ ...cardData, [name]: formatted });
  };
  
  /**
   * Maneja y valida la fecha de vencimiento
   * @param {string} value - Valor del input
   * @param {string} name - Nombre del campo
   */
  const handleExpiryChange = (value, name) => {
    // Limitar a 5 caracteres (MM/YY)
    if (value.length > 5) return;
    
    // Formatear MM/YY
    const input = value.replace(/\D/g, '');
    let formatted = input;
    
    if (input.length > 2) {
      formatted = input.slice(0, 2) + '/' + input.slice(2, 4);
    }
    
    // Validar formato completo MM/YY
    if (formatted.length === 5) {
      const [month, year] = formatted.split('/');
      const currentYear = new Date().getFullYear() % 100; // Obtener últimos 2 dígitos del año actual
      const maxYear = currentYear + 5;
      
      const monthNum = parseInt(month);
      const yearNum = parseInt(year);
      
      // Validar mes (01-12)
      if (monthNum < 1 || monthNum > 12) {
        setValidationErrors(prev => ({ ...prev, expiry: 'El mes debe estar entre 01 y 12' }));
        setCardData({ ...cardData, [name]: formatted });
        return;
      }
      
      // Validar año (año actual hasta año actual + 5)
      if (yearNum < 22 || yearNum > maxYear) {
        setValidationErrors(prev => ({ ...prev, expiry: `El año debe estar entre 22 y ${maxYear}` }));
        setCardData({ ...cardData, [name]: formatted });
        return;
      }
      
      // Si pasa todas las validaciones, limpiar error
      setValidationErrors(prev => ({ ...prev, expiry: '' }));
    } else {
      // Limpiar error si no está completo
      setValidationErrors(prev => ({ ...prev, expiry: '' }));
    }
    
    setCardData({ ...cardData, [name]: formatted });
  };
  
  /**
   * Maneja y valida el CVC
   * @param {string} value - Valor del input
   * @param {string} name - Nombre del campo
   */
  const handleCvcChange = (value, name) => {
    // Limitar a 4 dígitos
    if (value.length > 4) return;
    setCardData({ ...cardData, [name]: value });
  };
  
  /**
   * Maneja y valida el nombre del titular
   * @param {string} value - Valor del input
   * @param {string} name - Nombre del campo
   */
  const handleNameChange = (value, name) => {
    // Permitir solo letras, espacios y caracteres especiales, máx 20 caracteres
    if (value.length > 20) return;
    
    const input = value.replace(/[^A-Za-zÀ-ÖØ-öø-ÿ\s]/g, '');
    setCardData({ ...cardData, [name]: input });
  };

  /**
   * Maneja el enfoque de los inputs para resaltar campos en la tarjeta
   * @param {Event} e - Evento de enfoque
   */
  const handleInputFocus = (e) => {
    setCardData({ ...cardData, focus: e.target.name });
  };
  
  /**
   * Resetea todos los campos de la tarjeta a su estado inicial
   */
  const handleReset = () => {
    setCardData({
      number: "",
      name: "",
      expiry: "",
      cvc: "",
      focus: ""
    });
    setValidationErrors({});
    errorRef.current = false;
  };

  return {
    cardData,
    handleInputChange,
    handleInputFocus,
    handleReset,
    validationErrors,
    errorRef
  }
}

export default useCard; 