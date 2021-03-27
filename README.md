

Utility functions for constructing and keeping references of objects.
Useful for Ease of comparison with reference equality `===`.

## Usage

Let's say you have these types:
```
type Color = 'w' | 'b';
type Role = 'b' | 'n' | 'k' | 'q';

type Piece = {
  color: Color,
  role: Role
}

let colors = ['w', 'b'];
let roles = ['b', 'n', 'k', 'q'];
```
You have a constructor function
```
const piece = (color: Color, role: Role): Piece => ({
  color,
  role
});
```
You want to construct and reference any possible piece like this:

```
let pieces = bd.DB2<Color, Role, Piece>(piece, colors, roles);

pieces.get('w', 'n') === pieces.get('w', 'n'); // true
```
