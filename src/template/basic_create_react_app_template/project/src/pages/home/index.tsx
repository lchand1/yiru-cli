import React, { PureComponent } from "react";
import css from './index.module.scss'

export default class Home extends PureComponent<Object, Object> {
  render() {
    return (
      <div className={css.Home_container}>
        <h1>感谢使用react，请初始化您的项目</h1>
      </div>
    );
  }
}
