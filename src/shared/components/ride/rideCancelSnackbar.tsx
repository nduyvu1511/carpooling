import moment from "moment"
import React from "react"
import { Snackbar } from "../common"

interface RideCancelSnackbarProps {
  expectedGoingOnDate: string
}

export const RideCancelSnackbar = ({ expectedGoingOnDate }: RideCancelSnackbarProps) => {
  const cancelDate = moment(expectedGoingOnDate).subtract(3, "hours")

  return (
    <Snackbar
      className="mt-24"
      title={`Hủy miễn phí trước ${cancelDate.format("HH:mm")} ngày ${cancelDate.format(
        "DD/MM/YYYY"
      )}. Sau khoảng thời gian này bạn sẽ không được hoàn cọc.`}
    />
  )
}
