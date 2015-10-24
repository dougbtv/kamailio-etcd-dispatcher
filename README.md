# kamailio-etcd-dispatcher
[![Build Status](https://travis-ci.org/dougbtv/kamailio-etcd-dispatcher.svg?branch=master)](https://travis-ci.org/dougbtv/kamailio-etcd-dispatcher)

Modifies a Kamailio dispatcher to have Kamailio act as a load balancer for machines discovered with etcd.

A tool to automatically build dynamically load balance asterisk hosts with coreos & etc. Part of a High Availability setup with Asterisk under coreOS & Docker. Make sure you check out [docker-asterisk](https://github.com/dougbtv/docker-asterisk) which has more information on running a high availability Asterisk setup using CoreOS & Docker.

## Install

Install globally so you can just run it:

    npm install -g kamailio-etcd-dispatcher

## Basic Usage

Basic usage can be found a la:

```
[user@localhost ~]$ etcd-dispatcher --help

Usage: node etcd-dispatcher [options]

Options:
   -e, --etcdhost       Set etcd host or ip address  [127.0.0.1]
   -o, --etcdport       Set etcd host or ip address  [4001]
   -r, --rootkey        Set etcd root key to use  [asterisk]
   -t, --timeout        Timeout before heartbeat pulse check fails (in milliseconds)  [20000]
   -l, --listpath       Path of the dispatcher.list file [dispatcher mode only]  [/etc/kamailio/dispatcher.list]
   -a, --announce       Start in "announce" mode (defaults to dispatcher mode)
   -i, --announceip     IP Address to announce [announce mode only]  [127.0.0.1]
   -n, --announcename   Name to use in announcement, is key in etcd [announce mode only]
   -p, --announceport   Port to announce [announce mode only]  [false]
   -w, --weight         Percentage of calls to distribute to this node [announce mode only]  [false]
   -h, --heartbeat      Time between heartbeat pulses [announce mode only] (in milliseconds)  [5000]
```

## Usage examples

You can always get help with:

    etcd-dispatcher --help

Run an dispatcher like:

    etcd-dispatcher --etcdhost 192.168.1.1 --timeout 25000

Run an announcer like:

    etcd-dispatcher --announce --etcdhost 192.168.1.1 --timeout 5500

## More information

Works in both "dispatcher" mode, which sits next to a Kamailio box and watches for Asterisk to announce itself. And in "announce" mode where it announces to Kamailio that it's available (and pulses heartbeats to it).

Check out articles on dougbtv.com for more
