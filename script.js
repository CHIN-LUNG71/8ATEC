// script.js

const repoOwner = "CHIN-LUNG71"; // 你的 GitHub 用戶名
const repoName = "8ATEC"; // 你的儲存庫名稱
const token = "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"; // 你的 GitHub Token
const apiUrl = `https://api.github.com/repos/${repoOwner}/${repoName}/issues/1`;

// 🚀 讀取留言（GitHub Issues）
function loadMessages() {
fetch(apiUrl, {
    method: "POST",
    headers: {
        "Authorization": `token ${token}`,
        "Accept": "application/vnd.github.v3+json",
        "Content-Type": "application/json"
    },
    body: JSON.stringify({ title, body })
})
.then(response => {
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
})
.then(data => {
    console.log("Issue Created:", data);
    alert("留言成功！");
    document.getElementById("title").value = "";
    document.getElementById("body").value = "";
    loadMessages(); // 重新載入留言
})
.catch(error => {
    console.error("Error:", error);
    alert(`發生錯誤: ${error.message}`);
});

}

// 🚀 提交留言（新增 Issue）
function submitMessage() {
    const title = document.getElementById("title").value;
    const body = document.getElementById("body").value;
    
    if (!title || !body) {
        alert("請輸入標題和內容");
        return;
    }

fetch(apiUrl, {
    method: "POST",
    headers: {
        "Authorization": `token ${token}`,
        "Accept": "application/vnd.github.v3+json",
        "Content-Type": "application/json"
    },
    body: JSON.stringify({ title, body })
})

    .then(response => response.json())
    .then(data => {
        console.log("Issue Created:", data);
        alert("留言成功！");
        document.getElementById("title").value = "";
        document.getElementById("body").value = "";
        loadMessages(); // 重新載入留言
    })
    .catch(error => console.error("Error:", error));
}

// 🚀 頁面載入時讀取留言
loadMessages();
