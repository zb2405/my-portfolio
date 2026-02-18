import "./globals.css";
import Sidebar from "../components/Navbar/Sidebar";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-200">
        <Sidebar />
        {children}

        <script
          defer
          src="/umami/script.js"
          data-website-id="2f6b943e-a310-45b8-b974-7dfc6a652293"
        ></script>
      </body>
    </html>
  );
}
