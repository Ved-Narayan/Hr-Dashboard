# 💼 HR Performance Dashboard

A modern, responsive HR management dashboard built with Next.js, TypeScript, and Tailwind CSS. This application provides comprehensive employee management, performance tracking, and analytics capabilities.

## Screenshots:
- **Dashboard**: ![image](https://github.com/user-attachments/assets/3806d998-13c4-4454-808f-60344ab6b9a1)
- **Bookmarks**: ![image](https://github.com/user-attachments/assets/7c471d50-b86a-4148-8674-56fd017315f7) , ![image](https://github.com/user-attachments/assets/79e2b85a-0736-42e8-9eeb-a1562743282f)
- **Analytics**: ![image](https://github.com/user-attachments/assets/67fec9db-8fae-4a18-9c12-666efa2650c4) , ![image](https://github.com/user-attachments/assets/5a0bc61e-fffb-4d33-b296-c8528dc0a813)
- **DarkTheme**: ![image](https://github.com/user-attachments/assets/8af84b49-106d-4138-a34c-af642c643339)


## ✨ Features

### 🏠 **Dashboard Homepage**
- **Employee Cards**: Display comprehensive employee information with profile pictures, ratings, and department badges
- **Real-time Data**: Fetches employee data from DummyJSON API with mock department and performance data
- **Interactive Cards**: Hover effects, animations, and quick action buttons
- **Responsive Grid**: Adaptive layout that works on all screen sizes


### 🔍 **Advanced Search & Filtering**
- **Smart Search**: Real-time search by name, email, or department
- **Multi-select Filters**: Filter by department and performance rating
- **Filter Badges**: Visual representation of active filters with easy removal
- **Results Counter**: Shows filtered vs total employee count

### 👤 **Dynamic Employee Details**
- **Detailed Profiles**: Complete employee information with contact details and address
- **Tabbed Interface**: Organized sections for Overview, Projects, and Feedback
- **Performance History**: Visual rating displays and historical performance data
- **Project Tracking**: Current projects with progress indicators
- **Feedback System**: Recent feedback with ratings and timestamps

### 📌 **Bookmark Management**
- **Save Employees**: Bookmark important employees for quick access
- **Persistent Storage**: Bookmarks saved in localStorage
- **Bulk Actions**: Promote, assign projects, or remove bookmarks
- **Empty State**: Helpful guidance when no bookmarks exist

### 📊 **Analytics Dashboard**
- **Performance Metrics**: Department-wise average ratings and employee counts
- **Interactive Charts**: Bar charts, pie charts, and line graphs using Recharts
- **Key Insights**: Automated insights about top performers and trends
- **Summary Cards**: Quick overview of total employees, ratings, and bookmarks

### 🎨 **Theme System**
- **Light/Dark Mode**: Complete theme switching with proper color schemes
- **System Theme**: Respects user's system preference
- **Smooth Transitions**: Animated theme changes
- **Persistent Preference**: Theme choice saved across sessions

### 📱 **Responsive Design**
- **Mobile-First**: Optimized for mobile devices
- **Tablet Support**: Perfect layout for tablet screens
- **Desktop Enhanced**: Full feature set on desktop
- **Touch-Friendly**: Large touch targets and intuitive gestures

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm

### Installation

1. **Clone the repository**
   \`\`\`bash
   git clone [<repository-url>](https://github.com/Ved-Narayan/Hr-Dashboard.git)
   cd hr-performance-dashboard
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   \`\`\`

3. **Run the development server**
   \`\`\`bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   \`\`\`

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

\`\`\`bash
npm run build
npm start
\`\`\`

## 🛠️ Tech Stack

### **Frontend Framework**
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **React 18** - Latest React features

### **Styling & UI**
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - High-quality React components
- **Lucide React** - Beautiful icon library
- **CSS Animations** - Custom animations and transitions

### **Data & State Management**
- **React Context API** - Global state management
- **Custom Hooks** - Reusable logic (useSearch, useBookmarks)
- **localStorage** - Persistent bookmark storage
- **DummyJSON API** - Mock employee data

### **Charts & Analytics**
- **Recharts** - Responsive chart library
- **Custom Analytics** - Performance metrics and insights

### **Development Tools**
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **TypeScript** - Static type checking

## 📁 Project Structure
![image](https://github.com/user-attachments/assets/7626c1c9-62cb-462a-820e-c71872cf4db1)


## 🎯 Key Features Implemented

### ✅ **Core Requirements**
- [x] Dashboard homepage with employee cards
- [x] Search and filter functionality
- [x] Dynamic employee detail pages
- [x] Bookmark management system
- [x] Analytics dashboard with charts
- [x] Responsive design
- [x] Dark/Light theme support

### ✅ **Advanced Features**
- [x] Custom hooks for state management
- [x] Reusable component architecture
- [x] Loading states and error handling
- [x] Smooth animations and transitions
- [x] Mobile-responsive navigation
- [x] Persistent bookmark storage
- [x] Interactive charts and analytics

### ✅ **Technical Excellence**
- [x] TypeScript for type safety
- [x] Next.js App Router
- [x] Component-level loading states
- [x] Error boundaries and handling
- [x] Accessibility best practices
- [x] Performance optimizations

## 📸 Screenshots

### 🏠 Dashboard Homepage
![Dashboard]
*Employee cards with search, filters, and interactive elements*

### 👤 Employee Details
![Employee Details]
*Detailed employee profiles with tabbed interface*

### 📊 Analytics Dashboard
![Analytics]
*Interactive charts and performance metrics*

### 📌 Bookmarks Management
![Bookmarks]
*Saved employees with bulk action capabilities*

### 🌙 Dark Mode
![Dark Mode]
*Complete dark theme with smooth transitions*

## 🔧 Configuration

### Environment Variables
No environment variables required for basic functionality. The app uses DummyJSON API for demo data.

### Customization
- **Departments**: Modify the \`departments\` array in components
- **Mock Data**: Adjust the data generation functions
- **Styling**: Customize Tailwind configuration
- **Charts**: Configure chart colors and data in analytics page


**Built with ❤️ using Next.js, TypeScript, and Tailwind CSS**
\`\`\`
