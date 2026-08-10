export function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center">
      <p className="text-4xl font-bold tracking-tight text-white sm:text-5xl">{value}</p>
      <p className="mt-2 text-sm font-medium uppercase tracking-wide text-brand-100">{label}</p>
    </div>
  );
}
