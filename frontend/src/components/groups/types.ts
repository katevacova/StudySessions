import { SessionCardProps } from "../session/types";

export interface GroupCardProps {
  id: string;
  name: string;
  subject: string;
  numberOfMembers: number;
  nextSession: SessionCardProps;
}
