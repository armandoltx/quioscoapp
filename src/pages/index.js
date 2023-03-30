import Head from 'next/head'
import Image from 'next/image'
import Layout from '../../layout/Layout'
import useQuiosco from '../../hooks/useQuiosco'
import { Inter } from 'next/font/google'
import { PrismaClient } from '@prisma/client'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const { categoriaActual } = useQuiosco()

  // console.log(categorias)
  return (
    <Layout pagina={`Menu ${categoriaActual?.nombre}`}>
      <h1 className="text-4xl font-black">{categoriaActual?.nombre}</h1>
      <p className="text-2xl my-10">
        Elige y personaliza tu pedido a continuacion
      </p>
    </Layout>
  )
}

// export const getServerSideProps = async () => {
//   const prisma = new PrismaClient()

//   const categorias = await prisma.categoria.findMany()
//   // console.log(categorias)
//   return {
//     props: {
//       categorias,
//     }
//   }
// }
