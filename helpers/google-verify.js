const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_ID);

/* Copy pasteada de la pagina de google 
   https://developers.google.com/identity/sign-in/web/backend-auth 
   pero modificada. Comaparar */

const verifyGoogle = async(token) => {
  const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_ID,  // Specify the CLIENT_ID of the app that accesses the backend
      // Or, if multiple clients access the backend:
      //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
  });
  const payload = ticket.getPayload();
  const userid = payload['sub'];
  // If request specified a G Suite domain:
  // const domain = payload['hd'];
  console.log(payload);
  const {name,email,picture} = payload;
  return {name,email,picture}
}

module.exports = {
    verifyGoogle
}