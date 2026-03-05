

# ♻️ Sistema de Registro de Resíduos (Coleta Seletiva)

Este projeto é uma solução **Full-Stack** para o monitoramento de resíduos, permitindo que fiscais ou usuários registrem fotos de sacos de lixo (abertos ou descartados incorretamente) via aplicativo móvel e armazenem essas evidências em um servidor centralizado.

## 🚀 Estrutura do Projeto

O repositório está dividido em duas partes principais:
- **/backend-residuos**: Servidor API em Node.js para recebimento e armazenamento das imagens.
- **/mobile-residuos**: Aplicativo Android/iOS desenvolvido com React Native (Expo).

---

## 🛠️ Tecnologias Utilizadas

### **Backend**
- **Node.js**: Ambiente de execução.
- **Express**: Framework para a API.
- **Multer**: Middleware para manipulação de upload de arquivos (fotos).
- **CORS**: Para permitir a comunicação entre o App e o Servidor.

### **Mobile**
- **React Native + Expo**: Framework para o app híbrido.
- **Expo Camera**: Para captura de imagens em tempo real.
- **Fetch API**: Para envio dos dados via Multipart/Form-Data.

---

## 💻 Como Rodar o Projeto

### 1. Preparando o Backend
Navegue até a pasta do servidor e instale as dependências:
```bash
cd backend-residuos
npm install
mkdir uploads
node server.js

```

*O servidor rodará por padrão na porta **3000**.*

### 2. Configuração do Endereço IP (Crucial)

Para que o aplicativo mobile consiga se comunicar com o servidor na rede local:

1. No seu computador, abra o terminal e digite `ipconfig` (Windows).
2. Identifique o seu **IPv4** (Exemplo: `10.12.21.10`).
3. No código do app mobile, atualize a URL de envio:
```javascript
const URL_API = '[http://10.12.21.10:3000/upload](http://10.12.21.10:3000/upload)';

```



### 3. Rodando o Mobile

```bash
cd mobile-residuos
npm install
npx expo start

```

Escaneie o QR Code com o app **Expo Go** no celular.

---

## 🏗️ Como Gerar o APK (Ambiente Windows)

Caso precise compilar o projeto localmente sem depender do Expo Go:

1. Certifique-se de ter o **Android Studio** e o **Java JDK 17** instalados.
2. **Atenção:** Devido ao limite de 260 caracteres do Windows, clone o projeto em um diretório curto (ex: `C:\projeto`).
3. No terminal:
```bash
cd mobile-residuos/android
gradlew assembleRelease

```



O arquivo será gerado em: `android/app/build/outputs/apk/release/app-release.apk`.

---

## 🛠️ Possíveis Problemas e Soluções

* **Erro de Conexão no App:** Verifique se o Firewall do Windows está bloqueando a porta **3000** ou se o celular e o PC estão no mesmo Wi-Fi.
* **Erro de Caminho Longo (Build):** Mova a pasta do projeto para a raiz do disco (`C:\`).
* **Erro de Memória (JVM):** No Windows, use `set _JAVA_OPTIONS=-Xmx2048m` antes de compilar.
