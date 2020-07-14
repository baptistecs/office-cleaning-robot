import App from './app'

let consoleLogSpy: jasmine.Spy

describe('CleaningSession', () => {
  beforeAll(() => {
    consoleLogSpy = spyOn(console, 'log')
  })

  afterEach(() => {
    consoleLogSpy.calls.reset()
  })

  it('should display the number of unique cleaned places correctly formatted', async () => {
    const app = new App()
    await app.run()

    expect(consoleLogSpy).toHaveBeenCalledWith('=> Cleaned: 36')
  })

  it('should display 0 correctly formatted if an error occur', async () => {
    process.argv.push('file=./wrong/file/path.txt')

    const app = new App()
    await app.run()

    expect(consoleLogSpy).toHaveBeenCalledWith('=> Cleaned: 0')
  })
})
