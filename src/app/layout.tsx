import "./globals.scss";
interface IProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: IProps) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
