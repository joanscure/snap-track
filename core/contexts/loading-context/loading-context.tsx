import React, { createContext, useState, useContext } from "react";
interface ToastConfig {
  type?: string;
  text: string;
  timeout?: number;
  actionText?: string;
  actionIcon?: string;
  action?: () => void;
}

const LoadingContext = createContext({
  loading: false,
  textLoading: "Cargando",
  showLoading: (_text?: string) => {},
  hideLoading: () => {},
  toast: (toastConfig: ToastConfig) => {},
  setIsToast: (value: boolean) => {},
  isToast: false,
  toastConfig: { text: "Hello world!" } as ToastConfig,
});

export const LoadingProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [textLoading, setTextLoading] = useState("Cargando");

  const [isToast, setIsToast] = useState(false);
  const [toastConfig, setToastConfig] = useState<ToastConfig>({ text: "" });

  const toast = (conf: ToastConfig) => {
    setIsToast(true);
    setToastConfig(conf);
  };

  const showLoading = (text: string = "Cargando") => {
    setLoading(true);
    setTextLoading(text);
  };
  const hideLoading = () => setLoading(false);

  return (
    <LoadingContext.Provider
      value={{
        loading,
        showLoading,
        hideLoading,
        textLoading,
        isToast,
        setIsToast,
        toast,
        toastConfig,
      }}
    >
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => {
  return useContext(LoadingContext);
};
