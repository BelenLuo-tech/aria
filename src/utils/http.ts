import { assign } from "@/utils"

type IProps<T> = RequestInit & {
  url: RequestInfo | URL
  data?: T
}

const defaultRequestProps = {
  method: "get",
  headers: {
    "Content-Type": "application/json",
  }
}

class AriaHttp {
  request<T>(props: IProps<T>): Promise<any> {
    const url = props.url
    const body = props.data ? JSON.stringify({
      ...props.data,
    }) : undefined

    return fetch(url, {
      ...assign(defaultRequestProps, props, ["signal"]),
      body: body
    }).then(response => {
      if (!response.ok) {
        throw response.statusText
      }

      return response
    })
  }
}

function createInstance() {
  const instance = AriaHttp.prototype.request

  return instance
}

const ariaHttp = createInstance()

export default ariaHttp