import Map2D from '../map-2d'
import Line from '../line'
import Point from '../point'

export default (shared: { map: Map2D; expectedArea: number }): void => {
  describe('horizontal merging inside an existing line', () => {
    // EAST

    // "xA-"" means the x coordinate of the left point of the line (point A) is negative.
    // An "East" line means that the point A of the line is on the left and the point B is on the right.
    it('should not change the area with East (xA-, xB-), East (xA-, xB+) or East (xA+, xB+) & y+ lines', () => {
      const y = 2
      // existing lines go from x = -11 to x = 10

      shared.map.addLine(new Line(new Point(-10, y), new Point(-3, y))) // 8 cells minus 8 as the line already exists
      shared.map.addLine(new Line(new Point(-5, y), new Point(5, y))) // 11 cells minus 11 as the line already exists
      shared.map.addLine(new Line(new Point(3, y), new Point(9, y))) // 7 cells minus 7 as the line already exists

      expect(shared.map.getArea()).toEqual(shared.expectedArea)
    })

    it('should not change the area with East (xA-, xB-), East (xA-, xB+) or East (xA+, xB+) & y=0 lines', () => {
      const y = 0

      shared.map.addLine(new Line(new Point(-10, y), new Point(-3, y))) // 8 cells minus 8 as the line already exists
      shared.map.addLine(new Line(new Point(-5, y), new Point(5, y))) // 11 cells minus 11 as the line already exists
      shared.map.addLine(new Line(new Point(3, y), new Point(9, y))) // 7 cells minus 7 as the line already exists

      expect(shared.map.getArea()).toEqual(shared.expectedArea)
    })

    it('should not change the area with East (xA-, xB-), East (xA-, xB+) or East (xA+, xB+) & y- lines', () => {
      const y = -1

      shared.map.addLine(new Line(new Point(-10, y), new Point(-3, y))) // 8 cells minus 8 as the line already exists
      shared.map.addLine(new Line(new Point(-5, y), new Point(5, y))) // 11 cells minus 11 as the line already exists
      shared.map.addLine(new Line(new Point(3, y), new Point(9, y))) // 7 cells minus 7 as the line already exists

      expect(shared.map.getArea()).toEqual(shared.expectedArea)
    })

    // WEST

    it('should not change the area with West (xA-, xB-), West (xA+, xB-) or West (xA+, xB+) & y+ lines', () => {
      const y = 2

      shared.map.addLine(new Line(new Point(-3, y), new Point(-10, y))) // 8 cells minus 8 as the line already exists
      shared.map.addLine(new Line(new Point(5, y), new Point(-5, y))) // 11 cells minus 11 as the line already exists
      shared.map.addLine(new Line(new Point(9, y), new Point(3, y))) // 7 cells minus 7 as the line already exists

      expect(shared.map.getArea()).toEqual(shared.expectedArea)
    })

    it('should not change the area with West (xA-, xB-), West (xA+, xB-) or West (xA+, xB+) & y=0 lines', () => {
      const y = 0

      shared.map.addLine(new Line(new Point(-3, y), new Point(-10, y))) // 8 cells minus 8 as the line already exists
      shared.map.addLine(new Line(new Point(5, y), new Point(-5, y))) // 11 cells minus 11 as the line already exists
      shared.map.addLine(new Line(new Point(9, y), new Point(3, y))) // 7 cells minus 7 as the line already exists

      expect(shared.map.getArea()).toEqual(shared.expectedArea)
    })

    it('should not change the area with West (xA-, xB-), West (xA+, xB-) or West (xA+, xB+) & y- lines', () => {
      const y = -1

      shared.map.addLine(new Line(new Point(-3, y), new Point(-10, y))) // 8 cells minus 8 as the line already exists
      shared.map.addLine(new Line(new Point(5, y), new Point(-5, y))) // 11 cells minus 11 as the line already exists
      shared.map.addLine(new Line(new Point(9, y), new Point(3, y))) // 7 cells minus 7 as the line already exists

      expect(shared.map.getArea()).toEqual(shared.expectedArea)
    })
  })
}
