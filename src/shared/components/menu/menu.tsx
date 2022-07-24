import { OptionModel } from "@/models"
import React, { ReactNode, useState } from "react"
import { MenuItem } from "./menuItem"

interface MenuProps {
  labelNode: ReactNode
  onClick?: Function
  children: ReactNode
  list: OptionModel[]
}

export const Menu = ({ labelNode, onClick, children, list }: MenuProps) => {
  const [show, setShow] = useState<boolean>(false)

  return (
    <div onClick={() => setShow(!show)} className="relative">
      {labelNode}
      <div className="absolute-horizontal block-element p-[8px] border border-solid border-border-color">
        {/* {list.map(({ label, value }) => (
          <li></li>
        ))} */}
      </div>
    </div>
  )
}
