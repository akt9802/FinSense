# 💰 FinSense - Intelligent Financial Analysis Platform

[![Next.js](https://img.shields.io/badge/Next.js-15.5.5-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.1.0-blue?style=flat-square&logo=react)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-green?style=flat-square&logo=node.js)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green?style=flat-square&logo=mongodb)](https://www.mongodb.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)

FinSense is an intelligent and user-friendly financial analytics web platform that empowers users to make smarter spending decisions through comprehensive expense tracking, budget planning, and financial insights.

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Installation](#-installation)
- [Usage](#-usage)
- [API Documentation](#-api-documentation)
- [Database Schema](#-database-schema)
- [Contributing](#-contributing)
- [License](#-license)

## ✨ Features

### 🔐 **Authentication & Security**
- **User Registration & Login** with secure JWT authentication
- **Password encryption** using bcrypt hashing
- **Protected routes** with middleware authentication
- **Automatic token validation** and refresh handling

### 💸 **Expense Management**
- **Add Expenses** with categories, merchants, and notes
- **Recurring Expenses** setup and management
- **Update/Delete** existing expenses
- **Category-wise** expense organization (Food, Travel, Bills, Shopping, Entertainment, Others)
- **Date-wise** expense tracking

### 📊 **Budget Planning**
- **Monthly Budget Planning** with category-wise allocation
- **Budget vs Actual** spending analysis
- **Auto-distribute** budget across categories
- **Visual progress** tracking with percentage indicators
- **Budget remaining** calculations
- **Copy previous month** plans for convenience

### 👤 **User Profile**
- **Personal profile** management
- **Real-time data sync** from database
- **Profile picture** upload functionality
- **User preferences** and settings

### 📱 **User Experience**
- **Responsive design** for all device sizes
- **Modern UI/UX** with Tailwind CSS
- **Loading states** and error handling
- **Offline support** with localStorage fallback
- **Real-time feedback** and notifications

## 🛠️ Tech Stack

### **Frontend**
- **Next.js 15.5.5** - React framework with App Router
- **React 19.1.0** - UI library with hooks
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **React Icons** - Icon library
- **Geist Fonts** - Modern typography

### **Backend**
- **Node.js** - Runtime environment
- **Express.js 5.1.0** - Web application framework
- **MongoDB Atlas** - Cloud NoSQL database
- **Mongoose 8.19.1** - ODM for MongoDB
- **JWT** - Authentication tokens
- **bcrypt** - Password hashing
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

### **Development Tools**
- **ESLint** - Code linting and formatting
- **Turbopack** - Fast bundler for development
- **Nodemon** - Auto-restart development server

## 📁 Project Structure

```
FinSense/
│
├── 📁 backend/                    # Node.js/Express backend
│   ├── 📁 config/
│   │   └── db.js                 # MongoDB connection configuration
│   ├── 📁 middleware/
│   │   └── authenticate.js       # JWT authentication middleware
│   ├── 📁 models/
│   │   ├── userModel.js         # User schema with embedded expenses
│   │   └── planMonthModel.js    # Monthly budget planning schema
│   ├── 📁 routes/
│   │   ├── authRoutes.js        # Authentication (login/signup/profile)
│   │   ├── addExpense.js        # Add new expenses
│   │   ├── recurringExpense.js  # Manage recurring expenses
│   │   ├── updateRecurring.js   # Update existing expenses
│   │   └── planMonth.js         # Monthly budget planning
│   └── server.js                # Express server entry point
│
├── 📁 src/                       # Next.js frontend application
│   ├── 📁 app/                   # App Router directory
│   │   ├── 📁 dashboard/         # Protected dashboard routes
│   │   │   ├── 📁 addexpense/
│   │   │   │   └── page.tsx     # Add expense form
│   │   │   ├── 📁 planmonth/
│   │   │   │   └── page.tsx     # Monthly budget planning
│   │   │   ├── 📁 profile/
│   │   │   │   └── page.tsx     # User profile management
│   │   │   └── page.tsx         # Dashboard home
│   │   ├── 📁 login/
│   │   │   └── page.tsx         # Login form
│   │   ├── 📁 signup/
│   │   │   └── page.tsx         # Registration form
│   │   ├── layout.tsx           # Root layout with navigation
│   │   ├── page.tsx             # Landing page
│   │   └── globals.css          # Global styles
│   ├── 📁 components/           # Reusable React components
│   │   ├── Header.tsx           # Navigation header
│   │   └── Footer.tsx           # Site footer
│   └── 📁 models/               # TypeScript interfaces
│       └── Expense.ts           # Expense type definitions
│
├── 📁 public/                    # Static assets
│   ├── logo.svg                 # FinSense logo
│   ├── logo-mark.svg           # Brand mark
│   └── [other-assets]           # Icons and images
│
├── 📋 Configuration Files
├── package.json                 # Dependencies and scripts
├── tsconfig.json               # TypeScript configuration
├── next.config.ts              # Next.js configuration
├── tailwind.config.ts          # Tailwind CSS configuration
├── eslint.config.mjs           # ESLint configuration
├── postcss.config.mjs          # PostCSS configuration
├── .env                        # Environment variables
├── .gitignore                  # Git ignore rules
├── start-dev.ps1              # Windows development script
├── start-dev.sh               # Unix development script
└── README.md                   # Project documentation
```

## 🚀 Installation

### Prerequisites
- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **MongoDB Atlas** account (or local MongoDB)
- **Git** for version control

### 1. Clone the Repository
```bash
git clone https://github.com/akt9802/FinSense.git
cd FinSense
```

### 2. Install Dependencies
```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd backend
npm install
cd ..
```

### 3. Environment Setup
Create a `.env` file in the root directory:
```env
# Database Configuration
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/finsense

# JWT Secret (Use a secure random string in production)
JWT_SECRET=your-super-secure-jwt-secret-key

# Server Configuration (optional)
PORT=5000
NODE_ENV=development
```

### 4. Database Setup
1. **Create MongoDB Atlas Account** at [mongodb.com](https://www.mongodb.com/)
2. **Create a new cluster** and database named `finsense`
3. **Get connection string** and update `MONGO_URI` in `.env`
4. **Set up database user** with read/write permissions

### 5. Start Development Servers

#### Option 1: Manual Start
```bash
# Terminal 1: Start Backend
cd backend
node server.js

# Terminal 2: Start Frontend
npm run dev
```

#### Option 2: Use Development Scripts
```bash
# Windows (PowerShell)
.\start-dev.ps1

# Unix/Linux/Mac
./start-dev.sh
```

### 6. Access the Application
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000

## 🎮 Usage

### Getting Started
1. **Sign Up**: Create a new account with name, email, and password
2. **Login**: Access your dashboard with credentials
3. **Add Expenses**: Start tracking your spending
4. **Plan Budget**: Set monthly budgets for different categories
5. **Monitor Progress**: Track spending against your budget

### Dashboard Features
- **Overview**: View recent expenses and budget status
- **Add Expense**: Quick expense entry with categories
- **Plan Month**: Set and manage monthly budgets
- **Profile**: Update personal information

### Budget Planning Workflow
1. **Select Month**: Choose the month to plan
2. **Set Total Budget**: Enter your overall monthly budget
3. **Allocate Categories**: Distribute budget across expense categories
4. **Use Tools**: Auto-distribute or even-distribute options
5. **Save Plan**: Store your budget for tracking

## 📚 API Documentation

### Authentication Endpoints

#### POST /api/auth/signup
Register a new user
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword"
}
```

#### POST /api/auth/login
Authenticate user
```json
{
  "email": "john@example.com",
  "password": "securepassword"
}
```

#### GET /api/auth/profile
Get user profile (requires JWT token)
```
Headers: Authorization: Bearer <token>
```

### Expense Management Endpoints

#### POST /api/auth/add-expense
Add new expense (requires authentication)
```json
{
  "date": "2025-01-15",
  "amount": 25.99,
  "merchant": "Coffee Shop",
  "category": "Food",
  "notes": "Morning coffee",
  "recurring": false
}
```

#### GET /api/auth/expenses
Get user expenses (requires authentication)

#### PUT /api/auth/update-expense/:id
Update existing expense (requires authentication)

#### DELETE /api/auth/delete-expense/:id
Delete expense (requires authentication)

### Budget Planning Endpoints

#### POST /api/auth/plan-month
Create/update monthly budget plan
```json
{
  "month": "2025-01",
  "totalBudget": 2000,
  "categoryBudgets": {
    "Food": 400,
    "Travel": 300,
    "Bills": 600,
    "Shopping": 300,
    "Entertainment": 200,
    "Others": 200
  }
}
```

#### GET /api/auth/plan-month/:month
Get budget plan for specific month

#### GET /api/auth/plan-months
Get all budget plans for user

#### DELETE /api/auth/plan-month/:id
Delete budget plan

## 🗃️ Database Schema

### User Collection
```javascript
{
  _id: ObjectId,
  name: String (required),
  email: String (required, unique),
  password: String (required, hashed),
  expenses: [ExpenseSchema],
  createdAt: Date,
  updatedAt: Date
}
```

### Expense Schema (Embedded)
```javascript
{
  _id: ObjectId,
  date: String (required),
  amount: Number (required),
  merchant: String (required),
  category: String (required),
  notes: String (default: ''),
  recurring: Boolean (required)
}
```

### PlanMonth Collection
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: 'User', required),
  month: String (required), // Format: "YYYY-MM"
  totalBudget: Number (default: 0),
  categoryBudgets: {
    Food: Number (default: 0),
    Travel: Number (default: 0),
    Bills: Number (default: 0),
    Shopping: Number (default: 0),
    Entertainment: Number (default: 0),
    Others: Number (default: 0)
  },
  planned: [PlannedItemSchema], // For detailed planning
  createdAt: Date,
  updatedAt: Date
}
```

## 🔒 Security Features

- **Password Hashing**: bcrypt with salt rounds for secure password storage
- **JWT Authentication**: Stateless authentication with expiration
- **Input Validation**: Server-side validation for all inputs
- **CORS Configuration**: Controlled cross-origin resource sharing
- **Environment Variables**: Sensitive data stored securely
- **Route Protection**: Middleware-based route authentication

## 🎨 UI/UX Features

- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Modern Aesthetics**: Clean, professional interface
- **Loading States**: Smooth user experience with loading indicators
- **Error Handling**: User-friendly error messages and recovery options
- **Accessibility**: Semantic HTML and keyboard navigation support
- **Performance**: Optimized builds with Turbopack

## 🚧 Development

### Available Scripts
```bash
npm run dev          # Start development server with Turbopack
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint for code quality
```

### Code Structure Guidelines
- **Components**: Reusable UI components in `/src/components/`
- **Pages**: Route-based pages in `/src/app/`
- **Models**: TypeScript interfaces in `/src/models/`
- **Backend**: RESTful API structure with middleware
- **Styling**: Tailwind CSS with consistent design system

## 🔮 Future Enhancements

- **📊 Advanced Analytics**: Charts and graphs for spending insights
- **📧 Email Notifications**: Budget alerts and spending summaries
- **💳 Bank Integration**: Automatic expense import from bank APIs
- **📱 Mobile App**: React Native mobile application
- **🤖 AI Insights**: Machine learning for spending predictions
- **👥 Family Sharing**: Multi-user budget management
- **💰 Investment Tracking**: Portfolio management features
- **🏷️ Receipt Scanner**: OCR for automatic expense entry

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- **akt9802** - *Initial work* - [GitHub Profile](https://github.com/akt9802)

## 🙏 Acknowledgments

- **Next.js Team** for the amazing React framework
- **Tailwind CSS** for the utility-first CSS framework
- **MongoDB** for the flexible NoSQL database
- **Vercel** for deployment and hosting solutions

---

**Built with ❤️ for better financial management**
