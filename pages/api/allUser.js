import prisma from '../../lib/prisma'

export default async function handle(req, res) {
  try {
    const post = await prisma.user.findMany({
    })
    res.json(post)
  } catch (error) {
    console.log(error);
    res.json({ erro: 'erro' })
  }

}
