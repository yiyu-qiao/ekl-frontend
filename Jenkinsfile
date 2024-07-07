pipeline {
  agent any

  tools {
      nodejs 'node-20.15.0'
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
              id

              echo $PATH
              npm -v
              node -v
              ng version
              npm install
          """
        }
      }
    }
  }
}
