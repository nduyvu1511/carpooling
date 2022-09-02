import { RideInfoIcon } from "@/assets"

interface SnackbarProps {
  type?: "warning" | "alert" | "success" | "info"
  title: string
  className?: string
}

export const Snackbar = ({ className = "", title, type = "info" }: SnackbarProps) => {
  return (
    <div className={`flex p-8 bg-blue-05 rounded-[8px] ${className}`}>
      <RideInfoIcon className=" text-[#2E41B6] opacity-80 mr-12" />
      <p className="flex-1 text-12 font-normal text-primary">{title}</p>
    </div>
  )
}
