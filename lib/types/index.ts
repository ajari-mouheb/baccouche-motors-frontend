export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface CarsQueryParams {
  page?: number;
  limit?: number;
  make?: string;
  model?: string;
  yearMin?: number;
  yearMax?: number;
  priceMin?: number;
  priceMax?: number;
  slug?: string;
}

export interface Car {
  id: string;
  slug: string;
  name: string;
  model: string;
  make?: string;
  year: number;
  price?: string;
  image: string;
  images?: string[];
  description: string;
  specs?: Record<string, string>;
}

export interface TestDriveCreateLoggedIn {
  carId: string;
  scheduledAt: string;
  notes?: string;
}

export interface TestDriveCreateGuest {
  name: string;
  phone: string;
  email: string;
  model: string;
  preferredDate: string;
  timeSlot: "morning" | "afternoon";
}

export interface AuthRegisterDto {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
}

export interface UpdateUserDto {
  firstName?: string;
  lastName?: string;
  phone?: string;
  address?: string;
}

export interface NewsArticle {
  id?: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  image?: string;
}

export type TestDriveStatus =
  | "pending"
  | "confirmed"
  | "completed"
  | "cancelled"
  | "rejected";

export interface TestDrive {
  id: string;
  name: string;
  email: string;
  phone: string;
  model: string;
  preferredDate?: string;
  timeSlot?: string;
  createdAt: string;
  status: TestDriveStatus;
}

export interface Contact {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  read?: boolean;
  createdAt: string;
}

export interface DashboardStats {
  testDrivesCount?: number;
  testDrivesPending?: number;
  contactsCount?: number;
  carsCount?: number;
  newsCount?: number;
  recentTestDrives?: TestDrive[];
}
