import Map2D from '../map-2d'
import Line from '../line'
import Point from '../point'

export default (shared: { map: Map2D; expectedArea: number }): void => {
  describe('horizontal multiple crossing', () => {
    // vertical lines summary:
    // x = -10, -7, -4, -1, 0, 2, 5, 8, 11

    // EAST

    it('should deduce vertical crossed lines with East (xA-, xB-),  East (xA-, xB+) and East (xA+, xB+) & y+ lines', () => {
      // y = 1, 4 & 7

      shared.map.addLine(new Line(new Point(-11, 1), new Point(-2, 1))) // 10 cells - 3 vertical lines (for x = -10, -7 & -4)
      shared.map.addLine(new Line(new Point(-4, 4), new Point(4, 4))) // 9 cells - 4 vertical lines (for x = -4, -1, 0 & 2)
      shared.map.addLine(new Line(new Point(3, 7), new Point(10, 7))) // 8 cells - 2 vertical lines (for x = 5 & 8)

      shared.expectedArea += 10 - 3 + 9 - 4 + 8 - 2

      expect(shared.map.getArea()).toEqual(shared.expectedArea)
    })

    it('should deduce vertical crossed lines with East (xA-, xB-),  East (xA-, xB+) and East (xA+, xB+) & y- lines', () => {
      // y = -2, -5 & -8

      shared.map.addLine(new Line(new Point(-11, -2), new Point(-2, -2))) // 10 cells - 3 vertical lines (for x = -10, -7 & -4)
      shared.map.addLine(new Line(new Point(-4, -5), new Point(4, -5))) // 9 cells - 4 vertical lines (for x = -4, -1, 0 & 2)
      shared.map.addLine(new Line(new Point(3, -8), new Point(10, -8))) // 8 cells - 2 vertical lines (for x = 5 & 8)

      shared.expectedArea += 10 - 3 + 9 - 4 + 8 - 2

      expect(shared.map.getArea()).toEqual(shared.expectedArea)
    })

    // WEST

    it('should deduce vertical crossed lines with West (xA-, xB-), West (xA-, xB+) and West (xA+, xB+) & y+ lines', () => {
      // y = 3, 6 & 9

      shared.map.addLine(new Line(new Point(-2, 3), new Point(-11, 3))) // 10 cells - 3 vertical lines (for x = -10, -7 & -4)
      shared.map.addLine(new Line(new Point(4, 6), new Point(-4, 6))) // 9 cells - 4 vertical lines (for x = -4, -1, 0 & 2)
      shared.map.addLine(new Line(new Point(10, 9), new Point(3, 9))) // 8 cells - 2 vertical lines (for x = 5 & 8)

      shared.expectedArea += 10 - 3 + 9 - 4 + 8 - 2

      expect(shared.map.getArea()).toEqual(shared.expectedArea)
    })

    it('should deduce vertical crossed lines with West (xA-, xB-), West (xA-, xB+) and West (xA+, xB+) & y- lines', () => {
      // y = -3, -6 & -9

      shared.map.addLine(new Line(new Point(-2, -3), new Point(-11, -3))) // 10 cells - 3 vertical lines (for x = -10, -7 & -4)
      shared.map.addLine(new Line(new Point(4, -6), new Point(-4, -6))) // 9 cells - 4 vertical lines (for x = -4, -1, 0 & 2)
      shared.map.addLine(new Line(new Point(10, -9), new Point(3, -9))) // 8 cells - 2 vertical lines (for x = 5 & 8)

      shared.expectedArea += 10 - 3 + 9 - 4 + 8 - 2

      expect(shared.map.getArea()).toEqual(shared.expectedArea)
    })
  })
}
