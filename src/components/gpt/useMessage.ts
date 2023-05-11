import { create } from "zustand"
import { fetchSendMessage, stopFetchSendMessage } from "./api"
import { Role } from "./index.d"
import { useStreamDecoder } from "@/hooks"
import { createUuid } from "@/utils"
import type { IState, IAction, ILocalMessage, IMessage } from "./index.d"
import React from "react"

const MESSAGE_KEY = "MESSAGE_LIST"

function localSet(value: ILocalMessage[]) {
  localStorage.setItem(MESSAGE_KEY, JSON.stringify(value))
}

function localGet(): ILocalMessage[] {
  const messageList = localStorage.getItem(MESSAGE_KEY)
  return messageList ? JSON.parse(messageList) : []
}

function clearLocal() {
  localStorage.removeItem(MESSAGE_KEY)
}

const useStore = create<IState & IAction>((set) => ({
  loading: false,
  messageList: [],
  add: ({
    content,
    role = Role.robot
  }) => {
    return new Promise(resolve => {
      set((state) => {
        const id = createUuid()
        const date = new Date().getTime()
        const messageList = [...state.messageList.map(item => {
          return { ...item }
        }), {
          id,
          content,
          role,
          date
        }]

        resolve({ messageList, id })
        localSet(messageList)

        return { messageList };
      });
    })
  },
  update: (id, message) => {
    return new Promise(resolve => {
      set((state) => {
        const messageList = state.messageList.map(item => {
          if (item.id === id) {
            item.content += message
          }

          return { ...item }
        })

        localSet(messageList)
        resolve(messageList)

        return { messageList }
      })
    })
  },
  setError: (id) => {
    set((state) => {
      const messageList = state.messageList

      for (let i = 0; i < messageList.length; i++) {
        const item = messageList[i]
        if (item.id === id) {
          item.error = true;
          break
        }
      }

      localSet(messageList)
      return { messageList }
    })
  },
  setLoad: (loading) => {
    set({ loading })
  },
  init: (messageList) => {
    set({
      messageList: messageList.map(item => {
        return { ...item }
      })
    })
  }
}))

export const useMessage = () => {
  const loading = useStore(state => state.loading)
  const messageList = useStore(state => state.messageList)
  const addMessage = useStore(state => state.add)
  const updateMessage = useStore(state => state.update)
  const setLoad = useStore(state => state.setLoad)
  const setMessageError = useStore(state => state.setError)
  const initMessage = useStore(state => state.init)
  const { decoder } = useStreamDecoder()

  React.useEffect(() => {
    if (!messageList.length) {
      const localMessages = localGet()
      localMessages?.length && initMessage(localMessages)
    }
  })

  const requestMesaage = async (messageList: IMessage[]) => {
    setLoad(true);
    const robotMessage = { content: "", role: Role.robot }
    const { id } = await addMessage(robotMessage)

    try {
      const res = await fetchSendMessage(messageList.map(item => {
        return {
          content: item.content,
          role: item.role
        }
      }))

      await decoder(res.body.getReader(), (content: string) => {
        updateMessage(id, content)
      })
    } catch {
      setMessageError(id)
    } finally {
      setLoad(false)
    }
  }

  const sendMessage = async (message: string) => {
    const { messageList } = await addMessage({ content: message, role: Role.user })
    requestMesaage(messageList)
  }

  const stop = () => {
    stopFetchSendMessage();
    setLoad(false);
  }

  const resend = async () => {
    messageList.pop()
    initMessage(messageList)
    requestMesaage(messageList)
  }

  const clear = () => {
    stop();
    initMessage([]);
    clearLocal()
  }

  return { loading, messageList, sendMessage, stop, resend, clear }
}