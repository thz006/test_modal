document.addEventListener('DOMContentLoaded', function() {
    // Seleciona todos os botões de configuração
    const configButtons = document.querySelectorAll('.config-box');
    const overlay = document.getElementById('overlay');
    
    // Verifique se elementos foram encontrados
    console.log('Botões de configuração encontrados:', configButtons.length);
    console.log('Overlay encontrado:', overlay !== null);
    
    // Adiciona evento de clique para cada botão de configuração
    configButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Previne propagação do evento (importante para evitar problemas de bolha de eventos)
            e.preventDefault();
            e.stopPropagation();
            
            // Obtém o ID do produto do atributo data-product-id
            const productId = this.getAttribute('data-product-id');
            console.log('Produto clicado:', productId);
            
            // Obtém a caixa do produto pai
            const productBox = this.closest('.kitsetup-products_box');
            
            // Calcula a posição do produto na página
            const rect = productBox.getBoundingClientRect();
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
            
            // Cria um modal para este produto específico
            createAndShowModal(productId, rect.left + scrollLeft, rect.top + scrollTop, productBox.offsetWidth, productBox.offsetHeight);
            
            // Mostra o overlay
            if (overlay) {
                overlay.style.display = 'block';
            } else {
                console.error('Overlay não encontrado');
                // Criar overlay se não existir
                const newOverlay = document.createElement('div');
                newOverlay.id = 'overlay';
                newOverlay.className = 'overlay';
                newOverlay.style.display = 'block';
                document.body.appendChild(newOverlay);
            }
        });
    });
    
    // Função para criar e mostrar o modal na posição correta
    function createAndShowModal(productId, left, top, width, height) {
        console.log('Criando modal para produto', productId, 'em', left, top, width, height);
        
        // Remove qualquer modal existente
        const existingModal = document.querySelector('.active-modal');
        if (existingModal) {
            existingModal.remove();
        }
        
        // Cria um novo modal
        const modal = document.createElement('div');
        modal.className = 'info-modal-container active-modal';
        modal.style.position = 'absolute';
        modal.style.left = left + 'px';
        modal.style.top = top + 'px';
        modal.style.width = width + 'px';
        modal.style.height = height + 'px';
        modal.style.zIndex = '1000';
        modal.style.backgroundColor = '#F6F6F6';
        modal.style.borderRadius = '9px';
        modal.style.padding = '10px';
        modal.style.boxSizing = 'border-box';
        modal.style.display = 'block'; // Garante que o modal esteja visível
        
        // Conteúdo do modal
        modal.innerHTML = `
            <div class="info-modal">
                <div class="close-button" style="text-align: right; cursor: pointer; font-weight: bold;">X</div>
                <h1 class="info-modal-title" style="font-size: 18px; margin-bottom: 10px; text-align: center;">CONFIGURAÇÕES</h1>
                <p class="info-modal-placa-mae" style="font-size: 12px; margin-bottom: 6px;">
                    <img src="../../../../public/assets/img/modal1.png" alt="" class="icons-model" style="width: 16px; vertical-align: middle; margin-right: 5px;">
                    1 x Placa Mae Gigabyte B550M Aorus Elite
                </p>
                <p class="info-modal-placa-de-video" style="font-size: 12px; margin-bottom: 6px;">
                    <img src="../../../../public/assets/img/modal2.png" alt="" class="icons-model" style="width: 16px; vertical-align: middle; margin-right: 5px;">
                    1 x Placa de Video PNY Quadro T400, 4GB
                </p>
                <p class="info-modal-armazenamento" style="font-size: 12px; margin-bottom: 6px;">
                    <img src="../../../../public/assets/img/modal3.png" alt="" class="icons-model" style="width: 16px; vertical-align: middle; margin-right: 5px;">
                    1 x SSD Rover, 512GB, M.2 2280
                </p>
                <p class="info-modal-fonte" style="font-size: 12px; margin-bottom: 6px;">
                    <img src="../../../../public/assets/img/modal4.png" alt="" class="icons-model" style="width: 16px; vertical-align: middle; margin-right: 5px;">
                    1 x Fonte Mancer Thunder 600W 80 Plus Bronze
                </p>
                <p class="info-modal-gabinete" style="font-size: 12px; margin-bottom: 6px;">
                    <img src="../../../../public/assets/img/modal5.png" alt="" class="icons-model" style="width: 16px; vertical-align: middle; margin-right: 5px;">
                    1 x Gabinete Gamer Pouter 3 Lateral De Vidro
                </p>
                <p class="info-modal-alimentacao" style="font-size: 12px; margin-bottom: 6px;">
                    <img src="../../../../public/assets/img/modal6.png" alt="" class="icons-model" style="width: 16px; vertical-align: middle; margin-right: 5px;">
                    1 x Cabo de Força 1.2m, 3 Pinos, Vermelho
                </p>
            </div>
        `;
        
        // Adiciona o modal ao body
        document.body.appendChild(modal);
        console.log('Modal adicionado ao DOM');
        
        // Adiciona evento para fechar o modal
        const closeButton = modal.querySelector('.close-button');
        closeButton.addEventListener('click', function() {
            modal.remove();
            const overlay = document.getElementById('overlay');
            if (overlay) {
                overlay.style.display = 'none';
            }
            console.log('Modal fechado');
        });
        
        // Fechar o modal quando clicar no overlay
        const overlay = document.getElementById('overlay');
        if (overlay) {
            overlay.addEventListener('click', function() {
                modal.remove();
                overlay.style.display = 'none';
                console.log('Modal fechado pelo overlay');
            });
        }
    }
});