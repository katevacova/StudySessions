import { BanApi } from "../api/banApi";
import { CreateBan, MutateBan } from "../models/ban";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export const useBanByUser = (id: string) => {
  const { data, isFetching } = useQuery({
    queryKey: ["bans", id],
    queryFn: () => BanApi.getBanByUserId(id),
  });

  return { data, isFetching };
};

export const useCreateBan = () => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: (data: CreateBan) => BanApi.createBan(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bans"] });
    },
  });

  return { mutate };
};

export const useUpdateBan = (id: string) => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: (data: MutateBan) => BanApi.updateBan(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bans", id] });
    },
  });

  return { mutate };
};

export const useDeleteBan = (id: string) => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: () => BanApi.deleteBan(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bans"] });
    },
  });

  return { mutate };
};
