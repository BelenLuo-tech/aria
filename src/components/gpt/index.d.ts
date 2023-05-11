export enum Role {
  robot = "assistant",
  user = "user",
  system = "system"
}

export interface IMessage {
  role: Role
  content: string
}

export interface ILocalMessage extends IMessage {
  id: string
  date: date
  error?: boolean
}

export interface IState {
  loading: boolean;
  messageList: ILocalMessage[];
}

export interface IAction {
  add: (args: IMessage) => Promise<{
    id: string
    messageList: IMessage[]
  }>
  update: (id: string, message: string) => Promise<IMessage[]>
  setLoad: (loading: boolean) => void
  init: (messages: ILocalMessage[]) => void,
  setError: (id: string) => void
}