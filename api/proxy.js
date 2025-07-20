export default async function handler(req, res) {
  const appsScriptUrl = 'https://script.google.com/macros/s/AKfycbzTKAGqkWkrOho0xnNxeiDqJwI-QzQq8qAng_LBBtn1KYsX1_MmO-tJNgvW11nJARq5SA/exec';
  
  try {
    // Construir URL con todos los parámetros de la request original
    const params = new URLSearchParams();
    
    // Agregar todos los query parameters
    Object.keys(req.query).forEach(key => {
      params.append(key, req.query[key]);
    });
    
    const fullUrl = params.toString() ? `${appsScriptUrl}?${params}` : appsScriptUrl;
    
    // Preparar headers para la request
    const headers = {
      'User-Agent': req.headers['user-agent'] || 'Vercel-Proxy/1.0'
    };
    
    // Si hay body en POST requests, incluirlo
    const requestOptions = {
      method: req.method,
      headers: headers
    };
    
    if (req.method === 'POST' && req.body) {
      requestOptions.body = JSON.stringify(req.body);
      headers['Content-Type'] = 'application/json';
    }
    
    const response = await fetch(fullUrl, requestOptions);
    const data = await response.text();
    
    // Copiar headers importantes de la respuesta
    const contentType = response.headers.get('content-type') || 'text/html; charset=utf-8';
    
    res.setHeader('Content-Type', contentType);
    res.setHeader('Cache-Control', response.headers.get('cache-control') || 'no-cache');
    
    // Si hay otros headers importantes, copiarlos también
    if (response.headers.get('set-cookie')) {
      res.setHeader('Set-Cookie', response.headers.get('set-cookie'));
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
      </head>
      <body>
        <h1>Error al cargar la aplicación</h1>
        <p>Por favor intenta de nuevo más tarde.</p>
        <small>Error: ${error.message}</small>
      </body>
      </html>
    `);
  }
}
