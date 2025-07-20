// Energy Calculator - Chart Management Module

const ChartManager = {
    // Store chart instances
    charts: {},
    
    // Initialize all static charts
    initializeCharts() {
        // Set Chart.js defaults
        Chart.defaults.color = '#8892b0';
        Chart.defaults.borderColor = 'rgba(136, 146, 176, 0.1)';
        
        // Mobile-friendly defaults
        Chart.defaults.font.size = window.innerWidth < 768 ? 10 : 12;
        Chart.defaults.plugins.legend.labels.font.size = window.innerWidth < 768 ? 10 : 12;
        
        // Initialize each chart
        this.createMainBreakdownChart();
        this.createCategoryChart();
        this.createHiddenVsVisibleChart();
        this.createDigitalDetailChart();
        this.createHomeChart();
        this.createEquivalentChart();
        this.createAnnualChart();
    },
    
    // Main Breakdown Chart
    createMainBreakdownChart() {
        const ctx = document.getElementById('mainBreakdownChart').getContext('2d');
        const data = EnergyConfig.staticChartData.mainBreakdown;
        
        this.charts.mainBreakdown = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: data.labels,
                datasets: [{
                    label: 'Daily kWh',
                    data: data.data,
                    backgroundColor: data.colors
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                aspectRatio: window.innerWidth < 768 ? 1.5 : 2,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            afterLabel: function(context) {
                                const value = context.parsed.y;
                                const total = 130;
                                const percentage = ((value / total) * 100).toFixed(1);
                                return percentage + '% of daily total';
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        grid: {
                            display: false
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Daily Energy (kWh)'
                        }
                    }
                }
            }
        });
    },
    
    // Category Pie Chart
    createCategoryChart() {
        const ctx = document.getElementById('categoryChart').getContext('2d');
        const data = EnergyConfig.staticChartData.categoryData;
        const colors = EnergyConfig.colors;
        
        this.charts.category = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: data.labels,
                datasets: [{
                    data: data.data,
                    backgroundColor: [
                        colors.home,
                        colors.transport,
                        colors.digital,
                        colors.food,
                        colors.goods
                    ],
                    borderWidth: 2,
                    borderColor: '#0a0e27'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                aspectRatio: 1.5,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            padding: 15
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return context.label + ': ' + context.parsed + ' kWh/day';
                            }
                        }
                    }
                }
            }
        });
    },
    
    // Hidden vs Visible Energy Chart
    createHiddenVsVisibleChart() {
        const ctx = document.getElementById('hiddenChart').getContext('2d');
        const data = EnergyConfig.staticChartData.hiddenVsVisible;
        const colors = EnergyConfig.colors;
        
        this.charts.hiddenVisible = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: data.labels,
                datasets: [
                    {
                        label: 'Visible (Direct)',
                        data: data.visible,
                        backgroundColor: colors.visible
                    },
                    {
                        label: 'Hidden (Infrastructure)',
                        data: data.hidden,
                        backgroundColor: colors.hidden
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                aspectRatio: 1.5,
                scales: {
                    x: {
                        stacked: true
                    },
                    y: {
                        stacked: true,
                        title: {
                            display: true,
                            text: 'kWh per day'
                        }
                    }
                }
            }
        });
    },
    
    // Digital Infrastructure Detail Chart
    createDigitalDetailChart() {
        const ctx = document.getElementById('digitalDetailChart').getContext('2d');
        const data = EnergyConfig.staticChartData.digitalInfrastructure;
        const colors = EnergyConfig.colors;
        
        this.charts.digitalDetail = new Chart(ctx, {
            type: 'radar',
            data: {
                labels: data.labels,
                datasets: [{
                    label: 'Infrastructure Load',
                    data: data.data,
                    borderColor: colors.digital,
                    backgroundColor: 'rgba(100, 255, 218, 0.1)',
                    pointBackgroundColor: colors.digital
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                aspectRatio: 1.5,
                scales: {
                    r: {
                        beginAtZero: true,
                        max: 100,
                        ticks: {
                            stepSize: 20
                        },
                        pointLabels: {
                            font: {
                                size: 11
                            }
                        }
                    }
                }
            }
        });
    },
    
    // Home Energy Profile Chart
    createHomeChart() {
        const ctx = document.getElementById('homeChart').getContext('2d');
        const data = EnergyConfig.staticChartData.homeProfile;
        
        this.charts.home = new Chart(ctx, {
            type: 'polarArea',
            data: {
                labels: data.labels,
                datasets: [{
                    data: data.data,
                    backgroundColor: [
                        'rgba(251, 146, 60, 0.7)',
                        'rgba(34, 197, 94, 0.7)',
                        'rgba(100, 255, 218, 0.7)',
                        'rgba(168, 85, 247, 0.7)',
                        'rgba(94, 234, 212, 0.7)',
                        'rgba(239, 68, 68, 0.7)',
                        'rgba(255, 165, 0, 0.7)'
                    ],
                    borderWidth: 1,
                    borderColor: '#0a0e27'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                aspectRatio: 1.5,
                plugins: {
                    legend: {
                        position: 'right',
                        labels: {
                            font: {
                                size: 11
                            }
                        }
                    }
                }
            }
        });
    },
    
    // Equivalent Energy Chart
    createEquivalentChart() {
        const ctx = document.getElementById('equivalentChart').getContext('2d');
        const data = EnergyConfig.staticChartData.equivalents;
        const colors = EnergyConfig.colors;
        
        this.charts.equivalent = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: data.labels,
                datasets: [{
                    label: 'Equivalent Units',
                    data: data.data,
                    backgroundColor: [
                        colors.transport,
                        colors.ai,
                        colors.digital,
                        colors.home,
                        colors.ai
                    ]
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                aspectRatio: window.innerWidth < 768 ? 1.5 : 2,
                indexAxis: 'y',
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Equivalent Energy Units'
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        });
    },
    
    // Annual Variation Chart
    createAnnualChart() {
        const ctx = document.getElementById('annualChart').getContext('2d');
        const data = EnergyConfig.staticChartData.annualVariation;
        const colors = EnergyConfig.colors;
        
        this.charts.annual = new Chart(ctx, {
            type: 'line',
            data: {
                labels: data.labels,
                datasets: [
                    {
                        label: 'Home Energy',
                        data: data.home,
                        borderColor: colors.home,
                        backgroundColor: 'rgba(251, 146, 60, 0.1)',
                        tension: 0.4
                    },
                    {
                        label: 'Transportation',
                        data: data.transport,
                        borderColor: colors.transport,
                        backgroundColor: 'rgba(168, 85, 247, 0.1)',
                        tension: 0.4
                    },
                    {
                        label: 'Digital',
                        data: data.digital,
                        borderColor: colors.digital,
                        backgroundColor: 'rgba(100, 255, 218, 0.1)',
                        tension: 0.4
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                aspectRatio: 2.5,
                interaction: {
                    mode: 'index',
                    intersect: false
                },
                scales: {
                    y: {
                        title: {
                            display: true,
                            text: 'Daily kWh'
                        }
                    }
                },
                plugins: {
                    legend: {
                        position: 'bottom'
                    },
                    title: {
                        display: true,
                        text: 'Seasonal Variations in Major Categories'
                    }
                }
            }
        });
    },
    
    // Create or update personal results chart
    createPersonalChart(data) {
        const ctx = document.getElementById('personalChart').getContext('2d');
        const colors = EnergyConfig.colors;
        
        // Destroy existing chart if it exists
        if (this.charts.personal) {
            this.charts.personal.destroy();
        }
        
        // Create new chart
        this.charts.personal = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Digital Life', 'Transportation', 'Home Energy', 'Food & Lifestyle'],
                datasets: [{
                    data: [
                        data.digital.toFixed(1),
                        data.transport.toFixed(1),
                        data.home.toFixed(1),
                        data.lifestyle.toFixed(1)
                    ],
                    backgroundColor: [
                        colors.digital,
                        colors.transport,
                        colors.home,
                        colors.food
                    ],
                    borderWidth: 2,
                    borderColor: '#0a0e27'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                aspectRatio: window.innerWidth < 768 ? 1.5 : 2,
                plugins: {
                    legend: {
                        position: 'right',
                        labels: {
                            padding: 15,
                            font: {
                                size: 12
                            }
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const label = context.label || '';
                                const value = context.parsed;
                                const total = context.dataset.data.reduce((a, b) => parseFloat(a) + parseFloat(b), 0);
                                const percentage = ((value / total) * 100).toFixed(1);
                                return label + ': ' + value + ' kWh (' + percentage + '%)';
                            }
                        }
                    },
                    title: {
                        display: true,
                        text: 'Your Personal Energy Breakdown',
                        color: colors.digital,
                        font: {
                            size: 16
                        }
                    }
                }
            }
        });
    }
};