// First, import the necessary libraries and dependencies
const express = require('express');
const twilio = require('twilio');
const bodyParser = require('body-parser');

// Next, set up your API client by providing your Twilio Account SID and Auth Token
const client = new twilio("AC7e349523234e483b283b3e62fefb4014","50b63f994f3f16631e26b95b428e775b");

// Create an Express app to host your user interface
const app = express();

// Use body-parser to parse the request body and extract the message and phone numbers
app.use(bodyParser.urlencoded({ extended: false }));

// Define a route for the form submission
app.post('/send-message', async (req, res) => {
  // Extract the message and phone numbers from the request body
  const message = req.body.message;
  const phoneNumbers = req.body.phoneNumbers.split(',');


  console.log(req.body,"in sendmessage")
  // Send the message to the list of phone numbers
  await sendBulkMessage(message, phoneNumbers);

  // Redirect the user back to the form
  res.redirect('/');
});

// Define a function that sends a message to a list of phone numbers using the WhatsApp API
async function sendBulkMessage(message, phoneNumbers) {
  // Iterate over the list of phone numbers and send the message to each one
  for (const phoneNumber of phoneNumbers) {
    try {
      // Use the sendMessage method of the API client to send the message
    //   console.log(phoneNumber, 'here');
    //   const result = await client.messages.create({
    //     body: message,
    //     from: 'whatsapp:15005550006',
    //     to: `whatsapp:${phoneNumber}`
    //   });

      const result = await client.messages.create({
        body: message,
        from: 'whatsapp:+14155238886',
        to: `whatsapp:${phoneNumber}`
    });


      console.log(`Message sent to ${phoneNumber}:`, result.sid);
    } catch (error) {
      console.error(`Error sending message to ${phoneNumber}:`, error);
    }
  }
}

// Finally, create a user interface for your web application
app.get('/', (req, res) => {
  res.send(`
    <form method="POST" action="/send-message">
      <textarea name="message"></textarea>
      <br>
      <input type="text" name="phoneNumbers" placeholder="Phone numbers, separated by commas">
      <br>
      <button type="submit">Send message</button>
    </form>
  `);
});

// Start the server
app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
