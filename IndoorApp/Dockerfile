FROM  python:3.9
COPY  ./requirements.txt /tmp

RUN pip install -r /tmp/requirements.txt

ENV llave=""
ENV PATH_PREFIX=""
RUN mkdir /code 
RUN mkdir /start 

COPY ./run.sh  /start 

WORKDIR /code 

RUN chmod +x /start/run.sh
RUN useradd fei -s /bin/bash
RUN  chown -R fei /code 
RUN chown -R fei /start 

USER fei 


CMD  /start/run.sh



