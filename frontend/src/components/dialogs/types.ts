export interface DialogProps {
  onClose: () => void;
}

export interface MutateDialogProps extends DialogProps {
  id: string;
}

export interface RedirectDialogProps extends DialogProps {
  where: string;
}

export interface Ban {
  userId: string;
  reason: string;
  expiration: Date;
}
