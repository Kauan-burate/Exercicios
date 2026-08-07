import http from 'http';
import fs from 'fs';

function servirArquivo(res, caminho, status = 200) {
    fs.readFile(caminho, (erro, dados) => {
        if (erro) {
            res.writeHead(404, {'Content-Type': 'text/html; charset=utf-8'});
            res.end('Página não encontrada');
            return;
        }

        res.writeHead(status, {
            'Content-Type': 'text/html; charset=utf-8'
        });
        res.end(dados);
    });
}


const servidor = http.createServer((req, res) =>{
    if(req.url === '/'){
        servirArquivo(res, 'index.html', 200);
    } else{
        servirArquivo(res, '404.html', 404);
    }
    
});

servidor.listen(3000, () =>{
    console.log('Servidor rodando em http://localhost:3000');
});
