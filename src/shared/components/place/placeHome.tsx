import { CompoundingCarRes } from "@/models"
import { rideAPI } from "@/services"
import useSWR from "swr"
import { HomeSection } from "../common"
import { PlaceSlide } from "./placeSlide"

export const PlaceHome = () => {
  const { data, isValidating } = useSWR<CompoundingCarRes[]>(
    "get_compounding_car_template",
    () =>
      rideAPI
        .getCompoundingCarTemplates()
        .then((res) => res.result.data || [])
        .catch((err) => console.log(err)),
    { dedupingInterval: 100000 }
  )

  if ((!data || data?.length === 0) && !isValidating) return null
  return (
    <HomeSection title="Lịch sử chuyến đi">
      {data ? <PlaceSlide data={data} showLoading={isValidating} /> : null}
    </HomeSection>
  )
}
