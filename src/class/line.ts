import Point from './point'
import Orientation from '../types/orientation'

class Line {
  A: Point
  B: Point

  constructor(A: Point, B: Point) {
    this.A = A
    this.B = B
  }

  // The point A must be the one at the left (horizontal) or at the bottom (vertical) (like
  // the orthogonal coordinate system axes), it will allow to reduce the number of checks
  normalize(): Line {
    if (this.A.x > this.B.x || this.A.y > this.B.y) {
      const memo = this.A
      this.A = this.B
      this.B = memo
    }
    return this
  }

  getOrientation(): Orientation {
    // All input should be considered well formed and syntactically correct.
    // In that case, there is no need to check if the line is vertical or not.
    return this.A.y == this.B.y ? Orientation.Horizontal : Orientation.Vertical
  }
}

export default Line
