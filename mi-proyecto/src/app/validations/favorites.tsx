import * as Yup from "yup";

export const favoritoSchema = Yup.object().shape({
  nombre: Yup.string()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(50, "El nombre no puede tener más de 50 caracteres")
    .required("El nombre es obligatorio"),
  
  descripcion: Yup.string()
    .max(250, "La descripcion no puede tener más de 250 caracteres"),
});

export interface FavoriteFormValues {
  nombre: string;
  descripcion: string;
}
