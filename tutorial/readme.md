Set up FFglitch on Linux
========================

- Either run this one magic command:
```
wget https://ffglitch.org/pub/bin/linux64/ffglitch-0.10.1-linux64.7z && \
7z x ffglitch-0.10.1-linux64.7z && \
mkdir -p bin && \
mv ffglitch-0.10.1-linux64/* bin/ && \
rmdir ffglitch-0.10.1-linux64 && \
rm ffglitch-0.10.1-linux64.7z
```

Or run the commands separately:
- Download FFglitch:
```
$ wget https://ffglitch.org/pub/bin/linux64/ffglitch-0.10.1-linux64.7z
```
- Unpack it:
```
$ 7z x ffglitch-0.10.1-linux64.7z
```
- Move its contents to a directory named `bin`:
```
$ mkdir -p bin
$ mv ffglitch-0.10.1-linux64/* bin/
```
- Cleanup
```
$ rmdir ffglitch-0.10.1-linux64
$ rm ffglitch-0.10.1-linux64.7z
```

Set up FFglitch on macOS
========================

- Either run this one magic command:
```
wget https://ffglitch.org/pub/bin/mac64/ffglitch-0.10.1-mac64.7z && \
7z x ffglitch-0.10.1-mac64.7z && \
mkdir -p bin && \
mv ffglitch-0.10.1-mac64/* bin/ && \
rmdir ffglitch-0.10.1-mac64 && \
rm ffglitch-0.10.1-mac64.7z
```

Or run the commands separately:
- Download FFglitch:
```
$ wget https://ffglitch.org/pub/bin/mac64/ffglitch-0.10.1-mac64.7z
```
- Unpack it:
```
$ 7z x ffglitch-0.10.1-mac64.7z
```
- Move its contents to a directory named `bin`:
```
$ mkdir -p bin
$ mv ffglitch-0.10.1-mac64/* bin/
```
- Cleanup
```
$ rmdir ffglitch-0.10.1-mac64
$ rm ffglitch-0.10.1-mac64.7z
```

JPEG glitches
=============

```
$ ./bin/fflive -i lena.jpg -s scripts/jpeg/dqt.js
```

```
$ ./bin/fflive -i lena.jpg -s scripts/jpeg/q_dc_delta.js
```

PNG glitches
============

```
$ ./bin/fflive -i lena.png -s scripts/png/idat.js
```

MPEG4 glitches
==============

```
$ ./bin/fflive -i CEP00109_mpeg4.avi -s scripts/mpeg4/mv_sink_and_rise.js
```

```
$ ./bin/fflive -i CEP00109_mpeg4.avi -s scripts/mpeg4/mv_sink_and_rise_fast.js
```

```
$ ./bin/fflive -i CEP00109_mpeg4.avi -s scripts/mpeg4/mv_average.js
```
