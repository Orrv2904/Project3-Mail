# Mail

Design a front-end for an email client that makes API calls to send and receive emails.

For more details: https://cs50.harvard.edu/web/2020/projects/3/mail/


## Deployment

you can see it here: https://mail-gpjv.onrender.com/

## What was used?

 - Django
 - Javascript
 - HTML


## Youtube Video

This is a short video where you can see the project specifications: 

## Assignment specification

### 1. **Send Mail:**
   - When a user submits the email composition form, add JavaScript code to actually send the email.
   - Make a POST request to `/emails`, passing values for recipients, subject, and body.
   - After sending the email, load the user’s sent mailbox.

### 2. **Mailbox:**
   - When a user visits their Inbox, Sent mailbox, or Archive, load the appropriate mailbox.
   - Make a GET request to `/emails/<mailbox>` to request emails for a particular mailbox.
   - Query the API for the latest emails in the visited mailbox.
   - Display the name of the mailbox at the top of the page.
   - Render each email in its own box (e.g., as a `<div>` with a border) showing sender, subject, and timestamp.
   - Unread emails should appear with a white background, and read emails with a gray background.

### 3. **View Email:**
   - When a user clicks on an email, show the content of that email.
   - Make a GET request to `/emails/<email_id>` to request the email.
   - Display sender, recipients, subject, timestamp, and body.
   - Add an additional `<div>` to `inbox.html` for displaying the email.
   - Update code to hide/show the right views when navigation options are clicked.
   - Once an email is clicked, mark it as read by sending a PUT request to `/emails/<email_id>`.

### 4. **Archive and Unarchive:**
   - Allow users to archive and unarchive emails received in the Inbox.
   - When viewing an Inbox email, present a button to archive the email.
   - When viewing an Archive email, present a button to unarchive the email.
   - Send a PUT request to `/emails/<email_id>` to mark an email as archived or unarchived.
   - After archiving or unarchiving, load the user’s inbox.

### 5. **Reply:**
   - Allow users to reply to an email.
   - When viewing an email, provide a “Reply” button.
   - Clicking the “Reply” button should take the user to the email composition form.
   - Pre-fill the recipient field with the original sender.
   - Pre-fill the subject line with "Re: <original subject>" (no duplicate "Re:").
   - Pre-fill the email body with "On Jan 1, 2020, 12:00 AM, <original sender> wrote:" followed by the original text of the email.

## Extra functionality

The delete function implements the ability to delete an encyclopedia entry. When a POST HTTP request is made, the function retrieves the title of the entry provided in the request. It then checks to see if a file associated with that title exists on the storage system. If the file exists, it is deleted and the user is redirected back to the index page.

         
### Built with:
--------------------

  1. [Bootstrap (version: 4)](https://getbootstrap.com/)

  2. [Microsoft Visual code (version:1.81.1)](https://code.visualstudio.com/)
    
  3. [Django version (version:4.2.7)](https://www.djangoproject.com/)
  
  6. [Jinja2 (version: 3.1)](https://jinja.palletsprojects.com/en/3.1.x/)
  
  7. [Python(version 3.11.1)](https://www.python.org/)
  
  8. HTML5

  10. Cascading Style Sheets (CSS)

--------------------

## Run Locally

Clone the project

```bash
  git clone https://github.com/Orrv2904/Project3-Mail.git
```

Install dependencies

In case you want to use a virtual environment:

```bash
  python3 -m venv environment
  source environment/bin/activate
```

Install dependencies with pip

```bash
  pip install requirements.txt
```

Go to the project directory

```bash
  cd Project1-Wiki
```

runs the migrations

```bash
  python3 -m manage.py makemigrations
  python3 -m manage.py migrate
```

After that

```bash
  python3 -m manage.py runserver
```
    

## Authors

- [@orrv2904](https://github.com/Orrv2904)

