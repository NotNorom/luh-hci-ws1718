var ctx, chart;

function createChart() {
    ctx = document.getElementById("graph").getContext('2d');
    chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ["interessant", "leicht", "schwer", "langsam", "schnell"],
            datasets: [{
                label: 'Anzahl Stimmen',
                data: [0, 0, 0, 0, 0],
                backgroundColor: [
                    'rgba(92, 107, 192, 0.6)',
                    'rgba(126,87,194 ,0.6)',
                    'rgba(239, 83, 80, 0.6)',
                    'rgba(255,112,67 ,0.6)',
                    'rgba(102, 187, 106, 0.6)'
                ],
                borderColor: [
                    'rgba(92, 107, 192, 1)',
                    'rgba(126,87,194 ,1)',
                    'rgba(239, 83, 80, 1)',
                    'rgba(255,112,67 ,1)',
                    'rgba(102, 187, 106, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                    }
                }]
            }
        }
    });
}



