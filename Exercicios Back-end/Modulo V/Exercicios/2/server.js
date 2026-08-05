const http = require('http');

const servidor = http.createServer((req, res) => {

    console.log(`URL Acessada: ${req.url}`);


    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end('<h1>Verifique o terminal</h1>');
});



servidor.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000');
});

