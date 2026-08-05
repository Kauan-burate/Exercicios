import http from 'http';
import fs from 'fs';

function servirArquivo(res, caminho) {

    fs.readFile(caminho, (erro, dados) => {

        if (erro) {
            res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
            res.end('<h1>404 — Página não encontrada</h1>');
            return;
        }

        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(dados);

    });
}

const servidor = http.createServer((req, res) => {

    if (req.url === '/') {
        servirArquivo(res, 'pages/index.html');
    }

    else if (req.url === '/sobre') {
        servirArquivo(res, 'pages/sobre.html');
    }
    else if (req.url === '/contato') {
        servirArquivo(res, 'pages/contato.html');
    }


    else {
        res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end('<h1>404 — Página não encontrada</h1>');
    }

});

servidor.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000');
});