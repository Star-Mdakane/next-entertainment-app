import fs from 'fs/promises'
import path from 'path'

const file = path.join(process.cwd(), 'users.json')

export async function getUsers() {
    try {
        const data = await fs.readFile(file, 'utf-8')
        const parsed = JSON.parse(data)
        if (Array.isArray(parsed)) return parsed
        if (parsed && typeof parsed === 'object') return [parsed]
        return []
    } catch {
        await fs.writeFile(file, '[]')
        return []
    }
}

export async function saveUsers(users) {
    await fs.writeFile(file, JSON.stringify(users, null, 2))
}

export async function saveUser(user) {
    const users = await getUsers()
    users.push(user)
    await saveUsers(users)
}

export async function findUserByEmail(email) {
    const users = await getUsers()
    return users.find(u => u.email === email)
}