pipeline {
  agent any

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
              id
              npm install
          """
        }
      }
    }
  }
}
