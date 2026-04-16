# Spendify - Laravel + Inertia React

Dự án quản lý chi tiêu và nội dung, xây dựng trên Laravel 12 + Inertia React.

## Công nghệ chính

- PHP 8.2+ (khuyến nghị 8.4)
- Laravel 12
- Inertia.js v2 + React 19
- Vite
- Tailwind CSS v4
- Pest

## Thiết lập nhanh (2 cách)

### Cách 1: Thiết lập bằng một lệnh

```bash
composer run setup
```

Lệnh này sẽ tự động:

- `composer install`
- tạo `.env` nếu chưa có
- `php artisan key:generate`
- `php artisan migrate --force`
- `npm install`
- `npm run build`

### Cách 2: Thiết lập thủ công

```bash
composer install
cp .env.example .env
php artisan key:generate
```

Nếu dùng SQLite local:

```bash
touch database/database.sqlite
```

Sau đó chạy migrate + seed:

```bash
php artisan migrate --seed
```

Cài dependencies cho frontend:

```bash
npm install
```

## Chạy dự án

### Dev full stack (khuyến nghị)

```bash
composer run dev
```

Lệnh này chạy cùng lúc:

- Laravel server
- Queue worker
- Laravel Pail logs
- Vite dev server

### Chạy riêng lẻ

Backend:

```bash
php artisan serve --host=0.0.0.0 --port=8000
```

Frontend:

```bash
npm run dev
```

## Live demo

### Local live demo

- Trang chủ: http://127.0.0.1:8000
- User: http://127.0.0.1:8000/user/dashboard
- Admin: http://127.0.0.1:8000/admin/dashboard

Nếu bạn không thấy thay đổi frontend, hãy đảm bảo `npm run dev` đang chạy.

### Production live demo

- Trang chủ: coming soon...
- User: coming soon...
- Admin: coming soon...

## Tài khoản demo

Sau khi chạy `php artisan migrate --seed`, dự án tạo tài khoản demo:

- Email: `test@example.com`
- Password: `password`

Nguồn: seeder tại `database/seeders/DatabaseSeeder.php` và factory tại `database/factories/UserFactory.php`.

## Test

Chạy nhanh:

```bash
php artisan test --compact
```

## Build production

```bash
npm run build
php artisan optimize
```

## Ghi chú

- Dự án đang dùng các migration đã tinh gọn để bám sát model hiện tại.
- Các bảng base như `users`, `cache`, `jobs`, `roles/permissions` được giữ lại.
