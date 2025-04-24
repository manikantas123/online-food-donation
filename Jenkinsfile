pipeline {
    agent any

    environment {
        FRONTEND_IMAGE = 'yourdockerhubusername/food-frontend:latest'
        BACKEND_IMAGE = 'yourdockerhubusername/food-backend:latest'
    }

    stages {
        stage('Clone Repository') {
            steps {
                checkout scm
            }
        }

        stage('Build & Push Docker Images') {
            steps {
                sh '''
                docker build -t $FRONTEND_IMAGE ./frontend
                docker build -t $BACKEND_IMAGE ./backend
                docker push $FRONTEND_IMAGE
                docker push $BACKEND_IMAGE
                '''
            }
        }

        stage('Deploy to Swarm') {
            steps {
                sh 'docker stack deploy -c docker-compose.yml mystack'
            }
        }
    }
}
