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
  Id: string
  CourseName: string
  CourseDescription: string
  CoursePrice: number
  CourseImageURL: string
  CourseCategory: CourseCategory
  CourseModules: CourseModule[]
  CourseTeacher: User
  IsPublished: any
  CourseDirectory: string
}

export interface CourseCategory {
  Id: string
  CategoryName: string
}

export interface CourseModule {
  Id: string
  ModuleName: string
  ModuleDescription: string
  IsFree: any
  IsPublished: any
  ModulePDFId: Pdf;
}

export interface Pdf {
  Id: string
  PDFName: string
  PDFNumberPages: number
  PDFContent: string
  PDFLength: number
  PDFPath: string
}

export interface User {
  Id: string
  Username: string
  Email: string
  PhoneNumber: any
  ZipCode: any
  NIF: any
  Docn: any
  Gender: any
  Nationality: any
  Active: boolean
  Birthday: any
}

export interface Country {
  name: string;
  flag: string;
  iso2: string;
  iso3: string;
}