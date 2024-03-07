import NoResults from "@/components/ui/no-results";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

import { ArticleResponse } from "@/types/types";
import { fetchDataAndCache } from "@/app/utils/fetchData";
import ArticleItem from "@/components/article/article-item";

export default function RecentNews() {
  const { data: session } = useSession();
  const [articles, setArticles] = useState<ArticleResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const data = await fetchDataAndCache<ArticleResponse>(
          `https://newsapi.org/v2/top-headlines?pageSize=5&country=us&category=technology&sortBy=popularity&apiKey=${process.env.NEXT_PUBLIC_NEWS_API_KEY}`,
          "recentArticles",
          3600
        );
        setArticles(data);
      } catch (error) {
        setError(
          `Error fetching data. Please try again later. Error description: ${error}`
        );
      }
    };

    if (session?.AccessToken) {
      fetchArticles();
    }
  }, [session?.AccessToken]);

  if (error) {
    console.log(error);
  }

  return (
    <div>
      {articles?.totalResults === 0 ? (
        <NoResults />
      ) : (
        <div className="space-y-8 max-h-[13rem] 2xl:max-h-[20rem] overflow-y-auto">
          
            {articles?.articles.map((item, index) => (
              <ArticleItem
                key={index}
                ArticleTitle={item.title}
                ArticleDescription={item.description}
                ArticleUrl={item.url}
                ArticleUrlImage={item.urlToImage}
                ArticleAuthor={item.author}
                ArticlePublishedAt={item.publishedAt}
              />
            ))}
          
        </div>
      )}
    </div>
  );
}
