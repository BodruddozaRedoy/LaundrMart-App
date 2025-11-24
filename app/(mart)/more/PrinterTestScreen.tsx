// PrinterTestScreen.tsx
import { Asset } from "expo-asset";
import { File } from "expo-file-system";
import React, { useEffect, useRef, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { WebView } from "react-native-webview";

// For Android WebView to load local JS
const androidBaseUrl = "file:///android_asset/";

const EPSON_ASSET = require("../../../assets/epos-2.27.0.txt");
const INLINE_SCRIPT_ESCAPE_REGEX = /<\/script/gi;

const buildSdkInlineScript = (sdkCode: string) =>
  `<script>${sdkCode.replace(INLINE_SCRIPT_ESCAPE_REGEX, "<\\/script")}</script>`;

const REQUEST_TIMEOUT_MS = 15000;

const injectSdkHtml = (sdkInlineSnippet: string) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  ${sdkInlineSnippet}
  <script>
    const REQUEST_TIMEOUT_MS = ${REQUEST_TIMEOUT_MS};
    function sendToReact(payload) {
      window.ReactNativeWebView.postMessage(JSON.stringify(payload));
    }

    function makeTimeoutController() {
      if (typeof AbortController === "undefined") {
        return { controller: undefined, cleanup: () => {} };
      }
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
      return {
        controller,
        cleanup: () => clearTimeout(timeoutId),
      };
    }

    async function postXmlToPrinter(ip, xml) {
      const timeout = makeTimeoutController();
      try {
        const url = "http://" + ip + "/cgi-bin/epos/service.cgi";
        const res = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
          },
          body: "xml=" + encodeURIComponent(xml),
          signal: timeout.controller?.signal,
        });

        const text = await res.text();
        return { ok: res.ok, status: res.status, text };
      } catch (err) {
        return { error: String(err) };
      } finally {
        timeout.cleanup();
      }
    }

    async function handleNativeMessage(event) {
      const raw = event && 'data' in event ? event.data : null;
      if (!raw) {
        return;
      }

      let msg = raw;
      try {
        msg = typeof raw === "string" ? JSON.parse(raw) : raw;

        // PING printer
        if (msg.action === "ping") {
          const timeout = makeTimeoutController();
          try {
            const url = "http://" + msg.ip + "/cgi-bin/epos/service.cgi";
            const res = await fetch(url, {
              method: "GET",
              signal: timeout.controller?.signal,
              cache: "no-store",
            });
            sendToReact({ type: "result", payload: "Ping OK (" + res.status + ")" });
          } catch (err) {
            sendToReact({ type: "error", payload: "Ping failed: " + err });
          } finally {
            timeout.cleanup();
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
              payload: "Printed (status " + result.status + ")\\n" + result.text
            });
          }
        }

      } catch (err) {
        const reason =
          err?.name === "AbortError"
            ? "Request aborted (timeout). Check the printer IP and network."
            : String(err);
        sendToReact({ type: "error", payload: reason });
      }
    }

    (function registerBridgeListeners() {
      const targets = [];
      if (typeof document !== "undefined") targets.push(document);
      if (typeof window !== "undefined") targets.push(window);
      targets.forEach((target) => target.addEventListener("message", handleNativeMessage));
    })();
  </script>
</head>
<body></body>
</html>
`.trim();

export default function PrinterTestScreen() {
  const webRef = useRef<any>(null);
  const [printerIp, setPrinterIp] = useState("192.168.0.125");
  const [lastResult, setLastResult] = useState("");
  const [webViewHtml, setWebViewHtml] = useState<string | null>(null);
  const [bridgeError, setBridgeError] = useState<string | null>(null);
  const [webReady, setWebReady] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const prepareSdk = async () => {
      try {
        const asset = Asset.fromModule(EPSON_ASSET);
        await asset.downloadAsync();
        const uri = asset.localUri ?? asset.uri;
        if (!uri) {
          throw new Error("Epson SDK asset URI unavailable");
        }
        const sdkFile = new File(uri);
        const code = await sdkFile.text();
        if (!isMounted) {
          return;
        }

        const inlineSnippet = buildSdkInlineScript(code);
        setWebViewHtml(injectSdkHtml(inlineSnippet));
      } catch (err) {
        console.error("Failed to load Epson SDK", err);
        if (isMounted) {
          setBridgeError(
            "Unable to load Epson SDK. Verify the asset is bundled and try again."
          );
        }
      }
    };

    prepareSdk();

    return () => {
      isMounted = false;
    };
  }, []);

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
    if (!webRef.current || !webReady) {
      Alert.alert("Please wait", "The Epson SDK is still initializing.");
      return;
    }
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
      {webViewHtml ? (
        <WebView
          ref={webRef}
          javaScriptEnabled
          originWhitelist={["*"]}
          onMessage={handleMessage}
          onLoadEnd={() => setWebReady(true)}
          allowFileAccess
          allowUniversalAccessFromFileURLs
          mixedContentMode="always"
          source={{
            baseUrl: Platform.OS === "android" ? androidBaseUrl : undefined,
            html: webViewHtml,
          }}
          style={{ height: 1, width: 1 }}
        />
      ) : (
        <View style={styles.loader}>
          <ActivityIndicator size="small" color="#017FC6" />
          <Text style={styles.loaderText}>
            {bridgeError ?? "Preparing Epson SDK..."}
          </Text>
        </View>
      )}
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
  loader: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  loaderText: {
    color: "#6b7280",
  },
});

