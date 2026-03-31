import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import DashboardNav from "./layoutComponents/dashboardNav/DashboardNav";
import Sidebar from "./layoutComponents/Sidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Dashboard",
  description: "Dashboard Page",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="drawer lg:drawer-open">
          <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content">
            {/* Navbar */}
            <DashboardNav />
            {/* Page content here */}
            <div className="p-4">{children}</div>
          </div>

          <Sidebar />
        </div>

      </body>
    </html>
  );
}
