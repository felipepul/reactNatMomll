import { Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TextInput, Button } from "react-native-paper";
import { useState } from "react";
import { styles } from "../assets/styles/styles";
import { validateEmail } from "../utils/helpers";
import { size } from "lodash";

export default function RegisterScreen({navigation}) {
    const [formDataRegister,setFormDataRegister] = useState(defaultFormValuesRegister());
    const [errorMess,setErrorMess] = useState('');
    const [showPass,setShowPass] = useState(false);
    const [showPassConf,setShowPassConf] = useState(false);

    const onChange = (e, type) =>{
        setFormDataRegister({ ...formDataRegister,[type]: e})
    }
    
    //Funcion que obtiene los datos del Screen LoginScreen
    const getValuesArrayUser = async () =>{
        let values = await AsyncStorage.getItem('keyUsers')
        return new Promise((resolve, reject) =>{
            if(values != undefined){
                setTimeout(()=>{
                    resolve(JSON.parse(values));
                },1500)
            }
            else{
                reject(new Error('No existen datos'))
            }
        });
    }

    //Funcion que realiza las validaciones
    function setRegisterUser(){
        const valuesArray = getValuesArrayUser()
        valuesArray.then((values) =>{
            console.log(values)
            if(values.length != undefined){
                let findArrayUser = values.find(value => formDataRegister.userName == value.userName)
                let findArrayEmail = values.find(value => formDataRegister.email == value.email)
                console.log(findArrayUser);
                console.log(findArrayEmail);
                //Condiciones
                if(formDataRegister.name === "" || formDataRegister.email === "" || formDataRegister.userName === "" || formDataRegister.password === "" || formDataRegister.confPassword === ""){
                    setErrorMess('Se debe ingresar todos los campos')
                }else if(findArrayEmail != undefined){
                    setErrorMess('Correo electronico ya fue registrado, intenta con otro')
                }else if(findArrayUser != undefined){
                    setErrorMess('Usuario ya fue registrado, intenta con otro')
                }else if(!validateEmail(formDataRegister.email)){
                    setErrorMess('Se debe Ingresar un Email Valido')
                }else if(size(formDataRegister.password)<6){
                    setErrorMess('Se debe Ingresar una contraseña de al menos de 6 caracteres')
                }else if(formDataRegister.password !== formDataRegister.confPassword){
                    setErrorMess('Las contraseñas no coinciden')
                }else{
                    setErrorMess('Registrado Exitosamente')
                    values.push({name:formDataRegister.name,email:formDataRegister.email,userName:formDataRegister.userName,password:formDataRegister.password,confPassword:formDataRegister.confPassword})
                    // Se envia el arreglo por medio del metodo AsyncStorage para la validacion en el Screen LoginScreen
                    AsyncStorage.setItem('keyArrayUsers', JSON.stringify(values))
                    console.log(values);
                    setTimeout(()=>{
                        navigation.navigate('Login')
                    },3000)
                }
            }
        }).catch((Error) =>{ 
            if(formDataRegister.name === "" || formDataRegister.email === "" || formDataRegister.userName === "" || formDataRegister.password === "" || formDataRegister.confPassword === ""){
                setErrorMess('Se debe ingresar todos los campos')
            }else if(!validateEmail(formDataRegister.email)){
                setErrorMess('Se debe Ingresar un Email Valido')
            }else if(size(formDataRegister.password)<6){
                setErrorMess('Se debe Ingresar una contraseña de al menos de 6 caracteres')
            }else if(formDataRegister.password !== formDataRegister.confPassword){
                setErrorMess('Las contraseñas no coinciden')
            }else{
                setErrorMess('Registrado Exitosamente')
                let user = [{name:formDataRegister.name,email:formDataRegister.email,userName:formDataRegister.userName,password:formDataRegister.password,confPassword:formDataRegister.confPassword}]
                // Se envia el arreglo por medio del metodo AsyncStorage para la validacion en el Screen LoginScreen
                AsyncStorage.setItem('keyArrayUsers', JSON.stringify(user))
                console.log(user );
                setTimeout(()=>{
                    navigation.navigate('Login')
                },3000)
            }
        })
    }

    return (
        <View style={[styles.container,{backgroundColor:'#D2EDFF'}]}>
            <Text style={{ fontWeight:'bold'}}>Registrarse</Text>
            <TextInput
                style={styles.texinput}
                label="Nombre"
                activeOutlineColor= "#000000"
                outlineColor= "#000000"
                mode="outlined"
                left={<TextInput.Icon icon="account"/>}
                onChangeText={(e) => onChange(e,"name")}
                defaultValue={formDataRegister.name}
            />
            <TextInput
                style={styles.texinput}
                activeOutlineColor="#000000"
                outlineColor="#000000"
                label="Correo Electronico"
                mode="outlined"
                left={<TextInput.Icon icon="account"/>}
                onChangeText={(e) => onChange(e,"email")}
                keyboardType="email-address"
                defaultValue={formDataRegister.email}
            />
            <TextInput
                style={styles.texinput}
                activeOutlineColor="#000000"
                outlineColor="#000000"
                label="Usuario"
                mode="outlined"
                left={<TextInput.Icon icon="account"/>}
                onChangeText={(e) => onChange(e,"userName")}
                defaultValue={formDataRegister.userName}
            />
            <TextInput
                style={styles.texinput}
                activeOutlineColor="#000000"
                outlineColor="#000000"
                label="Contraseña"
                mode="outlined"
                left={<TextInput.Icon icon="key"/>}
                right={<TextInput.Icon icon={showPass ? "eye-off":"eye"} onPress={()=>setShowPass(!showPass)}/>}
                onChangeText={(e) => onChange(e,"password")}
                secureTextEntry={!showPass}
                defaultValue={formDataRegister.password}
            />
            <TextInput
                style={styles.texinput}
                activeOutlineColor="#000000"
                outlineColor="#000000"
                label="Confirmacion"
                mode="outlined"
                left={<TextInput.Icon icon="key"/>}
                right={<TextInput.Icon icon={showPassConf ? "eye-off":"eye"} onPress={()=>setShowPassConf(!showPassConf)}/>}
                onChangeText={(e) => onChange(e,"confPassword")}
                secureTextEntry={!showPassConf}
                defaultValue={formDataRegister.confPassword}
            />
            <Button
                style={{marginTop:20}}
                icon="login"
                mode="contained"
                buttonColor="#0076C2"
                onPress={()=>{
                    //Se llama la funcion que realiza la validacion de los datos
                    setRegisterUser()
                }}
            >Registrarse</Button>
            <Button
                textColor="#0076C2"
                onPress={()=>{
                    setTimeout(()=>{
                        navigation.navigate('Login')
                    },1000)
            }}
            >Volver</Button>
            <Text style={{ fontWeight:'bold',marginTop:10,color:'red'}}>{errorMess}</Text>
        </View>
    );
}

  const defaultFormValuesRegister = () =>{
    return { name:"", email:"", userName: "", password:"", confPassword:"" }
    }