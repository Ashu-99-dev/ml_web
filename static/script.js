document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('predictionForm');
    const submitBtn = document.getElementById('submitBtn');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnIcon = submitBtn.querySelector('.btn-icon');
    const spinner = document.getElementById('loadingSpinner');
    
    const resultContainer = document.getElementById('resultContainer');
    const predictionResult = document.getElementById('predictionResult');
    
    const errorContainer = document.getElementById('errorContainer');
    const errorMessage = document.getElementById('errorMessage');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Hide previous results/errors
        resultContainer.classList.add('hidden');
        errorContainer.classList.add('hidden');
        
        // UI Loading state
        submitBtn.disabled = true;
        btnText.classList.add('hidden');
        if (btnIcon) btnIcon.classList.add('hidden');
        spinner.classList.remove('hidden');

        // Gather form data
        const formData = new FormData(form);
        const data = {
            N: parseFloat(formData.get('N')),
            P: parseFloat(formData.get('P')),
            K: parseFloat(formData.get('K')),
            temperature: parseFloat(formData.get('temperature')),
            humidity: parseFloat(formData.get('humidity')),
            ph: parseFloat(formData.get('ph')),
            rainfall: parseFloat(formData.get('rainfall'))
        };

        try {
            // Make prediction request
            const response = await fetch('/predict', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.detail || 'Failed to get prediction');
            }

            // Show result
            predictionResult.textContent = result.prediction;
            resultContainer.classList.remove('hidden');
            
            // Optional: smoothly scroll to result
            resultContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

        } catch (error) {
            // Show error
            errorMessage.textContent = error.message;
            errorContainer.classList.remove('hidden');
        } finally {
            // Restore UI
            submitBtn.disabled = false;
            btnText.classList.remove('hidden');
            if (btnIcon) btnIcon.classList.remove('hidden');
            spinner.classList.add('hidden');
        }
    });
});
