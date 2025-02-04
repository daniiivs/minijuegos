import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import React, { useState } from "react";
import { AppBar, Box, Toolbar, Typography } from "@mui/material";

// Lógica del juego de palabras encadenadas
function ChainedGame() {
  const [wordList, setWordList] = useState([]); // Lista de palabras dichas por el usuario
  const [gameIsOn, setGameIsOn] = useState(false); // Si el juego está en marcha o no
  const [previousWord, setPreviousWord] = useState(""); // Palabra anterior
  const [currentWord, setCurrentWord] = useState(""); // Palabra actual
  const [score, setScore] = useState(0); // Puntuación

  // Empezar un nuevo juego (resetea todos los valores)
  function startNewGame(word) {
    word = fixWord(word); // "Formateamos" la palabra dicha por el usuario

    wordList.length = 0; // Establecemos la longitud de la lista de palabras a 0
    wordList.push(removeAccents(word)); // Añadimos a la lista la palabra dicha por el usuario sin tildes

    // Establecemos lso valores correspondientes
    setCurrentWord(word);
    setPreviousWord("");
    setWordList(wordList);
    setScore(0);
    setGameIsOn(true);
  }

  // Quita las tildes de una palabra
  function removeAccents(word) {
    return word.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

  // Coge la primera palabra dicha y quita los puntos y comas
  function fixWord(word) {
    return word.toString().split(" ")[0].toLowerCase().replace(".", "").replace(",", "");
  }

  // Devuelve todas las letras menos las dos últimas
  function getFirstLetters(word) {
    return word.toString().substring(0, word.length - 2);
  }

  // Devuelve las dos últimas letras
  function getLastTwoLetters(word) {
    return word.toString().substring(word.length - 2);
  }

  // Comprueba la palabra (solo si el juego ha empezado)
  function checkWord(word) {
    if (!word.toString().toLowerCase().includes("empezar con") && gameIsOn) {
      word = fixWord(word); // Arregla la palabra
      // Comprueba si las dos primeras letras de la palabra dicha coinciden con las dos últimas de la anterior
      // También comprueba que la palabra no se haya dicho ya
      if (firstLetters(removeAccents(word)) === lastLetters() && !wordList.includes(removeAccents(word))) {
        setPreviousWord(wordList[wordList.length - 1]); // Actualizamos la palabra previa
        wordList.push(removeAccents(word)); // Añadimos la nueva palabra

        // Actualizamos los valores
        setCurrentWord(word);
        setWordList(wordList);
        setScore(score + 1)
      }
    }
  }

  // Devuelve las dos primeras letras de la palabra
  function firstLetters(word) {
    return word.toString().substring(0, 2);
  }

  // Devuelve las dos últimas letras de la última palabra dicha
  function lastLetters() {
    const word = wordList[wordList.length - 1];
    return word.toString().substring(word.length - 2);
  }

  // Comandos para el juego
  const commands = [
    {
      command: "Empezar con *",
      callback: (word) => startNewGame(word)
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
          <Typography variant="h3" color="primary" sx={{ display: "inline", mb: 2, fontWeight: "bold" }}>Di "Empezar con
            (palabra)" para jugar</Typography>
          <Typography variant="h6" color="secondary" align="center"
                      sx={{ display: "inline", maxWidth: "60%", fontStyle: "italic" }}>En este
            juego tendrás que decir una palabra que empiece por las dos últimas letras de la anterior. Las letras se
            resaltarán al decir la palabra para indicar cuáles son.</Typography>
        </Box> :
        <Box display="flex"
             flexDirection="column"
             justifyContent="center"
             alignItems="center"
             minHeight="77vh"
        >
          <Box sx={{ padding: "10px", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Typography variant="h1" color="secondary" sx={{ display: "inline" }}>{getFirstLetters(currentWord)}</Typography>
            <Typography variant="h1"
                        sx={{ display: "inline", color: "red" }}>{getLastTwoLetters(currentWord)}</Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <Typography variant="h4" sx={{ display: "inline", color: "gray" }}>{previousWord}</Typography>
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

export default ChainedGame;