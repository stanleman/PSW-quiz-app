"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  return (
    <main className="px-24 py-10">
      <h1 className="text-[#74e0e5] text-xl">Welcome back.</h1>
      <h1 className="text-[#74e0e5] text-[40px] font-black">Let's play!</h1>

      <p className="mt-5 text-lg text-gray-300">Select a quiz category</p>
      <div className="flex flex-col gap-3">
        <div className="grid grid-cols-3 gap-5 mt-3">
          <GridItem
            title="Music"
            color="text-orange-600 hover:bg-orange-600"
            href="/music"
          >
            🎵
          </GridItem>
          <GridItem
            title="Fruit"
            color="text-green-600 hover:bg-green-600"
            href="/fruit"
          >
            🍊
          </GridItem>
          <GridItem
            title="Animals"
            color="text-blue-600 hover:bg-blue-600"
            href="/animal"
          >
            🐈
          </GridItem>
          <GridItem
            title="Vegetable"
            color="text-yellow-400 hover:bg-yellow-400"
            href="/vegetable"
          >
            🍅
          </GridItem>
          <GridItem
            title="Sports"
            color="text-purple-600 hover:bg-purple-600"
            href="/sport"
          >
            🏈
          </GridItem>
          <GridItem
            title="Cars"
            color="text-red-600 hover:bg-red-600"
            href="/car"
          >
            🚓
          </GridItem>
        </div>
      </div>
    </main>
  );
}

function GridItem({ title, children, color, href }) {
  const router = useRouter();
  return (
    <div
      onClick={(e) => {
        e.preventDefault();
        router.push(href);
      }}
      className={`h-[250px] cursor-pointer gap-2 flex flex-col justify-center items-center rounded-2xl border-2 border-gray-300 bg-[#FFF6EC] ${color} hover:text-white transition duration-200 hover:scale-105`}
    >
      <div className="text-center text-[80px]">{children}</div>
      <h3 className={`text-2xl text-center font-semibold `}>{title}</h3>
    </div>
  );
}
