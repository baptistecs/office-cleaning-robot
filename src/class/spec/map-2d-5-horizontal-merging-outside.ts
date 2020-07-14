import Map2D from '../map-2d'
import Line from '../line'
import Point from '../point'

export default (shared: { map: Map2D; expectedArea: number }): void => {
  describe('horizontal merging outside an existing line', () => {
    // EAST

    // "xA-"" means the x coordinate of the left point of the line (point A) is negative.
    // An "East" line means that the point A of the line is on the left and the point B is on the right.
    it('should deduce common areas with East (xA-, xB+) & y+ lines', () => {
      const y = 2
      // existing lines go from x = -11 to x = 10

      shared.map.addLine(new Line(new Point(-14, y), new Point(12, y))) // 27 cells minus 22 from the existing line

      // There is a vertical line (x = 11 & y = -11 to 10) crossing this one in this file: "map-2d-vertical-merging-and-crossing"
      // line 139 for this test "South (yA-, yB-) + North (yA-, yB+) + South (yA+, yB+) & x+ lines"

      // There is another vertical line (x = -13 & y = -11 to 10) in the same file line 202 for this test
      // "North (yA-, yB-) + South (yA+, yB-) + South (yA+, yB+) & x- lines"

      shared.expectedArea += 27 - 22 - 2

      expect(shared.map.getArea()).toEqual(shared.expectedArea)
    })

    it('should deduce common areas with East (xA-, xB+) & y=0 lines', () => {
      const y = 0

      shared.map.addLine(new Line(new Point(-14, y), new Point(12, y))) // 27 cells minus 22 from the existing line

      shared.expectedArea += 27 - 22 - 2 // Minus the same 2 vertical lines crossing this line

      expect(shared.map.getArea()).toEqual(shared.expectedArea)
    })

    it('should deduce common areas with East (xA-, xB+) & y- lines', () => {
      const y = -1

      shared.map.addLine(new Line(new Point(-14, y), new Point(12, y))) // 27 cells minus 22 from the existing line

      shared.expectedArea += 27 - 22 - 2 // Minus the same 2 vertical lines crossing this line

      expect(shared.map.getArea()).toEqual(shared.expectedArea)
    })

    // WEST

    it('should deduce common areas with West (xA+, xB-) & y+ lines', () => {
      const y = 5

      shared.map.addLine(new Line(new Point(12, y), new Point(-14, y))) // 27 cells minus 22 from the existing line

      shared.expectedArea += 27 - 22 - 2 // Minus the same 2 vertical lines crossing this line

      expect(shared.map.getArea()).toEqual(shared.expectedArea)
    })

    it('should deduce common areas with West (xA+, xB-) & y=0 lines', () => {
      const y = 0

      shared.map.addLine(new Line(new Point(12, y), new Point(-14, y))) // 27 cells minus 27 from the existing EAST test line

      expect(shared.map.getArea()).toEqual(shared.expectedArea)
    })

    it('should deduce common areas with West (xA+, xB-) & y- lines', () => {
      const y = -4

      shared.map.addLine(new Line(new Point(12, y), new Point(-14, y))) // 27 cells minus 22 from the  existing line

      shared.expectedArea += 27 - 22 - 2 // Minus the same 2 vertical lines crossing this line

      expect(shared.map.getArea()).toEqual(shared.expectedArea)
    })
  })
}
