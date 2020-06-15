from home.forms import DetailsForm
from home.models import Form
from django.shortcuts import render,redirect,get_object_or_404
from django.http import HttpResponse,Http404,HttpResponseRedirect
from django.contrib import messages
from django.core.mail import EmailMessage
from django.template.loader import get_template
from django.urls import reverse
from tablib import Dataset

from .resources import FormResource

def export_data(request):
    if request.method == 'POST':
        # Get selected option from form
        file_format = request.POST['file-format']
        form_resource = FormResource()
        dataset = form_resource.export()
        if file_format == 'CSV':
            response = HttpResponse(dataset.csv, content_type='text/csv')
            response['Content-Disposition'] = 'attachment; filename="exported_data.csv"'
            return response        
        elif file_format == 'JSON':
            response = HttpResponse(dataset.json, content_type='application/json')
            response['Content-Disposition'] = 'attachment; filename="exported_data.json"'
            return response
        elif file_format == 'XLS (Excel)':
            response = HttpResponse(dataset.xls, content_type='application/vnd.ms-excel')
            response['Content-Disposition'] = 'attachment; filename="exported_data.xls"'
            return response   

    return render(request, 'export.html')

def import_data(request):
    if request.method == 'POST':
        file_format = request.POST['file-format']
        form_resource = FormResource()
        dataset = Dataset()
        new_employees = request.FILES['importData']

        if file_format == 'CSV':
            imported_data = dataset.load(new_employees.read().decode('utf-8'),format='csv')
            result = form_resource.import_data(dataset, dry_run=True)                                                                 
        elif file_format == 'JSON':
            imported_data = dataset.load(new_employees.read().decode('utf-8'),format='json')
            # Testing data import
            result = form_resource.import_data(dataset, dry_run=True) 

        if not result.has_errors():
            # Import now
            form_resource.import_data(dataset, dry_run=False)

    return render(request, 'import.html')


def index(request):
    form= Form.objects.all()
    return render(request,'home.html')
def success(request):
    template = 'success.html'
    context = {}
    return render(request, template, context)
def grants(request):
    template = 'grants.html'
    return render(request, template)
def recipients(request):
    template = 'grants/recipients.html'
    context = {}
    return render(request, template, context)
def involve(request):
    template = 'grants/involve.html'
    context = {}
    return render(request, template, context)
def relief(request):
    template = 'grants/relief.html'
    context = {}
    return render(request, template, context)
def gandd(request):
    template = 'grants/gandd.html'
    context = {}
    return render(request, template, context)

def application(request):
   template = "applications/apply.html"

   if request.method == "POST":
      form = DetailsForm(request.POST)

      if form.is_valid():
         form.save()
         return HttpResponseRedirect(reverse("home:success"))

   else:
      form = DetailsForm()

   context = {
      "form": form,
   }
   return render(request, template, context)


