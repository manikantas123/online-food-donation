pipeline {
    agent any

    environment {
        FRONTEND_IMAGE = 'manikantas123/food-frontend:latest'
        BACKEND_IMAGE = 'manikantas123/food-backend:latest'
    }

    stages {
        stage('Clone Repository') {
            steps {
                checkout scm
            }
        }

        stage('Build & Push Docker Images') {
            steps {
                bat '''
                docker build -t %FRONTEND_IMAGE% ./frontend
                docker build -t %BACKEND_IMAGE% ./backend
                docker push %FRONTEND_IMAGE%
                docker push %BACKEND_IMAGE%
                '''
            }
        }

        stage('Deploy to Swarm') {
            steps {
                bat 'docker stack deploy -c docker-compose.yml mystack'
            }
        }
    }
}
