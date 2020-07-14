import fs from 'fs'
import readline from 'readline'
import Point from './point'
import RobotCommand from '../types/robot-command'
import CompassDirection from '../types/compass-direction'
import Line from './line'
// import HorizontalLine from './horizontal-line'
// import VerticalLine from './vertical-line'

type onMove = (path: Line) => void
// type onHorizontalMove = (line: VerticalLine) => void
// type onVerticalMove = (line: HorizontalLine) => void
type onMoveOver = () => void

class Robot {
  // Path of the instruction file
  private filePath!: string // definite assignment assertion
  // Number of commands in the instruction
  private nbCommands?: number
  // Initially set from the instruction then updated after each move
  private nextStartingPoint?: Point
  private onMove?: onMove
  private onMoveOver?: onMoveOver

  constructor(filePath: string, onMove?: onMove, onMoveOver?: onMoveOver) {
    this.setInstruction(filePath)
    if (onMove) {
      this.onMove = onMove
    }
    if (onMoveOver) {
      this.onMoveOver = onMoveOver
    }
  }

  move(command: RobotCommand): void {
    const A = this.nextStartingPoint || new Point(0, 0)
    let B: Point
    switch (command.direction) {
      case CompassDirection.North:
        B = new Point(A.x, A.y + command.nbSteps)
        break
      case CompassDirection.South:
        B = new Point(A.x, A.y - command.nbSteps)
        break
      case CompassDirection.East:
        B = new Point(A.x + command.nbSteps, A.y)
        break
      case CompassDirection.West:
        B = new Point(A.x - command.nbSteps, A.y)
        break
    }

    if (this.onMove) {
      this.onMove(new Line(A, B))
    }

    this.nextStartingPoint = B
  }

  setInstruction(filePath: string): Robot {
    this.filePath = filePath
    return this
  }

  async run(): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        const inputStream = fs.createReadStream(this.filePath).on('error', reject)
        // Using readline allow to not load the entire file in memory // crlfDelay recognize all instances of CR LF ('\r\n')
        const rl = readline.createInterface({ input: inputStream, crlfDelay: Infinity })
        let nbLine = 1

        rl.on('line', line => {
          if (nbLine > 2 && nbLine <= (this.nbCommands || 0) + 2) {
            const commandRaw = line.split(' ')
            const command: RobotCommand = {
              direction: commandRaw[0] as CompassDirection,
              nbSteps: parseInt(commandRaw[1], 10),
            }
            this.move(command)
          } else if (nbLine == 1) {
            this.nbCommands = parseInt(line, 10)
          } else if (nbLine == 2) {
            const coordinates = line.split(' ').map(coordinate => parseInt(coordinate, 10))
            this.nextStartingPoint = new Point(coordinates[0], coordinates[1])
          } else {
            rl.close()
            // console.warn('The robot file contains more instruction than expected')
          }

          nbLine++
        })

        rl.on('close', () => {
          if (this.onMoveOver) {
            this.onMoveOver()
          }
          resolve()
        })
      } catch (error) {
        reject(error)
      }
    })
  }
}

export default Robot
