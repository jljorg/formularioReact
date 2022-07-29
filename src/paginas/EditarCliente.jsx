
import Formulario from "../components/Formulario";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const EditarCliente = () => {
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
    <>
      <h1 className="font-black text-4xl text-blue-900">Editar Cliente</h1>
      <p className="mt-3">Editar Clientes</p>
      { clienteId.nombre ? (
      <Formulario 
      clienteId={clienteId}
      cargando={cargando}></Formulario>
       ) :<p>No se encontro el dato</p>}
    </>
  );
};

export default EditarCliente;
