import app from './app'

let consoleLogSpy: jasmine.Spy

describe('CleaningSession', () => {
  beforeAll(() => {
    consoleLogSpy = spyOn(console, 'log')
  })

  afterEach(() => {
    consoleLogSpy.calls.reset()
  })

  it('should console.log "running..."', async () => {
    app()

    expect(consoleLogSpy).toHaveBeenCalledWith('running...')
  })
})
