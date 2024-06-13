import { useGetAllCodesQuery } from "@/redux/slices/api";
import CodeItem from "@/components/CodeItem";
import Loader from "@/components/Loader";

const AllCodes = () => {
  const { data: codes, isLoading } = useGetAllCodesQuery();

  if (isLoading)
    return (
      <div className="w-full h-[calc(100dvh-60px)] flex items-center justify-center">
        <Loader />
      </div>
    );

  if (codes && codes.length > 0)
    return (
      <div className="border-2 p-3 grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-3">
        {(codes || [])?.length > 0 ? (
          codes?.map((code) => <CodeItem key={code._id} data={code} />)
        ) : (
          <p className="text-center font-mono text-slate-600">Code not found</p>
        )}
      </div>
    );

  return <p className="text-center font-mono text-slate-600">Code not found</p>;
};
export default AllCodes;
