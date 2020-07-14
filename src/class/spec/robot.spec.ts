import 'jasmine-ts'
import Robot from '../robot'
import Line from '../line'
import Point from '../point'

describe('Robot', () => {
  it('should be false and NOT trigger an exception if an empty instruction file name is provided', async () => {
    const instructionFilePath = ''
    const robot = new Robot(instructionFilePath)

    let noError = true
    await robot.run().catch(() => {
      noError = false
    })

    expect(noError).toBeFalse()
  })

  it('should be false and  NOT trigger an exception if a wrong file path is provided', async () => {
    const instructionFilePath = './some/wrong/file/name.txt'
    const robot = new Robot(instructionFilePath)

    let noError = true
    await robot.run().catch(() => {
      noError = false
    })

    expect(noError).toBeFalse()
  })

  it('should load the instruction file and trigger the callback on each instruction with the right Command to Line conversion', async () => {
    const onMoveCallback = jasmine.createSpy('onMoveCallback')
    const instructionFilePath = './data/spec/instructions.txt'
    const robot = new Robot(instructionFilePath, onMoveCallback)

    let noError = true
    await robot.run().catch(() => {
      noError = false
    })

    expect(noError).toEqual(true)

    const expectedResults = [
      [new Line(new Point(-6, -12), new Point(-6, -18))],
      [new Line(new Point(-6, -18), new Point(-18, -18))],
      [new Line(new Point(-18, -18), new Point(-18, -12))],
      [new Line(new Point(-18, -12), new Point(-6, -12))],
      [new Line(new Point(-6, -12), new Point(-6, -18))],
      [new Line(new Point(-6, -18), new Point(-18, -18))],
      [new Line(new Point(-18, -18), new Point(-18, -12))],
      [new Line(new Point(-18, -12), new Point(-6, -12))],
      [new Line(new Point(-6, -12), new Point(-6, -18))],
      [new Line(new Point(-6, -18), new Point(-18, -18))],
      [new Line(new Point(-18, -18), new Point(-18, -12))],
      [new Line(new Point(-18, -12), new Point(-6, -12))],
      [new Line(new Point(-6, -12), new Point(-18, -12))],
      [new Line(new Point(-18, -12), new Point(-18, -18))],
      [new Line(new Point(-18, -18), new Point(-6, -18))],
      [new Line(new Point(-6, -18), new Point(-6, -12))],
      [new Line(new Point(-6, -12), new Point(-18, -12))],
      [new Line(new Point(-18, -12), new Point(-18, -18))],
      [new Line(new Point(-18, -18), new Point(-6, -18))],
      [new Line(new Point(-6, -18), new Point(-6, -12))],
      [new Line(new Point(-6, -12), new Point(-18, -12))],
      [new Line(new Point(-18, -12), new Point(-18, -18))],
      [new Line(new Point(-18, -18), new Point(-6, -18))],
      [new Line(new Point(-6, -18), new Point(-6, -12))],
    ]

    expect(onMoveCallback.calls.allArgs()).toEqual(expectedResults)
  })
})
