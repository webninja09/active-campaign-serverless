const axios = require('axios');

exports.handler = async function (event) {
    try {
      const { email } = JSON.parse(event.body);
  
      const activeCampaignUrl = 'https://ytjetpack.api-us1.com/';
      const activeCampaignApiKey = '7ee347d48c162d68f11d88b8b1b2647118690d262c13ab915b2f0597579bc569fc8a1dd8';
  
      // Create a contact in ActiveCampaign
      const contactResponse = await axios.post(
        activeCampaignUrl + 'contacts',
        {
          contact: {
            email: email
          }
        },
        {
          headers: {
            'Api-Token': activeCampaignApiKey
          }
        }
      );
  
      // Get the newly created contact ID
      const contactId = contactResponse.data.contact.id;
  
      // Send an email to the contact using a campaign ID
      const campaignId = '25';
      await axios.post(
        activeCampaignUrl + 'campaigns/' + campaignId + '/singles',
        {
          contact: contactId
        },
        {
          headers: {
            'Api-Token': activeCampaignApiKey
          }
        }
      );
  
      return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Email sent successfully!' })
      };
    } catch (error) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "error occured - " +error })
      };
    }
  };