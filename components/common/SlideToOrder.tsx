import { images } from "@/constants";
import React from "react";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
    runOnJS,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
} from "react-native-reanimated";

const { width } = Dimensions.get("window");
const SLIDE_WIDTH = width * 0.9;
const KNOB_SIZE = 60;

interface SlideToOrderProps {
    onSlideComplete?: () => void;
}

const SlideToOrder: React.FC<SlideToOrderProps> = ({ onSlideComplete }) => {
    const translateX = useSharedValue(0);
    const maxSlide = SLIDE_WIDTH - KNOB_SIZE - 10;

    const pan = Gesture.Pan()
        .onUpdate((event) => {
            translateX.value = Math.min(Math.max(0, event.translationX), maxSlide);
        })
        .onEnd(() => {
            if (translateX.value > maxSlide * 0.8) {
                translateX.value = withSpring(maxSlide);
                if (onSlideComplete) {
                    runOnJS(onSlideComplete)();
                }
            } else {
                translateX.value = withSpring(0);
            }
        });

    /** 👉 Animate the whole group instead of only knob */
    const animatedContentStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: translateX.value }],
    }));

    return (
        <View style={styles.container}>
            <View style={styles.slider}>
                <GestureDetector gesture={pan}>
                    <Animated.View style={[StyleSheet.absoluteFill, animatedContentStyle]}>
                        <View className="flex items-center justify-center mt-8">
                            {/* Text */}
                            <Text style={styles.text} className="ml-56">
                                Slide to place order
                            </Text>

                            {/* Arrow */}
                            <Image
                                source={images.SliderArrow}
                                style={styles.logo}
                                resizeMode="contain"
                            />

                            {/* Logo (was knob before) */}
                            <View style={styles.knob}>
                                <Image
                                    source={images.Logo}
                                    style={styles.knobLogo}
                                    resizeMode="contain"
                                />
                            </View>
                        </View>
                    </Animated.View>
                </GestureDetector>
            </View>
        </View>
    );
};

export default SlideToOrder;

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        bottom: 20,
        alignSelf: "center",
    },
    slider: {
        width: SLIDE_WIDTH,
        height: 80,
        backgroundColor: "#017FC6",
        borderRadius: 40,
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
    },
    text: {
        color: "#fff",
        fontSize: 14,
        fontWeight: "400",
    },
    logo: {
        position: "absolute",
        left: 160,
        width: 40,
    },
    knob: {
        position: "absolute",
        left: 60,
        width: KNOB_SIZE,
        height: KNOB_SIZE,
        alignItems: "center",
        justifyContent: "center",
    },
    knobLogo: {
        width: 130,
    },
});
