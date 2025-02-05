import { MutateBan } from "../../../models/ban";
import { useForm, Controller } from "react-hook-form";
import { banSchema } from "../validationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import DatePicker from "react-datepicker";
import { SubmitHandler } from "react-hook-form";
import { useDeleteBan, useUpdateBan } from "../../../hooks/useBans";

interface MutateBanFormProps {
  defaultValues: MutateBan;
  onClose: () => void;
  onMutate: () => void;
}

const MutateBanForm = ({
  defaultValues,
  onClose,
  onMutate,
}: MutateBanFormProps) => {
  const { mutate: updateBan } = useUpdateBan(defaultValues.id);
  const { mutate: deleteBan } = useDeleteBan(defaultValues.id);

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<MutateBan>({
    defaultValues: defaultValues,
    resolver: zodResolver(banSchema),
  });

  const handleDelete = () => {
    deleteBan();
    onMutate();
    onClose();
  };

  const onSubmit: SubmitHandler<MutateBan> = (values: MutateBan) => {
    updateBan(values);
    onMutate();
    onClose();
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
        <label htmlFor="reason" className="label text-base font-medium">
          Reason
        </label>
        <input
          {...register("reason")}
          type="text"
          id="reason"
          disabled={true}
          placeholder="Banned because..."
          className="input input-bordered input-primary w-[250px] h-[50px] desktop:w-[400px] text-sm desktop:text-base"
        />
        {errors.reason && (
          <p className="text-red-700 mt-2 text-sm">{errors.reason.message}</p>
        )}

        <label
          htmlFor="expiration"
          className="label text-base font-medium mt-4"
        >
          Expiration date
        </label>
        <Controller
          control={control}
          name="expiration"
          render={({ field }) => (
            <DatePicker
              {...register("expiration", { valueAsDate: true })}
              id="expiration"
              selected={new Date(field.value)}
              minDate={new Date()}
              onChange={(date) => {
                field.onChange(date);
                setValue("expiration", date?.toString() || "");
              }}
              placeholderText="Choose expiration..."
              isClearable={true}
              dateFormat={"dd/MM/yyyy"}
              className="border border-primary rounded-[10px] h-[50px] text-info text-sm desktop:text-base font-medium pl-4 pr-1 placeholder:text-[#D2D2D2] w-[250px] desktop:w-[400px]"
            />
          )}
        />
        {errors.expiration && (
          <p className="text-red-700 mt-2 text-sm">
            {errors.expiration.message}
          </p>
        )}
      </form>
      <div className="flex items-center justify-center gap-6 mt-4">
        <button
          type="submit"
          className="btn btn-primary self-center w-[100px] desktop:w-[150px]"
          onClick={handleSubmit(onSubmit)}
        >
          Edit Ban
        </button>
        <button
          className="btn btn-error self-center w-[100px] desktop:w-[150px]"
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
    </>
  );
};

export default MutateBanForm;
