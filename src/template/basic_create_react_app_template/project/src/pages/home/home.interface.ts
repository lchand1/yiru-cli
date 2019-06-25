
export interface HomeInterface extends InitFace{

    state:object
 
}
/**
 * basic interface
 */
interface InitFace {
     render():void
     componentDidMount():void
    
}