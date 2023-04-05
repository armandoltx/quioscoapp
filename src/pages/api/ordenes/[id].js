import {PrismaClient} from "@prisma/client"


export default async function handler(req, res) {
  const prisma = new PrismaClient()
  if(req.method === 'POST') {
    // console.log(req.query.id)
    // console.log("actualizando...")
    const { id } = req.query // es un string

    const ordenActualizada = await prisma.orden.update({
      where: {
        id: parseInt(id)
      },
      data: {
        estado: true
      }
    })
    res.status(200).json(ordenActualizada)
  }
}