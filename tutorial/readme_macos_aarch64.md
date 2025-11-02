Set up FFglitch on macOS aarch64
================================

- Either run this one magic command:
```
curl -O https://ffglitch.org/pub/bin/macos-aarch64/ffglitch-0.10.2-macos-aarch64.zip && \
unzip ffglitch-0.10.2-macos-aarch64.zip && \
mkdir -p bin && \
mv ffglitch-0.10.2-macos-aarch64/* bin/ && \
rmdir ffglitch-0.10.2-macos-aarch64 && \
rm ffglitch-0.10.2-macos-aarch64.zip
```

Or run the commands separately:
- Download FFglitch:
```
curl -O https://ffglitch.org/pub/bin/macos-aarch64/ffglitch-0.10.2-macos-aarch64.zip
```
- Unpack it:
```
unzip ffglitch-0.10.2-macos-aarch64.zip
```
- Move its contents to a directory named `bin`:
```
mkdir -p bin
mv ffglitch-0.10.2-macos-aarch64/* bin/
```
- Cleanup
```
rmdir ffglitch-0.10.2-macos-aarch64
rm ffglitch-0.10.2-macos-aarch64.zip
```
