import { useState, useEffect, useCallback } from "react";

/**
 * Hook personalizado para realizar peticiones HTTP con manejo de estado
 * 
 * @param {string} url - URL base para las peticiones
 * @param {Object} options - Opciones por defecto para fetch
 * @returns {Object} Objeto con datos, errores y función para hacer peticiones
 * @returns {Array} data - Datos obtenidos de la API
 * @returns {string|null} error - Mensaje de error si ocurre alguno
 * @returns {Function} fetchData - Función para realizar peticiones personalizadas
 */
export function useFetch(url, options = {}) {
  // Estado para almacenar los datos de la API
  const [data, setData] = useState([]);
  
  // Estado para manejar errores
  const [error, setError] = useState(null);
  
  // Estado para manejar carga
  const [loading, setLoading] = useState(false);
  
  // Estado para saber si ya se cargaron los datos iniciales
  const [hasLoaded, setHasLoaded] = useState(false);

  /**
   * Función para realizar peticiones HTTP con manejo automático de estado
   * @param {Object} customOptions - Opciones específicas para esta petición
   * @returns {Promise<Object>} Respuesta de la API
   */
  const fetchData = useCallback(
    async (customOptions = {}) => {
      try {
        setLoading(true);
        setError(null);
        
        // Realizar petición combinando opciones por defecto y personalizadas
        const response = await fetch(url, { ...options, ...customOptions });
        
        // Verificar si la respuesta es exitosa
        if (!response.ok) {
          throw new Error(`HTTP Error: ${response.status} - ${response.statusText}`);
        }
        
        const jsonData = await response.json();
        
        // Manejar diferentes tipos de operaciones
        handleResponseData(jsonData, customOptions.method);
        
        // Marcar como cargado después de la primera respuesta exitosa
        if (!hasLoaded) {
          setHasLoaded(true);
        }
        
        return jsonData;
      } catch (err) {
        setError(err.message);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [url, hasLoaded]
  );
  
  /**
   * Maneja la actualización del estado según el tipo de operación
   * @param {Object} jsonData - Datos recibidos de la API
   * @param {string} method - Método HTTP utilizado
   */
  const handleResponseData = (jsonData, method) => {
    switch (method) {
      case 'POST':
        // Para POST, agregar nuevo elemento al estado existente
        const newItem = jsonData.data || jsonData;
        setData(prevData => [...prevData, newItem]);
        break;
        
      case 'DELETE':
        // Para DELETE, no necesitamos actualizar aquí ya que se refresca la lista
        break;
        
      default:
        // Para GET y otros métodos, reemplazar todo el estado
        setData(jsonData.data ?? []);
        break;
    }
  };

  /**
   * Función para agregar una nueva tarjeta
   * @param {Object} cardData - Datos de la tarjeta
   * @returns {Promise<Object>} Respuesta de la API
   */
  const addCard = useCallback(async (cardData) => {
    try {
      const response = await fetchData({
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cardData),
      });
      
      // Refrescar datos después de agregar
      await fetchData();
      return response;
    } catch (err) {
      throw err;
    }
  }, [fetchData]);

  /**
   * Función para eliminar una tarjeta
   * @param {string} cardId - ID de la tarjeta
   * @returns {Promise<void>}
   */
  const deleteCard = useCallback(async (cardId) => {
    try {
      const response = await fetch(`${url}/${cardId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status} - ${response.statusText}`);
      }
      
      // Refrescar datos después de eliminar
      await fetchData();
    } catch (err) {
      throw err;
    }
  }, [url, fetchData]);

  /**
   * Efecto para realizar GET automático al montar el componente
   * Solo se ejecuta una vez al montar
   */
  useEffect(() => {
    const isGetRequest = options.method === "GET" || !options.method;
    
    if (isGetRequest) {
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Retornar estado y funciones para uso del componente
  return { 
    data,      // Datos obtenidos de la API
    error,     // Mensaje de error si existe
    loading,   // Estado de carga
    hasLoaded, // Si ya se cargaron los datos iniciales
    fetchData, // Función para realizar peticiones personalizadas
    addCard,   // Función para agregar tarjetas
    deleteCard // Función para eliminar tarjetas
  };
}
