import { FieldApi } from "@tanstack/react-form";

export default function FieldInfo({
  field,
}: {
  field: FieldApi<any, any, any, any>;
}) {
  return (
    <>
      <div className="min-h-6">
        {field.state.meta.touchedErrors ? (
          <em className="text-xs text-foreground-400">
            {field.state.meta.touchedErrors}
          </em>
        ) : null}
        {field.state.meta.isValidating ? "Validating..." : null}
      </div>
    </>
  );
}
