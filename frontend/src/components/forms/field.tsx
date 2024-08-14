import React from 'react';

type FieldProps = {
  label: string;
  type: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;  // Add this line to include the required prop
  errors?: string;
};

const Field: React.FC<FieldProps> = ({
  label,
  type,
  value,
  onChange,
  placeholder,
  required,  // Add required to the destructured props
  errors,
}: FieldProps) => {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 font-semibold mb-2">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}  // Pass the required prop to the input element
        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
      />
      {errors !== undefined && (
        <div className="text-red-500 text-xs mt-1">{errors}</div>
      )}
    </div>
  );
};

export default Field;
