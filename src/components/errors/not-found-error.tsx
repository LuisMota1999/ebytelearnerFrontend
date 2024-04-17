import Image from "next/image";
import React from "react";
import notFound from "../../../public/notfound.svg";
import internalErrorCharacter from "../../../public/assets/illustrations/characters/character_6.png";

export const Error404 = () => {
  return (
    <div className="flex flex-col justify-center items-center h-full text-center m-auto">
      <h1 className="text-4xl font-bold">Sorry, Page Not Found!</h1>
      <p className="text-slate-400 text ">
        Sorry, we couldn&apos;t find the page you&apos;re looking for.
      </p>
      <p className="text-slate-400 text mb-16">
        Perhaps you&apos;ve mistyped the URL? Be sure to check your spelling.
      </p>

      <div className="flex justify-center mb-8">
        <Image alt="notFound" src={notFound} className="self-center mr-auto" />
        <Image
          alt="teacherPerson"
          src={internalErrorCharacter}
          height={65}
          width={65}
          className="self-center inset-0 w-auto h-auto object-cover ml-[-225px] mr-auto -z-10"
          loading="lazy"
        />
      </div>
    </div>
  );
};

export default Error404;
