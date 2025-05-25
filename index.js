import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import session from 'express-session';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

function gerarMenu(logado) {
  return `
  <button class="menu-item" onclick="location.href='/'">Home</button>
  <button class="menu-item" onclick="location.href='/cadastro-cliente'">Cadastro de Cliente</button>
    <button class="menu-item" onclick="location.href='/cadastro-fornecedor'">Cadastro de Fornecedor</button>
    ${logado
      ? `<button class="menu-item" onclick="location.href='/logout'">Logout</button>`
      : `<button class="menu-item" onclick="location.href='/login'">Login</button>`
    }
  `;
}

function requireLogin(req, res, next) {
  if (req.session.logado) {
    next();
  } else {
    res.send(`
      <!DOCTYPE html>
      <html lang="pt-br">
      <head>
        <meta charset="UTF-8">
        <title>Acesso Restrito</title>
        <link rel="stylesheet" href="css/style.css">
      </head>
      <body>
        <header>
          <h1>EGAC</h1>
          <p>Empresa de Gestão Agrícola e Comércio</p>
        </header>
        <nav>
          ${gerarMenu(false)}
        </nav>
        <div class="container-cadastro">
          <h2 class="titulo-cadastro" style="color:red; margin-bottom: 10px">Acesso Restrito</h2>
          <p style="text-align:center; font-size:1.2em;">
            Você precisa estar <strong>logado</strong> para cadastrar.<br>
          </p>
          <button class="botao-cadastro" onclick="location.href='/login'">Fazer Login</button>
        </div>
        <footer>
          <p>&copy; 2025 EGAC - Todos os direitos reservados</p>
        </footer>
      </body>
      </html>
    `);
  }
}

app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true
}));

app.use((req, res, next) => {
  if (typeof req.session.logado === 'undefined') {
    req.session.logado = false;
  }
  next();
});

app.use(express.urlencoded({ extended: true }));

app.use('/css', express.static(path.join(__dirname, 'css')));

app.use('/js', express.static(path.join(__dirname, 'js')));

app.get('/', (req, res) => {
  let html = `
    <!DOCTYPE html>
    <html lang="pt-br">

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Home Page</title>
        <link rel="stylesheet" href="css/style.css">
    </head>

    <body>
        <header>
            <h1>EGAC</h1>
            <p>Empresa de Gestão Agrícola e Comércio</p>
        </header>

        <nav>
            ${gerarMenu(req.session.logado)}
        </nav>

        <div class="container">
            <h2>Bem-vindo ao Portal da EGAC</h2>
            <p>
                A <strong>EGAC</strong> é uma inovadora plataforma de e-commerce voltada para o setor agrícola, oferecendo
                uma
                ampla gama de produtos e serviços para agricultores, produtores rurais e empresas do agronegócio.
            </p>
            <p>
                Nosso objetivo é ser referência em excelência, sustentabilidade e responsabilidade no setor agrícola
                brasileiro.
            </p>
            <p>
                Aqui você encontra <strong>insumos, equipamentos, soluções tecnológicas e consultoria especializada</strong>
                para
                impulsionar a produtividade e a gestão sustentável das propriedades rurais.
            </p>
            <p>
                Trabalhamos para conectar produtores e fornecedores, promovendo o desenvolvimento do agronegócio com ética,
                inovação e compromisso ambiental.
            </p>
        </div>

        <footer>
            <p>&copy; 2025 EGAC - Todos os direitos reservados</p>
        </footer>
    </body>

    </html>
    `;
  res.send(html);
});


app.get('/cadastro-cliente', (req, res) => {
  let html = `
    <!DOCTYPE html>
    <html lang="pt-br">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Cadastro de Cliente</title>
      <link rel="stylesheet" href="css/style.css">
    </head>
    <body>
      <header>
        <h1>EGAC</h1>
        <p>Empresa de Gestão Agrícola e Comércio</p>
      </header>
      <nav>
        ${gerarMenu(req.session.logado)}
      </nav>
      <div class="container-cadastro">
        <h2 class="titulo-cadastro">Cadastro de Cliente</h2>
        <form action="/cadastrar-cliente" method="POST">
          <label for="nome" class="label-cadastro">Nome Completo:</label>
          <input type="text" id="nome" name="nome" class="input-cadastro" required>

          <label for="email" class="label-cadastro">E-mail:</label>
          <input type="email" id="email" name="email" class="input-cadastro" required>

          <label for="cpf" class="label-cadastro">CPF:</label>
          <input type="text" id="cpf" name="cpf" maxlength="14" class="input-cadastro" required>

          <label for="telefone" class="label-cadastro">Telefone:</label>
          <input type="tel" id="telefone" name="telefone" class="input-cadastro" required>

          <label for="endereco" class="label-cadastro">Endereço:</label>
          <input type="text" id="endereco" name="endereco" class="input-cadastro" required>

          <label for="senha" class="label-cadastro">Senha:</label>
          <input type="password" id="senha" name="senha" class="input-cadastro" required>

          <button type="submit" class="botao-cadastro">Cadastrar</button>
        </form>
      </div>
      <footer>
        <p>&copy; 2025 EGAC - Todos os direitos reservados</p>
      </footer>
    </body>
    <script src="js/script.js"></script>
    </html>
  `;
  res.send(html);
});

app.post('/cadastrar-cliente', requireLogin, (req, res) => {
  let html = `
    <!DOCTYPE html>
    <html lang="pt-br">

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Função Não Implementada</title>
        <link rel="stylesheet" href="css/style.css">
    </head>

    <body>
        <header>
            <h1>EGAC</h1>
            <p>Empresa de Gestão Agrícola e Comércio</p>
        </header>

        <nav>
            ${gerarMenu(req.session.logado)}
        </nav>

        <div class="container-cadastro">
            <h2 class="titulo-cadastro">Função Não Implementada</h2>
            <p style="text-align:center; font-size:1.2em;">
                Esta funcionalidade não foi implementada, pois não foi solicitada na atividade.
            </p>
        </div>

        <footer>
            <p>&copy; 2025 EGAC - Todos os direitos reservados</p>
        </footer>
    </body>

    </html>
  `;
  res.send(html);
});

app.get('/cadastro-fornecedor', (req, res) => {
  let html = `
    <!DOCTYPE html>
    <html lang="pt-br">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Cadastro de Fornecedor</title>
        <link rel="stylesheet" href="css/style.css">
    </head>
    <body>
        <header>
            <h1>EGAC</h1>
            <p>Empresa de Gestão Agrícola e Comércio</p>
        </header>
        <nav>
            ${gerarMenu(req.session.logado)}
        </nav>
        <div class="container-cadastro">
            <h2 class="titulo-cadastro">Cadastro de Fornecedor</h2>
            <form action="/cadastrar-fornecedor" method="POST">
                <label for="cnpj" class="label-cadastro">CNPJ:</label>
                <input type="text" id="cnpj" name="cnpj" maxlength="18" class="input-cadastro">

                <label for="razao_social" class="label-cadastro">Razão Social ou Nome do Fornecedor:</label>
                <input type="text" id="razao_social" name="razao_social" class="input-cadastro"
                    placeholder="Ex: Moraes & irmãos Ltda">

                <label for="nome_fantasia" class="label-cadastro">Nome Fantasia:</label>
                <input type="text" id="nome_fantasia" name="nome_fantasia" class="input-cadastro"
                    placeholder="Ex: Loja do 1,99">

                <label for="endereco" class="label-cadastro">Endereço:</label>
                <input type="text" id="endereco" name="endereco" class="input-cadastro">

                <label for="cidade" class="label-cadastro">Cidade:</label>
                <input type="text" id="cidade" name="cidade" class="input-cadastro">

                <label for="uf" class="label-cadastro">UF:</label>
                <input type="text" id="uf" name="uf" maxlength="2" class="input-cadastro">

                <label for="cep" class="label-cadastro">CEP:</label>
                <input type="text" id="cep" name="cep" maxlength="9" class="input-cadastro">

                <label for="email" class="label-cadastro">E-mail:</label>
                <input type="email" id="email" name="email" class="input-cadastro">

                <label for="telefone" class="label-cadastro">Telefone:</label>
                <input type="tel" id="telefone" name="telefone" class="input-cadastro">

                <button type="submit" class="botao-cadastro">Cadastrar</button>
            </form>
        </div>
        <footer>
            <p>&copy; 2025 EGAC - Todos os direitos reservados</p>
        </footer>
    </body>
    <script src="js/script.js"></script>
    </html>
  `;
  res.send(html);
});

const empresasCadastradas = [];

app.post('/cadastrar-fornecedor', requireLogin, (req, res) => {
  const campos = [
    { nome: 'cnpj', label: 'CNPJ' },
    { nome: 'razao_social', label: 'Razão Social ou Nome do Fornecedor' },
    { nome: 'nome_fantasia', label: 'Nome Fantasia' },
    { nome: 'endereco', label: 'Endereço' },
    { nome: 'cidade', label: 'Cidade' },
    { nome: 'uf', label: 'UF' },
    { nome: 'cep', label: 'CEP' },
    { nome: 'email', label: 'E-mail' },
    { nome: 'telefone', label: 'Telefone' }
  ];

  const erros = [];
  campos.forEach(campo => {
    if (!req.body[campo.nome] || req.body[campo.nome].trim() === '') {
      erros.push(`O campo "${campo.label}" é obrigatório.`);
    }
  });

  if (erros.length > 0) {
    const errosPorCampo = {};
    campos.forEach((campo, idx) => {
      if (!req.body[campo.nome] || req.body[campo.nome].trim() === '') {
        errosPorCampo[campo.nome] = `O campo "${campo.label}" é obrigatório.`;
      }
    });

    let html = `
    <!DOCTYPE html>
    <html lang="pt-br">

    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Cadastro de Fornecedor</title>
      <link rel="stylesheet" href="css/style.css">
    </head>

    <body>
      <header>
        <h1>EGAC</h1>
        <p>Empresa de Gestão Agrícola e Comércio</p>
      </header>

      <nav>
        ${gerarMenu(req.session.logado)}
      </nav>
      <div class="container-cadastro">
        <h2 class="titulo-cadastro">Cadastro de Fornecedor</h2>
        <form action="/cadastrar-fornecedor" method="POST">
        <label for="cnpj" class="label-cadastro">CNPJ:</label>
        <input type="text" id="cnpj" name="cnpj" maxlength="18" class="input-cadastro" value="${req.body.cnpj || ''}">
        ${errosPorCampo.cnpj ? `<span style="color:red;">${errosPorCampo.cnpj}</span><br>` : ''}

        <label for="razao_social" class="label-cadastro">Razão Social ou Nome do Fornecedor:</label>
        <input type="text" id="razao_social" name="razao_social" class="input-cadastro" placeholder="Ex: Moraes & irmãos Ltda" value="${req.body.razao_social || ''}">
        ${errosPorCampo.razao_social ? `<span style="color:red;">${errosPorCampo.razao_social}</span><br>` : ''}

        <label for="nome_fantasia" class="label-cadastro">Nome Fantasia:</label>
        <input type="text" id="nome_fantasia" name="nome_fantasia" class="input-cadastro" placeholder="Ex: Loja do 1,99" value="${req.body.nome_fantasia || ''}">
        ${errosPorCampo.nome_fantasia ? `<span style="color:red;">${errosPorCampo.nome_fantasia}</span><br>` : ''}

        <label for="endereco" class="label-cadastro">Endereço:</label>
        <input type="text" id="endereco" name="endereco" class="input-cadastro" value="${req.body.endereco || ''}">
        ${errosPorCampo.endereco ? `<span style="color:red;">${errosPorCampo.endereco}</span><br>` : ''}

        <label for="cidade" class="label-cadastro">Cidade:</label>
        <input type="text" id="cidade" name="cidade" class="input-cadastro" value="${req.body.cidade || ''}">
        ${errosPorCampo.cidade ? `<span style="color:red;">${errosPorCampo.cidade}</span><br>` : ''}

        <label for="uf" class="label-cadastro">UF:</label>
        <input type="text" id="uf" name="uf" maxlength="2" class="input-cadastro" value="${req.body.uf || ''}">
        ${errosPorCampo.uf ? `<span style="color:red;">${errosPorCampo.uf}</span><br>` : ''}

        <label for="cep" class="label-cadastro">CEP:</label>
        <input type="text" id="cep" name="cep" maxlength="9" class="input-cadastro" value="${req.body.cep || ''}">
        ${errosPorCampo.cep ? `<span style="color:red;">${errosPorCampo.cep}</span><br>` : ''}

        <label for="email" class="label-cadastro">E-mail:</label>
        <input type="email" id="email" name="email" class="input-cadastro" value="${req.body.email || ''}">
        ${errosPorCampo.email ? `<span style="color:red;">${errosPorCampo.email}</span><br>` : ''}

        <label for="telefone" class="label-cadastro">Telefone:</label>
        <input type="tel" id="telefone" name="telefone" class="input-cadastro" value="${req.body.telefone || ''}">
        ${errosPorCampo.telefone ? `<span style="color:red;">${errosPorCampo.telefone}</span><br>` : ''}

        <button type="submit" class="botao-cadastro">Cadastrar</button>
        </form>
      </div>
      <footer>
            <p>&copy; 2025 EGAC - Todos os direitos reservados</p>
        </footer>
    </body>
    <script src="js/script.js"></script>
    </html>
    `;
    res.send(html);
    return;
  }

  empresasCadastradas.push({
    cnpj: req.body.cnpj,
    razao_social: req.body.razao_social,
    nome_fantasia: req.body.nome_fantasia,
    endereco: req.body.endereco,
    cidade: req.body.cidade,
    uf: req.body.uf,
    cep: req.body.cep,
    email: req.body.email,
    telefone: req.body.telefone
  });

  res.redirect('/fornecedores');
});

app.get('/fornecedores', (req, res) => {
  let html = `
    <!DOCTYPE html>
    <html lang="pt-br">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Empresas Cadastradas</title>
      <link rel="stylesheet" href="css/style.css">
    </head>
    <body>
      <header>
        <h1>EGAC</h1>
        <p>Empresa de Gestão Agrícola e Comércio</p>
      </header>
      <nav>
        ${gerarMenu(req.session.logado)}
      </nav>
      <div class="container-cadastro">
        <h2 class="titulo-cadastro sucesso">Fornecedor cadastrado com sucesso!</h2>
        <div class="botao-sucesso">
          <a href="/cadastro-fornecedor" class="botao-cadastro">Cadastrar outro fornecedor</a>
        </div>
        <hr>
        <h3 class="titulo-cadastro">Empresas já cadastradas:</h3>
        <ul class="lista-empresas">
          ${empresasCadastradas.map(e => `
            <li class="item-empresa">
              <strong>Razão Social:</strong> ${e.razao_social}<br>
              <strong>CNPJ:</strong> ${e.cnpj}<br>
              <strong>Nome Fantasia:</strong> ${e.nome_fantasia}<br>
              <strong>Endereço:</strong> ${e.endereco}<br>
              <strong>Cidade:</strong> ${e.cidade}<br>
              <strong>UF:</strong> ${e.uf}<br>
              <strong>CEP:</strong> ${e.cep}<br>
              <strong>E-mail:</strong> ${e.email}<br>
              <strong>Telefone:</strong> ${e.telefone}
            </li>
          `).join('')}
        </ul>
      </div>
    </body>
    </html>
  `;
  res.send(html);
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'login.html'));
});

app.post('/login', (req, res) => {
  const { usuario, senha } = req.body;

  if (usuario === 'admin' && senha === 'admin') {
    req.session.logado = true;
    res.redirect('/');
  } else {
    const mensagem = 'Usuário ou senha inválidos.';
    const cor = 'red';
    const showMensagem = true;

    res.send(`
    <!DOCTYPE html>
    <html lang="pt-br">
    <head>
      <meta charset="UTF-8">
      <title>Login</title>
      <link rel="stylesheet" href="css/style.css">
    </head>
    <body>
      <header>
        <h1>EGAC</h1>
        <p>Empresa de Gestão Agrícola e Comércio</p>
      </header>
      <nav>
        ${gerarMenu(req.session.logado)}
      </nav>
      <div class="container-cadastro">
        <h2 class="titulo-cadastro">Login</h2>
        <form action="/login" method="POST">
          <label for="usuario" class="label-cadastro">Usuário:</label>
          <input type="text" id="usuario" name="usuario" class="input-cadastro" value="${usuario || ''}" required>
          <br>
          <label for="senha" class="label-cadastro">Senha:</label>
          <input type="password" id="senha" name="senha" class="input-cadastro" required>
          <br>
          ${showMensagem ? `<span style="color:${cor};">${mensagem}</span><br>` : ''}
          <button type="submit" class="botao-cadastro">Entrar</button>
        </form>
      </div>
      <footer>
        <p>&copy; 2025 EGAC - Todos os direitos reservados</p>
      </footer>
    </body>
    </html>
    `);
  }
});

app.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.send(`
    <!DOCTYPE html>
    <html lang="pt-br">
    <head>
      <meta charset="UTF-8">
      <title>Logout</title>
      <link rel="stylesheet" href="css/style.css">
    </head>
    <body>
      <header>
        <h1>EGAC</h1>
        <p>Empresa de Gestão Agrícola e Comércio</p>
      </header>
      <div class="container">
        <h2 style="color:green;">Logout efetuado com sucesso!</h2>
        <a href="/" class="botao-cadastro">Voltar ao menu</a>
      </div>
    </body>
    </html>
    `);
  });
});

app.listen(3000, function () {
  console.log(`Servidor rodando no http://localhost:3000`);
});