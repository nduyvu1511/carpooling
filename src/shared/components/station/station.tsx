import { useAddress } from "@/hooks"
import { StationId, StationRes } from "@/models"
import { vehicleApi } from "@/services"
import { isArray } from "lodash"
import { useEffect, useState } from "react"
import Select from "react-select"
import { Spinner } from "../loading"
import { StationItem } from "./stationItem"

interface StationProps {
  defaultValue?: StationId
  onChooseStation?: (params: StationId) => void
  onSelectStation?: (params: StationId) => void
}

export const Station = ({ defaultValue, onChooseStation, onSelectStation }: StationProps) => {
  const { provinceOptions } = useAddress()
  const [station, setStation] = useState<StationId | undefined>(defaultValue)
  const [stations, setStations] = useState<StationRes[] | undefined>()
  const [isValidating, setValidating] = useState<boolean>(false)

  const fetchStations = async (provinceId: number) => {
    try {
      setValidating(true)
      const res = await vehicleApi.getPickUpStations(provinceId || 0)
      setValidating(false)
      setStations(res?.result?.data || [])
    } catch (error) {
      setValidating(false)
      console.log(error)
    }
  }

  useEffect(() => {
    if (!defaultValue?.province_id) return
    fetchStations(defaultValue.province_id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const confirmStationLocation = () => {
    if (!station?.station_id) {
      console.log("Missing station")
      return
    }

    onChooseStation && onChooseStation(station)
  }

  return (
    <div className="flex flex-col justify-between w-full h-full">
      <div className="p-[16px] sm:p-24 pb-0 flex-1 flex flex-col h-[calc(100%-70px)]">
        <div className="form-select">
          <Select
            defaultValue={
              defaultValue?.province_id
                ? {
                    label: defaultValue.province_name,
                    value: defaultValue.province_id,
                  }
                : undefined
            }
            placeholder="Chọn tỉnh"
            onChange={(val) => {
              if (!val?.value) return
              fetchStations(+val.value)
            }}
            autoFocus
            options={provinceOptions as any}
          />
        </div>

        <>
          {isValidating ? (
            <Spinner size={40} className="py-[40px]" />
          ) : stations === undefined ? (
            <div className="py-[20px] flex-center">
              <span className="text-14 font-normal">Vui lòng chọn tỉnh</span>
            </div>
          ) : isArray(stations) && stations?.length === 0 ? (
            <div className="py-[20px] flex-center">
              <span className="text-16 font-normal">Không tìm thấy trạm nào</span>
            </div>
          ) : stations?.length > 0 ? (
            <ul className="py-12 flex-1 overflow-y-auto scrollbar-hide">
              {stations.map((item, index) => (
                <li className="mb-[16px] last:mb-0" key={index}>
                  <StationItem
                    station={item}
                    onChange={(station) => {
                      onSelectStation?.(station)
                      setStation(station)
                    }}
                    isActive={station?.station_id === item.station_id}
                  />
                </li>
              ))}
            </ul>
          ) : null}
        </>
      </div>

      {/* Footer */}
      <div className="h-[72px] flex-center">
        <span
          onClick={confirmStationLocation}
          className={`btn-primary mx-12 md:mx-[16px] sm:mx-auto ${
            !station?.station_id ? "pointer-events-none btn-disabled" : ""
          }`}
        >
          Xác nhận Điểm đến
        </span>
      </div>
    </div>
  )
}
