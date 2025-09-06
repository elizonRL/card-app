const cardModel = require('../models/card.model');
const mongoose = require('mongoose');
const { createError } = require('../utils/middleware');

/**
 * Controlador para la gestión de tarjetas de crédito
 * 
 * Maneja todas las operaciones CRUD para tarjetas con validaciones robustas.
 * Los errores son manejados por el middleware centralizado de errores.
 */

/**
 * Obtiene todas las tarjetas de la base de datos
 * 
 * @route GET /api/v1/cards
 * @access Public
 * @returns {Object} 200 - Lista de tarjetas
 */
const getAllCards = async (req, res, next) => {
    try {
        const cards = await cardModel.find({}).sort({ createdAt: -1 });
        
        res.status(200).json({
            success: true,
            count: cards.length,
            data: cards
        });
        
    } catch(error) {
        next(error);
    }
};

/**
 * Valida los datos de entrada para crear/actualizar tarjeta
 * @param {Object} data - Datos a validar
 * @param {boolean} isUpdate - Si es una actualización (campos opcionales)
 * @returns {Array} Array de errores de validación
 */
const validateCardData = (data, isUpdate = false) => {
    const errors = [];
    const { number, name, expiry, cvc } = data;

    // Validar número de tarjeta
    if (number !== undefined) {
        const cleanNumber = number.replace(/\s/g, '');
        if (!/^\d{16}$/.test(cleanNumber)) {
            errors.push('Número de tarjeta debe tener exactamente 16 dígitos');
        }
    } else if (!isUpdate) {
        errors.push('Número de tarjeta es requerido');
    }

    // Validar nombre
    if (name !== undefined) {
        if (!/^[A-Za-zÀ-ÖØ-öø-ÿ\s]{1,20}$/.test(name)) {
            errors.push('Nombre debe contener solo letras y espacios (máx 20 caracteres)');
        }
    } else if (!isUpdate) {
        errors.push('Nombre del titular es requerido');
    }

    // Validar fecha de vencimiento
    if (expiry !== undefined) {
        if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiry)) {
            errors.push('Fecha debe tener formato MM/YY válido');
        }
    } else if (!isUpdate) {
        errors.push('Fecha de vencimiento es requerida');
    }

    // Validar CVC
    if (cvc !== undefined) {
        if (!/^\d{3,4}$/.test(cvc)) {
            errors.push('CVC debe tener 3 o 4 dígitos');
        }
    } else if (!isUpdate) {
        errors.push('CVC es requerido');
    }

    return errors;
};

/**
 * Crea una nueva tarjeta de crédito
 * 
 * @route POST /api/v1/cards
 * @access Public
 * @param {Object} req.body - Datos de la tarjeta
 * @returns {Object} 201 - Tarjeta creada exitosamente
 */
const createCard = async (req, res, next) => {
    try {
        const { number, name, expiry, cvc } = req.body;
        
        // Validar datos de entrada
        const validationErrors = validateCardData(req.body);
        if (validationErrors.length > 0) {
            throw createError(`Datos inválidos: ${validationErrors.join(', ')}`, 400);
        }
        
        // Limpiar y preparar datos
        const cleanNumber = number.replace(/\s/g, '');
        const cleanName = name.trim();
        
        // Verificar duplicados
        const existingCard = await cardModel.findOne({ number: cleanNumber });
        if (existingCard) {
            throw createError('Ya existe una tarjeta con este número', 409);
        }
        
        // Crear nueva tarjeta
        const newCard = new cardModel({ 
            number: cleanNumber, 
            name: cleanName, 
            expiry, 
            cvc 
        });
        
        const savedCard = await newCard.save();
        
        res.status(201).json({
            success: true,
            message: 'Tarjeta creada exitosamente',
            data: savedCard
        });
        
    } catch(error) {
        next(error);
    }
};

/**
 * Actualiza una tarjeta existente
 * 
 * @route PUT /api/v1/cards/:cardId
 * @access Public
 * @param {string} req.params.cardId - ID de la tarjeta a actualizar
 * @returns {Object} 200 - Tarjeta actualizada exitosamente
 */
const editCard = async (req, res, next) => {
    try {
        const { cardId } = req.params;
        const updateData = req.body;
        
        // Validar ID
        if (!cardId) {
            throw createError('ID de tarjeta es requerido', 400);
        }
        
        if (!mongoose.Types.ObjectId.isValid(cardId)) {
            throw createError('Formato de ID de tarjeta inválido', 400);
        }
        
        // Validar datos de actualización
        if (!updateData || Object.keys(updateData).length === 0) {
            throw createError('No se proporcionaron datos para actualizar', 400);
        }
        
        const validationErrors = validateCardData(updateData, true);
        if (validationErrors.length > 0) {
            throw createError(`Datos inválidos: ${validationErrors.join(', ')}`, 400);
        }
        
        // Limpiar datos si se proporcionan
        if (updateData.number) {
            updateData.number = updateData.number.replace(/\s/g, '');
            
            // Verificar duplicados
            const existingCard = await cardModel.findOne({ 
                number: updateData.number, 
                _id: { $ne: cardId } 
            });
            
            if (existingCard) {
                throw createError('Ya existe otra tarjeta con este número', 409);
            }
        }
        
        if (updateData.name) {
            updateData.name = updateData.name.trim();
        }
        
        // Actualizar tarjeta
        const updatedCard = await cardModel.findByIdAndUpdate(
            cardId, 
            { ...updateData, updatedAt: new Date() }, 
            { new: true, runValidators: true }
        );
        
        if (!updatedCard) {
            throw createError('Tarjeta no encontrada', 404);
        }
        
        res.status(200).json({
            success: true,
            message: 'Tarjeta actualizada exitosamente',
            data: updatedCard
        });
        
    } catch(error) {
        next(error);
    }
};

/**
 * Elimina una tarjeta existente
 * 
 * @route DELETE /api/v1/cards/:id
 * @access Public
 * @param {string} req.params.id - ID de la tarjeta a eliminar
 * @returns {Object} 204 - Tarjeta eliminada exitosamente
 */
const deleteCard = async (req, res, next) => {
    try {
        const { id } = req.params;
        
        // Validar ID
        if (!id) {
            throw createError('ID de tarjeta es requerido para eliminar', 400);
        }
        
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw createError('Formato de ID de tarjeta inválido', 400);
        }
        
        // Eliminar tarjeta
        const deletedCard = await cardModel.findByIdAndDelete(id);
        
        if (!deletedCard) {
            throw createError('Tarjeta no encontrada', 404);
        }
        
        res.status(204).send();
        
    } catch(error) {
        next(error);
    }
};

// Exportar controladores
module.exports = {
    getAllCards,
    createCard,
    editCard,
    deleteCard
};

/**
 * Notas de implementación:
 * 
 * 1. Manejo de Errores:
 *    - Todos los errores se pasan al middleware centralizado con next(error)
 *    - Uso de createError() para errores personalizados con status HTTP
 *    - Logging simplificado en controladores
 * 
 * 2. Validaciones:
 *    - Función validateCardData() reutilizable
 *    - Validaciones específicas por tipo de operación
 *    - Sanitización de datos de entrada
 * 
 * 3. Arquitectura:
 *    - Separación de responsabilidades
 *    - Controladores enfocados en lógica de negocio
 *    - Middleware maneja presentación de errores
 * 
 * 4. Códigos HTTP:
 *    - Manejados automáticamente por el middleware
 *    - Consistencia en todas las respuestas
 *    - Errores específicos para cada escenario
 */