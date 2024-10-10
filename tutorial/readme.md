Set up
======

- [Set up FFglitch on Linux](readme_linux.md).
- [Set up FFglitch on macOS](readme_macos.md).
- [Set up FFglitch on Windows](readme_windows.md).

JPEG glitches
=============

```
./bin/fflive -i lena.jpg -s scripts/jpeg/dqt.js
```

```
./bin/fflive -i lena.jpg -s scripts/jpeg/q_dc_delta.js
```

PNG glitches
============

```
./bin/fflive -i lena.png -s scripts/png/idat.js
```

MPEG4 glitches
==============

```
./bin/fflive -i CEP00109_mpeg4.avi -s scripts/mpeg4/mv_sink_and_rise.js
```

```
./bin/fflive -i CEP00109_mpeg4.avi -s scripts/mpeg4/mv_sink_and_rise_fast.js
```

```
./bin/fflive -i CEP00109_mpeg4.avi -s scripts/mpeg4/mv_pan.js
```

```
./bin/fflive -i CEP00109_mpeg4.avi -s scripts/mpeg4/mv_pan.js -sp "[ 0, 10 ]"
```

```
./bin/fflive -i CEP00109_mpeg4.avi -s scripts/mpeg4/mv_average.js
```
