pipeline {
    agent any

environment {
    FRONTEND_IMAGE = 'manikanta455/food-frontend:latest'
    BACKEND_IMAGE = 'manikanta455/food-backend:latest'
}


    stages {
        stage('Clone Repository') {
            steps {
                checkout scm
            }
        }

        stage('Build & Push Docker Images') {
            steps {
                withCredentials([
                    usernamePassword(
                        credentialsId: 'ebfa5a25-cc4e-4466-91db-cec40f35d3a2',
                        usernameVariable: 'DOCKER_USER',
                        passwordVariable: 'DOCKER_PASS'
                    )
                ]) {
                    bat '''
                    echo %DOCKER_PASS% | docker login -u %DOCKER_USER% --password-stdin
                    docker build -t %FRONTEND_IMAGE% ./frontend
                    docker build -t %BACKEND_IMAGE% ./backend
                    docker push %FRONTEND_IMAGE%
                    docker push %BACKEND_IMAGE%
                    '''
                }
            }
        }

        stage('Deploy to Swarm') {
            steps {
                bat 'docker stack deploy -c docker-compose.yml mystack'
            }
        }
    }
}
