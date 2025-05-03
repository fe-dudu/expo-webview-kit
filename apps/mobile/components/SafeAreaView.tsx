import { type StyleProp, View, type ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface Props {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

// https://github.com/AppAndFlow/react-native-safe-area-context/issues/626
export function SafeAreaView({ children, style }: Props) {
  const insets = useSafeAreaInsets();

  const top = typeof insets.top === 'number' ? insets.top : 0;
  const bottom = typeof insets.bottom === 'number' ? insets.bottom : 0;
  const left = typeof insets.left === 'number' ? insets.left : 0;
  const right = typeof insets.right === 'number' ? insets.right : 0;

  return (
    <View
      style={[
        {
          paddingTop: top,
          paddingBottom: bottom,
          paddingLeft: left,
          paddingRight: right,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}
