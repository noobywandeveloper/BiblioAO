// Botão Voltar ao topo da pagina
const btnTopo = document.getElementById("btn-topo");

window.onscroll = function() {
  scrollFunction();
};

function scrollFunction() {

  if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
    btnTopo.style.display = "block";
  } else {
    btnTopo.style.display = "none";
  }
}

btnTopo.addEventListener("click", function() {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});


/*Mapa interativo */

document.addEventListener("DOMContentLoaded", function () {
    // Verifica se a div do mapa existe na página atual antes de rodar o script
    const mapaDiv = document.getElementById("mapa-biblioteca");
    
    if (mapaDiv) {
        // Coordenadas aproximadas para Luanda Sul, Projecto Morar
        // Latitude: -8.9220, Longitude: 13.1815
        const lat = -8.9220;
        const lng = 13.1815;

        // 1. Inicializa o mapa com foco na coordenada e zoom adequado (15)
        const mapa = L.map('mapa-biblioteca').setView([lat, lng], 15);

        // 2. Carrega as imagens de mapa do OpenStreetMap (Camada Visual)
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(mapa);

        // 3. Cria um marcador (pino) no local exato
        const marcador = L.marker([lat, lng]).addTo(mapa);

        // 4. Adiciona um balão de informação ao clicar no pino
        marcador.bindPopup(`
            <div style="font-family: sans-serif; line-height: 1.4;">
                <strong style="color: #d4af37;">BiblioAO</strong><br>
                Projecto Morar, Luanda Sul<br>
                <small>Segunda a Sexta: 8h às 17h</small>
            </div>
        `).openPopup(); // Abre o balão automaticamente ao carregar
    }
});


/*Pesquisas e filtragem*/ 
document.addEventListener("DOMContentLoaded", function () {
    
   
    const barraPesquisa = document.querySelector(".pesquisa-form input");
    const formPesquisa = document.querySelector(".pesquisa-form");
    const botoesFiltro = document.querySelectorAll(".filtro-btn");
    const cartoesLivros = document.querySelectorAll(".livro-card");

   
    let filtroAtual = "todos";
    let termoPesquisa = "";

    
    if (!barraPesquisa || cartoesLivros.length === 0) return;

   
    function aplicarFiltros() {
        cartoesLivros.forEach(function (card) {
            
            const categoriaTexto = card.querySelector(".livro-cat").textContent.toLowerCase();
            const tituloTexto = card.querySelector(".livro-titulo").textContent.toLowerCase();
            const autorTexto = card.querySelector(".livro-autor").textContent.toLowerCase();

           
            const correspondeFiltro = (filtroAtual === "todos" || categoriaTexto.includes(filtroAtual.toLowerCase()));

            
            const correspondePesquisa = (tituloTexto.includes(termoPesquisa) || autorTexto.includes(termoPesquisa));

           
            if (correspondeFiltro && correspondePesquisa) {
                card.style.display = "flex"; 
            } else {
                card.style.display = "none"; 
            }
        });
    }

   
    barraPesquisa.addEventListener("input", function (e) {
        termoPesquisa = e.target.value.toLowerCase().trim();
        aplicarFiltros();
    });

    // Evita que a página recarregue ao clicar no botão "Pesquisar" ou dar Enter
    formPesquisa.addEventListener("submit", function (e) {
        e.preventDefault();
    });


   
    botoesFiltro.forEach(function (botao) {
        botao.addEventListener("click", function (e) {
            e.preventDefault();

          
            botoesFiltro.forEach(btn => btn.classList.remove("ativo"));
            botao.classList.add("ativo");

           
            filtroAtual = botao.getAttribute("data-filtro");

           
            aplicarFiltros();
        });
    });
});

// FILTRAGEM DINÂMICA DO BLOG
document.addEventListener("DOMContentLoaded", function () {
    const botoesBlog = document.querySelectorAll(".filtro-blog-btn");
    const artigosBlog = document.querySelectorAll(".artigo-card");

    // Verifica se estamos na página do blog antes de executar
    if (botoesBlog.length === 0 || artigosBlog.length === 0) return;

    botoesBlog.forEach(function (botao) {
        botao.addEventListener("click", function (e) {
            e.preventDefault();

            // Alterar o estado visual do botão ativo
            botoesBlog.forEach(btn => btn.classList.remove("ativo"));
            botao.classList.add("ativo");

            const filtro = botao.getAttribute("data-filtro").toLowerCase();

            artigosBlog.forEach(function (artigo) {
                // Captura o texto dentro da tag do artigo (ex: "Entrevista", "Resenha")
                const tagArtigo = artigo.querySelector(".artigo-tag").textContent.toLowerCase();

                // Regra de plural/singular simples para bater os filtros (ex: "Resenhas" -> "resenha")
                const filtroSingular = filtro.endsWith('s') ? filtro.slice(0, -1) : filtro;

                if (filtro === "todos" || tagArtigo.includes(filtroSingular)) {
                    artigo.style.display = "flex"; // Mantém a estrutura de layout flexível do artigo
                } else {
                    artigo.style.display = "none";  // Oculta o artigo
                }
            });
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const toggleBtn = document.getElementById('btn-tema');
    const html = document.documentElement;
  
    if (!toggleBtn) {
      console.warn('Botão #btn-tema não encontrado');
      return;
    }
  
    // Carregar preferência salva
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      html.classList.add('dark-mode');
      toggleBtn.textContent = '☀️ Claro';
    } else {
      toggleBtn.textContent = '🌙 Escuro';
    }
  
    // Alternar ao clicar
    toggleBtn.addEventListener('click', function() {
      const isDark = html.classList.toggle('dark-mode');
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
      toggleBtn.textContent = isDark ? '☀️ Claro' : '🌙 Escuro';
    });
  });


// VALIDAÇÃO DE FORMULÁRIOS


// -------------------- UTILITÁRIOS --------------------
function validarEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function criarContainerErro(form) {
  let container = form.querySelector('.erros-validacao');
  if (!container) {
      container = document.createElement('div');
      container.className = 'erros-validacao';
      container.style.color = '#b91c1c';
      container.style.marginBottom = '1rem';
      container.style.padding = '0.5rem 1rem';
      container.style.borderRadius = '6px';
      container.style.backgroundColor = '#fee2e2';
      container.style.border = '1px solid #f87171';
      container.style.display = 'none';
      // Insere antes do botão de submit
      const btn = form.querySelector('button[type="submit"]');
      if (btn) form.insertBefore(container, btn);
      else form.appendChild(container);
  }
  return container;
}

function exibirErros(form, erros) {
  const container = criarContainerErro(form);
  if (erros.length === 0) {
      container.style.display = 'none';
      container.innerHTML = '';
      return;
  }
  container.style.display = 'block';
  container.innerHTML = '<strong>Por favor, corrija os seguintes erros:</strong><ul style="margin: 0.5rem 0 0 1.2rem; padding: 0;">' +
      erros.map(e => `<li>${e}</li>`).join('') +
      '</ul>';
}

function limparErros(form) {
  const container = form.querySelector('.erros-validacao');
  if (container) {
      container.style.display = 'none';
      container.innerHTML = '';
  }
}

// -------------------- NEWSLETTER --------------------
const formNewsletter = document.querySelector('.nl-form');
if (formNewsletter) {
  formNewsletter.addEventListener('submit', function (e) {
      e.preventDefault(); // Impede o envio para validar

      const nome = this.querySelector('input[name="nome"]');
      const email = this.querySelector('input[name="email"]');
      const erros = [];

      // Valida nome
      const nomeValor = nome.value.trim();
      if (nomeValor.length < 2) {
          erros.push('O nome deve ter pelo menos 2 caracteres.');
      }

      // Valida email
      const emailValor = email.value.trim();
      if (!validarEmail(emailValor)) {
          erros.push('Introduza um endereço de email válido (ex: nome@dominio.ao).');
      }

      if (erros.length > 0) {
          exibirErros(this, erros);
      } else {
          limparErros(this);
          // Se tudo estiver válido, podes enviar ou mostrar mensagem de sucesso
          alert('📬 Subscrição realizada com sucesso! (simulação)');
          // this.submit(); // Descomenta se quiseres enviar realmente
      }
  });

  // Limpa erros ao digitar (opcional)
  formNewsletter.querySelectorAll('input').forEach(input => {
      input.addEventListener('input', function () {
          limparErros(formNewsletter);
      });
  });
}

// -------------------- CONTACTOS --------------------
const formContactos = document.querySelector('.contactos-grid form');
if (formContactos) {
  formContactos.addEventListener('submit', function (e) {
      e.preventDefault();

      const nome = this.querySelector('#nome');
      const email = this.querySelector('#email');
      const assunto = this.querySelector('#assunto');
      const mensagem = this.querySelector('#mensagem');
      const erros = [];

      // Valida nome
      const nomeValor = nome.value.trim();
      if (nomeValor.length < 2) {
          erros.push('O nome deve ter pelo menos 2 caracteres.');
      }

      // Valida email
      const emailValor = email.value.trim();
      if (!validarEmail(emailValor)) {
          erros.push('Introduza um endereço de email válido.');
      }

      // Valida assunto (selecionado)
      if (!assunto.value || assunto.value === '') {
          erros.push('Selecione um assunto.');
      }

      // Valida mensagem
      const mensagemValor = mensagem.value.trim();
      if (mensagemValor.length < 10) {
          erros.push('A mensagem deve ter pelo menos 10 caracteres.');
      }

      if (erros.length > 0) {
          exibirErros(this, erros);
      } else {
          limparErros(this);
          alert('📩 Mensagem enviada com sucesso! (simulação)');
          // this.submit();
      }
  });

  // Limpa erros ao interagir com os campos
  formContactos.querySelectorAll('input, select, textarea').forEach(campo => {
      campo.addEventListener('input', function () {
          limparErros(formContactos);
      });
      campo.addEventListener('change', function () {
          limparErros(formContactos);
      });
  });
}