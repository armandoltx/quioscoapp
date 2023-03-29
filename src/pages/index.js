import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import { PrismaClient } from '@prisma/client'

const inter = Inter({ subsets: ['latin'] })

export default function Home({categorias}) {
  console.log(categorias)
  return (
    <>
      <h1>Hola Mundo!</h1>
    </>
  )
}

export const getServerSideProps = async () => {
  const prisma = new PrismaClient()

  const categorias = await prisma.categoria.findMany()
  // console.log(categorias)
  return {
    props: {
      categorias,
    }
  }
}
