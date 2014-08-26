<img align="right" width="250px" src="https://raw.githubusercontent.com/namshi/node-dock/master/bin/images/logo.jpg?token=328420__eyJzY29wZSI6IlJhd0Jsb2I6bmFtc2hpL25vZGUtZG9jay9tYXN0ZXIvYmluL2ltYWdlcy9sb2dvLmpwZyIsImV4cGlyZXMiOjE0MDk2NTkwNDh9--e1ed3b45e0a32d0dfc91095bbc0cc320f23302a4" />

# Dock

> Your sweet remedy for all your docker problems

Dock is an handy command that plugs on top of your usual
[docker](https://www.docker.com/) commands adding some sugar
and some handy function on top of it.

What does it mean?

This:

```
~  ᐅ docker ps
CONTAINER ID        IMAGE                           COMMAND                CREATED             STATUS              PORTS                    NAMES
b844c6472721        odino/odino.github.com:latest   "/bin/sh -c 'export    3 seconds ago       Up 3 seconds        0.0.0.0:4000->4000/tcp   sharp_elion         
~  ᐅ docker stop b844c6472721
b844c6472721
```

becomes this:

```
~  ᐅ dock stop odino/odino.github.com
running stop odino/odino.github.com d1ac1f9a916d on container d1ac1f9a916d
d1ac1f9a916d
```

![sweeeeet](http://i2.kym-cdn.com/photos/images/newsfeed/000/366/076/8ad.gif)

## Installation

Install this library through
[NPM](https://www.npmjs.org/package/node-dock):

``` bash
npm install -g node-dock
```

## Usage

Dock comes with 2 handy commands on top of the usual ones:

### List

Get the list of all your current containers:

``` bash
~  ᐅ dock list
Image name: namshi/nginx-proxy:latest (id: 3563cd490f63)
Image name: odino/odino.github.com:latest (id: d1ac1f9a916d)

```

### Clean

Cleanup all your inactive ones:

```bash
~  ᐅ dock clean
running rm d1ac1f9a916d on container d1ac1f9a916d
d1ac1f9a916d
```

### Clean Images

And cleanup all your un-tagged images:

```bash
~  ᐅ dock clean images
running rmi d56522c3164e on container d56522c3164e
running rmi f1365340886d on container f1365340886d
running rmi f6a404a7172d on container f6a404a7172d
running rmi 205d4782d521 on container 205d4782d521
running rmi cea515493893 on container cea515493893
running rmi 7af0498ecd5b on container 7af0498ecd5b
running rmi 41e666c0e178 on container 41e666c0e178
running rmi f725abdabf27 on container f725abdabf27
running rmi 19fb2516cde9 on container 19fb2516cde9
running rmi 7523d53c4fea on container 7523d53c4fea
running rmi 533f6ceea42d on container 533f6ceea42d
running rmi 54b14e4b8f1a on container 54b14e4b8f1a
```

#### Run a docker command on a container by image name

Whenever you create and run your new container you always know the
image's name, but the id can be rather annoying to get every time.

Just add a `--image || -i <name>`, or your image name as last
argument, in your usual `docker` command and `dock` will figure
out what to do for you :)

``` bash
dock <command> <commandArgs> --image <imageName>

# ie:
dock logs -f --image mikaelhg/docker-rabbitmq

# or
dock <command> <commandArgs> --i <imageName>

# or you can even omit the flag
dock logs -f mikaelhg/docker-rabbitmq
```
