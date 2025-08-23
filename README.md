# Canvas & Soul - Poetic Portfolio

A beautiful Tamil Christian artist portfolio website featuring art gallery, blog, and contact functionality.

## ✨ Features

- **Artistic Portfolio**: Showcase of paintings and artwork
- **Tamil Heritage**: Beautiful Tamil calligraphy and cultural content
- **Christian Faith**: Bible verses and spiritual inspiration
- **Blog System**: Full-featured blog with markdown support
- **Gallery Management**: Admin panel for artwork management
- **Contact Form**: Professional contact functionality
- **Responsive Design**: Mobile-friendly layout
- **Static Export**: Optimized for fast deployment

## 🚀 Quick Start

### Development
```bash
npm install
npm run dev
```

### Build for Production
```bash
npm run build
```

### Test Static Build Locally
```bash
npm run serve
```

## 🛠 Technology Stack

- **Framework**: Next.js 15.5.0 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Content**: Markdown with react-markdown
- **Deployment**: Static export for Netlify/Vercel

## 🎨 Artist Information

**Artist**: Banu  
**Heritage**: Tamil Nadu, India  
**Current Location**: New Jersey, USA  
**Focus**: Christian art with Tamil cultural influences  

## 🚀 Deployment

### Netlify Deployment
1. Connect your GitHub repository to Netlify
2. Build settings are automatically configured via `netlify.toml`
3. Node.js version is set to 18 via `.node-version`

### Manual Deployment
```bash
npm run build
# Upload the 'out' directory to your hosting provider
```

## 📝 Content Management

### Blog Posts
- Stored in `public/dynamic-blogs.json`
- Markdown content support
- Admin panel editing (development only)

### Gallery
- Stored in `public/gallery-data.json`
- Artwork metadata and images
- Admin panel management (development only)

## 👩‍🎨 About the Artist

Banu is a Tamil Christian artist originally from Tamil Nadu, India, now residing in New Jersey. Her work beautifully blends traditional Tamil artistic elements with contemporary Christian themes.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
