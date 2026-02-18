import "@radix-ui/themes/styles.css";
import "@/app/globals.css";
import { Theme } from "@radix-ui/themes";
import Navbar from "@/components/NavBar";
import ContextProvider from "@/context/GlobalContext";
import { Toaster } from "sonner";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <ContextProvider>
        <body>
          <Navbar />
          <Theme appearance={"dark"}>{children}</Theme>
          <Toaster />
        </body>
      </ContextProvider>
    </html>
  );
}
