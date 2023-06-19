import type {ReactNode} from "react";

import {Dialog, DialogContent, DialogFooter, DialogTrigger} from "~/components/ui/dialog";
import {Button} from "~/components/ui/button";

const ViewPDFDialog = ({children}: {children: ReactNode}) => {
  return (
    <Dialog>
      <Button asChild variant="outline">
        <DialogTrigger>
          <span className="font-bold">View as PDF</span>
        </DialogTrigger>
      </Button>

      <DialogContent className="h-full">
        {children}
        <DialogFooter>
          <Button asChild variant="outline">
            <DialogTrigger>
              <span className="flex items-center font-bold">Close</span>
            </DialogTrigger>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ViewPDFDialog;
