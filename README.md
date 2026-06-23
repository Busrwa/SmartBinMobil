# 🗑️ SmartBin – Web Dashboard

React-based web dashboard for **SmartBin**, a full-stack IoT-based smart waste management system developed as a BSc Software Engineering graduation project.

The dashboard allows users to monitor smart bin fill levels, lid status, and system updates in real time through Firebase Realtime Database. It is part of a complete IoT system that includes hardware, cloud communication, a web dashboard, and a mobile application.

## 🚀 Live & Related Links

* **Live Web Dashboard:** https://smartbinwebsite.netlify.app/
* **Mobile Repository:** https://github.com/Busrwa/SmartBinMobil
* **Portfolio Project Page:** https://busrayagcioglu.netlify.app/

## ⚙️ Tech Stack

* React
* Vite
* Firebase Realtime Database
* Firebase Authentication
* Netlify
* ESP32 data flow through Firebase

## 💡 Features

* Real-time bin fill level monitoring
* Lid status tracking
* Multi-bin dashboard interface
* Firebase Realtime Database listeners for live updates
* User authentication flow
* Responsive web interface
* Deployed live on Netlify
* Designed as part of a full-stack IoT system with hardware, web, mobile, and cloud layers

## 🧩 System Architecture

SmartBin consists of four integrated layers:

1. **Hardware Layer:** ESP32, ultrasonic sensors, servo motor, LED/buzzer indicators
2. **Cloud Layer:** Firebase Realtime Database for live data synchronization
3. **Web Layer:** React dashboard deployed on Netlify
4. **Mobile Layer:** React Native app for mobile monitoring

The ESP32 sends sensor data to Firebase, including bin fill level and lid status. The web dashboard listens to Firebase updates and displays the latest system state to the user in real time.

## 👩‍💻 My Role

I contributed to SmartBin as part of a two-person senior graduation project in Software Engineering. My work focused on the software and IoT integration layers of the system, including ultrasonic sensor calibration with ESP32, Firebase-based real-time communication, notification logic, UV-C module integration, and mobile/web dashboard development.

For the web dashboard, I designed and implemented the React interface, connected the application to Firebase Realtime Database, structured the dashboard views, and deployed the project on Netlify.

I also contributed to testing, debugging, documentation, and the preparation of the final project report and presentation. The project allowed me to work across embedded systems, cloud communication, real-time data synchronization, and user-facing software interfaces.

## 🛠️ Getting Started

```bash
git clone https://github.com/Busrwa/SmartBinWebsite.git
cd SmartBinWebsite
npm install
npm run dev
```

## 📌 Project Type

BSc Software Engineering Graduation Project
Hasan Kalyoncu University, 2026

## 📄 License

This project is for academic and portfolio purposes.
