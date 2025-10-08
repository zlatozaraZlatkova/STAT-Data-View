# STAT-DATA-VIEW

A dynamic tool for visualizing statistical data with Chart.js, powered by the Eurostat API. It provides interactive charts for economic indicators, with robust data processing and a clean, maintainable architecture.

**Demo Site**: [View Live Application](https://stat-data-view.netlify.app/dashboard)

![Dashboard Page](screenshots/dashboard-with-data.png)

## Table of Contents

- [Features](#features)
- [Technology Stack](#technology-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Development](#development)
- [Project Architecture](#project-architecture)
- [API Documentation](#api-documentation)
- [Testing](#testing)
- [Deployment](#deployment)
- [License](#license)

## Features

### Data Visualization

- **Multi-axis Charts** - Visualize different economic indicators with separate scales (e.g., percentages vs. absolute values) on a single diagram
- **Interactive Charts** - Built with Chart.js for dynamic and responsive data visualization
- **Real-time Data** - Direct integration with Eurostat API for up-to-date statistical information

### Data Processing

- **Enhanced API Parameter Handling** - Improved processing of input parameters for Eurostat API requests to ensure accurate data retrieval
- **Mapping Layer** - Converts Eurostat API responses into an internal format optimized for Chart.js visualizations
- **Robust Data Transformation** - Reliable pipeline for data normalization, handling missing values, and format adaptation
  
### Global Error Handling

- **Centralized Error Control** – A unified system that detects and manages errors across the entire application, ensuring consistent and reliable behavior  
- **Smart Interception** – All HTTP and runtime errors are automatically captured before they reach the user interface  
- **ErrorHandlingService** – Processes, classifies, and formats error messages so they can be handled gracefully  
- **User-friendly Notifications** – Clear and non-intrusive messages are displayed using the ngx-toastr library, providing instant feedback to users without interrupting their workflow
- **Improved Stability** – Prevents unexpected crashes, simplifies debugging, and keeps the application running smoothly under all conditions  

**Flow:** `Interceptor → ErrorHandlingService → AppComponent → Toaster`


### RSS Feed Integration

- **Real-time News Updates** - Converts XML RSS feeds into JSON and exposes them through reactive streams
- **RxJS Powered** - Keeps news items up to date with RxJS observables
- **Seamless Navigation** - Smooth navigation to both internal pages and external article links
- **Client-side Pagination** - Efficient navigation through large datasets by splitting results into manageable pages directly in the browser, improving usability and performance  
- **Search Functionality** - Dynamic filtering of displayed data based on user input, providing instant and responsive results without additional API requests  

### Application Preview

<details>
<summary>Click to view screenshots</summary>

![Dashboard Page](screenshots/dashboard-with-data.png)
_Dashboard with statistical data visualization_

![RSS News Page](screenshots/rss-news.png)
_RSS news feed integration_

![404 Page](screenshots/page-not-found.png)
_Custom 404 error page_

</details>

## Technology Stack

<details>
<summary>Click to expand</summary>

### Frontend

- **Framework:** Angular  
- **Language:** TypeScript  
- **UI Components:** Angular Material  
- **Charts:** Chart.js with ng2-charts  
- **State Management:** RxJS  
- **Styling:** Tailwind CSS  
- **HTTP Client:** Angular HttpClient  
- **XML Parsing:** fast-xml-parser  
- **Pagination:** NGX Pagination  
- **Toastr:** NGX-Toastr

### Development Tools

- **Package Manager:** npm  
- **Build Tool:** Angular CLI  
- **Testing:** Jasmine & Karma  
- **Proxy Middleware:** http-proxy-middleware  
- **CSS Processing:** PostCSS + Autoprefixer  

### External APIs

- **Eurostat REST API** – Source of statistical data  
- **RSS Feeds** – News integration (XML → JSON conversion)

</details>


## Installation

<details>
<summary>Click to expand</summary>

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/stat-data-view.git
cd stat-data-view
```

2. **Install dependencies**

```bash
cd client
npm install
```

</details>

## Development

<details>
<summary>Click to expand</summary>

### Running the Development Server

From the project root:

```bash
npm start
```

This will start the Angular development server at `http://localhost:4200`

The application will automatically reload if you change any of the source files.

### API Proxy Configuration

All API requests from the frontend are automatically proxied through the Angular proxy configuration (`proxy.conf.json`).

**Example:**

```typescript
// In your Angular service
const response = await this.http.get("/api/rss-news");
```

This request is automatically forwarded to:

```
http://localhost:4200/api/rss-news
```

</details>

## Project Architecture

<details>
<summary>Click to expand</summary>

### High-Level Overview

The application follows Angular's best practices with a clear modular structure:

```
STAT-Data-View/
├── client/
│   └── src/
│       ├── app/
│       │   ├── core/          # Singleton services, guards
│       │   ├── features/      # Feature modules (lazy-loaded)
│       │   ├── shared/        # Reusable components
│       │   ├── interfaces/    # TypeScript interfaces
│       │   └── layout/        # Layout components
│       ├── assets/            # Static assets
│       └── environments/      # Environment configurations
```

### Module Structure

```
App Module
├── Core Module (singleton)
│   ├── Header
│   ├── Footer
│   ├── Page Not Found
│   ├── Config
│   ├── Interceptors
│   └── Services
├── Features Module
│   └── Source Data Module
│       ├── Chart
│       ├── Dashboard
│       ├── Data Table
│       ├── Metric Card
│       └── RSS News List
└── Shared Module
    ├── Custom Button
    ├── Pagination
    ├── Pipes
    ├── Recent Updates
    ├── RSS News
    ├── Select Menu
    ├── Sidebar
    ├── Search Box
    └── Utilities
```

### Data Flow

```
┌─────────────────────────────────────────────────┐
│              App Component                      │
└──────────────────┬──────────────────────────────┘
                   │
        ┌──────────┼──────────┐
        │          │          │
   ┌────▼───┐ ┌───▼────┐ ┌──▼─────┐
   │  Core  │ │Features│ │ Shared │
   │ Module │ │ Module │ │ Module │
   └────┬───┘ └───┬────┘ └──┬─────┘
        │         │          │
        │    ┌────▼─────┐    │
        │    │  Source  │    │
        │    │   Data   │◄───┤
        │    │  Module  │    │
        │    └────┬─────┘    │
        │         │          │
   ┌────▼─────────▼──────────▼────┐
   │        API Service            │
   └───────────────────────────────┘
```

### Architecture Principles

✅ **Modular Structure** - Clear separation of concerns  
✅ **Lazy Loading** - Feature modules loaded on demand  
✅ **Shared Components** - Reusable UI components  
✅ **Type Safety** - Full TypeScript coverage  
✅ **Reactive Programming** - RxJS for state management  
✅ **Clean Architecture** - Domain-driven design principles

</details>

## API Documentation

<details>
<summary>Click to expand</summary>

### Eurostat REST API

The application uses the EUROSTAT REST API for statistical data.

**Documentation:** [API Getting Started Guide](https://ec.europa.eu/eurostat/web/user-guides/data-browser/api-data-access/api-getting-started)

</details>

## Testing

<details>
<summary>Click to expand</summary>

### Unit Tests

Run unit tests with Karma:

```bash
npm test
```

### Code Coverage

Generate coverage report:

```bash
ng test --no-watch --code-coverage
```

Coverage reports are generated in `coverage/` directory.

</details>

## Deployment

<details>
<summary>Click to expand</summary>

### Production Build

```bash
npm run build
```

### Deployment Options

#### Netlify (Current)

The application is deployed on Netlify: [stat-data-view.netlify.app](https://stat-data-view.netlify.app/dashboard)

</details>


## License

<details>
<summary>Click to expand</summary>
  
This work is licensed under the **Creative Commons Attribution-NonCommercial 4.0 International License**.

### You may:

- ✅ **Share** - Copy and redistribute the material in any medium or format
- ✅ **Adapt** - Remix, transform, and build upon the material

### Under the following terms:

- **Attribution** - You must give appropriate credit, provide a link to the license, and indicate if changes were made
- **NonCommercial** - You may not use the material for commercial purposes

No additional restrictions - You may not apply legal terms or technological measures that legally restrict others from doing anything the license permits.

For full license text, visit: [https://creativecommons.org/licenses/by-nc/4.0/](https://creativecommons.org/licenses/by-nc/4.0/)

---

**Made with ❤️ by Zlatozara Zlatkova**

_Last updated: September 2025_

</details>
