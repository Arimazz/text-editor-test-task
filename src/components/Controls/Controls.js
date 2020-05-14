import React, { useState } from 'react';
import style from './style.module.css';

export function Controls(props) {
  const { submit } = props;

  const [selectedColor, setSelectedColor] = useState('black')

  const getSelectedFontSize = () => {
    const selection = window.getSelection();
    if (selection.anchorNode === null) {
      console.log("No selection")
      return;
    }
    const size = window.getComputedStyle(selection.anchorNode.parentElement, null).getPropertyValue('font-size');

    switch (size) {
      case "10px":
        return 1;

      case "13px":
        return 2;

      case "16px":
        return 3;

      case "18px":
        return 4;

      case "24px":
        return 5;

      case "32px":
        return 6;

      case "48px":
        return 7;
    
      default:
        return 3;
    }
  }

  const changeSelectedFontSize = (command) => {
    const currentFontSize = getSelectedFontSize();

    switch (command) {
      case "up":
        document.execCommand("fontSize", false, currentFontSize + 1);
        break;

      case "down":
        document.execCommand("fontSize", false, currentFontSize - 1);
        break;
    
      default:
        break;
    }
  }

  const setSelectedColorByComand = (command, color) => {
    switch (color) {
      case 'black':
        document.execCommand(command, false, 'black')
        break;
      case 'yellow':
        document.execCommand(command, false, 'yellow')
        break;
      case 'green':
        document.execCommand(command, false, 'green')
        break;
      case 'red':
        document.execCommand(command, false, 'red')
        break;
      case 'transparent':
        document.execCommand(command, false, 'transparent')
        break;
      case 'white':
        document.execCommand(command, false, 'white')
        break;
      case 'pink':
        document.execCommand(command, false, 'pink')
        break;
      default:
        break;
    }
  }

  
  return (
    <div className={style.controlsWrapper}>
      <button
        className={style.button}
        type="button"
        onClick={submit}
      >
        Submit
      </button>
      <button
        className={style.button}
        type="button"
        onClick={() => changeSelectedFontSize('up')}
      >
        Font Size Up
      </button>
      <button
        className={style.button}
        type="button"
        onClick={() => changeSelectedFontSize('down')}
      >
        Font Size Down
      </button>
      <button
        className={style.button}
        type="button"
        onClick={() => setSelectedColorByComand('foreColor' ,selectedColor)}
      >
        Change font color to:
      </button>
      <button
        className={style.button}
        type="button"
        onClick={() => setSelectedColorByComand('hiliteColor' ,selectedColor)}
      >
        Change font background color to:
      </button>
      <select value={selectedColor} onChange={(e) => setSelectedColor(e.target.value)}>
        <option value="black">Black</option>
        <option value="yellow">Yellow</option>
        <option value="green">Green</option>
        <option value="red">Red</option>
        <option value="white">White</option>
        <option value="pink">Pink</option>
        <option value="transparent">Transparent</option>
      </select>
    </div>
  );
}