"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { ThemeProvider } from "../../../contexts/theme-context"
import Navbar from "../../../components/navbar"
import AdminRoomsPage from "../../../pages/admin-rooms-page"
import { apiService } from "../../../services/api"

export default function AdminRoomsPageWrapper() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      apiService
        .getProfile()
        .then((userData) => {
          if (!userData.is_admin) {
            router.push("/")
            return
          }
          setUser(userData)
        })
        .catch(() => {
          localStorage.removeItem("token")
          router.push("/login")
        })
        .finally(() => setLoading(false))
    } else {
      router.push("/login")
    }
  }, [router])

  if (loading) {
    return (
      <ThemeProvider>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 dark:border-blue-400 mx-auto"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">Loading...</p>
          </div>
        </div>
      </ThemeProvider>
    )
  }

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navbar user={user} />
        <AdminRoomsPage />
      </div>
    </ThemeProvider>
  )
}
