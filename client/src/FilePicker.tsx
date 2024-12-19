import React, { Component, ChangeEvent, MouseEvent } from "react";


type FilePickerProps = {
  // TODO: may want to add some props
  names: Array<string>;
  //curName: string;
  onFileClick: (name: string) => void;
  onCreate: (name: string) => void;
};


type FilePickerState = {
  name: string;  // text in the name text box
};


/** Displays the list of created design files. */
export class FilePicker extends Component<FilePickerProps, FilePickerState> {

  constructor(props: FilePickerProps) {
    super(props);

    this.state = {name: ''};
  }

  render = (): JSX.Element => {
    // TODO: format list of files as links

    return (<div>
        <h3>Files</h3>
        <ul>
          {this.props.names.map(this.doRenderFileItemClick)}
        </ul>
        <input type="text" value={this.state.name} onChange={this.doNameChange} ></input>
        <button type="button" onClick={this.doCreateClick}>Create</button>
      </div>);
  };

  doRenderFileItemClick = (name: string): JSX.Element => {
    return (
      <li key={name}>
        <a href="#" onClick={this.doFileClick}>
          {name}
        </a>
      </li>
    );
  };

  // Updates our record with the name text being typed in
  doNameChange = (evt: ChangeEvent<HTMLInputElement>): void => {
    // TODO: remove this code, implement
    if (!evt.target.value.includes("&") && !evt.target.value.includes("#")) {
      this.setState({name: evt.target.value});
     } else {
       console.log(evt.target.value);
       alert("Invalid file name: " + evt.target.value);
     }
  };

  // Updates the UI to show the file editor
  doCreateClick = (_evt: MouseEvent<HTMLButtonElement>): void => {
    // TODO: implement
    this.props.onCreate(this.state.name);
  };

  doFileClick = (_evt: MouseEvent<HTMLAnchorElement>): void => {
    // TODO: implement
    const target = _evt.target;
    if (target instanceof HTMLAnchorElement) {
      const anchor = target;
      this.props.onFileClick(anchor.text);
    }

    // _evt.preventDefault(); // Prevent default anchor behavior
    // const fileName = _evt.currentTarget.getAttribute("data-filename");
    // if (fileName) {
    //   this.props.onFileClick(fileName);
    // }
  };

}
