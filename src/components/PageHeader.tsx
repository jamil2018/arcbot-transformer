export default function PageHeader({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="mb-4">
      <h1 className="text-4xl font-bold mb-2">{title}</h1>
      <p className="text-xs text-gray-400">{description}</p>
    </div>
  );
}
