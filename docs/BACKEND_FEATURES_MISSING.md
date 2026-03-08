# Backend Features Missing - Baccouche Motors Frontend

This document lists all backend features and APIs required to fully integrate the Baccouche Motors frontend with a backend system. The frontend currently uses mock/static data for admin and customer sections.

---

## 1. Authentication & Authorization

| Feature | Description | Frontend Usage |
|---------|-------------|----------------|
| User registration | Create customer account | `/customer` sign-up flow |
| Login | Authenticate user (JWT or session) | `/admin`, `/customer` access |
| Logout | End session | Sidebar / header |
| Password reset | Request reset link, set new password | Profile / login page |
| Role-based access | `admin` vs `customer` roles | Protect `/admin/*` (admin only), `/customer/*` (authenticated) |
| Protected routes | Middleware to redirect unauthenticated users | `app/admin/layout.tsx`, `app/customer/layout.tsx` |

**Suggested endpoints:**
- `POST /api/auth/register` - Register customer
- `POST /api/auth/login` - Login (returns token/session)
- `POST /api/auth/logout` - Logout
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password` - Set new password (with token)
- `GET /api/auth/me` - Get current user (for protected routes)

---

## 2. Test Drive API

The test drive form (`components/forms/test-drive-form.tsx`) submits: `name`, `phone`, `email`, `model`, `preferredDate`, `timeSlot`.

| Endpoint | Method | Description | Used By |
|----------|--------|-------------|---------|
| Create test drive | `POST /api/test-drives` | Create new request | `/test-drive` page |
| List test drives | `GET /api/test-drives` | Admin: all; Customer: own (filtered by user) | Admin dashboard, Admin test-drives, Customer test-drives |
| Get one | `GET /api/test-drives/:id` | Fetch single request | Detail modal, admin/customer |
| Update status | `PATCH /api/test-drives/:id` | `status`: pending \| confirmed \| completed \| rejected | Admin: confirm, reject, mark completed |
| Cancel | `DELETE /api/test-drives/:id` | Cancel pending request | Customer: cancel action |

**Request body (POST):**
```json
{
  "name": "string",
  "phone": "string",
  "email": "string",
  "model": "string",
  "preferredDate": "string (ISO date)",
  "timeSlot": "string (morning | afternoon)"
}
```

**Response model:**
- `id`, `name`, `email`, `phone`, `model`, `preferredDate`, `timeSlot`, `createdAt`, `status`, `userId` (optional, for customer filtering)

---

## 3. Contact API

The contact form (`components/forms/contact-form.tsx`) submits: `name`, `email`, `phone`, `subject`, `message`.

| Endpoint | Method | Description | Used By |
|----------|--------|-------------|---------|
| Create contact | `POST /api/contacts` | Create new message | `/contact` page |
| List contacts | `GET /api/contacts` | List all messages | Admin contacts page |
| Get one | `GET /api/contacts/:id` | Fetch single message | Admin detail view |
| Mark as read | `PATCH /api/contacts/:id` | `read: true` | Admin: mark read |
| Delete | `DELETE /api/contacts/:id` | Remove message | Admin: delete action |

**Request body (POST):**
```json
{
  "name": "string",
  "email": "string",
  "phone": "string (optional)",
  "subject": "string",
  "message": "string"
}
```

**Response model:**
- `id`, `name`, `email`, `phone`, `subject`, `message`, `createdAt`, `read` (boolean)

---

## 4. Cars API

Static data is in `lib/data/cars.ts`. Structure: `id`, `slug`, `name`, `model`, `year`, `price`, `image`, `description`, `specs`.

| Endpoint | Method | Description | Used By |
|----------|--------|-------------|---------|
| List cars | `GET /api/cars` | List all vehicles (with optional query params) | Public `/cars`, admin cars page |
| Get by slug | `GET /api/cars/slug/:slug` or `GET /api/cars?slug=bmw-serie-3` | Fetch single car | Public car detail page |
| Create car | `POST /api/cars` | Add new vehicle | Admin: "Ajouter un véhicule" |
| Update car | `PUT /api/cars/:id` or `PATCH /api/cars/:id` | Update vehicle | Admin: edit action |
| Delete car | `DELETE /api/cars/:id` | Remove vehicle | Admin: delete action |
| Image upload | `POST /api/cars/:id/image` or multipart in create/update | Upload car photo | Admin forms |

---

## 5. News API

Static data is in `lib/data/news.ts`. Structure: `slug`, `title`, `excerpt`, `content`, `date`, `image`.

| Endpoint | Method | Description | Used By |
|----------|--------|-------------|---------|
| List news | `GET /api/news` | List all articles | Public `/actualites`, admin news page |
| Get by slug | `GET /api/news/slug/:slug` or `GET /api/news?slug=...` | Fetch single article | Public article page |
| Create news | `POST /api/news` | Add new article | Admin: "Nouvel article" |
| Update news | `PUT /api/news/:id` or `PATCH /api/news/:id` | Update article | Admin: edit action |
| Delete news | `DELETE /api/news/:id` | Remove article | Admin: delete action |
| Image upload | Multipart in create/update | Upload article image | Admin forms |

**Optional:** `status: draft | published` for future publishing workflow.

---

## 6. Customer Profile API

The customer profile page (`app/customer/profile/page.tsx`) is a placeholder. Expected fields: `name`, `email`, `phone`, `address`.

| Endpoint | Method | Description | Used By |
|----------|--------|-------------|---------|
| Get profile | `GET /api/customers/me` | Get current user profile | Customer profile page |
| Update profile | `PATCH /api/customers/me` | Update name, phone, address | Customer profile form |
| Change password | `PATCH /api/customers/me/password` | `currentPassword`, `newPassword` | Profile: "Changer mot de passe" |

---

## 7. Other Backend Features

| Feature | Description | Notes |
|---------|-------------|-------|
| Email notifications | Send email on test drive submission, contact form submission, test drive confirmation | Improves UX and keeps customers informed |
| File upload service | Store car images, news images (S3, local storage, etc.) | Needed for admin create/edit flows |
| Admin user management | CRUD for admin users (optional) | For multi-admin setups |
| Dashboard analytics | Endpoints for stats: counts, trends | Used by admin dashboard stat cards |
| CORS configuration | Allow frontend origin | Required for API calls from Next.js |
| Rate limiting | Prevent abuse on contact, test drive forms | Recommended |
| Validation | Server-side validation for all inputs | Match frontend schemas (Zod) |

---

## Summary: Priority Order

1. **Authentication** – Required for admin and customer sections
2. **Test Drive API** – High traffic, form already built
3. **Contact API** – High traffic, form already built
4. **Cars API** – Read-only first; CRUD when admin forms are wired
5. **News API** – Read-only first; CRUD when admin forms are wired
6. **Customer Profile API** – After auth, when profile form is built
7. **Email + File upload** – Enhancements once core CRUD is in place
