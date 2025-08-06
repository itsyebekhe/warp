# How to Use Ultimate WARP Generator

This tool helps you easily **create, save, and manage** custom, optimized WARP configurations directly in your browser and use them to access a free and open internet.

## How It Works: Creating & Managing Configs

With the new storage capability, using the tool is divided into two parts:

### 1. First Visit & Creating Your First Config

1.  **Generate Config:** Click the large orange **"Generate First Config"** button.
2.  **Name It:** After a few seconds, you will be prompted to enter a name for this configuration (e.g., "My Phone" or "Laptop"). This name helps you identify it later.
3.  **Save & Display:** Your configuration is automatically **saved in your browser's memory**, and the results are displayed for use. You won't need to generate this config again.

### 2. Subsequent Visits & Managing Configs

When you return to this page, you will see the **"Your Saved Configurations"** section instead of the large button.

*   **Select a Config:** Choose your desired configuration from the dropdown menu. Its information will automatically load with the latest endpoints.
*   **Refresh Endpoints Button:** This button fetches the latest list of endpoints from the source and updates your current config with them. **It is recommended to use this button periodically.**
*   **Generate New Button:** Use this if you need a completely new configuration (with a new private key).
*   **Rename Button:** Changes the name of the selected configuration.
*   **Delete Button:** Permanently removes the selected configuration from your browser's memory.

---

## How to Use the Configurations

After loading or generating a config, the results are displayed in four main tabs.

### `STANDARD WG` & `AMNEZIAWG` Tabs

These two tabs are suitable for the official **WireGuard** and **AmneziaWG** clients.

#### Advanced Controls

In these two tabs, you have full control over two key parts of the configuration:

*   **Endpoint Selection:**
    *   **Endpoint List:** You can choose any endpoint you want from the available list (both IPv4 and IPv6). Servers starting with `8.` (Recommended) usually perform better.
    *   **Test Latency:** By clicking this button, the tool will automatically test all servers and **select the fastest endpoint for you.**

*   **DNS Selection & Saving:**
    *   **DNS List:** You can select popular DNS providers like Cloudflare, Google, or Quad9 from the dropdown.
    *   **Custom DNS:** By selecting **"Custom..."** and entering a custom DNS address, a **"Save"** button will appear, allowing you to save that DNS for future use.

**Important Note:** Changing the Endpoint or DNS will instantly update all configurations in **all tabs**.

#### Methods for Adding Configs

1.  **Method 1 (File):** Click the **"Download .conf"** button and import the downloaded file into your application. (Suitable for **Desktop and Mobile**)
2.  **Method 2 (QR Code):** In your mobile app, select the option to scan a QR code and scan the code displayed on the page. (For **Mobile** only)
3.  **Method 3 (Copy):** Copy the configuration content and paste it into a new empty tunnel in your desktop application.

### `SING-BOX` Tab

This tab is for advanced clients like **sing-box**, **Hiddify**, and similar tools. This configuration includes all servers for automatic speed testing (URL Test).

**Important:** Due to its large size, the QR code for this config is not directly scannable. You must use the share link:

1.  In the `SING-BOX` tab, click the **"Share Link"** button.
2.  Wait for a short link to be generated in the box below the buttons.
3.  As soon as the link is created, **a new QR code will appear on the right side of the page.** This QR code contains that same link.
4.  In your client, go to the section for adding a profile from a URL and scan the **new QR code** or copy-paste the link.

### `APP URLS` Tab (App-Specific Links)

This tab provides special formats for quickly importing configs into popular applications. **All formats in this section are generated based on your selected Endpoint and DNS.**

**How to use:** Click on any section to display its corresponding **QR code** on the right side of the page.

*   **NekoBox / V2RayNG (Android) & Streisand (iOS):** You can scan the QR code or copy the link.
*   **Shadowrocket (iOS):** Two versions are provided: `Standard` and `Amnezia` (for better stability). You can scan the QR code for either one.

---

## 🔥 Powerful New Feature: Dynamic Subscription Link

This is the best and easiest way to keep all your configurations up to date. You get a single, stable link, and every time your client updates it, it will automatically receive the **newest and fastest servers**.

**Important:** This feature uses **all of your saved accounts** simultaneously to build a complete profile.

#### How to Create a Subscription Link:

1.  Go to the **`APP URLS`** tab.
2.  At the top of the tab, click the **"Generate Subscription Links"** button.
3.  A window will open displaying subscription links for different clients (V2RayNG, Shadowrocket, etc.).
4.  Copy the link for your client and add it to its subscription section.

**That's it!** You no longer need to manually change the link. Whenever you create or delete an account in this tool, simply follow these steps again and replace the old link in your client with the new one.
4.  复制适用于您客户端的链接，并将其添加到其订阅部分。

**就是这样！** 您不再需要手动更改链接。每当您在此工具中创建或删除帐户时，只需再次执行这些步骤，并在您的客户端中用新链接替换旧链接即可。
