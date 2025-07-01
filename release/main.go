package main

import (
	"embed"
	"fmt"
	"io/fs"
	"net"
	"net/http"
	"os/exec"
	"runtime"
	"time"
)

//go:embed public/*
var staticFiles embed.FS

func openBrowser(url string) {
	var cmd string
	var args []string

	switch runtime.GOOS {
	case "darwin":
		cmd = "open"
		args = []string{url}
	case "windows":
		cmd = "rundll32"
		args = []string{"url.dll,FileProtocolHandler", url}
	default: // linux, freebsd, openbsd, netbsd
		cmd = "xdg-open"
		args = []string{url}
	}
	_ = exec.Command(cmd, args...).Start()
}

func waitForPort(port string, timeout time.Duration) bool {
	deadline := time.Now().Add(timeout)
	for time.Now().Before(deadline) {
		conn, err := net.DialTimeout("tcp", port, 500*time.Millisecond)
		if err == nil {
			conn.Close()
			return true
		}
		time.Sleep(200 * time.Millisecond)
	}
	return false
}

func main() {
	const addr = ":38080"
	publicFS, err := fs.Sub(staticFiles, "public")
	if err != nil {
		panic("出错了：" + err.Error())
	}
	staticServer := http.FileServer(http.FS(publicFS))

	// 自定义404兜底
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		path := r.URL.Path[1:]
		if path == "" {
			path = "index.html"
		}
		f, err := publicFS.Open(path)
		if err != nil {
			w.WriteHeader(http.StatusNotFound)
			fmt.Fprintf(w, "404 Not Found: %s", r.URL.Path)
			return
		}
		f.Close()
		staticServer.ServeHTTP(w, r)
	})

	// 启动端口监听检测
	go func() {
		if waitForPort("localhost"+addr, 10*time.Second) {
			openBrowser("http://localhost" + addr)
		}
	}()
	fmt.Printf("服务已启动，监听端口 http://localhost%s\n", addr)
	http.ListenAndServe(addr, nil)
}
