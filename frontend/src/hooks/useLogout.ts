import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AuthApi } from "../api/authApi";

const useLogout = () => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: () => AuthApi.logout(),
    onSuccess: () => {
      queryClient.resetQueries({ queryKey: ["auth"] });
    },
  });

  return { mutate };
};

export default useLogout;
