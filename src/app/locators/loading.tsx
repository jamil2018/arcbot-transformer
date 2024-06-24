import DataTableSkeleton from "@/components/skeletons/DataTableSkeleton";
import PageHeaderSkeleton from "@/components/skeletons/PageHeaderSkeleton";

export default function LocatorLoading() {
  return (
    <>
      <PageHeaderSkeleton />
      <DataTableSkeleton />
    </>
  );
}
