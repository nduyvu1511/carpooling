import {
  AddMessageUnread,
  CreateGroupChat,
  CreateSingleChat,
  LoginToSocket,
  QueryCommonParams,
  SendMessage,
} from "@/models"
import axios from "axios"

const axiosClient = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_CHAT_API_URL}/api/v1`,
  method: "POST",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzFhYzE1NThmNTY1NDRjYmMwMWEyNmQiLCJ1c2VyX2lkIjoxLCJyb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE2NjI2OTgxNTh9.-5t6rx8qKmA-hUuy9aT-Ht2kPCKFJ0-vyEo6d7SvD30`,
  },
})

axiosClient.interceptors.request.use(async (config) => {
  return config
})

try {
  axiosClient.interceptors.response.use(
    async (response) => {
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
    return axiosClient.post("/room/single_chat", params)
  },

  createGroupChat: (params: CreateGroupChat) => {
    return axiosClient.post("/room/group_chat", params)
  },

  getRoomList: () => {
    return axiosClient.get("/room")
  },

  getRoomJoinedIds: () => {
    return axiosClient.get("/room/ids")
  },

  getRoomDetail: (roomId: string) => {
    return axiosClient.get(`/room/${roomId}`)
  },

  getMessagesPinnedInRoom: ({
    limit = 30,
    offset = 0,
    room_id,
  }: QueryCommonParams & { room_id: string }) => {
    return axiosClient.get(`/room/${room_id}/messages_pinned?limit=${limit}&offset=${offset}`)
  },

  getMessagesInRoom: ({
    limit = 30,
    offset = 0,
    room_id,
  }: QueryCommonParams & { room_id: string }) => {
    return axiosClient.get(`/room/${room_id}/messages?limit=${limit}&offset=${offset}`)
  },

  getMembersInRoom: ({
    limit = 30,
    offset = 0,
    room_id,
  }: QueryCommonParams & { room_id: string }) => {
    return axiosClient.get(`/room/${room_id}/members?limit=${limit}&offset=${offset}`)
  },

  sendMessage: (params: SendMessage) => {
    return axiosClient.post("/message", params)
  },

  getTagMessageList: ({ limit, offset }: QueryCommonParams) => {
    return axiosClient.post(`/tag?limit=${limit}&offset=${offset}`)
  },

  loginToSocket: (params: LoginToSocket) => {
    return axiosClient.post("/user/login_to_socket", params)
  },

  addMessageUnreadToRoom: (params: AddMessageUnread) => {
    return axiosClient.post("/room/message_unread", params)
  },

  clearMessageUnreadFromRoom: (roomId: string) => {
    return axiosClient.delete(`/room/${roomId}/message_unread`)
  },

  confirmReadMessage: (message_id: string) => {
    return axiosClient.post(`/message/read`, { message_id })
  },

  confirmReadAllMessageInRoom: (room_id: string) => {
    return axiosClient.post(`/message/read_all`, { room_id })
  },
}

export { chatApi }
