## Scratchpay Test Task


### Prerequisites

- [Docker](https://docs.docker.com/engine/install/ubuntu/)

  On Linux
  
  ``` sh
   $ curl -fsSL https://get.docker.com -o get-docker.sh && sh get-docker.sh
  ```

  [On Windows](https://docs.docker.com/docker-for-windows/install/)
	

- [Docker compose](https://docs.docker.com/compose/install/)

  On Linux

  ``` sh
  $ sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose && sudo chmod +x /usr/local/bin/docker-compose

  ```

  [On Windows](https://docs.docker.com/compose/install/#install-compose-on-windows-server)
	

- [Helm 3](https://helm.sh/docs/intro/install/)

  On Linux

  ```sh
  $ curl -fsSL -o get_helm.sh https://raw.githubusercontent.com/helm/helm/master/scripts/get-helm-3

  $ chmod 700 get_helm.sh

  $ ./get_helm.sh

  ```


  On Windows
  ``` sh
    choco install kubernetes-helm
  ```

- [Kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl-linux/)

  > $VERSION = Kubernetes version of the cluster


  
  On Linux

  ``` sh
    $ apt update && apt install -y kubectl=${VERSION}

  ```
  On Windows
  ```sh

	choco install kubernetes-cli --version ${VERSION}
  ```

## Setup and Deployment


1. Clone Repo

``` sh
      $  git clone https://github.com/tanuj0997/spay-test-task.git

      $  cd spay-test-task
```
2. Setup configuration 

> Setup all configuration files from **configurationFiles** folder, change .env according to needs.

3. Run at local

   To test application at local run following command:

  ```sh 

         $ docker-compose up
  ```

4. To deploy helm charts on Kuberenetes cluster, run following command

   > $NAMESPACE=any prefered namespace to deploy all resources in 

```sh
     $ helm upgrade --install scratch-pay-task ./k8s -n ${NAMESPACE}

```

