import React from "react";

const Alerta = ({children}) => {
  return (
    <span className="text-center   text-red-600 font-bold   uppercase">
      {children +' ****'}
    </span>
  );
};

export default Alerta;
