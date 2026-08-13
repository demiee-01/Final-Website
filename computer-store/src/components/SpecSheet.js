/* SpecSheet — displays laptop specs as "Label : Value" lines
   matching the spec sheet style in the reference image */
export default function SpecSheet({ laptop, className = "" }) {
  const specs = [
    { label: "CPU",      value: laptop.cpu },
    { label: "RAM",      value: laptop.ram },
    { label: "Storage",  value: laptop.storage },
    { label: "GPU",      value: laptop.gpu },
    { label: "Display",  value: laptop.display },
    { label: "OS",       value: laptop.os },
    { label: "Keyboard", value: laptop.keyboard },
  ].filter((s) => s.value);

  return (
    <div className={`space-y-0.5 sm:space-y-1 text-[9px] sm:text-sm ${className}`}>
      {/* Show only 4 specs on mobile, all on tablet+ */}
      {specs.slice(0, 4).map((s) => (
        <p key={s.label} className="text-gray-700 line-clamp-1 block sm:block">
          <span className="font-semibold text-gray-900">{s.label}</span>
          <span className="text-gray-500"> : </span>
          <span className="text-gray-600">{s.value}</span>
        </p>
      ))}
      {/* Show remaining specs only on tablet+ */}
      {specs.slice(4).map((s) => (
        <p key={s.label} className="text-gray-700 line-clamp-1 hidden sm:block">
          <span className="font-semibold text-gray-900">{s.label}</span>
          <span className="text-gray-500"> : </span>
          <span className="text-gray-600">{s.value}</span>
        </p>
      ))}
    </div>
  );
}
