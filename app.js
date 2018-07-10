document.getElementById('loan-form').addEventListener('submit', function(e){

    document.getElementById('results').style.display = 'none';

    document.getElementById('loading').style.display = 'block';

    setTimeout(calculateResult,2000);

    e.preventDefault();  
});

function calculateResult(e){
    const amount = document.getElementById('amount');
    const interest = document.getElementById('interest');
    const years = document.getElementById('years');

    const monthly_payment = document.getElementById('monthly_payment');
    const total_payment = document.getElementById('total_payment');
    const total_interest = document.getElementById('total_interest');

    const principal = parseFloat(amount.value);
    const calculatedInterest = parseFloat(interest.value) / 100 / 12;
    const calculatedPayment = parseFloat(years.value) * 12;

    const x = Math.pow(1+calculatedInterest, calculatedPayment);
    const monthly = (principal*x*calculatedInterest) / (x-1);

    if(isFinite(monthly)){
        monthly_payment.value = monthly.toFixed(2);
        total_payment.value = (monthly * calculatedPayment).toFixed(2);
        total_interest.value = ((monthly * calculatedPayment) - principal).toFixed(2);

        document.getElementById('results').style.display = 'block';
        document.getElementById('loading').style.display = 'none';

    } else {
        showError("Please, check your numbers !!!");
    }

}

function showError(error){
    document.getElementById('results').style.display = 'none';
    document.getElementById('loading').style.display = 'none';

    const errorDiv = document.createElement('div');

    const card = document.querySelector('.card');
    const heading  = document.querySelector('.heading');

    errorDiv.className = 'alert alert-danger';
    errorDiv.appendChild(document.createTextNode(error));

    card.insertBefore(errorDiv,heading);

    setTimeout(clearError, 3000);
}

function clearError(){
    document.querySelector('.alert').remove();
}