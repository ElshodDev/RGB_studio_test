# RGB Studio Test Project

CRM tizimi - Mijozlar va bitimlarni boshqarish uchun web ilova.

## Loyiha Tuzilishi

```
rgb-studio-test/
├── server/          # NestJS Backend
└── client/          # Next.js Frontend
```

## Texnologiyalar

**Backend:**
- NestJS
- Prisma ORM
- PostgreSQL
- JWT Authentication

**Frontend:**
- Next.js 16
- TailwindCSS
- ShadCN/ui
- TanStack Query
- Axios

## O'rnatish

### Backend

```bash
cd server
npm install

# .env faylini sozlang
cp .env.example .env

# Prisma migratsiyalarini ishga tushiring
npx prisma migrate dev

# Serverni ishga tushiring
npm run start:dev
```

### Frontend

```bash
cd client
npm install

# .env.local faylini sozlang
cp .env.example .env.local

# Frontend'ni ishga tushiring
npm run dev
```

## API Endpointlar

- `POST /auth/login` - Kirish
- `POST /auth/register` - Ro'yxatdan o'tish
- `GET /auth/me` - Joriy foydalanuvchi
- `GET /clients` - Mijozlar ro'yxati
- `POST /clients` - Mijoz qo'shish
- `GET /deals` - Bitimlar ro'yxati
- `POST /deals` - Bitim qo'shish

## Foydalanuvchi Rollari

- **ADMIN** - Admin paneliga kirish huquqi (qora fon)
- **USER** - Oddiy foydalanuvchi sahifasi

## AI Yordami

Ushbu loyihada quyidagi AI instrumentlari ishlatildi:
- **GitHub Copilot** - Kod yozishda yordam
- **ChatGPT** - Arxitektura rejalashtirish va muammolarni yechish

## Deploy

- Backend: [Render/Railway](https://your-backend-url.com)
- Frontend: [Vercel](https://your-frontend-url.com)
