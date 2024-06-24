import { Skeleton } from "@nextui-org/react";
import ButtonSkeleton from "./ButtonSkeleton";

export default function DataTableSkeleton() {
  return (
    <>
      <div className="flex justify-between items-center">
        <Skeleton className="rounded-lg h-9 w-1/3 mb-4" />
        <div className="flex gap-3">
          <ButtonSkeleton />
          <ButtonSkeleton />
        </div>
      </div>
      <div className="flex justify-between items-center mb-4">
        <Skeleton className="rounded-lg h-5 w-24" />
        <Skeleton className="rounded-lg h-9 w-36" />
      </div>
      <Skeleton className="w-full h-64 rounded-lg mb-4" />
      <div className="flex justify-between items-center">
        <Skeleton className="rounded-lg h-5 w-24" />
        <Skeleton className="rounded-lg h-9 w-24" />
        <div className="flex items-center gap-3">
          <ButtonSkeleton />
          <ButtonSkeleton />
        </div>
      </div>
    </>
  );
}
