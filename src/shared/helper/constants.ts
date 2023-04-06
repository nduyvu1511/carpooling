import {
  angryIcon,
  CUSTOMER_BOOKING_IMAGES,
  DRIVER_CREATE_CONVENIENT_IMAGES,
  DRIVER_RECEIVE_RIDE_IMAGES,
  heartIcon,
  laughIcon,
  likeIcon,
  sadIcon,
  wowIcon
} from '@/assets'

// Regex
export const PHONE_SCHEMA = /((^(\+84|84|0|0084){1})(3|5|7|8|9))+([0-9]{8})$/
export const BIRTHDAY_SCHEMA = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/
export const STRING_AT_LEAST_TWO_CHARACTER = /^[a-z]+(?:\s[a-z]+)+$/
export const PASSWORD_SCHEMA = /^(?=.*[a-z])(?=.*\d)[a-zA-Z\d\w\W]{8,}$/
export const DATE_SCHEMA = /^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/
export const BASE64_REGEX = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/
export const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
export const OBJECT_ID_REGEX = /^[0-9a-fA-F]{24}$/
export const VIETNAMESE_NAME =
  /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s\W|_]+$/
export const YEAR_SCHEMA = /^(19|20)\d{2}$/
export const DATE_REGEX =
  /[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]/
export const BASE64_READER_REGEX = /^data:image\/\w+;base64,/
export const LIMIT_MESSAGES = 30
export const PRIMARY_COLOR = '#0BB2F5'
export const REMEMBER_PASSWORD_KEY = 'is_remember_password_key'
export const FORM_LOGIN_KEY = 'form_login_key'
export const HEADER_HEIGHT = 72
export const CAR_ACCOUNT_TYPE_KEY = 'car_account_type_key'
export const CURRENT_TOKEN_KEY = 'current_token_key'
export const VERIFY_REGISTER_OTP_KEY = 'verify_register_otp_key'
export const GOOGLE_MAP_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY ?? ''
export const ONE_WAY_FROM_LOCATION = 'one_way_from_location'
export const ONE_WAY_DISTANCE = 'one_way_distance'
export const ONE_WAY_DURATION = 'one_way_duration'
export const ONE_WAY_TO_LOCATION = 'one_way_to_location'
export const ONE_WAY_CAR_ID = 'one_way_car_id'
export const ONE_WAY_EXPECTED_GOING_ON_DATE = 'one_way_expected_going_on_date'
export const ONE_WAY_NOTE = 'one_way_note'
export const ONE_WAY_IS_CHECKED_POLICY = 'one_way_is_checked_policy'
export const ONE_WAY_PRICE = 'one_way_price'
export const TWO_WAY_FROM_LOCATION = 'two_way_from_location'
export const TWO_WAY_DISTANCE = 'two_way_distance'
export const TWO_WAY_DURATION = 'two_way_duration'
export const TWO_WAY_PRICE = 'two_way_price'
export const TWO_WAY_TO_LOCATION = 'two_way_to_location'
export const TWO_WAY_CAR_ID = 'two_way_car_id'
export const TWO_WAY_EXPECTED_GOING_ON_DATE = 'two_way_expected_going_on_date'
export const TWO_WAY_NOTE = 'two_way_note'
export const TWO_WAY_IS_A_DAY_TOUR = 'two_way_is_a_day_tour'
export const TWO_WAY_HOUR_OF_WAIT_TIME = 'two_way_hour_of_wait_time'
export const TWO_WAY_IS_CHECKED_POLICY = 'two_way_is_checked_policy'
export const TWO_WAY_EXPECTED_PICKING_UP_DATE = 'two_way_expected_picking_up_date'
export const CARPOOLING_DURATION = 'carpooling_from_duration'
export const CARPOOLING_FROM_STATION = 'carpooling_from_station'
export const CARPOOLING_FROM_LOCATION = 'carpooling_from_location'
export const CARPOOLING_FROM_PICK_UP_STATION_ID = 'carpooling_from_station'
export const CARPOOLING_DISTANCE = 'carpooling_distance'
export const CARPOOLING_TO_STATION = 'carpooling_to_station'
export const CARPOOLING_CAR_ID = 'carpooling_car_id'
export const CARPOOLING_EXPECTED_GOING_ON_DATE = 'carpooling_expected_going_on_date'
export const CARPOOLING_NOTE = 'carpooling_note'
export const CARPOOLING_IS_CHECKED_POLICY = 'carpooling_is_checked_policy'
export const CARPOOLING_PRICE_PER_PASSENGER = 'carpooling_price_per_passenger'
export const CARPOOLING_NUMBER_SEAT = 'carpooling_number_seat'
export const CARPOOLING_IS_PICKING_UP_FROM_START = 'carpooling_is_picking_up_from_start'
export const COMPOUNDING_VNPAY_CODE = 'compounding_vnpay_code'
export const LIMIT_COMPOUNDING_LIST = 12
export const CONVENIENT_CAR_ID = 'convenient_car_id'
export const CONVENIENT_DISTANCE = 'convenient_distance'
export const CONVENIENT_DURATION = 'convenient_duration'
export const CONVENIENT_EXPECTED_GOING_ON_DATE = 'convenient_expected_going_on_date'
export const CONVENIENT_FROM_STATION = 'convenient_from_station'
export const CONVENIENT_IS_CHECKED_POLICY = 'convenient_is_checked_policy'
export const CONVENIENT_NOTE = 'convenient_note'
export const CONVENIENT_PRICE_PER_PASSENGER = 'convenient_price_per_passenger'
export const CONVENIENT_TO_STATION = 'convenient_to_station'

export const VNPAY_STATUS_NAME = {
  '00': '	Giao dịch thành công',
  '07': '	Trừ tiền thành công. Giao dịch bị nghi ngờ (liên quan tới lừa đảo, giao dịch bất thường).',
  '09': '	Giao dịch không thành công do: Thẻ/Tài khoản của khách hàng chưa đăng ký dịch vụ InternetBanking tại ngân hàng.',
  '10': '	Giao dịch không thành công do: Khách hàng xác thực thông tin thẻ/tài khoản không đúng quá 3 lần',
  '11': '	Giao dịch không thành công do: Đã hết hạn chờ thanh toán. Xin quý khách vui lòng thực hiện lại giao dịch.',
  '12': '	Giao dịch không thành công do: Thẻ/Tài khoản của khách hàng bị khóa.',
  '13': '	Giao dịch không thành công do Quý khách nhập sai mật khẩu xác thực giao dịch (OTP). Xin quý khách vui lòng thực hiện lại giao dịch.',
  '24': '	Giao dịch không thành công do: Khách hàng hủy giao dịch',
  '51': '	Giao dịch không thành công do: Tài khoản của quý khách không đủ số dư để thực hiện giao dịch.',
  '65': '	Giao dịch không thành công do: Tài khoản của Quý khách đã vượt quá hạn mức giao dịch trong ngày.',
  '75': '	Ngân hàng thanh toán đang bảo trì.',
  '79': '	Giao dịch không thành công do: KH nhập sai mật khẩu thanh toán quá số lần quy định. Xin quý khách vui lòng thực hiện lại giao dịch',
  '99': '	Các lỗi khác (lỗi còn lại, không có trong danh sách mã lỗi đã liệt kê)'
}

export const PAYMENT_PURPOSE_NAME = {
  car_driver_deposit: 'Đặt cọc',
  passenger_deposit: 'Đặt cọc',
  return_car_driver_deposit: 'Trả cọc',
  return_passenger_deposit: 'Trả cọc',
  car_driver_invoice: 'Hóa đơn kết chuyến',
  car_driver_withdrawing: 'Rút tiền',
  car_driver_wallet_recharge: 'Nạp tiền',
  passenger_wallet_recharge: 'Nạp tiền',
  passenger_withdrawing: 'Rút tiền',
  customer_invoice: 'Hóa đơn kết chuyến',
  cancel_car_driver_deposit: 'Hủy cọc',
  cancel_passenger_deposit: 'Hủy cọc',
  exxe_reward: 'Thưởng Exxe'
}

export const PHONE = '19004744'
export const ADDRESS = 'Số 10 S5, Villa Saroma, Phường An Lợi Đông, Quận 2, TPHCM'
export const EMAIL = 'exxevn2022@gmail.com'
export const DOMAIN_URL = process?.env?.NEXT_PUBLIC_DOMAIN_URL

export const PAYMENT_METHOD_NAME = {
  cash: 'Tiền mặt',
  exxe_wallet: 'Ví Exxe',
  transfer: 'Chuyển khoản',
  bank: 'Chuyển khoản'
}

export const MESSAGE_STATUS = {
  pending: 'Đang gửi',
  rejected: 'Gửi lỗi',
  fulfilled: 'Đã gửi'
}

export const MESSAGE_EMOTION_ICON = {
  laugh: laughIcon,
  heart: heartIcon,
  sad: sadIcon,
  wow: wowIcon,
  like: likeIcon,
  angry: angryIcon
}

export const MESSAGE_OPTION_MENU_SIZE = {
  width: 180,
  height: 168
}

export const MESSAGES_LIMIT = 30

export const AUTH_MODAL_HEADING = {
  login: 'Đăng nhập',
  register: 'Đăng ký',
  resetPassword: 'Quên mật khẩu',
  sms: 'Đăng nhập bằng SMS',
  updateProfile: 'Cập nhật thông tin'
}

export const CUSTOMER_BOOKING_STEP = [
  {
    step: 'Bước 1',
    label: 'Chọn loại chuyến bạn cần đi',
    image: CUSTOMER_BOOKING_IMAGES[1]
  },
  {
    step: 'Bước 2',
    label: 'Nhập điểm đi / điểm đến / thời gian',
    image: CUSTOMER_BOOKING_IMAGES[2]
  },
  {
    step: 'Bước 3',
    label: 'Chọn cước phí đặt cọc(20% giá cước chuyến đi)',
    image: CUSTOMER_BOOKING_IMAGES[3]
  },
  {
    step: 'Bước 4',
    label: 'Nhập mã khuyến mãi(nếu có), để được giảm giá cước chuyến đi',
    image: CUSTOMER_BOOKING_IMAGES[4]
  },
  {
    step: 'Bước 5',
    label: 'Chọn hình thức thanh toán(TK Exxe, Thẻ hoặc ví điện tử VNPAY)',
    image: CUSTOMER_BOOKING_IMAGES[5]
  },
  {
    step: 'Bước 6',
    label: 'Chọn Đặt cọc để hoàn tất đặt chuyến, chờ tài xế nhận chuyến của bạn.',
    image: CUSTOMER_BOOKING_IMAGES[6]
  }
]

export const CUSTOMER_CONVENIENT_STEP = [
  {
    step: 'Bước 1',
    label: 'Chọn xem các chuyến tiện chuyến',
    image: CUSTOMER_BOOKING_IMAGES[1]
  },
  {
    step: 'Bước 2',
    label: 'Tìm kiếm các chuyến đi theo bộ lọc: Điểm đi, điểm đến, thời gian ',
    image: CUSTOMER_BOOKING_IMAGES[2]
  },
  {
    step: 'Bước 3',
    label: 'Chọn chuyến phù hợp',
    image: CUSTOMER_BOOKING_IMAGES[3]
  },
  {
    step: 'Bước 4',
    label: 'Chọn cước phi đặt cọc (20% giá cước chuyến đi)',
    image: CUSTOMER_BOOKING_IMAGES[4]
  },
  {
    step: 'Bước 5',
    label: 'Chọn hình thức thanh toán (TK Exxe, Thẻ hoặc ví điện tử VNPAY)',
    image: CUSTOMER_BOOKING_IMAGES[5]
  },
  {
    step: 'Bước 6',
    label: 'Chọn Đặt cọc để hoàn tất đặt chuyến và tận hưởng chuyến đi',
    image: CUSTOMER_BOOKING_IMAGES[6]
  }
]

export const DRIVER_RECEIVE_RIDE = [
  {
    step: 'Bước 1',
    label: 'Chọn chuyến từ danh sách chuyến đi gợi ý',
    image: DRIVER_RECEIVE_RIDE_IMAGES[1]
  },
  {
    step: 'Bước 2',
    label: 'Chọn chuyến đi phù hợp',
    image: DRIVER_RECEIVE_RIDE_IMAGES[2]
  },
  {
    step: 'Bước 3',
    label: 'Chọn hình thức thanh toán(TK Exxe, Thẻ hoặc ví điện tử VNPAY)',
    image: DRIVER_RECEIVE_RIDE_IMAGES[4]
  },
  {
    step: 'Bước 4',
    label:
      'Hoàn tất nhận chuyến, hệ thống gợi ý các chuyến đi về hoặc tạo chuyến tiện chuyến (Nếu không có chuyến đi về phù hợp)',
    image: DRIVER_RECEIVE_RIDE_IMAGES[5]
  }
]

export const DRIVER_CREATE_CONVENIENT = [
  {
    step: 'Bước 1',
    label: 'Chọn nút tạo tiện chuyến',
    image: DRIVER_CREATE_CONVENIENT_IMAGES[1]
  },
  {
    step: 'Bước 2',
    label: 'Nhập trạm đón / trạm đến / thời gian',
    image: DRIVER_CREATE_CONVENIENT_IMAGES[2]
  },
  {
    step: 'Bước 3',
    label: 'Tạo chuyến thành công, chờ đợi khách hàng có nhu cầu nhận chuyến',
    image: DRIVER_CREATE_CONVENIENT_IMAGES[3]
  }
]
