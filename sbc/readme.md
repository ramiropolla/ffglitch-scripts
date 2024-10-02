Set up ffglitch_server.service
==============================

```
sudo cp config/ffglitch_server.service /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable ffglitch_server.service
sudo systemctl start ffglitch_server.service
```

Check status
============

```
systemctl status ffglitch_server.service
```

Restart
=======

```
sudo systemctl restart ffglitch_server.service
```

Read logs
=========

```
journalctl -u ffglitch_server.service -f
```

Setter
======

```
/home/ffglitch/code/ffglitch/build/qjs zmq_setter.js '{"test.field":42}'
```

Getter
======

```
/home/ffglitch/code/ffglitch/build/qjs zmq_getter.js "test.field"
```

Automatic login
===============

In `/etc/lightdm/lightdm.conf`:
```
[Seat:*]
autologin-user=ffglitch
autologin-user-timeout=0
```

```
sudo loginctl enable-linger ffglitch
```

Set up fflive.service
=====================

```
mkdir -p ~/.config/systemd/user
cp config/fflive.service ~/.config/systemd/user/
systemctl --user daemon-reload
systemctl --user enable fflive.service
systemctl --user start fflive.service
```

Check status
============

```
systemctl --user status fflive.service
```

Restart
=======

```
systemctl --user restart fflive.service
```

Read logs
=========

```
journalctl --user -u fflive.service -f
```

Commands
========

```
/home/ffglitch/code/ffglitch/build/qjs zmq_setter.js '{"mv_pan.mv":[15,1]}'
/home/ffglitch/code/ffglitch/build/qjs zmq_setter.js '{"cleaner.mb_type":100,"cleaner.reset_mb_type":1,"cleaner.pict_type":100,"cleaner.reset_pict_type":1}'
```
