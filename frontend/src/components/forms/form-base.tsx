const FormBase = ({
  children,
  onSubmit,
}: {
  children: React.ReactNode;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}) => {
  return (
    <form
      onSubmit={onSubmit}
      className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-md"
    >
      {children}
    </form>
  );
};

export default FormBase;
