/**
 * Middleware para manejar endpoints no encontrados
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 */
const unknownEndpoint = (req, res) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint no encontrado',
    path: req.originalUrl,
    method: req.method
  });
};

/**
 * Middleware centralizado para manejo de errores
 * Maneja todos los tipos de errores de la aplicación
 * 
 * @param {Error} error - Error object
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {Function} next - Next middleware function
 */
const errorHandler = (error, req, res, next) => {
  console.error('❌ Error capturado por middleware:', {
    name: error.name,
    message: error.message,
    stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
    path: req.originalUrl,
    method: req.method
  });

  // Error de ID inválido de MongoDB
  if (error.name === 'CastError') {
    return res.status(400).json({
      success: false,
      error: 'Formato de ID inválido',
      details: 'El ID proporcionado no tiene un formato válido'
    });
  }

  // Error de validación de Mongoose
  if (error.name === 'ValidationError') {
    const validationErrors = Object.values(error.errors).map(err => ({
      field: err.path,
      message: err.message,
      value: err.value
    }));
    
    return res.status(400).json({
      success: false,
      error: 'Error de validación de datos',
      validationErrors
    });
  }

  // Error de duplicado (clave única)
  if (error.code === 11000) {
    const field = Object.keys(error.keyValue)[0];
    const value = error.keyValue[field];
    
    return res.status(409).json({
      success: false,
      error: 'Recurso duplicado',
      details: `Ya existe un registro con ${field}: ${value}`
    });
  }

  // Error de conexión a MongoDB
  if (error.name === 'MongoNetworkError' || error.name === 'MongooseServerSelectionError') {
    return res.status(503).json({
      success: false,
      error: 'Servicio de base de datos no disponible',
      details: 'No se pudo conectar a la base de datos'
    });
  }

  // Error de timeout de MongoDB
  if (error.name === 'MongooseTimeoutError') {
    return res.status(408).json({
      success: false,
      error: 'Timeout de base de datos',
      details: 'La operación tardó demasiado tiempo'
    });
  }

  // Error personalizado con status
  if (error.status) {
    return res.status(error.status).json({
      success: false,
      error: error.message || 'Error de aplicación'
    });
  }

  // Error interno del servidor (por defecto)
  res.status(500).json({
    success: false,
    error: 'Error interno del servidor',
    ...(process.env.NODE_ENV === 'development' && { 
      details: error.message,
      stack: error.stack 
    })
  });
};

/**
 * Crea un error personalizado con status HTTP
 * @param {string} message - Mensaje del error
 * @param {number} status - Código de estado HTTP
 * @returns {Error} Error personalizado
 */
const createError = (message, status = 500) => {
  const error = new Error(message);
  error.status = status;
  return error;
};

module.exports = {
  unknownEndpoint,
  errorHandler,
  createError
};