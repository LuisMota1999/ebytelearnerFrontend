import Image from "next/image";
import React from "react";
import notFound from "../../../public/notfound.svg";
import internalErrorCharacter from "../../../public/assets/illustrations/characters/character_8.png";
import { Button } from "../ui/button";
export const Error404 = () => {
  return (
    <div className="flex flex-col justify-center items-center h-full text-center m-auto">
      <h1 className="text-4xl font-bold">Sorry, Page Not Found!</h1>
      <p className="text-slate-500 text mb-16">
        Sorry, we couldn&apos;t find the page you&apos;re looking for. Perhaps
        you&apos;ve mistyped the URL? Be sure to check your spelling.
      </p>

      <div className="flex justify-center mb-8">
        <Image
          alt="notFound"
          src={notFound}
          className="self-center"
        />
        <Image
          height={65}
          width={65}
          alt="teacherPerson"
          src={internalErrorCharacter}
          className="self-center inset-0 w-auto h-auto object-cover ml-[-90px]"
          loading="lazy"
        />
      </div>
      <Button variant={"default"}>Go Back</Button>
    </div>
  );
};

export default Error404;
