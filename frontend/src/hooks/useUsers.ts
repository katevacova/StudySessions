import { UserApi } from "../api/userApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useMyself = () => {
  const { data } = useQuery({
    queryKey: ["myself"],
    queryFn: () => UserApi.getMyself(),
  });

  return { data };
};

export const useUsers = () => {
  const { data, isFetching } = useQuery({
    queryKey: ["users"],
    queryFn: () => UserApi.getAllUsers(),
  });

  return { data, isFetching };
};

export const useDeleteUser = (id: string) => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: () => UserApi.deleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  return { mutate };
};
