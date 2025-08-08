# Authenticated TODO List App

This is a full-stack web application where users can manage personal tasks after signing in with their Google account. The app securely stores each user's tasks in a backend database and ensures only authenticated users can access and manage their own data.

---

## 🚀 Features

- 🔐 **Google OAuth2 Login** (using `angular-oauth2-oidc`)
- ✅ **JWT-secured REST API** (validated using Spring Security)
- 🧾 **User-specific task management**
- 🧠 **Reactive Angular frontend** with signals and standalone components
- 🌐 **CORS-compliant communication** between frontend and backend
- 🗃️ **Persistent storage** using a database (e.g., MySQL)

---

## 🧱 Tech Stack

### 🔧 Frontend (Angular)
- Angular 17+ with standalone components
- `angular-oauth2-oidc` for authentication
- Signal-based state management
- API communication via `HttpClient`

### 🔧 Backend (Spring Boot)
- Spring Web
- Spring Security (as an OAuth2 Resource Server)
- JWT verification using Google's public keys
- Custom `CorsConfigurationSource`
- User-based task filtering
- REST endpoints for CRUD operations

---

## 🧪 How It Works

1. User logs in with Google through Angular frontend.
2. Access token (JWT) is stored client-side and sent in every request.
3. Backend validates the token using Google's JWKS endpoint.
4. User's email is extracted from the token and used to filter tasks.
5. User can create, read, and delete only **their** tasks.

---

## 🔐 Security

- JWT tokens are validated using:
  ```java
  .oauth2ResourceServer(oauth2 -> oauth2.jwt(...))
  ```
- Only authenticated users can access non-public endpoints.
- Each task is associated with a user's email and filtered server-side.

---

## 🧳 Setup Instructions

### 1. Backend

```bash
cd backend
./mvnw spring-boot:run
```

Make sure you:
- Set up your database (e.g., MySQL)
- Add your OAuth2 configuration (Google client ID)
- Allow traffic from `http://localhost:4200` in CORS config

### 2. Frontend

```bash
cd frontend
npm install
npm start
```

Update `authConfig` in your Angular service with your **Google OAuth client ID**.

---

## 🧩 Environment Variables

**Frontend (Angular)**:
- Google OAuth Client ID in `authConfig`

**Backend (Spring Boot)**:
- Database credentials
- Google issuer URI (default is `https://accounts.google.com`)

---

## 📌 Notes

- Only the authenticated user can see their own tasks.
- Tokens are passed in the `Authorization` header as:
  ```
  Authorization: Bearer <access_token>
  ```
- Supports pagination and user-specific filtering (backend-ready).

---

## 📷 Demo



---
