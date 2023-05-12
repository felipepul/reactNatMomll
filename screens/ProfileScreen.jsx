import { Text,View } from "react-native"
import { styles } from "../assets/styles/styles"

export default function ProfileScreen({navigation}){
    return (
    <View style = {styles.container}>
        <Text style={{fontWeight:'bold'}}>Estamos en el Perfil del usuario</Text>
    </View>
    );
}