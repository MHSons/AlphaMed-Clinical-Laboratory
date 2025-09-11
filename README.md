# AlphaMed Clinical Laboratory (Offline LIMS)

A fully functional **Laboratory Information Management System (LIMS)** built in React (CDN) with Tailwind, running **100% locally in browser (IndexedDB storage)**.  
No server required. Free & deployable on **GitHub Pages**.

---

## 🚀 Features
- Multi-user login (Admin, Reception, Technician, Pathologist)
- Patient registration with auto-generated MRN
- 20 Departments × 20 Tests × 3 Parameters each (seeded data)
- Report creation (add tests, enter results, auto sample ID)
- QR code on each report (contains patient+report JSON payload)
- Barcode for MRN (CODE128)
- Watermark (faint logo) on report
- Print-friendly reports
- Reports list: search, copy MRN, delete (admin only)
- Departments browser
- Works fully offline (IndexedDB)
- Deployable to **GitHub Pages**

---

## 🔑 Demo Users
| Role         | Username   | Password   |
|--------------|-----------|-----------|
| Admin        | `admin`   | `admin123` |
| Reception    | `reception` | `recep123` |
| Technician   | `tech`    | `tech123` |
| Pathologist  | `patho`   | `patho123` |

---

## 🛠 How to Run

### Local
1. Clone repo or download ZIP
2. Open `index.html` in browser
3. Done 🎉 (all data is stored in IndexedDB locally)

### GitHub Pages
1. Push repo to GitHub
2. Go to repo → Settings → Pages → Select `main` branch + `/ (root)`
3. Open your site at `https://username.github.io/reponame`

---

## 📦 Project Structure
