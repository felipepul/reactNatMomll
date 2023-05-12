import { Text,View } from "react-native"
import { TextInput, Button } from "react-native-paper";
import { styles } from "../assets/styles/styles"

export default function ListarScreen({navigation}){
    return (
    <View style = {styles.container}>
        <Text style={{fontWeight:'bold'}}>Estamos la lista</Text>
        <Button
                textColor="#0076C2"
                onPress={()=>{
                    navigation.navigate('HomeTabs')
            }}
            >Volver</Button>
    </View>
    );
}