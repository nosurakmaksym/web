let analyticsChart = null;
let currentChartType = 'bar';

function renderChart(products) {
    const ctx = document.getElementById('analyticsChart').getContext('2d');
    const labels = products.map(p => p.name.replace('Відеокарта ', ''));
    const dataValues = products.map(p => p.popularity);

    if (analyticsChart) {
        analyticsChart.destroy();
    }
 
    analyticsChart = new Chart(ctx, {
        type: currentChartType,
        data: {
            labels: labels,
            datasets: [{
                label: 'Популярність товару (із 100)',
                data: dataValues,
                backgroundColor: ['rgba(255, 105, 0, 0.7)', 'rgba(54, 162, 235, 0.7)', 'rgba(255, 206, 86, 0.7)', 'rgba(75, 192, 192, 0.7)', 'rgba(153, 102, 255, 0.7)', 'rgba(231, 76, 60, 0.7)'],
                borderColor: ['rgba(255, 105, 0, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(231, 76, 60, 1)'],
                borderWidth: 1,
                fill: currentChartType === 'line' ? false : true,
                tension: 0.3
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: currentChartType !== 'pie' ? {
                y: { beginAtZero: true, max: 100, title: { display: true, text: 'Рейтинг популярності' } }
            } : {}
        }
    });
}

function initChartControls() {
    const chartSelector = document.getElementById('chart-type-selector');
    if (chartSelector) {
        chartSelector.addEventListener('change', (e) => {
            currentChartType = e.target.value;
            renderChart(currentFilteredProducts);
        });
    }
}