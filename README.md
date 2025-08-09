# Email-spam-Detection

# 📧 Email-spam-Detection

Email-spam-Detection is a web application that leverages modern frontend technologies to detect and classify email messages as spam or not spam. The project provides an interactive and responsive interface, allowing users to input email content and instantly receive predictions powered by an API backend.

---

## 🚀 Introduction

Email spam is a persistent problem affecting individuals and organizations worldwide. "Email-spam-Detection" aims to offer a seamless and user-friendly solution for identifying spam emails using advanced detection algorithms. The project provides a modern frontend built with React and Next.js, featuring real-time detection, a beautiful UI, and useful utility components.

---

## ✨ Features

- **Fast Spam Detection:** Instantly predicts whether an email is spam or not.
- **User-Friendly Interface:** Clean, modern, and responsive design.
- **History Tracking:** Keeps a record of previous detection results for review.
- **Theme Toggle:** Supports both light and dark modes for comfortable usage.
- **Loading Indicators:** Displays a spinner while processing requests.
- **Reusable Components:** Modular and maintainable React components.
- **Accessible UI:** Built with accessibility and usability in mind.

---

## 🛠️ Installation

### Prerequisites

- [Node.js](https://nodejs.org/) (v16+ recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Steps

1. **Clone the Repository**
    ```bash
    git clone https://github.com/yourusername/Email-spam-Detection.git
    cd Email-spam-Detection/Frontend/my-app
    ```

2. **Install Dependencies**
    ```bash
    npm install
    # or
    yarn install
    ```

3. **Start the Development Server**
    ```bash
    npm run dev
    # or
    yarn dev
    ```

4. **Access the App**

    Open your browser and navigate to [http://localhost:3000](http://localhost:3000)

---

## 📋 Usage

1. **Input the Email Content:**  
   Enter the text of the email you wish to check into the provided form.

2. **Submit for Analysis:**  
   Click the 'Detect' button. A loading indicator will appear while the system processes your request.

3. **View the Result:**  
   The prediction result will be displayed, indicating whether the email is **Spam** or **Not Spam**.

4. **Review History:**  
   Access the history section to revisit previous predictions.







## 📁 Project Structure

```

📦 
├─ Frontend
│  └─ my-app
│     ├─ app
│     │  ├─ api
│     │  │  └─ predict
│     │  │     └─ route.ts
│     │  ├─ favicon.ico
│     │  ├─ globals.css
│     │  ├─ layout.tsx
│     │  └─ page.tsx
│     ├─ components.json
│     ├─ components
│     │  ├─ ambient.tsx
│     │  ├─ history.tsx
│     │  ├─ spam-form.tsx
│     │  ├─ theme-toggle.tsx
│     │  └─ ui
│     │     ├─ alert.tsx
│     │     ├─ badge.tsx
│     │     ├─ button.tsx
│     │     ├─ card.tsx
│     │     ├─ label.tsx
│     │     ├─ scroll-area.tsx
│     │     ├─ separator.tsx
│     │     ├─ tabs.tsx
│     │     └─ textarea.tsx
│     ├─ lib
│     │  ├─ history.ts
│     │  └─ utils.ts
│     ├─ next.config.ts
│     ├─ package-lock.json
│     ├─ package.json
│     ├─ postcss.config.mjs
│     ├─ public
│     │  ├─ file.svg
│     │  ├─ globe.svg
│     │  ├─ next.svg
│     │  ├─ vercel.svg
│     │  └─ window.svg
│     └─ tsconfig.json
└─ backend
   ├─ Email Spam Dectection.ipynb
   ├─ README.md
   ├─ app.py
   ├─ index.html
   ├─ model.pkl
   ├─ requirements.txt
   ├─ spam.csv
   └─ vectorizer.pkl
```
## ScreenShots: 
<img width="1903" height="879" alt="image" src="https://github.com/user-attachments/assets/799bb33e-3b85-4cc8-8852-97e80c378846" />

<img width="1904" height="872" alt="image" src="https://github.com/user-attachments/assets/a6f3e4a9-b045-4cb4-ac1d-9dfeb6bae317" />


## License
This project is licensed under the **MIT** License.
