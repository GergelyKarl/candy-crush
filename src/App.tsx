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
    for (let i = 0; i < randomColors.length - width * 2; i++) {
      const columnsMatched = [i, i + width, i + width * 2];
      const matchedColor = randomColors[i];
      if (columnsMatched.every((color) => randomColors[color] === matchedColor)) {
        columnsMatched.forEach((number) => (randomColors[number] = ""));
      }
    }
  };
  const checkMatchesForFour = () => {
    for (let i = 0; i < randomColors.length - width * 3; i++) {
      const columnsMatched = [i, i + width, i + width * 2, i + width * 3];
      const matchedColor = randomColors[i];
      if (columnsMatched.every((color) => randomColors[color] === matchedColor)) {
        columnsMatched.forEach((number) => (randomColors[number] = ""));
      }
    }
  };
  const checkMatchesForThreeInRows = () => {
    for (let i = 0; i < randomColors.length - width * 3; i++) {
      const rowsMatched = [i, i + 1, i + 2];
      const matchedColor = randomColors[i];
      const skippedCheck = generateEveryTwoLastItemsinARow();
      if (skippedCheck.includes(i)) continue;
      if (rowsMatched.every((color) => randomColors[color] === matchedColor)) {
        rowsMatched.forEach((number) => (randomColors[number] = ""));
      }
    }
  };
  const checkMatchesForFourInRows = () => {
    for (let i = 0; i < randomColors.length - width * 3; i++) {
      const rowsMatched = [i, i + 1, i + 2, i + 3];
      const matchedColor = randomColors[i];
      const skippedCheck = generateEveryThreeLastItemsinARow();
      if (skippedCheck.includes(i)) continue;
      if (rowsMatched.every((color) => randomColors[color] === matchedColor)) {
        rowsMatched.forEach((number) => (randomColors[number] = ""));
      }
    }
  };
  const generateEveryTwoLastItemsinARow = (): number[] => {
    let first: number = width - 2;
    let second: number = width - 1;
    let result: number[] = [first, second];

    for (let i: number = 0; i < width - 1; i++) {
      first += width;
      second += width;
      result.push(first);
      result.push(second);
    }
    return result;
  };

  const generateEveryThreeLastItemsinARow = (): number[] => {
    let first: number = width - 2;
    let second: number = width - 1;
    let third: number = width - 3;
    let result: number[] = [first, second, third];

    for (let i: number = 0; i < width - 1; i++) {
      first += width;
      second += width;
      third += width;
      result.push(first);
      result.push(second);
      result.push(third);
    }
    return result;
  };

  const generateNthRow = (n: number) => {
    const tempArr = new Array(n).fill("");
    return tempArr.map((_, index) => index);
  };

  const fallDown = () => {
    for (let i = 0; i < 64 - width; i++) {
      const firstRow=generateNthRow(width)
      const isFirstRow=firstRow.includes(i)
      if (isFirstRow &&randomColors[i] === "") {
     
        let randomNumber=Math.floor(Math.random()*randomColors.length)
        randomColors[i]=randomColors[randomNumber]
      }
      if ((randomColors[i + width]) === "") {
        randomColors[i + width] = randomColors[i];
        randomColors[i] = "";
        // setRandomColors(randomColors)
      }
    }
  };

  useEffect(() => {
    createBoard();
  }, []);

  useEffect(() => {
    const myInterval = setInterval(() => {
      checkMatchesForThree();
      checkMatchesForFour();
      checkMatchesForThreeInRows();
      checkMatchesForFourInRows();
      fallDown();
      setRandomColors([...randomColors]);
    }, 100);
    return () => clearInterval(myInterval);
  }, [
    checkMatchesForThree,
    randomColors,
    checkMatchesForFour,
    checkMatchesForThreeInRows,
    checkMatchesForFourInRows,
    fallDown,
  ]);

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
