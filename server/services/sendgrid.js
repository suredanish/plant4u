const client = require('@sendgrid/mail');
client.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = (to, body, subject) => {
    try {
        const message = {
            from: {
                email: 'info@plant4u.in',
                name: 'plant4u'
            },
            to: {
                email: to,
            },
            subject: subject,
            content: [
              {
                type: 'text/html',
                value: body
              }
            ]
          };
          
        client
        .send(message)
        .then(() => console.log('Mail sent successfully'))
        .catch(error => {
            console.error('error is here',error);
        });
    }
    catch ( error ) {
        console.log(error, 'error is here')
        throw error ;
    }
}

module.exports = sendEmail