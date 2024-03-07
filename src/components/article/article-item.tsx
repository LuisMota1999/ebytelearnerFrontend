import { IoIosArrowForward } from "react-icons/io";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { MdArticle } from "react-icons/md";

interface ArticleItemProps {
  ArticleTitle: string;
  ArticleDescription: string;
  ArticleUrl: string;
  ArticleUrlImage: string;
  ArticlePublishedAt?: string;
  ArticleAuthor?: string;
  ClassName?: string;
}

const ArticleItem: React.FC<ArticleItemProps> = ({
  ArticleTitle,
  ArticleDescription,
  ArticleUrl,
  ArticleUrlImage,
  ArticlePublishedAt,
  ArticleAuthor,
  ClassName,
}) => {
  return (
    <div className="flex items-center">
      <div
        className={cn(
          "h-14 w-14 rounded-md flex items-center justify-center md:hidden 2xl:flex bg-slate-300",
          ClassName
        )}
      >
        <span className="text-white"><MdArticle/></span>
      </div>
      <div className="ml-4 space-y-1 w-3/4">
        <p className="text-sm font-medium leading-none line-clamp-1">{ArticleTitle}</p>
        <p className="text-xs md:text-sm text-muted-foreground line-clamp-3">
          {ArticleDescription}
        </p>
      </div>
      <div className="ml-auto mr-4 font-medium ">
        <Link href={ArticleUrl}>
          <IoIosArrowForward />
        </Link>
      </div>
    </div>
  );
};

export default ArticleItem;
