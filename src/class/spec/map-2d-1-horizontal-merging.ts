import Map2D from '../map-2d'
import Line from '../line'
import Point from '../point'

export default (shared: { map: Map2D; expectedArea: number }): void => {
  let index = 1
  describe('horizontal multiple merging', () => {
    // EAST EAST EAST

    // "xA-"" means the x coordinate of the left point of the line (point A) is negative.
    // An "East" line means that the point A of the line is on the left and the point B is on the right.
    it('should deduce common areas with East (xA-, xB-) + East (xA-, xB+) + East (xA+, xB+) & y+ lines', () => {
      const y = index * 3 - 1 // 1: 2, 2: 5, 3: 8, 4: 11 // once even, once odd with two free lines between each

      shared.map.addLine(new Line(new Point(-11, y), new Point(-2, y))) // 10 cells
      shared.map.addLine(new Line(new Point(-4, y), new Point(4, y))) // 9 cells - 3 from the previous line
      shared.map.addLine(new Line(new Point(3, y), new Point(10, y))) // 8 cells - 2 from the previous line
      shared.expectedArea += 10 + 9 - 3 + 8 - 2

      expect(shared.map.getArea()).toEqual(shared.expectedArea)
    })

    it('should deduce common areas with East (xA-, xB-) + East (xA-, xB+) + East (xA+, xB+) & y=0 lines', () => {
      const y = 0

      shared.map.addLine(new Line(new Point(-11, y), new Point(-2, y))) // 10 cells
      shared.map.addLine(new Line(new Point(-4, y), new Point(4, y))) // 9 cells - 3 from the previous line
      shared.map.addLine(new Line(new Point(3, y), new Point(10, y))) // 8 cells - 2 from the previous line

      shared.expectedArea += 10 + 9 - 3 - 1 + 8 - 2 // minus 1 for the "1x1 line" previous test which is on the same line

      expect(shared.map.getArea()).toEqual(shared.expectedArea)
    })

    it('should deduce common areas with East (xA-, xB-) + East (xA-, xB+) + East (xA+, xB+) & y- lines', () => {
      const y = -index * 3 + 2 // 1: -1, 2: -4, 3: -7, 4: -10 // once odd, once even with two free lines between each
      index++ // each three lines

      shared.map.addLine(new Line(new Point(-11, y), new Point(-2, y))) // 10 cells
      shared.map.addLine(new Line(new Point(-4, y), new Point(4, y))) // 9 cells - 3 from the previous line
      shared.map.addLine(new Line(new Point(3, y), new Point(10, y))) // 8 cells - 2 from the previous line

      shared.expectedArea += 10 + 9 - 3 + 8 - 2

      expect(shared.map.getArea()).toEqual(shared.expectedArea)
    })

    // WEST WEST WEST

    it('should deduce common areas with West (xA-, xB-) + West (xA+, xB-) + West (xA+, xB+) & y+ lines', () => {
      const y = index * 3 - 1 // 1: 2, 2: 5, 3: 8, 4: 11 // once even, once odd with two free lines between each

      shared.map.addLine(new Line(new Point(-2, y), new Point(-11, y))) // 10 cells
      shared.map.addLine(new Line(new Point(4, y), new Point(-4, y))) // 9 cells - 3 from the previous line
      shared.map.addLine(new Line(new Point(10, y), new Point(3, y))) // 8 cells - 2 from the previous line
      shared.expectedArea += 10 + 9 - 3 + 8 - 2

      expect(shared.map.getArea()).toEqual(shared.expectedArea)
    })

    it('should deduce common areas with West (xA-, xB-) + West (xA+, xB-) + West (xA+, xB+) & y=0 lines', () => {
      const y = 0
      shared.map.addLine(new Line(new Point(-2, y), new Point(-11, y))) // 10 cells
      shared.map.addLine(new Line(new Point(4, y), new Point(-4, y))) // 9 cells - 3 from the previous line
      shared.map.addLine(new Line(new Point(10, y), new Point(3, y))) // 8 cells - 2 from the previous line

      // expectedArea should not change as the line already exist from previous tests

      expect(shared.map.getArea()).toEqual(shared.expectedArea)
    })

    it('should deduce common areas with West (xA-, xB-) + West (xA+, xB-) + West (xA+, xB+) & y- lines', () => {
      const y = -index * 3 + 2 // 1: -1, 2: -4, 3: -7, 4: -10 // once odd, once even with two free lines between each
      index++ // each three lines

      shared.map.addLine(new Line(new Point(-2, y), new Point(-11, y))) // 10 cells
      shared.map.addLine(new Line(new Point(4, y), new Point(-4, y))) // 9 cells - 3 from the previous line
      shared.map.addLine(new Line(new Point(10, y), new Point(3, y))) // 8 cells - 2 from the previous line

      shared.expectedArea += 10 + 9 - 3 + 8 - 2

      expect(shared.map.getArea()).toEqual(shared.expectedArea)
    })

    // WEST WEST EAST

    it('should deduce common areas with West (xA-, xB-) + West (xA+, xB-) + East (xA+, xB+) & y+ lines', () => {
      const y = index * 3 - 1 // 1: 2, 2: 5, 3: 8, 4: 11 // once even, once odd with two free lines between each

      shared.map.addLine(new Line(new Point(-2, y), new Point(-11, y))) // 10 cells
      shared.map.addLine(new Line(new Point(4, y), new Point(-4, y))) // 9 cells - 3 from the previous line
      shared.map.addLine(new Line(new Point(3, y), new Point(10, y))) // 8 cells - 2 from the previous line
      shared.expectedArea += 10 + 9 - 3 + 8 - 2

      expect(shared.map.getArea()).toEqual(shared.expectedArea)
    })

    it('should deduce common areas with West (xA-, xB-) + West (xA+, xB-) + East (xA+, xB+) & y=0 lines', () => {
      const y = 0
      shared.map.addLine(new Line(new Point(-2, y), new Point(-11, y))) // 10 cells
      shared.map.addLine(new Line(new Point(4, y), new Point(-4, y))) // 9 cells - 3 from the previous line
      shared.map.addLine(new Line(new Point(3, y), new Point(10, y))) // 8 cells - 2 from the previous line

      // expectedArea should not change as the line already exist from previous tests

      expect(shared.map.getArea()).toEqual(shared.expectedArea)
    })

    it('should deduce common areas with West (xA-, xB-) + West (xA+, xB-) + East (xA+, xB+) & y- lines', () => {
      const y = -index * 3 + 2 // 1: -1, 2: -4, 3: -7, 4: -10 // once odd, once even with two free lines between each
      index++ // each three lines

      shared.map.addLine(new Line(new Point(-2, y), new Point(-11, y))) // 10 cells
      shared.map.addLine(new Line(new Point(4, y), new Point(-4, y))) // 9 cells - 3 from the previous line
      shared.map.addLine(new Line(new Point(3, y), new Point(10, y))) // 8 cells - 2 from the previous line

      shared.expectedArea += 10 + 9 - 3 + 8 - 2

      expect(shared.map.getArea()).toEqual(shared.expectedArea)
    })

    // WEST EAST WEST
    // x = 2, y = -14 to -12 or 11 to 12
    it('should deduce common areas with West (xA-, xB-) + East (xA-, xB+) + West (xA+, xB+) & y+ lines', () => {
      const y = index * 3 - 1 // 1: 2, 2: 5, 3: 8, 4: 11 // once even, once odd with two free lines between each

      shared.map.addLine(new Line(new Point(-2, y), new Point(-11, y))) // 10 cells
      shared.map.addLine(new Line(new Point(-4, y), new Point(4, y))) // 9 cells - 3 from the previous line
      shared.map.addLine(new Line(new Point(10, y), new Point(3, y))) // 8 cells - 2 from the previous line
      shared.expectedArea += 10 + 9 - 3 + 8 - 2

      expect(shared.map.getArea()).toEqual(shared.expectedArea)
    })

    it('should deduce common areas with West (xA-, xB-) + East (xA-, xB+) + West (xA+, xB+) & y=0 lines', () => {
      const y = 0
      shared.map.addLine(new Line(new Point(-2, y), new Point(-11, y))) // 10 cells
      shared.map.addLine(new Line(new Point(-4, y), new Point(4, y))) // 9 cells - 3 from the previous line
      shared.map.addLine(new Line(new Point(10, y), new Point(3, y))) // 8 cells - 2 from the previous line

      // expectedArea should not change as the line already exist from previous tests

      expect(shared.map.getArea()).toEqual(shared.expectedArea)
    })

    it('should deduce common areas with West (xA-, xB-) + East (xA-, xB+) + West (xA+, xB+) & y- lines', () => {
      const y = -index * 3 + 2 // 1: -1, 2: -4, 3: -7, 4: -10 // once odd, once even with two free lines between each
      index++ // each three lines

      shared.map.addLine(new Line(new Point(-2, y), new Point(-11, y))) // 10 cells
      shared.map.addLine(new Line(new Point(-4, y), new Point(4, y))) // 9 cells - 3 from the previous line
      shared.map.addLine(new Line(new Point(10, y), new Point(3, y))) // 8 cells - 2 from the previous line

      shared.expectedArea += 10 + 9 - 3 + 8 - 2

      expect(shared.map.getArea()).toEqual(shared.expectedArea)
    })

    // EAST WEST WEST

    it('should deduce common areas with East (xA-, xB-) + West (xA+, xB-) + West (xA+, xB+) & y+ lines', () => {
      const y = index * 3 - 1 // 1: 2, 2: 5, 3: 8, 4: 11 // once even, once odd with two free lines between each

      shared.map.addLine(new Line(new Point(-11, y), new Point(-2, y))) // 10 cells
      shared.map.addLine(new Line(new Point(4, y), new Point(-4, y))) // 9 cells - 3 from the previous line
      shared.map.addLine(new Line(new Point(10, y), new Point(3, y))) // 8 cells - 2 from the previous line
      shared.expectedArea += 10 + 9 - 3 + 8 - 2

      expect(shared.map.getArea()).toEqual(shared.expectedArea)
    })

    it('should deduce common areas with East (xA-, xB-) + West (xA+, xB-) + West (xA+, xB+) & y=0 lines', () => {
      const y = 0
      shared.map.addLine(new Line(new Point(-11, y), new Point(-2, y))) // 10 cells
      shared.map.addLine(new Line(new Point(4, y), new Point(-4, y))) // 9 cells - 3 from the previous line
      shared.map.addLine(new Line(new Point(10, y), new Point(3, y))) // 8 cells - 2 from the previous line

      // expectedArea should not change as the line already exist from previous tests

      expect(shared.map.getArea()).toEqual(shared.expectedArea)
    })

    it('should deduce common areas with East (xA-, xB-) + West (xA+, xB-) + West (xA+, xB+) & y- lines', () => {
      const y = -index * 3 + 2 // 1: -1, 2: -4, 3: -7, 4: -10 // once odd, once even with two free lines between each
      index++ // each three lines

      shared.map.addLine(new Line(new Point(-11, y), new Point(-2, y))) // 10 cells
      shared.map.addLine(new Line(new Point(4, y), new Point(-4, y))) // 9 cells - 3 from the previous line
      shared.map.addLine(new Line(new Point(10, y), new Point(3, y))) // 8 cells - 2 from the previous line

      shared.expectedArea += 10 + 9 - 3 + 8 - 2

      expect(shared.map.getArea()).toEqual(shared.expectedArea)
    })

    // EAST EAST WEST

    it('should deduce common areas with East (xA-, xB-) + East (xA-, xB+) + West (xA+, xB+) & y+ lines', () => {
      const y = index * 3 - 1 // 1: 2, 2: 5, 3: 8, 4: 11 // once even, once odd with two free lines between each

      shared.map.addLine(new Line(new Point(-11, y), new Point(-2, y))) // 10 cells
      shared.map.addLine(new Line(new Point(-4, y), new Point(4, y))) // 9 cells - 3 from the previous line
      shared.map.addLine(new Line(new Point(10, y), new Point(3, y))) // 8 cells - 2 from the previous line
      shared.expectedArea += 10 + 9 - 3 + 8 - 2

      expect(shared.map.getArea()).toEqual(shared.expectedArea)
    })

    it('should deduce common areas with East (xA-, xB-) + East (xA-, xB+) + West (xA+, xB+) & y=0 lines', () => {
      const y = 0
      shared.map.addLine(new Line(new Point(-11, y), new Point(-2, y))) // 10 cells
      shared.map.addLine(new Line(new Point(-4, y), new Point(4, y))) // 9 cells - 3 from the previous line
      shared.map.addLine(new Line(new Point(10, y), new Point(3, y))) // 8 cells - 2 from the previous line

      // expectedArea should not change as the line already exist from previous tests

      expect(shared.map.getArea()).toEqual(shared.expectedArea)
    })

    it('should deduce common areas with East (xA-, xB-) + East (xA-, xB+) + West (xA+, xB+) & y- lines', () => {
      const y = -index * 3 + 2 // 1: -1, 2: -4, 3: -7, 4: -10 // once odd, once even with two free lines between each
      index++ // each three lines

      shared.map.addLine(new Line(new Point(-11, y), new Point(-2, y))) // 10 cells
      shared.map.addLine(new Line(new Point(-4, y), new Point(4, y))) // 9 cells - 3 from the previous line
      shared.map.addLine(new Line(new Point(10, y), new Point(3, y))) // 8 cells - 2 from the previous line

      shared.expectedArea += 10 + 9 - 3 + 8 - 2

      expect(shared.map.getArea()).toEqual(shared.expectedArea)
    })

    // EAST WEST EAST

    it('should deduce common areas with East (xA-, xB-) + West (xA+, xB-) + East (xA+, xB+) & y+ lines', () => {
      const y = index * 3 - 1 // 1: 2, 2: 5, 3: 8, 4: 11 // once even, once odd with two free lines between each

      shared.map.addLine(new Line(new Point(-11, y), new Point(-2, y))) // 10 cells
      shared.map.addLine(new Line(new Point(4, y), new Point(-4, y))) // 9 cells - 3 from the previous line
      shared.map.addLine(new Line(new Point(3, y), new Point(10, y))) // 8 cells - 2 from the previous line
      shared.expectedArea += 10 + 9 - 3 + 8 - 2

      expect(shared.map.getArea()).toEqual(shared.expectedArea)
    })

    it('should deduce common areas with East (xA-, xB-) + West (xA+, xB-) + East (xA+, xB+) & y=0 lines', () => {
      const y = 0
      shared.map.addLine(new Line(new Point(-11, y), new Point(-2, y))) // 10 cells
      shared.map.addLine(new Line(new Point(4, y), new Point(-4, y))) // 9 cells - 3 from the previous line
      shared.map.addLine(new Line(new Point(3, y), new Point(10, y))) // 8 cells - 2 from the previous line

      // expectedArea should not change as the line already exist from previous tests

      expect(shared.map.getArea()).toEqual(shared.expectedArea)
    })

    it('should deduce common areas with East (xA-, xB-) + West (xA+, xB-) + East (xA+, xB+) & y- lines', () => {
      const y = -index * 3 + 2 // 1: -1, 2: -4, 3: -7, 4: -10 // once odd, once even with two free lines between each
      index++ // each three lines

      shared.map.addLine(new Line(new Point(-11, y), new Point(-2, y))) // 10 cells
      shared.map.addLine(new Line(new Point(4, y), new Point(-4, y))) // 9 cells - 3 from the previous line
      shared.map.addLine(new Line(new Point(3, y), new Point(10, y))) // 8 cells - 2 from the previous line

      shared.expectedArea += 10 + 9 - 3 + 8 - 2

      expect(shared.map.getArea()).toEqual(shared.expectedArea)
    })

    // WEST EAST EAST

    it('should deduce common areas with West (xA-, xB-) + East (xA-, xB+) + East (xA+, xB+) & y+ lines', () => {
      const y = index * 3 - 1 // 1: 2, 2: 5, 3: 8, 4: 11 // once even, once odd with two free lines between each

      shared.map.addLine(new Line(new Point(-2, y), new Point(-11, y))) // 10 cells
      shared.map.addLine(new Line(new Point(-4, y), new Point(4, y))) // 9 cells - 3 from the previous line
      shared.map.addLine(new Line(new Point(3, y), new Point(10, y))) // 8 cells - 2 from the previous line
      shared.expectedArea += 10 + 9 - 3 + 8 - 2

      expect(shared.map.getArea()).toEqual(shared.expectedArea)
    })

    it('should deduce common areas with West (xA-, xB-) + East (xA-, xB+) + East (xA+, xB+) & y=0 lines', () => {
      const y = 0
      shared.map.addLine(new Line(new Point(-2, y), new Point(-11, y))) // 10 cells
      shared.map.addLine(new Line(new Point(-4, y), new Point(4, y))) // 9 cells - 3 from the previous line
      shared.map.addLine(new Line(new Point(3, y), new Point(10, y))) // 8 cells - 2 from the previous line

      // expectedArea should not change as the line already exist from previous tests

      expect(shared.map.getArea()).toEqual(shared.expectedArea)
    })

    it('should deduce common areas with West (xA-, xB-) + East (xA-, xB+) + East (xA+, xB+) & y- lines', () => {
      const y = -index * 3 + 2 // 1: -1, 2: -4, 3: -7, 4: -10 // once odd, once even with two free lines between each
      // index++ // each three lines // not needed as there is no more test

      shared.map.addLine(new Line(new Point(-2, y), new Point(-11, y))) // 10 cells
      shared.map.addLine(new Line(new Point(-4, y), new Point(4, y))) // 9 cells - 3 from the previous line
      shared.map.addLine(new Line(new Point(3, y), new Point(10, y))) // 8 cells - 2 from the previous line

      shared.expectedArea += 10 + 9 - 3 + 8 - 2

      expect(shared.map.getArea()).toEqual(shared.expectedArea)
    })
  })
}
