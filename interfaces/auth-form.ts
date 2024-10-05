export interface FormDataRegister {
  documentNumber: string;
  customerType: string;
  name: string;
  lastname: string;
  email: string;
  address: string;
  state: string | null;
  city: string | null;
  primaryPhone: string;
  additionalPhone: string;
  password: string;
}
