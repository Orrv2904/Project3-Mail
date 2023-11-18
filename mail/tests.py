from django.test import TestCase
from django.contrib.auth import get_user_model
from django.utils import timezone
from .models import Email

class UserModelTest(TestCase):
    def test_create_user(self):
        user = get_user_model().objects.create_user(
            username='testuser',
            email='test@example.com',
            password='testpassword'
        )
        self.assertEqual(user.username, 'testuser')
        self.assertEqual(user.email, 'test@example.com')
        self.assertTrue(user.check_password('testpassword'))

class EmailModelTest(TestCase):
    def setUp(self):
        self.user1 = get_user_model().objects.create_user(
            username='user1',
            email='user1@example.com',
            password='testpassword1'
        )
        self.user2 = get_user_model().objects.create_user(
            username='user2',
            email='user2@example.com',
            password='testpassword2'
        )

    def test_create_email(self):
        email = Email.objects.create(
            user=self.user1,
            sender=self.user1,
            subject='Test Subject',
            body='Test Body',
            timestamp=timezone.now(),
            read=False,
            archived=False
        )
        self.assertEqual(email.subject, 'Test Subject')
        self.assertEqual(email.body, 'Test Body')
        self.assertEqual(email.user, self.user1)
        self.assertEqual(email.sender, self.user1)
        self.assertFalse(email.read)
        self.assertFalse(email.archived)

    def test_email_serialization(self):
        email = Email.objects.create(
            user=self.user1,
            sender=self.user1,
            subject='Test Subject',
            body='Test Body',
            timestamp=timezone.now(),
            read=False,
            archived=False
        )
        serialized_data = email.serialize()
        self.assertEqual(serialized_data['sender'], self.user1.email)
        self.assertEqual(serialized_data['recipients'], [])
        email.recipients.add(self.user2)
        serialized_data = email.serialize()
        self.assertEqual(serialized_data['recipients'], [self.user2.email])

