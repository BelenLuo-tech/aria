import type { IMessage } from "./index.d"
import http from "@/utils/http"

let controller: AbortController | null = null

export function fetchSendMessage(messages: IMessage[]): Promise<{
  body: any
}> {
  controller = new AbortController()

  return http<{
    messages: IMessage[]
  }>({
    url: "/api/sendMessage",
    method: "post",
    signal: controller.signal,
    data: {
      messages
    }
  })
}

export function stopFetchSendMessage() {
  if (!controller) {
    return
  }

  controller.abort();
  controller = null;
}
