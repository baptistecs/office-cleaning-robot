import CleaningSession from './class/cleaning-session'

class App {
  private args: { [key: string]: string } = {}

  constructor() {
    this.parseArguments()
  }

  async run(): Promise<void> {
    let { file: instructionFilePath } = this.args

    if (!instructionFilePath) {
      instructionFilePath = './data/cleaning-instruction.txt'
    }

    const cleaningSession = new CleaningSession({ instructionFilePath })

    let nbCleaned = await cleaningSession.run().catch(() => {
      // There is a specific request in the assignment test asking to not display any error message
      nbCleaned = 0
    })

    console.log(`=> Cleaned: ${nbCleaned}`)
  }

  parseArguments(): void {
    const argRegex = /^([a-z][a-zA-Z0-9]*)=([-_./\\a-zA-Z0-9]+)$/

    process.argv.slice(2).forEach(arg => {
      const parsedArg = arg.match(argRegex)
      if (parsedArg) {
        this.args[parsedArg[1]] = parsedArg[2]
      } else {
        // There is a specific request in the assignment test asking to not display any error message
        // console.warn('Invalid argument: ', arg)
      }
    })
  }
}

export default App

if (process.env.NODE_ENV !== 'test') {
  const app = new App()
  app.run()
}
