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

- **Framework:** Angular 16.2.x
- **Language:** TypeScript 5.1.3
- **UI Components:** Angular Material 16.2.14
- **Charts:** Chart.js 3.9.1 with ng2-charts 4.1.1
- **State Management:** RxJS 7.8.x
- **Styling:** CSS3 + Tailwind CSS 3.4.17
- **HTTP Client:** Angular HttpClient
- **XML Parser:** fast-xml-parser 5.2.5
- **NGX Pagination**: 6.0.3

### Development Tools

- **Package Manager:** npm
- **Build Tool:** Angular CLI 16.2.16
- **Testing:** Jasmine 4.6.0 & Karma 6.4.0
- **Proxy Middleware:** http-proxy-middleware 2.0.6
- **CSS Processing:** PostCSS 8.5.6 + Autoprefixer 10.4.21

### External APIs

- **Eurostat REST API** - Statistical data source
- **RSS Feeds** - News integration (XML to JSON)

</details>

## Prerequisites

<details>
<summary>Click to expand</summary>

Before you begin, ensure you have the following installed:

- **Node.js** >= 16.x (recommended: 18.x or 20.x)
- **npm** >= 8.x (comes with Node.js)
- **Git** (for cloning the repository)

**Compatible versions for this project:**

- Angular 16.2.x requires Node.js ^16.14.0 or ^18.10.0
- TypeScript 5.1.3

To verify your installations:

```bash
node --version
npm --version
git --version
```

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
npm run test:coverage
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

## Acknowledgments

<details>
<summary>Click to expand</summary>

- **Eurostat** for providing the statistical data API
- **Chart.js** for the excellent charting library
- **Angular Team** for the robust framework

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
