import prisma from '../../lib/prisma'

export default async function handle(req, res) {
  const post = await prisma.number.findMany({
  })
  res.json(post)
}
