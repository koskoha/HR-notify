const sendgrid = require('sendgrid');

const helper = sendgrid.mail;
const keys = require('../config/keys');

class Mailer extends helper.Mail {
  constructor({ fullName, anniversaryDate }, content) {
    super();

    this.sgApi = sendgrid(keys.sendGridKey);
    this.from_email = new helper.Email('no-reply@hrnotify.com');
    this.subject = `New anniversary date for ${fullName}`;
    this.body = new helper.Content('text/html', content);
    this.recipient = new helper.Email('kos.koha@gmail.com');

    this.addContent(this.body);
    this.addRecipients();
  }

  addRecipient = () => {
    const personalize = new helper.Personalization();
    personalize.addTo(this.recipient);
    this.addPersonalization(personalize);
  };

  send = async () => {
    const request = this.sgApi.emptyRequest({
      method: 'POST',
      path: '/v3/mail/send',
      body: this.toJSON(),
    });
    const response = await this.sgApi.API(request);
    return response;
  };
}

module.exports = Mailer;
