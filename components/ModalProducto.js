import React from 'react';
import Image from "next/image";
import useQuiosco from '../hooks/useQuiosco';
import { formatearDinero } from '../helpers';

const ModalProducto = () => {
  const { producto, handleChangeModal } = useQuiosco()


  return (
    <div className="md:flex gap-10">
      <div className="md:w-1/3">
        <Image
          width={300}
          height={400}
          alt={`imagen producto ${producto.nombre}`}
          src={`/assets/img/${producto.imagen}.jpg`}
        />
      </div>

      <div className="md:w-2/3">
        <div className="flex justify-end">
          <button onClick={handleChangeModal}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <h1 className="text-3xl font-bold mt-5">{producto.nombre}</h1>
        <p className="mt-5 font-black text-5xl text-amber-500">
          {formatearDinero(producto.precio)}
        </p>
      </div>
    </div>
  )
}

export default ModalProducto;