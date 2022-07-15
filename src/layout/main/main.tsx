import { AuthHeader } from "@/components"
import { LayoutProps } from "@/models"
import React from "react"
import { App } from "./app"

const MainLayout = ({ children }: LayoutProps) => {
  return (
    <App>
      <AuthHeader />
      {children}
    </App>
  )
}

export { MainLayout }
