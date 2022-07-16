import prisma from '../../../lib/prisma.js'

// POST /api/number
export default async function handle(req, res) {
  const result = await prisma.number.create({
    data: req.body,
  })
  res.json(result)
}