const { choosePort } = require('react-dev-utils/WebpackDevServerUtils');
const createDevConfig = require('../webpack.dev');
const chalk = require('chalk');
const webpack = require('webpack');
const ip = require('ip');
const WebpackDevServer = require('webpack-dev-server');
const args = require('args-parser')(process.argv);

const defaultPort = parseInt(process.env.PORT, 10) || 3000;
const host = '0.0.0.0';

async function start() {
  try {
    const port = await choosePort(host, defaultPort);
    const devConfig = createDevConfig({
      appEnv: args.env,
    });
    const compiler = webpack(devConfig);

    compiler.hooks.done.tap('DoneCompiler', (stats) => {
      console.log('\x1Bc');
      const serverAddr = `http://localhost:${chalk.bold(port)}`;
      const localIpAddr = `http://${ip.address()}:${chalk.bold(port)}`;
      const info = stats.toJson();
      if (stats.hasErrors()) {
        console.log(chalk.red('Build failed!\n\n'));
        console.error(info.errors[0]);
      } else {
        if (stats.hasWarnings()) console.warn(info.warnings[0]);
        console.log(chalk.green('Compiled successfully!\n\n'));
        console.log('You can view the application in browser.\n\n');
        console.log(`${chalk.bold('Local:')}             ${serverAddr}\n`);
        console.log(`${chalk.bold('On Your Network:')}   ${localIpAddr}\n`);
      }
    });

    compiler.hooks.failed.tap('ErrorHandler', (e) => {
      console.log(e);
      process.exit(1);
    });

    new WebpackDevServer(compiler, devConfig.devServer).listen(
      port,
      host,
      (err) => {
        if (err) {
          console.log(err);
        }
      }
    );
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

start();
