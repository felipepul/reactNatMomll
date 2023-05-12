import { Text, View } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { useState } from "react";
import { styles } from "../assets/styles/styles";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function CarScreen({ navigation }) {
  const [plateNumber, setPlateNumber] = useState("");
  const [brand, setBrand] = useState("");
  const [state, setState] = useState("");
  const [errorMess, setErrorMess] = useState("");

  const getValuesArrayCar = async () => {
    let values = await AsyncStorage.getItem("keyCars");
    return new Promise((resolve, reject) => {
      if (values != undefined) {
        setTimeout(() => {
          resolve(JSON.parse(values));
        }, 1500);
      } else {
        reject(new Error("No existen datos"));
      }
    });
  };

  let saveCar = () => {
    const valuesCar = getValuesArrayCar();
    valuesCar
      .then((values) => {
        console.log(values);
        let fcar = values.find(value => value.plateNumber == plateNumber);
        if(plateNumber === '' || brand === '' || state === ''){
          setErrorMess('Ingrese todos los datos');
        }else if(fcar != undefined){
          setErrorMess('placa ya fue registrada, intenta con otro')
        }else{
          setErrorMess('placa Registrada Exitosamente')
          values.push({plateNumber:plateNumber,brand:brand,state:true})
          AsyncStorage.setItem("keyCars", JSON.stringify(values));
          console.log();
        }
      })
      .catch((Error) => {
        if(plateNumber === '' || brand === '' || state === ''){
          setErrorMess('Se debe ingresar todos los campos')
        }else{
            setErrorMess('Registrado Exitosamente')
            let car = [{
              plateNumber:plateNumber,
              brand:brand,
              state:true,
            }]
            AsyncStorage.setItem("keyCars", JSON.stringify(car));
        }
      });
  };

  let searchCar = () => {
    const seatValuesCar = getValuesArrayCar();
    seatValuesCar.then((valuesCar) =>{
      console.log(valuesCar);
      let fcar = valuesCar.find(value => value.plateNumber == plateNumber);
      if(plateNumber === ''){
        setErrorMess('Ingrese la placa');
      }else if (fcar != undefined){
        setErrorMess('placa encontrada');
        setBrand(fcar.brand);
        setState(fcar.state);
      }else{
        setErrorMess('No se encontro placa');
      }
    })
   .catch((Error) => {
    if(plateNumber === ''){
      setErrorMess('Se debe ingresar todos la placa')
    }else{
      setErrorMess('La placa no existe')
    }
  });
}

  let Limpiar = () => {
    setPlateNumber("");
    setBrand("");
    setState("");
    setErrorMess("")
  };

  return (
    <View style={[styles.container, { backgroundColor: "#D2EDFF" }]}>
      <Text style={{ fontWeight: "bold" }}>Ingresar Carro</Text>
      <TextInput
        style={styles.texinput}
        activeOutlineColor="#000000"
        outlineColor="#000000"
        label="Nro Placa"
        mode="outlined"
        onChangeText={(plateNumber) => setPlateNumber(plateNumber)}
        value={plateNumber}
      />
      <TextInput
        style={styles.texinput}
        activeOutlineColor="#000000"
        outlineColor="#000000"
        label="Marca"
        mode="outlined"
        onChangeText={(brand) => setBrand(brand)}
        value={brand}
      />
      <TextInput
        style={styles.texinput}
        activeOutlineColor="#000000"
        outlineColor="#000000"
        label="Estado"
        mode="outlined"
        onChangeText={(state) => setState(state)}
        value={state}
      />
      <View style={[{ backgroundColor: "#D2EDFF", flexDirection: "row" }]}>
        <Button
          style={{ marginTop: 10, marginEnd: 10 }}
          icon="login"
          mode="contained"
          buttonColor="#0076C2"
          onPress={saveCar}
        >
          Guardar
        </Button>
        <Button
          style={{ marginTop: 10 }}
          icon="login"
          mode="contained"
          buttonColor="#0076C2"
          onPress={searchCar}
        >
          Listar
        </Button>
      </View>
      <Button textColor="#0076C2" onPress={Limpiar}>
        Limpiar
      </Button>
      <Text style={{ fontWeight: "bold", marginTop: 10, color: "red" }}>
        {errorMess}
      </Text>
    </View>
  );
}
