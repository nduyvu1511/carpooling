// Regex
export const PHONE_SCHEMA = /((^(\+84|84|0|0084){1})(3|5|7|8|9))+([0-9]{8})$/
export const BIRTHDAY_SCHEMA = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/
export const STRING_AT_LEAST_TWO_CHARACTER = /^[a-z]+(?:\s[a-z]+)+$/
export const PASSWORD_SCHEMA = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
export const DATE_SCHEMA = /^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/
export const BASE64_REGEX = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/
export const VIETNAMESE_NAME =
  /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s\W|_]+$/
export const YEAR_SCHEMA = /^(19|20)\d{2}$/
export const DATE_REGEX =
  /[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]/
export const BASE64_READER_REGEX = /^data:image\/\w+;base64,/
export const LIMIT_MESSAGES = 30
export const PRIMARY_COLOR = "#0BB2F5"
export const REMEMBER_PASSWORD_KEY = "is_remember_password_key"
export const FORM_LOGIN_KEY = "form_login_key"
export const HEADER_HEIGHT = 72
export const CAR_ACCOUNT_TYPE_KEY = "car_account_type_key"
export const CURRENT_TOKEN_KEY = "current_token_key"
export const VERIFY_REGISTER_OTP_KEY = "verify_register_otp_key"
export const GOOGLE_MAP_API_KEY = "AIzaSyDr3nOk0D6tpZjLKMJ65ElQlynRvvxo2j0"
export const DEFAULT_DATE_TIME_VALUE = "00-00-0000 00:00:00"
export const DEFAULT_HOUR_BACK_VALUE = { value: "00_hour", label: "Số giờ chờ" }
export const ONE_WAY_FROM_LOCATION = "one_way_from_location"
export const ONE_WAY_DISTANCE = "one_way_distance"
export const ONE_WAY_DURATION = "one_way_duration"
export const ONE_WAY_TO_LOCATION = "one_way_to_location"
export const ONE_WAY_CAR_ID = "one_way_car_id"
export const ONE_WAY_EXPECTED_GOING_ON_DATE = "one_way_expected_going_on_date"
export const ONE_WAY_NOTE = "one_way_note"
export const ONE_WAY_IS_CHECKED_POLICY = "one_way_is_checked_policy"
export const ONE_WAY_PRICE = "one_way_price"
export const TWO_WAY_FROM_LOCATION = "two_way_from_location"
export const TWO_WAY_DISTANCE = "two_way_distance"
export const TWO_WAY_DURATION = "two_way_duration"
export const TWO_WAY_PRICE = "two_way_price"
export const TWO_WAY_TO_LOCATION = "two_way_to_location"
export const TWO_WAY_CAR_ID = "two_way_car_id"
export const TWO_WAY_EXPECTED_GOING_ON_DATE = "two_way_expected_going_on_date"
export const TWO_WAY_NOTE = "two_way_note"
export const TWO_WAY_IS_A_DAY_TOUR = "two_way_is_a_day_tour"
export const TWO_WAY_HOUR_OF_WAIT_TIME = "two_way_hour_of_wait_time"
export const TWO_WAY_IS_CHECKED_POLICY = "two_way_is_checked_policy"
export const TWO_WAY_EXPECTED_PICKING_UP_DATE = "two_way_expected_picking_up_date"
export const CARPOOLING_DURATION = "carpooling_from_duration"
export const CARPOOLING_FROM_STATION = "carpooling_from_station"
export const CARPOOLING_FROM_LOCATION = "carpooling_from_location"
export const CARPOOLING_FROM_PICK_UP_STATION_ID = "carpooling_from_station"
export const CARPOOLING_DISTANCE = "carpooling_distance"
export const CARPOOLING_TO_STATION = "carpooling_to_station"
export const CARPOOLING_CAR_ID = "carpooling_car_id"
export const CARPOOLING_EXPECTED_GOING_ON_DATE = "carpooling_expected_going_on_date"
export const CARPOOLING_NOTE = "carpooling_note"
export const CARPOOLING_IS_CHECKED_POLICY = "carpooling_is_checked_policy"
export const CARPOOLING_PRICE_PER_PASSENGER = "carpooling_price_per_passenger"
export const CARPOOLING_NUMBER_SEAT = "carpooling_number_seat"
export const CARPOOLING_IS_PICKING_UP_FROM_START = "carpooling_is_picking_up_from_start"
export const COMPOUNDING_VNPAY_CODE = "compounding_vnpay_code"
export const LIMIT_COMPOUNDING_LIST = 12
export const STATE_COLOR = {
  draft: "#ff8800",
  "": "#858585",
  confirm: "#2E41B6",
  confirm_deposit: "#2E41B6",
  waiting: "#2E41B6",
  assign: "#2E41B6",
  deposit: "#2E41B6",
  in_process: "#ED9526",
  done: "#118A33",
  customer_pay: "#ED9526",
  confirm_paid: "#118A33",
  cancel: "#FF3B30",
  waiting_deposit: "#ff8800",
  start_running: "#ED9526",
  stop_picking: "#2E41B6",
  waiting_customer: "#2E41B6",
}
export const STATE_BG_COLOR = {
  draft: "rgba(255, 59, 48, 0.2)",
  confirm: "rgba(46, 76, 183, 0.2)",
  confirm_deposit: "rgba(46, 76, 183, 0.2)",
  waiting: "rgba(46, 76, 183, 0.2)",
  assign: "rgba(46, 76, 183, 0.2)",
  deposit: "rgba(46, 76, 183, 0.2)",
  in_process: "rgba(237, 149, 38, 0.2)",
  done: "rgba(17, 138, 51, 0.2)",
  customer_pay: "rgba(237, 149, 38, 0.2)",
  confirm_paid: "rgba(17, 138, 51, 0.2)",
  cancel: "rgba(255, 59, 48, 0.2)",
  waiting_deposit: "rgba(255, 59, 48, 0.2)",
  start_running: "rgba(237, 149, 38, 0.2)",
  stop_picking: "rgba(237, 149, 38, 0.2)",
  "": "rgba(55, 55, 55, 0.2)",
  waiting_customer: "rgba(46, 76, 183, 0.2)",
}
export const COMPOUNDING_TYPE_COLOR = {
  one_way: "#2E4CB7",
  two_way: "#EE542F",
  compounding: "#278EA5",
  convenient: "#7D27A5",
}
export const COMPOUNDING_TYPE_BG = {
  one_way: "#DAE2FD",
  two_way: "#FADFBE",
  compounding: "#D9EFF5",
  convenient: "#F1E4F7",
}
export const COMPOUNDING_STATE_NAME = {
  cancel: "Đã hủy",
  confirm: "Xác nhận",
  done: "Hoàn thành",
  start_running: "Đang di chuyển",
  confirm_deposit: "Đã đặt cọc",
  assign: "Đang tìm tài xế",
  confirm_paid: "Đã thanh toán",
  customer_pay: "Chờ thanh toán",
  deposit: "Đặt cọc",
  draft: "Đơn nháp",
  in_process: "Đang di chuyển",
  stop_picking: "Ngừng đón khách",
  waiting: "Đang chờ",
  waiting_deposit: "Chờ thanh toán",
  waiting_customer: "Chờ khách hàng",
}
export const COMPOUNDING_TYPE_NAME = {
  one_way: "Một chiều",
  two_way: "Hai chiều",
  compounding: "Đi ghép",
  convenient: "Tiện chuyến",
}
export const VNPAY_STATUS_NAME = {
  "00": "	Giao dịch thành công",
  "07": "	Trừ tiền thành công. Giao dịch bị nghi ngờ (liên quan tới lừa đảo, giao dịch bất thường).",
  "09": "	Giao dịch không thành công do: Thẻ/Tài khoản của khách hàng chưa đăng ký dịch vụ InternetBanking tại ngân hàng.",
  "10": "	Giao dịch không thành công do: Khách hàng xác thực thông tin thẻ/tài khoản không đúng quá 3 lần",
  "11": "	Giao dịch không thành công do: Đã hết hạn chờ thanh toán. Xin quý khách vui lòng thực hiện lại giao dịch.",
  "12": "	Giao dịch không thành công do: Thẻ/Tài khoản của khách hàng bị khóa.",
  "13": "	Giao dịch không thành công do Quý khách nhập sai mật khẩu xác thực giao dịch (OTP). Xin quý khách vui lòng thực hiện lại giao dịch.",
  "24": "	Giao dịch không thành công do: Khách hàng hủy giao dịch",
  "51": "	Giao dịch không thành công do: Tài khoản của quý khách không đủ số dư để thực hiện giao dịch.",
  "65": "	Giao dịch không thành công do: Tài khoản của Quý khách đã vượt quá hạn mức giao dịch trong ngày.",
  "75": "	Ngân hàng thanh toán đang bảo trì.",
  "79": "	Giao dịch không thành công do: KH nhập sai mật khẩu thanh toán quá số lần quy định. Xin quý khách vui lòng thực hiện lại giao dịch",
  "99": "	Các lỗi khác (lỗi còn lại, không có trong danh sách mã lỗi đã liệt kê)",
}
// export const PASSENGER_STATE_COLOR = {
//   in_process: {
//     bg: "#FFE9CD",
//     color: "#ED9526",
//   },
//   done: {
//     bg: "#DBFFEA",
//     color: "#008F5D",
//   },
//   done: {
//     bg: "#DBFFEA",
//     color: "#008F5D",
//   },
// }
