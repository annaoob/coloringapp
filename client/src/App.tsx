import React, { Component } from "react";
import { solid, Path, Square } from './square';
// import { SquareElem } from './square_draw';
import { FilePicker } from "./FilePicker";
import { FileEditor } from "./FileEditor";
import { isRecord } from "./record";


/** Describes set of possible app page views */
// NOTE: the enum here has much more detail than what we showed in the
// walkthrough video. The same principle applies, here we just gave you
// more guidance :)
type Page = 
  // Loading list of file names
  {kind: "load-list"} |
  // Displaying list of file names
  {kind: "show-list", names: Array<string>} |
  // Loading an individual file's contents
  {kind: "load-file", name: string} |
  // Editing an individual file
  {kind: "edit-file", name: string, initialState: Square};

type AppState = {
  show: Page;   // Stores state for the current page of the app to show
};

/**
 * Displays the square application containing either a list of files names
 * to pick from or an editor for files files
 */
export class App extends Component<{}, AppState> {

  constructor(props: {}) {
    super(props);

    // TODO: change to correct starting view once it's implemented
     this.state = {show: {kind: "load-list"}};
     //fetch("/api/close", {method: "GET",
      //headers: {"Content-Type": "application/json"}})
    fetch("/api/close")
    //fetch(encodeURIComponent("/api/close"))
      .then(this.doCancelResp)
      .catch((res) => this.doCancelError("failed to connect to server" + res.toString())); 
    // this.state = {show: {kind: "edit-file", name: "", initialState: solid("white")}};
  }
  
  render = (): JSX.Element => {
    // Render a loading screen if app is accessing data from the server
    // or display file list page or editor page appropraitely
    if (this.state.show.kind === "load-list") {
      return <p>Loading file names...</p>;

    } else if (this.state.show.kind === "show-list") {
      return <FilePicker names={this.state.show.names} onFileClick={this.doFileClick} onCreate={this.doCreateClick}/>; // TODO: pass in necessary props

    } else if (this.state.show.kind === "load-file") {
      return <p>Loading {this.state.show.name}...</p>;

    } else {
      // TODO: Replace return with commented out line to render full editor
      //       component instead of always a static square
      const initialState = this.state.show.initialState;
      // const sq: Square = split(solid("blue"), solid("orange"), solid("purple"), solid("pink"));
      // return <SquareElem width={600n} height={600n} square={sq}
      //  onClick={this.doSquareClick}/>;
      return <FileEditor initialState={initialState} fileName = {this.state.show.name} onSave={this.doSaveClick} onClose={this.doCloseClick}></FileEditor> // TODO: pass in necessary props
    }
  };

  doSquareClick = (path: Path): void => {
    console.log(path);
    alert("Stop that!");
  };

  // TODO: write functions here to handle switching between app pages and
  //       for accessing the server

  // componentDidMount = () => {
  //   fetch("/api/list")
  //       .then(this.doListResp)
  //       .catch(() => this.doListError("failed to connect to server"));
  // }
  
  doIsSquareClick = (val: unknown): val is Square => {
    if (val !== null && typeof val === "object" && ('kind' in val)) {
      return true;
    }
    return false;
  }

  doSaveClick = (fileName: string, square: Square): void => {
    this.setState({show: {kind: "edit-file", name: fileName, initialState: square}});
    fetch("/api/save?name=" + fileName, {method: "POST", body: JSON.stringify({design: square}),
      headers: {"Content-Type": "application/json"}})
      .then(this.doSaveResp)
      .catch((res) => this.doSaveError("failed to connect to server" + res.toString())); 
   }

  doSaveResp = (res: Response): void => {
    if (res.status === 200) {
      res.json().then(this.doSaveJson)
         .catch(() => this.doSaveError("200 response is not valid JSON"));
    } else {
      res.text().then(this.doSaveError)
         .catch(() => this.doSaveError("error response is not text"));
    }
  };

  doSaveJson = (val: unknown): void => {
    if (!isRecord(val)) {
      this.doSaveError("bad type for val: ${typeof val}");
    } else {
      console.log(val.name);
      alert(val.name);
    }
  };

  doSaveError = (msg: string): void => {
    console.error(`Error fetching /api/save: ${msg}`);
  };

  doFileClick = (fileName: string): void => {
    this.setState({show: {kind: "load-file", name: fileName}});
    fetch("/api/loadFile?name=" + fileName)
      .then(this.doFileLoadResp)
      .catch((res) => this.doFileLoadError("failed to connect to server" + res.toString())); 
   }

  doFileLoadResp = (res: Response): void => {
    if (res.status === 200) {
      res.json().then(this.doFileLoadJson)
         .catch(() => this.doFileLoadError("200 response is not valid JSON"));
    } else {
      res.text().then(this.doFileLoadError)
         .catch(() => this.doFileLoadError("error response is not text"));
    }
  };

  doFileLoadJson = (val: unknown): void => {
    console.log(val);
    if (!isRecord(val)) {
      this.doFileLoadError("bad type for val: ${typeof val}");
    } else if (typeof val.fileName !== "string") {
      this.doFileLoadError("bad type for fileName: ${typeof val.fileName}");
    } else if (!this.doIsSquareClick(val.design)) {
      this.doFileLoadError("bad type for design: ${typeof val.design}");
    }else {
      this.setState({show: {kind: "edit-file", name: val.fileName, initialState: val.design}});
    }
  };

  doFileLoadError = (msg: string): void => {
    console.error(`Error fetching /api/loadFile: ${msg}`);
  };

  doCloseClick = (): void => {
    this.setState({show: {kind: "load-list"}});
    //fetch("/api/close", {method: "GET",
    //  headers: {"Content-Type": "application/json"}})
    fetch("/api/close")
    //fetch(encodeURIComponent("/api/close"))
      .then(this.doCancelResp)
      .catch((res) => this.doCancelError("failed to connect to server" + res.toString())); 
   }

  doCancelResp = (res: Response): void => {
    //console.log(res.body?.getReader().read());
    if (res.status === 200) {
      res.json().then(this.doCancelJson)
         .catch((reason) => this.doCancelError("200 response is not valid JSON" + reason.toString()));
    } else {
      res.text().then(this.doCancelError)
         .catch(() => this.doCancelError("error response is not text"));
    }
  };

  doCancelJson = (val: unknown): void => {
    console.log(val);
    if (!isRecord(val)) {
      this.doCancelError("bad type for val: ${typeof val}");
    } else if (!val.ans && !Array.isArray(val.ans)) {
      this.doCancelError("bad type for val: ${typeof val}");
    } else {
      if (Array.isArray(val.ans)) {
        this.setState({show: {kind: "show-list", names: val.ans}});
      } else {
      this.setState({show: {kind: "show-list", names: []}});
      }
    }
  };

  doCancelError = (msg: string): void => {
    console.error(`Error fetching /api/cancel: ${msg}`);
  };

  doCreateClick = (fileName: string): void => {
    this.setState({show: {kind: "edit-file", name: fileName, initialState: solid("white")}});
  }


}
