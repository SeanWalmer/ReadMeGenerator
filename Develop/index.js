const fs = require('fs');
const inquirer = require('inquirer');
const generateMarkdown = require('./utils/generateMarkdown')

const questions = [
    {
        type: 'input',
        name: 'gitUser',
        message: 'GitHub Username:',
        // default: false,
        validate: function(value){
            if(value === ''){
                return 'please enter a username';
            }else{
                return true;
            };
        },
    },
    {
        type: 'input',
        name: 'gitRepo',
        message: 'Github Repo:',
        validate: function(value){
            if(value === ''){
                return 'please enter a repo name';
            }else{
                return true;
            };
        },
    },
    {
        type: 'input',
        name: 'title',
        message: 'Project Title:',
        validate: function(value){
            if(value === ''){
                return 'please enter a title';
            }else{
                return true;
            };
        },
    },
    {
        type: 'input',
        name: 'discription',
        message: 'Project Discription:',
        validate: function(value){
            const discrip = value.split("")
            if(discrip.length <= 20 ){
                return 'Please enter a discription of at least 20 characters in length';
            }else{
                return true;
            };
        },
    },
    {
        type: 'input',
        name: 'usage',
        message: 'Discribe how to use the application:',
        validate: function(value){
            if(value === ''){
                return 'please discribe the application before continuing';
            }else{
                return true;
            };
        },
    },
    {
        type: 'input',
        name: 'install',
        message: 'Discribe how to install the application:',
        validate: function(value){
            if(value === ''){
                return 'please discribe how to install the application before continuing';
            }else{
                return true;
            };
        },
    },
    {
        type: 'input',
        name: 'tests',
        message: 'Discribe how to use application tests:',
        validate: function(value){
            if(value === ''){
                return 'please discribe the tests and if there are none please input that as well.';
            }else{
                return true;
            };
        },
    },
    {
        type: 'list',
        name: 'license',
        message: 'license type:',
        choices: ['GNU__GPLv3', 'MIT__License', 'Apache__License__2']            
    },
    {
        type: 'input',
        name: 'email',
        message: 'Contact Email:',
        validate: function(value) {
            var pass = value.match(
              /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/i
            );
            if (pass) {
              return true;
            }
      
            return 'Please enter a valid email address';
          }
    },
    {
        type: 'list',
        name: 'creditCheck',
        message: 'Do you have anyone to credit?',
        choices: ['no','yes',],    
    },
    {
        type: 'number',
        name: 'creditNum',
        message: 'How many people do you want to credit?',
        default: 1,
        when: function(answers) {
          return answers.creditCheck !== 'no';
        },
        validate: function(value){
            if(isNaN(value)){
                return 'please enter a valid number'
            }else if (value > 3){
                return 'please select a number below 3';
            }else{
                return true;
            };
        },
    },
    {
        type: 'input',
        name: 'creditName1',
        message: 'First credit name:',
        when: function(answers) {
            return answers.creditNum >= 1;
        } 
    },
    {
        type: 'input',
        name: 'creditEmail1',
        message: 'First credit email:',
        when: function(answers) {
            return answers.creditNum >= 1;
        },
        validate: function(value) {
            var pass = value.match(
                /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/i
            );
            if (pass) {
                return true;
            };
      
            return 'Please enter a valid email address';
        } 
    },
    {
        type: 'input',
        name: 'creditName2',
        message: 'Second credit name:',
        when: function(answers) {
            return answers.creditNum >= 2;
        } 
    },
    {
        type: 'input',
        name: 'creditEmail2',
        message: 'Second credit email:',
        when: function(answers) {
            return answers.creditNum >= 2;
        },
        validate: function(value) {
            var pass = value.match(
              /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/i
            );
            if (pass) {
              return true;
            }
      
            return 'Please enter a valid email address';
        },
    },
    {
        type: 'input',
        name: 'creditName3',
        message: 'Third credit name:',
        when: function(answers) {
            return answers.creditNum >= 3;
        } 
    },
    {
        type: 'input',
        name: 'creditEmail3',
        message: 'Third credit email:',
        when: function(answers) {
            return answers.creditNum >= 3;
        },
        validate: function(value) {
            var pass = value.match(
              /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/i
            );
            if (pass) {
              return true;
            }
      
            return 'Please enter a valid email address';
        } 
    },
    {
        type: 'list',
        name: 'ContributeCheck',
        message: "Do you want to include the Contributor Covenant? (if you don't you will need to write your own contribution section)",
        choices: ['yes','no',],     
    },
];

// function writeToFile(fileName, data) {
// }

function init() {
    inquirer.prompt(questions).then(answers => {
        console.log('\nGenerating Repo with:');
        console.log(answers);
        const info = answers;
        fs.writeFile('readme.md', generateMarkdown(info), function (err) {
            if (err) throw err;
            console.log('Saved to test.md!');
          });
        // console.log(JSON.stringify(answers, null, '  '));
      });
}

init();
