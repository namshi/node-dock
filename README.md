#Node-Dock, just like docker, but without needing the Ids.

Node dock is an handy command that plugs on top of your usual [docker](https://www.docker.com/) commands adding some sugar and some handy function on top of it.


### Install

You can install this library through [NPM](https://www.npmjs.org/package/node-dock):

```bash
npm install -g node-dock
```

### Usage

Dock comes with 2 handy commands on top of the usual ones:

#### List

Get the list of all your current containers:

```bash
dock list
```

#### Clean

And cleanup all your inactive ones:

```bash
dock clean
```


#### Run a docker command on a container by image name

Whenever you create and run you new container you always know the image's name, but the id can be rather annoying to get every time.
Just add a `--image <name>` in your usual `docker` command and `dock` will figure out what to do for you :)

```bash
dock <command> <commandArgs> --image <imageName>

es:
dock logs -f --image mikaelhg/docker-rabbitmq
```