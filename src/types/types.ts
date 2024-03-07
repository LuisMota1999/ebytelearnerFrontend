interface Article {
    source: {
        id: string;
        name: string;
    };
    author: string;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
    content: string;
}

export interface ArticleResponse {
    status: string;
    totalResults: number;
    articles: Article[];
}


export interface RecentNews {
  CourseName: string;
  CourseIcon: any;
  CourseDescription: string;
  CourseTeacher: string;
  CourseEstimatedTime: number;
  CourseChapter: number;
  ClassName?: string;
}