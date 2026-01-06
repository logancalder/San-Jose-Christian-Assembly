# Gallery Directory

This directory contains photos for the church website gallery. The gallery page automatically displays all images from this directory and its subdirectories.

## Directory Structure

- `public/gallery/` - Main gallery directory
  - `events/` - Photos from church events
  - `worship/` - Photos from worship services
  - `community/` - Photos from community activities
  - (Add more categories as needed)

## How to Add Photos

1. Place image files (JPG, PNG, GIF, WEBP) directly in the main gallery directory or in one of the subdirectories.
2. The filename (without extension) will be used as the image title.
3. The subdirectory name will be used as the image category.

## Naming Conventions

- Use descriptive filenames with hyphens instead of spaces (e.g., `sunday-service-2023.jpg`)
- The filename will be converted to a title by replacing hyphens with spaces
- For example, `sunday-service-2023.jpg` will be displayed as "sunday service 2023"

## Supported Image Formats

- JPG/JPEG
- PNG
- GIF
- WEBP

## Image Optimization

For best performance, optimize your images before uploading:

1. Resize large images to a reasonable size (e.g., 1200px width for full-width images)
2. Compress images to reduce file size while maintaining quality
3. Consider using WebP format for better compression

## Example

```
public/gallery/
├── events/
│   ├── summer-camp-2023.jpg
│   └── youth-retreat-2023.jpg
├── worship/
│   ├── sunday-service-2023.jpg
│   └── choir-performance-2023.jpg
└── community/
    ├── food-drive-2023.jpg
    └── volunteer-day-2023.jpg
```

In this example:

- "summer-camp-2023.jpg" will be displayed with the title "summer camp 2023" in the "events" category
- "sunday-service-2023.jpg" will be displayed with the title "sunday service 2023" in the "worship" category
