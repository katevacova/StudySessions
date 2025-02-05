import { useNavigate } from "react-router-dom";
import { AuthApi } from "../api/authApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AuthProps, RegisterProps } from "./types";
import { useSnackbar } from "notistack";
import { AxiosError } from "axios";

const useRegister = ({ navigateTo }: AuthProps) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();

  const { mutate } = useMutation({
    mutationFn: (values: RegisterProps) =>
      AuthApi.register(values.email, values.username, values.password),
    retry: false,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth"] });
      navigate(navigateTo);
    },
    onError: (res: AxiosError<{ error: string }>) => {
      enqueueSnackbar(res.response?.data.error, {
        variant: "error",
      });
    },
  });

  return { registration: mutate };
};

export default useRegister;
