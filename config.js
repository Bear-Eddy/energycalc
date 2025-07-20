// Energy Calculator - Configuration and Constants

const EnergyConfig = {
    // Energy factors for calculations
    energyFactors: {
        // Digital devices (kWh per hour)
        smartphone: 0.1,
        computer: 1.0,
        streaming: 0.25,
        
        // AI usage
        aiText: 0.3,        // kWh per hour
        aiImage: 0.1,       // kWh per image
        aiVideo: 1.0,       // kWh per minute
        
        // Transportation (kWh per mile)
        gasCar: 1.1,
        electricCar: 0.33,
        hybridCar: 0.7,
        
        // Other
        flightEnergy: 3000, // kWh per flight
        transitEnergy: 2,   // kWh per hour
        restaurantMeal: 1.5, // kWh per meal
        shoppingOrder: 8,    // kWh per order
    },
    
    // Home energy factors
    homeEnergyFactors: {
        baseEnergy: 30,
        sizeMultipliers: {
            'small': 0.6,
            'medium': 1.0,
            'large': 1.5,
            'xlarge': 2.0
        },
        climateMultipliers: {
            'mild': 0.7,
            'moderate': 1.0,
            'extreme': 1.5
        },
        perPersonAdjustment: 3
    },
    
    // Diet energy factors (kWh per day)
    dietEnergyFactors: {
        'meat-heavy': 20,
        'average': 15,
        'vegetarian': 12,
        'vegan': 10
    },
    
    // Chart colors
    colors: {
        digital: '#64ffda',
        home: '#fb923c',
        transport: '#a855f7',
        food: '#22c55e',
        goods: '#ef4444',
        ai: '#ffa500',
        visible: '#5eead4',
        hidden: '#f77062'
    },
    
    // Chart data for static displays
    staticChartData: {
        mainBreakdown: {
            labels: [
                'HVAC', 'Gas Car', 'Food Production', 'Goods Mfg', 'Hot Water',
                'Appliances', 'Services', 'Laptop+Cloud', 'Air Travel', 'Food Prep',
                'Lighting', 'Streaming', 'AI Usage', 'Smartphone', 'Smart Home'
            ],
            data: [25, 33, 15, 10, 10, 8, 8, 8, 8, 5, 2, 0.8, 1, 0.5, 1.5],
            colors: [
                '#fb923c', '#a855f7', '#22c55e', '#ef4444', '#fb923c',
                '#fb923c', '#ef4444', '#64ffda', '#a855f7', '#22c55e',
                '#fb923c', '#64ffda', '#ffa500', '#64ffda', '#64ffda'
            ]
        },
        
        categoryData: {
            labels: ['Home Energy', 'Transportation', 'Digital Life', 'Food System', 'Goods & Services'],
            data: [50, 41, 11, 20, 18]
        },
        
        hiddenVsVisible: {
            labels: ['Digital', 'Food', 'Goods', 'Transport', 'Home'],
            visible: [2, 5, 0, 33, 50],
            hidden: [9, 15, 18, 8, 0]
        },
        
        digitalInfrastructure: {
            labels: ['Data Centers', 'Network Infrastructure', 'Content Delivery', 'Device Manufacturing', 'AI Processing', 'Cooling Systems'],
            data: [85, 70, 60, 40, 95, 80]
        },
        
        homeProfile: {
            labels: ['Space Heating/Cooling', 'Water Heating', 'Refrigeration', 'Washer/Dryer', 'Lighting', 'Electronics', 'Cooking'],
            data: [25, 10, 4, 2, 2, 1.5, 0.5]
        },
        
        equivalents: {
            labels: [
                '1 Day Total Energy = Miles in Gas Car',
                '1 Hour AI Use = Phone Charges',
                '1 Day Smartphone = LED Bulb Days',
                '1 Day HVAC = EV Miles',
                '1 AI Image = Minutes of Streaming'
            ],
            data: [140, 20, 100, 80, 30]
        },
        
        annualVariation: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            home: [65, 60, 45, 35, 30, 45, 55, 55, 40, 35, 45, 65],
            transport: [40, 40, 41, 42, 43, 45, 48, 48, 43, 42, 41, 40],
            digital: [11, 11, 11, 11, 12, 12, 13, 13, 12, 12, 11, 11]
        }
    },
    
    // Average values for comparison
    averages: {
        americanDaily: 130,
        totalDaily: {
            min: 110,
            max: 150
        },
        annualMWh: {
            min: 40,
            max: 55
        },
        dailyCost: {
            min: 11,
            max: 15
        },
        annualCO2: {
            min: 18,
            max: 27
        }
    }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = EnergyConfig;
}