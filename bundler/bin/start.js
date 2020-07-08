const {
  choosePort,
  createCompiler,
  prepareUrls
} = require('react-dev-utils/WebpackDevServerUtils')

const defaultPort = parseInt(process.env.PORT, 10) || 3000
const host = '0.0.0.0'

async function start(){
  try {
    const port = await choosePort(host, defaultPort)
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

start()