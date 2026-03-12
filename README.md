# CRM Frontend (React)

Este es el frontend del proyecto CRM, construido con **React** y **Vite**. La aplicación consume una API en FastAPI (CR_Back) para manejar la autenticación, registro de usuarios, y perfiles.

## Requisitos previos

Antes de comenzar, asegúrate de tener instalado en tu computadora:

- **[Node.js](https://nodejs.org/)** (se recomienda la versión 18 o superior).
- **Git** (para clonar el repositorio).

---

## Pasos para ejecutar el proyecto

Si acabas de descargar o clonar este repositorio, sigue estos sencillos pasos para levantar el proyecto localmente.

### 1. Clonar el repositorio

Abre tu terminal y clona el proyecto en la carpeta que prefieras:

```bash
git clone https://github.com/Emmanuel-her/Crm_prueba_front.git
cd Crm_prueba_front
```

### 2. Instalar las dependencias

Una vez dentro de la carpeta del proyecto, necesitas instalar todas las librerías necesarias para que funcione (como React, Axios, React Router, etc.). Ejecuta:

```bash
npm install
```

### 3. Configurar la URL del Backend (Opcional)

Por defecto, la aplicación intentará conectarse al backend ubicado en `http://localhost:8000`. 
Si necesitas cambiar esta dirección (por ejemplo, si subiste tu backend a un servidor o usas otro puerto), puedes modificarlo abriendo el archivo `src/services/api.js` y cambiando la URL en `baseURL`.

### 4. Iniciar el servidor de desarrollo

Para ver la aplicación corriendo en tu navegador, ejecuta el siguiente comando:

```bash
npm run dev
```

Te aparecerá en la terminal una URL local (normalmente `http://localhost:5173/`). Abre ese enlace en tu navegador para ver la página y empezar a usarla.

---

## Estructura principal rápida

Para que no te pierdas en el código:
- `src/pages/`: Aquí están las pantallas completas (Login, Registro, Dashboard, Perfil).
- `src/components/`: Componentes reutilizables como la barra de navegación (`Navbar.jsx`).
- `src/services/`: Toda la comunicación con el Backend (peticiones a la API).
- `src/context/`: El manejo de la sesión para saber si el usuario está logueado o no a través de toda la app.
- `src/index.css`: Todos los estilos visuales de la aplicación.
