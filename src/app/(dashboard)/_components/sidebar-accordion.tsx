import { cn } from "@/lib/utils";
import React, { useState } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { LucideIcon } from "lucide-react";
import ButtonSidebarComponent from "./sidebar-button";
import { useRouter } from "next/navigation";

interface AccordionComponentProps {
  label: string;
  children: { href?: string; label?: string; icon?: LucideIcon }[];
  isActive: boolean;
  Icon?: LucideIcon;
}

const AccordionSidebarComponent: React.FC<AccordionComponentProps> = ({
  label,
  children,
  isActive,
  Icon,
}) => {
  const router = useRouter();
  const [activeChild, setActiveChild] = useState<number | null>(null);

  const onClick = (hrefChildren: string, index: number) => () => {
    // Define onClick as a function that returns a function
    console.log(index);
    router.push(hrefChildren);
    setActiveChild(index == activeChild ? null : index);
  };

  return (
    <Accordion type="single" collapsible>
      <AccordionItem value={label} className="border-b-0">
        <AccordionTrigger
          className={cn(
            "flex items-center gap-x-2 text-slate-500 text-sm font-[500] pl-6 transition-all hover:text-slate-600 hover:bg-slate-300/20",
            isActive &&
              "text-green-800 bg-sky-200/20 hover:bg-sky-200/20 hover:text-green-800"
          )}
        >
          <div className="flex items-center gap-x-2">
            {Icon && (
              <Icon
                size={22}
                className={cn("text-slate-500", isActive && "text-green-800")}
              />
            )}
            {label}
          </div>
        </AccordionTrigger>
        <AccordionContent className="pb-0">
          <div className="flex flex-col ">
            {children.map((child, index) => (
              <ButtonSidebarComponent
                key={index}
                label={child.label || ""}
                onClick={() => onClick(child.href ? child.href : "", index)}
                isActive={index === activeChild}
                Icon={child.icon}
                className="px-2"
              />
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default AccordionSidebarComponent;
