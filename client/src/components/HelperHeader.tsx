import { useDispatch, useSelector } from "react-redux";
import { Save, Share2, Code, Copy, Download } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

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

import {
  ICompilerInitialState,
  setCurrentLanguage,
} from "@/redux/slices/compilerSlice";
import { RootState } from "@/redux/slices/store";
import { useSaveCodeMutation } from "@/redux/slices/api";
import { handleError } from "@/utils/handleError";

const HelperHeader = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const currentLanguage = useSelector(
    (state: RootState) => state.compilerSlice.currentLanguage
  );
  const fullCode = useSelector(
    (state: RootState) => state.compilerSlice.fullCode
  );
  const [saveCode, { isLoading }] = useSaveCodeMutation();

  const handleSaveCode = async () => {
    try {
      const response = await saveCode(fullCode).unwrap();
      navigate(`/compiler/${response.url}`, { replace: true });
    } catch (error) {
      handleError(error);
    } finally {
    }
  };

  const handleDownloadCode = () => {
    const htmlCode = new Blob([fullCode.html], { type: "text/html" });
    const cssCode = new Blob([fullCode.css], { type: "text/css" });
    const javascriptCode = new Blob([fullCode.javascript], {
      type: "text/javascript",
    });

    const htmlLink = document.createElement("a");
    const cssLink = document.createElement("a");
    const javascriptLink = document.createElement("a");

    htmlLink.href = URL.createObjectURL(htmlCode);
    htmlLink.download = "index.html";
    document.body.appendChild(htmlLink);

    cssLink.href = URL.createObjectURL(cssCode);
    cssLink.download = "style.css";
    document.body.appendChild(cssLink);

    javascriptLink.href = URL.createObjectURL(javascriptCode);
    javascriptLink.download = "index.js";
    document.body.appendChild(javascriptLink);

    if (fullCode.html) htmlLink.click();
    if (fullCode.css) cssLink.click();
    if (fullCode.javascript) javascriptLink.click();

    document.body.removeChild(htmlLink);
    document.body.removeChild(cssLink);
    document.body.removeChild(javascriptLink);

    toast.success("Code downloaded successfully");
  };

  const handleCopyURL = () => {
    window.navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied");
  };

  return (
    <div className="__helper-header h-[50px] bg-black text-white p-2 flex justify-between items-center gap-1">
      <div className="__btn_container flex gap-1">
        <Button
          disabled={isLoading}
          isLoading={isLoading}
          onClick={handleSaveCode}
          variant="success"
          container="withIcon"
        >
          <Save size={16} />
          Save
        </Button>
        <Button onClick={handleDownloadCode} size="icon" variant="blue">
          <Download size={16} />
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
                value as ICompilerInitialState["currentLanguage"]
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
