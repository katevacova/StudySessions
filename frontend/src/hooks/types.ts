export interface AuthProps {
  navigateTo: string;
}

export interface LoginProps {
  email: string;
  password: string;
}

export interface RegisterProps extends LoginProps {
  username: string;
}
