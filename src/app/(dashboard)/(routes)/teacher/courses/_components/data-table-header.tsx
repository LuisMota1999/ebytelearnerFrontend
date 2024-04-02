import { Button } from "@/components/ui/button"; // Import your button component
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"; // Import your dropdown components
import {
  ArrowDown,
  ArrowUp,
  EyeOffIcon,
  FilterIcon,
  MoreVertical,
} from "lucide-react";
import { useState } from "react";

interface HeaderWithDropdownProps {
  columnName: string;
  onClick: (state: boolean) => void; // Void function property
}

const HeaderWithDropdown: React.FC<HeaderWithDropdownProps> = ({
  columnName,
  onClick,
}) => {
  const [isSortedAsc, setIsSortedAsc] = useState(false); // State to track ascending sort

  const handleButtonClick = () => {
    onClick(isSortedAsc); // Call the onClick handler
    setIsSortedAsc((prev) => !prev); // Toggle the ascending sort state
  };

  return (
    <div className="relative">
      <div className="flex items-center">
        <Button variant="ghost" onClick={handleButtonClick}>
          {columnName}
          {isSortedAsc ? (
            <ArrowUp className="h-4 w-4 ml-2" />
          ) : (
            <ArrowDown className="h-4 w-4 ml-2" />
          )}
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-4 w-8 p-0 ml-2">
              <span className="sr-only">Open menu</span>
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="ml-2">
            <DropdownMenuItem onClick={() => onClick(false)}>
              <ArrowUp className="h-4 w-4 mr-2" />
              Sort By Asc
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onClick(true)}>
              <ArrowDown className="h-4 w-4 mr-2" />
              Sort By Desc
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <FilterIcon className="h-4 w-4 mr-2" />
              Filter
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <EyeOffIcon className="h-4 w-4 mr-2" />
              Hide
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default HeaderWithDropdown;
