pipeline {
    agent any

    tools {
        // Make sure your Jenkins has a NodeJS tool configured with this exact name
        nodejs 'nodejs'
    }

    environment {
        CI = 'true'
        BASE_URL = 'https://testzone.smartkeeda.com'
        // Store these as Jenkins Credentials (Secret text) and inject them:
        // TEST_USER_EMAIL    = credentials('smartkeeda-email')
        // TEST_USER_PASSWORD = credentials('smartkeeda-password')
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Verify Node & NPM') {
            steps {
                sh 'node -v'
                sh 'npm -v'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
                // Install all Playwright browsers plus their Linux system deps
                sh 'npx playwright install --with-deps chromium firefox webkit msedge'
            }
        }

        stage('Run E2E Tests') {
            steps {
                // Runs the full suite across all configured projects.
                // Add --grep or --project flags to narrow it down.
                sh 'npx playwright test --reporter=list,html'
            }
        }
    }

    post {
        always {
            // Publish the Playwright HTML report so it's viewable in Jenkins
            publishHTML(target: [
                allowMissing         : false,
                alwaysLinkToLastBuild: true,
                keepAll              : true,
                reportDir            : 'playwright-report',
                reportFiles          : 'index.html',
                reportName           : 'Playwright HTML Report'
            ])

            // Archive Playwright traces/screenshots for failed tests
            archiveArtifacts artifacts: 'test-results/**/*', allowEmptyArchive: true
        }
        success {
            echo "✅ All Playwright tests passed."
        }
        failure {
            echo "❌ Playwright tests failed. Check the HTML report and traces."
        }
        cleanup {
            // Clean the workspace after each run
            cleanWs()
        }
    }
}
