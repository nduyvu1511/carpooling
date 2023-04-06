import { directionBg } from '@/assets'
import { GuideSlide, Seo, Tabs } from '@/components'
import {
  CUSTOMER_BOOKING_STEP,
  CUSTOMER_CONVENIENT_STEP,
  DRIVER_CREATE_CONVENIENT,
  DRIVER_RECEIVE_RIDE
} from '@/helper'
import { StaticLayout } from '@/layout'
import { useRouter } from 'next/router'
import { useMemo, useState } from 'react'

const Guide = () => {
  const router = useRouter()
  const [tabIndex, setTabIndex] = useState<number>(0)
  const type: 'customer' | 'driver' = router.query?.type === 'driver' ? 'driver' : 'customer'

  const list = useMemo(() => {
    if (type === 'customer') {
      return [
        { label: 'Đặt chuyến', value: '0', data: CUSTOMER_BOOKING_STEP },
        { label: 'Tìm chuyến tiện chuyến', value: '1', data: CUSTOMER_CONVENIENT_STEP }
      ]
    }

    return [
      { label: 'Nhận chuyến', value: '0', data: DRIVER_RECEIVE_RIDE },
      { label: 'Tạo tiện chuyến', value: '1', data: DRIVER_CREATE_CONVENIENT }
    ]
  }, [type])

  return (
    <StaticLayout
      bg={directionBg}
      subHeading="Hướng dẫn"
      heading={type === 'customer' ? 'Dành cho khách hàng' : 'Dành cho tài xế'}
    >
      <Seo description="Hướng dẫn đặt xe" thumbnailUrl="" title="Hướng dẫn đặt xe" url="guide" />
      <div className="max-w-[972px] w-full mx-auto">
        <div className="mb-24 md:mb-32">
          <Tabs
            type="fit"
            labelClassName="text-14 md:text-16 font-semibold"
            className="justify-center border-none"
            onChange={(e) => setTabIndex(+e)}
            tabActive={tabIndex + ''}
            list={list}
          />
        </div>

        {tabIndex === 1 ? (
          <p className="text-sm font-normal text-center mb-24 md:mb-32">
            {type === 'customer'
              ? ` Xe tiện chuyến là 1 hình thức của chuyến xe 1 chiều, được đặt bởi 1 hoặc nhiều hành khách
          có nhu cầu đi từ tỉnh này sang tỉnh khác với giá tốt nhất.(Hiện nay Exxe đang khoán cuốc
          xe tiện chuyến giá 55% so với chuyến xe 1 chiều)`
              : `Tạo các chuyến tiện chuyến nhắm tối ưu chi phí cho tài xế khi nhận chuyến đi 1 chiều mà không có chuyến đi về, chuyến xe tiện chuyến quay về có giá cước 55% so với chuyến đi 1 chiều)`}
          </p>
        ) : null}

        <GuideSlide data={list[tabIndex].data} />
      </div>
    </StaticLayout>
  )
}

export default Guide
