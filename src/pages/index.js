import Head from 'next/head'
import Image from 'next/image'
import Layout from '../../layout/Layout'
import { Inter } from 'next/font/google'
import { PrismaClient } from '@prisma/client'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  // console.log(categorias)
  return (
    <Layout>
      <h1>Hola Mundo!</h1>
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
