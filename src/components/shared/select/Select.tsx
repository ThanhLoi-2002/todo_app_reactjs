import React, { useEffect, useState } from "react";
import { FieldError, UseFormReturn } from "react-hook-form";
import { Option } from "@/types/common";
import Label from "../label/label";

interface Props {
  label: string;
  options: Option[];
  name: string;
  form: UseFormReturn<any>;
  onChangeValue?: (value: string) => void;
  isRequired?: boolean;
}

const Select: React.FC<Props> = ({
  label,
  name,
  options,
  form,
  onChangeValue,
  isRequired = false,
}) => {
  const [value, setValue] = useState(form.getValues(name));
  const error = form.formState.errors[name];
  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    form.setValue(name, e.target.value);
    setValue(e.target.value);
    onChangeValue && onChangeValue(e.target.value);
  };
  
  useEffect(() => {
    setValue(form.getValues(name))
  }, [value])
  return (
    <div className="mb-4">
      <Label label={label} isRequired={isRequired} />
      <select
        name={name}
        className={`p-2 text-sm w-full border border-gray-400 rounded text-gray-900`}
        value={value}
        onChange={onChange}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <span className="text-sm text-red-600 ">
          {(error as FieldError)?.message}
        </span>
      )}
    </div>
  );
};

export default Select;
