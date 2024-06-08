import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import CodeEditor from "@/components/CodeEditor";
import HelperHeader from "@/components/HelperHeader";
import CodeRenderer from "@/components/CodeRenderer";
import Loader from "@/components/Loader";
import { handleError } from "@/utils/handleError";
import { setFullCode } from "@/redux/slices/compilerSlice";
import { useLazyLoadCodeQuery } from "@/redux/slices/api";

const Compiler = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [trigger, { isLoading }] = useLazyLoadCodeQuery();

  const loadCode = async () => {
    try {
      const response = await trigger({ id: id as string }).unwrap();
      if (response.fullCode) dispatch(setFullCode(response.fullCode));
    } catch (error) {
      handleError(error);
    }
  };

  useEffect(() => {
    if (id) {
      loadCode();
    }
  }, [id]);

  if (isLoading)
    return (
      <div className="w-full h-[calc(100dvh-60px)] flex items-center justify-center">
        <Loader />
      </div>
    );

  return (
    <ResizablePanelGroup direction="horizontal" className="border">
      <ResizablePanel
        className="h-[calc(100dvh-60px)] min-w-[350px]"
        defaultSize={50}
      >
        <HelperHeader />
        <CodeEditor />
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel
        className="h-[calc(100dvh-60px)] min-w-[350px]"
        defaultSize={50}
      >
        <CodeRenderer />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};
export default Compiler;
