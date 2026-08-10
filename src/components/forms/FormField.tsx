export function FormField({
  label,
  name,
  error,
  type = "text",
  textarea = false,
  required = true,
  placeholder,
  options,
}: {
  label: string;
  name: string;
  error?: string;
  type?: string;
  textarea?: boolean;
  required?: boolean;
  placeholder?: string;
  options?: string[];
}) {
  const inputClasses =
    "mt-1.5 w-full rounded-md border border-neutral-300 px-3.5 py-2.5 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100";

  return (
    <div>
      <label htmlFor={name} className="text-sm font-medium text-neutral-800">
        {label} {required && <span className="text-brand-600">*</span>}
      </label>
      {textarea ? (
        <textarea id={name} name={name} required={required} rows={4} placeholder={placeholder} className={inputClasses} />
      ) : options ? (
        <select id={name} name={name} required={required} className={inputClasses} defaultValue="">
          <option value="" disabled>
            Select an option
          </option>
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      ) : (
        <input id={name} name={name} type={type} required={required} placeholder={placeholder} className={inputClasses} />
      )}
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}
