from django import forms
from crispy_forms.helper import FormHelper
from crispy_forms.layout import Submit
from home.models import Form


class DetailsForm(forms.ModelForm):
    error_css_class = 'error'
    class Meta:
        model = Form
        fields = '__all__'

    def __init__(self, *args, **kwargs):
        super(DetailsForm, self).__init__(*args, **kwargs)
        self.helper = FormHelper()
        self.helper.form_method = 'post'
        self.helper.add_input(Submit('submit', 'Submit'))