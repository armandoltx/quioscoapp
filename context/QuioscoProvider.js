import { useState, useEffect, createContext } from "react"
import axios from "axios"
import { toast } from 'react-toastify' // la funcion q hacce q se muestre el toast
import { useRouter } from "next/router"


const QuioscoContext = createContext()

const QuioscoProvider = ({children}) => {
  const router = useRouter()

  const [categorias, setCategorias] = useState([])
  const [categoriaActual, setCategoriaActual] = useState({})
  const [producto, setProducto] = useState({})
  const [modal, setModal] = useState(false)
  const [pedido, setPedido] = useState([])
  const [nombre, setNombre] = useState('')
  const [total, setTotal] = useState(0)

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
    router.push('/')
  }

  useEffect(() => {
    const nuevoTotal = pedido.reduce((total, producto) => (producto.precio *producto.cantidad) + total, 0)
    setTotal(nuevoTotal)
  }, [pedido])

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

  const handleEditarCantidades = id => {
    const productoActualizar = pedido.filter( producto => producto.id === id)
    setProducto(productoActualizar[0])
    setModal(!modal)
  }

  const handleEliminarProducto = id => {
      const pedidoActualizado = pedido.filter( producto => producto.id !== id)
      setPedido(pedidoActualizado)
  }

  const colocarOrden = async (e) => {
    e.preventDefault();

    try {
        await axios.post('/api/ordenes', {pedido, nombre, total, fecha: Date.now().toString()})

        // Resetear la app
        setCategoriaActual(categorias[0])
        setPedido([])
        setNombre('')
        setTotal(0)

        toast.success('Pedido Realizado Correctamente')

        setTimeout(() => {
            router.push('/')
        }, 3000)

    } catch (error) {
        console.log(error)
    }
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
        handleEditarCantidades,
        handleEliminarProducto,
        nombre,
        setNombre,
        total

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