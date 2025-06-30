# GV Crocs - Minimal Website

A minimal, responsive website built with HTML, Tailwind CSS (via CDN), and vanilla JavaScript. No build process required!

## Features

- ✅ **Fully Responsive** - Works on all devices
- ✅ **No Build Process** - Just HTML, CSS, and JS
- ✅ **Tailwind CSS** - Via CDN for instant styling
- ✅ **Modern Design** - Clean and professional look
- ✅ **Interactive Elements** - Mobile menu, smooth scrolling, form handling
- ✅ **Fast Loading** - Minimal dependencies

## Quick Start

### Option 1: Open directly in browser

Simply open `index.html` in your web browser. The website will work immediately since Tailwind CSS is loaded via CDN.

### Option 2: Run with local server (recommended)

```bash
# Start the local server
npm start

# Or if you don't have npm, use Node directly
node server.js
```

Then open http://localhost:3000 in your browser.

## File Structure

```
gv-crocs/
├── index.html          # Main HTML file
├── script.js           # JavaScript functionality
├── server.js           # Simple Node.js server
├── package.json        # Project configuration
└── README.md          # This file
```

## Customization

### Colors

The website uses custom colors defined in the Tailwind config:

- `crocs-green`: #00A651
- `crocs-blue`: #0066CC

You can modify these in the `<script>` tag in `index.html`.

### Content

Edit the HTML directly to change:

- Text content
- Images (replace placeholder divs)
- Contact information
- Product details

### Styling

All styling is done with Tailwind CSS classes. You can:

- Modify existing classes
- Add new Tailwind classes
- Use the custom color classes (`text-crocs-green`, `bg-crocs-blue`, etc.)

## Deployment

### Option 1: Static Hosting (Recommended)

Upload the files to any static hosting service:

- **Netlify**: Drag and drop the folder
- **Vercel**: Connect your GitHub repository
- **GitHub Pages**: Push to a repository and enable Pages
- **Firebase Hosting**: Use Firebase CLI
- **AWS S3**: Upload to an S3 bucket

### Option 2: Traditional Web Hosting

Upload all files to your web hosting provider's public directory.

### Option 3: Node.js Hosting

Deploy the `server.js` file to platforms like:

- **Heroku**: Push to Heroku Git
- **Railway**: Connect your repository
- **Render**: Deploy as a web service

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## Performance

This setup is optimized for performance:

- No build process = instant development
- Tailwind CDN = cached across sites
- Minimal JavaScript = fast loading
- No external dependencies = reliable

## Next Steps

To enhance this minimal setup, consider:

1. Adding real images and content
2. Implementing a contact form backend
3. Adding analytics (Google Analytics, etc.)
4. Setting up a custom domain
5. Adding SEO meta tags
6. Implementing a blog or CMS

## License

MIT License - feel free to use this template for your own projects!
