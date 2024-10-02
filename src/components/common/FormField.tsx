import React from "react"

interface FormFieldProps {
  name: string
  label: string
  type?: string
  as?: string
  required?: boolean
  className?: string
  form: any
}

const FormField: React.FC<FormFieldProps> = ({ name, label, type = "text", as, required = false, className = "", form }) => {
  const {
    register,
    formState: { errors },
  } = form
  const inputClassName = `w-full input input-bordered ${className}`
  const textareaClassName = `w-full textarea textarea-bordered ${className}`

  return (
    <div className="flex flex-col">
      <label htmlFor={name} className="label">
        <span className="label-text">
          {label}
          {required && <span className="text-error ml-1">*</span>}
        </span>
      </label>
      {as === "textarea" ? (
        <textarea id={name} {...register(name, { required: required ? `${label} is required` : false })} className={textareaClassName} />
      ) : (
        <input
          id={name}
          type={type}
          {...register(name, {
            required: required ? `${label} is required` : false,
            valueAsNumber: type === "number",
          })}
          className={inputClassName}
        />
      )}
      {errors[name] && <div className="mt-1 text-sm text-error">{errors[name]?.message}</div>}
    </div>
  )
}

export default FormField
