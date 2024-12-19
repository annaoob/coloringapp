import React, { Component, ChangeEvent, MouseEvent } from "react";
import { Square, Path, findSquare, replaceSquare, split, solid, toColor  } from './square';
import { SquareElem } from "./square_draw";
import { prefix, len } from "./list"


type FileEditorProps = {
  /** Initial state of the file. */
  initialState: Square;

  /** Called to ask parent to save file contents in server. */
  onSave: (name: string, root: Square) => void;

  // TODO: may want to add more props
  fileName: string;
  onClose: () => void;
};


type FileEditorState = {
  /** The root square of all squares in the design */
  root: Square;

  /** Path to the square that is currently clicked on, if any */
  selected?: Path;
};


/** UI for editing square design page. */
export class FileEditor extends Component<FileEditorProps, FileEditorState> {

  constructor(props: FileEditorProps) {
    super(props);

    this.state = { root: props.initialState };
  }

  render = (): JSX.Element => {
    // TODO: add some editing tools here
    if (!this.state.selected) {
      return <div>
      <SquareElem width={600n} height={600n}
        square={this.state.root} selected={this.state.selected}
        onClick={this.doSquareClick}></SquareElem>
      <button style={{marginLeft: '10px'}}
          onClick={this.doSaveClick}>Save</button>
      <button style={{marginLeft: '10px'}}
          onClick={this.doCloseClick}>Close</button>
      </div>
    }
    const sq = findSquare(this.state.selected, this.state.root);
    const color = (sq && sq.kind=="solid")?sq.color.toString():"white";
    return <div>
      <SquareElem width={600n} height={600n}
        square={this.state.root} selected={this.state.selected}
        onClick={this.doSquareClick}></SquareElem>
      <button style={{marginLeft: '10px'}}
          onClick={this.doSaveClick}>Save</button>
      <button style={{marginLeft: '10px'}}
          onClick={this.doCloseClick}>Close</button>
      <button style={{marginLeft: '10px'}}
          onClick={this.doSplitClick}>Split</button>
      <button style={{marginLeft: '10px'}}
          onClick={this.doDoubleSplitClick}>Double Split</button>
      <button style={{marginLeft: '10px'}}
          onClick={this.doMergeClick}>Merge</button>
      <select id="colors" value={color} onChange={this.doColorChange}>
        <option value="white">White</option>
        <option value="pink">Pink</option>
        <option value="orange">Orange</option>
        <option value="yellow">Yellow</option>
        <option value="green">Green</option>
        <option value="blue">Blue</option>
        <option value="purple">Purple</option>
      </select>
    </div>
  };

  doSquareClick = (path: Path): void => {
    // TODO: remove this code, do something with the path to the selected square
    const sq: Square = findSquare(path, this.state.root);
    if (typeof sq !== "undefined") {
      this.setState({root: this.state.root, selected: path});
    }
    // console.log(path);
    // alert("Stop that!");
  }

  doSplitClick = (_evt: MouseEvent<HTMLButtonElement>): void => {
    // TODO: implement
    if (this.state.selected === undefined) {
      throw new Error ("Need to select a square");
    }
    const sq: Square = findSquare(this.state.selected, this.state.root);
    if (sq.kind === "split") {
      throw new Error ("Need to select a solid square");
    }
    const sq2: Square = split(solid(sq.color), solid(sq.color), solid(sq.color), solid(sq.color));
    const sq1: Square = replaceSquare(this.state.selected, sq2, this.state.root);
    this.setState({root: sq1, selected: undefined})
  };

  doDoubleSplitClick = (_evt: MouseEvent<HTMLButtonElement>): void => {
    // TODO: implement
    if (this.state.selected === undefined) {
      throw new Error ("Need to select a square");
    }
    const sq: Square = findSquare(this.state.selected, this.state.root);
    if (sq.kind === "split") {
      throw new Error ("Need to select a solid square");
    }
    const sq2: Square = split(split(solid(sq.color), solid(sq.color), solid(sq.color), solid(sq.color)), 
                split(solid(sq.color), solid(sq.color), solid(sq.color), solid(sq.color)), 
                split(solid(sq.color), solid(sq.color), solid(sq.color), solid(sq.color)), 
                split(solid(sq.color), solid(sq.color), solid(sq.color), solid(sq.color)));
    const sq1: Square = replaceSquare(this.state.selected, sq2, this.state.root);
    this.setState({root: sq1, selected: undefined})
  };

  doMergeClick = (_evt: MouseEvent<HTMLButtonElement>): void => {
    // TODO: implement
    if (this.state.selected === undefined) {
      throw new Error ("Need to select a square");
    }
    const sq: Square = findSquare(this.state.selected, this.state.root);
    if (sq.kind === "split") {
      throw new Error ("Need to select a solid square");
    }
    const path1: Path = prefix(len(this.state.selected)-1n, this.state.selected);
    //let path: List<Dir> = rev(this.state.selected);
    //if (path.kind !== "nil") {
    //  path= rev(path.tl);
    //}
    const sq1: Square = replaceSquare(path1, solid(sq.color), this.state.root);
    this.setState({root: sq1, selected: undefined});
  };

  doColorChange = (evt: ChangeEvent<HTMLSelectElement>): void => {
    // TODO: remove this code, implement
    if (this.state.selected === undefined) {
      throw new Error ("Need to select a square");
    }
    const sq: Square = findSquare(this.state.selected, this.state.root);
    if (sq.kind === "split") {
      throw new Error ("Can only change color of a solid square");
    }
    const sq2: Square = solid(toColor(evt.target.value));
    const sq1: Square = replaceSquare(this.state.selected, sq2, this.state.root);
    this.setState({root: sq1, selected: undefined});
    console.log(evt);
  };

  doSaveClick = (_evt: MouseEvent<HTMLButtonElement>): void => {
    // TODO: implement
    this.props.onSave(this.props.fileName, this.state.root);
    // if (this.state.onSave === undefined) {
    //   throw new Error ("Error");
    // }
    // let sq: Square = findSquare(this.state.selected, this.state.root);
    // if (sq.kind === "split") {
    //   throw new Error ("Error");
    // }
    // sq = split(solid(sq.color), solid(sq.color), solid(sq.color), solid(sq.color));
    // let sq1: Square = replaceSquare(this.state.selected, sq, this.state.root);
    // this.setState({root: sq1, selected: undefined})
  };

  doCloseClick = (_evt: MouseEvent<HTMLButtonElement>): void => {
    // TODO: implement
    this.props.onClose();
  };

}
