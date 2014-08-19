#node-dock
=
Docker commands without IDS

=

### Install

```bash
npm install -g node-dock
```

### Usage

#### List Your Containers

```bash
dock list
```

#### Clean all inactive Containers

```bash
dock clean
```

#### Run a docker command on a container by image name

```
dock <command> <command's args> --image <image name>

es:
dock logs -f --image mikaelhg/docker-rabbitmq
```