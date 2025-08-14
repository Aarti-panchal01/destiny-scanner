# 🌌 Destiny Scanner

Destiny Scanner is a modern, web-based tool for discovering and visualizing your “destiny” data in style.
With a sleek interface powered by **Shadcn/UI** + **Radix UI** and smart integrations like **html2canvas** + **jsPDF**, it lets you interact, scan, and export results in seconds.

---

## ✨ Features

* **📊 Interactive Scanning** – Pulls data from APIs and displays it beautifully.
* **🎨 Elegant UI** – Styled with **Tailwind CSS** + **Radix UI** for a clean and responsive design.
* **📥 Export Results** – Save your scan output as an image or PDF.
* **⚡ Fast Performance** – Built with **Vite** for instant loading.
* **🔍 Real-time Queries** – Powered by **TanStack Query** for smooth API fetching.
* **📱 Mobile-Friendly** – Fully responsive for desktop, tablet, and phone.

---

## 🛠 Tech Stack

* **Frontend:** [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) + [Vite](https://vitejs.dev/)
* **UI Components:** [Shadcn/UI](https://ui.shadcn.com/) + [Radix UI](https://www.radix-ui.com/)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/) + `tailwind-merge`
* **State & Data:** [React Hook Form](https://react-hook-form.com/), [Zod](https://zod.dev/), [TanStack Query](https://tanstack.com/query/latest)
* **APIs:** Custom API endpoints (configured in `.env`) to retrieve scan results or destiny-related data.
* **Utilities:**

  * [`html2canvas`](https://html2canvas.hertzen.com/) – Capture components as images.
  * [`jsPDF`](https://github.com/parallax/jsPDF) – Export results as PDF.
  * [`date-fns`](https://date-fns.org/) – Date formatting & manipulation.
  * [`recharts`](https://recharts.org/) – Data visualization charts.

---

## 📦 Installation & Setup

### 1️⃣ Clone the repo

```bash
git clone https://github.com/Aarti-panchal01/destiny-scanner.git
cd destiny-scanner
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Set environment variables

Create a `.env` file in the root with your API keys:

```env
VITE_API_URL=https://your-api.com
VITE_API_KEY=your_api_key_here
```

### 4️⃣ Run locally

```bash
npm run dev
```

Your app will be available at **[http://localhost:5173](http://localhost:5173)**

---

## 🚀 Deployment

This project is optimized for deployment on **[Vercel](https://vercel.com/)**.
Push changes to `main` and Vercel will handle the rest.

---

## 📄 License

MIT License – feel free to use and adapt.

---

Do you want me to also **add a section that documents the API requests/responses** your app is making so developers know exactly how to use them? That would make the README complete for other contributors.
