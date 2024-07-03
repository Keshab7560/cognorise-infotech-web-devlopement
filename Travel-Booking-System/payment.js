const stripe = Stripe('your_stripe_public_key');

document.getElementById('payment-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const { clientSecret } = await fetch('/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: 5000 })
    }).then(res => res.json());

    const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
            card: document.getElementById('card-element')
        }
    });

    if (result.error) {
        alert(result.error.message);
    } else {
        alert('Payment successful!');
    }
});
