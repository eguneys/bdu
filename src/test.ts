import * as bd from './bd';

export default function() {

  let digits = [0, 1,2,3];

  let ns = new bd.DB2<number, number, Array<number>>(
    (a, b) => [a + b],
    digits,
    digits);

  console.log(ns.get(0, 2) === ns.get(1, 1));
  

}
