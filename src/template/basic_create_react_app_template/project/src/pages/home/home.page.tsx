import React from "react";
import css from './home.module.scss'
import { HomeInterface } from './home.interface';
import { HomeBasic } from './home.module';

 class Home extends HomeBasic implements HomeInterface {
    
  public render() {
    return (
      <div className={css.container}>
        <h1>感谢使用react，请初始化您的项目</h1>
      </div>
    );
  }
}
export default Home