export interface UserContext {
  branchId: number;
  branches: boolean;
  companyId: number;
  currencyCode: string;
  currencyId: number;
  currencyLocal: string;
  currencySymbol: string;
  dashboard: string;
  email: string;
  id: number;
  image: string | null;
  isAdmin: boolean;
  isCompanyAdmin: boolean;
  isSearchReniec: boolean;
  name: string;
  roleId: number | null;
  tax: number;
  username: string;
}
export const UserContextDefault: UserContext = {
  id: 0,
  username: "",
  tax: 0.18,
  name: "",
  currencyId: 137,
  currencyLocal: "en-US",
  currencyCode: "USD",
  currencySymbol: "$",
  isCompanyAdmin: true,
  email: "Alysa10@yahoo.com",
  companyId: 1,
  image: "",
  roleId: null,
  isAdmin: true,
  branchId: 1,
  isSearchReniec: true,
  branches: true,
  dashboard: "",
};
