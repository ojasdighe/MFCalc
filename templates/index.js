{/* <script>
        document.addEventListener('DOMContentLoaded', function() {
            const form = document.getElementById('calculatorForm');
            const results = document.getElementById('results');
            const sipOptions = document.getElementById('sipOptions');
            const additionalFields = document.getElementById('additionalFields');

            // Sync number inputs with range inputs
            function syncInputs(inputId, rangeId) {
                const input = document.getElementById(inputId);
                const range = document.getElementById(rangeId);
                input.addEventListener('input', () => range.value = input.value);
                range.addEventListener('input', () => input.value = range.value);
            }

            syncInputs('amount', 'amountRange');
            syncInputs('years', 'yearsRange');
            syncInputs('expectedReturn', 'expectedReturnRange');

            // Handle investment type changes
            document.querySelectorAll('input[name="investmentType"]').forEach(radio => {
                radio.addEventListener('change', function() {
                    sipOptions.style.display = this.value === 'sip' ? '' : 'none';
                    additionalFields.innerHTML = '';

                    if (this.value === 'swp') {
                    console.log("working swp")

                        additionalFields.innerHTML = `
                            <div class="form-group input-box-container">
                                <label class="small-heading" for="monthlyWithdrawal">Monthly Withdrawal (₹)</label>
                                <input type="number" id="monthlyWithdrawal" name="monthlyWithdrawal" value="5000" min="0" class="input-box">
                                <input type="range" id="monthlyWithdrawalRange" min="0" max="100000" step="1000" value="5000" class="slider">
                            </div>
                        `;
                        syncInputs('monthlyWithdrawal', 'monthlyWithdrawalRange');
                    } else if (this.value === 'stp') {
                        additionalFields.innerHTML = `
                            <div class="form-group input-box-container">
                                <label class="small-heading" for="monthlyTransfer">Monthly Transfer Amount (₹)</label>
                                <input type="number" id="monthlyTransfer" name="monthlyTransfer" value="5000" min="0" class="input-box">
                                <input type="range" id="monthlyTransferRange" min="0" max="100000" step="1000" value="5000" class="slider">
                            </div>
                            <div class="form-group input-box-container">
                                <label class="small-heading" for="sourceReturn">Source Fund Return (%)</label>
                                <input type="number" id="sourceReturn" name="sourceReturn" value="8" min="0" max="100" class="input-box">
                                <input type="range" id="sourceReturnRange" min="0" max="100" step="0.1" value="8" class="slider">
                            </div>
                            <div class="form-group input-box-container">
                                <label class="small-heading" for="targetReturn">Target Fund Return (%)</label>
                                <input type="number" id="targetReturn" name="targetReturn" value="12" min="0" max="100" class="input-box">
                                <input type="range" id="targetReturnRange" min="0" max="100" step="0.1" value="12" class="slider">
                            </div>
                        `;
                        syncInputs('monthlyTransfer', 'monthlyTransferRange');
                        syncInputs('sourceReturn', 'sourceReturnRange');
                        syncInputs('targetReturn', 'targetReturnRange');
                    console.log("working stp")

                    }
                });
            });

            // Handle form submission
            form.addEventListener('submit', async function(e) {
                e.preventDefault();
                const formData = new FormData(form);
                const data = Object.fromEntries(formData);
console.log("Data", data)
                try {
                    const response = await fetch('/calculate', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(data)
                    });

                    const result = await response.json();
                    console.log(result)
                    if (result.success) {
                        displayResults(result);
                    } else {
                        throw new Error(result.error);
                    }
                } catch (error) {
                    results.innerHTML = `<div class="error">Error: ${error.message}</div>`;
                    results.classList.remove('hidden');
                }
                
            });

            function displayResults(result) {
                let html = '<div class="box-result"><h2>Results</h2> <div class="line"></div></div>';
                
                // data.investmentType

                if (result.investment_type === 'stp') {
                    console.log("working result")
                    html += `
                        <div class="result-value">Source Fund Final Value: ₹${result.source_final.toLocaleString()}</div>
                        <div class="result-value">Target Fund Final Value: ₹${result.target_final.toLocaleString()}</div>
                        <div class="result-value">Total Portfolio Value: ₹${result.source_final + result.target_final}</div>
                    `;
                } else {
                    console.log("not working result")

                    html += `<div class="result-value">Future Value: ₹ <span class="green-text">${result.future_value.toLocaleString()}</span> </div>`;
                }

                results.innerHTML = html;
                results.classList.remove('hidden');
            }
        });
    </script> */}