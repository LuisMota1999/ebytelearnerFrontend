"use client";
import React, { useState, useEffect, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import CoursesList from "@/components/course-List";

interface Course {
  Id: string;
  CourseName: string;
  CourseDescription: string;
  CoursePrice: number;
  Modules: Module[];
}

interface Module {
  Id: string;
  ModuleName: string;
}

export default function HomePage() {
  const { data: session } = useSession();
  return (
    <div className="p-4">
      <div className="grid gap-4 grid-cols-6 pb-4">
        <div className="col-span-6 lg:col-span-4">
          <div className="flex flex-col h-full">
            <Card className="bg-[#d7f4e7] flex flex-col items-center text-center sm:text-left md:flex-row md:items-start flex-grow">
              <div className="md:w-1/2">
                {/* Content for the larger column */}
                <CardHeader className="flex flex-col items-center sm:items-start space-y-1.5 p-6">
                  <CardTitle>
                    Welcome back 👋 <p>{session?.User.Username}</p>
                  </CardTitle>
                  <p className="text-sm text-gray-500 pt-3 pb-6">
                    If you are going to use a passage of Lorem Ipsum, you need
                    to be sure there isn't anything.
                  </p>
                  <Button variant="green" size="md">
                    <b>Go Now</b>
                  </Button>
                </CardHeader>
              </div>
              <div className="md:w-1/2 flex justify-center items-center md:pt-6">
                {/* Content for the larger column */}
                <CardContent className="flex justify-center">
                  <Image
                    height={250}
                    width={250}
                    alt="teacher"
                    src="/teacherDashboard.svg"
                    className="self-center"
                  />
                  <Image
                    height={100}
                    width={100}
                    alt="teacherPerson"
                    src="/character_3.png"
                    className="self-center  inset-0 w-1/2 h-1/2 object-cover ml-[-60px]"
                  />
                </CardContent>
              </div>
            </Card>
          </div>
        </div>
        <div className="col-span-6 lg:col-span-2">
          <div className="flex flex-col h-full">
            <Card className="bg-[#d7f4e7] flex flex-col items-center text-center sm:text-left md:flex-row md:items-start flex-grow">
              {/* Content for the larger column */}
              <CardHeader className="flex flex-col items-center sm:items-start space-y-1.5 p-6">
                <CardTitle>
                  Welcome back 👋 <p>{session?.User.Username}</p>
                </CardTitle>
                <p className="text-sm text-gray-500 pt-3 pb-6">
                  If you are going to use a passage of Lorem Ipsum, you need to
                  be sure there isn't anything.
                </p>
                <Button variant="green" size="md">
                  <b>Go Now</b>
                </Button>
              </CardHeader>
              <CardContent className="flex justify-center"></CardContent>
            </Card>
          </div>
        </div>
      </div>
      <div className="grid gap-4 grid-cols-6 pb-4">
        <div className="col-span-6 lg:col-span-2">
          <div className="flex flex-col h-full">
            <Card className="bg-[#d7f4e7] flex flex-col items-center text-center sm:text-left md:flex-row md:items-start flex-grow">
              {/* Content for the larger column */}
              <CardHeader className="flex flex-col items-center sm:items-start space-y-1.5 p-6">
                <CardTitle>
                  Welcome back 👋 <p>{session?.User.Username}</p>
                </CardTitle>
                <p className="text-sm text-gray-500 pt-3 pb-6">
                  If you are going to use a passage of Lorem Ipsum, you need to
                  be sure there isn't anything.
                </p>
                <Button variant="green" size="md">
                  <b>Go Now</b>
                </Button>
              </CardHeader>
              <CardContent className="flex justify-center"></CardContent>
            </Card>
          </div>
        </div>
        <div className="col-span-6 lg:col-span-2">
          <div className="flex flex-col h-full">
            <Card className="bg-[#d7f4e7] flex flex-col items-center text-center sm:text-left md:flex-row md:items-start flex-grow">
              {/* Content for the larger column */}
              <CardHeader className="flex flex-col items-center sm:items-start space-y-1.5 p-6">
                <CardTitle>
                  Welcome back 👋 <p>{session?.User.Username}</p>
                </CardTitle>
                <p className="text-sm text-gray-500 pt-3 pb-6">
                  If you are going to use a passage of Lorem Ipsum, you need to
                  be sure there isn't anything.
                </p>
                <Button variant="green" size="md">
                  <b>Go Now</b>
                </Button>
              </CardHeader>
              <CardContent className="flex justify-center"></CardContent>
            </Card>
          </div>
        </div>
        <div className="col-span-6 lg:col-span-2">
          <div className="flex flex-col h-full">
            <Card className="bg-[#d7f4e7] flex flex-col items-center text-center sm:text-left md:flex-row md:items-start flex-grow">
              {/* Content for the larger column */}
              <CardHeader className="flex flex-col items-center sm:items-start space-y-1.5 p-6">
                <CardTitle>
                  Welcome back 👋 <p>{session?.User.Username}</p>
                </CardTitle>
                <p className="text-sm text-gray-500 pt-3 pb-6">
                  If you are going to use a passage of Lorem Ipsum, you need to
                  be sure there isn't anything.
                </p>
                <Button variant="green" size="md">
                  <b>Go Now</b>
                </Button>
              </CardHeader>
              <CardContent className="flex justify-center"></CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
