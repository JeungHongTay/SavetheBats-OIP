// ===========================
// Analytics Dashboard JavaScript
// Comprehensive Bat Monitoring & Light Pollution Analytics
// ===========================

document.addEventListener('DOMContentLoaded', function() {
    initializeDashboard();
    initializeCharts();
    updateMetrics();
    setupInteractivity();
});

// ===========================
// Dashboard Initialization
// ===========================
function initializeDashboard() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetTab = btn.getAttribute('data-tab');
            switchTab(targetTab);
        });
    });
}

function switchTab(targetTab) {
    // Remove active class from all tabs and contents
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
    
    // Add active class to selected tab and content
    document.querySelector(`[data-tab="${targetTab}"]`).classList.add('active');
    document.getElementById(targetTab).classList.add('active');
    
    // Refresh charts when switching tabs
    setTimeout(() => {
        if (targetTab === 'overview') {
            initializeOverviewCharts();
        } else if (targetTab === 'bat-monitoring') {
            initializeMonitoringCharts();
        } else if (targetTab === 'thermal-imaging') {
            // Setup thermal imaging specific functionality if needed
        }
    }, 100);
}

// ===========================
// Chart Variables
// ===========================
let correlationChart, hourlyChart, monthlyTrendsChart;

// ===========================
// Chart Initialization
// ===========================
function initializeCharts() {
    initializeOverviewCharts();
}

function initializeOverviewCharts() {
    // Correlation Chart
    const correlationCtx = document.getElementById('correlationChart');
    if (correlationCtx) {
        if (correlationChart) correlationChart.destroy();
        correlationChart = new Chart(correlationCtx, {
            type: 'scatter',
            data: {
                datasets: [{
                    label: 'Bat Activity vs Light Level',
                    data: generateCorrelationData(),
                    backgroundColor: 'rgba(59, 130, 246, 0.6)',
                    borderColor: 'rgba(59, 130, 246, 1)',
                    borderWidth: 2,
                    pointRadius: 5,
                    pointHoverRadius: 7
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: true,
                        position: 'top'
                    }
                },
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Light Level (lux)'
                        },
                        beginAtZero: true
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Bat Detections (per hour)'
                        },
                        beginAtZero: true
                    }
                }
            }
        });
    }

    // Hourly Pattern Chart
    const hourlyCtx = document.getElementById('hourlyChart');
    if (hourlyCtx) {
        if (hourlyChart) hourlyChart.destroy();
        hourlyChart = new Chart(hourlyCtx, {
            type: 'line',
            data: {
                labels: generateHourLabels(),
                datasets: [{
                    label: 'Bat Activity',
                    data: generateHourlyData(),
                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
                    borderColor: 'rgba(16, 185, 129, 1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Hour of Night'
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Detection Count'
                        },
                        beginAtZero: true
                    }
                }
            }
        });
    }
}

// ===========================
// Data Generation Functions
// ===========================
function generateCorrelationData() {
    const data = [];
    for (let i = 0; i < 25; i++) {
        const light = Math.random() * 5;
        const activity = Math.max(0, 50 - (light * 8) + (Math.random() * 15));
        data.push({x: light.toFixed(1), y: Math.round(activity)});
    }
    return data;
}

function generateHourLabels() {
    return ['8PM', '9PM', '10PM', '11PM', '12AM', '1AM', '2AM', '3AM', '4AM', '5AM', '6AM'];
}

function generateHourlyData() {
    return [5, 12, 28, 45, 52, 48, 35, 22, 8, 3, 1];
}

// ===========================
// Interactive Features
// ===========================
function updateMetrics() {
    // Simulate real-time updates
}

function setupInteractivity() {
    // Setup dashboard interactions
}
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        titleColor: 'white',
                        bodyColor: 'white',
                        borderColor: 'rgba(59, 130, 246, 1)',
                        borderWidth: 1,
                        callbacks: {
                            label: function(context) {
                                return `Light: ${context.parsed.x} lux, Activity: ${context.parsed.y} detections`;
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Light Level (lux)'
                        },
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(0, 0, 0, 0.05)'
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Bat Detections (per hour)'
                        },
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(0, 0, 0, 0.05)'
                        }
                    }
                },
                animation: {
                    duration: 1500,
                    easing: 'easeInOutQuart'
                }
            }
        });
    }

    // Hourly Pattern Chart
    const hourlyCtx = document.getElementById('hourlyChart');
    if (hourlyCtx) {
        if (hourlyChart) hourlyChart.destroy();
        hourlyChart = new Chart(hourlyCtx, {
            type: 'line',
            data: {
                labels: generateHourLabels(),
                datasets: [{
                    label: 'Bat Activity',
                    data: generateHourlyData(),
                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
                    borderColor: 'rgba(16, 185, 129, 1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Hour of Night'
                        },
                        grid: {
                            color: 'rgba(0, 0, 0, 0.05)'
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Detection Count'
                        },
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(0, 0, 0, 0.05)'
                        }
                    }
                },
                animation: {
                    duration: 1500,
                    easing: 'easeInOutQuart'
                }
            }
        });
    }
}

function initializeMonitoringCharts() {
    // Monthly Trends Chart
    const monthlyCtx = document.getElementById('monthlyTrendsChart');
    if (monthlyCtx) {
        if (monthlyTrendsChart) monthlyTrendsChart.destroy();
        monthlyTrendsChart = new Chart(monthlyCtx, {
            type: 'bar',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [
                    {
                        label: 'Common Pipistrelle',
                        data: [45, 52, 68, 89, 75, 62],
                        backgroundColor: 'rgba(59, 130, 246, 0.7)'
                    },
                    {
                        label: 'Soprano Pipistrelle',
                        data: [32, 38, 45, 64, 58, 48],
                        backgroundColor: 'rgba(16, 185, 129, 0.7)'
                    },
                    {
                        label: "Daubenton's Bat",
                        data: [18, 22, 28, 32, 29, 25],
                        backgroundColor: 'rgba(251, 191, 36, 0.7)'
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: true,
                        position: 'top'
                    }
                },
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Month'
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Average Detections per Night'
                        },
                        beginAtZero: true
// ===========================
// Data Generation Functions
// ===========================
function generateCorrelationData() {
    const data = [];
    for (let i = 0; i < 25; i++) {
        const light = Math.random() * 5; // 0-5 lux
        const activity = Math.max(0, 50 - (light * 8) + (Math.random() * 15)); // Inverse correlation with noise
        data.push({x: light.toFixed(1), y: Math.round(activity)});
    }
    return data;
}

function generateHourLabels() {
    return ['8PM', '9PM', '10PM', '11PM', '12AM', '1AM', '2AM', '3AM', '4AM', '5AM', '6AM'];
}

function generateHourlyData() {
    return [5, 12, 28, 45, 52, 48, 35, 22, 8, 3, 1]; // Peak activity around midnight
}

// ===========================
// Tab Navigation
// ===========================
function setupTabNavigation() {
    // Already handled in initializeDashboard
}
                        display: true,
                        position: 'top'
                    },
                    tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        titleColor: 'white',
                        bodyColor: 'white',
                        borderColor: 'rgba(16, 185, 129, 1)',
                        borderWidth: 1,
                        callbacks: {
                            title: function(context) {
                                return `Time: ${context[0].label}`;
                            },
                            label: function(context) {
                                return `Detections: ${context.parsed.y}`;
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Time of Night'
                        },
                        grid: {
                            color: 'rgba(0, 0, 0, 0.05)'
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Number of Detections'
                        },
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(0, 0, 0, 0.05)'
                        }
                    }
                },
                animation: {
                    duration: 2000,
                    easing: 'easeInOutQuart'
                }
            }
        });
    }
}

// ===========================
// Data Generation Functions
// ===========================
function generateActivityData() {
    const data = [];
    // Simulate inverse correlation between light and bat activity
    for (let i = 0; i < 20; i++) {
        const lightLevel = Math.random() * 10; // 0-10 lux
        const baseActivity = Math.max(0, 15 - lightLevel * 1.5); // Inverse relationship
        const activity = Math.max(0, baseActivity + (Math.random() - 0.5) * 4);
        data.push({
            x: parseFloat(lightLevel.toFixed(1)),
            y: Math.round(activity)
        });
    }
    return data;
}

function generateHourlyData() {
    // Simulate typical nocturnal bat activity pattern
    const hours = ['18:00', '19:00', '20:00', '21:00', '22:00', '23:00', '00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00'];
    const basePattern = [2, 5, 12, 18, 25, 22, 15, 12, 8, 5, 3, 1, 0]; // Peak around 22:00-23:00
    
    return basePattern.map(base => {
        return Math.max(0, base + Math.floor((Math.random() - 0.5) * 6));
    });
}

function generateHourLabels() {
    return ['18:00', '19:00', '20:00', '21:00', '22:00', '23:00', '00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00'];
}

// ===========================
// Real-time Data Updates
// ===========================
function updateMetrics() {
    const metrics = {
        detections: 47 + Math.floor(Math.random() * 10) - 5,
        lightLevel: (2.3 + (Math.random() - 0.5) * 0.8).toFixed(1),
        flightPaths: 8 + Math.floor(Math.random() * 4) - 2,
        adoptedBats: 156 + Math.floor(Math.random() * 5)
    };

    // Update metric displays with animation
    updateMetricCard('detections', metrics.detections, 'detections');
    updateMetricCard('lightLevel', metrics.lightLevel, 'lux');
    updateMetricCard('flightPaths', metrics.flightPaths, 'paths');
    updateMetricCard('adoptedBats', metrics.adoptedBats, 'bats');
}

function updateMetricCard(metricType, value, unit) {
    const metricCards = document.querySelectorAll('.metric-card');
    metricCards.forEach(card => {
        const title = card.querySelector('h3').textContent.toLowerCase();
        if (title.includes(metricType.toLowerCase()) || 
            (metricType === 'lightLevel' && title.includes('light')) ||
            (metricType === 'flightPaths' && title.includes('flight')) ||
            (metricType === 'adoptedBats' && title.includes('adopted'))) {
            
            const valueElement = card.querySelector('.metric-value');
            if (valueElement) {
                // Animate value change
                valueElement.style.opacity = '0.5';
                setTimeout(() => {
                    valueElement.textContent = value + (unit === 'lux' ? ' lux' : '');
                    valueElement.style.opacity = '1';
                }, 300);
            }
        }
    });
}

// ===========================
// Chart Update Functions
// ===========================
function updateChartData(park, timeRange) {
    try {
        if (activityChart && activityChart.data) {
            activityChart.data.datasets[0].data = generateActivityData();
            activityChart.update('none'); // Use 'none' instead of 'active' for better performance
        }
        
        if (hourlyChart && hourlyChart.data) {
            hourlyChart.data.datasets[0].data = generateHourlyData();
            hourlyChart.update('none');
        }
    } catch (error) {
        console.error('Error updating charts:', error);
    }
}

// ===========================
// Interactive Features
// ===========================
function setupInteractivity() {
    // Park selector
    const parkSelect = document.getElementById('parkSelect');
    if (parkSelect) {
        parkSelect.addEventListener('change', function() {
            const park = this.value;
            updateChartData(park, document.getElementById('timeRange').value);
            showNotification(`Switched to ${this.options[this.selectedIndex].text}`);
        });
    }

    // Time range selector
    const timeRange = document.getElementById('timeRange');
    if (timeRange) {
        timeRange.addEventListener('change', function() {
            const range = this.value;
            updateChartData(document.getElementById('parkSelect').value, range);
            showNotification(`Time range updated to ${this.options[this.selectedIndex].text}`);
        });
    }

    // Bat adoption buttons
    const adoptButtons = document.querySelectorAll('.btn-adopt');
    adoptButtons.forEach(button => {
        button.addEventListener('click', function() {
            const batCard = this.closest('.bat-card');
            const batName = batCard.querySelector('h4').textContent;
            
            if (this.textContent === 'Follow') {
                this.textContent = 'Following';
                this.style.background = '#10b981';
                showNotification(`Now following ${batName}! 🦇`);
            } else {
                this.textContent = 'Follow';
                this.style.background = '#3b82f6';
                showNotification(`Unfollowed ${batName}`);
            }
        });
    });
}

// ===========================
// Data Point Details
// ===========================
function showDataPointDetails(index, chartType) {
    let message = '';
    
    if (chartType === 'activity') {
        const point = activityChart.data.datasets[0].data[index];
        message = `Data Point Details:\nLight Level: ${point.x} lux\nBat Activity: ${point.y} detections\n\nThis represents a ${point.y > 10 ? 'high' : 'low'} activity period ${point.x > 5 ? 'with significant light pollution' : 'during darker conditions'}.`;
    }
    
    alert(message);
}

// ===========================
// Real-time Simulation
// ===========================
let metricsInterval, chartsInterval;

function startRealTimeSimulation() {
    // Clear any existing intervals to prevent duplicates
    if (metricsInterval) clearInterval(metricsInterval);
    if (chartsInterval) clearInterval(chartsInterval);
    
    // Update metrics every 30 seconds
    metricsInterval = setInterval(() => {
        updateMetrics();
    }, 30000);

    // Update charts occasionally (every 2 minutes)
    chartsInterval = setInterval(() => {
        if (Math.random() > 0.7) { // 30% chance every 2 minutes
            const parkSelect = document.getElementById('parkSelect');
            const timeRange = document.getElementById('timeRange');
            if (parkSelect && timeRange) {
                updateChartData(parkSelect.value, timeRange.value);
            }
        }
    }, 120000); // Check for updates every 2 minutes
}

function stopRealTimeSimulation() {
    if (metricsInterval) clearInterval(metricsInterval);
    if (chartsInterval) clearInterval(chartsInterval);
}

// ===========================
// Export Functions
// ===========================
function exportChartData(chartType) {
    let data, filename;
    
    if (chartType === 'activity' && activityChart) {
        data = activityChart.data.datasets[0].data;
        filename = 'bat_activity_vs_light_data.json';
    } else if (chartType === 'hourly' && hourlyChart) {
        data = {
            labels: hourlyChart.data.labels,
            data: hourlyChart.data.datasets[0].data
        };
        filename = 'hourly_bat_detections.json';
    }
    
    if (data) {
        const jsonString = JSON.stringify(data, null, 2);
        const blob = new Blob([jsonString], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        showNotification(`${filename} downloaded successfully`);
    }
}

// ===========================
// Accessibility for Charts
// ===========================
function makeChartsAccessible() {
    // Add keyboard navigation for chart elements
    const chartContainers = document.querySelectorAll('.chart-container');
    
    chartContainers.forEach(container => {
        const canvas = container.querySelector('canvas');
        if (canvas) {
            canvas.setAttribute('role', 'img');
            canvas.setAttribute('aria-label', 'Interactive chart showing bat activity data');
            canvas.setAttribute('tabindex', '0');
            
            canvas.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    const chartTitle = container.querySelector('h3').textContent;
                    showNotification(`Viewing ${chartTitle} - Use mouse to interact with data points`);
                }
            });
        }
    });
}

// ===========================
// Initialize Dashboard
// ===========================
let dashboardInitialized = false;

document.addEventListener('DOMContentLoaded', function() {
    if (!dashboardInitialized && document.getElementById('activityChart')) {
        dashboardInitialized = true;
        
        setTimeout(() => {
            makeChartsAccessible();
            startRealTimeSimulation();
        }, 1000);
    }
});

// Clean up when leaving the page
window.addEventListener('beforeunload', function() {
    stopRealTimeSimulation();
    if (activityChart) activityChart.destroy();
    if (hourlyChart) hourlyChart.destroy();
});

// ===========================
// Error Handling for Charts
// ===========================
window.addEventListener('error', function(e) {
    if (e.message && e.message.includes('Chart')) {
        console.error('Chart.js error detected:', e);
        
        // Fallback for missing Chart.js
        if (typeof Chart === 'undefined') {
            console.warn('Chart.js library not loaded, showing fallback');
            const chartContainers = document.querySelectorAll('.chart-container canvas');
            chartContainers.forEach(canvas => {
                if (canvas && canvas.style) {
                    canvas.style.display = 'none';
                    const fallback = document.createElement('div');
                    fallback.innerHTML = `
                        <div style="background: #f3f4f6; padding: 2rem; border-radius: 0.5rem; text-align: center; color: #6b7280;">
                            <i class="fas fa-chart-line" style="font-size: 2rem; margin-bottom: 1rem; color: #3b82f6;"></i>
                            <p>Chart visualization requires Chart.js library</p>
                            <p><small>This is a demo showing where interactive charts would appear</small></p>
                        </div>
                    `;
                    canvas.parentNode.appendChild(fallback);
                }
            });
        }
        
        // Stop the simulation if charts fail
        stopRealTimeSimulation();
    }
});

console.log('📊 Dashboard JavaScript initialized');
console.log('📈 Chart interactions ready');
console.log('🔄 Real-time simulation configured');
