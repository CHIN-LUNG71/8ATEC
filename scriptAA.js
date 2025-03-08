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
  storageBucket: "tsai-e32f5..appspot.com",
  messagingSenderId: "504906565418",
  appId: "1:504906565418:web:1eff88b8c1fca8441ec053",
  measurementId: "G-5HMQQ13YCJ"
};

// Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

// 取得 UI 元素
const messageInput = document.getElementById("message");
const sendButton = document.getElementById("sendButton");
const messagesDiv = document.getElementById("messages");

// 發送留言功能
sendButton.addEventListener("click", async () => {
  const text = messageInput.value.trim();
  if (text) {
    await addDoc(collection(db, "messages"), {
      text,
      timestamp: serverTimestamp()
    });
    messageInput.value = "";
  }
});

// 監聽 Firebase 更新
onSnapshot(query(collection(db, "messages"), orderBy("timestamp", "asc")), (snapshot) => {
  messagesDiv.innerHTML = "";
  snapshot.forEach((doc) => {
    const messageData = doc.data();
    const messageElement = document.createElement("p");
    messageElement.textContent = messageData.text;
    messagesDiv.appendChild(messageElement);
  });
});
