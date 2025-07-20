export default async function handler(req, res) {
  const appsScriptUrl = 'https://script.google.com/macros/s/AKfycbzTKAGqkWkrOho0xnNxeiDqJwI-QzQq8qAng_LBBtn1KYsX1_MmO-tJNgvW11nJARq5SA/exec';
  
  try {
    // Construir URL con parámetros si existen
    const params = new URLSearchParams(req.query);
    const fullUrl = params.toString() ? `${appsScriptUrl}?${params}` : appsScriptUrl;
    
    const response = await fetch(fullUrl, {
      method: req.method,
      headers: {
        'User-Agent': 'Vercel-Proxy/1.0'
      }
    });
    
    const data = await response.text();
    
    // Mantener headers importantes
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Cache-Control', 'no-cache');
    
    res.send(data);
  } catch (error) {
    console.error('Error al cargar Apps Script:', error);
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
      </body>
      </html>
    `);
  }
}
