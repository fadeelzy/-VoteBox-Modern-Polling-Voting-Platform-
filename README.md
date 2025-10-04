# 🗳️ VoteBox – Modern Polling & Voting Platform  

A full-stack **polling application** built with Django, MySQL, and a clean frontend UI.  
VoteBox empowers users to **create polls, vote in real-time, and analyze results** with beautiful charts – all deployed on a scalable cloud-ready stack.  

---

## ✨ Features  

- 🔐 **Authentication & Authorization** – Secure user login & poll ownership tracking.  
- 📝 **Create & Manage Polls** – Easily create polls with multiple options.  
- ✅ **Voting System** – Users can vote once per poll, ensuring integrity.  
- 📊 **Live Results Dashboard** – Dynamic charts (bar & pie) with vote counts and percentages.  
- 🌍 **Share & Embed** – Share polls via link or embed them in external websites.  
- ⚡ **Cloud-Ready Backend** – Uses **MySQL** as the database (not default SQLite).  
- 🛡️ **Scalable Architecture** – Designed with backend best practices, security, and AWS deployment in mind.  

---

## 🏗️ Tech Stack  

| Layer          | Tech Used |
|----------------|-----------|
| Backend        | Django 5.x |
| Database       | MySQL |
| Frontend       | HTML, CSS, JavaScript (with Chart.js for analytics) |
| Auth           | Django Auth |
| Cloud Ready    | AWS (EC2, RDS, S3) |
| Reliability    | CI/CD pipelines, error handling, production-ready configs |

---

## 🚀 Getting Started  

### 1️⃣ Clone Repository  
```bash
git clone https://github.com/<your-username>/votebox.git
cd votebox

2️⃣ Setup Virtual Environment
python -m venv venv
source venv/bin/activate   # Linux/Mac
venv\Scripts\activate      # Windows

3️⃣ Install Dependencies
pip install -r requirements.txt

4️⃣ Configure Database

Update your MySQL credentials in settings.py:

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'votebox_db',
        'USER': 'your_mysql_user',
        'PASSWORD': 'your_mysql_password',
        'HOST': 'localhost',
        'PORT': '3306',
    }
}


Run migrations:

python manage.py migrate

5️⃣ Start the App
python manage.py runserver


Visit http://127.0.0.1:8000/

##  ☁️ Deployment on AWS

This project is designed with AWS best practices:

EC2 for Django app hosting.

RDS (MySQL) for managed relational database.

S3 + CloudFront for static assets delivery.

IAM & Security Groups for least-privilege access.

CI/CD with GitHub Actions → AWS CodeDeploy.

## 📌 You can extend deployment with Elastic Beanstalk or ECS + Fargate for containerization.

## 🔥 Why This Project Stands Out

Written by a Backend Engineer & AWS Solutions Architect, ensuring cloud scalability and production reliability.

Uses MySQL, making it closer to enterprise setups (instead of default SQLite).

End-to-end system: Authentication, Polling, Voting, Results, Sharing, Embedding.

Designed with Site Reliability Engineering (SRE) principles: fault tolerance, CI/CD readiness, observability hooks.

## 🧑‍💻 About Me

👋 Hi, I’m Fadilah Abdulkadir – Backend Engineer | AWS Cloud Solutions Architect | Site Reliability Engineer.

💡 Passionate about scalable backend systems and cloud-native applications.

☁️ Skilled in AWS (EC2, S3, RDS, ECS, EKS, Lambda, CloudFormation, CDK).

🛠️ Strong in Python/Django, CI/CD, Linux, Infrastructure as Code (IaC).

📈 Experienced in monitoring, logging, and automation for highly available systems.

## ⭐ Show Your Support

If you like this project:

Star ⭐ the repo

Fork 🍴 and experiment

Connect with me on linkedin.com/in/fadilah-abdulkadir-378a47269
 
