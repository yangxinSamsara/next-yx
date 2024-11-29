import { Button } from "@/components/ui/button";
import { PopoverDemo } from "@/components/shadcn/popover";
import { SelectDemo } from "@/components/shadcn/select";
import { DropdownMenuDemo } from "@/components/shadcn/dropdown";

export default function ShadcnPage() {
  return (
    <div className="flex">
      <div className="flex space-y-2 flex-col w-50 mx-auto">
        <Button variant="outline">Shadcn Ui Button</Button>
        <PopoverDemo />
        <SelectDemo />
        <DropdownMenuDemo />
      </div>
    </div>
  );
}
