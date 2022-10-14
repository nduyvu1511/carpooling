import { RootState } from "@/core/store"
import { convertViToEn } from "@/helper"
import { DistrictId, OptionModel, ProvinceId, WardId } from "@/models"
import { addressAPI } from "@/services"
import { AxiosResponse } from "axios"
import { useEffect, useMemo, useState } from "react"
import { useSelector } from "react-redux"

interface UseAddress {
  getWards: (id: number) => void
  getDistricts: (id: number) => void
  provinces: ProvinceId[]
  provinceOptions: OptionModel[]
  districts: DistrictId[]
  districtOptions: OptionModel[]
  wards: WardId[]
  wardOptions: OptionModel[]
  clearDistricts: Function
  clearWards: Function
  clearAddressList: Function
  setDistricts: Function
  setWards: Function
  getProvinceIdByGooglePlace: (stringTerms: string) => number | undefined
  getProvinceOptionById: (id: number) => OptionModel | undefined
}

export const useAddress = (state_id?: number, district_id?: number): UseAddress => {
  const provinces = useSelector((state: RootState) => state.compoundingCarData.provinces)
  const [districts, setDistricts] = useState<DistrictId[]>([])
  const [wards, setWards] = useState<WardId[]>([])

  useEffect(() => {
    if (state_id && typeof state_id === "number") {
      getDistricts(state_id)
    }

    if (district_id && typeof state_id === "number") {
      getWards(district_id)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getDistricts = (state_id: number) => {
    addressAPI
      .getDistricts([state_id])
      .then((res: AxiosResponse<DistrictId[]>) => setDistricts(res?.result?.data || []))
      .catch((err) => console.log(err))
  }

  const getWards = (district_id: number) => {
    addressAPI
      .getWards([district_id])
      .then((res: AxiosResponse<WardId[]>) => setWards(res?.result?.data || []))
      .catch((err) => console.log(err))
  }

  const clearAddressList = () => {
    setDistricts([])
    setDistricts([])
    setWards([])
  }

  const clearDistricts = () => {
    setDistricts([])
  }

  const clearWards = () => {
    setWards([])
  }

  const getProvinceIdByGooglePlace = (addressListProps: string): number | undefined => {
    const arr = addressListProps.split(",")
    const listAddress = arr
      .reverse()
      .map((item) =>
        convertViToEn(item)
          .replace("city", "")
          .replace(/\W/g, "")
          .replace(/[0-9]/g, "")
          .replace("thanhpho", "")
          .replace("tp", "")
      )

    let provinceId = undefined
    let shouldBreak = false

    listAddress.forEach((val) => {
      if (shouldBreak) return
      provinces.forEach((item) => {
        if (val === item.province_vietnamese_name) {
          shouldBreak = true
          provinceId = item.province_id
          return
        }
      })
    })
    return provinceId
  }

  const getProvinceOptionById = (id: number | undefined): OptionModel | undefined => {
    if (!id) return
    return provinceOptions?.find((item) => item.value === id)
  }

  const provinceOptions: OptionModel[] = useMemo(() => {
    if (!provinces?.length) return []
    return provinces.map((item) => ({
      value: item.province_id,
      label: item.province_name,
    }))
  }, [provinces])

  const districtOptions: OptionModel[] = useMemo(() => {
    if (!districts?.length) return []
    return districts.map((item) => ({
      value: item.district_id,
      label: item.district_name,
    }))
  }, [districts])

  const wardOptions: OptionModel[] = useMemo(() => {
    if (!wards?.length) return []
    return wards.map((item) => ({
      value: item.ward_id,
      label: item.ward_name,
    }))
  }, [wards])

  return {
    getWards,
    getDistricts,
    districts,
    districtOptions,
    wards,
    provinces,
    clearDistricts,
    clearWards,
    clearAddressList,
    setDistricts,
    setWards,
    getProvinceIdByGooglePlace,
    provinceOptions,
    wardOptions,
    getProvinceOptionById,
  }
}
