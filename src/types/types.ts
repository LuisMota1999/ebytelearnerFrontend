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

export type Domain = string;

export interface NextConfig {
  images: {
    domains: Domain[];
  };
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


export interface Course {
  Id: string;
  CourseName: string;
  CourseDescription: string;
  CoursePrice: number;
}

export interface Country {
  name: string;
  flag: string;
  iso2: string;
  iso3: string;
}