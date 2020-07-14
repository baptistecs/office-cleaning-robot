import CleaningSession from '../cleaning-session'

describe('CleaningSession', () => {
  it('should return the correct number of unique cleaned places', async () => {
    const instructionFilePath = './data/spec/instructions.txt'
    const cleaningSession = new CleaningSession({ instructionFilePath })
    const nbCleaned = await cleaningSession.run()

    expect(nbCleaned).toEqual(36)
  })

  it('should return 0 if an error occurred', async () => {
    const instructionFilePath = './wrong/file/path.txt'
    const cleaningSession = new CleaningSession({ instructionFilePath })
    const nbCleaned = await cleaningSession.run()

    expect(nbCleaned).toEqual(0)
  })
})
