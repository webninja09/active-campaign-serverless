const axios = require('axios');

exports.handler = async function (event) {
    try {
      const { email, message, subject } = JSON.parse(event.body);
  
      const activeCampaignUrl = 'https://ytjetpack.activehosted.com/';
      const activeCampaignApiKey = '7ee347d48c162d68f11d88b8b1b2647118690d262c13ab915b2f0597579bc569fc8a1dd8';
      const endpoint = activeCampaignUrl + "campaigns";

      const requestData = {
        name: subject,
        message: message,
        contacts: [
          {
            email: email
          }
        ]
      };


  
      const response = await axios.post(endpoint, requestData, {
        headers: {
          'Content-Type': 'application/json',
          'Api-Token': activeCampaignApiKey
        }
      });
  
      if (response.status === 200) {
        console.log('Email sent successfully!');
      } else {
        console.error('Failed to send the email.');
      }
  
      return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Email sent successfully!' })
      };
    } catch (error) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "error occured - " + error })
      };
    }
  };