
export interface ReadmeExample {
  id: string
  title: string
  description: string
  category: string
  stars: number
  author: string
  content: string
  githubUrl: string
}

export const readmeExamples: ReadmeExample[] = [
  {
    id: "react-app",
    title: "React Todo App",
    description: "A modern React application with TypeScript and Tailwind CSS",
    category: "Frontend",
    stars: 1250,
    author: "johndoe",
    githubUrl: "https://github.com/example/react-todo",
    content: `# React Todo App

A beautiful, responsive todo application built with React, TypeScript, and Tailwind CSS.

![Todo App Screenshot](https://via.placeholder.com/600x400?text=Todo+App+Screenshot)

## ✨ Features

- ✅ Add, edit, and delete todos
- 🎨 Beautiful UI with Tailwind CSS
- 📱 Fully responsive design
- 🌙 Dark/Light mode toggle
- 💾 Local storage persistence
- ⚡ Fast and lightweight

## 🚀 Quick Start

\`\`\`bash
# Clone the repository
git clone https://github.com/example/react-todo.git

# Navigate to project directory
cd react-todo

# Install dependencies
npm install

# Start development server
npm run dev
\`\`\`

## 🛠️ Built With

- **React 18** - UI Library
- **TypeScript** - Type Safety
- **Tailwind CSS** - Styling
- **Vite** - Build Tool
- **ESLint** - Code Linting

## 📦 Project Structure

\`\`\`
src/
├── components/
│   ├── TodoItem.tsx
│   ├── TodoList.tsx
│   └── AddTodo.tsx
├── hooks/
│   └── useTodos.ts
├── types/
│   └── todo.ts
└── App.tsx
\`\`\`

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (\`git checkout -b feature/AmazingFeature\`)
3. Commit your changes (\`git commit -m 'Add some AmazingFeature'\`)
4. Push to the branch (\`git push origin feature/AmazingFeature\`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Icons by [Lucide](https://lucide.dev/)
- Design inspiration from [Dribbble](https://dribbble.com/)
`,
  },
  {
    id: "node-api",
    title: "Node.js REST API",
    description: "A scalable REST API built with Node.js, Express, and MongoDB",
    category: "Backend",
    stars: 890,
    author: "apimaster",
    githubUrl: "https://github.com/example/node-api",
    content: `# Node.js REST API

A robust and scalable REST API built with Node.js, Express.js, and MongoDB.

## 🏗️ Architecture

This API follows RESTful principles and implements:

- **MVC Pattern** - Model-View-Controller architecture
- **JWT Authentication** - Secure user authentication
- **Rate Limiting** - API abuse prevention
- **Input Validation** - Data integrity
- **Error Handling** - Comprehensive error management

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn

### Installation

\`\`\`bash
# Clone repository
git clone https://github.com/example/node-api.git
cd node-api

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env

# Start MongoDB service
sudo systemctl start mongod

# Run development server
npm run dev
\`\`\`

### Environment Variables

\`\`\`env
NODE_ENV=development
PORT=3000
MONGODB_URI=mongodb://localhost:27017/myapp
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRE=30d
\`\`\`

## 📚 API Documentation

### Authentication

\`\`\`http
POST /api/auth/register
POST /api/auth/login
POST /api/auth/logout
GET  /api/auth/me
\`\`\`

### Users

\`\`\`http
GET    /api/users
GET    /api/users/:id
PUT    /api/users/:id
DELETE /api/users/:id
\`\`\`

### Example Request

\`\`\`javascript
// Register a new user
const response = await fetch('/api/auth/register', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    name: 'John Doe',
    email: 'john@example.com',
    password: 'securepassword123'
  })
});

const data = await response.json();
\`\`\`

## 🧪 Testing

\`\`\`bash
# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Run integration tests
npm run test:integration
\`\`\`

## 🚀 Deployment

### Using Docker

\`\`\`bash
# Build image
docker build -t node-api .

# Run container
docker run -p 3000:3000 --env-file .env node-api
\`\`\`

### Using PM2

\`\`\`bash
# Install PM2 globally
npm install -g pm2

# Start application
pm2 start ecosystem.config.js

# Monitor
pm2 monit
\`\`\`

## 📊 Performance

- **Response Time**: < 100ms average
- **Throughput**: 1000+ requests/second
- **Uptime**: 99.9%

## 🔒 Security Features

- Helmet.js for security headers
- Rate limiting with express-rate-limit
- Data sanitization
- XSS protection
- CORS configuration

## 📈 Monitoring

- Health check endpoint: \`GET /health\`
- Metrics endpoint: \`GET /metrics\`
- Logging with Winston

## 🤝 Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
`,
  },
  {
    id: "python-ml",
    title: "Machine Learning Project",
    description: "A comprehensive ML project with data analysis and model training",
    category: "Data Science",
    stars: 2100,
    author: "datascientist",
    githubUrl: "https://github.com/example/ml-project",
    content: `# Machine Learning Project: House Price Prediction

A comprehensive machine learning project that predicts house prices using various regression algorithms.

![ML Pipeline](https://via.placeholder.com/800x400?text=ML+Pipeline+Diagram)

## 🎯 Project Overview

This project demonstrates the complete machine learning workflow:

1. **Data Collection** - Gathering real estate data
2. **Data Preprocessing** - Cleaning and feature engineering
3. **Exploratory Data Analysis** - Understanding data patterns
4. **Model Training** - Multiple algorithm comparison
5. **Model Evaluation** - Performance metrics and validation
6. **Deployment** - REST API for predictions

## 📊 Dataset

- **Source**: Kaggle House Prices Dataset
- **Size**: 1,460 training samples, 1,459 test samples
- **Features**: 79 explanatory variables
- **Target**: Sale price of houses

### Key Features

- **Numerical**: LotArea, YearBuilt, TotalBsmtSF, GrLivArea
- **Categorical**: Neighborhood, HouseStyle, SaleType
- **Ordinal**: OverallQual, OverallCond, ExterQual

## 🛠️ Installation

### Using Conda

\`\`\`bash
# Create environment
conda create -n house-prices python=3.9
conda activate house-prices

# Install dependencies
conda install -c conda-forge pandas numpy scikit-learn matplotlib seaborn jupyter
pip install -r requirements.txt
\`\`\`

### Using pip

\`\`\`bash
# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\\Scripts\\activate

# Install dependencies
pip install -r requirements.txt
\`\`\`

## 📁 Project Structure

\`\`\`
├── data/
│   ├── raw/                 # Original datasets
│   ├── processed/           # Cleaned datasets
│   └── external/            # External data sources
├── notebooks/
│   ├── 01-data-exploration.ipynb
│   ├── 02-feature-engineering.ipynb
│   ├── 03-model-training.ipynb
│   └── 04-model-evaluation.ipynb
├── src/
│   ├── data/
│   │   ├── make_dataset.py
│   │   └── preprocess.py
│   ├── features/
│   │   └── build_features.py
│   ├── models/
│   │   ├── train_model.py
│   │   └── predict_model.py
│   └── visualization/
│       └── visualize.py
├── models/                  # Trained models
├── reports/                 # Analysis reports
├── requirements.txt
└── README.md
\`\`\`

## 🚀 Quick Start

### 1. Data Preparation

\`\`\`python
from src.data.make_dataset import load_data, clean_data
from src.features.build_features import engineer_features

# Load and clean data
df = load_data('data/raw/train.csv')
df_clean = clean_data(df)

# Feature engineering
df_features = engineer_features(df_clean)
\`\`\`

### 2. Model Training

\`\`\`python
from src.models.train_model import train_models

# Train multiple models
models = train_models(df_features)
\`\`\`

### 3. Make Predictions

\`\`\`python
from src.models.predict_model import predict

# Make predictions
predictions = predict(model, new_data)
\`\`\`

## 📈 Model Performance

| Model | RMSE | MAE | R² Score |
|-------|------|-----|----------|
| Linear Regression | 0.142 | 0.098 | 0.876 |
| Random Forest | 0.138 | 0.094 | 0.883 |
| XGBoost | **0.132** | **0.089** | **0.891** |
| LightGBM | 0.134 | 0.091 | 0.888 |

## 🔍 Key Insights

1. **Most Important Features**:
   - OverallQual (Overall material and finish quality)
   - GrLivArea (Above ground living area)
   - TotalBsmtSF (Total basement area)
   - YearBuilt (Original construction date)

2. **Data Insights**:
   - Strong correlation between house size and price
   - Neighborhood significantly impacts pricing
   - Recent renovations increase property value

## 📊 Visualizations

The project includes comprehensive visualizations:

- Correlation heatmaps
- Feature importance plots
- Residual analysis
- Learning curves
- Prediction vs actual scatter plots

## 🚀 Deployment

### REST API

\`\`\`bash
# Start the API server
python app.py
\`\`\`

### Example API Usage

\`\`\`python
import requests

# Prediction endpoint
response = requests.post('http://localhost:5000/predict', 
                        json={'features': [1500, 3, 2, 2000, 8]})
prediction = response.json()['price']
\`\`\`

## 🧪 Testing

\`\`\`bash
# Run all tests
pytest tests/

# Run with coverage
pytest --cov=src tests/
\`\`\`

## 📚 References

- [Kaggle House Prices Competition](https://www.kaggle.com/c/house-prices-advanced-regression-techniques)
- [Scikit-learn Documentation](https://scikit-learn.org/)
- [XGBoost Documentation](https://xgboost.readthedocs.io/)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see [LICENSE](LICENSE) for details.
`,
  },
  {
    id: "mobile-app",
    title: "React Native App",
    description: "Cross-platform mobile app with modern features",
    category: "Mobile",
    stars: 750,
    author: "mobiledev",
    githubUrl: "https://github.com/example/rn-app",
    content: `# React Native Fitness Tracker

A comprehensive fitness tracking app built with React Native and Expo.

<div align="center">
  <img src="https://via.placeholder.com/300x600?text=App+Screenshot+1" width="200" />
  <img src="https://via.placeholder.com/300x600?text=App+Screenshot+2" width="200" />
  <img src="https://via.placeholder.com/300x600?text=App+Screenshot+3" width="200" />
</div>

## ✨ Features

- 📊 **Activity Tracking** - Steps, distance, calories burned
- 🏃‍♂️ **Workout Logging** - Custom workouts and exercises
- 📈 **Progress Analytics** - Charts and statistics
- 🎯 **Goal Setting** - Daily and weekly targets
- 🏆 **Achievements** - Unlock badges and milestones
- 👥 **Social Features** - Share progress with friends
- 🌙 **Dark Mode** - Beautiful dark theme support
- 📱 **Cross Platform** - iOS and Android support

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- Expo CLI
- iOS Simulator or Android Emulator
- Physical device (optional)

### Installation

\`\`\`bash
# Clone the repository
git clone https://github.com/example/rn-fitness-tracker.git
cd rn-fitness-tracker

# Install dependencies
npm install

# Start the development server
npx expo start
\`\`\`

### Running on Device

\`\`\`bash
# iOS Simulator
npx expo start --ios

# Android Emulator
npx expo start --android

# Physical Device
# Scan QR code with Expo Go app
npx expo start
\`\`\`

## 🏗️ Tech Stack

- **React Native** - Mobile framework
- **Expo** - Development platform
- **TypeScript** - Type safety
- **React Navigation** - Navigation
- **Redux Toolkit** - State management
- **React Query** - Data fetching
- **Styled Components** - Styling
- **React Hook Form** - Form handling
- **Async Storage** - Local storage
- **Expo Sensors** - Device sensors

## 📁 Project Structure

\`\`\`
src/
├── components/           # Reusable components
│   ├── common/
│   ├── forms/
│   └── charts/
├── screens/             # Screen components
│   ├── auth/
│   ├── dashboard/
│   ├── workouts/
│   └── profile/
├── navigation/          # Navigation configuration
├── store/              # Redux store
│   ├── slices/
│   └── api/
├── services/           # API services
├── hooks/              # Custom hooks
├── utils/              # Utility functions
├── types/              # TypeScript types
└── constants/          # App constants
\`\`\`

## 🔧 Configuration

### Environment Variables

Create a \`.env\` file in the root directory:

\`\`\`env
API_BASE_URL=https://api.fitnesstracker.com
GOOGLE_MAPS_API_KEY=your_google_maps_key
ANALYTICS_KEY=your_analytics_key
\`\`\`

### App Configuration

\`\`\`javascript
// app.config.js
export default {
  expo: {
    name: "Fitness Tracker",
    slug: "fitness-tracker",
    version: "1.0.0",
    platforms: ["ios", "android"],
    icon: "./assets/icon.png",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff"
    }
  }
};
\`\`\`

## 📱 Features Deep Dive

### Activity Tracking

\`\`\`typescript
// Track user steps using device sensors
import { Pedometer } from 'expo-sensors';

const useStepCounter = () => {
  const [steps, setSteps] = useState(0);
  
  useEffect(() => {
    const subscription = Pedometer.watchStepCount(result => {
      setSteps(result.steps);
    });
    
    return () => subscription?.remove();
  }, []);
  
  return steps;
};
\`\`\`

### Workout Logging

\`\`\`typescript
// Custom workout creation
interface Workout {
  id: string;
  name: string;
  exercises: Exercise[];
  duration: number;
  caloriesBurned: number;
}

const createWorkout = async (workout: Workout) => {
  return await api.post('/workouts', workout);
};
\`\`\`

## 🧪 Testing

\`\`\`bash
# Run unit tests
npm test

# Run E2E tests with Detox
npm run test:e2e

# Run tests with coverage
npm run test:coverage
\`\`\`

## 📦 Building for Production

### iOS

\`\`\`bash
# Build for iOS
npx expo build:ios

# Or with EAS Build
eas build --platform ios
\`\`\`

### Android

\`\`\`bash
# Build APK
npx expo build:android -t apk

# Build AAB for Play Store
npx expo build:android -t app-bundle

# Or with EAS Build
eas build --platform android
\`\`\`

## 🚀 Deployment

### App Store Connect

1. Build iOS app with \`eas build\`
2. Upload to App Store Connect
3. Submit for review

### Google Play Console

1. Build Android AAB
2. Upload to Google Play Console
3. Submit for review

## 📊 Performance

- **Bundle Size**: < 50MB
- **Startup Time**: < 3 seconds
- **Memory Usage**: < 100MB average
- **Battery Impact**: Minimal background usage

## 🔒 Privacy & Security

- **Data Encryption**: All sensitive data encrypted
- **Biometric Auth**: Face ID / Fingerprint support
- **Privacy Policy**: Compliant with GDPR/CCPA
- **Secure Storage**: Keychain/Keystore integration

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (\`git checkout -b feature/amazing-feature\`)
3. Commit your changes (\`git commit -m 'Add amazing feature'\`)
4. Push to the branch (\`git push origin feature/amazing-feature\`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Expo Team](https://expo.dev/) for the amazing platform
- [React Native Community](https://reactnative.dev/) for continuous improvements
- [Unsplash](https://unsplash.com/) for beautiful stock photos
`,
  },
]