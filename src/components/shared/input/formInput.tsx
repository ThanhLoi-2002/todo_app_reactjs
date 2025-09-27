import { Eye, EyeClosed } from "lucide-react";
import { FC, useState } from "react";
import { FieldError, UseFormReturn } from "react-hook-form";
import Label from "../label/label";

interface Props {
  label: string;
  name: string;
  type?: string;
  className?: string;
  form: UseFormReturn<any>;
  isTextArea?: boolean;
  readOnly?: boolean;
  styleInput?: string;
  icon?: any;
  isRequired?: boolean;
}

const FormInput: FC<Props> = ({
  label,
  name,
  type = "text",
  className = "sm:col-span-2",
  form,
  isTextArea = false,
  readOnly = false,
  styleInput,
  icon,
  isRequired = false,
}) => {
  const [showPassword, setShowPassword] = useState(type);
  const error = form.formState.errors[name];
  const Icon: any = icon;
  return (
    <div className={`${className} my-2`}>
      <Label label={label} isRequired={isRequired} />
      <div className="mt-2 flex relative">
        {icon && (
          <Icon className="text-gray-900  absolute left-4 top-1/2 transform -translate-y-1/2 pr-1.5 h-auto" />
        )}
        {!isTextArea ? (
          <>
            <input
              {...form.register(name)}
              type={type === "password" ? showPassword : type}
              name={name}
              id={name}
              autoComplete={name}
              readOnly={readOnly}
              className={
                styleInput
                  ? styleInput
                  : `
               ${icon ? "px-12" : "pl-4 pr-14"}
                block w-full rounded-md py-3 outline-none text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300  placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-slate-500 sm:text-sm sm:leading-6`
              }
              placeholder={`Type the ${label.toLowerCase()}`}
            />
            {type === "password" && (
              <span
                className="absolute right-4 text-gray-900  top-1/2 transform -translate-y-1/2 pr-1.5 h-auto"
                onClick={() =>
                  setShowPassword(
                    showPassword === "password" ? "text" : "password"
                  )
                }
              >
                {showPassword === "password" ? <EyeClosed /> : <Eye />}
              </span>
            )}
          </>
        ) : (
          <textarea
            {...form.register(name)}
            name={name}
            id={name}
            rows={3}
            placeholder={`Type the ${label.toLowerCase()}`}
            className={
              styleInput
                ? styleInput
                : "block w-full rounded-md p-3 outline-none text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300  placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-slate-500 sm:text-sm sm:leading-6"
            }
          />
        )}
      </div>
      {error && (
        <span className="text-sm text-red-600 ">
          {(error as FieldError)?.message}
        </span>
      )}
    </div>
  );
};

export default FormInput;
