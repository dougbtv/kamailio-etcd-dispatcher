# kamailio-etcd-dispatcher

Modifies a Kamailio dispatcher to have Kamailio act as a load balancer for machines discovered with etcd.

Basic usage can be found a la:

```
[doug@localhost kamailio-etcd-dispatcher]$ node app.js --help

Usage: node app.js [options]

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