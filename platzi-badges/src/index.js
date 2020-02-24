import React from "react";
import ReactDOM from "react-dom";
import Badge from "./components/Badge";
//import BadgeNews from "./pages/BadgeNews";
//import Badges from "./pages/Badges";
import App from "./components/App";

import "bootstrap/dist/css/bootstrap.css";
import "../src/global.css";

const element = (
  <div>
    <h1>Hola, Julián</h1>
    <p>Prueba front end</p>
  </div>
);

const component = document.getElementById("app");

ReactDOM.render(<App></App>, component);

/*
ReactDOM.render(
  <Badge
    firstName="Juliána"
    lastName="Castro"
    jobTitle="Software Engineer"
    twitter="@jacastrorug"
    avatar="https://www.gravatar.com/avatar?d=identicon"
  />,
  component
);
*/

/*
const number = Number.parseInt(Math.random() * 100);
console.log(number);

if (number % 2 === 0) {
  console.log('Badges');
  ReactDOM.render(<Badges/>, component);
} else {
  console.log('Badges news', number % 2 === 0)
  ReactDOM.render(<BadgeNews/>, component);
}
*/

//ReactDOM.render(number % 2 === 0 ? <Badges /> : <BadgeNews />, component);