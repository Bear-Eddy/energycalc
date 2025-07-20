// Energy Calculator - Personal Calculator Module

const PersonalCalculator = {
    // Initialize calculator
    init() {
        this.setupEventListeners();
    },
    
    // Set up event listeners
    setupEventListeners() {
        const calculateBtn = document.getElementById('calculate-btn');
        const resultsDiv = document.getElementById('personal-results');
        
        calculateBtn.addEventListener('click', () => this.calculatePersonalFootprint());
        
        // Add input listeners for real-time updates
        const inputs = document.querySelectorAll('input, select');
        inputs.forEach(input => {
            input.addEventListener('change', () => {
                if (!resultsDiv.classList.contains('hidden')) {
                    this.calculatePersonalFootprint();
                }
            });
        });
    },
    
    // Get input values
    getInputValues() {
        return {
            // Digital Life
            smartphoneHours: parseFloat(document.getElementById('smartphone-hours').value) || 0,
            computerHours: parseFloat(document.getElementById('computer-hours').value) || 0,
            streamingHours: parseFloat(document.getElementById('streaming-hours').value) || 0,
            aiTextHours: parseFloat(document.getElementById('ai-text-hours').value) || 0,
            aiImages: parseFloat(document.getElementById('ai-images').value) || 0,
            aiVideoMins: parseFloat(document.getElementById('ai-video-mins').value) || 0,
            
            // Transportation
            carType: document.getElementById('car-type').value,
            milesDriven: parseFloat(document.getElementById('miles-driven').value) || 0,
            flightsYear: parseFloat(document.getElementById('flights-year').value) || 0,
            transitHours: parseFloat(document.getElementById('transit-hours').value) || 0,
            
            // Home
            homeSize: document.getElementById('home-size').value,
            climate: document.getElementById('climate').value,
            householdSize: parseFloat(document.getElementById('household-size').value) || 1,
            
            // Lifestyle
            dietType: document.getElementById('diet-type').value,
            mealsOut: parseFloat(document.getElementById('meals-out').value) || 0,
            shoppingOrders: parseFloat(document.getElementById('shopping-orders').value) || 0
        };
    },
    
    // Calculate digital energy
    calculateDigitalEnergy(inputs) {
        const factors = EnergyConfig.energyFactors;
        
        const smartphoneEnergy = inputs.smartphoneHours * factors.smartphone;
        const computerEnergy = inputs.computerHours * factors.computer;
        const streamingEnergy = inputs.streamingHours * factors.streaming;
        
        // AI energy calculations
        const aiTextEnergy = inputs.aiTextHours * factors.aiText;
        const aiImageEnergy = inputs.aiImages * factors.aiImage;
        const aiVideoEnergy = inputs.aiVideoMins * factors.aiVideo;
        const aiTotalEnergy = aiTextEnergy + aiImageEnergy + aiVideoEnergy;
        
        return {
            total: smartphoneEnergy + computerEnergy + streamingEnergy + aiTotalEnergy,
            aiTotal: aiTotalEnergy
        };
    },
    
    // Calculate transportation energy
    calculateTransportEnergy(inputs) {
        const factors = EnergyConfig.energyFactors;
        let carEnergy = 0;
        
        switch(inputs.carType) {
            case 'gas':
                carEnergy = inputs.milesDriven * factors.gasCar;
                break;
            case 'electric':
                carEnergy = inputs.milesDriven * factors.electricCar;
                break;
            case 'hybrid':
                carEnergy = inputs.milesDriven * factors.hybridCar;
                break;
        }
        
        const flightEnergy = (inputs.flightsYear * factors.flightEnergy) / 365;
        const transitEnergy = (inputs.transitHours * factors.transitEnergy) / 7;
        
        return carEnergy + flightEnergy + transitEnergy;
    },
    
    // Calculate home energy
    calculateHomeEnergy(inputs) {
        const homeFactors = EnergyConfig.homeEnergyFactors;
        
        const baseEnergy = homeFactors.baseEnergy;
        const sizeFactor = homeFactors.sizeMultipliers[inputs.homeSize] || 1;
        const climateFactor = homeFactors.climateMultipliers[inputs.climate] || 1;
        
        const homeEnergy = baseEnergy * sizeFactor * climateFactor;
        const perPersonAdjustment = (inputs.householdSize - 1) * homeFactors.perPersonAdjustment;
        
        return homeEnergy + perPersonAdjustment;
    },
    
    // Calculate lifestyle energy
    calculateLifestyleEnergy(inputs) {
        const factors = EnergyConfig.energyFactors;
        const dietFactors = EnergyConfig.dietEnergyFactors;
        
        const foodEnergy = dietFactors[inputs.dietType] || 15;
        const restaurantEnergy = inputs.mealsOut * factors.restaurantMeal;
        const shoppingEnergy = (inputs.shoppingOrders * factors.shoppingOrder) / 30;
        
        return foodEnergy + restaurantEnergy + shoppingEnergy;
    },
    
    // Generate comparison message
    generateComparisonMessage(total, aiEnergy) {
        const avgAmerican = EnergyConfig.averages.americanDaily;
        const percentage = ((total / avgAmerican) * 100).toFixed(0);
        let message = '';
        
        if (total < 80) {
            message = `<strong>Excellent!</strong> Your energy footprint is ${percentage}% of the average American's. You're in the top 10% for energy efficiency!`;
        } else if (total < 110) {
            message = `<strong>Good job!</strong> Your energy footprint is ${percentage}% of the average American's. You're more efficient than most!`;
        } else if (total < 150) {
            message = `<strong>About average.</strong> Your energy footprint is ${percentage}% of the typical American's. Consider reducing transportation or home energy use.`;
        } else {
            message = `<strong>Above average.</strong> Your energy footprint is ${percentage}% of the average American's. Look for ways to reduce, especially in your highest categories.`;
        }
        
        // Add AI-specific message if AI usage is high
        if (aiEnergy > 2) {
            message += `<br><br><strong>AI Note:</strong> Your AI usage adds ${aiEnergy.toFixed(1)} kWh/day. Consider using simpler models for basic tasks or batching queries.`;
        }
        
        return message;
    },
    
    // Main calculation function
    calculatePersonalFootprint() {
        console.log('calculatePersonalFootprint called');
        const inputs = this.getInputValues();
        console.log('Got inputs:', inputs);
        
        // Calculate energy by category
        const digitalResult = this.calculateDigitalEnergy(inputs);
        const transportTotal = this.calculateTransportEnergy(inputs);
        const homeTotal = this.calculateHomeEnergy(inputs);
        const lifestyleTotal = this.calculateLifestyleEnergy(inputs);
        
        const grandTotal = digitalResult.total + transportTotal + homeTotal + lifestyleTotal;
        
        // Update display
        document.getElementById('result-digital').textContent = digitalResult.total.toFixed(1);
        document.getElementById('result-transport').textContent = transportTotal.toFixed(1);
        document.getElementById('result-home').textContent = homeTotal.toFixed(1);
        document.getElementById('result-lifestyle').textContent = lifestyleTotal.toFixed(1);
        document.getElementById('result-total').textContent = grandTotal.toFixed(1);
        
        // Update comparison message
        const message = this.generateComparisonMessage(grandTotal, digitalResult.aiTotal);
        document.getElementById('comparison-message').innerHTML = message;
        
        // Show results
        const resultsDiv = document.getElementById('personal-results');
        resultsDiv.classList.remove('hidden');
        
        // Create personal chart
        ChartManager.createPersonalChart({
            digital: digitalResult.total,
            transport: transportTotal,
            home: homeTotal,
            lifestyle: lifestyleTotal
        });
        
        // Scroll to results
        resultsDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        
        // Update info cards with the calculated values
        if (window.InfoCardUpdater) {
            console.log('Updating info cards after calculation');
            window.InfoCardUpdater.updateCards();
        }
    }
};