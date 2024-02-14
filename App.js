import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const STUDY_TIME = 25 * 60; // 25 minutes
const BREAK_TIME = 5 * 60; // 5 minutes

export default function App() {
  const [timeRemaining, setTimeRemaining] = useState(STUDY_TIME);
  const [isStudying, setIsStudying] = useState(true);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let intervalId;

    if (isRunning) {
      intervalId = setInterval(() => {
        setTimeRemaining(prevTime => {
          if (prevTime === 0) {
            if (isStudying) {
              setIsStudying(false);
              setTimeRemaining(BREAK_TIME);
            } else {
              setIsStudying(true);
              setTimeRemaining(STUDY_TIME);
            }
          } else {
            return prevTime - 1;
          }
        });
      }, 1000);
    } else {
      clearInterval(intervalId);
    }

    return () => clearInterval(intervalId);
  }, [isRunning, isStudying]);

  const startTimer = () => {
    setIsRunning(true);
  };

  const pauseTimer = () => {
    setIsRunning(false);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setIsStudying(true);
    setTimeRemaining(STUDY_TIME);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.timer}>
        {Math.floor(timeRemaining / 60)
          .toString()
          .padStart(2, '0')}:
        {(timeRemaining % 60).toString().padStart(2, '0')}
      </Text>
      <Text style={styles.status}>{isStudying ? 'Study' : 'Break'}</Text>
      <View style={styles.buttons}>
        <TouchableOpacity style={[styles.button, isRunning ? styles.buttonPause : styles.buttonStart]} onPress={isRunning ? pauseTimer : startTimer}>
          <Text style={styles.buttonText}>{isRunning ? 'Pause' : 'Start'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={resetTimer}>
          <Text style={styles.buttonText}>Reset</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F0F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  timer: {
    fontSize: 64,
    fontWeight: 'bold',
    color: '#333333',
  },
  status: {
    fontSize: 24,
    marginTop: 20,
    color: '#666666',
  },
  buttons: {
    flexDirection: 'row',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  buttonStart: {
    backgroundColor: '#4CAF50',
  },
  buttonPause: {
    backgroundColor: '#FFC107',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
