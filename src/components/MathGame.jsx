import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import React, { useState } from "react";
import { AppBar, Box, Toolbar, Typography } from "@mui/material";

// Lógica del juego de matemáticas
function MathGame() {
  const [values, setValues] = useState([]); // Valores + resultado
  const [userAnswer, setUserAnswer] = useState(""); // Respuesta del usuario
  const [gameIsOn, setGameIsOn] = useState(false); // Si el juego está o no en marcha
  const [color, setColor] = useState(""); // Color de la respuesta
  const [score, setScore] = useState(0); // Puntuación

  // Empezar un nuevo juego (resetea todos los valores)
  function startNewGame() {
    values.length = 0;
    setUserAnswer("");
    setGameIsOn(true);
    setScore(0);
    generateAddition(); // Generar nueva suma
  }

  // Comprueba si el usuario ha dicho un número
  function checkUserNumber(number) {
    if (gameIsOn) {
      number = number.toString().replace(".", "").replace(",", "")
      if (number.toLowerCase().includes("dos")) { // Convierte el 2 a número
        setUserAnswer("2");
        number = "2";
        checkAnswer(number);
      } else if (number.toLowerCase().includes("cuatro")) { // Convierte el 4 a número
        setUserAnswer("4");
        number = "4";
        checkAnswer(number);
      } else if (isNumeric(number)) { // Comprueba si es un número (dígito)
        setUserAnswer(number);
        checkAnswer(number);
      }
    }
  }

  // Comprueba si la respuesta es correcta, cambiando el color
  function checkAnswer(number) {
    if (number.toString() === values[1]) {
      setColor("green");
      setScore(score + 1);
      // Si es correcta, espera 2 segundos y luego genera una suma nueva
      timeout(2000).then(() => generateAddition());
    } else {
      setColor("red");
    }
  }

  // Comprobar si un valor es numérico
  function isNumeric(value) {
    return /^-?\d+$/.test(value);
  }

  // Función con Promise, procesos asíncronos que se pueden invocar más tarde. Sirve
  // para esperar un tiempo determinado (delay) y luego ejecutar una función (res)
  function timeout(delay) {
    return new Promise(res => setTimeout(res, delay));
  }

  // Genera un número aleatorio (empezando en 1)
  function randomNumber(maxNumber) {
    return Math.floor(Math.random() * maxNumber) + 1;
  }

  // Genera una nueva suma
  function generateAddition() {
    values.length = 0;
    setUserAnswer("");

    const a = randomNumber(100);
    const b = randomNumber(100);

    const sum = a + " + " + b + " = ";
    const correctAnswer = (a + b).toString();

    setValues([sum, correctAnswer]);
  }

  // Comandos para el juego
  const commands = [
    {
      command: "Empezar.", callback: () => startNewGame()
    },
    {
      command: "*", callback: (answer) => checkUserNumber(answer)
    },
    {
      command: "Reiniciar puntuación.",
      callback: () => setScore(0)
    }];

  const { transcript, browserSupportsSpeechRecognition } = useSpeechRecognition({ commands });
  console.log(transcript);

  if (browserSupportsSpeechRecognition) {
    SpeechRecognition.startListening({ continuous: true });
  }

  return (<>
    {!gameIsOn ? <Box display="flex"
                      flexDirection="column"
                      justifyContent="center"
                      alignItems="center"
                      minHeight="77vh"
    >
      <Typography variant="h3" color="primary" sx={{ display: "inline", mb: 2, fontWeight: "bold" }}>Di "Empezar"
        para jugar</Typography>
      <Typography variant="h6" color="secondary" align="center"
                  sx={{ display: "inline", maxWidth: "60%", fontStyle: "italic" }}>En este
        juego tendrás que decir la respuesta correcta a la operación mostrada. Al hacerlo, aparecerá una nueva. Si
        dices la respuesta incorrecta saldrá en rojo, y tendrás que intentarlo de nuevo.</Typography>
    </Box> : <Box display="flex"
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="center"
                  minHeight="77vh"
    >
      <Box sx={{ padding: "20px", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Typography variant="h1" color="secondary" sx={{ display: "inline" }}>{values[0]}</Typography>
        <Typography variant="h1" sx={{ display: "inline", color: color }}>&nbsp;{userAnswer}</Typography>
      </Box>
    </Box>}
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
  </>);
}

export default MathGame;
