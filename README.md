# Hotel Aqua

Website for Hotel Aqua, a hotel located in Kiten, Bulgaria — a beautiful seaside resort on the Black Sea coast.
The site presents the hotel's rooms, amenities, prices, and contact details, and allows guests to make booking inquiries online.

## Tech Stack

- **Next.js 15** — React framework with App Router
- **React 19** — UI library
- **Tailwind CSS v4** — Utility-first CSS framework
- **react-slick** — Carousel/slider component
- **W3.css** — External CSS framework (via CDN)
- **Font Awesome** — Icon library (via CDN)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Create production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

## Pages

| Route | Description |
|-------|-------------|
| `/` | Home page with hero slider and featured content |
| `/about` | About the hotel and the area |
| `/our_hotel` | Hotel facilities and amenities |
| `/prices` | Room pricing and packages |
| `/gallery` | Photo gallery with category filtering |
| `/contacts` | Contact information and location |
| `/booking` | Room booking form |

## Project Structure

```
src/
├── app/
│   ├── about/
│   ├── booking/
│   ├── contacts/
│   ├── gallery/
│   ├── our_hotel/
│   ├── prices/
│   ├── css/           # Custom styles
│   ├── layout.tsx     # Root layout
│   └── page.tsx       # Home page
├── components/
│   ├── Header.tsx
│   ├── Navigation.tsx
│   ├── Footer.tsx
│   ├── Slider.tsx
│   ├── BookingModal.tsx
│   └── ContactConfirmationModal.tsx
└── locales/           # i18n translations
```

## Features

- Responsive design for all devices
- Image carousel with smooth transitions
- Room booking form with validation
- Contact form with confirmation modal
- Photo gallery with category filtering
- Multi-language support (EN/BG)