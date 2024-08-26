// Função para abrir e fechar o menu
function toggleMenu() {
    const sidebar = document.getElementById('sidebar');
    sidebar.style.left = (sidebar.style.left === '0px') ? '-250px' : '0px';
}

// Função para fechar o menu ao clicar em um item
function closeMenu() {
    document.getElementById('sidebar').style.left = '-250px'; // Oculta o menu ao clicar em um item
}

// Captura o evento de pressionar a tecla "Back" no Android ou "Escape" no navegador
document.addEventListener('keydown', function(event) {
    // Verifica se a tecla pressionada é "Back" (código 27) ou "Escape"
    if (event.key === 'Back' || event.key === 'Escape') {
        const sidebar = document.getElementById('sidebar');
        
        // Verifica se a barra lateral está aberta
        if (sidebar.style.left === '0px') {
            // Recolhe a barra lateral
            sidebar.style.left = '-250px';
            event.preventDefault(); // Evita que o botão voltar faça a navegação padrão
        } else {
            // Permite a navegação padrão se a barra lateral estiver fechada
            window.history.back();
        }
    }
});

// Opção alternativa usando o evento 'popstate' para lidar com o botão "Voltar" nos dispositivos móveis
window.addEventListener('popstate', function(event) {
    const sidebar = document.getElementById('sidebar');
    
    if (sidebar.style.left === '0px') {
        // Se a barra lateral estiver aberta, fecha ela em vez de navegar para a página anterior
        sidebar.style.left = '-250px';
        event.preventDefault(); // Evita a navegação padrão
        history.pushState(null, null, location.href); // Evita que o evento popstate seja acionado continuamente
    }
});
