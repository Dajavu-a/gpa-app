import { randomUUID } from 'node:crypto'
import { fileURLToPath } from 'node:url'
import jsonServer from 'json-server'

const server = jsonServer.create()
const router = jsonServer.router(fileURLToPath(new URL('./db.json', import.meta.url)))
const tokens = new Map()
const users = [
  { id: 1, username: 'student', password: '123456', name: 'Demo Student', role: 'student' },
  { id: 2, username: 'teacher', password: '123456', name: 'Demo Teacher', role: 'teacher' },
  { id: 3, username: 'admin', password: '123456', name: 'Demo Admin', role: 'admin' },
]

server.use(jsonServer.defaults())
server.use(jsonServer.bodyParser)

server.post('/auth/login', (request, response) => {
  const user = users.find(
    (account) =>
      account.username === request.body?.username && account.password === request.body?.password,
  )

  if (!user) {
    return response.status(401).json({ message: 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง' })
  }

  const accessToken = randomUUID()
  const publicUser = {
    id: user.id,
    username: user.username,
    name: user.name,
    role: user.role,
  }
  tokens.set(accessToken, publicUser)

  return response.json({ data: { accessToken, user: publicUser } })
})

server.get('/profile', (request, response) => {
  const authorization = request.get('Authorization') || ''
  const accessToken = authorization.match(/^Bearer\s+(.+)$/i)?.[1]
  const user = accessToken ? tokens.get(accessToken) : null

  if (!user) {
    return response.status(401).json({ message: 'กรุณาเข้าสู่ระบบใหม่' })
  }

  return response.json({ data: user })
})

server.use(router)

const port = Number(process.env.PORT || 3008)
server.listen(port, '127.0.0.1', () => {
  console.log(`Lab 4 API is running at http://127.0.0.1:${port}`)
})
