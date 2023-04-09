FROM python:3.8-slim

ARG ML_HOST

ENV ML_HOST=$ML_HOST

COPY requirements.txt /app/requirements.txt

RUN pip install --no-cache-dir --upgrade -r /app/requirements.txt

COPY ./app /app

EXPOSE 3000

CMD ["uvicorn", "app.main:app", "--reload", "--reload-dir", "./app", "--host", "0.0.0.0", "--port", "3000"]
