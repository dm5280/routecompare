import type { Metadata } from "next";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";

import { montserrat } from "$/constants/theme";
import { MainLayout } from "$/layouts/MainLayout";

export const metadata: Metadata = {
  title: "Explore Routes",
  description: "",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <AppRouterCacheProvider>
          <MainLayout>{children}</MainLayout>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
