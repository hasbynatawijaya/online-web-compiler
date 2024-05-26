import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import CodeEditor from "@/components/CodeEditor";
import HelperHeader from "@/components/HelperHeader";
import CodeRenderer from "@/components/CodeRenderer";

import { handleError } from "@/utils/handleError";

import { setFullCode } from "@/redux/slices/compilerSlice";

const Compiler = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const loadCode = async () => {
    try {
      const response = await axios.get("http://localhost:4000/compiler/load", {
        params: {
          id,
        },
      });
      console.log(response.data.fullCode);
      dispatch(setFullCode(response.data.fullCode));
    } catch (error) {
      handleError(error);
    }
  };

  useEffect(() => {
    if (id) {
      loadCode();
    }
  }, [id]);

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
