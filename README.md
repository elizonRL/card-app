# Proyecto - Prueba Técnica Front-End

Este proyecto corresponde al desarrollo de la **Prueba Técnica para Desarrollador Front-End**.  
Se ha implementado la maquetación y funcionalidad solicitada en el enunciado, así como la conexión con un API para la gestión de tarjetas.

---

## 📌 Información de lo realizado

- **Bloque 1**
  - [x] Maquetación del formulario para agregar tarjeta.
  - [x] Validaciones de campos: número de tarjeta, fecha de vencimiento y nombre del titular.
  - [x] Enmascaramiento del número de tarjeta (solo mostrar los primeros 2 dígitos y últimos 4).
  - [x] Mensajes de error en campos inválidos.
  - [x] Botón **Agregar tarjeta** que añade la tarjeta a un listado con identificador único.
  - [x] Botón **Cancelar** que limpia todos los campos.

- **Bloque 2**
  - [x] Creación de una API RESTful básica con operaciones CRUD para tarjetas.
  - [x]Conexión entre el formulario y la API (almacenamiento en base de datos/archivo).
  - [x] Manejo de respuestas HTTP (200, 404, 500, etc.).

---

## 🚀 Instrucciones para correr y probar el proyecto

### Requisitos previos
- Node.js (v16 o superior recomendado)  
- npm o yarn instalado  

### Instalación
```bash
# Clonar repositorio
git clone <url-del-repo>

# Entrar al proyecto
cd nombre-del-proyecto

# Instalar dependencias
npm install
```
### Configuración de la base de datos
```bash
docker run -d -p 27017:27017 --name mongocard -e MONGO_INITDB_ROOT_USERNAME=cardDb -e MONGO_INITDB_ROOT_PASSWORD=cardps mongo
```
### Ejecución
```bash
# Ejecutar en modo desarrollo
npm run dev

# Ejecutar en modo producción
npm run build && npm start
```

### Pruebas
Si se han configurado pruebas, se pueden ejecutar con:
```bash
npm test
```

---

## 📝 Observaciones

- Se completó al menos el 70% del Bloque 1 y el 50% del Bloque 2.  
- Algunas funcionalidades pueden ser ampliadas (ejemplo: mejor manejo de errores en la API).  
- La implementación está pensada para ser clara y mantenible, priorizando la **calidad y limpieza del código** sobre la completitud.  

---

## 📖 Notas
- El proyecto utiliza **[framework elegido: React]** para el Bloque 1.  
- La API se implementó con **[tecnología usada: Express]**.  
- Se recomienda revisar la documentación dentro del código para detalles técnicos adicionales.  
