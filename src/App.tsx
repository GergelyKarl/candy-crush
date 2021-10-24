import React, { useEffect, useState } from "react";
import { colors, width } from "./data/data";

export default function App() {
  const [randomColors, setRandomColors] = useState<Array<String>>([] as Array<String>);

  const createBoard = (): void => {
    const randomizedColors: string[] = [];
    for (let i = 0; i < width ** 2; i++) {
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      randomizedColors.push(randomColor);
    }

    setRandomColors(randomizedColors);
  };

  const checkMatchesForThree = () => {
    for (let i = 0; i < randomColors.length; i++) {
      const columnsMatched = [i, i + width, i + width * 2];
      const matchedColor = randomColors[i];
      if (columnsMatched.every((color) => randomColors[color] === matchedColor)) {
        columnsMatched.forEach((number) => (randomColors[number] = ""));
      }
    }
  };
  const checkMatchesForFour = () => {
    for (let i = 0; i < randomColors.length; i++) {
      const columnsMatched = [i, i + width, i + width * 2,i+width*3];
      const matchedColor = randomColors[i];
      if (columnsMatched.every((color) => randomColors[color] === matchedColor)) {
        columnsMatched.forEach((number) => (randomColors[number] = ""));
      }
    }
  };

  useEffect(() => {
    createBoard();
  }, []);

  useEffect(() => {
    const myInterval = setInterval(() => {
      checkMatchesForThree();
      checkMatchesForFour()
      setRandomColors([...randomColors]);
    }, 100);
    return () => clearInterval(myInterval);
  }, [checkMatchesForThree,randomColors,checkMatchesForFour]);

  console.log(randomColors);

  return (
    <>
      <div className="app">
        <div className="board">
          {randomColors.map((colorName, index) => (
            <img key={index} style={{ backgroundColor: `${colorName}` }} alt="color name" />
          ))}
        </div>
      </div>
    </>
  );
}
