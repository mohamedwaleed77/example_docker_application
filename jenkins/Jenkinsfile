pipeline {
    agent any
    triggers {
        pollSCM('* * * * *') // Poll every minute
    }
    environment {
        REPO_URL = "git@github.com:mohamedwaleed77/example_docker_application.git"
    }

    stages {
        stage('Checkout') {
            steps {
                    //sh 'ssh -T git@github.com' 
                    git credentialsId:"github" ,url: "${REPO_URL}", branch: 'main' 
            }
        }

        stage('Build Frontend') {
            steps {
                dir('example_docker_application/frontend') {
                    sh 'sudo docker build -t frontend .'
                }
            }
        }

        stage('Build Backend') {
            steps {
                dir('example_docker_application/backend') {
                    sh 'npm install'
                    sh 'sudo docker build -t backend .'
                }
            }
        }

        stage('Deploy') {
            steps {
                dir('example_docker_application') {
                    sh 'sudo docker compose up -d'
                    sh 'sleep 5'
                    sh 'sudo docker compose down'
                }
            }
        }
    }


    post {
        success {
            echo 'Deployment succeeded!'
            script {
                withCredentials([string(credentialsId: 'dockerhub', variable: 'DOCKERHUB_TOKEN')]) {
                    sh "echo ${DOCKERHUB_TOKEN} | sudo docker login -u mohamedwaleed77 --password-stdin"
                    sh "sudo docker tag frontend:latest mohamedwaleed77/counter:frontend"
                    sh "sudo docker tag backend:latest mohamedwaleed77/counter:backend"
                    sh 'sudo docker push mohamedwaleed77/counter:frontend'
                    sh 'sudo docker push mohamedwaleed77/counter:backend'
                }
            }
            mail to: '203659.msa@gmail.com',
                 subject: "SUCCESS: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]'",
                 body: "Good news! Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]' has succeeded.\nCheck it here: ${env.BUILD_URL}"
        }

        failure {
            echo 'Deployment failed!'
            mail to: '203659.msa@gmail.com',
                 subject: "FAILURE: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]'",
                 body: "Unfortunately, Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]' has failed.\nCheck it here: ${env.BUILD_URL}"
        }
    }
}
