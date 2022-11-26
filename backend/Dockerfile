#
FROM python:3.10.8

#
WORKDIR /code

#
COPY ./requirements.txt /code/requirements.txt

#
RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt

#
COPY . /code/app
COPY ./routers /code/app/routers

#
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8080"]
