import express from "express";


const app = express();
app.use(express.json());
app.use(express.static('public'));

const horaAtual = new Date().toLocaleTimeString('pt-BR');

app.use((req, res, next) => {
    console.log(`[${horaAtual}] ${req.method} ${req.url}`);
    next();
});

app.get('/', async (req, res) => { 
    res.status(200).json({ status: 'ok', sistema: 'Filmes API' });
});

app.get('/api/saude', async (req, res) => {
    res.status(200).json({ status: 'ok', sistema: 'Filmes API', horaAtual });
});

//--------------------------------------------//---------------------------------------------//

app.get('/api/filmes', async (req, res) => {
    const filmes = [
        {
            id: 1,
            titulo: "Interestelar",
            diretor: "Christopher Nolan"
        },
        {
            id: 2,
            titulo: "O Poderoso Chefão",
            diretor: "Francis Ford Coppola"
        },
        {
            id: 3,
            titulo: "Matrix",
            diretor: "Lana Wachowski e Lilly Wachowski"
        }
    ];
    res.json(filmes);
});

app.get('/api/filmes/:id', async (req, res) => {
    const id = Number(req.params.id);

    const filmes = [
        {
            id: 1,
            titulo: "Interestelar",
            diretor: "Christopher Nolan"
        },
        {
            id: 2,
            titulo: "O Poderoso Chefão",
            diretor: "Francis Ford Coppola"
        },
        {
            id: 3,
            titulo: "Matrix",
            diretor: "Lana Wachowski e Lilly Wachowski"
        }
    ];

    const filme = filmes.find(filme => filme.id === id);


    if(!filme){
        res.status(404).json({Erro: 'filme com esse id não existe!'});
        return;
    }
    res.json(filme);


});

app.get('/api/filmes', async (req, res) => {
    const diretor = req.query.diretor;

    const filmes = [
        {
            id: 1,
            titulo: "Interestelar",
            diretor: "Christopher Nolan"
        },
        {
            id: 2,
            titulo: "O Poderoso Chefão",
            diretor: "Francis Ford Coppola"
        },
        {
            id: 3,
            titulo: "Matrix",
            diretor: "Lana Wachowski e Lilly Wachowski"
        }
    ];

    const filmesFiltrados = filmes.filter(filme => filme.diretor === diretor);

    if(!filmesFiltrados){
        res.status(404).json({Erro: 'diretor não existe'});
        return;
    }
    res.json(filmesFiltrados)

});

app.post('/api/filmes', async (req, res) => {
    const {titulo, diretor} = req.body;

    res.status(201).json({
        titulo: 'titulo',
        diretor: 'diretor'
    });

});




//--------------------------------------------//---------------------------------------------//

app.use((req, res) => {
    res.status(404).json({ erro: 'Rota não encontrada' });
});


app.listen(3000, () =>{
    console.log('Servidor rodando em http://localhost:3000');
});