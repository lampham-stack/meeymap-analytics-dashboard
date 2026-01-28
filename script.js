// Sample Data
const sampleData = {
    channels: ['Facebook Ads', 'Google Ads', 'TikTok Ads', 'Zalo Ads', 'Organic'],
    channelColors: [
        'rgba(102, 126, 234, 0.8)',
        'rgba(240, 147, 251, 0.8)',
        'rgba(79, 172, 254, 0.8)',
        'rgba(67, 233, 123, 0.8)',
        'rgba(254, 225, 64, 0.8)'
    ],
    spend: [120, 95, 75, 45, 0],
    meeyId: [2850, 2400, 1650, 980, 1200],
    revenueDates: ['Jan 1', 'Jan 5', 'Jan 10', 'Jan 15', 'Jan 20', 'Jan 25', 'Jan 30'],
    revenueValues: [45, 52, 48, 61, 58, 72, 68],
    devices: ['Mobile', 'Desktop', 'Tablet'],
    deviceValues: [68, 25, 7],
    regions: ['Hà Nội', 'TP.HCM', 'Đà Nẵng', 'Cần Thơ', 'Hải Phòng'],
    regionValues: [2100000, 1850000, 420000, 380000, 295000],
    ageGroups: ['18-24', '25-34', '35-44', '45-54', '55+'],
    ageUsers: [45000, 120000, 85000, 42000, 18000]
};

// Page Navigation
document.addEventListener('DOMContentLoaded', function () {
    const navItems = document.querySelectorAll('.nav-item');
    const pages = document.querySelectorAll('.page-content');

    navItems.forEach(item => {
        item.addEventListener('click', function (e) {
            e.preventDefault();

            // Remove active class from all nav items and pages
            navItems.forEach(nav => nav.classList.remove('active'));
            pages.forEach(page => page.classList.remove('active'));

            // Add active class to clicked nav item
            this.classList.add('active');

            // Show corresponding page
            const pageName = this.getAttribute('data-page');
            document.getElementById(`${pageName}-page`).classList.add('active');
        });
    });

    // Initialize all charts
    initializeCharts();
});

function initializeCharts() {
    // Overview Page Charts
    initSpendDistributionChart();
    initMeeyIdChart();
    initRevenueTrendChart();
    initRoasChart();
    initOrganicPaidChart();

    // Marketing Page Charts
    initDeviceChart();
    initRegionChart();
    initAgeChart();
    initRadarChart();

    // Sales Page Charts
    initLeadProductChart();
    initTopProductsChart();
    initConversionRatesChart();
    initFocusRecommendChart();
}

// Overview Charts
function initSpendDistributionChart() {
    const ctx = document.getElementById('spendDistributionChart').getContext('2d');
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: sampleData.channels,
            datasets: [{
                data: sampleData.spend,
                backgroundColor: sampleData.channelColors,
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        usePointStyle: true,
                        padding: 15,
                        color: '#a0aec0'
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(22, 33, 62, 0.95)',
                    padding: 12,
                    callbacks: {
                        label: function (context) {
                            return context.label + ': ₫' + context.parsed + 'M';
                        }
                    }
                }
            }
        }
    });
}

function initMeeyIdChart() {
    const ctx = document.getElementById('meeyIdChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: sampleData.channels,
            datasets: [{
                label: 'Meey ID Generated',
                data: sampleData.meeyId,
                backgroundColor: sampleData.channelColors,
                borderRadius: 8
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { display: false },
                tooltip: {
                    backgroundColor: 'rgba(22, 33, 62, 0.95)',
                    padding: 12
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: { color: 'rgba(255, 255, 255, 0.05)' },
                    ticks: { color: '#a0aec0' }
                },
                x: {
                    grid: { display: false },
                    ticks: { color: '#a0aec0' }
                }
            }
        }
    });
}

function initRevenueTrendChart() {
    const ctx = document.getElementById('revenueTrendChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: sampleData.revenueDates,
            datasets: [
                {
                    label: 'Facebook Ads',
                    data: sampleData.revenueValues.map(v => v * 0.35),
                    borderColor: 'rgba(102, 126, 234, 1)',
                    backgroundColor: 'rgba(102, 126, 234, 0.3)',
                    fill: true,
                    tension: 0.4
                },
                {
                    label: 'Google Ads',
                    data: sampleData.revenueValues.map(v => v * 0.30),
                    borderColor: 'rgba(240, 147, 251, 1)',
                    backgroundColor: 'rgba(240, 147, 251, 0.3)',
                    fill: true,
                    tension: 0.4
                },
                {
                    label: 'TikTok Ads',
                    data: sampleData.revenueValues.map(v => v * 0.20),
                    borderColor: 'rgba(79, 172, 254, 1)',
                    backgroundColor: 'rgba(79, 172, 254, 0.3)',
                    fill: true,
                    tension: 0.4
                },
                {
                    label: 'Zalo Ads',
                    data: sampleData.revenueValues.map(v => v * 0.10),
                    borderColor: 'rgba(67, 233, 123, 1)',
                    backgroundColor: 'rgba(67, 233, 123, 0.3)',
                    fill: true,
                    tension: 0.4
                },
                {
                    label: 'Organic',
                    data: sampleData.revenueValues.map(v => v * 0.05),
                    borderColor: 'rgba(254, 225, 64, 1)',
                    backgroundColor: 'rgba(254, 225, 64, 0.3)',
                    fill: true,
                    tension: 0.4
                }
            ]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        usePointStyle: true,
                        padding: 15,
                        color: '#a0aec0'
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(22, 33, 62, 0.95)',
                    padding: 12,
                    mode: 'index',
                    intersect: false
                }
            },
            scales: {
                y: {
                    stacked: true,
                    beginAtZero: true,
                    grid: { color: 'rgba(255, 255, 255, 0.05)' },
                    ticks: {
                        color: '#a0aec0',
                        callback: function (value) {
                            return '₫' + value + 'M';
                        }
                    }
                },
                x: {
                    stacked: true,
                    grid: { display: false },
                    ticks: {
                        color: '#a0aec0',
                        maxTicksLimit: 10
                    }
                }
            }
        }
    });
}

function initRoasChart() {
    const ctx = document.getElementById('roasChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: sampleData.channels.filter(c => c !== 'Organic'),
            datasets: [{
                label: 'ROAS',
                data: [5.0, 5.0, 4.0, 4.0],
                backgroundColor: sampleData.channelColors.slice(0, 4),
                borderRadius: 8
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { display: false },
                tooltip: {
                    backgroundColor: 'rgba(22, 33, 62, 0.95)',
                    padding: 12,
                    callbacks: {
                        label: function (context) {
                            return 'ROAS: ' + context.parsed.y + 'x';
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 8,
                    grid: { color: 'rgba(255, 255, 255, 0.05)' },
                    ticks: {
                        color: '#a0aec0',
                        callback: function (value) {
                            return value + 'x';
                        }
                    }
                },
                x: {
                    grid: { display: false },
                    ticks: { color: '#a0aec0' }
                }
            }
        }
    });
}

function initOrganicPaidChart() {
    const ctx = document.getElementById('organicPaidChart').getContext('2d');
    new Chart(ctx, {
        type: 'polarArea',
        data: {
            labels: ['Paid - Facebook', 'Paid - Google', 'Paid - TikTok', 'Paid - Zalo', 'Organic'],
            datasets: [{
                data: [2850, 2400, 1650, 980, 1200],
                backgroundColor: sampleData.channelColors
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        usePointStyle: true,
                        padding: 15,
                        color: '#a0aec0'
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(22, 33, 62, 0.95)',
                    padding: 12
                }
            },
            scales: {
                r: {
                    grid: { color: 'rgba(255, 255, 255, 0.1)' },
                    ticks: { color: '#a0aec0', backdropColor: 'transparent' }
                }
            }
        }
    });
}

// Marketing Charts
function initDeviceChart() {
    const ctx = document.getElementById('deviceChart').getContext('2d');
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: sampleData.devices,
            datasets: [{
                data: sampleData.deviceValues,
                backgroundColor: [
                    'rgba(102, 126, 234, 0.8)',
                    'rgba(240, 147, 251, 0.8)',
                    'rgba(79, 172, 254, 0.8)'
                ],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        usePointStyle: true,
                        padding: 15,
                        color: '#a0aec0'
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(22, 33, 62, 0.95)',
                    padding: 12,
                    callbacks: {
                        label: function (context) {
                            return context.label + ': ' + context.parsed + '%';
                        }
                    }
                }
            }
        }
    });
}

function initRegionChart() {
    const ctx = document.getElementById('regionChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: sampleData.regions,
            datasets: [{
                label: 'Impressions',
                data: sampleData.regionValues,
                backgroundColor: 'rgba(102, 126, 234, 0.8)',
                borderRadius: 8
            }]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            plugins: {
                legend: { display: false },
                tooltip: {
                    backgroundColor: 'rgba(22, 33, 62, 0.95)',
                    padding: 12,
                    callbacks: {
                        label: function (context) {
                            return context.parsed.x.toLocaleString() + ' impressions';
                        }
                    }
                }
            },
            scales: {
                x: {
                    beginAtZero: true,
                    grid: { color: 'rgba(255, 255, 255, 0.05)' },
                    ticks: {
                        color: '#a0aec0',
                        callback: function (value) {
                            return (value / 1000) + 'K';
                        }
                    }
                },
                y: {
                    grid: { display: false },
                    ticks: { color: '#a0aec0' }
                }
            }
        }
    });
}

function initAgeChart() {
    const ctx = document.getElementById('ageChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: sampleData.ageGroups,
            datasets: [{
                label: 'Users',
                data: sampleData.ageUsers,
                backgroundColor: 'rgba(102, 126, 234, 0.8)',
                borderRadius: 8
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { display: false },
                tooltip: {
                    backgroundColor: 'rgba(22, 33, 62, 0.95)',
                    padding: 12,
                    callbacks: {
                        label: function (context) {
                            return context.parsed.y.toLocaleString() + ' users';
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: { color: 'rgba(255, 255, 255, 0.05)' },
                    ticks: {
                        color: '#a0aec0',
                        callback: function (value) {
                            return (value / 1000) + 'K';
                        }
                    }
                },
                x: {
                    grid: { display: false },
                    ticks: { color: '#a0aec0' }
                }
            }
        }
    });
}

function initRadarChart() {
    const ctx = document.getElementById('radarChart').getContext('2d');
    new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ['Impressions', 'Reach', 'Clicks', 'Conversions', 'Revenue', 'ROAS'],
            datasets: [
                {
                    label: 'Facebook Ads',
                    data: [85, 78, 82, 75, 88, 90],
                    borderColor: 'rgba(102, 126, 234, 1)',
                    backgroundColor: 'rgba(102, 126, 234, 0.2)',
                    borderWidth: 2
                },
                {
                    label: 'Google Ads',
                    data: [90, 85, 88, 80, 85, 88],
                    borderColor: 'rgba(240, 147, 251, 1)',
                    backgroundColor: 'rgba(240, 147, 251, 0.2)',
                    borderWidth: 2
                },
                {
                    label: 'TikTok Ads',
                    data: [75, 70, 65, 60, 68, 72],
                    borderColor: 'rgba(79, 172, 254, 1)',
                    backgroundColor: 'rgba(79, 172, 254, 0.2)',
                    borderWidth: 2
                }
            ]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        usePointStyle: true,
                        padding: 15,
                        color: '#a0aec0'
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(22, 33, 62, 0.95)',
                    padding: 12
                }
            },
            scales: {
                r: {
                    beginAtZero: true,
                    max: 100,
                    grid: { color: 'rgba(255, 255, 255, 0.1)' },
                    ticks: {
                        color: '#a0aec0',
                        backdropColor: 'transparent',
                        stepSize: 20
                    },
                    pointLabels: { color: '#a0aec0' }
                }
            }
        }
    });
}

// Sales Charts
function initLeadProductChart() {
    const ctx = document.getElementById('leadProductChart').getContext('2d');
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Basic Plan', 'Standard Plan', 'Premium Plan'],
            datasets: [{
                data: [1502, 1866, 4033],
                backgroundColor: [
                    'rgba(79, 172, 254, 0.8)',
                    'rgba(102, 126, 234, 0.8)',
                    'rgba(250, 112, 154, 0.8)'
                ],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        usePointStyle: true,
                        padding: 15,
                        color: '#a0aec0'
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(22, 33, 62, 0.95)',
                    padding: 12,
                    callbacks: {
                        label: function (context) {
                            return context.label + ': ' + context.parsed.toLocaleString() + ' leads';
                        }
                    }
                }
            }
        }
    });
}

function initTopProductsChart() {
    const ctx = document.getElementById('topProductsChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Standard Plan', 'Premium Plan', 'Basic Plan'],
            datasets: [{
                label: 'Revenue (M)',
                data: [633, 332, 248],
                backgroundColor: [
                    'rgba(102, 126, 234, 0.8)',
                    'rgba(250, 112, 154, 0.8)',
                    'rgba(79, 172, 254, 0.8)'
                ],
                borderRadius: 8
            }]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            plugins: {
                legend: { display: false },
                tooltip: {
                    backgroundColor: 'rgba(22, 33, 62, 0.95)',
                    padding: 12,
                    callbacks: {
                        label: function (context) {
                            return '₫' + context.parsed.x + 'M';
                        }
                    }
                }
            },
            scales: {
                x: {
                    beginAtZero: true,
                    grid: { color: 'rgba(255, 255, 255, 0.05)' },
                    ticks: {
                        color: '#a0aec0',
                        callback: function (value) {
                            return '₫' + value + 'M';
                        }
                    }
                },
                y: {
                    grid: { display: false },
                    ticks: { color: '#a0aec0' }
                }
            }
        }
    });
}

function initConversionRatesChart() {
    const ctx = document.getElementById('conversionRatesChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Basic Plan', 'Standard Plan', 'Premium Plan'],
            datasets: [{
                label: 'Conversion Rate (%)',
                data: [42.5, 38.2, 19.3],
                backgroundColor: [
                    'rgba(79, 172, 254, 0.8)',
                    'rgba(102, 126, 234, 0.8)',
                    'rgba(250, 112, 154, 0.8)'
                ],
                borderRadius: 8
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { display: false },
                tooltip: {
                    backgroundColor: 'rgba(22, 33, 62, 0.95)',
                    padding: 12,
                    callbacks: {
                        label: function (context) {
                            return context.parsed.y + '%';
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 50,
                    grid: { color: 'rgba(255, 255, 255, 0.05)' },
                    ticks: {
                        color: '#a0aec0',
                        callback: function (value) {
                            return value + '%';
                        }
                    }
                },
                x: {
                    grid: { display: false },
                    ticks: { color: '#a0aec0' }
                }
            }
        }
    });
}

function initFocusRecommendChart() {
    const ctx = document.getElementById('focusRecommendChart').getContext('2d');
    new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ['Leads', 'Revenue', 'Conv Rate', 'Churn', 'Growth'],
            datasets: [
                {
                    label: 'Standard Plan',
                    data: [75, 90, 85, 95, 88],
                    borderColor: 'rgba(102, 126, 234, 1)',
                    backgroundColor: 'rgba(102, 126, 234, 0.2)',
                    borderWidth: 2
                },
                {
                    label: 'Basic Plan',
                    data: [60, 50, 95, 90, 75],
                    borderColor: 'rgba(79, 172, 254, 1)',
                    backgroundColor: 'rgba(79, 172, 254, 0.2)',
                    borderWidth: 2
                },
                {
                    label: 'Premium Plan',
                    data: [95, 70, 45, 98, 65],
                    borderColor: 'rgba(250, 112, 154, 1)',
                    backgroundColor: 'rgba(250, 112, 154, 0.2)',
                    borderWidth: 2
                }
            ]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        usePointStyle: true,
                        padding: 15,
                        color: '#a0aec0'
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(22, 33, 62, 0.95)',
                    padding: 12
                }
            },
            scales: {
                r: {
                    beginAtZero: true,
                    max: 100,
                    grid: { color: 'rgba(255, 255, 255, 0.1)' },
                    ticks: {
                        color: '#a0aec0',
                        backdropColor: 'transparent',
                        stepSize: 20
                    },
                    pointLabels: { color: '#a0aec0' }
                }
            }
        }
    });
}
