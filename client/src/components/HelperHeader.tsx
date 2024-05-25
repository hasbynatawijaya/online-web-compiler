import { useDispatch, useSelector } from "react-redux";
import { Save, Share2 } from "lucide-react";
import axios from "axios";

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
  CompilerInitialState,
  setCurrentLanguage,
} from "@/redux/slices/compilerSlice";
import { RootState } from "@/redux/slices/store";
import { handleError } from "@/utils/handleError";

const HelperHeader = () => {
  const dispatch = useDispatch();
  const currentLanguage = useSelector(
    (state: RootState) => state.compilerSlice.currentLanguage
  );
  const fullCode = useSelector(
    (state: RootState) => state.compilerSlice.fullCode
  );

  const handleSaveCode = async () => {
    try {
      const response = await axios.post("http://localhost:4000/compiler/save", {
        fullCode,
      });
      console.log(response.data);
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <div className="__helper-header h-[50px] bg-black text-white p-2 flex justify-between items-center gap-1">
      <div className="__btn_container flex gap-1">
        <Button onClick={handleSaveCode} variant="success" container="withIcon">
          <Save size={16} />
          Save
        </Button>
        <Button variant="secondary" container="withIcon">
          <Share2 size={16} />
          Share
        </Button>
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
