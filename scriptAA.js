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

async function sendMessage(messageText) {
      if (messageText) {
        try {
          await addDoc(collection(db, "messages"), {
            text: messageText,
            timestamp: serverTimestamp()
          });
        } catch (e) {
          console.error("錯誤：發送留言失敗", e);
        }
      }
    }

    function listenMessages() {
      const q = query(collection(db, "messages"), orderBy("timestamp"));
      onSnapshot(q, (querySnapshot) => {
        const messagesDiv = document.getElementById('messages');
        messagesDiv.innerHTML = ''; // 清空留言區域

        querySnapshot.forEach((doc) => {
          const message = doc.data();
          const messageDiv = document.createElement('div');

          // 格式化時間戳
          const timestamp = message.timestamp ? message.timestamp.toDate() : new Date();
          const timeString = timestamp.toLocaleString();  // 可自訂日期時間格式

          // 顯示留言和時間
          messageDiv.innerHTML = `<strong>${message.text}</strong> <small>${timeString}</small>`;
          messagesDiv.appendChild(messageDiv);
        });
      });
    }

    document.getElementById('sendButton').addEventListener('click', () => {
      const messageInput = document.getElementById('message');
      sendMessage(messageInput.value.trim());
      messageInput.value = ''; // 清空輸入框
    });

    listenMessages();
//如要透過 Firebase 託管功能來代管您的網站，則必須使用 Firebase CLI 這項指令列工具
//npm install -g firebase-tools  //F12 有問題我先屏蔽
