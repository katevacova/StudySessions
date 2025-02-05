import { SubmitHandler, useForm } from "react-hook-form";
import { RegisterFormProps, registrationSchema } from "./validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import useRegister from "../../hooks/useRegister";

const RegisterCard = () => {
  const { registration } = useRegister({ navigateTo: "/login" });
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormProps>({
    defaultValues: { email: "", password: "", username: "" },
    resolver: zodResolver(registrationSchema),
  });

  const submitHandler: SubmitHandler<RegisterFormProps> = (values) => {
    registration({
      username: values.username,
      email: values.email,
      password: values.password,
    });
    navigate("/register");
  };

  return (
    <div
      className="card flex flex-col desktop:flex-row w-min desktop:w-max h-max self-center items-center gap-10 p-10 m-10
    bg-neutral border-2 border-transparent rounded-lg text-info shadow-md"
    >
      <div className="flex flex-col desktop:order-last gap-5">
        <h1 className="text-3xl desktop:text-4xl font-extrabold text-center">
          Let's sign up and <br />
          start your <br />
          StudySession!
        </h1>
        <p className="text-base text-center">
          Without signing up we are not able to show
          <br />
          you your sessions, groups and stats.
        </p>
      </div>

      <form
        onSubmit={handleSubmit(submitHandler)}
        className="card flex flex-col justify-stretch py-10 px-10 w-max desktop:w-[460px]
        bg-base-100 border-2 border-transparent rounder-lg text-info shadow-sm"
      >
        <label
          htmlFor="email"
          className="label text-xl font-medium self-stretch"
        >
          Email
        </label>
        <input
          {...register("email")}
          id="email"
          className="input input-primary border-2 border-lg"
          placeholder="Email"
        />
        {errors.email && (
          <p className="text-red-700 mt-2">{errors.email.message}</p>
        )}

        <label
          htmlFor="username"
          className="label mt-5 text-xl font-medium self-stretch"
        >
          Username
        </label>
        <input
          {...register("username")}
          id="username"
          className="input input-primary border-2 border-lg"
          placeholder="Username"
        />
        {errors.username && (
          <p className="text-red-700 mt-2">{errors.username.message}</p>
        )}

        <label htmlFor="password" className="label mt-5 text-xl font-medium">
          Password
        </label>
        <input
          {...register("password")}
          id="password"
          type="password"
          className="input input-primary border-2 border-lg"
          placeholder="Password"
        />
        {errors.password && (
          <p className="text-red-700 mt-2">{errors.password.message}</p>
        )}

        <label
          htmlFor="repeatPassword"
          className="label mt-5 text-xl font-medium"
        >
          Repeat password
        </label>
        <input
          {...register("repeatPassword")}
          id="repeatPassword"
          type="password"
          className="input input-primary border-2 border-lg"
          placeholder="Repeat password"
        />
        {errors.repeatPassword && (
          <p className="text-red-700 mt-2">{errors.repeatPassword.message}</p>
        )}

        <button className="btn self-center py-2 px-14 desktop:px-20 my-5 bg-secondary text-white font-bold text-lg">
          Sign in
        </button>

        <div className="flex justify-center gap-1">
          <p>Already have an account? Log in</p>
          <Link to={"/login"} className="text-accent font-bold">
            now!
          </Link>
        </div>
      </form>
    </div>
  );
};

export default RegisterCard;
