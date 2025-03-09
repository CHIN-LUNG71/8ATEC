// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getFirestore, collection, addDoc, query, orderBy, onSnapshot, serverTimestamp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAYzyD_ayAh24zpcfCI_AShXWj-QcD_O78",
  authDomain: "tsai-e32f5.firebaseapp.com",
  projectId: "tsai-e32f5",
  storageBucket: "tsai-e32f5.appspot.com",
  messagingSenderId: "504906565418",
  appId: "1:504906565418:web:1eff88b8c1fca8441ec053",
  measurementId: "G-5HMQQ13YCJ"
};

// Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

// 取得 UI 元素
const nameInput = document.getElementById("name");
const phoneInput = document.getElementById("phone");
const dateInput = document.getElementById("date");
const messageInput = document.getElementById("message");
const sendButton = document.getElementById("sendButton");
const messagesDiv = document.getElementById("messages");

// 發送留言功能
sendButton.addEventListener("click", async () => {
    const name = nameInput.value.trim();
  const phone = phoneInput.value.trim();
   
  const dateStr = dateInput.value.trim(); // 取得 YYYY-MM-DD 格式的字串
  const text = messageInput.value.trim();
  if (name && phone && date && text) {
    // 轉換為 Date 物件
    const dateObj = new Date(dateStr + "T00:00:00"); // 確保時區為當地時間
    
    await addDoc(collection(db, "messages"), {
      name,
      phone,
      date: dateObj, // 儲存為 Date 物件
      text,
      timestamp: serverTimestamp()
    });

    // 清空輸入欄
    nameInput.value = "";
    phoneInput.value = "";
    dateInput.value = "";
    messageInput.value = "";
  }
});

// 監聽 Firebase 更新，並顯示留言與時間
onSnapshot(query(collection(db, "messages"), orderBy("timestamp", "asc")), (snapshot) => {
  messagesDiv.innerHTML = "";  // 清空舊的內容
  snapshot.forEach((doc) => {
    const messageData = doc.data();
    const messageElement = document.createElement("p");

    // 轉換 Firebase Timestamp 為可讀時間
    let timeString = "時間不明";  // 預設文字
    if (messageData.timestamp) {
      const date = messageData.timestamp.toDate();  // 轉換 Firestore Timestamp
      timeString = date.toLocaleString("zh-TW", { 
        hour: "2-digit", 
        minute: "2-digit", 
        second: "2-digit"
  });
}
        // 格式化日期
    let dateString = "未設定日期";
    if (messageData.date) {
      const dateObj = new Date(messageData.date.seconds * 1000); // Firestore Timestamp 轉換
      dateString = dateObj.toISOString().split("T")[0]; // 轉換回 YYYY-MM-DD
    }
        // 顯示留言時間和內容
    messageElement.textContent = `[${timeString}] 服務內容：${messageData.text}`;
    messagesDiv.appendChild(messageElement);
  });
});
