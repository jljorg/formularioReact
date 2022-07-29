import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Spinner from "../components/Spinner";

const VerCliente = () => {
  const [clienteId, setClienteId] = useState({});
  const { id } = useParams();
  const [cargando, setCargando] = useState(true);
  useEffect(() => {
    const obtenerCliente = async () => {
      try {
        // console.log(id)
        const url = `http://localhost:4000/clientes/${id}`;
        //console.log(url);
        const respuesta = await fetch(url);
        //console.log(respuesta)
        const resultado = await respuesta.json();
        setClienteId(resultado);
      } catch (error) {
        console.log(error);
      }
      setInterval(() => {
        setCargando(!cargando);
      }, 1000);
      
    };
    obtenerCliente();
  }, []);
 
  return (
    cargando ? <Spinner></Spinner> : ( Object.keys(clienteId).length===0 ? <p>No  hay resultados</p> : (
    <div>
      <h1 className="font-black text-4xl text-blue-900">
        Nuevo Cliente {clienteId.nombre}
      </h1>
      <p className="mt-10">Consulta Cliente</p>
      <p className="text-2xl text-gray-700">
        <span className="uppercase font-bold">Cliente : </span>
        {clienteId.nombre}
      </p>
      <p className="text-2xl text-gray-700">
        <span className="uppercase font-bold">Empresa : </span>
        {clienteId.empresa}
      </p>
      <p className="text-2xl text-gray-700">
        <span className="uppercase font-bold">Email :</span> {clienteId.email}
      </p>
      <p className="text-2xl text-gray-700">
        <span className="uppercase font-bold">Telefono : </span>
        {clienteId.telefono}
      </p>
      <p className="text-2xl text-gray-700">
        <span className="uppercase font-bold ">Nota </span>: {clienteId.nota}
      </p>
      <p className="text-2xl text-gray-700">
        <span className="uppercase font-bold">Cliente id</span> : {clienteId.id}
      </p>
    </div>
    )
    )
  );
};

export default VerCliente;
