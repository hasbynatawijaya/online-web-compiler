import { useGetMyCodesQuery } from "@/redux/slices/api";

import CodeItem from "@/components/CodeItem";
import Loader from "@/components/Loader";

const MyCodes = () => {
  const { data: myCodes, isLoading } = useGetMyCodesQuery();

  if (isLoading)
    return (
      <div className="w-full h-[calc(100dvh-60px)] flex items-center justify-center">
        <Loader />
      </div>
    );

  if (myCodes && myCodes.length > 0)
    return (
      <div className="border-2 p-3 grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-3">
        {(myCodes || [])?.length > 0 ? (
          myCodes?.map((myCode) => (
            <CodeItem key={myCode._id} data={myCode} showDeleteButton />
          ))
        ) : (
          <p className="text-center font-mono text-slate-600">
            You don't have any saved codes.
          </p>
        )}
      </div>
    );

  return (
    <p className="text-center font-mono text-slate-600">
      You don't have any saved codes.
    </p>
  );
};
export default MyCodes;
