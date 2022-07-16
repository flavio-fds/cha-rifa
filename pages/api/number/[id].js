import prisma from '../../../lib/prisma'

export default async function handle(req, res) {
  const postId = req.query.id
  handleGET(postId, res)

  // if (req.method === 'GET') {
  // } else {
  //   throw new Error(
  //     `The HTTP ${req.method} method is not supported at this route.`
  //   )
  // }
}

// GET /api/post/:id
async function handleGET(postId, res) {
  const post = await prisma.number.findMany({
    where: { buyerId: postId }
  })
  res.json(post)
}