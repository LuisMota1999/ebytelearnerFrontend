import Image from "next/image";

export const Logo = () => {
  return (
    <>
      <Image height={75} width={75} alt="logo" src="/icons8-school-80.png" loading="lazy" />
      <div className="text-left font-bold">
        <span className="text-[#00A76F]">ebyte</span> Learner
      </div>
    </>
  );
};
