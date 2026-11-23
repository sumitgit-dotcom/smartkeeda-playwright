pipeline {
    agent any

    tools {
        nodejs 'nodejs'
    }

    environment {
        CI = 'true'
        BASE_URL = 'https://testzone.smartkeeda.com'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Verify Node & NPM') {
            steps {
                bat 'node -v'
                bat 'npm -v'
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm ci'
                bat 'npx playwright install --with-deps chromium firefox webkit msedge'
            }
        }

        stage('Run E2E Tests') {
            steps {
                bat 'npx playwright test --reporter=list,html'
            }
        }
    }

    post {
        always {
            publishHTML(target: [
                allowMissing         : false,
                alwaysLinkToLastBuild: true,
                keepAll              : true,
                reportDir            : 'playwright-report',
                reportFiles          : 'index.html',
                reportName           : 'Playwright HTML Report'
            ])
            archiveArtifacts artifacts: 'test-results/**/*', allowEmptyArchive: true
        }
        success {
            echo "Playwright tests passed."
        }
        failure {
            echo "Playwright tests failed."
        }
        cleanup {
            cleanWs()
        }
    }
}
