const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"

class ApiService {
  private getAuthHeaders() {
    const token = localStorage.getItem("token")
    return {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    }
  }

  private async handleResponse(response: Response) {
    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: "Network error" }))
      throw new Error(error.error || `HTTP ${response.status}`)
    }
    return response.json()
  }

  // Authentication
  async login(credentials: { username: string; password: string }) {
    const response = await fetch(`${API_BASE_URL}/api/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    })
    return this.handleResponse(response)
  }

  async register(userData: { username: string; email: string; password: string }) {
    const response = await fetch(`${API_BASE_URL}/api/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    })
    return this.handleResponse(response)
  }

  async getProfile() {
    const response = await fetch(`${API_BASE_URL}/api/profile`, {
      headers: this.getAuthHeaders(),
    })
    return this.handleResponse(response)
  }

  async changePassword(passwords: { old_password: string; new_password: string }) {
    const response = await fetch(`${API_BASE_URL}/api/change-password`, {
      method: "PATCH",
      headers: this.getAuthHeaders(),
      body: JSON.stringify(passwords),
    })
    return this.handleResponse(response)
  }

  // Customer API
  async customerLogin(credentials: { email: string; phone: string }) {
    const response = await fetch(`${API_BASE_URL}/api/customer/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    })
    return this.handleResponse(response)
  }

  async customerRegister(customerData: { name: string; email: string; phone: string }) {
    const response = await fetch(`${API_BASE_URL}/api/customer/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(customerData),
    })
    return this.handleResponse(response)
  }

  async getCustomerProfile() {
    const response = await fetch(`${API_BASE_URL}/api/customer/profile`, {
      headers: this.getAuthHeaders(),
    })
    return this.handleResponse(response)
  }

  async updateCustomerProfile(customerId: number, customerData: { name: string; email: string; phone: string }) {
    const response = await fetch(`${API_BASE_URL}/api/customer/${customerId}`, {
      method: "PATCH",
      headers: this.getAuthHeaders(),
      body: JSON.stringify(customerData),
    })
    return this.handleResponse(response)
  }

  // Rooms API
  async getRooms(params?: { type?: string; min_price?: string; max_price?: string }) {
    const searchParams = new URLSearchParams()
    if (params?.type) searchParams.set("type", params.type)
    if (params?.min_price) searchParams.set("min_price", params.min_price)
    if (params?.max_price) searchParams.set("max_price", params.max_price)

    const response = await fetch(`${API_BASE_URL}/api/rooms?${searchParams.toString()}`)
    return this.handleResponse(response)
  }

  async getRoomById(id: string) {
    const response = await fetch(`${API_BASE_URL}/api/rooms/${id}`)
    return this.handleResponse(response)
  }

  async createRoom(roomData: any) {
    const response = await fetch(`${API_BASE_URL}/api/rooms`, {
      method: "POST",
      headers: this.getAuthHeaders(),
      body: JSON.stringify(roomData),
    })
    return this.handleResponse(response)
  }

  async updateRoom(roomId: number, roomData: any) {
    const response = await fetch(`${API_BASE_URL}/api/rooms/${roomId}`, {
      method: "PUT",
      headers: this.getAuthHeaders(),
      body: JSON.stringify(roomData),
    })
    return this.handleResponse(response)
  }

  async deleteRoom(roomId: number) {
    const response = await fetch(`${API_BASE_URL}/api/rooms/${roomId}`, {
      method: "DELETE",
      headers: this.getAuthHeaders(),
    })
    return this.handleResponse(response)
  }

  // Bookings API
  async getBookings() {
    const response = await fetch(`${API_BASE_URL}/api/bookings`, {
      headers: this.getAuthHeaders(),
    })
    return this.handleResponse(response)
  }

  async createBooking(bookingData: { room_id: string; check_in: string; check_out: string }) {
    const response = await fetch(`${API_BASE_URL}/api/bookings`, {
      method: "POST",
      headers: this.getAuthHeaders(),
      body: JSON.stringify(bookingData),
    })
    return this.handleResponse(response)
  }

  async payBooking(bookingId: string, paymentData: { method: string }) {
    const response = await fetch(`${API_BASE_URL}/api/bookings/${bookingId}/pay`, {
      method: "PATCH",
      headers: this.getAuthHeaders(),
      body: JSON.stringify(paymentData),
    })
    return this.handleResponse(response)
  }

  async cancelBooking(bookingId: string) {
    const response = await fetch(`${API_BASE_URL}/api/bookings/${bookingId}/cancel`, {
      method: "PATCH",
      headers: this.getAuthHeaders(),
    })
    return this.handleResponse(response)
  }

  // Admin API
  async getCustomers() {
    const response = await fetch(`${API_BASE_URL}/api/customers`, {
      headers: this.getAuthHeaders(),
    })
    return this.handleResponse(response)
  }

  async getAdminOverview() {
    const response = await fetch(`${API_BASE_URL}/api/admin/overview`, {
      headers: this.getAuthHeaders(),
    })
    return this.handleResponse(response)
  }

  async promoteUser(userId: number) {
    const response = await fetch(`${API_BASE_URL}/api/admin/promote/${userId}`, {
      method: "PATCH",
      headers: this.getAuthHeaders(),
    })
    return this.handleResponse(response)
  }

  async demoteUser(userId: number) {
    const response = await fetch(`${API_BASE_URL}/api/admin/demote/${userId}`, {
      method: "PATCH",
      headers: this.getAuthHeaders(),
    })
    return this.handleResponse(response)
  }
}

export const apiService = new ApiService()
