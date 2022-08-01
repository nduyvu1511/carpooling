import { blankAvatar } from "@/assets"
import { AccountSidebar, HeaderMobile } from "@/components"
import { RootState } from "@/core/store"
import { useAccountNavList } from "@/hooks"
import { AccountLayoutProps } from "@/models"
import { useSelector } from "react-redux"

const AccountLayout = ({ children, desc, title }: AccountLayoutProps) => {
  const { userInfo } = useSelector((state: RootState) => state.userInfo)
  const { accountNavList } = useAccountNavList()

  if (!userInfo) return null
  return (
    <>
      <HeaderMobile className="lg:hidden" title={title || ""} />
      <section className="container pt-[56px] lg:py-24 py-0 px-0 lg:px-24 xl:px-0 flex-1 bg-white-color lg:bg-[transparent]">
        <div className="lg:grid lg:grid-cols-sidebar-grid gap-[24px]">
          <aside className="hidden lg:block block-element p-24 h-fit sticky top-[80px]">
            {userInfo ? (
              <AccountSidebar
                avatar={userInfo?.avatar_url?.image_url || blankAvatar || ""}
                name={userInfo.partner_name}
                phone={userInfo.phone}
                navList={accountNavList}
              />
            ) : null}
          </aside>
          <div className="block-element pt-12 md:pt-24 lg:pt-0 pb-[12px] lg:pb-24">
            <div className="hidden lg:block mx-12 md:mx-[16px] lg:mx-24 py-[12px] md:py-[16px] lg:py-24 mb-12 lg:mb-24 border-b border-solid border-border-color">
              {title ? <h4 className="h4 text-primary">{title}</h4> : null}
              {desc ? <p className="text-base mt-[4px]">{desc}</p> : null}
            </div>
            {children}
          </div>
        </div>
      </section>
    </>
  )
}

export { AccountLayout }

