import React, { Component } from 'react';


const initialState = { 
    clicksCount: 0
 };
type State = Readonly<typeof initialState>;

class Head extends Component<object, State> {
  readonly state: State = initialState;

  render() {
    const { clicksCount } = this.state;
    return (
      <>
        <div>Head{clicksCount}</div>
      </>
    );
  }

  private handleIncrement = () => this.setState(incrementClicksCount);
  private handleDecrement = () => this.setState(decrementClicksCount);
}

const incrementClicksCount = (prevState: State) => ({
  clicksCount: prevState.clicksCount + 1,
});
const decrementClicksCount = (prevState: State) => ({
  clicksCount: prevState.clicksCount - 1,
});
export default Head