#!/usr/bin/env groovy
def kubeSubst(placeholder, value, file) {
    sh "sed -i.bak s/:\\\${$placeholder}/:$value/g $file.yaml"
}
node {
    def commit_id

    stage('Preparation') {
        checkout scm
        sh "git rev-parse --short HEAD > .git/commit-id"
        commit_id = readFile('.git/commit-id').trim()
        env.COMMIT_ID=commit_id
    }

    stage('test') {
        def testContainer = docker.image('node')
        testContainer.pull()
        testContainer.inside {
            // Commenting out npm test till test cases are added.
            // sh 'npm install --only=dev'
            // sh 'npm test'
        }
    }

    stage('K8s file build') {
        echo "Running env test..."
        sh "sed -i.bak s/-\\\${SERVICE_NAME}/-${commit_id}/g ./k8s/deployment.yaml"
        sh "sed -i.bak s/:\\\${IMAGE_NAME}/:${commit_id}/g ./k8s/deployment.yaml"
        sh "sed -i.bak s/-\\\${SERVICE_NAME}/-${commit_id}/g ./k8s/svc.yaml"
        sh "cat ./k8s/deployment.yaml"
        sh "cat ./k8s/svc.yaml"
    }

    stage('docker build/push') {
        docker.withRegistry('https://index.docker.io/v1/', 'dockerhub') {
            def app = docker.build("rajattur/itsonmme:${commit_id}", '.').push()
        }
    }

    stage('deploy-k8s') {
        echo "commit_id ${COMMIT_ID}"
        sh "kubectl create -f ./k8s/deployment.yaml"
        sh "kubectl create -f ./k8s/svc.yaml"
    }

    stage('Email Service URL') {
        timeout(time: 1, unit: 'MINUTES') {
            sh "kubectl get svc itsonmme-${commit_id} --namespace=development -o json| jq '.status.loadBalancer.ingress[0].ip'"
        }
    }
}