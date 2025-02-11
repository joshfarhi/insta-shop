import { cn } from "@/lib/utils";
import { FiPackage } from "react-icons/fi";

interface CardDemoProps {
  itemName: string;
  fileType: string;
  fileSize: number;
  index: number;
  price?: string;
  onClick: () => void;
}

export function CardDemo({ itemName, fileType, fileSize, index, price = "N/A", onClick }: CardDemoProps) {
  return (
    <div className="max-w-xs w-full group/card" onClick={onClick}>
      <div
        className={cn(
          "cursor-pointer overflow-hidden relative card h-96 rounded-md shadow-xl max-w-sm mx-auto backgroundImage flex flex-col justify-between p-4",
          "bg-[#121212]"
        )}
      >
        <div className="absolute w-full h-full top-0 left-0 transition duration-300 group-hover/card:bg-black opacity-60 flex items-center justify-center">
          <FiPackage className="text-gray-400 text-6xl" />
        </div>
        <div className="flex flex-col items-start space-y-2 z-10">
          <p className="font-normal text-base text-gray-50 relative z-10">
            Category Product #{index + 1}
          </p>
          <p className="text-sm text-gray-400">Quantity: 0</p>
          <p className="text-sm text-gray-400">Price: {price}</p>
          <p className="text-xs text-gray-500 mt-2">File Name: {itemName}</p>
        </div>
      </div>
    </div>
  );
}