import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import { Camera } from 'expo-camera';

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const cameraRef = useRef(null);

  // Pede permissão assim que o app abre
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const tirarEEnviarFoto = async () => {
    if (cameraRef.current) {
      try {
        // 1. Tira a foto (qualidade 0.5 para não pesar na rede do instituto)
        const photo = await cameraRef.current.takePictureAsync({ quality: 0.5 });
        
        // 2. Monta o pacote de envio
        const formData = new FormData();
        formData.append('foto', {
          uri: photo.uri,
          name: 'saco_aberto.jpg',
          type: 'image/jpeg',
        });

        // 3. Envia para o seu servidor Node
        const response = await fetch('http://10.12.21.10:3000/upload', {
          method: 'POST',
          body: formData,
          headers: { 'Content-Type': 'multipart/form-data' },
        });

        const data = await response.json();
        Alert.alert("Sucesso!", "O resíduo foi registrado no servidor!");
      } catch (error) {
        console.log(error);
        Alert.alert("Erro", "Não foi possível conectar ao servidor. Verifique o IP e o Wi-Fi.");
      }
    }
  };

  if (hasPermission === null) return <View />;
  if (hasPermission === false) return <Text>Acesso à câmera negado!</Text>;

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} ref={cameraRef}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={tirarEEnviarFoto}>
            <Text style={styles.text}>REGISTRAR SACO ABERTO</Text>
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  camera: { flex: 1 },
  buttonContainer: { flex: 1, backgroundColor: 'transparent', flexDirection: 'row', justifyContent: 'center', margin: 40 },
  button: { alignSelf: 'flex-end', alignItems: 'center', backgroundColor: '#fff', padding: 20, borderRadius: 10 },
  text: { fontSize: 16, fontWeight: 'bold' },
});