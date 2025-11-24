// PrinterTestScreen.tsx
import React, { useRef, useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Platform,
} from "react-native";
import { WebView } from "react-native-webview";

// For Android WebView to load local JS
const androidBaseUrl = "file:///android_asset/";

// Local Epson SDK filename (inside /assets/)
const EPSON_JS_FILE = "epos-2.27.0.js";

export default function PrinterTestScreen() {
  const webRef = useRef<any>(null);
  const [printerIp, setPrinterIp] = useState("192.168.0.125");
  const [lastResult, setLastResult] = useState("");

  const sampleXmlReceipt = `
<epos-print>
  <text lang="en">LaundrMart</text>
  <lf/>
  <text lang="en">Order #12345</text>
  <lf/>
  <text lang="en">1x T-Shirt  - $10.00</text>
  <lf/>
  <text lang="en">2x Jeans    - $40.00</text>
  <lf/>
  <text lang="en">Total: $50.00</text>
  <lf/><lf/>
  <text lang="en">THANK YOU!</text>
  <lf/>
  <cut/>
</epos-print>
`.trim();

  const sendToWeb = (payload: any) => {
    if (!webRef.current) return;
    webRef.current.postMessage(JSON.stringify(payload));
  };

  const handleMessage = (event: any) => {
    try {
      const data = JSON.parse(event.nativeEvent.data);
      if (data.type === "result") {
        setLastResult(data.payload);
        Alert.alert("Result", data.payload);
      } else if (data.type === "error") {
        setLastResult("ERROR: " + data.payload);
        Alert.alert("Error", data.payload);
      }
    } catch (err) {
      setLastResult(String(event.nativeEvent.data));
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Printer Test (Epson)</Text>

      {/* IP input + Ping */}
      <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
        <TextInput
          value={printerIp}
          onChangeText={setPrinterIp}
          style={styles.input}
          placeholder="Printer IP (example: 192.168.0.125)"
          autoCapitalize="none"
        />

        <TouchableOpacity
          style={styles.button}
          onPress={() => sendToWeb({ action: "ping", ip: printerIp })}
        >
          <Text style={styles.buttonText}>Ping</Text>
        </TouchableOpacity>
      </View>

      {/* Print */}
      <TouchableOpacity
        style={[styles.button, { marginTop: 15 }]}
        onPress={() =>
          sendToWeb({ action: "print", ip: printerIp, xml: sampleXmlReceipt })
        }
      >
        <Text style={styles.buttonText}>Print Sample Receipt</Text>
      </TouchableOpacity>

      <Text style={{ marginTop: 15 }}>Last result: {lastResult}</Text>

      {/* Hidden WebView */}
      <WebView
        ref={webRef}
        javaScriptEnabled
        originWhitelist={["*"]}
        onMessage={handleMessage}
        allowFileAccess
        allowUniversalAccessFromFileURLs
        mixedContentMode="always"
        source={{
          baseUrl: Platform.OS === "android" ? androidBaseUrl : undefined,
          html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <script src="${EPSON_JS_FILE}"></script>

  <script>
    function sendToReact(payload) {
      window.ReactNativeWebView.postMessage(JSON.stringify(payload));
    }

    async function postXmlToPrinter(ip, xml) {
      try {
        const url = "http://" + ip + "/cgi-bin/epos/service.cgi";
        const res = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
          },
          body: "xml=" + encodeURIComponent(xml)
        });

        const text = await res.text();
        return { ok: res.ok, status: res.status, text };
      } catch (err) {
        return { error: String(err) };
      }
    }

    window.addEventListener("message", async (event) => {
      try {
        const msg = JSON.parse(event.data);

        // PING printer
        if (msg.action === "ping") {
          try {
            const url = "http://" + msg.ip + "/cgi-bin/epos/service.cgi";
            const res = await fetch(url, { method: "GET" });
            sendToReact({ type: "result", payload: "Ping OK (" + res.status + ")" });
          } catch (err) {
            sendToReact({ type: "error", payload: "Ping failed: " + err });
          }
        }

        // PRINT
        if (msg.action === "print") {
          const result = await postXmlToPrinter(msg.ip, msg.xml);
          if (result.error) {
            sendToReact({ type: "error", payload: result.error });
          } else {
            sendToReact({
              type: "result",
              payload: "Printed (status " + result.status + ")\n" + result.text
            });
          }
        }

      } catch (err) {
        sendToReact({ type: "error", payload: String(err) });
      }
    });
  </script>
</head>
<body></body>
</html>
          `,
        }}
        style={{ height: 1, width: 1 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 18, fontWeight: "bold", marginBottom: 18 },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 10,
  },
  button: {
    backgroundColor: "#017FC6",
    paddingHorizontal: 18,
    justifyContent: "center",
    height: 46,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontWeight: "600" },
});
