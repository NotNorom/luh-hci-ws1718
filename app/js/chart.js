var ctx = document.getElementById("graph").getContext('2d');
var chart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ["leicht", "schwer", "langsam", "schnell", "interessant"],
        datasets: [{
            label: 'Anzahl Stimmen',
            data: [0, 0, 0, 0, 0],
            backgroundColor: [
                'rgba(92, 107, 192, 0.6)',
                'rgba(121, 134, 203, 0.6)',
                'rgba(239, 83, 80, 0.6)',
                'rgba(229, 115, 115, 0.6)',
                'rgba(102, 187, 106, 0.6)'
            ],
            borderColor: [
                'rgba(92, 107, 192, 1)',
                'rgba(121, 134, 203, 1)',
                'rgba(239, 83, 80, 1)',
                'rgba(229, 115, 115, 1)',
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