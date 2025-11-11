# Use official Python slim image 
FROM python:3.11-slim

# Environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Set work directory
WORKDIR /app

# Install system dependencies for PostgreSQL
RUN apt-get update && apt-get install -y gcc libpq-dev && rm -rf /var/lib/apt/lists/*

# Copy requirements and install
COPY voteproject/requirements.txt .
RUN pip install --upgrade pip
RUN pip install -r requirements.txt

# Copy project files
COPY voteproject .

# Collect static files
RUN python manage.py collectstatic --noinput

# Run Gunicorn
CMD ["sh", "-c", "gunicorn expenseproject.wsgi:application --bind 0.0.0.0:$PORT"]