import useSWR from 'swr';
import { useSession } from 'next-auth/react';
import { ArticleResponse } from '@/types/types';
import { fetchDataAndCache } from '@/app/utils/fetchData';
import ArticleItem from '@/components/article/article-item';
import NoResults from '@/components/ui/no-results';

const fetcher = async (url: string) => {
  const data = await fetchDataAndCache<ArticleResponse>(
    url,
    'recentArticles',
    3600
  );
  return data;
};

export default function RecentNews() {
  const { data: session } = useSession();
  const { data: articles, error } = useSWR(
    session?.AccessToken
      ? `https://newsapi.org/v2/top-headlines?pageSize=5&country=us&category=technology&sortBy=popularity&apiKey=${process.env.NEXT_PUBLIC_NEWS_API_KEY}`
      : null,
    fetcher
  );

  if (error) {
    console.error('Error fetching recent news:', error);
    return <div>Error fetching recent news. Please try again later.</div>;
  }

  if (!articles) {
    return (
      <div className="flex justify-center items-center h-48">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div>
      {articles.totalResults === 0 ? (
        <NoResults />
      ) : (
        <div className="space-y-8 max-h-[13rem] 2xl:max-h-[20rem] overflow-y-auto">
          {articles.articles.map((item, index) => (
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
