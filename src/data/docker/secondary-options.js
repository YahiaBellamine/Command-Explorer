export const secondaryOptions = {
  'build-image': [
    {
      value: 'dockerfile',
      label: 'using a Dockerfile',
      usage: 'docker build -t [image-name] .',
      nb: 'The . at the end of the docker build command tells Docker that it should look for the Dockerfile in the current directory.\n\nExample of Dockerfile: \n\n# syntax=docker/dockerfile:1\nFROM node:18-alpine (existing image)\nWORKDIR /usr/app (the working dir inside the container)\nCOPY . . (copy everything from cwd to WORKDIR)\nRUN npm install (executed only when the container is created)\nCMD ["npm", "run", "dev"] (exectued every time the container is started)\nEXPOSE 8080 (the port number of the local machine)'
    },
  ],
  
  'run-container': [
    {
      value: 'use-container-image',
      label: 'using a container\'s image',
      usage: 'docker run -dp 8000:8080 --name [container-name] [image-name]',
      nb: 'You use the -d flag to run the new container in “detached” mode (in the background, detached from your shell). You also use the -p flag to create a mapping between the host\'s port 8000 to the container\'s port 8080. Without the port mapping, you wouldn\'t be able to access the application.\n\n--name allows to assign a name to the container'
    },
  ],
  
  show: [
    {
      value: 'get-id',
      label: 'the id of a container',
      usage: 'docker ps',
    },
    {
      value: 'data-path-named-volume',
      label: 'the data path of a named volume on host machine',
      usage: 'docker volume inspect [volume-name]',
    },
    {
      value: 'logs',
      label: 'container\'s logs',
      usage: 'docker logs -f [container-id]',
    },
  ],
  
  'stop-remove': [
    {
      value: 'stop-container',
      label: 'stop a container',
      usage: 'docker stop [the-container-id]',
      nb: 'Replace [the-container-id] with the ID from "docker ps"'
    },
    {
      value: 'remove-container',
      label: 'remove a container',
      usage: 'docker rm [the-container-id]',
      nb: 'Replace [the-container-id] with the ID from "docker ps"'
    },
    {
      value: 'stop-remove-container',
      label: 'stop and remove a container at one',
      usage: 'docker rm -f [the-container-id]',
      nb: 'Replace [the-container-id] with the ID from "docker ps"'
    },
  ],

  exec: [
    {
      value: 'host-terminal',
      label: 'a command from host\'s terminal',
      usage: 'docker exec [options] [container-id] [command] [args]',
      nb: 'Some option examples :\n\n-i keeps STDIN open even if not attached\n-t allocates a pseudo-tty'
    },
    {
      value: 'container-terminal',
      label: 'a command from container\'s terminal',
      usage: 'Simply open the terminal (CLI) of your container from Docker Desktop',
    },
  ],
  
  volume: [
    {
      value: 'create-volume',
      label: 'create a named volume',
      usage: 'docker volume create [volume-name]',
    },
    {
      value: 'named-volume',
      label: 'start a container with a named volume',
      usage: 'docker run -dp 8000:8080 -v [volume-name]:/usr/db [image-name]',
      nb: 'The named volume will be mounted on /usr/db in the container file system\n\nIf we haven\'t ran a "docker volume create" command, Docker recognizes we want to use a named volume and creates one automatically for us.',
    },
    {
      value: 'bind-mounts',
      label: 'start a container in dev-mode',
      usage: 'docker run -dp 8000:8080 -v "$(pwd):/usr/app/src" [image-name]',
      nb: 'To run our container to support a development workflow, we will do the following:\n\n- Mount our source code into the container\n\n- Install all dependencies, including the “dev” dependencies\n\n- Start nodemon (node js tool) to watch for filesystem changes',
    },
  ],

  'multi-container-app': [
    {
      value: 'create-network',
      label: 'create a network',
      usage: 'docker network create [network-name]',
    },
    {
      value: 'attach-container-network',
      label: 'attach a container to a network',
      usage: 'docker run -d --network [network-name] --network-alias [network-alias] [image-name]',
      nb: '[network-alias] is the container\'s alias in the network scope'
    },
  ],

  dns: [
    {
      value: 'dns-lookup',
      label: 'dns lookup',
      usage: 'dig [network-alias]',
      nb: 'Execute this command inside the container\n\nWhile [network-alias] isn\'t a valid hostname, Docker is able to resolve it to the IP address of a container that has this network alias'
    }
  ],

  compose: [
    {
      value: 'docker-compose-example',
      label: 'show an example',
      usage: 'services:\n [service-name]\n  build: [Dockerfile-path]\n  image: [image-name]\n  command: command: sh -c "npm install && npm run dev"\n  ports:\n   - [host port]:[container port]\n  working_dir: [container work-dir]\n  volumes:\n   - [host dir]:[container dir]\n  environment:   MY_ENV_VAR: value\n\nvolumes:\n [named-volume]:',
    },
    {
      value: 'run-docker-compose',
      label: 'run docker-compose.yml',
      usage: 'docker compose up -d',
      nb: 'd flag is used to run eveything in the background'
    },
    {
      value: 'docker-compose-logs',
      label: 'show docker-compose logs',
      usage: 'docker compose logs -f',
      nb: 'You\'ll see the logs from each of the services interleaved into a single stream. This is incredibly useful when you want to watch for timing-related issues. The f flag “follows” the log, so will give you live output as it\'s generated.\n\nIf you want to view the logs for a specific service, you can add the service name to the end of the logs command (for example, docker compose logs -f app).'
    },
    {
      value: 'docker-compose-down',
      label: 'tear it all down',
      usage: 'docker compose down',
      nb: 'When you\'re ready to tear it all down, simply run docker compose down or hit the trash can on the Docker Dashboard for the entire app. The containers will stop and the network will be removed.\n\nBy default, named volumes in your compose file are NOT removed when running docker compose down. If you want to remove the volumes, you will need to add the --volumes flag.'
    },
  ]
};
