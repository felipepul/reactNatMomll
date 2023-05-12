import { Text, View } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { useState } from "react";
import { styles } from "../assets/styles/styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { forEach } from "lodash";

export default function RentScreen({ navigation }) {
  const [rentNumber, setRentNumber] = useState("");
  const [userName, setUserName] = useState("");
  const [plateNumber, setPlateNumber] = useState("");
  const [rentDate, setRentDate] = useState("");
  const [errorMess, setErrorMess] = useState("");
  const [stateCar, setStateCar] = useState("");
  const [sw,setSw] = useState ("")

  const getValuesArrayRentCar = async () => {
    let values = await AsyncStorage.getItem("keyRentCar");
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

  const getValuesCar = async () => {
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

  let statusCar = () => {
    const valuesCar = getValuesCar();
    valuesCar
      .then((values) => {
        console.log(values);
        let frent = values.find((value) => value.plateNumber == plateNumber);
        if (plateNumber == "") {
          setErrorMess("Ingrese el numero de placa");
        } else if (plateNumber != undefined) {
          setErrorMess("placa encontrada");
          setStateCar(frent.state);
        } else {
          setErrorMess("No se encontro placa");
          setStateCar("placa no disponible");
        }
        setSw('1')
      })
      .catch((Error) => {
        if (plateNumber === "") {
          setErrorMess("Ingrese el numero de placa");
        } else {
          setErrorMess("No se encontro placa");
          setStateCar("no disponible");
        }
        setSw('1')
      });
  };

  let saveRent = () => {
    const valuesRent = getValuesArrayRentCar();
    valuesRent
      .then((values) => {
        console.log(values);
        let frent = values.find((value) => value.rentNumber == rentNumber);
        if (
          rentNumber === "" ||
          userName === "" ||
          rentDate === ""
        ) {
          setErrorMess("Ingrese todos los datos");
        } else if (frent != undefined) {
          setErrorMess("el numero de la renta ya se encuentra registrado");
        } else if (frent.stateCar === false) {
          setErrorMess("vehiculo no disponible");
        } else {
          setErrorMess("Vehiculo Registrado Exitosamente");
          values.push({
            rentNumber: rentNumber,
            userName: userName,
            plateNumber: plateNumber,
            rentDate: rentDate,
          });
          AsyncStorage.setItem("keyRentCar", JSON.stringify(values));
          console.log();
          disCar();
          setSw('0')
        }
      })
      .catch((Error) => {
        if (
          rentNumber === "" ||
          userName === "" ||
          rentDate === ""
        ) {
          setErrorMess("Se debe ingresar todos los campos");
        } else {
          setErrorMess("Renta guardada Exitosamente");
          let rent = [
            {
              rentNumber: rentNumber,
              userName: userName,
              plateNumber: plateNumber,
              rentDate: rentDate,
              stateCar: false
            },
          ];
          AsyncStorage.setItem("keyRentCar", JSON.stringify(rent));
          disCar();
          setSw('0')
        }
      });
  };

  let searchRent = () => {
    const setValuesRent = getValuesArrayRentCar();
    setValuesRent
      .then((valuesRent) => {
        console.log(valuesRent);
        let frent = valuesRent.find((value) => value.plateNumber == plateNumber);
        if (plateNumber === "") {
          setErrorMess("Ingrese el numero de la placa");
        } else if (frent != undefined) {
          setErrorMess("Renta  encontrada");
          setRentNumber(frent.rentNumber);
          setUserName(frent.userName);
          setRentDate(frent.rentDate);
          setPlateNumber(frent.plateNumber);
        } else {
          setErrorMess("Renta no existe");
        }
      })
      .catch((Error) => {
        if (plateNumber === "") {
          setErrorMess("Se debe ingresar todos los registro");
        } else {
          setErrorMess("La renta no existe");
        }
      });
  };


  let disCar = ()=>{
    const valuesCar = getValuesCar();
    valuesCar.then((values) => {
      console.log(values);
      values.forEach(value => {
        if (value.plateNumber == plateNumber) {
          values.state == false
        }
      })
      AsyncStorage.setItem('keyCars',JSON.stringify(values))
  })
}

  let Limpiar = () => {
    setRentNumber("");
    setUserName("");
    setPlateNumber("");
    setRentDate("");
  };

  return (
    <View style={[styles.container, { backgroundColor: "#D2EDFF" }]}>
      <Text style={{ fontWeight: "bold" }}>Renta de Carros</Text>
      <TextInput
        style={styles.texinput}
        activeOutlineColor="#000000"
        outlineColor="#000000"
        label="Nro placa"
        mode="outlined"
        onChangeText={(plateNumber) => setPlateNumber(plateNumber)}
        value={plateNumber}
      />
      <TextInput
        style={styles.texinput}
        activeOutlineColor="#000000"
        outlineColor="#000000"
        label="Usuario"
        mode="outlined"
        onChangeText={(userName) => setUserName(userName)}
        value={userName}
      />
      <TextInput
        style={styles.texinput}
        activeOutlineColor="#000000"
        outlineColor="#000000"
        label="Nro Renta"
        mode="outlined"
        onChangeText={(rentNumber) => setRentNumber(rentNumber)}
        value={rentNumber}
      />
      <TextInput
        style={styles.texinput}
        activeOutlineColor="#000000"
        outlineColor="#000000"
        label="Fecha Renta"
        mode="outlined"
        onChangeText={(rentDate) => setRentDate(rentDate)}
        value={rentDate}
      />
      <View style={[{ backgroundColor: "#D2EDFF", flexDirection: "row" }]}>
        <Button
          style={{ marginTop: 10, marginEnd: 10 }}
          icon="login"
          mode="contained"
          buttonColor="#0076C2"
          onPress={()=>{
            if (sw === '1'){
              saveRent();
            }else{
              setErrorMess(' se debe consultar una placa')
            }
          }}
        >
          Guardar
        </Button>
        <Button
          style={{ marginTop: 10 }}
          icon="login"
          mode="contained"
          buttonColor="#0076C2"
          onPress={searchRent}
        >
          Listar
        </Button>
      </View>
      <Button
        textColor="#0076C2"
        onPress={Limpiar}
        //     onPress={()=>{
        //         navigation.navigate('Listar')
        // }}
      >
        Limpiar
      </Button>
      <Buttong
          style={{ marginTop: 10 }}
          icon="login"
          mode="contained"
          buttonColor="#0076C2"
          onPress={statusCar}
        >
          buscar placa
        </Button>
      <Text style={{ fontWeight: "bold", marginTop: 10, color: "red" }}>
        {errorMess}
      </Text>
    </View>
  );
}
