/* defines a global variable which is available in all blocks, the global variable is accessable
   with env.${GLOBAL_VARIABLE_NAME}. It also works without the prefix env
*/
def imageName
def eklFrontendVersion

def getImageRepository(String buildStage) {
    if(buildStage == 'dev') {
        return 'ekl-frontend-dev'
    }else if(buildStage == 'test') {
        return 'ekl-frontend-test'
    }else {
        return ''
    }
}

def getKubeconfig(String buildStage){
    if(buildStage == 'dev') {
        return 'SA_EKL_DEV_JENKINS'
    }else if(buildStage == 'test'){
        return 'SA_EKL_TEST_JENKINS'
    }else {
        return ''
    }
}

pipeline {
  agent any

  tools {
      nodejs 'node-20.15.0'
  }

  options {
      timestamps()
      buildDiscarder(logRotator(numToKeepStr: '5'))
  }

  environment {
      registryNamespace = 'ponyworld'
      builtTimestamp= sh(returnStdout:true, script:"date +%Y%m%dT%H%M%S").trim() //remove trailing newline
  }

  parameters {
      choice(name: 'buildStage', choices: ["dev", "test", "prod"],
          description: 'select the stage to be built and deployed, default dev')
  }

  stages {
    stage('Init Build') {
      steps {
        script{
           def msg = sh(returnStdout:true, script:"""echo check out from Github Repository ${GIT_URL}
                                                                        echo current branch ${GIT_BRANCH}""")
          echo "Console output: ${msg}"

          echo "Initialize build image ekl-frontend-${params.buildStage}"
          env.imageTag = "${env.builtTimestamp}"
          imageRepo = getImageRepository("${params.buildStage}")
          env.imageName = "${env.registryNamespace}/${imageRepo}:${env.imageTag}"
         echo "Initialization for build image ${env.imageName} done."

         env.kubeconfig = getKubeconfig("${params.buildStage}")
         echo "Use kubeconfig ${env.kubeconfig}"

        }
      }
    }
    stage('NPM Install') {
      steps {
        script {
          sh """
              npm ci
          """
        }
      }
    }

    stage('Build Image') {
      steps {
        script {
          echo "Build docker image ${env.imageName}"
          sh """
            docker build -t ${env.imageName} \
            --build-arg EKL_FE_STAGE=${env.buildStage} .
          """
        }
      }
    }

    stage('Push Image'){
        steps {
            echo "Push image ${env.imageName} to Docker Hub"
            script {
                docker.withRegistry('','DOCKERHUB_TOKEN_PONYWORLD') {
                    sh """
                        docker push ${env.imageName}
                        docker image rm ${env.imageName}
                    """
                }
            }
        }
    }

    stage('Deploy to ekl-k8s'){
        steps {
            echo "Deploy with kubeconfig ${env.kubeconfig}"
            withKubeConfig([credentialsId: "${env.kubeconfig}"]){
                sh """
                    sed -i -e 's/{{IMAGE_TAG}}/${env.imageTag}/g' \
                        k8s/overlay/${params.buildStage}/kustomization.yaml
                    export KUBECONFIG=$KUBECONFIG
                    kubectl apply -k k8s/overlay/${params.buildStage}
                    kubectl rollout status deployment/ekl-frontend-${params.buildStage}
                    kubectl get all -n ekl-dev
                """
            }
        }
    }
  }
}
