
import useSWR from 'swr'
import axios from 'axios'
import AdminLayout from "../../layout/AdminLayout"

export default function Admin() {
  const fetcher = () => axios('/api/ordenes').then(datos => datos.data)
  const { data, error, isLoading } = useSWR('/api/ordenes', fetcher)
  console.log("admin")
  console.log(data)
  console.log(error)
  console.log(isLoading)


  return(
    <AdminLayout pagina={"Admin"}>
      <h1 className="text-4xl font-black">Panel de Administracion</h1>
      <p className="text-2xl my-10">Administra las Ordenes</p>
    </AdminLayout>
  )
}