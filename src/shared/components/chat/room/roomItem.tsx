import { CheckIcon2 } from "@/assets"
import { RoomRes } from "@/models"
import moment from "moment"
import Image from "next/image"

interface RoomItemProps {
  data: RoomRes
  onSelectRoom?: (data: RoomRes) => void
  isActive?: boolean
}

export const RoomItem = ({ data, onSelectRoom, isActive }: RoomItemProps) => {
  return (
    <div
      onClick={() => onSelectRoom?.(data)}
      className={`p-16 flex items-center cursor-pointer rounded-[8px] ${
        isActive ? "bg-blue-10" : "hover:bg-gray-05"
      }`}
    >
      <div className="w-[46px] h-[46px] rounded-[50%] relative mr-12">
        <Image
          src={data.room_avatar?.thumbnail_url || ""}
          alt=""
          className="rounded-[50%]"
          layout="fill"
          objectFit="cover"
        />
        <span className="absolute right-0 bottom-[4px] w-[8px] h-[8px] bg-[#22DF64] shadow-shadow-1 rounded-[50%]"></span>
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold text-primary flex-1 line-clamp-1 mr-12">
            {data.room_name}
          </p>
          {data?.last_message?.created_at ? (
            <p className="text-xs text-gray-color-5">
              {moment(data?.last_message?.created_at).fromNow()}
            </p>
          ) : null}
        </div>
        {data?.last_message ? (
          <div className="flex items-center">
            <div className="flex-1">
              <p className="text-10 text-gray-color-6 font-medium leading-[18px]">
                {data.last_message?.author?.author_name}
              </p>
              <p className={`text-xs line-clamp-1 ${true ? "text-gray-color-7" : "text-primary"}`}>
                {data?.last_message?.message_text}
              </p>
            </div>
            <div className="">
              <CheckIcon2 className="text-gray-color-5" />
              {/* <Badge className="text-10" count={92} size={18} /> */}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  )
}
