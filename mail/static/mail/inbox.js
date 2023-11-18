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
  document.querySelector('#email-detail').style.display = 'none';


  // Clear out composition fields
  document.querySelector('#compose-recipients').value = '';
  document.querySelector('#compose-subject').value = '';
  document.querySelector('#compose-body').value = '';
}

function load_mailbox(mailbox) {

  // Show the mailbox and hide other views
  document.querySelector('#emails-view').style.display = 'block';
  document.querySelector('#compose-view').style.display = 'none';
  document.querySelector('#email-detail').style.display = 'none';

  // Show the mailbox name
  document.querySelector('#emails-view').innerHTML = `<h3>${mailbox.charAt(0).toUpperCase() + mailbox.slice(1)}</h3>`;

  fetch(`/emails/${mailbox}`)
    .then(response => response.json())
    .then(emails => {
      console.log(emails);
      emails.forEach(singleEmails => {
        console.log(singleEmails)
        const newEmail = document.createElement('div');
        newEmail.classList.add('card', 'mb-3', 'border-primary');


        newEmail.innerHTML = `
          <div class="card-body">
            <h5 class="card-title">Sender: ${singleEmails.sender}</h5>
            <h6 class="card-subtitle mb-2 text-muted">Subject: ${singleEmails.subject}</h6>
            <p class="card-text">${singleEmails.timestamp}</p>
          </div>
        `;

        newEmail.style.cursor = 'pointer';
        newEmail.addEventListener('click', () => {
          view_email(singleEmails.id);
        });

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
};

function view_email(id) {
  console.log(id);
  fetch(`/emails/${id}`)
    .then(response => response.json())
    .then(email => {
      console.log(email);

      document.querySelector('#emails-view').style.display = 'none';
      document.querySelector('#compose-view').style.display = 'none';
      document.querySelector('#email-detail').style.display = 'block';

      const statusText = email.read ? 'Read' : 'Delivered';

      document.querySelector('#email-detail').innerHTML =
        `
        <div class="card">
        <div class="card-body">
          <h5 class="card-title">Email Details</h5>
          <ul class="list-group list-group-flush">
            <li class="list-group-item"><strong>From:</strong> ${email.sender}</li>
            <li class="list-group-item"><strong>To:</strong> ${email.recipients}</li>
            <li class="list-group-item"><strong>Subject:</strong> ${email.subject}</li>
            <li class="list-group-item"><strong>Timestamp:</strong> ${email.timestamp}</li>
            <li class="list-group-item"><strong>Status:</strong> ${statusText}</li>
          </ul>
          <div class="card-body">
            <h6 class="card-subtitle mb-2 text-muted">Body</h6>
            <p class="card-text">${email.body}</p>
          </div>
        </div>
      </div>     
      <hr> 
      `;

      if (!email.read) {
        fetch(`/emails/${email.id}`, {
          method: 'PUT',
          body: JSON.stringify({
            read: true
          })
        })
      }

      const btn_ar = document.createElement('button');
      btn_ar.classList.add('btn', 'btn-primary', 'btn-sm', 'mr-2');
      btn_ar.innerHTML = email.archived ? "Unarchive" : "Archive";
      btn_ar.addEventListener('click', function () {
        fetch(`/emails/${email.id}`, {
          method: 'PUT',
          body: JSON.stringify({
            archived: !email.archived
          })
        })
          .then(() => load_mailbox('archived'))
          .catch(error => {
            console.error(error);
          });
      });

      document.querySelector('#email-detail').append(btn_ar);

      const btn_rp = document.createElement('button');
      btn_rp.innerHTML = "Reply";
      btn_rp.className = "btn btn-info";
      btn_rp.addEventListener('click', function () {
        compose_email();

        document.querySelector('#compose-recipients').value = email.sender;
        let subject = email.subject;
        if(subject.split('  ', 1)[0] != "Re: "){
          subject = "Re: " + email.subject;
        } 
        document.querySelector('#compose-subject').value = subject;
        document.querySelector('#compose-body').value = `on ${email.timestamp} ${email.sender} - wrote: ${email.body}`;
      });
      document.querySelector('#email-detail').append(btn_rp);
    })
    .catch(error => {
      console.error(error);
    });
};
