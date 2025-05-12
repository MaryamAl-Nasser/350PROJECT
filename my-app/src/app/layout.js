import { Geist, Geist_Mono, Linden_Hill } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Student Management Application",
  description: "my project",
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <nav style={{width: "100%", background: "#2d0814", fontSize: "18px", display: "flex" , justifyContent: "center" , alignItems: "center"} }>
          <Link href="/instructor" style={{color: "white"} }>Instructor</Link>
          <Link href="/admin" style={{color: "white"} }>Course</Link>
          <Link href="/admin/statistics" style={{color: "white"} }>Students Per Year</Link>
          <Link href="/admin/statistics2/top-courses" style={{color: "white"} }>Top Courses</Link>
          <Link href="/admin/statistics3/failure-rate" style={{color: "white"} }>Failure Rate</Link>
          <Link href="/admin/statistics4/course-category" style={{color: "white"} }>Course Categories</Link>
          <Link href="/create-course" style={{color: "white"} }>Add New Course</Link>


          
          
        </nav>
        {children}
      </body>
    </html>
  );
}
