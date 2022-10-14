import { useAddress } from "@/hooks"
import { StationId, StationRes } from "@/models"
import { userAPI } from "@/services"
import { isArray } from "lodash"
import { useEffect, useState } from "react"
import Select from "react-select"
import { Spinner } from "../loading"
import { StationItem } from "./stationItem"

interface StationProps {
  defaultValue?: StationId
  onChange?: (_: StationId) => void
}

export const Station = ({ defaultValue, onChange }: StationProps) => {
  const { provinceOptions } = useAddress()
  const [station, setStation] = useState<StationId | undefined>(defaultValue)
  const [stations, setStations] = useState<StationRes[] | undefined>()
  const [isValidating, setValidating] = useState<boolean>(false)

  const fetchStations = async (provinceId: number) => {
    try {
      setValidating(true)
      const res = await userAPI.getPickUpStations(provinceId || 0)
      setValidating(false)
      const data = res?.result?.data || []
      setStations(data)
      if (station?.province_id !== data?.[0]?.province_id?.province_id) {
        setStation(undefined)
      }
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

    onChange?.(station)
  }

  return (
    <div className="flex flex-col justify-between w-full h-full modal-form">
      <div className="flex flex-col modal-form-content">
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
              if (+val?.value === station?.province_id) return
              fetchStations(+val.value)
            }}
            autoFocus
            options={provinceOptions as any}
          />
        </div>

        {isValidating ? (
          <Spinner size={24} className="py-[40px]" />
        ) : stations === undefined ? (
          <div className="py-[20px] flex-center">
            <span className="text-14 text-gray-color-3 font-medium">Vui lòng chọn tỉnh</span>
          </div>
        ) : isArray(stations) && stations?.length === 0 ? (
          <div className="py-[20px] flex-center">
            <span className="text-14 text-gray-color-3 font-medium">Không tìm thấy trạm nào</span>
          </div>
        ) : stations?.length > 0 ? (
          <ul className="py-custom flex-1 overflow-y-auto">
            {stations.map((item, index) => (
              <li className="mb-16 last:mb-0" key={index}>
                <StationItem
                  station={item}
                  onChange={setStation}
                  isActive={station?.station_id === item.station_id}
                />
              </li>
            ))}
          </ul>
        ) : null}
      </div>

      {/* Footer */}
      <div className="modal-form-btn">
        <span
          onClick={confirmStationLocation}
          className={`btn-primary ${
            !station?.station_id ? "pointer-events-none btn-disabled" : ""
          }`}
        >
          Xác nhận điểm đến
        </span>
      </div>
    </div>
  )
}
