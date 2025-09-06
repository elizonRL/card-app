import { useState, useEffect, useCallback } from 'react';

/**
 * Hook personalizado para gestionar tarjetas de crédito
 * Optimizado para hacer peticiones solo cuando es necesario
 * 
 * @param {string} baseUrl - URL base de la API
 * @returns {Object} Estado y funciones para manejar tarjetas
 */
export const useCards = (baseUrl = 'http://localhost:3000/api/v1/cards') => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasLoaded, setHasLoaded] = useState(false);

  /**
   * Función genérica para hacer peticiones HTTP
   * @param {string} url - URL completa
   * @param {Object} options - Opciones de fetch
   * @returns {Promise<Object>} Respuesta de la API
   */
  const makeRequest = useCallback(async (url, options = {}) => {
    try {
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      // Para DELETE, no hay contenido que parsear
      if (response.status === 204) {
        return { success: true };
      }

      return await response.json();
    } catch (err) {
      console.error('Error en petición:', err);
      throw err;
    }
  }, []);

  /**
   * Obtiene todas las tarjetas del servidor
   * Solo se ejecuta cuando es necesario
   */
  const fetchCards = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await makeRequest(baseUrl);
      
      console.log('📋 Respuesta del servidor:', response);
      console.log('🎯 Tarjetas recibidas:', response.data);
      
      if (response.data && response.data.length > 0) {
        console.log('🔍 Primera tarjeta:', response.data[0]);
        console.log('🆔 ID de primera tarjeta:', response.data[0]._id);
      }
      
      setCards(response.data || []);
      
      if (!hasLoaded) {
        setHasLoaded(true);
      }

    } catch (err) {
      setError(err.message);
      setCards([]);
    } finally {
      setLoading(false);
    }
  }, [baseUrl, makeRequest, hasLoaded]);

  /**
   * Agrega una nueva tarjeta
   * Actualiza el estado local sin necesidad de refetch
   * 
   * @param {Object} cardData - Datos de la nueva tarjeta
   * @returns {Promise<Object>} Tarjeta creada
   */
  const addCard = useCallback(async (cardData) => {
    try {
      setError(null);

      const response = await makeRequest(baseUrl, {
        method: 'POST',
        body: JSON.stringify(cardData),
      });

      // Actualizar estado local agregando la nueva tarjeta
      const newCard = response.data;
      setCards(prevCards => [newCard, ...prevCards]);

      return response;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, [baseUrl, makeRequest]);

  /**
   * Elimina una tarjeta
   * Actualiza el estado local sin necesidad de refetch
   * 
   * @param {string} cardId - ID de la tarjeta a eliminar
   * @returns {Promise<void>}
   */
  const deleteCard = useCallback(async (cardId) => {
    try {
      setError(null);

      await makeRequest(`${baseUrl}/${cardId}`, {
        method: 'DELETE',
      });
      
      // Actualizar estado local removiendo la tarjeta
      setCards(prevCards => 
        prevCards.filter(card => card._id !== cardId)
      );

    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, [baseUrl, makeRequest]);

  /**
   * Actualiza una tarjeta existente
   * Actualiza el estado local sin necesidad de refetch
   * 
   * @param {string} cardId - ID de la tarjeta a actualizar
   * @param {Object} updateData - Datos actualizados
   * @returns {Promise<Object>} Tarjeta actualizada
   */
  const updateCard = useCallback(async (cardId, updateData) => {
    try {
      setError(null);

      const response = await makeRequest(`${baseUrl}/${cardId}`, {
        method: 'PUT',
        body: JSON.stringify(updateData),
      });

      // Actualizar estado local modificando la tarjeta específica
      const updatedCard = response.data;
      setCards(prevCards => 
        prevCards.map(card => 
          card._id === cardId ? updatedCard : card
        )
      );

      return response;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, [baseUrl, makeRequest]);

  /**
   * Refresca la lista de tarjetas desde el servidor
   * Solo usar cuando sea absolutamente necesario
   */
  const refreshCards = useCallback(() => {
    fetchCards();
  }, [fetchCards]);

  // Cargar tarjetas solo una vez al montar el componente
  useEffect(() => {
    fetchCards();
  }, []); // Sin dependencias para ejecutar solo una vez

  return {
    // Estado
    cards,
    loading,
    error,
    hasLoaded,
    
    // Acciones
    addCard,
    deleteCard,
    updateCard,
    refreshCards,
  };
};

export default useCards;