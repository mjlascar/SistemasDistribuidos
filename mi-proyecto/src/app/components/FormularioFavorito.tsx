"use client";

import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import {favoritoSchema, FavoriteFormValues} from "../validations/favorites";

//lo que recibe este componente
interface FormularioFavoritoProps {
    pokemonName: string; 
    onFormSubmit: (values: FavoriteFormValues) => void; // Función a llamar al guardar
    onCancel: () => void;
    isSubmitting?: boolean; // El estado de carga para deshabilitar botones
  }

export default function FormularioFavorito({ pokemonName, onFormSubmit, onCancel, isSubmitting }: FormularioFavoritoProps){
    
    const initialValues: FavoriteFormValues = {
        nombre: "", 
        descripcion: "",
    };

    // solo llama a la función que le pasaron por props
    const handleSubmit = (values: FavoriteFormValues) => {
        onFormSubmit(values);
        // el componente padre se encarga de cerrar el modal
    };

    

    return(
        <div>
            <h1 style={{ fontSize: '2rem', fontWeight: 'bold', textAlign: 'center', color: '#FFF' }}>
                Agregar a {pokemonName}
            </h1>
      
            <p style={{ textAlign: 'center', marginBottom: '2.5rem', color: '#B0B0B0', fontSize: '1.1rem' }}>
                ¡Dame un nombre y una descripcion interesante!
            </p>
          
          <Formik initialValues={initialValues} validationSchema={favoritoSchema} onSubmit={handleSubmit} >{
                <Form>
                    <div>
                        <label htmlFor="nombre">Nombre</label>
                        <Field
                            type="text"
                            id="nombre"
                            name="nombre"
                            placeholder="Dale un nombre"
                            style={{ padding: '0.4rem 0.5rem', margin: '0.5rem', borderRadius: '8px', backgroundColor: '#333'}}
                        />
                        <ErrorMessage name="nombre" component="div" className="error" />
                    </div>
        
                    <div>
                        <label htmlFor="descripcion">Descripcion</label>
                        <Field
                            type="text"
                            id="descripcion"
                            name="descripcion"
                            placeholder="ej: Con un temperamento..."
                            style={{ padding: '0.4rem 0.5rem', margin: '0.5rem', borderRadius: '8px', backgroundColor: '#333'}}
                        />
                        <ErrorMessage name="descripcion" component="div" className="error" />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginTop: '2rem' }}>
                        <button 
                            type="button" 
                            disabled={isSubmitting} 
                            onClick={onCancel} 
                            onMouseOver={(e) => e.currentTarget.style.color = '#B0B0B0'} 
                            onMouseOut={(e) => e.currentTarget.style.color = '#FFF'}
                        >
                            Cancelar
                        </button>
                        <button 
                            type="submit" 
                            disabled={isSubmitting} 
                            style={{ padding: '0.4rem 0.5rem', borderRadius: '8px', backgroundColor: '#333'}}
                            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#444'} 
                            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#333'}
                        >
                            {isSubmitting ? "Agregando..." : "Agregar"}
                        </button>
                    </div>
                </Form>
          
        }
      </Formik>
    </div>
  );
}