export default async function handler(req, res) {
  const appsScriptUrl = 'https://script.google.com/macros/s/AKfycbzTKAGqkWkrOho0xnNxeiDqJwI-QzQq8qAng_LBBtn1KYsX1_MmO-tJNgvW11nJARq5SA/exec';
  
  try {
    // Obtener la ruta solicitada
    const path = req.url;
    let targetUrl = appsScriptUrl;
    
    // Mapear rutas a funciones específicas de Apps Script
    if (path === '/contactos' || path === '/contactos.html') {
      targetUrl = `${appsScriptUrl}?page=contactos`;
    } else if (path === '/votacion' || path === '/votacion.html') {
      targetUrl = `${appsScriptUrl}?page=votacion`;
    } else if (path === '/actualizacion' || path === '/actualizacion.html') {
      targetUrl = `${appsScriptUrl}?page=actualizacion`;
    } else if (path === '/asistencia' || path === '/asistencia.html') {
      targetUrl = `${appsScriptUrl}?page=asistencia`;
    } else if (path === '/consultar' || path === '/consultar.html') {
      targetUrl = `${appsScriptUrl}?page=consultar`;
    } else {
      // Para cualquier otro parámetro, pasarlo tal como viene
      const params = new URLSearchParams();
      Object.keys(req.query).forEach(key => {
        params.append(key, req.query[key]);
      });
      if (params.toString()) {
        targetUrl = `${appsScriptUrl}?${params}`;
      }
    }
    
    console.log(`Proxy: ${req.method} ${path} -> ${targetUrl}`);
    
    // Configurar la request
    const requestOptions = {
      method: req.method,
      headers: {
        'User-Agent': req.headers['user-agent'] || 'Vercel-Proxy/1.0',
        'Accept': req.headers.accept || 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': req.headers['accept-language'] || 'es-ES,es;q=0.9,en;q=0.8'
      }
    };
    
    // Si es POST, incluir el body
    if (req.method === 'POST' && req.body) {
      requestOptions.body = typeof req.body === 'string' ? req.body : JSON.stringify(req.body);
      requestOptions.headers['Content-Type'] = 'application/json';
    }
    
    const response = await fetch(targetUrl, requestOptions);
    
    if (!response.ok) {
      throw new Error(`Apps Script respondió con status ${response.status}`);
    }
    
    const data = await response.text();
    
    // Copiar headers importantes
    const contentType = response.headers.get('content-type') || 'text/html; charset=utf-8';
    
    res.setHeader('Content-Type', contentType);
    res.setHeader('Cache-Control', 'no-cache');
    
    // Headers adicionales para Apps Script
    if (response.headers.get('x-frame-options')) {
      res.setHeader('X-Frame-Options', response.headers.get('x-frame-options'));
    }
    
    res.status(response.status).send(data);
    
  } catch (error) {
    console.error('Error en proxy:', error);
    res.status(500).send(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Error - Jhonny Perdomo</title>
        <link rel="icon" href="https://res.cloudinary.com/dqqeavica/image/upload/v1746906622/Logo_hzevh9.png">
        <style>
          body { font-family: Arial, sans-serif; text-align: center; padding: 50px; }
          .error { color: #d32f2f; margin: 20px 0; }
        </style>
      </head>
      <body>
        <h1>Error al cargar la aplicación</h1>
        <div class="error">No se pudo conectar con el servidor de Google Apps Script</div>
        <p>Por favor intenta de nuevo más tarde.</p>
        <small>Detalles: ${error.message}</small>
        <br><br>
        <a href="/" style="color: #1976d2;">← Volver al inicio</a>
      </body>
      </html>
    `);
  }
}
