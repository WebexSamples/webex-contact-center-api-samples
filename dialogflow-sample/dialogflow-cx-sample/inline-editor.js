/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */
const https = require('https');

exports.acc_balance = (req, res) => {
  const mockApiUrl = 'https://aedb299d-87b3-4c1d-81cc-cc947f3ad605.mock.pstmn.io/Neha Manshiva';

    https
    .get(mockApiUrl, (apiResponse) => {
      let data = '';
      apiResponse.on('data', (chunk) => {
        data += chunk;        
      });
 
      apiResponse.on('end', () => {
        try {
          const responseData = JSON.parse(data); // Parse the response data as JSON
          const bal = responseData.balance; // Extract the value of the "balance" key
 
          const jsonResponse = {
              fulfillment_response: {
                messages: [
                  {
                    text: {
                      //fulfillment text response to be sent to the agent
                      text: ["The balance amount in your account is " + bal + "."],
                    },
                  },
                ],
              },
            };

          console.log('balance is :', bal);
          res.status(200).send(jsonResponse);
        } 
        catch (error) {
          console.error('Error parsing JSON response:', error.message);
          res.status(500).send('Error parsing JSON response');
        }
      });
    })
    .on('error', (error) => {
      // Handle errors if the API call fails
      console.error('Error calling Mock API:', error.message);
      res.status(500).send('Error calling Mock API');
    });
};
