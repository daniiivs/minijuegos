import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import React, { useState } from "react";
import { AppBar, Box, Toolbar, Typography } from "@mui/material";

// Lógica del juego de recordar palabras
function RememberGame() {
  const [gameIsOn, setGameIsOn] = useState(false); // Si el juego está en marcha
  const [isGuessing, setIsGuessing] = useState(false); // Si el usuario está recordando o no
  const [saidWords, setSaidWords] = useState(""); // Lista de palabras de la partida
  const [userWords, setUserWords] = useState(""); // Lista de palabras que el usuario ha dicho (por ronda)
  const [currentPosition, setCurrentPosition] = useState(0); // Posición (palabra) en la que se encuentra el usuario
  const [wordCount, setWordCount] = useState(0); // Número de palabras que debe adivinar (por ronda)
  const [score, setScore] = useState(0); // Puntuación

  // Listado de palabras que pueden salir
  const wordList = [
    "árbol", "ventana", "naranja", "montaña", "lluvia", "sol", "papel", "ciudad", "libro", "perro",
    "escuela", "mapa", "teléfono", "viaje", "playa", "amigo", "coche", "puente", "río", "casa",
    "trabajo", "música", "luz", "sombra", "corazón", "luna", "sueño", "copa", "camino", "avión",
    "barco", "jardín", "pelota", "sombrero", "reloj", "tejado", "gato", "bosque", "faro", "tren",
    "papelera", "piedra", "fuente", "tienda", "bicicleta", "espejo", "mar", "flor", "silla", "caja"
  ];

  // Empezar un nuevo juego (resetea todos los valores)
  function startNewGame() {
    if (!gameIsOn) {
      setGameIsOn(true);

      setSaidWords("");
      setUserWords("");
      setCurrentPosition(0);
      setWordCount(0);
      setScore(0);

      newWord();
    }
  }

  // Comprueba si la palabra que ha dicho es la correcta
  function checkWord(word) {
    if (gameIsOn) {
      word = word.toString().toLowerCase().split(" ")[0].replace(",", "").replace(".", "");
      if (word === saidWords.split(" ")[currentPosition]) { // Si la palabra coincide con la que está almacenada en esa posición...
        setUserWords(userWords + " " + word); // La añade a la lista
        setCurrentPosition(currentPosition + 1); // Aumenta la posición en 1
        if (currentPosition === wordCount) { // Si la posición es igual al total de palabras, entonces las ha dicho todas
          setScore(score + 1);
          newWord(); // Generamos una nueva palabra
        }
      }
    }
  }

  // Función con Promise, procesos asíncronos que se pueden invocar más tarde. Sirve
  // para esperar un tiempo determinado (delay) y luego ejecutar una función (res)
  function timeout(delay) {
    return new Promise(res => setTimeout(res, delay));
  }

  // Genera una nueva palabra (de la lista)
  function newWord() {
    let word;
    setIsGuessing(false);
    do {
      word = wordList.at(randomNumber(wordList.length)); // Escoge una palabra
    } while (saidWords.includes(word)); // Si ya existe, escoge otra
    setUserWords("");
    setSaidWords(saidWords + " " + word);
    setCurrentPosition(0);
    setWordCount(wordCount + 1);
    timeout(2000).then(() => setIsGuessing(true));
  }

  // Devuelve un número aleatorio
  function randomNumber(maxNumber) {
    return Math.floor(Math.random() * maxNumber);
  }

  // Comandos para el juego
  const commands = [
    {
      command: "Empezar.",
      callback: () => startNewGame()
    },
    {
      command: "*",
      callback: (word) => checkWord(word)
    },
    {
      command: "Reiniciar puntuación.",
      callback: () => setScore(0)
    }
  ];

  const { transcript, browserSupportsSpeechRecognition } = useSpeechRecognition({ commands });
  console.log(transcript);

  if (browserSupportsSpeechRecognition) {
    SpeechRecognition.startListening({ continuous: true });
  }

  return (
    <>
      {!gameIsOn ?
        <Box display="flex"
             flexDirection="column"
             justifyContent="center"
             alignItems="center"
             minHeight="77vh"
        >
          <Typography variant="h3" color="primary" sx={{ display: "inline", mb: 2, fontWeight: "bold" }}>Di "Empezar"
            para jugar</Typography>
          <Typography variant="h6" color="secondary" align="center"
                      sx={{ display: "inline", maxWidth: "60%", fontStyle: "italic" }}>En este
            juego se mostrarán palabras, y tendrás que recordarlas y decirlas en el orden en el que se muestran. Si las
            dices todas correctamente, aparecerá una nueva.
          </Typography>
        </Box> :
        <Box display="flex"
             flexDirection="column"
             justifyContent="center"
             alignItems="center"
             minHeight="77vh"
        >
          <Box sx={{ padding: "20px", display: "flex", justifyContent: "center", alignItems: "center" }}>
            {isGuessing ?
              <Typography variant="h3" color="secondary" sx={{ display: "inline" }}>{userWords}</Typography> :
              <Typography variant="h1" color="primary" sx={{ display: "inline" }}>{saidWords.split(" ")[wordCount]}</Typography>
            }
          </Box>
        </Box>
      }
      <AppBar position="fixed" sx={{ top: "auto", bottom: 0, boxShadow: "0px -4px 10px rgba(0, 0, 0, 0.3)" }}>
        <Toolbar>
          {gameIsOn ? <Typography variant="h6" sx={{ flexGrow: 1, textAlign: "center" }}>
              Puntuación: {score}
            </Typography> :
            <Typography variant="h6" sx={{ flexGrow: 1, textAlign: "center" }}>
              Minijuegos 2025
            </Typography>}
        </Toolbar>
      </AppBar>
      <Box height="64px" />
    </>
  );
}

export default RememberGame;