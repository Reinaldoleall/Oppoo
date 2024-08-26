function updateTotal() {
    let totalA58 = 0;
    let totalA79 = 0;
    let totalReno11 = 0;
    let totalQuantity = 0;

    document.querySelectorAll('tbody tr').forEach(row => {
        const A58 = parseInt(row.querySelector('.A58').textContent) || 0;
        const A79 = parseInt(row.querySelector('.A79').textContent) || 0;
        const Reno11 = parseInt(row.querySelector('.Reno11').textContent) || 0;
        const quantity = A58 + A79 + Reno11;

        row.querySelector('.quantity').textContent = quantity;

        totalA58 += A58;
        totalA79 += A79;
        totalReno11 += Reno11;
        totalQuantity += quantity;
    });

    document.getElementById('totalA58').textContent = totalA58;
    document.getElementById('totalA79').textContent = totalA79;
    document.getElementById('totalReno11').textContent = totalReno11;
    document.getElementById('totalQuantity').textContent = totalQuantity;
}

function addSale() {
    const vendedor = document.getElementById('vendedor').value;
    const telefone = document.getElementById('telefone').value;
    const quantidade = parseInt(document.getElementById('quantidade').value) || 0;

    const row = document.querySelector(`tr[data-vendedor="${vendedor}"]`);
    const cell = row.querySelector(`.${telefone}`);
    const currentQuantity = parseInt(cell.textContent) || 0;

    const newQuantity = currentQuantity + quantidade;
    cell.textContent = newQuantity;

    updateTotal();
    saveData();
}

function removeSale() {
    const vendedor = document.getElementById('vendedor').value;
    const telefone = document.getElementById('telefone').value;
    const quantidade = parseInt(document.getElementById('quantidade').value) || 0;

    const row = document.querySelector(`tr[data-vendedor="${vendedor}"]`);
    const cell = row.querySelector(`.${telefone}`);
    const currentQuantity = parseInt(cell.textContent) || 0;

    const newQuantity = Math.max(currentQuantity - quantidade, 0);
    cell.textContent = newQuantity;

    updateTotal();
    saveData();
}

function clearTable() {
    document.querySelectorAll('.A58, .A79, .Reno11').forEach(td => td.textContent = '0');
    updateTotal();
    saveData();
}

function shareReport() {
    const table = document.getElementById('salesTable');
    const rows = table.querySelectorAll('tbody tr');
    let report = 'Relatório de vendas:\n\n';
    report += `Data: ${new Date().toLocaleDateString()}\n\n`;

    rows.forEach(row => {
        const vendedor = row.querySelector('td').textContent;
        const A58 = row.querySelector('.A58').textContent;
        const A79 = row.querySelector('.A79').textContent;
        const Reno11 = row.querySelector('.Reno11').textContent;
        const quantity = row.querySelector('.quantity').textContent;

        report += `Vendedor: ${vendedor}\n`;
        report += `A58: ${A58}\n`;
        report += `A79: ${A79}\n`;
        report += `Reno11: ${Reno11}\n`;
        report += `Quantidade Total: ${quantity}\n\n`;
    });

    // Codificando o texto do relatório para a URL
    const encodedReport = encodeURIComponent(report);

    // Criando uma URL para compartilhamento via WhatsApp com o número específico
    const whatsappUrl = `https://api.whatsapp.com/send?phone=5521993872264&text=${encodedReport}`;

    // Abrindo a URL em uma nova janela
    window.open(whatsappUrl, '_blank');
}

function saveData() {
    const data = [];
    const rows = document.querySelectorAll('tbody tr');
    rows.forEach(row => {
        const vendedor = row.getAttribute('data-vendedor');
        const A58 = row.querySelector('.A58').textContent;
        const A79 = row.querySelector('.A79').textContent;
        const Reno11 = row.querySelector('.Reno11').textContent;
        const quantity = row.querySelector('.quantity').textContent;
        data.push({ vendedor, A58, A79, Reno11, quantity });
    });
    localStorage.setItem('salesData', JSON.stringify(data));
}

function loadData() {
    const savedData = localStorage.getItem('salesData');
    if (savedData) {
        const data = JSON.parse(savedData);
        data.forEach(item => {
            const row = document.querySelector(`tr[data-vendedor="${item.vendedor}"]`);
            if (row) {
                row.querySelector('.A58').textContent = item.A58;
                row.querySelector('.A79').textContent = item.A79;
                row.querySelector('.Reno11').textContent = item.Reno11;
                row.querySelector('.quantity').textContent = item.quantity;
            }
        });
        updateTotal();
    }
}

window.onload = loadData;
