import pino from 'pino'
import path from 'path'
import fs from 'fs'

const logDir = path.join(process.cwd(), 'logs')
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true }) // 递归创建
}
const logFilePath = path.join(logDir, 'app-%DATE%.log')

const logger = pino({
  level: 'info',
  transport: {
    targets: [
      {
        target: 'pino-pretty', // 美化日志输出
        options: { colorize: true }
      },
      {
        target: 'pino-rotating-file-stream',
        options: {
          filename: logFilePath,
          interval: '1d',
          maxFiles: 7,
          compress: true
        }
      }
    ]
  }
})

export default logger
