pipeline {
  agent any

  stages {
    stage('Init build') {
      script{
         def msg = sh(returnStdout:true, script:"""echo check out from Github Repository ${GIT_URL}
                                                                      echo current branch ${GIT_BRANCH}""")
        echo "Console output: ${msg}"
      }
    }
  }

  stages {
    stage('npm install') {
      script {
        sh """
            npm install
        """
      }
    }
  }
}
