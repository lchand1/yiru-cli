import React, { PureComponent } from "react";

import Button from "../../components/Button";
import Head from "../../components/Head"

export default class Menu extends PureComponent<Object, Object> {
  render() {
    return (
      <>
        <Button
          onClick={() => {
            alert("12");
          }}
        >
          比伯比伯
        </Button>
        <Head/>
      </>
    );
  }
}
