FROM  python:3.8.13-bullseye

ENV PYTHONUNBUFFERED=1

WORKDIR /backend

RUN pip install -r requirements.txt

# copy from the current directory of the Dockerfile to /backend in the image
COPY . .

EXPOSE 8000