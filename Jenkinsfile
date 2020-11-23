pipeline {
  agent any
  stages {
    stage('error') {
      steps {
        mail(subject: 'Prueba', body: 'Hola, esto es una prueba de ejecución de un pipeline', from: 'anambravil@gmail.com', to: 'anambravil@gmail.com')
        echo 'Hola esto es una prueba'
      }
    }

  }
}