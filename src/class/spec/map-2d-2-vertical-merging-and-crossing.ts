import Map2D from '../map-2d'
import Line from '../line'
import Point from '../point'

export default (shared: { map: Map2D; expectedArea: number }): void => {
  let index = 1

  /**
   * Horizontal lines summary
   * x = -11 to 10
   * y = 2, y = 5, y = 8, y = 11, y = 14, y = 17, y = 20, y = 23
   * y = 0
   * y = -1, y = -4, y = -7, y = -10, y = -13, y = -16, y = -19, y = -22
   */
  describe('vertical multiple merging & crossing', () => {
    // NORTH NORTH NORTH

    // "yA-"" means the y coordinate of the bottom point of the line (point A) is negative.
    // An "North" line means that the point A of the line is on the bottom and the point B is on the top.
    it('should deduce common areas with North (yA-, yB-) + North (yA-, yB+) + North (yA+, yB+) & x+ lines', () => {
      const x = index * 3 - 1 // 1: 2, 2: 5, 3: 8, 4: 11 // once even, once odd with two free lines between each

      shared.map.addLine(new Line(new Point(x, -11), new Point(x, -2))) // 10 cells
      shared.map.addLine(new Line(new Point(x, -4), new Point(x, 4))) // 9 cells - 3 from the previous line
      shared.map.addLine(new Line(new Point(x, 3), new Point(x, 10))) // 8 cells - 2 from the previous line
      shared.expectedArea += 10 + 9 - 3 + 8 - 2
      shared.expectedArea -= 8 // minus the crossing of the horizontal lines on y = -10, -7, -4, -1, 0, 2, 5, 8 = x8

      expect(shared.map.getArea()).toEqual(shared.expectedArea)
    })

    it('should deduce common areas with North (yA-, yB-) + North (yA-, yB+) + North (yA+, yB+) & x=0 lines', () => {
      const x = 0

      shared.map.addLine(new Line(new Point(x, -11), new Point(x, -2))) // 10 cells
      shared.map.addLine(new Line(new Point(x, -4), new Point(x, 4))) // 9 cells - 3 from the previous line
      shared.map.addLine(new Line(new Point(x, 3), new Point(x, 10))) // 8 cells - 2 from the previous line

      shared.expectedArea += 10 + 9 - 3 + 8 - 2 // the "1x1 line" previous test is part of the next comment "y = 0" line, no need to deduce it here
      shared.expectedArea -= 8 // minus the crossing of the horizontal lines on y = -10, -7, -4, -1, 0, 2, 5, 8 = x8

      expect(shared.map.getArea()).toEqual(shared.expectedArea)
    })

    it('should deduce common areas with North (yA-, yB-) + North (yA-, yB+) + North (yA+, yB+) & x- lines', () => {
      const x = -index * 3 + 2 // 1: -1, 2: -4, 3: -7, 4: -10 // once odd, once even with two free lines between each
      index++ // each three lines

      shared.map.addLine(new Line(new Point(x, -11), new Point(x, -2))) // 10 cells
      shared.map.addLine(new Line(new Point(x, -4), new Point(x, 4))) // 9 cells - 3 from the previous line
      shared.map.addLine(new Line(new Point(x, 3), new Point(x, 10))) // 8 cells - 2 from the previous line

      shared.expectedArea += 10 + 9 - 3 + 8 - 2
      shared.expectedArea -= 8 // minus the crossing of the horizontal lines on y = -10, -7, -4, -1, 0, 2, 5, 8 = x8

      expect(shared.map.getArea()).toEqual(shared.expectedArea)
    })

    // SOUTH SOUTH SOUTH

    it('should deduce common areas with South (yA-, yB-) + South (yA+, yB-) + South (yA+, yB+) & x+ lines', () => {
      const x = index * 3 - 1 // 1: 2, 2: 5, 3: 8, 4: 11 // once even, once odd with two free lines between each

      shared.map.addLine(new Line(new Point(x, -2), new Point(x, -11))) // 10 cells
      shared.map.addLine(new Line(new Point(x, 4), new Point(x, -4))) // 9 cells - 3 from the previous line
      shared.map.addLine(new Line(new Point(x, 10), new Point(x, 3))) // 8 cells - 2 from the previous line
      shared.expectedArea += 10 + 9 - 3 + 8 - 2
      shared.expectedArea -= 8 // minus the crossing of the horizontal lines on y = -10, -7, -4, -1, 0, 2, 5, 8 = x8

      expect(shared.map.getArea()).toEqual(shared.expectedArea)
    })

    it('should deduce common areas with South (yA-, yB-) + South (yA+, yB-) + South (yA+, yB+) & x=0 lines', () => {
      const x = 0
      shared.map.addLine(new Line(new Point(x, -2), new Point(x, -11))) // 10 cells
      shared.map.addLine(new Line(new Point(x, 4), new Point(x, -4))) // 9 cells - 3 from the previous line
      shared.map.addLine(new Line(new Point(x, 10), new Point(x, 3))) // 8 cells - 2 from the previous line

      // expectedArea should not change as the line already exist from previous tests

      expect(shared.map.getArea()).toEqual(shared.expectedArea)
    })

    it('should deduce common areas with South (yA-, yB-) + South (yA+, yB-) + South (yA+, yB+) & x- lines', () => {
      const x = -index * 3 + 2 // 1: -1, 2: -4, 3: -7, 4: -10 // once odd, once even with two free lines between each
      index++ // each three lines

      shared.map.addLine(new Line(new Point(x, -2), new Point(x, -11))) // 10 cells
      shared.map.addLine(new Line(new Point(x, 4), new Point(x, -4))) // 9 cells - 3 from the previous line
      shared.map.addLine(new Line(new Point(x, 10), new Point(x, 3))) // 8 cells - 2 from the previous line

      shared.expectedArea += 10 + 9 - 3 + 8 - 2
      shared.expectedArea -= 8 // minus the crossing of the horizontal lines on y = -10, -7, -4, -1, 0, 2, 5, 8 = x8

      expect(shared.map.getArea()).toEqual(shared.expectedArea)
    })

    // SOUTH SOUTH NORTH

    it('should deduce common areas with South (yA-, yB-) + South (yA+, yB-) + North (yA+, yB+) & x+ lines', () => {
      const x = index * 3 - 1 // 1: 2, 2: 5, 3: 8, 4: 11 // once even, once odd with two free lines between each

      shared.map.addLine(new Line(new Point(x, -2), new Point(x, -11))) // 10 cells
      shared.map.addLine(new Line(new Point(x, 4), new Point(x, -4))) // 9 cells - 3 from the previous line
      shared.map.addLine(new Line(new Point(x, 3), new Point(x, 10))) // 8 cells - 2 from the previous line
      shared.expectedArea += 10 + 9 - 3 + 8 - 2
      shared.expectedArea -= 8 // minus the crossing of the horizontal lines on y = -10, -7, -4, -1, 0, 2, 5, 8 = x8

      expect(shared.map.getArea()).toEqual(shared.expectedArea)
    })

    it('should deduce common areas with South (yA-, yB-) + South (yA+, yB-) + North (yA+, yB+) & x=0 lines', () => {
      const x = 0
      shared.map.addLine(new Line(new Point(x, -2), new Point(x, -11))) // 10 cells
      shared.map.addLine(new Line(new Point(x, 4), new Point(x, -4))) // 9 cells - 3 from the previous line
      shared.map.addLine(new Line(new Point(x, 3), new Point(x, 10))) // 8 cells - 2 from the previous line

      // expectedArea should not change as the line already exist from previous tests

      expect(shared.map.getArea()).toEqual(shared.expectedArea)
    })

    it('should deduce common areas with South (yA-, yB-) + South (yA+, yB-) + North (yA+, yB+) & x- lines', () => {
      const x = -index * 3 + 2 // 1: -1, 2: -4, 3: -7, 4: -10 // once odd, once even with two free lines between each
      index++ // each three lines

      shared.map.addLine(new Line(new Point(x, -2), new Point(x, -11))) // 10 cells
      shared.map.addLine(new Line(new Point(x, 4), new Point(x, -4))) // 9 cells - 3 from the previous line
      shared.map.addLine(new Line(new Point(x, 3), new Point(x, 10))) // 8 cells - 2 from the previous line

      shared.expectedArea += 10 + 9 - 3 + 8 - 2
      shared.expectedArea -= 8 // minus the crossing of the horizontal lines on y = -10, -7, -4, -1, 0, 2, 5, 8 = x8

      expect(shared.map.getArea()).toEqual(shared.expectedArea)
    })

    // SOUTH NORTH SOUTH

    it('should deduce common areas with South (yA-, yB-) + North (yA-, yB+) + South (yA+, yB+) & x+ lines', () => {
      const x = index * 3 - 1 // 1: 2, 2: 5, 3: 8, 4: 11 // once even, once odd with two free lines between each

      shared.map.addLine(new Line(new Point(x, -2), new Point(x, -11))) // 10 cells
      shared.map.addLine(new Line(new Point(x, -4), new Point(x, 4))) // 9 cells - 3 from the previous line
      shared.map.addLine(new Line(new Point(x, 10), new Point(x, 3))) // 8 cells - 2 from the previous line
      shared.expectedArea += 10 + 9 - 3 + 8 - 2
      // x = 11, the horizontal lines are ending on x = 10 so there is no more crossing

      expect(shared.map.getArea()).toEqual(shared.expectedArea)
    })

    it('should deduce common areas with South (yA-, yB-) + North (yA-, yB+) + South (yA+, yB+) & x=0 lines', () => {
      const x = 0
      shared.map.addLine(new Line(new Point(x, -2), new Point(x, -11))) // 10 cells
      shared.map.addLine(new Line(new Point(x, -4), new Point(x, 4))) // 9 cells - 3 from the previous line
      shared.map.addLine(new Line(new Point(x, 10), new Point(x, 3))) // 8 cells - 2 from the previous line

      // expectedArea should not change as the line already exist from previous tests

      expect(shared.map.getArea()).toEqual(shared.expectedArea)
    })

    it('should deduce common areas with South (yA-, yB-) + North (yA-, yB+) + South (yA+, yB+) & x- lines', () => {
      const x = -index * 3 + 2 // 1: -1, 2: -4, 3: -7, 4: -10 // once odd, once even with two free lines between each
      index++ // each three lines

      shared.map.addLine(new Line(new Point(x, -2), new Point(x, -11))) // 10 cells
      shared.map.addLine(new Line(new Point(x, -4), new Point(x, 4))) // 9 cells - 3 from the previous line
      shared.map.addLine(new Line(new Point(x, 10), new Point(x, 3))) // 8 cells - 2 from the previous line

      shared.expectedArea += 10 + 9 - 3 + 8 - 2
      // x = -10, the horizontal lines are ending on x = -11, so this is the last vertical line crossing the horizontal ones
      shared.expectedArea -= 8 // minus the crossing of the horizontal lines on y = -10, -7, -4, -1, 0, 2, 5, 8 = x8

      expect(shared.map.getArea()).toEqual(shared.expectedArea)
    })

    // NORTH SOUTH SOUTH

    it('should deduce common areas with North (yA-, yB-) + South (yA+, yB-) + South (yA+, yB+) & x+ lines', () => {
      const x = index * 3 - 1 // 1: 2, 2: 5, 3: 8, 4: 11 // once even, once odd with two free lines between each

      shared.map.addLine(new Line(new Point(x, -11), new Point(x, -2))) // 10 cells
      shared.map.addLine(new Line(new Point(x, 4), new Point(x, -4))) // 9 cells - 3 from the previous line
      shared.map.addLine(new Line(new Point(x, 10), new Point(x, 3))) // 8 cells - 2 from the previous line
      shared.expectedArea += 10 + 9 - 3 + 8 - 2
      // shared.expectedArea -= 8 // minus the crossing of the horizontal lines on y = -10, -7, -4, -1, 0, 2, 5, 8 = x8

      expect(shared.map.getArea()).toEqual(shared.expectedArea)
    })

    it('should deduce common areas with North (yA-, yB-) + South (yA+, yB-) + South (yA+, yB+) & x=0 lines', () => {
      const x = 0
      shared.map.addLine(new Line(new Point(x, -11), new Point(x, -2))) // 10 cells
      shared.map.addLine(new Line(new Point(x, 4), new Point(x, -4))) // 9 cells - 3 from the previous line
      shared.map.addLine(new Line(new Point(x, 10), new Point(x, 3))) // 8 cells - 2 from the previous line

      // expectedArea should not change as the line already exist from previous tests

      expect(shared.map.getArea()).toEqual(shared.expectedArea)
    })

    it('should deduce common areas with North (yA-, yB-) + South (yA+, yB-) + South (yA+, yB+) & x- lines', () => {
      const x = -index * 3 + 2 // 1: -1, 2: -4, 3: -7, 4: -10 // once odd, once even with two free lines between each
      index++ // each three lines

      shared.map.addLine(new Line(new Point(x, -11), new Point(x, -2))) // 10 cells
      shared.map.addLine(new Line(new Point(x, 4), new Point(x, -4))) // 9 cells - 3 from the previous line
      shared.map.addLine(new Line(new Point(x, 10), new Point(x, 3))) // 8 cells - 2 from the previous line

      shared.expectedArea += 10 + 9 - 3 + 8 - 2
      // shared.expectedArea -= 8 // minus the crossing of the horizontal lines on y = -10, -7, -4, -1, 0, 2, 5, 8 = x8

      expect(shared.map.getArea()).toEqual(shared.expectedArea)
    })

    // NORTH NORTH SOUTH

    it('should deduce common areas with North (yA-, yB-) + North (yA-, yB+) + South (yA+, yB+) & x+ lines', () => {
      const x = index * 3 - 1 // 1: 2, 2: 5, 3: 8, 4: 11 // once even, once odd with two free lines between each

      shared.map.addLine(new Line(new Point(x, -11), new Point(x, -2))) // 10 cells
      shared.map.addLine(new Line(new Point(x, -4), new Point(x, 4))) // 9 cells - 3 from the previous line
      shared.map.addLine(new Line(new Point(x, 10), new Point(x, 3))) // 8 cells - 2 from the previous line
      shared.expectedArea += 10 + 9 - 3 + 8 - 2
      // shared.expectedArea -= 8 // minus the crossing of the horizontal lines on y = -10, -7, -4, -1, 0, 2, 5, 8 = x8

      expect(shared.map.getArea()).toEqual(shared.expectedArea)
    })

    it('should deduce common areas with North (yA-, yB-) + North (yA-, yB+) + South (yA+, yB+) & x=0 lines', () => {
      const x = 0
      shared.map.addLine(new Line(new Point(x, -11), new Point(x, -2))) // 10 cells
      shared.map.addLine(new Line(new Point(x, -4), new Point(x, 4))) // 9 cells - 3 from the previous line
      shared.map.addLine(new Line(new Point(x, 10), new Point(x, 3))) // 8 cells - 2 from the previous line

      // expectedArea should not change as the line already exist from previous tests

      expect(shared.map.getArea()).toEqual(shared.expectedArea)
    })

    it('should deduce common areas with North (yA-, yB-) + North (yA-, yB+) + South (yA+, yB+) & x- lines', () => {
      const x = -index * 3 + 2 // 1: -1, 2: -4, 3: -7, 4: -10 // once odd, once even with two free lines between each
      index++ // each three lines

      shared.map.addLine(new Line(new Point(x, -11), new Point(x, -2))) // 10 cells
      shared.map.addLine(new Line(new Point(x, -4), new Point(x, 4))) // 9 cells - 3 from the previous line
      shared.map.addLine(new Line(new Point(x, 10), new Point(x, 3))) // 8 cells - 2 from the previous line

      shared.expectedArea += 10 + 9 - 3 + 8 - 2
      // shared.expectedArea -= 8 // minus the crossing of the horizontal lines on y = -10, -7, -4, -1, 0, 2, 5, 8 = x8

      expect(shared.map.getArea()).toEqual(shared.expectedArea)
    })

    // NORTH SOUTH NORTH

    it('should deduce common areas with North (yA-, yB-) + South (yA+, yB-) + North (yA+, yB+) & x+ lines', () => {
      const x = index * 3 - 1 // 1: 2, 2: 5, 3: 8, 4: 11 // once even, once odd with two free lines between each

      shared.map.addLine(new Line(new Point(x, -11), new Point(x, -2))) // 10 cells
      shared.map.addLine(new Line(new Point(x, 4), new Point(x, -4))) // 9 cells - 3 from the previous line
      shared.map.addLine(new Line(new Point(x, 3), new Point(x, 10))) // 8 cells - 2 from the previous line
      shared.expectedArea += 10 + 9 - 3 + 8 - 2
      // shared.expectedArea -= 8 // minus the crossing of the horizontal lines on y = -10, -7, -4, -1, 0, 2, 5, 8 = x8

      expect(shared.map.getArea()).toEqual(shared.expectedArea)
    })

    it('should deduce common areas with North (yA-, yB-) + South (yA+, yB-) + North (yA+, yB+) & x=0 lines', () => {
      const x = 0
      shared.map.addLine(new Line(new Point(x, -11), new Point(x, -2))) // 10 cells
      shared.map.addLine(new Line(new Point(x, 4), new Point(x, -4))) // 9 cells - 3 from the previous line
      shared.map.addLine(new Line(new Point(x, 3), new Point(x, 10))) // 8 cells - 2 from the previous line

      // expectedArea should not change as the line already exist from previous tests

      expect(shared.map.getArea()).toEqual(shared.expectedArea)
    })

    it('should deduce common areas with North (yA-, yB-) + South (yA+, yB-) + North (yA+, yB+) & x- lines', () => {
      const x = -index * 3 + 2 // 1: -1, 2: -4, 3: -7, 4: -10 // once odd, once even with two free lines between each
      index++ // each three lines

      shared.map.addLine(new Line(new Point(x, -11), new Point(x, -2))) // 10 cells
      shared.map.addLine(new Line(new Point(x, 4), new Point(x, -4))) // 9 cells - 3 from the previous line
      shared.map.addLine(new Line(new Point(x, 3), new Point(x, 10))) // 8 cells - 2 from the previous line

      shared.expectedArea += 10 + 9 - 3 + 8 - 2
      // shared.expectedArea -= 8 // minus the crossing of the horizontal lines on y = -10, -7, -4, -1, 0, 2, 5, 8 = x8

      expect(shared.map.getArea()).toEqual(shared.expectedArea)
    })

    // SOUTH NORTH NORTH

    it('should deduce common areas with South (yA-, yB-) + North (yA-, yB+) + North (yA+, yB+) & x+ lines', () => {
      const x = index * 3 - 1 // 1: 2, 2: 5, 3: 8, 4: 11 // once even, once odd with two free lines between each

      shared.map.addLine(new Line(new Point(x, -2), new Point(x, -11))) // 10 cells
      shared.map.addLine(new Line(new Point(x, -4), new Point(x, 4))) // 9 cells - 3 from the previous line
      shared.map.addLine(new Line(new Point(x, 3), new Point(x, 10))) // 8 cells - 2 from the previous line
      shared.expectedArea += 10 + 9 - 3 + 8 - 2
      // shared.expectedArea -= 8 // minus the crossing of the horizontal lines on y = -10, -7, -4, -1, 0, 2, 5, 8 = x8

      expect(shared.map.getArea()).toEqual(shared.expectedArea)
    })

    it('should deduce common areas with South (yA-, yB-) + North (yA-, yB+) + North (yA+, yB+) & x=0 lines', () => {
      const x = 0
      shared.map.addLine(new Line(new Point(x, -2), new Point(x, -11))) // 10 cells
      shared.map.addLine(new Line(new Point(x, -4), new Point(x, 4))) // 9 cells - 3 from the previous line
      shared.map.addLine(new Line(new Point(x, 3), new Point(x, 10))) // 8 cells - 2 from the previous line

      // expectedArea should not change as the line already exist from previous tests

      expect(shared.map.getArea()).toEqual(shared.expectedArea)
    })

    it('should deduce common areas with South (yA-, yB-) + North (yA-, yB+) + North (yA+, yB+) & x- lines', () => {
      const x = -index * 3 + 2 // 1: -1, 2: -4, 3: -7, 4: -10 // once odd, once even with two free lines between each
      index++ // each three lines

      shared.map.addLine(new Line(new Point(x, -2), new Point(x, -11))) // 10 cells
      shared.map.addLine(new Line(new Point(x, -4), new Point(x, 4))) // 9 cells - 3 from the previous line
      shared.map.addLine(new Line(new Point(x, 3), new Point(x, 10))) // 8 cells - 2 from the previous line

      shared.expectedArea += 10 + 9 - 3 + 8 - 2
      // shared.expectedArea -= 8 // minus the crossing of the horizontal lines on y = -10, -7, -4, -1, 0, 2, 5, 8 = x8

      expect(shared.map.getArea()).toEqual(shared.expectedArea)
    })
  })
}
