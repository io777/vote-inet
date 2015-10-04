Meteor.startup(function () {
  // test with gmail
  
  process.env.MAIL_URL='smtp://opros.intreneta%40mail.ru:' + encodeURIComponent("{thdfvdctv777") + '@smtp.mail.ru:465';
  // test with SendGrid
  // process.env.MAIL_URL = 'smtp://your_username:your_password@smtp.sendgrid.net:587';
  console.log(process.env);
});

// Accounts.emailTemplates.siteName = "Опрос интернета";
// Accounts.emailTemplates.from = "Опрос интренета <opros.intreneta@mail.ru>";

// if (Meteor.isServer) {
    // Email.send({
    //     from: 'server@example.com',
    //     to: 'shirling@mail.ru',
    //     subject: 'This is a test email',
    //     html: '<b>Congrats, it works!</b>'
    // });
  
// PrettyEmail.send('call-to-action', {
//   to: 'maddesire@inbox.ru',
//   subject: 'You got new message',
//   heading: 'Your friend sent you a message',
//   message: 'Click the button below to read the message',
//   buttonText: 'Read message',
//   buttonUrl: 'http://mycompany.com/messages/2314'
//   });

// }
