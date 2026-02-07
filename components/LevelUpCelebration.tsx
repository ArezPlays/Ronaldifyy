import React, { useEffect, useRef, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
  Dimensions,
  Platform,
} from 'react-native';
import * as Haptics from 'expo-haptics';
import { Zap, TrendingUp } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { useTraining } from '@/contexts/TrainingContext';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const TOAST_WIDTH = SCREEN_WIDTH - 40;
const AUTO_DISMISS_MS = 4000;

export default function LevelUpCelebration() {
  const { colors } = useTheme();
  const { levelUpInfo, dismissLevelUp } = useTraining();

  const translateY = useRef(new Animated.Value(-200)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.9)).current;
  const shimmer = useRef(new Animated.Value(0)).current;
  const iconPulse = useRef(new Animated.Value(1)).current;
  const dismissTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const dismiss = useCallback(() => {
    if (dismissTimer.current) {
      clearTimeout(dismissTimer.current);
      dismissTimer.current = null;
    }
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: -200,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start(() => {
      dismissLevelUp();
    });
  }, [translateY, opacity, dismissLevelUp]);

  useEffect(() => {
    if (!levelUpInfo) return;

    if (Platform.OS !== 'web') {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }

    translateY.setValue(-200);
    opacity.setValue(0);
    scale.setValue(0.9);
    shimmer.setValue(0);

    Animated.parallel([
      Animated.spring(translateY, {
        toValue: 0,
        friction: 8,
        tension: 60,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.spring(scale, {
        toValue: 1,
        friction: 5,
        tension: 80,
        useNativeDriver: true,
      }),
    ]).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(shimmer, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(shimmer, {
          toValue: 0,
          duration: 1500,
          useNativeDriver: true,
        }),
      ])
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(iconPulse, {
          toValue: 1.15,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(iconPulse, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
      ])
    ).start();

    dismissTimer.current = setTimeout(dismiss, AUTO_DISMISS_MS);

    return () => {
      if (dismissTimer.current) {
        clearTimeout(dismissTimer.current);
      }
    };
  }, [levelUpInfo, dismiss, iconPulse, opacity, scale, shimmer, translateY]);

  if (!levelUpInfo) return null;

  const shimmerOpacity = shimmer.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0.3, 0.7, 0.3],
  });

  const styles = createStyles(colors);

  return (
    <View style={styles.overlay} pointerEvents="box-none">
      <Animated.View
        style={[
          styles.container,
          {
            transform: [{ translateY }, { scale }],
            opacity,
          },
        ]}
      >
        <TouchableOpacity
          activeOpacity={0.95}
          onPress={dismiss}
          style={styles.touchable}
        >
          <View style={styles.card}>
            <Animated.View
              style={[
                styles.shimmerOverlay,
                { opacity: shimmerOpacity },
              ]}
            />

            <View style={styles.content}>
              <Animated.View
                style={[
                  styles.iconContainer,
                  { transform: [{ scale: iconPulse }] },
                ]}
              >
                <TrendingUp size={22} color="#000" />
              </Animated.View>

              <View style={styles.textContainer}>
                <Text style={styles.title}>Level {levelUpInfo.newLevel} Reached!</Text>
                <Text style={styles.subtitle}>
                  Keep grinding, you{"'"}re getting better ⚡
                </Text>
              </View>

              <View style={styles.levelBadge}>
                <Zap size={12} color="#000" />
                <Text style={styles.levelText}>{levelUpInfo.newLevel}</Text>
              </View>
            </View>

            <View style={styles.progressStrip}>
              <Animated.View
                style={[
                  styles.progressFill,
                  {
                    opacity: shimmer.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0.6, 1],
                    }),
                  },
                ]}
              />
            </View>
          </View>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const createStyles = (colors: any) =>
  StyleSheet.create({
    overlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 9999,
      alignItems: 'center',
      paddingTop: Platform.OS === 'ios' ? 54 : 40,
    },
    container: {
      width: TOAST_WIDTH,
    },
    touchable: {
      width: '100%',
    },
    card: {
      borderRadius: 16,
      overflow: 'hidden',
      backgroundColor: '#1A1A2E',
      borderWidth: 1,
      borderColor: 'rgba(255, 215, 0, 0.3)',
    },
    shimmerOverlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'rgba(255, 215, 0, 0.05)',
    },
    content: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 14,
      gap: 12,
    },
    iconContainer: {
      width: 42,
      height: 42,
      borderRadius: 12,
      backgroundColor: '#FFD700',
      alignItems: 'center',
      justifyContent: 'center',
    },
    textContainer: {
      flex: 1,
    },
    title: {
      fontSize: 16,
      fontWeight: '700' as const,
      color: '#FFFFFF',
      marginBottom: 2,
    },
    subtitle: {
      fontSize: 12,
      color: 'rgba(255, 255, 255, 0.6)',
    },
    levelBadge: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#FFD700',
      paddingHorizontal: 10,
      paddingVertical: 6,
      borderRadius: 10,
      gap: 4,
    },
    levelText: {
      fontSize: 14,
      fontWeight: '800' as const,
      color: '#000',
    },
    progressStrip: {
      height: 3,
      backgroundColor: 'rgba(255, 215, 0, 0.15)',
    },
    progressFill: {
      height: '100%',
      width: '100%',
      backgroundColor: '#FFD700',
    },
  });
