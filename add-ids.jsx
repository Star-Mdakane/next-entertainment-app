import fs from 'fs'

const data = JSON.parse(fs.readFileSync('./public/data.json', 'utf-8'))

const withIds = data.map(item => ({
    id: item.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''), ...item
}))

fs.writeFileSync('./public/data.json',
    JSON.stringify(withIds, null, 2))
console.log('Added IDs to', withIds.length, 'movies')