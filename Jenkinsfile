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

    stage('docker build/push') {
        docker.withRegistry('https://index.docker.io/v1/', 'dockerhub') {
            def app = docker.build("rajattur/itsonmme:${commit_id}", '.').push()
        }
    }

    stage('deploy-k8s') {
        // Later this will read form deployment.yml and service.yml file form project folder k8s.
        echo "commit_id ${COMMIT_ID}"
        export SERVICE_NAME="itsonmme-${COMMIT_ID}"
        export IMAGE_NAME="rajattur/itsonmme:${COMMIT_ID}"
        envsubt < k8s/deployment.yaml | kubectl apply -f -
        envsubt < k8s/svc.yaml | kubectl apply -f -
        // sh "kubectl run itsonmme-${commit_id} --image=rajattur/itsonmme:${commit_id} --namespace=development"
        // sh "kubectl expose deployment itsonmme-${commit_id} --port=3000 --name=itsonmmesvc-${commit_id} --namespace=development --type=LoadBalancer"
        // withEnv([
        //     "COMMIT_ID=${COMMIT_ID}"
        // ]) {
        //     sh "kubectl create -f k8s/deployment.yaml"
        //     sh "kubectl create -f k8s/svc.yaml"
        // }
        // sh "kubectl delete deployment --namespace=development itsonmme"
        // sh "kubectl delete services --namespace=development itsonmme"
        // sh "kubectl create -f k8s/deployment.yaml"
        // sh "kubectl create -f k8s/svc.yaml"
    }
}