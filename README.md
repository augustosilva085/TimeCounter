# Time Counter App ⏳❤️

Um aplicativo maravilhosamente projetado e intimista construído com **React Native** e **Expo**. O "Time Counter" não é apenas um cronômetro comum, ele é um aplicativo focado na saudade e gestão de tempo com pessoas amadas, possuindo suporte nativo a geolocalização e micro-interações belíssimas.

## 📸 Screenshots (Modos Claro e Escuro)
<p align="center">
  <img src="./assets/images/print-light.png" width="40%" alt="App rodando no modo claro (Light Mode)"/>
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  <img src="./assets/images/print-dark.png" width="40%" alt="App rodando no modo escuro (Dark Mode)"/>
</p>
<br>

## 🌟 Principais Funcionalidades

- **Contador Altamente Preciso**: Acompanha dias, horas, minutos e segundos, renderizados numa bela interface com tipografia premium e de alto contraste.
- **Geolocalização Inteligente (Geo-fencing)**: Monitora silenciosamente ao fundo e avalia quando você está no mesmo escopo físico que a pessoa amada. O relógio pausa/reseta sozinho quando vocês atingem um "Local Alvo" em comum.
- **Configurações Discretas (Privacy-First)**: Em vez de menus complexos, uma engrenagem sutil traz controles nativos de tempo e espaço de forma transparente usando *glassmorphism*.
- **Controle Flexível do Tempo e Espaço**:
  - ✨ Redefinição manual e independente de histórico por **Date e Time pickers** nativos do dispositivo.
  - ✨ Seletor de alvos e coordenadas mutáveis dinamicamente.
- **Animações Fluidas e Feedback Haptico**: Utiliza o motor avançado do `react-native-reanimated` trabalhando nativamente a 60FPS de pulsações e feedback físico (vibração nativa) a cada segundo exato do cronômetro, imitando as batidas de um coração.
- **Dark/Light Mode e UI Glassmórfica**: Suporte integral a esquemas de cores do sistema acompanhado de transições espelhadas que parecem vidro de verdade (BlurView).

## 🚀 Tecnologias e Stacks Utilizadas

- **Framework**: [React Native](https://reactnative.dev) + [Expo](https://expo.dev)
- **Roteamento**: Expo Router
- **Animações/Motores**: `react-native-reanimated` (Rodando animações direto na Thead Nativa fora da Thread JS).
- **Haptics/Sensações**: `expo-haptics`
- **Geolocalização**: `expo-location` (Monitoramento preciso em raio de distância calculado pelo método Haversine).
- **Gerenciamento de Armazenamento**: `@react-native-async-storage/async-storage`
- **Pickers Nativos**: `@react-native-community/datetimepicker`
- **Design de IU e Efeitos**: `expo-blur` (para física do vidro), `expo-linear-gradient`.

---

## 💻 Como rodar o projeto localmente

Se você deseja clonar este projeto para testes em sua máquina, siga o padrão de variáveis de ambiente de segurança.

**1. Clone o repositório:**
```sh
git clone https://github.com/SEU_USUARIO/TimeCounter.git
cd TimeCounter
```

**2. Configure as Variáveis de Ambiente Seguras:**
O projeto exige o modelo `.env` para proteção de dados geográficos da aplicação real.
- Na raiz do projeto, renomeie (ou crie uma cópia) do arquivo `.env.example` para `.env`.
- Note que o arquivo final `.env` já estará no seu `.gitignore`.

**3. Instale as dependências:**
Certifique-se de que tenha Node instalado ou Yarn. No terminal do seu projeto:
```bash
npm install
# ou
yarn install
```

**4. Rode o Expo:**
```bash
npx expo start -c
```
Pressione `i` para abrir no Simulador iOS, `a` para rodar no Android, ou escaneie o QRCode diretamente do App "Expo Go" do seu celular pessoal!

---

## 🎨 Sobre a Arquitetura

Neste projeto de portfólio tentei priorizar a **Performance (Otimização do ciclo de render do React)** com `useRef` atômico para interações da Reanimated que evitam re-renders desnecessários a cada segundo do Timer, e também a separação limpa de conceitos em Hooks persolizados (Custom Hooks) como o `useAppEngine` (Tempo/Animação de núcleo) e `useLocationMonitor` (Gerenciador de GPS/Haversine/AsyncStorage em contexto assíncrono).

> *Feito de coração! Sinta-se a vontade para analisar meu código e contribuir!*
