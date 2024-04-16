import { cn } from "@/lib/utils";
import { FaUserPen } from "react-icons/fa6";
import { MdArticle } from "react-icons/md";
import moment from "moment";

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
          "h-14 w-14 rounded-md flex items-center justify-center lg:hidden 2xl:flex bg-slate-300",
          ClassName
        )}
      >
        {ArticleUrlImage !== null ? (
          <img
            src={ArticleUrlImage}
            alt={ArticleTitle}
            width={100}
            height={100}
            className="h-full rounded-md"
            loading="lazy"
          />
        ) : (
          <span className="text-white">
            <MdArticle />
          </span>
        )}
      </div>
      <div className="ml-4 space-y-1 w-[80%]">
        <div className="flex flex-row justify-between">
          <p className="w-[78%] text-sm font-medium leading-none line-clamp-1 hover:underline cursor-pointer">
            <a
              target="_blank"
              href={ArticleUrl}
              rel="noopener_title noreferrer_title"
            >
              {ArticleTitle}
            </a>
          </p>
          <p className="text-xs/[16px] text-slate-600 leading-none">
            {moment(ArticlePublishedAt).format("DD MMM, YYYY")}
          </p>
        </div>
        <div className="flex flex-row">
          <FaUserPen size={13} className="text-muted-foreground"/> 
          <p className="text-xxs line-clamp-3">
            &nbsp;Published by <span className="font-semibold">{ArticleAuthor}</span>
          </p>
        </div>

        <p className="text-xs text-muted-foreground line-clamp-3">
          {ArticleDescription}
        </p>
      </div>
    </div>
  );
};

export default ArticleItem;
