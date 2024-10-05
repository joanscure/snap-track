import { useLoading } from "@/core/contexts/loading-context/loading-context";
import axiosService from "@/core/services/axios";
import { useEffect, useState } from "react";

export const useInfoUser = () => {
  const [info, setInfo] = useState<any>(null);
  const { showLoading, hideLoading } = useLoading();

  const getInfo = async () => {
    showLoading();
    await axiosService
      .get<any>("/customer-logistics/info")
      .then((either) => {
        either.fold(
          () => {},
          (response) => {
            setInfo(response.info);
          }
        );
      })
      .finally(() => {
        hideLoading();
      });
  };
  useEffect(() => {
    getInfo();
  }, []);

  return {
    info,
    refetch: () => {
      getInfo();
    },
  };
};
