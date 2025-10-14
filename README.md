src/
 ├─ app/ hoặc pages/         
 ├─ components/              # UI components tái sử dụng
 ├─ features/                # Tách theo tính năng (modular)
 │   ├─ auth/
 │   │   ├─ components/
 │   │   ├─ hooks/
 │   │   ├─ services/
 │   │   └─ types.ts
 │   ├─ dashboard/
 │   └─ ...
 ├─ layouts/                 # Layouts chung
 ├─ hooks/                   # Custom hooks dùng chung
 ├─ lib/                     # Helper, utils, constants
 ├─ services/                # API clients (axios/fetch wrapper)
 ├─ store/                   # Zustand / Redux / Recoil (nếu dùng)
 ├─ styles/                  # Global CSS, Tailwind config
 ├─ types/                   # Global types/interfaces
 └─ config/                  # Env, constants, routes
