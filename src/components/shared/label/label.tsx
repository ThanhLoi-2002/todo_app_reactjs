import { FC } from 'react'
interface Props {
    label: string;
    isRequired?: boolean;
}
const Label: FC<Props> = ({label, isRequired = false}) => {
  return (
      <label
          className="flex items-center text-sm font-medium leading-6 text-gray-900 mb-2 gap-2"
      >
          {label}
          {isRequired && <div className="text-red-500">*</div>}
      </label>
  )
}

export default Label
