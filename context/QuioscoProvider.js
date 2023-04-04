import { useState, useEffect, createContext } from "react"
import axios from "axios"
import { toast } from 'react-toastify' // la funcion q hacce q se muestre el toast


const QuioscoContext = createContext()

const QuioscoProvider = ({children}) => {
  const [categorias, setCategorias] = useState([])
  const [categoriaActual, setCategoriaActual] = useState({})
  const [producto, setProducto] = useState({})
  const [modal, setModal] = useState(false)
  const [pedido, setPedido] = useState([])

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

  const handleAgregarPedido = ({categoriaId, ...producto}) => {
    if(pedido.some(productoState => productoState.id === producto.id)) {
      // console.log("el producto ya existe")
       // Actualizar la cantidad
       const pedidoActualizado = pedido.map(productoState => productoState.id === producto.id ? producto : productoState)
       setPedido(pedidoActualizado)
       toast.success('Guardado Correctamente')

    } else {
        setPedido([...pedido, producto])
        toast.success('Agregado al pedido')
    }

    setModal(false)
    // console.log("hereee")
  }

  return(
    <QuioscoContext.Provider
      value={{
        categorias,
        categoriaActual,
        handleClickCategoria,
        producto,
        handleSetProducto,
        handleAgregarPedido,
        handleChangeModal,
        modal,
        pedido,

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