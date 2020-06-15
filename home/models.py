from django.db import models
from phonenumber_field.modelfields import PhoneNumberField
from django.utils.translation import ugettext as _

# Create your models here.
VENTURE_CHOICES= [
    ('climate', 'Climate'),
    ('education', 'Education'),
    ('energy conservation', 'Energy Conservation'),
    ('fragility, conflict and violence', 'Fragility, Conflict and Violence'),
    ('poverty', 'Poverty'),
    ('urban development', 'Urban Development'),
    ('trade', 'Trade'),
    ('health', 'Health'),
    ('debt', 'Debt'),
    ('agriculture and food', 'Agriculture and Food'),
    ('governance', 'Governance'),
    ('water', 'Water'),
    ('transport', 'Transport'),
    ('social protection', 'Social Protection'),
    ('social development', 'Social Development'),
    ('nutrition', 'Nutrition'),
    ('other', 'Other'),
    ]

class Form(models.Model):
    name = models.CharField(max_length=300)
    email = models.EmailField(unique=True, blank=False)
    tel = PhoneNumberField(default='+', null = False, blank=False, verbose_name='Phone Number')
    nationality = models.CharField(_('Nationality'),max_length=125,null=False,blank=False)
    venture = models.CharField(_('Venture involved in'),max_length=105,choices=VENTURE_CHOICES)
    years = models.IntegerField()
    amount = models.IntegerField(verbose_name='Amount Applied for in USD')

    def make_copy(self):
        Form.objects.create(form=self)
  
    

