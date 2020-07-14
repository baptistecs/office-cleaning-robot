import Map2D from '../map-2d'
import Line from '../line'
import Point from '../point'
import HorizontalMerging from './map-2d-1-horizontal-merging'
import VerticalMergingAndCrossing from './map-2d-2-vertical-merging-and-crossing'
import HorizontalMergingInside from './map-2d-3-horizontal-merging-inside'
import VerticalMergingInside from './map-2d-4-vertical-merging-inside'
import HorizontalMergingOutside from './map-2d-5-horizontal-merging-outside'
import VerticalMergingOutside from './map-2d-6-vertical-merging-outside'
import HorizontalCrossing from './map-2d-7-horizontal-crossing'

const shared = {
  map: new Map2D(),
  expectedArea: 0,
}

describe('Map2D', () => {
  it('should have an area equal to 0 with no line added', () => {
    expect(shared.map.getArea()).toEqual(shared.expectedArea)
  })

  it('should have an area equal to 1 with a 1x1 line added', () => {
    shared.map.addLine(new Line(new Point(0, 0), new Point(0, 0)))
    shared.expectedArea += 1

    expect(shared.map.getArea()).toEqual(shared.expectedArea)
  })

  HorizontalMerging(shared)

  VerticalMergingAndCrossing(shared)

  HorizontalMergingInside(shared)

  VerticalMergingInside(shared)

  HorizontalMergingOutside(shared)

  VerticalMergingOutside(shared)

  HorizontalCrossing(shared)
})
