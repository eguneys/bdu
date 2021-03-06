export class DB1<A, B> {
  make: (a: A) => B
  all: Array<B>
  space: Map<A, B>

  constructor(make: (a: A) => B,
              allA?: Array<A>) {
    this.make = make;
    this.space = new Map()
    this.all = []

    if (allA) {
      for (let a of allA) {
        this.all.push(this.get(a))
      }
    }
  }

  get(a: A): B {
    let b = this.space.get(a);
    if (b) {
      return b;
    } else {
      let _b = this.make(a);
      this.space.set(a, _b);
      return _b;
    }
  }
}

export class DB2<A, B, C> {
  make: (a: A, b: B) => C
  all: Array<C>
  space: Map<A, Map<B, C>>

  constructor(make: (a: A, b: B) => C,
              allA: Array<A>,
              allB: Array<B>) {
    this.make = make;
    this.space = new Map()
    this.all = []

    for (let a of allA) {
      for (let b of allB) {
        this.all.push(this.get(a, b))
      }
    }
  }

  get(a: A, b: B): C {
    let bc = this.space.get(a);
    if (bc) {

      let c = bc.get(b);

      if (c) {
        return c;
      } else {
        let _c = this.make(a, b);
        bc.set(b, _c);
        return _c;
      }      

    } else {
      let c = this.make(a, b);
      let bc = new Map()
        .set(b, c);
      this.space.set(a, bc);
      return c;
    }
  }
}

// export class DBU<A, B, C> {
//   make: (a: A, b: B) => Array<C>
//   all: Set<List<C>>
//   space: Map<A, Map<B, List<C>>>

//   constructor(make: (a: A, b: B) => Array<C>,
//               allA: Array<A>,
//               allB: Array<B>) {
//     this.make = make;
//     this.space = new Map()
//     this.all = Set();

//     for (let a of allA) {
//       for (let b of allB) {
//         this.all.add(this._get(a, b))
//       }
//     }
//   }

//   _make(a: A, b: B): List<C> {
//     return fromJS(this.make(a, b));
//   }

//   get(a: A, b: B): Array<C> {
//     return this._get(a, b).toJS();
//   }

//   _get(a: A, b: B): List<C> {
//     let bc = this.space.get(a);
//     if (bc) {

//       let c = bc.get(b);

//       if (c) {
//         return c;
//       } else {
//         let _c = this._make(a, b);
//         bc.set(b, _c);
//         return _c;
//       }      

//     } else {
//       let c = this._make(a, b);
//       let bc = new Map()
//         .set(b, c);
//       this.space.set(a, bc);
//       return c;
//     }
//   }
// }

