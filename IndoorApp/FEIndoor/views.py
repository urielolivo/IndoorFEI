# Create your views here.
from django  import  forms
from django.template import Template
from django.shortcuts import render
from django.http import HttpResponse


def over(request):
    t = 'index.html'
    
    return render (request,t)


