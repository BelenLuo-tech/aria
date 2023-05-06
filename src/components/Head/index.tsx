import { APP_NAME } from "@/config";
import type { ReactNode } from "react";

interface IProps {
  children?: ReactNode;
  title?: string;
}

export default function Head(props: IProps) {
  const title = props.title || "";

  return (
    <>
      <title>{APP_NAME + title}</title>
      {props.children}
    </>
  );
}
