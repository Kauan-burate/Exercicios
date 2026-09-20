async function carregarDashboard() {

    const resposta = await fetch('/api/consultas');

    const consultas = await resposta.json();

    document.getElementById('total').textContent =
        consultas.length;

    document.getElementById('agendadas').textContent =
        consultas.filter(c => c.status === 'agendada').length;

    document.getElementById('realizadas').textContent =
        consultas.filter(c => c.status === 'realizada').length;

    document.getElementById('canceladas').textContent =
        consultas.filter(c => c.status === 'cancelada').length;
}

carregarDashboard();