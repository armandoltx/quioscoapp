import { useState, useEffect, createContext } from "react"
import axios from "axios"

const QuioscoContext = createContext()

const QuioscoProvider = ({children}) => {
  const [categorias, setCategorias] = useState([])
  const [categoriaActual, setCategoriaActual] = useState({})
  const [producto, setProducto] = useState({})
  const [modal, setModal] = useState(false)

  const obtenerCategorias = async () => {
    const { data } = await axios('/api/categorias')
    setCategorias(data)
  }

  useEffect(() => {
    obtenerCategorias()
  },[])

  // Coge la 1 categoria cuando haya un cambio en categorias asi se queda marcada
  useEffect(() => {
    setCategoriaActual(categorias[0])
  },[categorias])

  const handleClickCategoria = id => {
    // console.log(id)
    const categoria = categorias.filter(cat => cat.id === id)
    // console.log(categoria) imprime un arreglo
    setCategoriaActual(categoria[0])
  }

  const handleSetProducto = producto =>{
    setProducto(producto)
  }

  const handleChangeModal = () => {
    setModal(!modal)
  }

  return(
    <QuioscoContext.Provider
      value={{
        categorias,
        categoriaActual,
        handleClickCategoria,
        producto,
        handleSetProducto,
        handleChangeModal,
        modal
      }}
    >
      {children}
    </QuioscoContext.Provider>
  )
}

export {
  QuioscoProvider
}

export default QuioscoContext