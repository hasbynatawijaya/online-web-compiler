import { useDispatch, useSelector } from "react-redux";
import { Save, Share2, Loader2, Code, Copy } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

import { Button } from "@/components//ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";

import {
  CompilerInitialState,
  setCurrentLanguage,
} from "@/redux/slices/compilerSlice";
import { RootState } from "@/redux/slices/store";
import { handleError } from "@/utils/handleError";

const HelperHeader = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { toast } = useToast();
  const { id } = useParams();
  const currentLanguage = useSelector(
    (state: RootState) => state.compilerSlice.currentLanguage
  );
  const fullCode = useSelector(
    (state: RootState) => state.compilerSlice.fullCode
  );

  const [saveLoading, setSaveLoading] = useState(false);

  const handleSaveCode = async () => {
    try {
      setSaveLoading(true);
      const response = await axios.post("http://localhost:4000/compiler/save", {
        fullCode,
      });
      navigate(`/compiler/${response.data.id}`, { replace: true });
    } catch (error) {
      handleError(error);
    } finally {
      setSaveLoading(false);
    }
  };

  const handleCopyURL = () => {
    window.navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link copied",
      variant: "default",
    });
  };

  return (
    <div className="__helper-header h-[50px] bg-black text-white p-2 flex justify-between items-center gap-1">
      <div className="__btn_container flex gap-1">
        <Button
          disabled={saveLoading}
          onClick={handleSaveCode}
          variant="success"
          container="withIcon"
        >
          {saveLoading ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <Save size={16} />
          )}
          Save
        </Button>
        {id ? (
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="secondary" container="withIcon">
                <Share2 size={16} />
                Share
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="flex gap-1 justify-center items-center">
                  <Code />
                  Share your code?
                </DialogTitle>
                <DialogDescription className="flex flex-col gap-2">
                  <div className="__url flex gap-1">
                    <input
                      type="text"
                      className="w-full px-2 py-2 rounded bg-slate-800 text-slate-400"
                      disabled
                      value={window.location.href}
                    />
                    <Button variant="outline" onClick={handleCopyURL}>
                      <Copy size={14} />
                    </Button>
                  </div>
                  <p className="text-center">share this URL with others</p>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        ) : (
          <></>
        )}
      </div>
      <div className="__tab_switcher flex justify-center items-center gap-1">
        <small>Current Language:</small>
        <Select
          defaultValue={currentLanguage}
          onValueChange={(value) =>
            dispatch(
              setCurrentLanguage(
                value as CompilerInitialState["currentLanguage"]
              )
            )
          }
        >
          <SelectTrigger className="w-[180px] bg-gray-800 outline-none focus:ring-0">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="html">HTML</SelectItem>
              <SelectItem value="css">CSS</SelectItem>
              <SelectItem value="javascript">Javascript</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
export default HelperHeader;
