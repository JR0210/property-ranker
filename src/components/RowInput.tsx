interface InputRowType {
  value: string;
  onChange: (value: string) => void;
  valid: boolean;
};

export default function CustomInput({ value, onChange, valid }: InputRowType) {
  return (
    <input
      type="url"
      className={`input input-bordered w-full ${valid ? 'input-accent' : 'input-error'}`}
      placeholder="Rightmove URL"
      value={value}
      onChange={e => onChange(e.target.value)}
    />
  );
};

