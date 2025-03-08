import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.UserRecord;
import com.google.auth.oauth2.GoogleCredentials;
import java.io.FileInputStream;
import java.io.IOException;

public class Main {
    public static void main(String[] args) {
        try {
            // 讀取服務帳戶金鑰文件
            FileInputStream serviceAccount =
                new FileInputStream("path/to/your/serviceAccountKey.json");

            // 使用服務帳戶金鑰初始化 Firebase
            FirebaseOptions options = new FirebaseOptions.Builder()
                    .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                    .build();

            FirebaseApp.initializeApp(options);

            System.out.println("Firebase 初始化成功！");

            // 使用 Firebase Admin SDK 列出用戶
            FirebaseAuth auth = FirebaseAuth.getInstance();
            Iterable<UserRecord> users = auth.listUsers().iterateAll();
            for (UserRecord user : users) {
                System.out.println("用戶電子郵件: " + user.getEmail());
            }

        } catch (IOException e) {
            System.out.println("初始化 Firebase 失敗: " + e.getMessage());
        }
    }
}
