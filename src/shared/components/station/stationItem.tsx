import { StationId, StationRes } from "@/models"
import { ItemSelect } from "../inputs"

interface StationItemProps {
  station: StationRes
  onChange: (params: StationId) => void
  isActive: boolean
}

const StationItem = ({ isActive, onChange, station }: StationItemProps) => {
  return (
    <ItemSelect
      onChange={() =>
        onChange({
          address: `${station.station_name}, ${station.street}, ${station.district_id.district_name}, ${station.province_id.province_name}`,
          lat: station.latitude,
          lng: station.longitude,
          province_id: station.province_id.province_id,
          province_name: station.province_id.province_name,
          station_id: station.station_id,
          station_name: station.station_name,
        })
      }
      isActive={isActive}
      title={station.station_name}
    />
  )
}

export { StationItem }
