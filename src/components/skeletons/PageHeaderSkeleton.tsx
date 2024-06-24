import { Skeleton } from "@nextui-org/react";

export default function PageHeaderSkeleton() {
  return (
    <div className="mb-4">
      <Skeleton className="rounded-lg h-9 max-w-44 mb-4" />
      <Skeleton className="rounded-lg h-3 max-w-sm" />
    </div>
  );
}
