import React from "react";
import { Game } from "../logic/game";
import "./Viewport.scss";

const game = new Game();

const Item = ({ pos, type }) => {
  const [x, y] = pos;
  const style = {
    left: `${x * 8}px`,
    top: `${y * 8}px`
  };

  const className = `item ${type}`;
  return <div className={className} style={style} />;
};

export class Viewport extends React.Component {
  state = { items: game.map.getAllItems(), step: 0 };

  interval = null;

  render() {
    return (
      <div className="container">
        <div className="viewport">
          {this.state.items.map((item, index) => {
            return <Item key={`item-${index}`} {...item} />;
          })}
        </div>
        <div className="info">
          <div className="monitor">
            <p>Step: {this.state.step}</p>
            <p>Trees: {game.map.getItemsBy("tree").length}</p>
            <p>Rabbits: {game.map.getItemsBy("rabbit").length}</p>
            <p>Wolves: {game.map.getItemsBy("wolves").length}</p>
          </div>
          <div className="buttons">
            <button
              onClick={() => {
                clearInterval(this.interval);
                this.interval = setInterval(() => {
                  game.next();
                  this.setState({
                    items: game.map.getAllItems(),
                    step: this.state.step + 1
                  });
                }, 100);
              }}
            >
              Start
            </button>
            <button
              onClick={() => {
                clearInterval(this.interval);
              }}
            >
              Pause
            </button>
            <button
              onClick={() => {
                game.next();
                this.setState({
                  items: game.map.getAllItems(),
                  step: this.state.step + 1
                });
              }}
            >
              Next
            </button>
            <button
              onClick={() => {
                console.log(game.save());
              }}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    );
  }
}
