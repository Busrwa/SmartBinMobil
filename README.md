# 🗑️ SmartBin – Mobile App

React Native mobile client for **SmartBin**, a full-stack IoT-based smart waste management system developed as a BSc Software Engineering graduation project.

The mobile app allows users to monitor smart bin status in real time, including fill level, lid status, and system updates through Firebase Realtime Database.

## 🚀 Live & Related Links

* **Live Web Dashboard:** https://smartbinwebsite.netlify.app/
* **Web Repository:** https://github.com/Busrwa/SmartBinWebsite
* **Portfolio Project Page:** https://busrayagcioglu.netlify.app/

## ⚙️ Tech Stack

* React Native
* Expo
* Firebase Realtime Database
* Firebase Authentication
* ESP32 integration through Firebase data flow

## 💡 Features

* Real-time bin fill level monitoring
* Lid status tracking
* Firebase Realtime Database listeners for live updates
* Cross-platform mobile interface for iOS and Android
* User-friendly dashboard for smart waste management
* Designed as part of a full-stack IoT system with hardware, web, mobile, and cloud layers

## 🧩 System Context

SmartBin consists of multiple integrated layers:

1. **Hardware Layer:** ESP32, ultrasonic sensors, servo motor, LED/buzzer indicators
2. **Cloud Layer:** Firebase Realtime Database for live system data
3. **Web Layer:** React-based dashboard deployed on Netlify
4. **Mobile Layer:** React Native mobile application for real-time monitoring

The ESP32 sends sensor data to Firebase, and the mobile app listens to database updates to display the latest bin status to the user.

## 👩‍💻 My Role

I contributed to SmartBin as part of a two-person senior graduation project in Software Engineering. My work focused on the software and IoT integration layers of the system, including ultrasonic sensor calibration with ESP32, Firebase-based real-time communication, notification logic, UV-C module integration, and mobile/web dashboard development.

I also contributed to testing, debugging, documentation, and the preparation of the final project report and presentation. The project allowed me to work across embedded systems, cloud communication, real-time data synchronization, and user-facing software interfaces.

## 🛠️ Getting Started

```bash
git clone https://github.com/Busrwa/SmartBinMobil.git
cd SmartBinMobil
npm install
npx expo start
```

## 📌 Project Type

BSc Software Engineering Graduation Project
Hasan Kalyoncu University, 2026

## 📄 License

This project is for academic and portfolio purposes.
