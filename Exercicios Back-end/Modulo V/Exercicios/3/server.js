const http = require('http');

const servidor = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });

    if(req.url === '/'){res.end('<h1>Pagina inicial </h1>');} 
    else if (req.url === '/sobre'){res.end('<h1>Pagina sobre</h1>');}
    else if (req.url === '/contato'){ res.end('<h1>Pagina contato</h1>');} 
    else{ res.end('<h1>Pagina invalida</h1>');}

});



servidor.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000');
});

