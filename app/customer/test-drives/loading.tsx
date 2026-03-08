import { Skeleton } from "@/components/ui/skeleton";

export default function CustomerTestDrivesLoading() {
  return (
    <div className="p-6 md:p-8">
      <div className="mb-8 flex items-center justify-between">
        <Skeleton className="h-10 w-64" />
        <Skeleton className="h-10 w-36" />
      </div>
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-24 rounded-xl" />
        ))}
      </div>
    </div>
  );
}
