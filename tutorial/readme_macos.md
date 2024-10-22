Set up FFglitch on macOS
========================

- Either run this one magic command:
```
wget https://ffglitch.org/pub/bin/mac64/ffglitch-0.10.2-macos-x86_64.zip && \
unzip ffglitch-0.10.2-macos-x86_64.zip && \
mkdir -p bin && \
mv ffglitch-0.10.2-macos-x86_64/* bin/ && \
rmdir ffglitch-0.10.2-macos-x86_64 && \
rm ffglitch-0.10.2-macos-x86_64.zip
```

Or run the commands separately:
- Download FFglitch:
```
wget https://ffglitch.org/pub/bin/mac64/ffglitch-0.10.2-macos-x86_64.zip
```
- Unpack it:
```
unzip ffglitch-0.10.2-macos-x86_64.zip
```
- Move its contents to a directory named `bin`:
```
mkdir -p bin
mv ffglitch-0.10.2-macos-x86_64/* bin/
```
- Cleanup
```
rmdir ffglitch-0.10.2-macos-x86_64
rm ffglitch-0.10.2-macos-x86_64.zip
```
