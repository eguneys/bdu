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

export class DBA<A, B, C> {
  _make: (a: A, b: B) => C
  all: Array<C>
  space: Map<A, Map<B, C>>

  constructor(_make: (a: A, b: B) => C,
              allA: Array<A>,
              allB: Array<B>) {
    this._make = _make;
    this.space = new Map()
    this.all = []

    for (let a of allA) {
      for (let b of allB) {
        this.all.push(this.get(a, b))
      }
    }
  }

  make(a: A, b: B): C {
    let c = this._make(a, b);
    
    let _c = this.all.find(_ => deepeq(_, c));

    if (_c) {
      return _c;
    } else {
      return c;
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

export function deepeq(a: any, b: any) {
  if (Array.isArray(a) && Array.isArray(b)) {
    return arreq(a, b);
  } else if (a instanceof Set && b instanceof Set) {
    return seteq(a, b);
  } else {
    return a === b;
  }
}


export function seteq(a: Set<any>, b: Set<any>): boolean {
  if (a.size !== b.size) {
    return false;
  }
  for (let item of a) {
    let found = false;
    for (let item2 of b) {
      if (item === item2) {
        found = true;
        break;
      }
    }
    if (!found) {
      return false;
    }
  }
  return true;
}


export function arreq(a: Array<any>, b: Array<any>): boolean {
  if (a.length !== b.length) {
    return false;
  }
  for (let i in a) {
    if (!b.some(_ => _ === a[i])) {
      return false;
    }
  }
  return true;
}
