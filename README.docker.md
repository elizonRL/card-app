# Docker Setup - Card App

## Comandos disponibles

### Desarrollo Local
```bash
# Instalar todas las dependencias
npm run install:all

# Ejecutar frontend y backend simultáneamente
npm run dev

# Solo MongoDB con Docker (recomendado para desarrollo)
docker-compose -f docker-compose.dev.yml up -d
```

### Docker Completo
```bash
# Desarrollo con Docker (todos los servicios)
npm run docker:dev

# Producción con Docker
npm run docker:prod

# Detener servicios
npm run docker:down
```

### Comandos individuales
```bash
# Solo backend
npm run dev:backend

# Solo frontend  
npm run dev:frontend

# Solo MongoDB
npm run docker:mongo
```

## Puertos
- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:3000  
- **MongoDB**: localhost:27017

## Variables de entorno
- **MongoDB**: `cardDb:cardps@localhost:27017/mydatabase`
- **API URL**: `http://localhost:3000`