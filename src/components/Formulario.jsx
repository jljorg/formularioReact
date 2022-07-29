import { Formik, Form, Field } from "formik";
import React from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { string } from "yup/lib/locale";
import Alerta from "./Alerta";
import Spinner from "../components/Spinner";

const Formulario = ({ clienteId, cargando }) => {
  const navigate = useNavigate();
  const nuevoCliente = Yup.object().shape({
    nombre: Yup.string()
      .min(3, "Nombre muy corto")
      .max(20, "Nombre muy largo")
      .required("Nombre obligatorio"),
    empresa: Yup.string()
      .min(2, "Nombre empresa muy corto")
      .max(50, "Nombre empresa muy largo")
      .required("Nombre empresa obligatorio"),
    email: Yup.string()
      .email("email no valido ")
      .min(2, "email muy corto")
      .max(50, "email muy largo")
      .required("email obligatorio"),
    telefono: Yup.number()
      .typeError("Ingrese numeros por favor")
      .positive("Numero negativo no valido"),
    nota: "",
  });
  const handleSubmit = async (values) => {
    try {
      let respuesta;
      if (clienteId.id) {
        //console.log(clienteId);
        const url = `http://localhost:4000/clientes/${clienteId.id}`;

        respuesta = await fetch(url, {
          method: "PUT",
          body: JSON.stringify(values),
          headers: {
            "Content-Type": "application/json",
          }
        })
        /*console.log(respuesta);
      const resultado = await respuesta.json();
      //console.log(resultado);
      navigate("/clientes")
      */
      } else {
        const url = "http://localhost:4000/clientes";
        console.log(values);
        respuesta = await fetch(url, {
          method: "POST",
          body: JSON.stringify(values),
          headers: {
            "Content-Type": "application/json",
          },
        });
      }
      //console.log(respuesta);
      await respuesta.json();
      //console.log(resultado);
      navigate("/clientes");
    } catch (error) {
      //console.log(values);
    }
  };
  return cargando ? (
    <Spinner></Spinner>
  ) : (
    <div
      className="bg-white mt-20 px-5 py-10 rounded-md shadow-md
    md:w-3/4 mx-auto"
    >
      <h1
        className="text-gray font-bold text-xl uppercase
        text-center"
      >
        {clienteId?.nombre ? "Editar Cliente" : "Agregar Cliente"}
      </h1>
      <Formik
        initialValues={{
          nombre: clienteId?.nombre ?? "",
          empresa: clienteId?.empresa ?? "",
          email: clienteId?.email ?? "",
          telefono: clienteId?.telefono ?? "",
          nota: clienteId?.nota ?? "",
        }}
        enableReinitialize={true}
        onSubmit={(values) => {
          handleSubmit(values);
        }}
        validationSchema={nuevoCliente}
      >
        {({ errors }) => {
          return (
            <Form className="mt-10">
              <div className="mb-4">
                <label htmlFor="nombre" className="text-gray-800 text-xl">
                  Nombre :{" "}
                </label>
                <Field
                  id="nombre"
                  type="text"
                  className="mt-2 block w-full p-3 bg-gray-50"
                  name="nombre"
                  placeholder="Ingrese nombre"
                />
                {errors.nombre ? <Alerta>{errors.nombre}</Alerta> : null}
              </div>
              <div className="mb-4">
                <label htmlFor="empresa" className="text-gray-800 text-xl">
                  Empresa :{" "}
                </label>
                <Field
                  id="empresa"
                  type="text"
                  className="mt-2 block w-full p-3 bg-gray-50"
                  name="empresa"
                  placeholder="Ingrese empresa"
                />
                {errors.empresa ? <Alerta>{errors.empresa}</Alerta> : null}
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="text-gray-800 text-xl">
                  Email :{" "}
                </label>
                <Field
                  id="email"
                  type="text"
                  className="mt-2 block w-full p-3 bg-gray-50"
                  name="email"
                  placeholder="Ingrese email"
                />
                {errors.email ? <Alerta>{errors.email}</Alerta> : null}
              </div>
              <div className="mb-4">
                <label htmlFor="telefono" className="text-gray-800 text-xl">
                  Telefono :{" "}
                </label>
                <Field
                  id="telefono"
                  type="text"
                  className="mt-2 block w-full p-3 bg-gray-50"
                  name="telefono"
                  placeholder="Ingrese telefono"
                />
                {errors.telefono ? <Alerta>{errors.telefono}</Alerta> : null}
              </div>
              <div className="mb-4">
                <label htmlFor="nota" className="text-gray-800 text-xl">
                  Notas :{" "}
                </label>
                <Field
                  as="textarea"
                  id="nota"
                  type="text"
                  className="mt-2 block w-full p-3 bg-gray-50 h-40"
                  name="nota"
                  placeholder="Ingrese nota"
                />
              </div>
              <input
                type="submit"
                value={clienteId?.nombre ? "Editar Cliente" : "Agregar Cliente"}
                className="mt-5 w-full bg-blue-600 p-3 text-white 
                 uppercase font-bold  text-lg"
              />
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

Formulario.defaultProps = {
  clienteId: {},
  cargando: false,
};

export default Formulario;
