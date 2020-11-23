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

        stage('Email Build') {
          steps {
            mail(subject: 'Hola amigos', body: 'Esto es una pruebesita', to: 'anambravil@gmail.com', from: 'anambravil@gmail.com')
          }
        }

      }
    }

  }
}