# 💳 Card Manager - Prueba Técnica Front-End

**Gestor de Tarjetas de Crédito** desarrollado como prueba técnica para Desarrollador Front-End.  
Aplicación full-stack con React + Express + MongoDB que permite gestionar tarjetas de crédito de forma segura.

🔗 **Repositorio**: [https://github.com/elizonRL/card-app](https://github.com/elizonRL/card-app)

---

## 📊 Estado del Proyecto

### ✅ **Bloque 1 - Frontend (100% Completado)**

#### 1. Maquetación y Validaciones
- [x] **Maquetación moderna y responsive** con Tailwind CSS
- [x] **Todos los campos requeridos** con validación en tiempo real
- [x] **Edición en vivo** - Los campos modifican la tarjeta instantáneamente
- [x] **Campo tarjeta**: Solo números, máximo 16 caracteres, formato automático (1234 5678 9012 3456)
- [x] **Campo fecha**: Formato MM/YY automático
- [x] **Validación de fecha**: Mes (01-12), Año (22 hasta actual+5)
- [x] **Campo nombre**: Solo letras y tildes, máximo 20 caracteres
- [x] **Mensajes de error** en rojo debajo de cada campo inválido

#### 2. Funcionalidad de Botones
- [x] **Botón Agregar**: Valida formulario y agrega tarjeta con ID único
- [x] **Validación completa** antes de agregar
- [x] **Enmascaramiento**: Muestra solo primeros 4 y últimos 4 dígitos (1234 **** **** 5678)
- [x] **Botón Cancelar**: Limpia todos los campos
- [x] **Estados de carga** con spinners y feedback visual

#### 3. Funcionalidades Adicionales
- [x] **Vista previa interactiva** de tarjeta con react-credit-cards-2
- [x] **Click para ver CVC** con auto-flip en móviles
- [x] **Botón eliminar** con tooltip y confirmación
- [x] **Responsive design** optimizado para móviles y desktop
- [x] **Skeletons** durante carga de datos

### ✅ **Bloque 2 - Backend (100% Completado)**

#### 1. API RESTful
- [x] **CRUD completo** para tarjetas (Create, Read, Update, Delete)
- [x] **Express.js** como framework web
- [x] **MongoDB** como base de datos
- [x] **Mongoose** para modelado de datos
- [x] **CORS** configurado para desarrollo

#### 2. Integración Frontend-Backend
- [x] **Conexión completa** entre formulario y API
- [x] **Almacenamiento en MongoDB** con persistencia
- [x] **Validación de campos requeridos** en backend
- [x] **Respuestas HTTP correctas**: 200, 201, 400, 404, 500
- [x] **Manejo de errores** robusto

#### 3. Endpoints Implementados
```
GET    /api/v1/cards     - Obtener todas las tarjetas
POST   /api/v1/cards     - Crear nueva tarjeta
PUT    /api/v1/cards/:id - Actualizar tarjeta
DELETE /api/v1/cards/:id - Eliminar tarjeta
```

---

## 🚀 Instrucciones para Ejecutar el Proyecto

### 📋 Requisitos Previos
- **Node.js** v18+ 
- **npm** v8+
- **Docker** (opcional, para base de datos)
- **Git**

### 📥 Instalación

#### Opción 1: Desarrollo Local (Recomendado)
```bash
# 1. Clonar repositorio
git clone https://github.com/elizonRL/card-app.git
cd card-app

# 2. Instalar todas las dependencias
npm run install:all

# 3. Levantar MongoDB con Docker
docker-compose -f docker-compose.dev.yml up -d

# 4. Ejecutar frontend y backend simultáneamente
npm run dev
```

#### Opción 2: Docker Completo
```bash
# 1. Clonar repositorio
git clone https://github.com/elizonRL/card-app.git
cd card-app

# 2. Ejecutar con Docker
npm run docker:dev
```

### 🌐 Acceso a la Aplicación
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3000
- **MongoDB**: localhost:27017

### 🧪 Cómo Probar

1. **Agregar Tarjeta**:
   - Completa todos los campos del formulario
   - Observa la vista previa en tiempo real
   - Click en "Agregar Tarjeta"

2. **Validaciones**:
   - Deja campos vacíos para ver mensajes de error
   - Prueba fechas inválidas (mes > 12, año < 22)
   - Ingresa caracteres especiales en nombre

3. **Interactividad**:
   - Click en tarjetas guardadas para ver CVC
   - Hover sobre botón eliminar (desktop)
   - Prueba en móvil para ver diferencias responsive

### 📱 Comandos Disponibles

```bash
# Desarrollo
npm run dev              # Frontend + Backend
npm run dev:frontend     # Solo Frontend
npm run dev:backend      # Solo Backend

# Docker
npm run docker:dev       # Todos los servicios
npm run docker:down      # Detener servicios
npm run docker:mongo     # Solo MongoDB

# Utilidades
npm run install:all      # Instalar dependencias
```

---

## 🏗️ Arquitectura y Tecnologías

### Frontend
- **React 18** con Hooks y Context API
- **Tailwind CSS** para estilos responsive
- **Vite** como bundler y dev server
- **react-credit-cards-2** para vista previa de tarjetas

### Backend
- **Express.js** como framework web
- **MongoDB** con Mongoose ODM
- **CORS** para comunicación cross-origin
- **Arquitectura RESTful** con separación de responsabilidades

### DevOps
- **Docker** y **Docker Compose** para containerización
- **Concurrently** para ejecutar múltiples procesos
- **Workspaces** de npm para monorepo

---

## 📝 Observaciones y Mejoras Implementadas

### ✨ Funcionalidades Extra Implementadas
- **UX Mejorada**: Animaciones, transiciones y feedback visual
- **Responsive Design**: Optimizado para móviles y desktop
- **Accesibilidad**: ARIA labels, roles y navegación por teclado
- **Performance**: useCallback, cleanup de memoria, estados de carga
- **Validaciones Avanzadas**: Tiempo real con mensajes específicos
- **Docker**: Configuración completa para desarrollo y producción

### 🔧 Aspectos Técnicos Destacados
- **Código Documentado**: JSDoc completo en componentes críticos
- **Buenas Prácticas**: Separación de responsabilidades, hooks personalizados
- **Manejo de Estados**: Context API para evitar prop drilling
- **Error Handling**: Manejo robusto de errores en frontend y backend
- **Seguridad**: Validaciones tanto en frontend como backend

### 🎯 Cumplimiento de Criterios
- **Bloque 1**: ✅ 100% completado (supera el 70% requerido)
- **Bloque 2**: ✅ 100% completado (supera el 50% requerido)
- **Calidad de Código**: Priorizada sobre cantidad de features
- **Documentación**: Completa con ejemplos de uso

---

## 🤝 Contribución

Para contribuir al proyecto:
1. Fork el repositorio
2. Crea una rama feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -m 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

---

## 📄 Licencia

Este proyecto está bajo la Licencia ISC. Ver el archivo `LICENSE` para más detalles.

---

**Desarrollado con ❤️ para la prueba técnica de Front-End Developer**