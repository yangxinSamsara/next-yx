"use client";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { useState } from "react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { XCircleIcon } from "@heroicons/react/20/solid";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Session } from "next-auth";
import Link from "next/link";
export default function Home({ session }: { session: Session | null }) {
  console.log("🚀 ~ Home ~ session:", session);
  const [open, setOpen] = useState(false);
  const imgs = [
    "https://oss-xpc6.xpccdn.com/default/jF6z6YipFGtZFCujHyP0Vcx0cH8CEUuBUEgbdfmJ.jpg",
    "https://oss-xpc6.xpccdn.com/default/3mrWe8vRJ5lc8VPEvGJUbAe7Hk5izYMfb20Lhm1A.jpg",
    "https://oss-xpc6.xpccdn.com/default/WGQM1V825SLZUzqXBvODsJIv8uMucVAAHVe1IPX8.png",
  ];

  const getApiData = async () => {
    const res = await fetch("/api/mock");
    console.log("🚀 ~ getApiData ~ data:", await res.json());
  };
  return (
    <>
      <h3 className="font-alimama">Wellcome to HomePage(阿里妈妈字体)</h3>
      <pre>{session?.user ? JSON.stringify(session?.user, null, 2) : "no session"}</pre>
      {session?.user ? null : (
        <Button>
          <Link href={"/login"}>go to login</Link>
        </Button>
      )}
      <Separator className="my-4" />
      <Button className="my-4" onClick={getApiData}>
        Get Api data
      </Button>
      <Button onClick={() => setOpen(true)}>Click me</Button>

      <div className="w-[320px] mt-5 p-2 border border-gray-200 rounded-lg">
        <Carousel className="w-full self-start">
          <CarouselContent>
            {imgs.map((img, index) => (
              <CarouselItem key={index} className="a">
                <Card>
                  <CardContent className="flex items-center justify-center p-0">
                    <AspectRatio ratio={16 / 9}>
                      <Image
                        className="absolute w-full h-full object-cover rounded-lg overflow-hidden"
                        src={img}
                        alt="First Image"
                        layout="fill"
                        objectFit="cover"
                      />
                    </AspectRatio>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-4" />
          <CarouselNext className="right-4" />
        </Carousel>
      </div>

      <div
        className={cn(
          "bg-white p-2 shadow-[0px_2px_8px_0px_rgba(28,28,30,0.08),0px_12px_24px_0px_rgba(28,28,30,0.08)] rounded-xl opacity-0 duration-300 pointer-events-none fixed top-40 left-40 -translate-x-full transition-all",
          { "translate-x-0 opacity-100 pointer-events-auto": open }
        )}
      >
        <div className="overflow-hidden rounded-lg">
          <div className="relative w-80 h-[180px]">
            <div className="absolute inset-0 rounded-lg overflow-hidden">
              <AspectRatio ratio={16 / 9}>
                <Image
                  className="absolute w-full h-full object-cover"
                  src={imgs[0]}
                  alt="First Image"
                  layout="fill"
                  objectFit="cover"
                />
              </AspectRatio>
            </div>
          </div>
        </div>
        <button className="absolute top-3 right-3" onClick={() => setOpen(false)}>
          <XCircleIcon className="w-5 h-5 fill-white" />
        </button>
      </div>
    </>
  );
}
