"use server";

import { revalidateTag } from "next/cache";

export async function getFlagData() {
  try {
    const response = await fetch(
      `https://countriesnow.space/api/v0.1/countries/flag/images`,
      {
        method: "GET",
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
        },
        next: {
          tags: ["flags"],
        },
      }
    );
    if (response.ok) {
      const responseBody = await response.json();

      return responseBody.data;
    } else {
      throw new Error("Failed to fetch data");
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

export async function getCourseChapter(session: any, chapterId: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_NEXT_URL}/Module/${chapterId}`,
      {
        method: "GET",
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.AccessToken}`,
        },
        next: {
          tags: ["module"],
        },
        cache: "no-cache",
      }
    );
    if (response.ok) {
      const responseBody = await response.json();

      return responseBody;
    } else {
      console.log(session?.AccessToken);
      throw new Error("Failed to fetch course data");
    }
  } catch (error) {
    console.error("Error fetching course data:", error);
    throw error;
  }
}

export async function getCourseData(session: any, courseId: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_NEXT_URL}/Course/${courseId}`,
      {
        method: "GET",
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.AccessToken}`,
        },
        next: {
          tags: ["course"],
        },
        cache: "no-cache",
      }
    );
    if (response.ok) {
      const responseBody = await response.json();

      return responseBody;
    } else {
      throw new Error("Failed to fetch course data");
    }
  } catch (error) {
    console.error("Error fetching course data:", error);
    throw error;
  }
}

export async function getTeachersData(session: any) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_NEXT_URL}/User/GetTeachers`,
      {
        method: "GET",
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.AccessToken}`,
        },
        next: {
          tags: ["teachers"],
        },
        cache: "no-cache",
      }
    );

    if (response.ok) {
      const responseBody = await response.json();

      return responseBody;
    } else {
      throw new Error("Failed to fetch teacher list data");
    }
  } catch (error) {
    console.error("Error fetching teacher data:", error);
    throw error;
  }
}

export async function getCategoriesData(session: any) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_NEXT_URL}/Category/All?returnRows=10`,
      {
        method: "GET",
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.AccessToken}`,
        },
        next: {
          tags: ["categories"],
        },
        cache: "no-cache",
      }
    );
    if (response.ok) {
      const responseBody = await response.json();

      return responseBody;
    } else {
      throw new Error("Failed to fetch course data");
    }
  } catch (error) {
    console.error("Error fetching course data:", error);
    throw error;
  }
}

export async function getCoursesData(session: any) {
  try {
    const returnRowsParam = session?.AccessToken ? `?returnRows=${100}` : "";
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_NEXT_URL}/Course/All${returnRowsParam}`,
      {
        method: "GET",
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.AccessToken}`,
        },
        next: {
          tags: ["courses"],
        },
        cache: "no-cache",
      }
    );
    if (response.ok) {
      const responseBody = await response.json();
      return responseBody;
    } else {
      throw new Error("Failed to fetch course data");
    }
  } catch (error) {
    throw error;
  }
}

export async function createCourse(values: any, session: any) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_NEXT_URL}/Course/Create`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.AccessToken}`,
        },
        body: JSON.stringify({
          courseName: values.courseName,
          courseDescription: values.courseDescription,
          coursePrice: values.coursePrice,
        }),
      }
    );

    if (response.ok) {
      const newCourse = await response.json();
      revalidateTag("courses");
      return newCourse;
    } else {
      throw new Error("Failed to create course");
    }
  } catch (error) {
    throw new Error("Failed to create course");
  }
}

export async function publishCourse(isPublished: boolean, courseId: string, session: any) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_NEXT_URL}/Course/Update/${courseId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.AccessToken}`,
        },
        body: JSON.stringify({
          courseIsPublished: isPublished,
        }),
      }
    );
    if (response.ok) {
      revalidateTag("course");
    } else {
      console.log(response);
    }
  } catch (error) {
    console.log(error);
    throw new Error("Failed to create course");
  }
}
