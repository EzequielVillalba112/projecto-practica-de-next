import "@radix-ui/themes/styles.css";
import "@/app/globals.css";
import { Theme } from "@radix-ui/themes";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body>
        <Theme appearance={"dark"}>{children}</Theme>
      </body>
    </html>
  );
}
