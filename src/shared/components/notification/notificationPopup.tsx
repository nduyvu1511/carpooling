import { SettingIcon } from "@/assets"
import React from "react"
import { Notification } from "./notification"

interface NotificationPopupProps {
  className?: string
}

export const NotificationPopup = ({ className = "" }: NotificationPopupProps) => {
  return (
    <div
      className={`w-[400px] z-[1000] h-[60vh] max-h-[620px] bg-white-color shadow-shadow-base rounded-[16px] absolute ${className}`}
    >
      <div className="flex items-center h-[54px] border-b border-solid border-border-color">
        <span className="w-[32px]"></span>
        <p className="text-base font-semibold flex-1">Thông báo</p>
        <span className="w-[32px]">
          <SettingIcon />
        </span>
      </div>
      <Notification />
    </div>
  )
}
