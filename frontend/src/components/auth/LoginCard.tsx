import { SubmitHandler, useForm } from "react-hook-form";
import { LoginFormProps, loginSchema } from "./validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useEffect } from "react";

const LoginCard = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (auth?.user) {
      navigate(auth.user.isOwner ? "/admin" : "/auth/homepage");
    }
  }, [auth, navigate]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormProps>({
    defaultValues: { email: "", password: "" },
    resolver: zodResolver(loginSchema),
  });

  const submitHandler: SubmitHandler<LoginFormProps> = (values) => {
    auth?.login(values);
  };

  return (
    <div
      className="card flex flex-col desktop:flex-row w-min desktop:w-max h-max self-center items-center gap-10 desktop:gap-16 p-10 m-10
     desktop:pr-14 bg-neutral border-2 border-transparent rounded-lg text-info shadow-md"
    >
      <div className="flex flex-col desktop:order-last gap-5">
        <h1 className="text-3xl desktop:text-4xl font-extrabold text-center">
          Let's login and <br />
          start your <br />
          StudySession!
        </h1>
        <p className="text-base text-center">
          Without login we are not able to show
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

        <button
          type="submit"
          className="btn self-center py-2 px-14 desktop:px-20 my-5 bg-secondary text-white font-bold text-lg"
        >
          Login in
        </button>

        <div className="flex justify-center gap-2">
          <p>Don't have an account?</p>
          <Link to={"/register"} className="text-accent font-bold">
            Sign up now!
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginCard;
