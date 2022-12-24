// domain/.netlify/functions/create-payment-intent
// const items = [
//   { id: 1, name: 'john' },
//   { id: 2, name: 'peter' },
// ];

require('dotenv').config();

const stripe = require('stripe')(process.env.REACT_APP_STRIPE_SECRET_KEY);

exports.handler = async function (event, context) {
  // post request
  if (event.body) {
    const { cart, shipping_fee, total_amount } = JSON.parse(event.body);

    const calculateOrderAmount = (items) => {
      // Replace this constant with a calculation of the order's amount
      // Calculate the order total on the server to prevent
      // people from directly manipulating the amount on the client
      return total_amount + shipping_fee;
    };

    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: calculateOrderAmount(),
        currency: 'INR',
      });

      return {
        statusCode: 200,
        body: JSON.stringify({ clientSecret: paymentIntent.client_secret }),
      };
    } catch (error) {}
  }

  // get request
  // when we navigate using browser we are performing get request so we returning below code
  return {
    statusCode: 500,
    body: JSON.stringify({ msg: error.message }),
  };
};
