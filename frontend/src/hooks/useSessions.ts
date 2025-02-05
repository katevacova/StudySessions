import { SessionApi } from "../api/sessionApi";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Session, SessionCreateInput } from "../models/session";
import { useState } from "react";

export const useSessions = () => {
  return useQuery({
    queryKey: ["sessions"],
    queryFn: () => SessionApi.getAllSessions(),
  });
};

export const useSessionHistory = () => {
  return useQuery({
    queryKey: ["sessions"],
    queryFn: () => SessionApi.getHistory(),
  });
};

export const useSession = (id: string) => {
  return useQuery({
    queryKey: ["session", id],
    queryFn: () => SessionApi.getSession(id),
  });
};

export const useCreateSession = () => {
  const queryClient = useQueryClient();
  const [newSession, setNewSession] = useState<Session | null>(null);

  const { mutate } = useMutation({
    mutationFn: (data: SessionCreateInput) => SessionApi.createSession(data),
    onSuccess: (data: Session) => {
      setNewSession(data);
      queryClient.invalidateQueries({ queryKey: ["sessions"] });
    },
  });

  return { mutate, newSession };
};

export const useUpdateSession = (id: string) => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: (data: Session) => SessionApi.updateSession(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sessions"] });
    },
  });

  return { mutate };
};

export const useDeleteSession = (id: string) => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: () => SessionApi.deleteSession(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sessions"] });
    },
  });

  return { mutate };
};
