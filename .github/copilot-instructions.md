<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# Instrucciones para Copilot - Jhonny Perdomo Proxy

Este es un proyecto de proxy para una aplicación Google Apps Script desplegada en Vercel.

## Contexto del Proyecto

- **Aplicación Original**: Google Apps Script con funciones para gestión de contactos, votaciones, actualizaciones y asistencias
- **Objetivo**: Embeber la aplicación en Vercel con URL personalizada
- **Tecnología**: Node.js serverless functions en Vercel

## Funciones Principales de la App Original

La aplicación Google Apps Script incluye:
- `validarDocumento()` - Validación de documentos para contactos
- `guardarContactoEnServidor()` - Guardado de nuevos contactos
- `validarDocumento2()` - Validación para votaciones
- `guardarVotacionEnServidor()` - Guardado de información de votación
- `validarDocumento3()` - Validación para actualizaciones
- `guardarActualizacionEnServidor()` - Actualización de datos
- `validarDocumento4()` - Validación para asistencias
- `guardarAsistenciaEnServidor()` - Registro de asistencias

## URLs y Páginas HTML

La aplicación maneja múltiples páginas:
- Contactos.html
- Votacion.html
- Actualizacion.html
- Asistencia.html

## Consideraciones de Desarrollo

- Mantener compatibilidad total con la aplicación original
- El proxy debe ser transparente (no modificar funcionalidad)
- Preservar todos los headers y parámetros
- Manejar errores de red gracefully
