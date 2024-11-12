import { createStackNavigator } from '@react-navigation/stack';
import { ForgotPassword, Login, OtpScreen, PasswordChanged, ResetPassword, SignUp, Welcome } from '../../screens/LoginScreens';
import DrawerNavigator from '../drawer/DrawerNavigator';

const Stack = createStackNavigator();

export default function StackNavigator() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
            <Stack.Screen name="OtpScreen" component={OtpScreen} />
            <Stack.Screen name="PasswordChanged" component={PasswordChanged} />
            <Stack.Screen name="ResetPassword" component={ResetPassword} />
            <Stack.Screen name="SignUp" component={SignUp} />
            <Stack.Screen name="Welcome" component={DrawerNavigator} />
        </Stack.Navigator>
    )
}