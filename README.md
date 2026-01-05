# Shoply - Modern E-commerce Store

Shoply is a modern, responsive e-commerce store built with Next.js 14, TypeScript, and Tailwind CSS.  
The project focuses on clean architecture, usability, accessibility, and real-world features.

---

##  Features

### Core Features
- Product listing with responsive grid layout
- Product detail pages
- Shopping cart with localStorage persistence
- Category and price filtering
- Fully responsive design

### Bonus Features Implemented
- Text search with debouncing
- URL query parameter persistence for filters (shareable links)
- Shopping cart drawer with quantity controls
- Comprehensive test suite (17 passing tests)

---

## 🛠 Tech Stack & Design Choices

### Framework
- **Next.js 14 (App Router)**  
  Chosen for modern routing, server/client component separation, and scalability.

### Language
- **TypeScript**  
  Used to ensure type safety, reduce runtime errors, and improve maintainability.

### Styling
- **Tailwind CSS**  
  Enables rapid UI development with consistent design and responsive utilities.

### State Management
- **React Context + localStorage**  
  Used for cart state to keep the solution simple and lightweight without external libraries.
  Cart data persists across page reloads using `localStorage`.

### Data Loading
- Products are fetched from a local API route (`/api/products`)
- Filtering and searching are handled client-side
- Filter state is synced with URL query parameters

### Testing
- **Jest + Testing Library**
- Unit tests cover cart logic and core functionality
- All tests are passing

---

##  How to Run the Project

### 1. Install dependencies
```bash
npm install
 ```
### 2.Run the development server
```bash
npm run dev
```
Then open:
 http://localhost:3000

 Running Tests
```bash
npm test
```

With coverage:
```bash
npm run test:coverage
```
