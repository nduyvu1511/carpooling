import { CreateGroupChat, CreateSingleChat, RoomDetailRes, UseParams } from "@/models"
import { setCurrentRoomId } from "@/modules"
import { chatAPI } from "@/services"
import { useRouter } from "next/router"
import { useDispatch } from "react-redux"
import { notify } from "reapop"
import { useAsync } from "../utilities"

interface UseChatActionsRes {
  createSingleChat: (_: UseParams<CreateSingleChat, RoomDetailRes>) => void
  createGroupChat: (_: UseParams<CreateGroupChat, RoomDetailRes>) => void
}

export const useChatActions = (): UseChatActionsRes => {
  const router = useRouter()
  const dispatch = useDispatch()
  const { asyncHandler } = useAsync()

  const redirectToChatPage = (roomId: string) => {
    router.push("/chat")
    dispatch(setCurrentRoomId(roomId))
  }

  const createSingleChat = (_: UseParams<CreateSingleChat, RoomDetailRes>) => {
    const { params, onSuccess, config, onError } = _

    if (
      params?.state !== "deposit" &&
      params?.state !== "in_process" &&
      params?.state !== "waiting" &&
      params?.state !== "assign" &&
      params?.state !== "confirm_deposit"
    ) {
      dispatch(notify("Bạn không thể tạo phòng chat ở trạng thái này", "warning"))
      return
    }

    asyncHandler<RoomDetailRes>({
      fetcher: chatAPI.createSingleChat({
        compounding_car_id: params.compounding_car_id,
        partner_id: params.partner_id,
      }),
      onSuccess: (data) => {
        router.push("/chat")
        redirectToChatPage(data.room_id)
        onSuccess?.(data)
      },
      onError: () => onError?.(),
      config: { ...config, showScreenLoading: true },
    })
  }

  const createGroupChat = (_: UseParams<CreateGroupChat, RoomDetailRes>) => {
    const { params, onSuccess, config, onError } = _
    asyncHandler<RoomDetailRes>({
      fetcher: chatAPI.createGroupChat(params),
      onSuccess: (data) => {
        redirectToChatPage(data.room_id)
        onSuccess?.(data)
      },
      onError: () => onError?.(),
      config: { ...config, showScreenLoading: true },
    })
  }

  return {
    createGroupChat,
    createSingleChat,
  }
}
