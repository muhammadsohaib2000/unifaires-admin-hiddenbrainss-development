"use client";

import { Providers } from "./provider";
import { Toaster } from "react-hot-toast";
import "remirror/styles/all.css"; // remirror css
import "./globals.css";
import "./styles/scrollbar.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { Suspense, useState } from "react";
import Header from "@/components/layouts/Header";
import Footer from "@/components/layouts/Footer";
import CustomLoader from "@/components/layouts/CustomLoader";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Toaster position="top-center" />
        <Providers>
          <AntdRegistry>
            <Suspense fallback={<CustomLoader />}>
              <Header />
              <div className="min-h-[75vh]">{children}</div>
              <Footer />
            </Suspense>
          </AntdRegistry>
        </Providers>
      </body>
    </html>
  );
}
