"use client";
import CourseItem from "@/components/course/course-item";
import useSWR from "swr";
import { useEffect, useState } from "react";

interface RecentNews {
  CourseName: string;
  CourseIcon: any;
  CourseDescription: string;
  CourseTeacher: string;
  CourseEstimatedTime: number;
  CourseChapter: number;
  ClassName?: string;
}

export function RecentCourses() {
  const [news, setNews] = useState<RecentNews[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async () => {
      try {
        const response = await fetch(
          `https://newsapi.org/v2/top-headlines?q=technology&country=us&category=technology&sortBy=popularity&apiKey=${process.env.NEWS_API_KEY}`,
          {
            method: "GET",
            headers: {
              Accept: "*/*",
              "Content-Type": "application/json",
            },
          }
        );

        const data = await response.json();

        setNews(data);
      } catch (error) {
        setError(
          `Error fetching data. Please try again later. Error description: ${error}`
        );
      }
    };
  }, []);

  if (error) {
    console.log(error);
  }
  console.log(news);
  return <div className="space-y-8 max-h-[20rem] overflow-y-auto"></div>;
}
