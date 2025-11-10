const form = document.getElementById('formCadastro');

if (form) {
  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const nome = document.getElementById('nome').value.trim();
    const sobrenome = document.getElementById('sobrenome').value.trim();
    const email = document.getElementById('email').value.trim();
    const idade = document.getElementById('idade').value.trim();
    const erro = document.getElementById('erro');

    if (!nome || !sobrenome || !email || !idade) {
      erro.textContent = 'Preencha todos os campos.';
      return;
    }

    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexEmail.test(email)) {
      erro.textContent = 'Email inválido.';
      return;
    }

    erro.textContent = '';
    const dados = { nome, sobrenome, email, idade };
    localStorage.setItem('dadosCadastro', JSON.stringify(dados));
    window.location.href = 'confirmation.html';
  });
}

function carregarDadosConfirmacao() {
  const texto = localStorage.getItem('dadosCadastro');
  if (!texto) {
    window.location.href = 'form.html';
    return;
  }
  const dados = JSON.parse(texto);
  document.getElementById('confNome').textContent = dados.nome;
  document.getElementById('confSobrenome').textContent = dados.sobrenome;
  document.getElementById('confEmail').textContent = dados.email;
  document.getElementById('confIdade').textContent = dados.idade;
}

function voltarEdicao() {
  window.location.href = 'form.html';
}

function baixarDados() {
  const texto = localStorage.getItem('dadosCadastro');
  if (texto) {
    const dados = JSON.parse(texto);
    const jsonFormatado = JSON.stringify(dados, null, 2); // JSON bonito e identado
    const blob = new Blob([jsonFormatado], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'lucas_paredes_braga.json';
    link.click();
    localStorage.removeItem('dadosCadastro');
    alert('✅ Dados baixados com sucesso!');
    window.location.href = 'index.html';
  }
}
