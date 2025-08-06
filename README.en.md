# Ultimate WARP Generator User Guide
This tool helps you easily create, save in your browser, and manage custom and optimized WARP configurations to use for free internet access.
## How the tool works: Creating and managing configurations
With the new save feature, working with the tool is divided into two parts:
### 1. First visit and creating the first configuration
1.  **Create configuration:** Click on the large orange **"Generate First Config"** button.
2.  **Naming:** After a few seconds, you'll be asked to enter a name for this configuration (e.g., "My Phone" or "Laptop"). This name helps you identify it later.
3.  **Save and display:** Your configuration is automatically **saved** in your browser's memory and the results are displayed for use. You won't need to recreate this configuration again.
### 2. Subsequent visits and managing configurations
When you visit this page again, instead of the previous large button, you'll see the **"Your Saved Configurations"** section.
*   **Select configuration:** From the dropdown menu, select your desired configuration. Its information is automatically loaded with the latest Endpoints.
*   **Update Endpoints button:** This button re-fetches the Endpoint list from the original source and replaces the best ones for your current configuration. **It's recommended to use this button every once in a while.**
*   **Generate New button:** If you need a completely new configuration (with a new private key), use this button.
*   **Rename button:** Changes the name of the selected configuration.
*   **Delete button:** Permanently deletes the selected configuration from your browser's memory.
---
## New features: Manual Endpoint and DNS selection
In the `STANDARD WG` and `AMNEZIAWG` tabs, new sections have been added for manual Endpoint and DNS selection. **These selections are shared and synchronized between the two tabs.**
### Endpoint Selection
*   **Endpoint list:** You can select any Endpoint from all available ones.
*   **Recommended:** Servers starting with `8.` usually perform better in Iran's internet and are highlighted in orange at the top of the list.
### DNS Selection and Saving
*   **DNS list:** From the dropdown menu, you can select popular DNSs like Cloudflare, Google, or Quad9.
*   **Custom DNS:** By selecting **"Custom..."**, a box appears for entering your desired DNS address.
*   **Save DNS:** After entering a custom DNS, the **"Save"** button appears. By clicking it and selecting a name, you can save this DNS for future use in the list.
*   **Delete DNS:** If you select a saved DNS from the list, the **"Delete"** button appears, allowing you to remove it.
**Important note:** By selecting any server or DNS, all configurations in **all tabs** (Standard, Amnezia, Sing-Box, App URLs) are instantly updated.
---
## Guide to using configurations in different clients
After loading or creating a configuration, the results are displayed in four main tabs.
### `STANDARD WG` Tab
This tab is suitable for the official **WireGuard** client. There are three ways to add the configuration:
*   **Method 1 (File):** Click the **"Download .conf"** button. In the WireGuard application, use **"Import tunnel(s) from file"** and select the downloaded file. (Suitable for **computer and mobile**)
*   **Method 2 (QR code):** In the WireGuard mobile app, select **"Scan from QR code"** and scan the QR code displayed on the page. (Only for **mobile**)
*   **Method 3 (Copy):** Click the **"Copy"** button. In the WireGuard desktop app, click **"Add Empty Tunnel"** and paste the copied text.
### `AMNEZIAWG` Tab
This tab is designed for the **AmneziaWG** client, which uses Jitter for more stability. The methods for adding the configuration are similar to the Standard WG tab (via file, QR code, or copy).
### `SING-BOX` Tab
This tab is useful for more advanced clients like **sing-box**, **Hiddify**, and similar applications. This configuration includes all servers for automatic speed testing.
**Important:** Due to its size, this configuration's QR code cannot be scanned directly. You need to use the share link:
1.  In the `SING-BOX` tab, click the **"Share Link"** button.
2.  Wait until a short link is created in the box below the buttons.
3.  Immediately after the link is created, **a new QR code appears on the right side of the page.** This QR code contains the same link.
4.  In your client (e.g., Hiddify), go to the section for adding a profile via link (Import from URL) and scan the **new QR code** or copy and paste the link.
### `APP URLS` Tab (for mobile)
This tab provides specific formats for quickly and easily adding configurations to popular mobile applications. **All formats in this section are generated based on your selected Endpoint and DNS.**
**How to use:** Click on each section to display its **QR code** on the right side of the page.
**NekoBox (Android) application:** This client uses JSON format. Click the **"Copy"** button and in the NekoBox application, use "Import from Clipboard".
**V2RayNG (Android) and Streisand (iOS) applications:** They use the standard `wireguard://` format. You can scan the QR code or copy the link.
**Shadowrocket (iOS) application:** Two versions are provided:
  1.  `Standard version`: Regular WireGuard configuration.
  2.  `Amnezia version`: Configuration with Jitter parameters for more stability.
    You can scan the QR code for each or copy its link.