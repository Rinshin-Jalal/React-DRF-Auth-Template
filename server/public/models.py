from django.db import models
from django.template.loader import render_to_string
from django.core.mail import EmailMultiAlternatives
import jwt
# Create your models here.


class Image(models.Model):
    title = models.CharField(max_length=255, verbose_name=("Title"))
    date_created = models.DateTimeField(
        auto_now_add=True, verbose_name=("Date Created"))
    image = models.ImageField(blank=True,null=True)

    def __str__(self):
        return self.title

class EmailVerify(models.Model):
    username = models.CharField(max_length=123,null=True,blank=True,unique=True)
    email = models.CharField(max_length=123,null=True,blank=True,unique=True)
    token = models.CharField(max_length=260,null=True,blank=True)
    def __str__(self):
        return self.username + "|" + self.email
    def save(self,*args,**kwargs):
        
        username = self.username
        self.token = jwt.encode({"main": {'username':username,'email':self.email}}, "secret", algorithm="HS256")
        context = {'username':username,'token':self.token, 'link': 'localhost:3000',}#your main frontend link
        email_html_message = render_to_string('public/email_verify.html', context)
        email_plaintext_message = render_to_string('public/email_verify.txt', context)
        msg = EmailMultiAlternatives(
            # title:
            "Email Verification | {title}".format(title="My Website"),
            # message:
            email_plaintext_message,
            # from:
            "rinzcodemail@gmail.com",
            # to:
            [self.email]
        )
        msg.attach_alternative(email_html_message, "text/html")
        msg.send()

        super().save(*args, **kwargs)
