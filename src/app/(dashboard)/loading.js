import { Skeleton } from "@/components/ui/skeleton"
 
export default function Loading() {
  return (
    <div className="flex flex-col space-y-3 p-4">
      <Skeleton className="h-full w-full rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[250px]" />
      </div>
    </div>
  )
}