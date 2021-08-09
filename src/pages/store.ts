import { makeAutoObservable } from "mobx";
class Theme {
  colors: string[] = ['#ff0033', 'antiquewhite', 'brown', 'chocolate', 
    'darkcyan', 'firebrick', 'gold', 'hotpink', 'indianred','khaki',
    'lawngreen', 'maroon', 'navajowhite', 'orangered', 'palegreen',
    'rebeccapurple', 'salmon', 'turquoise', 'violet', 'wheat', 'yellow', ]
  color: number = 0
  setColor() {
    this.color = this.color < this.colors.length-1 ? this.color+1 : this.color - this.colors.length+1
    console.log(this.color, this.colors[this.color])
  }
  constructor (){
    makeAutoObservable(this)
  }
}
export default new Theme()