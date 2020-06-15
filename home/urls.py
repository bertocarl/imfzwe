from django.urls import path
from .import views


app_name = 'home'

urlpatterns = [
    
    path('', views.index, name= 'home'),
    path('apply', views.application, name='apply'),
    path('success', views.success, name='success'),
    path('grants', views.grants, name='grants'),
    path('recipients', views.recipients, name='recipients'),
    path('involve', views.involve, name='involve'),
    path('relief', views.relief, name='relief'),
    path('gandd', views.gandd, name='gandd'),

]
