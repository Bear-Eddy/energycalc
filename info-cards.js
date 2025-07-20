// Info Cards Dynamic Update Module

const InfoCardUpdater = {
    // Update all info cards based on current input values
    updateCards() {
        console.log('Updating info cards...');
        
        // Get values directly from DOM instead of relying on PersonalCalculator
        const inputs = {
            smartphoneHours: parseFloat(document.getElementById('smartphone-hours').value) || 0,
            computerHours: parseFloat(document.getElementById('computer-hours').value) || 0,
            streamingHours: parseFloat(document.getElementById('streaming-hours').value) || 0,
            aiTextHours: parseFloat(document.getElementById('ai-text-hours').value) || 0,
            aiImages: parseFloat(document.getElementById('ai-images').value) || 0,
            aiVideoMins: parseFloat(document.getElementById('ai-video-mins').value) || 0,
            carType: document.getElementById('car-type').value,
            milesDriven: parseFloat(document.getElementById('miles-driven').value) || 0
        };
        
        console.log('Input values:', inputs);
        
        // Update digital cards
        this.updateSmartphoneCard(inputs.smartphoneHours);
        this.updateComputerCard(inputs.computerHours);
        this.updateStreamingCard(inputs.streamingHours);
        this.updateAICard(inputs.aiTextHours, inputs.aiImages, inputs.aiVideoMins);
        
        // Update transportation cards
        this.updateCarCards(inputs.carType, inputs.milesDriven);
    },
    
    // Update smartphone card
    updateSmartphoneCard(hours) {
        console.log('Updating smartphone card with hours:', hours);
        const energy = (hours * EnergyConfig.energyFactors.smartphone).toFixed(1);
        const valueEl = document.getElementById('smartphone-value');
        const descEl = document.getElementById('smartphone-desc');
        
        console.log('Smartphone energy calculated:', energy);
        console.log('Value element found:', !!valueEl);
        console.log('Desc element found:', !!descEl);
        
        if (valueEl) {
            valueEl.innerHTML = `${energy}<span class="unit"> kWh/day</span>`;
        }
        if (descEl) {
            descEl.textContent = `${hours}hr use + infrastructure`;
        }
    },
    
    // Update computer card
    updateComputerCard(hours) {
        const energy = (hours * EnergyConfig.energyFactors.computer).toFixed(1);
        const valueEl = document.getElementById('computer-value');
        const descEl = document.getElementById('computer-desc');
        
        if (valueEl) {
            valueEl.innerHTML = `${energy}<span class="unit"> kWh/day</span>`;
        }
        if (descEl) {
            descEl.textContent = `${hours}hr work + cloud`;
        }
    },
    
    // Update streaming card
    updateStreamingCard(hours) {
        const energy = (hours * EnergyConfig.energyFactors.streaming).toFixed(1);
        const valueEl = document.getElementById('streaming-value');
        const descEl = document.getElementById('streaming-desc');
        
        if (valueEl) {
            valueEl.innerHTML = `${energy}<span class="unit"> kWh/day</span>`;
        }
        if (descEl) {
            descEl.textContent = `${hours}hr entertainment`;
        }
    },
    
    // Update AI card
    updateAICard(textHours, images, videoMins) {
        console.log('updateAICard called with:', { textHours, images, videoMins });
        const factors = EnergyConfig.energyFactors;
        const aiEnergy = (textHours * factors.aiText) + 
                        (images * factors.aiImage) + 
                        (videoMins * factors.aiVideo);
        
        console.log('AI energy calculated:', aiEnergy);
        
        const valueEl = document.getElementById('ai-value');
        const descEl = document.getElementById('ai-desc');
        
        if (valueEl) {
            if (aiEnergy === 0) {
                valueEl.innerHTML = `0<span class="unit"> kWh/day</span>`;
            } else if (aiEnergy < 0.1) {
                valueEl.innerHTML = `${aiEnergy.toFixed(3)}<span class="unit"> kWh/day</span>`;
            } else {
                valueEl.innerHTML = `${aiEnergy.toFixed(1)}<span class="unit"> kWh/day</span>`;
            }
        }
        
        if (descEl) {
            if (aiEnergy === 0) {
                descEl.textContent = 'No AI usage';
            } else {
                let desc = [];
                if (textHours > 0) desc.push(`${textHours}hr chat`);
                if (images > 0) desc.push(`${images} images`);
                if (videoMins > 0) desc.push(`${videoMins}min video`);
                descEl.textContent = desc.join(', ');
            }
        }
    },
    
    // Update car cards based on car type
    updateCarCards(carType, milesDriven) {
        const gasCard = document.getElementById('gas-car-card');
        const electricCard = document.getElementById('electric-car-card');
        const gasValue = document.getElementById('gas-car-value');
        const gasDesc = document.getElementById('gas-car-desc');
        const electricValue = document.getElementById('electric-car-value');
        const electricDesc = document.getElementById('electric-car-desc');
        
        // Calculate energies
        const gasEnergy = (milesDriven * EnergyConfig.energyFactors.gasCar).toFixed(1);
        const electricEnergy = (milesDriven * EnergyConfig.energyFactors.electricCar).toFixed(1);
        
        // Update values
        if (gasValue) {
            gasValue.innerHTML = `${gasEnergy}<span class="unit"> kWh/day</span>`;
        }
        if (gasDesc) {
            gasDesc.textContent = `${milesDriven}mi commute`;
        }
        if (electricValue) {
            electricValue.innerHTML = `${electricEnergy}<span class="unit"> kWh/day</span>`;
        }
        if (electricDesc) {
            electricDesc.textContent = `${milesDriven}mi commute`;
        }
        
        // Show/hide cards based on car type
        if (gasCard && electricCard) {
            // Reset opacity
            gasCard.style.opacity = '0.5';
            electricCard.style.opacity = '0.5';
            
            // Highlight the relevant card
            switch(carType) {
                case 'gas':
                    gasCard.style.opacity = '1';
                    break;
                case 'electric':
                    electricCard.style.opacity = '1';
                    break;
                case 'hybrid':
                    // Show both at partial opacity for hybrid
                    gasCard.style.opacity = '0.75';
                    electricCard.style.opacity = '0.75';
                    break;
                case 'none':
                    // Keep both faded for no car
                    break;
            }
        }
    },
    
    // Initialize the updater
    init() {
        console.log('Initializing InfoCardUpdater...');
        const self = this;
        
        // Add real-time updates
        const inputs = document.querySelectorAll('#smartphone-hours, #computer-hours, #streaming-hours, #ai-text-hours, #ai-images, #ai-video-mins, #car-type, #miles-driven');
        console.log('Found', inputs.length, 'input elements');
        
        inputs.forEach(input => {
            input.addEventListener('input', () => {
                self.updateCards();
            });
            input.addEventListener('change', () => {
                self.updateCards();
            });
        });
        
        // Initial update after a short delay
        setTimeout(() => {
            console.log('Running initial update...');
            this.updateCards();
        }, 200);
    },
    
    // Test function to directly update a card
    testUpdate() {
        console.log('Testing direct update...');
        const valueEl = document.getElementById('ai-value');
        const descEl = document.getElementById('ai-desc');
        console.log('AI value element:', valueEl);
        console.log('AI desc element:', descEl);
        
        if (valueEl) {
            valueEl.innerHTML = '99.9<span class="unit"> kWh/day</span>';
            console.log('Updated AI value to 99.9');
        }
        if (descEl) {
            descEl.textContent = 'TEST UPDATE WORKED';
            console.log('Updated AI description');
        }
    }
};

// Make InfoCardUpdater available globally immediately
window.InfoCardUpdater = InfoCardUpdater;