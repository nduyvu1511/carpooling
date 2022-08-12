import { AxiosPromise } from "axios"
import { NextPage } from "next"
import { AppProps } from "next/app"
import { ForwardedRef, ReactChild, ReactElement, ReactNode } from "react"
import { LocationType } from "./location"

export interface HasChildren {
  children: ReactChild
}

export interface LayoutProps {
  children: ReactNode
}

export type NextPageWithLayout = NextPage & {
  Layout?: (props: LayoutProps) => ReactElement
}

export type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export interface PayloadType<T> {
  payload: T
}

export interface UseParams<T, U> {
  params: T
  onSuccess: (params: U) => void
  onError?: Function
  config?: FetcherConfig
}

export interface HasChildren {
  children: ReactChild
}

export interface LayoutProps {
  children: ReactNode
}

export interface PayloadBoolean {
  payload: boolean
}

export interface PayloadString {
  payload: string
}

export interface PayloadNumber {
  payload: number
}

export interface CommonSlice {
  isOpenSearchModal: boolean | undefined
  isScreenLoading: boolean
  isOpenPromotionModal: boolean
  isOpenAlertModal: boolean
  isOpenLocationFormModal: LocationType | undefined
}

export interface OptionModel {
  label: string
  value: string | number
}

export interface NumberSeatOptionModel {
  label: string
  value: number
  number_seat: number
}

export interface UseParams<T, U> {
  params: T
  onSuccess: (params: U) => void
  onError?: Function
}

export type AttachmentRouteType = "common" | "avatar"

export interface SidebarItem {
  path: string
  label: string
  icon: ReactNode
  child?: { path: string; label: string; icon?: ReactNode }[]
}

export type TimeType = "day" | "second" | "hour" | "minute" | "year" | "month" | "week"

export interface ResponseType<T> {
  result: {
    code: 200 | 400 | 401 | 404 | 409
    success: boolean
    message: string
    validate_token: boolean
    data: T
  }
}

export type AuthModalType = "login" | "resetPassword" | "sms" | "register" | "updateProfile"
export type OnForwaredResetForm = ForwardedRef<{ onReset: Function }>

export interface ActivityItem<T> {
  label: string
  value: T
  color: string
}

export interface AccountLayoutProps {
  children: ReactNode
  title?: string
  desc?: string
  showHeaderMobile?: boolean
}

export interface BookingLayoutProps {
  children: ReactNode
  title?: string
  rightNode: ReactNode
  showLoading?: boolean
  topNode?: ReactNode
  stickyRight?: boolean
  onBackBtnClick?: Function
  reverse?: boolean
  className?: string
  showHeaderOnMobile?: boolean
}

declare module "axios" {
  export interface AxiosResponse<T> {
    jsonrpc: string
    id: any
    result: {
      code: 200 | 400 | 401 | 404 | 409
      success: boolean
      message: string
      validate_token: boolean
      data: T
    }
  }
}

export interface ListQuery {
  limit?: number
  offset?: number
}

export type TransitionDirection = "up" | "down" | "right" | "left"

export interface CalcDistanceRes {
  distance: number
  duration: number
}

export interface FetcherConfig {
  showScreenLoading?: boolean
  errorMsg?: string
  successMsg?: string
  showErrorMsg?: boolean
  toggleOverFlow?: boolean
}

export interface UseQueryListRes<T> {
  isValidating: boolean
  hasMore: boolean
  filterList: (fetcher: AxiosPromise, cb?: Function, err?: Function) => void
  fetchMoreItem: (fetcher: AxiosPromise, cb?: Function, err?: Function) => void
  isFetchingMore: boolean
  offset: number
  data: T[] | undefined
  error: any
}

export interface ContactParams {
  name: string
  phone: string
  email?: string
  description?: string
  receive_news?: boolean
}

export type ContactFormKey = keyof ContactParams
