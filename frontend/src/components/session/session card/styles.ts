import clsx from "clsx";

export const cardStyle = (type: string) =>
  clsx(
    "card grid grid-auto-cols grid-auto-rows justify-items-center justify-stretch p-5 desktop:px-10 gap-x-5 gap-y-2 desktop:gap-y-0 w-[827] desktop:w-[373] h-[136] desktop:h-[126] border-4 rounded-lg shadow-lg text-info",
    {
      "border-accent": type === "active",
      "border-neutral": type === "non-active",
    },
  );

export const timeStyle = (type: string) =>
  clsx(
    "col-start-1 row-start-2 text-3xl desktop:text-4xl font-extrabold self-center text-center",
    {
      "text-accent": type === "active",
    },
  );

export const dateStyle = (type: string) =>
  clsx("col-start-1 row-start-3 text-base desktop:text-xl font-medium", {
    "text-accent": type === "active",
  });

export const durationStyle = (type: string) =>
  clsx("text-xl desktop:text-4xl font-medium desktop:font-bold", {
    "text-accent": type === "active",
  });

export const buttonStyle = (type: string) =>
  clsx(
    "btn btn-lg col-start-2 row-start-2 row-span-2 desktop:col-start-3 justify-self-stretch self-center desktop:self-auto",
    {
      "btn-accent": type === "active",
      "btn-primary": type === "non-active",
    },
  );

export const disabledButtonStyle = (isDisabled: boolean) =>
  clsx(
    "btn btn-block btn-lg col-start-2 row-start-2 row-span-2 desktop:col-start-3 justify-self-stretch self-center desktop:self-auto",
    {
      "disabled-class": isDisabled,
    },
  );

export const labelStyle = (type: string) =>
  clsx("label", {
    "text-white": type === "active",
    "text-info": type === "non-active",
  });
