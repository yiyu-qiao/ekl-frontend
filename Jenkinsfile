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

  stages {
    stage('Init build') {
      steps {
        script{
           def msg = sh(returnStdout:true, script:"""echo check out from Github Repository ${GIT_URL}
                                                                        echo current branch ${GIT_BRANCH}""")
          echo "Console output: ${msg}"
        }
      }
    }
    stage('npm install') {
      steps {
        script {
          sh """
              npm ci
          """
        }
      }
    }

    stage('build docker image') {
      steps {
        script {
          echo "start build docker image"
        }
      }
    }
  }
}
