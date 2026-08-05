import http from 'http';
import fs from 'fs';

const servidor = http.createServer((req, res) => {

    fs.readFile('pages/index.html', (erro, dados) => {
        
        if(req.url === '/'){
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(dados);
        return;
        }


        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Erro ao carregar o arquivo.');
          

    });

});

servidor.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000');
});