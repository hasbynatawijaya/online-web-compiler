import { FC } from "react";
import { Code2, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import CodeRenderer from "@/components/CodeRenderer";
import { ICode } from "@/types/userTypes";
import { useDeleteCodeMutation } from "@/redux/slices/api";
import { handleError } from "@/utils/handleError";

interface Props {
  data: ICode;
  showDeleteButton?: boolean;
}

const CodeItem: FC<Props> = ({ data, showDeleteButton = false }) => {
  const [deleteCode, { isLoading }] = useDeleteCodeMutation();

  const handleDeleteCode = async () => {
    try {
      await deleteCode({ _id: data._id as string }).unwrap();
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <div className="border-2 p-3 rounded cursor-pointer bg-slate-900 flex flex-col justify-center items-center gap-2">
      <div className="max-h-80 overflow-auto">
        {data?.fullCode ? <CodeRenderer fullCode={data.fullCode} /> : <></>}
      </div>
      <div className="flex justify-center items-center gap-3">
        <Code2 />
        <p className="font-mono font-bold text-lg">{data.title}</p>
      </div>
      <Separator />
      <div className="flex items-center gap-3">
        <Link target="_blank" to={`/compiler/${data._id}`}>
          <Button variant="secondary">View code</Button>
        </Link>
        {showDeleteButton ? (
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="destructive" container="withIcon">
                <Trash2 size={16} />
                Delete
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  Are you sure want to delete this code?
                </DialogTitle>
              </DialogHeader>
              <DialogFooter>
                <Button
                  variant="destructive"
                  isLoading={isLoading}
                  onClick={handleDeleteCode}
                >
                  Delete
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};
export default CodeItem;
