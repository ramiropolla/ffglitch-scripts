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

Set up FFglitch on macos
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
