import Map2D from './map-2d'
import Robot from './robot'

type CleaningSessionProps = {
  robot?: Robot
  instructionFilePath?: string
  place?: Map2D
}

class CleaningSession {
  private robot?: Robot
  private place: Map2D

  constructor({ instructionFilePath, place, robot }: CleaningSessionProps) {
    this.place = place || new Map2D()

    if (instructionFilePath) {
      if (robot) {
        robot.setInstruction(instructionFilePath)
      } else {
        robot = new Robot(instructionFilePath, path => {
          this.place.addLine(path)
        })
      }
    }

    this.robot = robot
  }

  async run(): Promise<number> {
    if (!this.robot) {
      // There is a specific request in the assignment test asking to not display any error message
      // console.warn('A robot or an instruction file is required in order to run a cleaning session.')
      return 0
    }

    let noError = true
    await this.robot.run().catch(() => {
      noError = false
    })

    return noError ? this.place.getArea() : 0
  }
}

export default CleaningSession
