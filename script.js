document.addEventListener('DOMContentLoaded', () => {
    const aiList = document.getElementById('ai-list');
    const categoryFilter = document.getElementById('category-filter');
    const jsonFilePath = 'data.json'; // Caminho para o seu arquivo JSON

    let allData = []; // Para armazenar todos os dados

    // Carregar os dados do JSON
    fetch(jsonFilePath)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            allData = data;
            populateCategoryFilter(data);
            renderAIs(data);
        })
        .catch(error => {
            console.error('Erro ao carregar o JSON:', error);
            aiList.innerHTML = '<p>Erro ao carregar os dados. Tente novamente mais tarde.</p>';
        });


        function atualizarNumeroAleatorio() {
            const numeroAleatorio = Math.floor(Math.random() * 9) + 2;
            document.getElementById('random-number').innerText = `Visitantes online: ${numeroAleatorio}`;
        }
        
        // Atualiza o número imediatamente ao carregar a página
        atualizarNumeroAleatorio();
        
        // Atualiza o número a cada 5 segundos
        setInterval(atualizarNumeroAleatorio, 5000);

    // Função para renderizar AIs
    function renderAIs(data) {
        aiList.innerHTML = data.map(item => `
            <div class="ai-card">
                   <a href='${item.imagem}'></a>
                <h2>${item.nome}</h2>
                <p>${item.descricao}</p>
                <p><strong>Categoria:</strong> ${item.categoria}</p>
                <a href="${item.link}" target="_blank">Conhecer IA</a>
            </div>
        `).join('');
    }

    // Função para popular o filtro de categorias
    function populateCategoryFilter(data) {
        const categories = [...new Set(data.map(item => item.categoria))];
        categoryFilter.innerHTML += categories.map(category => `
            <option value="${category}">${category}</option>
        `).join('');
    }

    // Aplicar o filtro quando a categoria for alterada
    categoryFilter.addEventListener('change', () => {
        const selectedCategory = categoryFilter.value;
        const filteredData = selectedCategory
            ? allData.filter(item => item.categoria === selectedCategory)
            : allData;
        renderAIs(filteredData);
    });

    // Modal
    const modal = document.getElementById('modalSugestao');
    const btnAbrirModal = document.querySelector('.btn-enviar-sugestao');
    const btnFecharModal = document.getElementById('fecharModal');
    const btnEnviarSugestao = document.getElementById('enviarSugestao');

    // Abre o modal ao clicar no botão "Enviar Sugestão de IA"
    btnAbrirModal.addEventListener('click', () => {
        modal.style.display = 'flex';  // Exibe o modal
    });

    // Fecha o modal ao clicar no botão "Fechar"
    btnFecharModal.addEventListener('click', () => {
        modal.style.display = 'none';  // Oculta o modal
    });

    // Fecha o modal ao clicar fora do conteúdo do modal
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Lógica para enviar sugestão (apenas exemplo)
    btnEnviarSugestao.addEventListener('click', () => {
        // Aqui você pode adicionar a lógica para enviar os dados
        alert('Sugestão enviada!');
        modal.style.display = 'none';  // Fecha o modal após enviar
    });
});
