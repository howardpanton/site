'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');


var TestGenerator = module.exports = function TestGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'] });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(TestGenerator, yeoman.generators.Base);

TestGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  // have Yeoman greet the user.
  console.log(this.yeoman);

  var prompts = [{
    type: 'confirm',
    name: 'testName',
    message: 'What would you like to call the test file?',
    default: true
  }];

  this.prompt(prompts, function (props) {
    // `props` is an object passed in containing the response values, named in
    // accordance with the `name` property from your prompt object. So, for us:
    this.testName = props.testName;

    cb();
  }.bind(this));
};

TestGenerator.prototype.app = function app() {
  this.mkdir(this.testName);
  this.template('index.html', 'index.html');

};

TestGenerator.prototype.projectfiles = function projectfiles() {

};
