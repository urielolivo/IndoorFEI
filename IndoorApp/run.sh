#!/bin/bash
sleep 10 

#python3 manage.py migrate
#python3 manage.py migrate
python3 -u manage.py runserver 0.0.0.0:9000
#gunicorn --bind :9000 IndoorApp.wsgi:application  --reload
