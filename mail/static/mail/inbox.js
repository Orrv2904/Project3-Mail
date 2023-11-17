document.addEventListener('DOMContentLoaded', function () {

  // Use buttons to toggle between views
  document.querySelector('#inbox').addEventListener('click', () => load_mailbox('inbox'));
  document.querySelector('#sent').addEventListener('click', () => load_mailbox('sent'));
  document.querySelector('#archived').addEventListener('click', () => load_mailbox('archive'));
  document.querySelector('#compose').addEventListener('click', compose_email);


  document.querySelector('#compose-form').addEventListener('submit', send_email);


  // By default, load the inbox
  load_mailbox('inbox');
});

function compose_email() {

  // Show compose view and hide other views
  document.querySelector('#emails-view').style.display = 'none';
  document.querySelector('#compose-view').style.display = 'block';

  // Clear out composition fields
  document.querySelector('#compose-recipients').value = '';
  document.querySelector('#compose-subject').value = '';
  document.querySelector('#compose-body').value = '';
}

function load_mailbox(mailbox) {

  // Show the mailbox and hide other views
  document.querySelector('#emails-view').style.display = 'block';
  document.querySelector('#compose-view').style.display = 'none';

  // Show the mailbox name
  document.querySelector('#emails-view').innerHTML = `<h3>${mailbox.charAt(0).toUpperCase() + mailbox.slice(1)}</h3>`;

  fetch(`/emails/${mailbox}`)
    .then(response => response.json())
    .then(emails => {
      console.log(emails);
      emails.forEach(singleEmails => {
        const newEmail = document.createElement('div');
        newEmail.innerHTML = 'This is the content of the div.';
        newEmail.addEventListener('click', function () {
          console.log('This newEmail has been clicked!')
        });
        document.querySelector('#emails-view').append(newEmail);
      });
    });
}

function send_email(e) {
  e.preventDefault();
  const recipient = document.querySelector('#compose-recipients').value
  const subject = document.querySelector('#compose-subject').value
  const body = document.querySelector('#compose-body').value

  fetch('/emails', {
    method: 'POST',
    body: JSON.stringify({
      recipients: recipient,
      subject: subject,
      body: body
    })
  })
    .then(response => response.json())
    .then(result => {
      console.log(result);

      if (result && result.error) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: result.error,
        });
      } else if (result && result.message) {
        Swal.fire({
          icon: 'info',
          title: 'Info',
          text: result.message,
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'An unexpected error occurred.',
        });
      }

      load_mailbox('sent');
    })
    .catch(error => {
      console.error(error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'An error occurred while processing your request.',
      });

    });


}