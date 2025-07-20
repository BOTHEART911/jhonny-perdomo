# Jhonny Perdomo - Proxy App

Este proyecto es un proxy para embeber la aplicación Google Apps Script de Jhonny Perdomo en Vercel.

## 🚀 Características

- **Proxy transparente** para Google Apps Script
- **Deploy automático** en Vercel
- **URL personalizada** sin exponer la URL de Apps Script
- **Optimizado** para rendimiento

## 📁 Estructura del Proyecto

```
jhonny-perdomo/
├── package.json          # Configuración del proyecto
├── vercel.json           # Configuración de Vercel
├── .gitignore           # Archivos a ignorar en Git
├── README.md            # Este archivo
└── api/
    └── proxy.js         # Función serverless que actúa como proxy
```

## 🔗 URL Original de Apps Script

La aplicación original está en:
`https://script.google.com/macros/s/AKfycbzTKAGqkWkrOho0xnNxeiDqJwI-QzQq8qAng_LBBtn1KYsX1_MmO-tJNgvW11nJARq5SA/exec`

## 🛠 Desarrollo Local

Para probar localmente:

```bash
npm install -g vercel
vercel dev
```

## 📦 Deploy en Vercel

1. Sube el proyecto a GitHub
2. Conecta tu repositorio en Vercel.com
3. Deploy automático

## 👨‍💻 Autor

**Jhonny Perdomo**
- Aplicación de gestión de contactos y votaciones
