import ReduxProvider from "@/redux/ReduxProvider";
import "../globals.scss";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import AuthContainer from "@/containers/authContainer/AuthContainer";
import ReactQueryProvider from "@/containers/ReactQueryProvider";
import ConversationBox from "@/containers/conversationBox/ConversationBox";
import Navbar from "@/containers/navbar/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <ReduxProvider>
        <ReactQueryProvider>
          <body className={inter.className}>
            <AuthContainer>{children}</AuthContainer>
          </body>
        </ReactQueryProvider>
      </ReduxProvider>
    </html>
  );
}
