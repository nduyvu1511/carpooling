import { Modal } from "@/components/modal"
import { Tabs } from "@/components/tabs"
import { subtractDateTimeToNumberOfHour } from "@/helper"
import { useCompoundingCarActions, useCompoundingForm } from "@/hooks"
import {
  CarAccountType,
  CompoundingType,
  CreateCompoundingCarParams,
  CreateTwoWayCompoundingCar,
} from "@/models"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { CarpoolingCompoundingForm } from "./carpoolingCompoundingCarForm"
import { OneWayCompoundingForm } from "./oneWayCompoundingCarForm"
import { TwoWayCompoundingForm } from "./twoWayCompoundingCarForm"

interface BookingModalProps {
  onClose: Function
  formType: CompoundingType
  show: CompoundingType | undefined
  carAccountType?: CarAccountType
}

interface HandleCreateCompoundingCarParams {
  params: CreateCompoundingCarParams
}

const BookingModal = ({
  onClose,
  formType,
  show,
  carAccountType = "customer",
}: BookingModalProps) => {
  const router = useRouter()
  const {
    oneWayCompoundingCarFormFromLocalStorage,
    twoWayCompoundingCarFormFromLocalStorage,
    carpoolingCompoundingFormFromLocalStorage,
  } = useCompoundingForm()
  const { createCompoundingCar } = useCompoundingCarActions()
  const [compoundingType, setCompoundingType] = useState<CompoundingType | undefined>(formType)

  useEffect(() => {
    setCompoundingType(formType)
  }, [formType])

  const handleCreateCompoundingCar = ({ params }: HandleCreateCompoundingCarParams) => {
    if (!compoundingType) return

    let data = {
      ...params,
      compounding_type: compoundingType,
      expected_going_on_date: subtractDateTimeToNumberOfHour(params.expected_going_on_date, 7),
    }
    if ((data as CreateTwoWayCompoundingCar).is_a_day_tour) {
      ;(data as CreateTwoWayCompoundingCar).expected_picking_up_date =
        subtractDateTimeToNumberOfHour(params.expected_going_on_date, 7)
    }

    createCompoundingCar({
      params: data,
      onSuccess: (data) => {
        onClose()
        if (data.compounding_type === "convenient") {
          console.log(data)
          router.push(`/d/booking/confirm/${data.compounding_car_customer_id}`)
        } else {
          router.push({
            pathname: "/c/booking/confirm",
            query: {
              compounding_car_customer_id: data.compounding_car_customer_id,
            },
          })
        }
      },
      config: { toggleOverFlow: false },
    })
  }

  return (
    <Modal
      show={!!show}
      heading={
        compoundingType === "compounding"
          ? "Tạo chuyến đi ghép"
          : compoundingType === "one_way"
          ? "Tạo chuyến đi một chiều"
          : compoundingType === "convenient"
          ? "Tạo chuyến đi tiện chuyến"
          : "Tạo chuyến đi hai chiều"
      }
      onClose={onClose}
      headerNode={
        carAccountType === "customer" ? (
          <div className="md:hidden">
            <Tabs
              type="full"
              list={[
                { label: "Một chiều", value: "one_way" },
                { label: "Hai chiều", value: "two_way" },
                { label: "Đi ghép", value: "compounding" },
              ]}
              tabActive={compoundingType || formType}
              onChange={(val) => setCompoundingType(val as CompoundingType)}
            />
          </div>
        ) : null
      }
    >
      <div className="flex-1 w-full px-[16px] overflow-auto md:px-24 py-12 mb-[64px] md:mb-[40px]">
        {compoundingType === "one_way" ? (
          <OneWayCompoundingForm
            defaultValues={oneWayCompoundingCarFormFromLocalStorage()}
            onSubmit={(params) => {
              handleCreateCompoundingCar({ params })
            }}
            view="modal"
          />
        ) : compoundingType === "two_way" ? (
          <TwoWayCompoundingForm
            defaultValues={twoWayCompoundingCarFormFromLocalStorage()}
            onSubmit={(params) => {
              handleCreateCompoundingCar({ params })
            }}
            view="modal"
          />
        ) : (
          <CarpoolingCompoundingForm
            defaultValues={carpoolingCompoundingFormFromLocalStorage()}
            onSubmit={(params) => {
              handleCreateCompoundingCar({ params })
            }}
            view="modal"
          />
        )}
      </div>
    </Modal>
  )
}

export { BookingModal }
