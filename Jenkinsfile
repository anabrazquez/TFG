pipeline {
  agent any
  stages {
    stage('error') {
      parallel {
        stage('error') {
          steps {
            echo 'Hola esto es una prueba'
          }
        }

        stage('Build 2') {
          steps {
            echo 'Otra prueba'
          }
        }

      }
    }

  }
}