import { ApiResponse } from "@/types/api"
import axiosInstance from "@/utils/axiosInstance"
import { Fundraise } from "@/types/fundraise"

interface FundraisesResponse {
  data: Fundraise[]
  current_page: number
  last_page: number
  per_page: number
  total: number
}

interface FetchFundraisesParams {
  page?: number
  per_page?: number
  sort_by?: "mostly_collected" | "created_at" | "deadline" | "price" // Add more options as needed
  sort_order?: "asc" | "desc"
}

export const fetchFundraise = async (id: number): Promise<Fundraise> => {
  const response = await axiosInstance.get<ApiResponse<Fundraise>>(`/fundraises/${id}`)
  return response.data.payload
}
export const fetchFundraises = async (params: FetchFundraisesParams = {}): Promise<FundraisesResponse> => {
  const response = await axiosInstance.get<ApiResponse<FundraisesResponse>>("/fundraises", { params })
  return response.data.payload
}

export const createFundraise = async (data: FormData): Promise<Fundraise> => {
  const response = await axiosInstance.post<ApiResponse<Fundraise>>("/fundraises", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  })
  return response.data.payload
}

export const updateFundraise = async (id: number, data: FormData): Promise<Fundraise> => {
  const response = await axiosInstance.post<ApiResponse<Fundraise>>(`/fundraises/${id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  })
  return response.data.payload
}

export const deleteFundraise = async (id: number): Promise<void> => {
  await axiosInstance.delete(`/fundraises/${id}`)
}
