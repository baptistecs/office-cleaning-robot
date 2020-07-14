const app = (): void => console.log('running...')

export default app

if (process.env.NODE_ENV !== 'test') {
  app()
}
