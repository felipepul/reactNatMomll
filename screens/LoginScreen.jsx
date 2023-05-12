import { Text, View } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { useState } from "react";
import { styles } from "../assets/styles/styles";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LoginScreen({navigation}) {
    const [formData,setFormData] = useState(defaultFormValues());
    const [showPass,setShowPass] = useState(false)
    const [errorMess,setErrorMess] = useState('');

    const onChange = (e, type) =>{
        setFormData({ ...formData,[type]: e})
    }
    //Funcion que obtiene los datos del Screen de RegisterScreen
    const getValuesArrayRegister = async () =>{
        let values = await AsyncStorage.getItem('keyArrayUsers')
        return new Promise((resolve, reject) =>{
            if(values.length === 0){
                reject(new Error('No existen datos'))
            }else{
                setTimeout(()=>{
                    resolve(JSON.parse(values));
                },1000)
            }
        });
    }

    function saveUser(){
        const saveUsersValues = getValuesArrayRegister();
        saveUsersValues.then((saveArray) => {
            console.log(saveArray)
            if(saveArray.length != undefined){
                // Se envia el arreglo por medio del metodo AsyncStorage para la validacion en el Screen de RegisterScreen
                AsyncStorage.setItem('keyUsers', JSON.stringify(saveArray))
            }
        }).catch((saveArray) =>{ console.log(saveArray)})
    }  

    function validationUser(){
        const usersValues = getValuesArrayRegister();
        usersValues.then((array) => {
            console.log(array)
            if(array.length != undefined){
                let findUser = array.find(arrayValue => arrayValue.userName == formData.userName  && arrayValue.password == formData.password)
                console.log(findUser);
                if(formData.userName == '' || formData.password == ''){
                    setErrorMess('Ingrese todos los campos')
                }else if(findUser != undefined){
                    setErrorMess('Iniciando Sesion')
                    setTimeout(()=>{
                        navigation.navigate('HomeTabs')
                    },3000)
                }else{
                    setErrorMess('Usuario y/o Contraseña INVALIDA')
                }
            }
        }).catch((Error) =>{
            if(formData.userName == '' || formData.password == ''){
                setErrorMess('Ingrese todos los campos')
            }else{
                setErrorMess('Usuario y/o Contraseña INVALIDA')
            }
        })
    }
    return (
        <View style={[styles.container,{backgroundColor:'#D2EDFF'}]}>
            <Text style={{ fontWeight:'bold'}}>Inicio de Sesion</Text>
            <TextInput
                style={styles.texinput}
                activeOutlineColor="#000000"
                outlineColor="#000000"
                label="Usuario"
                mode="outlined"
                onChangeText={(e) => onChange(e,"userName")}
                defaultValue={formData.userName}
                />
            <TextInput
                style={styles.texinput}
                activeOutlineColor="#000000"
                outlineColor="#000000"
                label="Contraseña"
                mode="outlined"
                right={<TextInput.Icon icon={showPass ? "eye-off":"eye"} onPress={()=>setShowPass(!showPass)}/>}
                onChangeText={(e) => onChange(e,"password")}
                defaultValue={formData.password}
                secureTextEntry={!showPass}
                />
            <Button
                style={{marginTop:10}}
                icon="login"
                mode="contained"
                buttonColor="#0076C2"
                onPress={()=>{
                    //Se llama la funcion que realiza la validacion de los datos
                    validationUser()
                   //AsyncStorage.clear()
                }}
            >Ingresar</Button>
            <Button
                textColor="#0076C2"
                onPress={()=>{
                    //Se llama la funcion que envia los datos
                    saveUser()
                    setTimeout(()=>{
                        setErrorMess('')
                        navigation.navigate('Register')
                    },1000)
                }}
                >Registrarse</Button>
            <Text style={{fontWeight:'bold',marginTop:10,color:'red'}}>{errorMess}</Text>
        </View>
    );
}

const defaultFormValues = () =>{
    return { userName: "", password:"" }
}