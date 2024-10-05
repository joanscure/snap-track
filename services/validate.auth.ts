import { FormDataRegister } from "@/interfaces/auth-form";

export const validateFormLogin = (formData: {
  email: string;
  password: string;
}) => {
  const newErrors: Record<string, string> = {};

  if (!formData.email) {
    newErrors.email = "El correo electrónico es obligatorio";
  } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    newErrors.email = "El formato del correo es incorrecto";
  }
  if (!formData.password) {
    newErrors.password = "La contraseña es obligatoria";
  }
  return newErrors;
};

export const validateFormRegister = (formData: FormDataRegister) => {
  const newErrors: Record<string, string> = {};

  if (!formData.documentNumber) {
    newErrors.documentNumber = "El número de identificación es obligatorio";
  }

  if (!formData.name) {
    newErrors.name = "El nombre es obligatorio";
  }

  if (formData.customerType === "person" && !formData.lastname) {
    newErrors.lastname = "Los apellidos son obligatorios";
  }

  if (!formData.email) {
    newErrors.email = "El correo electrónico es obligatorio";
  } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    newErrors.email = "El formato del correo es incorrecto";
  }

  if (!formData.primaryPhone) {
    newErrors.primaryPhone = "El teléfono es obligatorio";
  } else if (!/^\d{10}$/.test(formData.primaryPhone)) {
    newErrors.primaryPhone = "El teléfono debe tener 10 dígitos";
  }

  if (!formData.address) {
    newErrors.address = "La dirección es obligatoria";
  }

  if (!formData.state) {
    newErrors.state = "La provincia es obligatoria";
  }

  if (!formData.city) {
    newErrors.city = "La ciudad es obligatoria";
  }

  if (!formData.password) {
    newErrors.password = "La contraseña es obligatoria";
  }

  return newErrors;
};
