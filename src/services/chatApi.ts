import store from "@/core/store"
import {
  AddMessageUnread,
  changeUserStatusParams,
  CreateGroupChat,
  CreateSingleChat,
  LikeMessage,
  LoginFormParams,
  QueryCommonParams,
  SendMessage,
  UpdateRoomInfo,
} from "@/models"
import axios, { AxiosResponse } from "axios"
import mem from "mem"

const axiosClient = axios.create({
  baseURL: `http://localhost:5000/api`,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzFkNTZjNTRhMjBiZWY4MmU0NzlmMGQiLCJ1c2VyX2lkIjoyLCJyb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE2NjI5MDEzNTl9.7YgTIRjbTGsmUSEfz3RwHl0UdTgv6f9loNJ4Zmz_3nQ`,
  },
})

const memoizedRefreshToken = mem(
  async () => {
    const res = await chatApi.refreshToken()
    return res
  },
  {
    maxAge: 10000,
  }
)

axiosClient.interceptors.request.use(async (config) => {
  const accessToken = store.getState().chat.accessToken
  // ;(config as any).headers.authorization = `Bearer ${accessToken}`
  return config
})

try {
  axiosClient.interceptors.response.use(
    async (response) => {
      if (response?.data?.status_code === 401 || response?.data?.status_code === 403) {
        const res: any = await memoizedRefreshToken()

        if (res?.success) {
          return response.data
        } else {
          // store.dispatch(setProfile(undefined))
        }
      }

      if (response?.data) {
        return response.data
      }
      return response
    },
    (err) => {
      throw err
    }
  )
} catch (error) {
  console.log(error)
}

const chatApi = {
  createSingleChat: (params: CreateSingleChat) => {
    return axiosClient.post("/chat/room/single", params)
  },

  createGroupChat: (params: CreateGroupChat) => {
    return axiosClient.post("/chat/room/group_chat", params)
  },

  getProfile: (id?: string) => {
    return axiosClient.get(`/chat/user/profile${id ? `?user_id=${id}` : ""}`)
  },

  getMessageUnreadCount: (): Promise<AxiosResponse<{ message_unread_count: number }>> => {
    return axiosClient.get("/chat/user/message_unread_count")
  },

  getRoomList: ({
    limit = 30,
    offset = 0,
    search_term,
  }: QueryCommonParams & { search_term?: string }) => {
    return axiosClient.get(
      `/chat/room?limit=${limit}&offset=${offset}${
        search_term ? `&search_term=${search_term}` : ""
      }`
    )
  },

  getRoomDetail: (roomId: string) => {
    return axiosClient.get(`/chat/room/${roomId}`)
  },

  getMessagesPinnedInRoom: ({
    limit = 30,
    offset = 0,
    room_id,
  }: QueryCommonParams & { room_id: string }) => {
    return axiosClient.get(`/chat/room/${room_id}/messages_pinned?limit=${limit}&offset=${offset}`)
  },

  getMessagesInRoom: ({
    limit = 30,
    offset = 0,
    room_id,
  }: QueryCommonParams & { room_id: string }) => {
    return axiosClient.get(`/chat/room/${room_id}/messages?limit=${limit}&offset=${offset}`)
  },

  getMembersInRoom: ({
    limit = 30,
    offset = 0,
    room_id,
  }: QueryCommonParams & { room_id: string }) => {
    return axiosClient.get(`/chat/room/${room_id}/members?limit=${limit}&offset=${offset}`)
  },

  sendMessage: (params: SendMessage) => {
    return axiosClient.post("/chat/message", params)
  },

  getMessageById: (msgId: string) => {
    return axiosClient.get(`/chat/message/${msgId}`)
  },

  getTagMessageList: ({ limit = 30, offset = 0 }: QueryCommonParams) => {
    return axiosClient.get(`/chat/tag?limit=${limit}&offset=${offset}`)
  },

  changeUserStatus: (params: changeUserStatusParams) => {
    return axiosClient.patch("/chat/status", params)
  },
  getUserData: () => {
    return axiosClient.get("/chat/user")
  },

  addMessageUnreadToRoom: (params: AddMessageUnread) => {
    return axiosClient.post("/chat/room/message_unread", params)
  },

  clearMessageUnreadFromRoom: (roomId: string) => {
    return axiosClient.delete(`/chat/room/${roomId}/message_unread`)
  },

  confirmReadMessage: (message_id: string) => {
    return axiosClient.patch(`/chat/message/read`, { message_id })
  },

  confirmReadAllMessageInRoom: (room_id: string) => {
    return axiosClient.patch(`/chat/message/read_all`, { room_id })
  },

  login: (params: LoginFormParams) => {
    return axiosClient.post(`/chat/user/login`, params)
  },

  logout: () => {
    return axiosClient.post(`/chat/user/logout`)
  },

  refreshToken: () => {
    return axiosClient.post(`/chat/user/refresh`)
  },

  likeMessage: (params: LikeMessage) => {
    return axiosClient.post(`/chat/message/like`, params)
  },

  unlikeMessage: (messageId: string) => {
    return axiosClient.delete(`/chat/message/unlike/${messageId}`)
  },

  getUsersLikedMessage: (messageId: string) => {
    return axiosClient.get(`/chat/message/users/like/${messageId}`)
  },

  getUsersReadMessage: (messageId: string) => {
    return axiosClient.get(`/chat/message/users/read/${messageId}`)
  },

  uploadSingleImage: (formData: FormData) => {
    return axiosClient.post(`/chat/attachment/image/single`, formData)
  },

  uploadMultipleImage: (formData: FormData) => {
    return axiosClient.post(`/chat/attachment/image/multiple`, formData)
  },

  uploadMultipleVideo: (formData: FormData) => {
    return axiosClient.post(`/chat/attachment/video/multiple`, formData)
  },

  uploadSingleVideo: (formData: FormData) => {
    return axiosClient.post(`/chat/attachment/video/single`, formData)
  },

  deleteAttachment: (id: string) => {
    return axiosClient.delete(`/chat/attachment/${id}`)
  },

  getDetailMessage: (id: string) => {
    return axiosClient.get(`/chat/message/detail/${id}`)
  },

  updateRoomInfo: (params: UpdateRoomInfo) => {
    const { room_id, ...rest } = params
    return axiosClient.patch(`/chat/room/info/${room_id}`, rest)
  },
}

export { chatApi }
