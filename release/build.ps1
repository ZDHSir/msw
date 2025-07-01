echo "start compile windows platforms ... "
$env:GOOS="windows"; $env:GOARCH="amd64"; go build -o dist/vn007-win64.exe main.go;
Start-Sleep -Seconds 3;
echo 'start win32 compile ...'
$env:GOOS="windows"; $env:GOARCH="386"; go build -o dist/vn007-win32.exe main.go;
Start-Sleep -Seconds 3;
echo "start linux amd64 compile (ubuntu/centos 64bit) ..."
$env:GOOS="linux"; $env:GOARCH="amd64"; go build -o dist/vn007-linux-amd64 main.go
Start-Sleep -Seconds 3
echo "start mac compile (mac/centos 64bit) ..."
$env:GOOS="darwin"; $env:GOARCH="arm64"; go build -o dist/vn007-mac-arm64 main.go
Start-Sleep -Seconds 3
$env:GOOS="darwin"; $env:GOARCH="amd64"; go build -o dist/vn007-mac-amd64 main.go