#  Fitly — AI-Powered Fashion Stylist

Fitly is a full-stack web app that uses **Google Gemini AI (Vision)** to analyze a user's photo and deliver personalized fashion recommendations — outfit ideas, color palette, accessory tips, and grooming advice.

<img width="1919" height="968" alt="image" src="https://github.com/user-attachments/assets/08904a05-385b-4572-847d-f28d2d4266b3" />


---

##  Live Demo

- **Fitly:** [https://fitly.netlify.app](fitlyyy.netlify.app/) 


---

##  How It Works

1. User uploads a photo on the Home page
2. Image is sent to the Express backend via `multipart/form-data`
3. Backend passes the image to **Gemini 1.5 Flash** with a structured prompt
4. Gemini returns a JSON style report — body shape, skin tone, face shape, outfits, color palette
5. Results are displayed in a clean UI and saved to history
6. Users can chat with the AI stylist for follow-up fashion questions

---

##  Tech Stack

| Layer      | Technology                           |
|------------|---------------------------------------|
| Frontend   | React 18, Vite, Tailwind CSS, Axios   |
| Backend    | Node.js, Express.js                   |
| AI         | Google Gemini 1.5 Flash (Vision API)  |
| File Upload| Multer                                |
| Routing    | React Router v6                       |
| Deployment | Render (backend), Vercel (frontend)   |

---

##  Project Structure

```
Fitly/
├── backend/
│   ├── controllers/
│   │   ├── analysisController.js   # Gemini image analysis
│   │   ├── chatController.js       # AI chat endpoint
│   │   ├── historyController.js    # CRUD for analysis history
│   │   └── adminController.js      # Dashboard stats
│   ├── routes/
│   │   └── api.js                  # All API routes
│   ├── utils/
│   │   └── historyStore.js         # File-based JSON data store
│   ├── data/                       # Persisted history (JSON)
│   ├── uploads/                    # Temp image storage (auto-cleaned)
│   ├── server.js
│   └── .env.example
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.jsx           # Responsive navbar with mobile menu
    │   │   └── ImageUpload.jsx      # Drag & drop image uploader
    │   ├── pages/
    │   │   ├── Home.jsx             # Landing page + upload
    │   │   ├── Results.jsx          # Style analysis results
    │   │   ├── Gallery.jsx          # Analysis history
    │   │   ├── Chat.jsx             # AI chat interface
    │   │   └── Admin.jsx            # Admin dashboard
    │   └── App.jsx
    └── .env.example
```

---

##  Getting Started

### Prerequisites

- Node.js v18+
- A [Google Gemini API key](https://aistudio.google.com/app/apikey)

### 1. Clone the repo

```bash
git clone https://github.com/your-username/fitly.git
cd fitly
```

### 2. Setup Backend

```bash
cd backend
npm install
cp .env.example .env
# Fill in your GENAI_API_KEY in .env
npm run dev
```

### 3. Setup Frontend

```bash
cd frontend
npm install
cp .env.example .env
# Set VITE_API_URL=http://localhost:5000 for local dev
npm run dev
```

---

##  API Endpoints

| Method | Endpoint         | Description                      |
|--------|------------------|----------------------------------|
| POST   | `/upload`        | Upload image and get AI analysis |
| GET    | `/history`       | Fetch all past analyses          |
| DELETE | `/history/:id`   | Delete a specific analysis       |
| POST   | `/chat`          | Send a message to the AI stylist |
| GET    | `/admin/stats`   | Get dashboard statistics         |
| GET    | `/health`        | Health check                     |

---

##  Features

-  Drag & drop image upload with live preview
-  AI analysis: body shape, skin tone, face shape
-  Personalized color palette recommendations
-  Formal & casual outfit suggestions
-  Accessory and grooming tips
-  Real-time AI fashion chat with message history
-  Analysis history with delete support
-  Admin dashboard with usage stats and charts
-  Fully responsive design (mobile + desktop)

---

## Environment Variables

**Backend `.env`**
```env
GENAI_API_KEY=your_google_gemini_api_key
PORT=5000
```

**Frontend `.env`**
```env
VITE_API_URL=https://your-backend-url.onrender.com
```

---

##  License

MIT
