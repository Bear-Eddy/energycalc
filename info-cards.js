// Info Cards Dynamic Update Module

const InfoCardUpdater = {
    // Update all info cards based on current input values
    updateCards() {
        const inputs = PersonalCalculator.getInputValues();
        
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
        const energy = (hours * EnergyConfig.energyFactors.smartphone).toFixed(1);
        const valueEl = document.getElementById('smartphone-value');
        const descEl = document.getElementById('smartphone-desc');
        
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
        const factors = EnergyConfig.energyFactors;
        const aiEnergy = (textHours * factors.aiText) + 
                        (images * factors.aiImage) + 
                        (videoMins * factors.aiVideo);
        
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
        // Update cards when calculator runs
        const originalCalculate = PersonalCalculator.calculatePersonalFootprint;
        PersonalCalculator.calculatePersonalFootprint = function() {
            originalCalculate.call(PersonalCalculator);
            InfoCardUpdater.updateCards();
        };
        
        // Add real-time updates
        const inputs = document.querySelectorAll('#smartphone-hours, #computer-hours, #streaming-hours, #ai-text-hours, #ai-images, #ai-video-mins, #car-type, #miles-driven');
        inputs.forEach(input => {
            input.addEventListener('input', () => {
                InfoCardUpdater.updateCards();
            });
            input.addEventListener('change', () => {
                InfoCardUpdater.updateCards();
            });
        });
        
        // Initial update
        this.updateCards();
    }
};