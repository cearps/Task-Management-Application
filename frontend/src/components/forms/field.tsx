type FieldProps = {
  label: string;
  type: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  errors?: string;
};

const Field = ({
  label,
  type,
  value,
  onChange,
  placeholder,
  errors,
}: FieldProps) => {
  return (
    <div className="mb-4">
      <label
        className="block text-gray-700 font-semibold mb-2"
        htmlFor={convertToSlug(label)}
      >
        {label}
      </label>
      <input
        id={convertToSlug(label)}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
      />
      {errors !== undefined && (
        <div className="text-red-500 text-xs mt-1">{errors}</div>
      )}
    </div>
  );
};

const convertToSlug = (text: string) => {
  return text
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");
};

export default Field;
