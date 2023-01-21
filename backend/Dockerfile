FROM  python:3.9-alpine

ENV PYTHONUNBUFFERED=1

WORKDIR /backend

COPY requirements.txt /backend/requirements.txt

RUN pip install -r requirements.txt

COPY . /backend

CMD python manage.py runserver 0.0.0.0:8000