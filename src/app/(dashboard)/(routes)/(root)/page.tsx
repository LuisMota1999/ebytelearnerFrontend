"use client";
import React, { useState, useEffect, useMemo } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { RecentCourses } from "./_components/recent-courses";
import { badgeVariants } from "@/components/ui/badge";
import Link from "next/link";
import { ImNewspaper } from "react-icons/im";
import { FaRegCalendarAlt } from "react-icons/fa";

export default function HomePage() {
  const { data: session } = useSession();
  return (
    <div className="p-4">
      <div className="grid gap-4 grid-cols-6 pb-4">
        <div className="col-span-6 lg:col-span-4">
          <div className="flex flex-col h-full">
            <Card className="bg-[#d7f4e7] flex flex-col items-center text-center sm:text-left md:flex-row md:items-start flex-grow border-none">
              <div className="md:w-1/2">
                {/* Content for the larger column */}
                <CardHeader className="flex flex-col items-center sm:items-start space-y-1.5 p-6">
                  <CardTitle>
                    Welcome back 👋{" "}
                    <p className="text-sm">{session?.User.Email}</p>
                  </CardTitle>
                  <p className="text-sm text-gray-600 pt-3 pb-6">
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
                    loading="lazy"
                  />
                  <Image
                    height={75}
                    width={75}
                    alt="teacherPerson"
                    src="/character_3.png"
                    className="self-center inset-0 w-auto h-auto object-cover ml-[-60px]"
                    loading="lazy"
                  />
                </CardContent>
              </div>
            </Card>
          </div>
        </div>
        <div className="col-span-6 lg:col-span-2 ">
          <div className="flex flex-col">
            <Card className="shadow-sm bg-slate-100">
              <CardHeader className="flex flex-row justify-between">
                <CardTitle className="text-xl font-bold">
                  Upcoming Session
                </CardTitle>
                <CardDescription className="flex flex-row justify-between">
                  <Link href="/teacher/calendar">
                    <FaRegCalendarAlt
                      size={20}
                      className="mt-[0.1rem] text-gray-600 hover:text-blue-400"
                    />
                  </Link>
                </CardDescription>
              </CardHeader>
              <CardContent className="overflow-y-auto">
                <RecentCourses />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <div className="pb-4 grid gap-4 grid-cols-1 sm:grid-cols-2">
        <Card className="shadow-sm ">
          <CardHeader className="flex flex-row justify-between">
            <CardTitle className="text-xl  font-bold">Recent Courses</CardTitle>
            <CardDescription>
              <Link
                href="/courses"
                className={badgeVariants({
                  variant: "green",
                  className:
                    "border-none hover:bg-[#00A76F] text-gray-800 hover:text-white",
                })}
              >
                View All
              </Link>
            </CardDescription>
          </CardHeader>
          <CardContent className="overflow-y-auto">
            <RecentCourses />
          </CardContent>
        </Card>
        <Card className="shadow-sm ">
          <CardHeader className="flex flex-row items-center justify-between ">
            <CardTitle className="text-xl  font-bold">Breaking News</CardTitle>
            <ImNewspaper size={20} />
          </CardHeader>
          <CardContent>
            <RecentCourses />
          </CardContent>
        </Card>
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
              </CardHeader>
              <CardContent className="flex items-center justify-center">
                <Button variant="green" size="md">
                  <b>Go Now</b>
                </Button>
              </CardContent>
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
