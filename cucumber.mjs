const getWorldParams = () => {
  const params = {
    foo: 'bar',
  };

  return params;
};

const config = {
  requireModule: ['ts-node/register'],
  require: ['src/**/*.ts'],
  format: [
    'json:reports/cucumber-report.json',
    'html:reports/report.html',
    'summary',
    'progress-bar',
  ],
  formatOptions: { snippetInterface: 'async-await' },
  worldParameters: getWorldParams(),
  retry: 0
};

config.format.push('@cucumber/pretty-formatter');

export default config;
