#!/bin/bash
sleep 10 

#python3 manage.py migrate
#python3 manage.py migrate
#python3 -u manage.py runserver 192.168.100.5:9500
gunicorn --bind :9100 IndoorApp.wsgi:application  --reload
