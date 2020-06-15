from django.contrib import admin
from home.models import Form
import csv
from django.http import HttpResponse
from import_export.admin import ImportExportModelAdmin
from django.contrib import admin
@admin.register(Form)
class FormAdmin(ImportExportModelAdmin):
    pass
