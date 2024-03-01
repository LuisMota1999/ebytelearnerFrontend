"use client";
import React, { useState, useEffect, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

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
                    Welcome back 👋 <p className="text-sm">{session?.User.Email}</p>
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
            <Card className="bg-[#d7f4e7] flex flex-col items-center text-center sm:text-left md:flex-row md:items-start flex-grow shadow-sm">
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
      <div className="pb-4 grid gap-4 grid-cols-1 sm:grid-cols-3">
        <Card className="shadow-sm bg-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$45,231.89</div>
            <p className="text-xs text-muted-foreground">
              +20.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Subscriptions</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+2350</div>
            <p className="text-xs text-muted-foreground">
              +180.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Now</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+573</div>
            <p className="text-xs text-muted-foreground">
              +201 since last hour
            </p>
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
