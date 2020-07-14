import Line from './line'
import HorizontalLine from './horizontal-line'
import VerticalLine from './vertical-line'
import Orientation from '../types/orientation'

class Map2D {
  private xMin: number
  private xMax: number
  private yMin: number
  private yMax: number
  private normalized: boolean
  private autoMerge: boolean
  private horizontalLines: HorizontalLine[]
  private verticalLines: VerticalLine[]

  constructor(xMin = -100000, xMax = 100000, yMin = -100000, yMax = 100000, normalized = true, autoMerge = true) {
    if (autoMerge && !normalized) {
      // It should not be implemented as it's less efficient, unless there is a specific need for it
      throw new Error('"autoMerge" without "normalized" is not implemented.')
    }

    this.xMin = xMin
    this.xMax = xMax
    this.yMin = yMin
    this.yMax = yMax
    this.normalized = normalized
    this.autoMerge = autoMerge
    this.horizontalLines = []
    this.verticalLines = []
  }

  getArea(): number {
    let area = 0

    for (let i = 0; i < this.horizontalLines.length; i++) {
      const horizontalLine = this.horizontalLines[i]
      // If xA = 0 and xB = 1, area = 2 = xB - xA + 1
      // (Only if xB > xA but as the line is normalized it's always fine)
      area += horizontalLine.xB - horizontalLine.xA + 1

      for (let i = 0; i < this.verticalLines.length; i++) {
        const verticalLine = this.verticalLines[i]
        // If the vertical line is in between the horizontal line extremities
        if (verticalLine.x >= horizontalLine.xA && verticalLine.x <= horizontalLine.xB) {
          // If the horizontal line is in between the vertical line extremities
          if (horizontalLine.y >= verticalLine.yA && horizontalLine.y <= verticalLine.yB) {
            // We deduce one crossing cell
            area--
          }
        }
      }
    }

    for (let i = 0; i < this.verticalLines.length; i++) {
      const verticalLine = this.verticalLines[i]
      // If yA = 0 and yB = 1, area = 2 = yB - yA + 1
      // (Only if yB > yA but as the line is normalized it's always fine)
      area += verticalLine.yB - verticalLine.yA + 1
      // Nothing to deduce here as it has already been done one time
    }

    return area
  }

  updateHorizontalLine(
    mergingStatus: number,
    horizontalLineIndex: number,
    line: HorizontalLine
  ): { horizontalLineIndex: number; mergingStatus: number } {
    // If the new line is an existing line merged with another line
    if (mergingStatus >= 0) {
      // Instead of simply deleting the existing line and updating the current one which is
      // 10x less efficient than a "Swap delete" (https://jsperf.com/array-remove-by-index)
      // We update the existing line, with the current one and the new one merged together
      this.horizontalLines[mergingStatus] = line
      // We replace the current line by the last line
      this.horizontalLines[horizontalLineIndex] = this.horizontalLines[this.horizontalLines.length - 1]
      // We delete the last line
      this.horizontalLines.pop()
      // We decrease the index so the current line is processed as well (as it contains the last line)
      horizontalLineIndex--
    } else {
      // this.horizontalLines[horizontalLineIndex] = line // Not necessary as it is passed by reference
      mergingStatus = horizontalLineIndex // to be use for multi merge
    }

    return { horizontalLineIndex, mergingStatus }
  }

  updateVerticalLine(
    mergingStatus: number,
    verticalLineIndex: number,
    line: VerticalLine
  ): { verticalLineIndex: number; mergingStatus: number } {
    // If the new line is an existing line merged with another line
    if (mergingStatus >= 0) {
      // Instead of simply deleting the existing line and updating the current one which is
      // 10x less efficient than a "Swap delete" (https://jsperf.com/array-remove-by-index)
      // We update the existing line, with the current one and the new one merged together
      this.verticalLines[mergingStatus] = line
      // We replace the current line by the last line
      this.verticalLines[verticalLineIndex] = this.verticalLines[this.verticalLines.length - 1]
      // We delete the last line
      this.verticalLines.pop()
      // We decrease the index so the current line is processed as well (as it contains the last line)
      verticalLineIndex--
    } else {
      // this.verticalLines[verticalLineIndex] = line // Not necessary as it is passed by reference
      mergingStatus = verticalLineIndex // to be use for multi merge
    }

    return { verticalLineIndex, mergingStatus }
  }

  // There will never be a line going outside the bounds of the plane. // No need to check
  addLine(newLine: Line): void {
    let mergingStatus = -1 // use enum

    if (this.normalized) {
      newLine.normalize()
    }

    // Horizontal line process
    if (newLine.getOrientation() === Orientation.Horizontal) {
      if (this.autoMerge) {
        for (let i = 0; i < this.horizontalLines.length; i++) {
          const line = this.horizontalLines[i]
          // If the new line is not on the same (horizontal) line ?
          if (line.y !== newLine.A.y) {
            // We continue to check if the line doesn't collide with another horizontal line
            continue
          }

          const newLineLeftIsInside = newLine.A.x >= line.xA && newLine.A.x <= line.xB
          const newLineRightIsInside = newLine.B.x >= line.xA && newLine.B.x <= line.xB

          if (newLineLeftIsInside) {
            // If the new line is inside the existing line, there is no need to add the new line
            if (newLineRightIsInside) {
              mergingStatus = -2
              break
            } else {
              // We merge the two lines
              newLine.A.x = line.xA // We update the new line, so it represent the both lines merged, in order to check the next lines
              line.xB = newLine.B.x // We update the current line
              ;({ horizontalLineIndex: i, mergingStatus } = this.updateHorizontalLine(mergingStatus, i, line))
              // We continue to check if the remaining part doesn't collide with another horizontal line
              continue
            }
          } else if (newLineRightIsInside) {
            // We merge the two lines
            newLine.B.x = line.xB // We update the new line, so it represent the both lines merged, in order to check the next lines
            line.xA = newLine.A.x // We update the current line
            ;({ horizontalLineIndex: i, mergingStatus } = this.updateHorizontalLine(mergingStatus, i, line))
            // We continue to check if the remaining part doesn't collide with another horizontal line
            continue
          }

          // The new line having both ends outside the current one doesn't mean that the current one is not inside the new one
          // If one of the ends of the current line is inside the new one, that means that both ends are inside
          // If line left is inside
          if (line.xA > newLine.A.x && line.xA < newLine.B.x) {
            // We replace the current line by the new one
            line.xA = newLine.A.x
            line.xB = newLine.B.x
            ;({ horizontalLineIndex: i, mergingStatus } = this.updateHorizontalLine(mergingStatus, i, line))
            continue
          }
        }
      }

      // If the line is not merged or part of an existing line
      if (mergingStatus === -1) {
        // We can add it
        this.horizontalLines.push(
          // If newLine is not normalized, the HorizontalLine length can be negative
          // Which simply means "going on the left" for an horizontal line
          new HorizontalLine(newLine.A.x, newLine.B.x, newLine.A.y)
        )
      }
    }

    // Vertical line process
    else {
      if (this.autoMerge) {
        for (let i = 0; i < this.verticalLines.length; i++) {
          const line = this.verticalLines[i]
          // If the new line is not on the same (vertical) line ?
          if (line.x !== newLine.A.x) {
            // We continue to check if the line doesn't collide with another vertical line
            continue
          }

          const newLineBottomIsInside = newLine.A.y >= line.yA && newLine.A.y <= line.yB
          const newLineTopIsInside = newLine.B.y >= line.yA && newLine.B.y <= line.yB

          if (newLineBottomIsInside) {
            // If the new line is inside the existing line, there is no need to add the new line
            if (newLineTopIsInside) {
              mergingStatus = -2
              break
            } else {
              // We merge the two lines
              newLine.A.y = line.yA // We update the new line, so it represent the both lines merged, in order to check the next lines
              line.yB = newLine.B.y // We update the current line
              ;({ verticalLineIndex: i, mergingStatus } = this.updateVerticalLine(mergingStatus, i, line))
              // We continue to check if the remaining part doesn't collide with another vertical line
              continue
            }
          } else if (newLineTopIsInside) {
            // We merge the two lines
            newLine.B.y = line.yB // We update the new line, so it represent the both lines merged, in order to check the next lines
            line.yA = newLine.A.y // We update the current line
            ;({ verticalLineIndex: i, mergingStatus } = this.updateVerticalLine(mergingStatus, i, line))
            // We continue to check if the remaining part doesn't collide with another vertical line
            continue
          }

          // The new line having both ends outside the current one doesn't mean that the current one is not inside the new one
          // If one of the ends of the current line is inside the new one, that means that both ends are inside
          // If line bottom is inside
          if (line.yA > newLine.A.y && line.yA < newLine.B.y) {
            // We replace the current line by the new one
            line.yA = newLine.A.y
            line.yB = newLine.B.y
            ;({ verticalLineIndex: i, mergingStatus } = this.updateVerticalLine(mergingStatus, i, line))
            continue
          }
        }
      }

      // If the line is not merged or part of an existing line
      if (mergingStatus === -1) {
        // We can add it
        this.verticalLines.push(
          // If newLine is not normalized, the VerticalLine length can be negative
          // Which simply means "going on the left" for an vertical line
          new VerticalLine(newLine.A.x, newLine.A.y, newLine.B.y)
        )
      }
    }
  }
}

export default Map2D
