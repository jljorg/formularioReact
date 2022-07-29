import React, { useEffect, useState } from "react";
import Cliente from "../components/Cliente";

const Inicio = () => {
  const  [clientes,setClientes]  = useState([]);
  useEffect(() => {
    const listaClientes = async () => {
      try {
        const url = "http://localhost:4000/clientes";

        const respuesta = await fetch(url)
        const resultado = await  respuesta.json()
         setClientes(resultado);
         //console.log(resultado);
         
      } catch (error) {
        console.log(error)
      }
    };
    listaClientes();
  }, [])

  const handleEliminar =  async (id) =>{
    const confirmar= confirm('Desea eliminar el usuario')
    if(confirmar){
      try {
        const url = `http://localhost:4000/clientes/${id}`
        const  resultado = await fetch(url,{
          method:'DELETE',
          
        })
       //me trae todos los id atraves del filter que sean diferentes a el que llego
        const arrayClientes = clientes.filter(cliente => cliente.id !==id)
        setClientes(arrayClientes)
      } catch (error) {
        console.log(error)
        
      }
     
    }else{}
  }
  return (
    <>
      <h1 className="font-black text-4xl text-blue-900">Incio</h1>
      <p className='mt-3'>Lista Clientes</p>
       
       <table className="w-full mt-5 table-auto shadow bg-white">
         <thead className="bg-blue-800 text-white">
           <th className="p-2">Nombre</th>
           <th className="p-2">Empresa</th>
           <th className="p-2">Email</th>
           <th className="p-2">Telefono</th>
           <th className="p-2">Nota</th>
           <th className="p-2">Acciones</th>
         </thead>
         <tbody>
         {
        clientes.map((cliente)=>(
          
         <Cliente 
         key={cliente.id}
         cliente={cliente} 
         handleEliminar={handleEliminar}
         ></Cliente>
          

          

        ))
      }

         </tbody>
       </table>
    </>
  );
};

export default Inicio;
