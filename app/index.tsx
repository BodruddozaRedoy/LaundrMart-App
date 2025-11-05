import { Redirect } from "expo-router";


const role: "customer" | "mart" | null = "mart"; 

export default function Index() {
    if (!role) {
        return <Redirect href="/(auth)/welcome" />;
    }

    return role === "mart"
        ? <Redirect href="/(mart)/(tab)" />
        : <Redirect href="/(customer)/(tab)" />;
}


