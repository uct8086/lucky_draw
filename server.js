// server.js
const http = require('http');
const fs = require('fs');
const path = require('path');

// 定义端口号
const PORT = 9000;

// 创建HTTP服务器
const server = http.createServer((req, res) => {
  // 解析请求的URL路径
  let filePath = '.' + req.url;
  if (filePath === './') {
    filePath = './index.html'; // 默认提供index.html
  }

  // 确定文件扩展名并设置Content-Type
  const extname = String(path.extname(filePath)).toLowerCase();
  const mimeTypes = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpg',
    '.gif': 'image/gif',
    '.wav': 'audio/wav',
    '.mp4': 'video/mp4',
    '.woff': 'application/font-woff',
    '.ttf': 'application/font-ttf',
    '.eot': 'application/vnd.ms-fontobject',
    '.otf': 'application/font-otf',
    '.svg': 'application/image/svg+xml'
  };

  const contentType = mimeTypes[extname] || 'application/octet-stream';

  // 读取文件并发送响应
  fs.readFile(filePath, (error, content) => {
    if (error) {
      if (error.code === 'ENOENT') {
        // 文件不存在，返回404 Not Found
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<h1>404 Not Found</h1>');
      } else {
        // 其他错误，返回500 Internal Server Error
        res.writeHead(500, { 'Content-Type': 'text/html' });
        res.end('<h1>500 Internal Server Error</h1>');
      }
    } else {
      // 文件存在，返回200 OK和文件内容
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

// 监听9000端口
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});