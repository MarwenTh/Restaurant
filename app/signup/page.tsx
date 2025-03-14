import { Login } from "@/components/auth/login";
import Image from "next/image";
import React from "react";
import FoodPNG from "@/public/assets/food.png";
import { Signup } from "@/components/auth/singup";

type Props = {};

const page = (props: Props) => {
  return (
    <div className=" h-screen flex items-center justify-center relative bg-[#151410]/90 ">
      <div className=" absolute grid grid-cols-3 gap-4 top-0 left-0 right-0 p-4 -z-10 blur-sm bg-[#151410]/97">
        <Image src={FoodPNG} alt="food" className="  " />
        <Image src={FoodPNG} alt="food" className="  " />
        <Image src={FoodPNG} alt="food" className="  " />
        <Image src={FoodPNG} alt="food" className="  " />
        <Image src={FoodPNG} alt="food" className="  " />
        <Image src={FoodPNG} alt="food" className="  " />
      </div>
      <Signup />
    </div>
  );
};

export default page;
