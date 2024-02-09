import Image from "next/image";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";

const font = Poppins({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

export const Logo = () => {
  return (
    <div className="flex flex-col items-center gap-y-4">
      <div className="rounded-full p-1">
        <Image src="/twitch.svg" alt="Logo" width={50} height={50} />
      </div>
      <div className={cn(font.className, "flex flex-col items-center")}>
        <p className="text-xl font-semibold">Twitch</p>
      </div>
    </div>
  );
};
