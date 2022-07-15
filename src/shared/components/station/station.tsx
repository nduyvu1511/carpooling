import { useAddress } from "@/hooks"
import { StationId, StationRes } from "@/models"
import { vehicleApi } from "@/services"
import { AxiosResponse } from "axios"
import { useEffect, useState } from "react"
import Select from "react-select"
import { ItemSelect } from "../inputs"
import { Spinner } from "../loading"

interface StationProps {
  defaultValue?: StationId
  onChooseStation?: (params: StationId) => void
  onSelectStation?: (params: StationId) => void
}

export const Station = ({ defaultValue, onChooseStation, onSelectStation }: StationProps) => {
  const { provinceOptions } = useAddress()

  const [stations, setStations] = useState<StationRes[]>()
  const [station, setStation] = useState<StationId | undefined>(defaultValue)
  const [stationLoading, setStationLoading] = useState<boolean>(false)

  const confirmStationLocation = () => {
    if (!station?.station_id) {
      console.log("Missing station")
      return
    }

    onChooseStation && onChooseStation(station)
  }

  useEffect(() => {
    if (!defaultValue?.province_id) return
    fetchStations(defaultValue.province_id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const fetchStations = (province_id: number) => {
    vehicleApi
      .getPickUpStations(province_id)
      .then((res: AxiosResponse<StationRes[]>) => {
        setStationLoading(false)
        setStations(res?.result?.data || [])
      })
      .catch((err) => {
        setStationLoading(false)
        console.log(err)
      })
  }
  // h-[calc(100%-50px)]
  return (
    <div className="flex flex-col justify-between h-full">
      <div className="p-24 pb-0 flex-1 flex flex-col h-[calc(100%-70px)]">
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
              setStationLoading(true)
              fetchStations(val.value)
            }}
            autoFocus
            options={provinceOptions as any}
          />
        </div>

        <>
          {stationLoading ? <Spinner size={24} className="py-[40px]" /> : null}

          {!stationLoading && stations?.length === 0 ? (
            <div className="py-[20px] flex-center">
              <span className="text-16 font-normal">Không tìm thấy trạm nào</span>
            </div>
          ) : null}

          {!stationLoading && stations === undefined ? (
            <div className="py-[20px] flex-center">
              <span className="text-14 font-normal">Vui lòng chọn tỉnh</span>
            </div>
          ) : null}

          {!stationLoading && stations && stations?.length > 0 ? (
            <ul className="py-12 flex-1 overflow-y-auto scrollbar-hide">
              {stations.map((item, index) => (
                <li className="mb-[16px] last:mb-0" key={index}>
                  <ItemSelect
                    onChange={() => {
                      const station = {
                        address: `${item.station_name}, ${item.street}, ${item.district_id.district_name}, ${item.province_id.province_name}`,
                        lat: item.latitude,
                        lng: item.longitude,
                        province_id: item.province_id.province_id,
                        province_name: item.province_id.province_name,
                        station_id: item.station_id,
                        station_name: item.station_name,
                      }

                      onSelectStation && onSelectStation(station)
                      setStation(station)
                    }}
                    isActive={station?.station_id === item.station_id}
                    title={item.station_name}
                  />
                </li>
              ))}
            </ul>
          ) : null}
        </>
      </div>

      {/* Footer */}
      <div className="h-[70px] flex-center py-[10px]">
        <button
          onClick={confirmStationLocation}
          className={`btn-primary ${
            !station?.station_id ? "pointer-events-none btn-disabled" : ""
          }`}
        >
          Xác nhận Điểm đến
        </button>
      </div>
    </div>
  )
}
