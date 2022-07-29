import React from "react";
import { useNavigate } from "react-router-dom";

const Clientes = ({ cliente,handleEliminar }) => {
  const {nombre,empresa,email,telefono,nota,id} = cliente;
  const navigate =useNavigate();
  return (
    <tr className="border hover:bg-gray-200">
      <td className="p-3">{nombre}</td>
      <td className="p-3">{empresa}</td>
      <td className="p-3">{email}</td>
      <td className="p-3">{telefono}</td>
      <td className="p-3">{nota}</td>
      <td className="p-3" ><button className="bg-yellow-500   hover:bg-yellow-600 block
       w-full p-2 text-white uppercase font-bold text-xs rounded-md" onClick={()=>navigate(`/clientes/editar/${id}`)}>Edit</button>
       
       <button className="bg-red-500   hover:bg-red-800 block
       w-full p-2 text-white uppercase font-bold text-xs mt-3 rounded-md"
       onClick={()=>handleEliminar(id)}>Eliminar</button>
       <button className="bg-green-500   hover:bg-green-600 block
       w-full p-2 text-white uppercase font-bold text-xs mt-3 rounded-md"
       onClick={()=>navigate(`/clientes/${id}`)}>ver</button></td>
    </tr>
  );
};

export default Clientes;
