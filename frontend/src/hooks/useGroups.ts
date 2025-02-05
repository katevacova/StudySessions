import { GroupApi } from "../api/groupApi";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { GroupBasic } from "../models/group";

export const useGroups = () => {
  const { data, isFetching } = useQuery({
    queryKey: ["groups"],
    queryFn: () => GroupApi.getAllGroups(),
  });

  return { data, isFetching };
};

export const useGroupsForAdmin = () => {
  const { data, isFetching } = useQuery({
    queryKey: ["groups"],
    queryFn: () => GroupApi.getAllGroupsForAdmin(),
  });

  return { data, isFetching };
};

export const useGroup = (id: string) => {
  return useQuery({
    queryKey: ["group", id],
    queryFn: () => GroupApi.getGroup(id),
  });
};

export const useCreateGroup = () => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: (data: GroupBasic) => GroupApi.createGroup(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["groups"] });
    },
  });

  return { mutate };
};

export const useUpdateGroup = (id: string) => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: (data: GroupBasic) => GroupApi.updateGroup(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["groups"] });
    },
  });

  return { mutate };
};

export const useDeleteGroup = (id: string) => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: () => GroupApi.deleteGroup(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["groups"] });
    },
  });

  return { mutate };
};
