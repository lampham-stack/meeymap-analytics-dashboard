// ===== Navigation & Page Switching =====
function initNavigation() {
    const navTabs = document.querySelectorAll('.nav-tab');
    const pages = document.querySelectorAll('.page');

    navTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetPage = tab.dataset.page;

            // Update active tab
            navTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            // Update active page
            pages.forEach(p => p.classList.remove('active'));
            document.getElementById(targetPage).classList.add('active');
        });
    });
}

// ===== Chart.js Global Configuration =====
Chart.defaults.color = '#d1d5db';
Chart.defaults.borderColor = 'rgba(255, 255, 255, 0.08)';
Chart.defaults.font.family = "'Inter', sans-serif";
Chart.defaults.plugins.legend.labels.usePointStyle = true;
Chart.defaults.plugins.legend.labels.padding = 15;
Chart.defaults.plugins.tooltip.backgroundColor = 'rgba(17, 24, 39, 0.95)';
Chart.defaults.plugins.tooltip.borderColor = 'rgba(255, 255, 255, 0.15)';
Chart.defaults.plugins.tooltip.borderWidth = 1;
Chart.defaults.plugins.tooltip.cornerRadius = 8;
Chart.defaults.plugins.tooltip.padding = 12;

// ===== Page 1: P&L & Marketing Efficiency Charts =====

// Waterfall Chart - App Install Model
function createWaterfallChart() {
    const ctx = document.getElementById('waterfallChart').getContext('2d');

    const data = {
        labels: ['Total Revenue (IAP + Ads)', 'Facebook UA', 'Google UAC', 'TikTok Ads', 'ASO & Organic', 'Influencer Marketing', 'Net Profit'],
        datasets: [{
            label: 'Dòng tiền',
            data: [1250000, -285000, -180000, -120000, -45000, -75000, 545000],
            backgroundColor: [
                'rgba(16, 185, 129, 0.8)',
                'rgba(239, 68, 68, 0.8)',
                'rgba(239, 68, 68, 0.8)',
                'rgba(239, 68, 68, 0.8)',
                'rgba(239, 68, 68, 0.8)',
                'rgba(239, 68, 68, 0.8)',
                'rgba(16, 185, 129, 0.8)'
            ],
            borderColor: [
                'rgba(16, 185, 129, 1)',
                'rgba(239, 68, 68, 1)',
                'rgba(239, 68, 68, 1)',
                'rgba(239, 68, 68, 1)',
                'rgba(239, 68, 68, 1)',
                'rgba(239, 68, 68, 1)',
                'rgba(16, 185, 129, 1)'
            ],
            borderWidth: 2,
            borderRadius: 8
        }]
    };

    new Chart(ctx, {
        type: 'bar',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function (context) {
                            let label = context.dataset.label || '';
                            if (label) {
                                label += ': ';
                            }
                            label += '$' + Math.abs(context.parsed.y).toLocaleString();
                            return label;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function (value) {
                            return '$' + (value / 1000) + 'K';
                        }
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.05)'
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
}

// Trend Chart - Revenue vs UA Spend
function createTrendChart() {
    const ctx = document.getElementById('trendChart').getContext('2d');

    const labels = ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11', 'T12'];

    const data = {
        labels: labels,
        datasets: [
            {
                label: 'Revenue (IAP + Ads)',
                data: [920000, 980000, 1050000, 1100000, 1150000, 1180000, 1210000, 1240000, 1250000, 1280000, 1300000, 1250000],
                borderColor: 'rgb(16, 185, 129)',
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                pointRadius: 5,
                pointHoverRadius: 7,
                pointBackgroundColor: 'rgb(16, 185, 129)',
                pointBorderColor: '#0a0e1a',
                pointBorderWidth: 2
            },
            {
                label: 'UA Spend',
                data: [280000, 295000, 310000, 330000, 345000, 360000, 380000, 395000, 420000, 440000, 460000, 420000],
                borderColor: 'rgb(239, 68, 68)',
                backgroundColor: 'rgba(239, 68, 68, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                pointRadius: 5,
                pointHoverRadius: 7,
                pointBackgroundColor: 'rgb(239, 68, 68)',
                pointBorderColor: '#0a0e1a',
                pointBorderWidth: 2
            }
        ]
    };

    new Chart(ctx, {
        type: 'line',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                mode: 'index',
                intersect: false,
            },
            plugins: {
                legend: {
                    display: true,
                    position: 'top',
                },
                tooltip: {
                    callbacks: {
                        label: function (context) {
                            let label = context.dataset.label || '';
                            if (label) {
                                label += ': ';
                            }
                            label += '$' + context.parsed.y.toLocaleString();
                            return label;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function (value) {
                            return '$' + (value / 1000) + 'K';
                        }
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.05)'
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
}

// ROAS by Channel Chart - UA Channels
function createROASChannelChart() {
    const ctx = document.getElementById('roasChannelChart').getContext('2d');

    const data = {
        labels: ['Facebook UA', 'Google UAC', 'TikTok Ads', 'Apple Search Ads', 'Influencer'],
        datasets: [{
            label: 'ROAS',
            data: [3.2, 2.8, 2.5, 3.8, 2.1],
            backgroundColor: [
                'rgba(99, 102, 241, 0.8)',
                'rgba(139, 92, 246, 0.8)',
                'rgba(236, 72, 153, 0.8)',
                'rgba(16, 185, 129, 0.8)',
                'rgba(245, 158, 11, 0.8)'
            ],
            borderColor: [
                'rgb(99, 102, 241)',
                'rgb(139, 92, 246)',
                'rgb(236, 72, 153)',
                'rgb(16, 185, 129)',
                'rgb(245, 158, 11)'
            ],
            borderWidth: 2,
            borderRadius: 8
        }]
    };

    new Chart(ctx, {
        type: 'bar',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            indexAxis: 'y',
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function (context) {
                            return 'ROAS: ' + context.parsed.x.toFixed(1) + 'x';
                        }
                    }
                }
            },
            scales: {
                x: {
                    beginAtZero: true,
                    ticks: {
                        callback: function (value) {
                            return value + 'x';
                        }
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.05)'
                    }
                },
                y: {
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
}

// UA Spend Breakdown Chart
function createCostBreakdownChart() {
    const ctx = document.getElementById('costBreakdownChart').getContext('2d');

    const data = {
        labels: ['Facebook UA', 'Google UAC', 'TikTok Ads', 'Apple Search Ads', 'Influencer'],
        datasets: [{
            label: 'UA Spend',
            data: [285000, 180000, 120000, 95000, 75000],
            backgroundColor: [
                'rgba(99, 102, 241, 0.8)',
                'rgba(139, 92, 246, 0.8)',
                'rgba(236, 72, 153, 0.8)',
                'rgba(16, 185, 129, 0.8)',
                'rgba(245, 158, 11, 0.8)'
            ],
            borderColor: [
                'rgb(99, 102, 241)',
                'rgb(139, 92, 246)',
                'rgb(236, 72, 153)',
                'rgb(16, 185, 129)',
                'rgb(245, 158, 11)'
            ],
            borderWidth: 2
        }]
    };

    new Chart(ctx, {
        type: 'doughnut',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                },
                tooltip: {
                    callbacks: {
                        label: function (context) {
                            let label = context.label || '';
                            if (label) {
                                label += ': ';
                            }
                            label += '$' + context.parsed.toLocaleString();
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = ((context.parsed / total) * 100).toFixed(1);
                            label += ' (' + percentage + '%)';
                            return label;
                        }
                    }
                }
            }
        }
    });
}

// ===== Page 2: Customer Acquisition & Conversion Funnel Charts =====

// Funnel Chart - App Install Funnel
function createFunnelChart() {
    const ctx = document.getElementById('funnelChart').getContext('2d');

    const data = {
        labels: ['Impressions', 'Clicks', 'Installs', 'Registrations', 'Active Users', 'Paying Users'],
        datasets: [{
            label: 'Số lượng',
            data: [2850000, 285000, 98500, 45280, 18650, 4012],
            backgroundColor: [
                'rgba(99, 102, 241, 0.8)',
                'rgba(139, 92, 246, 0.8)',
                'rgba(236, 72, 153, 0.8)',
                'rgba(245, 158, 11, 0.8)',
                'rgba(16, 185, 129, 0.8)',
                'rgba(34, 197, 94, 0.8)'
            ],
            borderColor: [
                'rgb(99, 102, 241)',
                'rgb(139, 92, 246)',
                'rgb(236, 72, 153)',
                'rgb(245, 158, 11)',
                'rgb(16, 185, 129)',
                'rgb(34, 197, 94)'
            ],
            borderWidth: 2,
            borderRadius: 8
        }]
    };

    new Chart(ctx, {
        type: 'bar',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function (context) {
                            const value = context.parsed.y;
                            const prevValue = context.dataIndex > 0 ? context.dataset.data[context.dataIndex - 1] : value;
                            const conversionRate = ((value / prevValue) * 100).toFixed(1);
                            return [
                                'Số lượng: ' + value.toLocaleString(),
                                context.dataIndex > 0 ? 'Tỷ lệ chuyển đổi: ' + conversionRate + '%' : ''
                            ];
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function (value) {
                            return (value / 1000) + 'K';
                        }
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.05)'
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
}

// Performance Matrix (Scatter Plot) - UA Channels
function createPerformanceMatrix() {
    const ctx = document.getElementById('performanceMatrix').getContext('2d');

    const sources = [
        { name: 'Facebook UA', cost: 285, cr: 4.2, zone: 2 },
        { name: 'Google UAC', cost: 180, cr: 5.1, zone: 1 },
        { name: 'TikTok Ads', cost: 120, cr: 3.5, zone: 2 },
        { name: 'Apple Search Ads', cost: 95, cr: 6.2, zone: 1 },
        { name: 'Snapchat Ads', cost: 65, cr: 2.8, zone: 3 },
        { name: 'Unity Ads', cost: 45, cr: 2.1, zone: 3 },
        { name: 'ironSource', cost: 55, cr: 3.2, zone: 3 },
        { name: 'Influencer (Macro)', cost: 150, cr: 1.8, zone: 4 },
        { name: 'Influencer (Micro)', cost: 35, cr: 4.5, zone: 1 },
        { name: 'ASO Organic', cost: 15, cr: 7.2, zone: 1 }
    ];

    const datasets = [
        {
            label: 'Vùng 1: Dồn thêm tiền',
            data: sources.filter(s => s.zone === 1).map(s => ({ x: s.cost, y: s.cr, label: s.name })),
            backgroundColor: 'rgba(16, 185, 129, 0.8)',
            borderColor: 'rgb(16, 185, 129)',
            borderWidth: 2,
            pointRadius: 8,
            pointHoverRadius: 10
        },
        {
            label: 'Vùng 2: Tối ưu nội dung',
            data: sources.filter(s => s.zone === 2).map(s => ({ x: s.cost, y: s.cr, label: s.name })),
            backgroundColor: 'rgba(245, 158, 11, 0.8)',
            borderColor: 'rgb(245, 158, 11)',
            borderWidth: 2,
            pointRadius: 8,
            pointHoverRadius: 10
        },
        {
            label: 'Vùng 3: Thử nghiệm',
            data: sources.filter(s => s.zone === 3).map(s => ({ x: s.cost, y: s.cr, label: s.name })),
            backgroundColor: 'rgba(59, 130, 246, 0.8)',
            borderColor: 'rgb(59, 130, 246)',
            borderWidth: 2,
            pointRadius: 8,
            pointHoverRadius: 10
        },
        {
            label: 'Vùng 4: Cắt bỏ ngay',
            data: sources.filter(s => s.zone === 4).map(s => ({ x: s.cost, y: s.cr, label: s.name })),
            backgroundColor: 'rgba(239, 68, 68, 0.8)',
            borderColor: 'rgb(239, 68, 68)',
            borderWidth: 2,
            pointRadius: 8,
            pointHoverRadius: 10
        }
    ];

    new Chart(ctx, {
        type: 'scatter',
        data: { datasets },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function (context) {
                            const point = context.raw;
                            return [
                                point.label,
                                'Chi phí: $' + point.x.toLocaleString() + 'K',
                                'Conversion Rate: ' + point.y + '%'
                            ];
                        }
                    }
                }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Chi phí trung bình ($K)',
                        color: '#9ca3af'
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.05)'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Conversion Rate (%)',
                        color: '#9ca3af'
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.05)'
                    }
                }
            }
        }
    });
}

// Step Conversion Rate Chart - App Funnel
function createStepConversionChart() {
    const ctx = document.getElementById('stepConversionChart').getContext('2d');

    const data = {
        labels: ['Impression → Click', 'Click → Install', 'Install → Register', 'Register → Active', 'Active → Paid'],
        datasets: [{
            label: 'Tỷ lệ chuyển đổi',
            data: [10.0, 34.6, 46.0, 41.2, 21.5],
            backgroundColor: [
                'rgba(99, 102, 241, 0.8)',
                'rgba(139, 92, 246, 0.8)',
                'rgba(236, 72, 153, 0.8)',
                'rgba(245, 158, 11, 0.8)',
                'rgba(16, 185, 129, 0.8)'
            ],
            borderColor: [
                'rgb(99, 102, 241)',
                'rgb(139, 92, 246)',
                'rgb(236, 72, 153)',
                'rgb(245, 158, 11)',
                'rgb(16, 185, 129)'
            ],
            borderWidth: 2,
            borderRadius: 8
        }]
    };

    new Chart(ctx, {
        type: 'bar',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function (context) {
                            return 'Conversion Rate: ' + context.parsed.y + '%';
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                        callback: function (value) {
                            return value + '%';
                        }
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.05)'
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
}

// Traffic Source Chart - Install Sources
function createTrafficSourceChart() {
    const ctx = document.getElementById('trafficSourceChart').getContext('2d');

    const data = {
        labels: ['Facebook UA', 'Google UAC', 'TikTok', 'Apple Search', 'Organic', 'Others'],
        datasets: [{
            label: 'Installs',
            data: [32500, 24200, 15800, 12300, 8900, 4800],
            backgroundColor: [
                'rgba(99, 102, 241, 0.8)',
                'rgba(139, 92, 246, 0.8)',
                'rgba(236, 72, 153, 0.8)',
                'rgba(16, 185, 129, 0.8)',
                'rgba(245, 158, 11, 0.8)',
                'rgba(107, 114, 128, 0.8)'
            ],
            borderColor: [
                'rgb(99, 102, 241)',
                'rgb(139, 92, 246)',
                'rgb(236, 72, 153)',
                'rgb(16, 185, 129)',
                'rgb(245, 158, 11)',
                'rgb(107, 114, 128)'
            ],
            borderWidth: 2
        }]
    };

    new Chart(ctx, {
        type: 'doughnut',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                },
                tooltip: {
                    callbacks: {
                        label: function (context) {
                            let label = context.label || '';
                            if (label) {
                                label += ': ';
                            }
                            label += context.parsed.toLocaleString();
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = ((context.parsed / total) * 100).toFixed(1);
                            label += ' (' + percentage + '%)';
                            return label;
                        }
                    }
                }
            }
        }
    });
}

// ===== Page 3: User Demographics & Behavior Charts =====

// Age Distribution Chart
function createAgeDistributionChart() {
    const ctx = document.getElementById('ageDistributionChart').getContext('2d');

    const data = {
        labels: ['13-17', '18-24', '25-34', '35-44', '45-54', '55+'],
        datasets: [{
            label: 'Users',
            data: [1250, 5820, 7450, 2980, 950, 200],
            backgroundColor: [
                'rgba(99, 102, 241, 0.8)',
                'rgba(139, 92, 246, 0.8)',
                'rgba(236, 72, 153, 0.8)',
                'rgba(245, 158, 11, 0.8)',
                'rgba(16, 185, 129, 0.8)',
                'rgba(107, 114, 128, 0.8)'
            ],
            borderColor: [
                'rgb(99, 102, 241)',
                'rgb(139, 92, 246)',
                'rgb(236, 72, 153)',
                'rgb(245, 158, 11)',
                'rgb(16, 185, 129)',
                'rgb(107, 114, 128)'
            ],
            borderWidth: 2,
            borderRadius: 8
        }]
    };

    new Chart(ctx, {
        type: 'bar',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function (context) {
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = ((context.parsed.y / total) * 100).toFixed(1);
                            return [
                                'Users: ' + context.parsed.y.toLocaleString(),
                                'Percentage: ' + percentage + '%'
                            ];
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function (value) {
                            return (value / 1000) + 'K';
                        }
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.05)'
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
}

// Gender Chart
function createGenderChart() {
    const ctx = document.getElementById('genderChart').getContext('2d');

    const data = {
        labels: ['Nam', 'Nữ', 'Khác'],
        datasets: [{
            label: 'Users',
            data: [10250, 7850, 550],
            backgroundColor: [
                'rgba(99, 102, 241, 0.8)',
                'rgba(236, 72, 153, 0.8)',
                'rgba(107, 114, 128, 0.8)'
            ],
            borderColor: [
                'rgb(99, 102, 241)',
                'rgb(236, 72, 153)',
                'rgb(107, 114, 128)'
            ],
            borderWidth: 2
        }]
    };

    new Chart(ctx, {
        type: 'doughnut',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                },
                tooltip: {
                    callbacks: {
                        label: function (context) {
                            let label = context.label || '';
                            if (label) {
                                label += ': ';
                            }
                            label += context.parsed.toLocaleString();
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = ((context.parsed / total) * 100).toFixed(1);
                            label += ' (' + percentage + '%)';
                            return label;
                        }
                    }
                }
            }
        }
    });
}

// Hourly Behavior Chart
function createHourlyBehaviorChart() {
    const ctx = document.getElementById('hourlyBehaviorChart').getContext('2d');

    const hours = ['0h', '2h', '4h', '6h', '8h', '10h', '12h', '14h', '16h', '18h', '20h', '22h'];

    const data = {
        labels: hours,
        datasets: [
            {
                label: 'Active Users',
                data: [850, 420, 280, 650, 2100, 3500, 4200, 3800, 4500, 5800, 6200, 3500],
                borderColor: 'rgb(99, 102, 241)',
                backgroundColor: 'rgba(99, 102, 241, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                pointRadius: 5,
                pointHoverRadius: 7,
                pointBackgroundColor: 'rgb(99, 102, 241)',
                pointBorderColor: '#0a0e1a',
                pointBorderWidth: 2
            },
            {
                label: 'Sessions Started',
                data: [1200, 580, 350, 820, 2800, 4200, 5100, 4600, 5500, 7200, 7800, 4500],
                borderColor: 'rgb(236, 72, 153)',
                backgroundColor: 'rgba(236, 72, 153, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                pointRadius: 5,
                pointHoverRadius: 7,
                pointBackgroundColor: 'rgb(236, 72, 153)',
                pointBorderColor: '#0a0e1a',
                pointBorderWidth: 2
            }
        ]
    };

    new Chart(ctx, {
        type: 'line',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                mode: 'index',
                intersect: false,
            },
            plugins: {
                legend: {
                    display: true,
                    position: 'top',
                },
                tooltip: {
                    callbacks: {
                        label: function (context) {
                            return context.dataset.label + ': ' + context.parsed.y.toLocaleString();
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function (value) {
                            return (value / 1000) + 'K';
                        }
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.05)'
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
}

// Session Duration Distribution Chart
function createSessionDurationChart() {
    const ctx = document.getElementById('sessionDurationChart').getContext('2d');

    const data = {
        labels: ['< 1 min', '1-3 min', '3-5 min', '5-10 min', '10-20 min', '> 20 min'],
        datasets: [{
            label: 'Sessions',
            data: [2850, 4200, 5800, 3950, 1580, 270],
            backgroundColor: [
                'rgba(239, 68, 68, 0.8)',
                'rgba(245, 158, 11, 0.8)',
                'rgba(236, 72, 153, 0.8)',
                'rgba(139, 92, 246, 0.8)',
                'rgba(99, 102, 241, 0.8)',
                'rgba(16, 185, 129, 0.8)'
            ],
            borderColor: [
                'rgb(239, 68, 68)',
                'rgb(245, 158, 11)',
                'rgb(236, 72, 153)',
                'rgb(139, 92, 246)',
                'rgb(99, 102, 241)',
                'rgb(16, 185, 129)'
            ],
            borderWidth: 2,
            borderRadius: 8
        }]
    };

    new Chart(ctx, {
        type: 'bar',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            indexAxis: 'y',
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function (context) {
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = ((context.parsed.x / total) * 100).toFixed(1);
                            return [
                                'Sessions: ' + context.parsed.x.toLocaleString(),
                                'Percentage: ' + percentage + '%'
                            ];
                        }
                    }
                }
            },
            scales: {
                x: {
                    beginAtZero: true,
                    ticks: {
                        callback: function (value) {
                            return (value / 1000) + 'K';
                        }
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.05)'
                    }
                },
                y: {
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
}

// Device Type Chart
function createDeviceTypeChart() {
    const ctx = document.getElementById('deviceTypeChart').getContext('2d');

    const data = {
        labels: ['iOS', 'Android'],
        datasets: [{
            label: 'Users',
            data: [11250, 7400],
            backgroundColor: [
                'rgba(99, 102, 241, 0.8)',
                'rgba(16, 185, 129, 0.8)'
            ],
            borderColor: [
                'rgb(99, 102, 241)',
                'rgb(16, 185, 129)'
            ],
            borderWidth: 2
        }]
    };

    new Chart(ctx, {
        type: 'doughnut',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                },
                tooltip: {
                    callbacks: {
                        label: function (context) {
                            let label = context.label || '';
                            if (label) {
                                label += ': ';
                            }
                            label += context.parsed.toLocaleString();
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = ((context.parsed / total) * 100).toFixed(1);
                            label += ' (' + percentage + '%)';
                            return label;
                        }
                    }
                }
            }
        }
    });
}

// Retention Cohort Chart
function createRetentionCohortChart() {
    const ctx = document.getElementById('retentionCohortChart').getContext('2d');

    const labels = ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7', 'Week 8'];

    const data = {
        labels: labels,
        datasets: [
            {
                label: 'Day 1 Retention',
                data: [100, 95, 92, 90, 88, 86, 85, 84],
                borderColor: 'rgb(99, 102, 241)',
                backgroundColor: 'rgba(99, 102, 241, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4
            },
            {
                label: 'Day 7 Retention',
                data: [100, 68, 62, 58, 55, 53, 51, 50],
                borderColor: 'rgb(139, 92, 246)',
                backgroundColor: 'rgba(139, 92, 246, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4
            },
            {
                label: 'Day 14 Retention',
                data: [100, 52, 45, 41, 38, 36, 35, 34],
                borderColor: 'rgb(236, 72, 153)',
                backgroundColor: 'rgba(236, 72, 153, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4
            },
            {
                label: 'Day 30 Retention',
                data: [100, 38, 32, 28, 25, 23, 22, 21],
                borderColor: 'rgb(245, 158, 11)',
                backgroundColor: 'rgba(245, 158, 11, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4
            }
        ]
    };

    new Chart(ctx, {
        type: 'line',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                mode: 'index',
                intersect: false,
            },
            plugins: {
                legend: {
                    display: true,
                    position: 'top',
                },
                tooltip: {
                    callbacks: {
                        label: function (context) {
                            return context.dataset.label + ': ' + context.parsed.y + '%';
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                        callback: function (value) {
                            return value + '%';
                        }
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.05)'
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
}

// Top Features Chart
function createTopFeaturesChart() {
    const ctx = document.getElementById('topFeaturesChart').getContext('2d');

    const data = {
        labels: ['Home Feed', 'Search', 'Profile', 'Messaging', 'Notifications', 'Settings'],
        datasets: [{
            label: 'Usage Count',
            data: [15800, 12500, 9200, 8500, 6800, 3200],
            backgroundColor: [
                'rgba(99, 102, 241, 0.8)',
                'rgba(139, 92, 246, 0.8)',
                'rgba(236, 72, 153, 0.8)',
                'rgba(245, 158, 11, 0.8)',
                'rgba(16, 185, 129, 0.8)',
                'rgba(107, 114, 128, 0.8)'
            ],
            borderColor: [
                'rgb(99, 102, 241)',
                'rgb(139, 92, 246)',
                'rgb(236, 72, 153)',
                'rgb(245, 158, 11)',
                'rgb(16, 185, 129)',
                'rgb(107, 114, 128)'
            ],
            borderWidth: 2,
            borderRadius: 8
        }]
    };

    new Chart(ctx, {
        type: 'bar',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            indexAxis: 'y',
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function (context) {
                            return 'Usage: ' + context.parsed.x.toLocaleString();
                        }
                    }
                }
            },
            scales: {
                x: {
                    beginAtZero: true,
                    ticks: {
                        callback: function (value) {
                            return (value / 1000) + 'K';
                        }
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.05)'
                    }
                },
                y: {
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
}

// Engagement Score Chart
function createEngagementScoreChart() {
    const ctx = document.getElementById('engagementScoreChart').getContext('2d');

    const data = {
        labels: ['Power Users', 'Active Users', 'Casual Users', 'At Risk', 'Inactive'],
        datasets: [{
            label: 'Users',
            data: [2850, 7200, 5800, 1950, 850],
            backgroundColor: [
                'rgba(16, 185, 129, 0.8)',
                'rgba(99, 102, 241, 0.8)',
                'rgba(245, 158, 11, 0.8)',
                'rgba(239, 68, 68, 0.8)',
                'rgba(107, 114, 128, 0.8)'
            ],
            borderColor: [
                'rgb(16, 185, 129)',
                'rgb(99, 102, 241)',
                'rgb(245, 158, 11)',
                'rgb(239, 68, 68)',
                'rgb(107, 114, 128)'
            ],
            borderWidth: 2
        }]
    };

    new Chart(ctx, {
        type: 'doughnut',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                },
                tooltip: {
                    callbacks: {
                        label: function (context) {
                            let label = context.label || '';
                            if (label) {
                                label += ': ';
                            }
                            label += context.parsed.toLocaleString();
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = ((context.parsed / total) * 100).toFixed(1);
                            label += ' (' + percentage + '%)';
                            return label;
                        }
                    }
                }
            }
        }
    });
}

// ===== Initialize All Charts =====
function initCharts() {
    // Page 1 Charts
    createWaterfallChart();
    createTrendChart();
    createROASChannelChart();
    createCostBreakdownChart();

    // Page 2 Charts
    createFunnelChart();
    createPerformanceMatrix();
    createStepConversionChart();
    createTrafficSourceChart();

    // Page 3 Charts
    createAgeDistributionChart();
    createGenderChart();
    createHourlyBehaviorChart();
    createSessionDurationChart();
    createDeviceTypeChart();
    createRetentionCohortChart();
    createTopFeaturesChart();
    createEngagementScoreChart();
}

// ===== Initialize App =====
document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initCharts();
});
