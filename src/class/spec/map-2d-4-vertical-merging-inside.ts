import Map2D from '../map-2d'
import Line from '../line'
import Point from '../point'

export default (shared: { map: Map2D; expectedArea: number }): void => {
  describe('horizontal merging inside an existing line', () => {
    // NORTH

    // "yA-"" means the y coordinate of the bottom point of the line (point A) is negative.
    // An "North" line means that the point A of the line is on the bottom and the point B is on the top.
    it('should not change the area with North (yA-, yB-) + North (yA-, yB+) + North (yA+, yB+) & x+ lines', () => {
      const x = 2
      // existing lines go from y = -11 to y = 10

      shared.map.addLine(new Line(new Point(x, -10), new Point(x, -3))) // 8 cells minus 8 as the line already exists
      shared.map.addLine(new Line(new Point(x, -5), new Point(x, 5))) // 11 cells minus 11 as the line already exists
      shared.map.addLine(new Line(new Point(x, 3), new Point(x, 9))) // 7 cells minus 7 as the line already exists

      expect(shared.map.getArea()).toEqual(shared.expectedArea)
    })

    it('should not change the area with North (yA-, yB-), North (yA-, yB+) or North (yA+, yB+) & x=0 lines', () => {
      const x = 0

      shared.map.addLine(new Line(new Point(x, -10), new Point(x, -3))) // 8 cells minus 8 as the line already exists
      shared.map.addLine(new Line(new Point(x, -5), new Point(x, 5))) // 11 cells minus 11 as the line already exists
      shared.map.addLine(new Line(new Point(x, 3), new Point(x, 9))) // 7 cells minus 7 as the line already exists

      expect(shared.map.getArea()).toEqual(shared.expectedArea)
    })

    it('should not change the area with North (xA-, xB-), North (xA-, xB+) or North (xA+, xB+) & y- lines', () => {
      const x = -1

      shared.map.addLine(new Line(new Point(x, -10), new Point(x, -3))) // 8 cells minus 8 as the line already exists
      shared.map.addLine(new Line(new Point(x, -5), new Point(x, 5))) // 11 cells minus 11 as the line already exists
      shared.map.addLine(new Line(new Point(x, 3), new Point(x, 9))) // 7 cells minus 7 as the line already exists

      expect(shared.map.getArea()).toEqual(shared.expectedArea)
    })

    // SOUTH

    it('should not change the area with South (xA-, xB-), South (xA+, xB-) or South (xA+, xB+) & y+ lines', () => {
      const x = 2

      shared.map.addLine(new Line(new Point(x, -10), new Point(x, -3))) // 8 cells minus 8 as the line already exists
      shared.map.addLine(new Line(new Point(x, -5), new Point(x, 5))) // 11 cells minus 11 as the line already exists
      shared.map.addLine(new Line(new Point(x, 3), new Point(x, 9))) // 7 cells minus 7 as the line already exists

      expect(shared.map.getArea()).toEqual(shared.expectedArea)
    })

    it('should not change the area with South (xA-, xB-), South (xA+, xB-) or South (xA+, xB+) & y=0 lines', () => {
      const x = 0

      shared.map.addLine(new Line(new Point(x, -10), new Point(x, -3))) // 8 cells minus 8 as the line already exists
      shared.map.addLine(new Line(new Point(x, -5), new Point(x, 5))) // 11 cells minus 11 as the line already exists
      shared.map.addLine(new Line(new Point(x, 3), new Point(x, 9))) // 7 cells minus 7 as the line already exists

      expect(shared.map.getArea()).toEqual(shared.expectedArea)
    })

    it('should not change the area with South (xA-, xB-), South (xA+, xB-) or South (xA+, xB+) & y- lines', () => {
      const x = -1

      shared.map.addLine(new Line(new Point(x, -10), new Point(x, -3))) // 8 cells minus 8 as the line already exists
      shared.map.addLine(new Line(new Point(x, -5), new Point(x, 5))) // 11 cells minus 11 as the line already exists
      shared.map.addLine(new Line(new Point(x, 3), new Point(x, 9))) // 7 cells minus 7 as the line already exists

      expect(shared.map.getArea()).toEqual(shared.expectedArea)
    })
  })
}
