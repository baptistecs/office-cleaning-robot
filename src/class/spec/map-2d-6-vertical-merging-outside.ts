import Map2D from '../map-2d'
import Line from '../line'
import Point from '../point'

export default (shared: { map: Map2D; expectedArea: number }): void => {
  describe('horizontal merging outside an existing line', () => {
    // NORTH

    // "yA-"" means the y coordinate of the left point of the line (point A) is negative.
    // An "North" line means that the point A of the line is on the left and the point B is on the right.
    it('should deduce common areas with North (yA-, yB+) & x+ lines', () => {
      const x = 2
      // existing lines go from y = -11 to y = 10

      shared.map.addLine(new Line(new Point(x, -14), new Point(x, 12))) // 27 cells minus 22 from the existing line

      // There is a horizontal line (x = -11 to 10 & y = 11) crossing this one in this file: "map-2d-horizontal-merging.ts"
      // line 124 for this test "West (xA-, xB-) + East (xA-, xB+) + West (xA+, xB+) & y+ lines"

      // There is another horizontal line (y = -11 to 10 & y = -13) in the same file line 183 for this test
      // "East (xA-, xB-) + West (xA+, xB-) + West (xA+, xB+) & y- lines"

      shared.expectedArea += 27 - 22 - 2

      expect(shared.map.getArea()).toEqual(shared.expectedArea)
    })

    it('should deduce common areas with North (yA-, yB+) & x=0 lines', () => {
      const x = 0

      shared.map.addLine(new Line(new Point(x, -14), new Point(x, 12))) // 27 cells minus 22 from the existing line

      shared.expectedArea += 27 - 22 - 2 // Minus the same 2 horizontal lines crossing this line

      expect(shared.map.getArea()).toEqual(shared.expectedArea)
    })

    it('should deduce common areas with North (yA-, yB+) & x- lines', () => {
      const x = -1

      shared.map.addLine(new Line(new Point(x, -14), new Point(x, 12))) // 27 cells minus 22 from the existing line

      shared.expectedArea += 27 - 22 - 2 // Minus the same 2 horizontal lines crossing this line

      expect(shared.map.getArea()).toEqual(shared.expectedArea)
    })

    // SOUTH

    it('should deduce common areas with South (yA+, yB-) & x+ lines', () => {
      const x = 5

      shared.map.addLine(new Line(new Point(x, 12), new Point(x, -14))) // 27 cells minus 22 from the existing line

      shared.expectedArea += 27 - 22 - 2 // Minus the same 2 horizontal lines crossing this line

      expect(shared.map.getArea()).toEqual(shared.expectedArea)
    })

    it('should deduce common areas with South (yA+, yB-) & x=0 lines', () => {
      const x = 0

      shared.map.addLine(new Line(new Point(x, 12), new Point(x, -14))) // 27 cells minus 27 from the existing NORTH test line

      expect(shared.map.getArea()).toEqual(shared.expectedArea)
    })

    it('should deduce common areas with South (yA+, yB-) & x- lines', () => {
      const x = -4

      shared.map.addLine(new Line(new Point(x, 12), new Point(x, -14))) // 27 cells minus 22 from the existing line

      shared.expectedArea += 27 - 22 - 2 // Minus the same 2 horizontal lines crossing this line

      expect(shared.map.getArea()).toEqual(shared.expectedArea)
    })
  })
}
