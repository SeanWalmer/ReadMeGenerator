const axios = require("axios");

const contributorCov = `
# Contributor Covenant Code of Conduct
### contribute

## Our Pledge

We as members, contributors, and leaders pledge to make participation in our
community a harassment-free experience for everyone, regardless of age, body
size, visible or invisible disability, ethnicity, sex characteristics, gender
identity and expression, level of experience, education, socio-economic status,
nationality, personal appearance, race, religion, or sexual identity
and orientation.

We pledge to act and interact in ways that contribute to an open, welcoming,
diverse, inclusive, and healthy community.

## Our Standards

Examples of behavior that contributes to a positive environment for our
community include:

* Demonstrating empathy and kindness toward other people
* Being respectful of differing opinions, viewpoints, and experiences
* Giving and gracefully accepting constructive feedback
* Accepting responsibility and apologizing to those affected by our mistakes,
  and learning from the experience
* Focusing on what is best not just for us as individuals, but for the
  overall community

Examples of unacceptable behavior include:

* The use of sexualized language or imagery, and sexual attention or
  advances of any kind
* Trolling, insulting or derogatory comments, and personal or political attacks
* Public or private harassment
* Publishing others' private information, such as a physical or email
  address, without their explicit permission
* Other conduct which could reasonably be considered inappropriate in a
  professional setting

## Enforcement Responsibilities

Community leaders are responsible for clarifying and enforcing our standards of
acceptable behavior and will take appropriate and fair corrective action in
response to any behavior that they deem inappropriate, threatening, offensive,
or harmful.

Community leaders have the right and responsibility to remove, edit, or reject
comments, commits, code, wiki edits, issues, and other contributions that are
not aligned to this Code of Conduct, and will communicate reasons for moderation
decisions when appropriate.

## Scope

This Code of Conduct applies within all community spaces, and also applies when
an individual is officially representing the community in public spaces.
Examples of representing our community include using an official e-mail address,
posting via an official social media account, or acting as an appointed
representative at an online or offline event.

## Enforcement

Instances of abusive, harassing, or otherwise unacceptable behavior may be
reported to the community leaders responsible for enforcement at
[INSERT CONTACT METHOD].
All complaints will be reviewed and investigated promptly and fairly.

All community leaders are obligated to respect the privacy and security of the
reporter of any incident.

## Enforcement Guidelines

Community leaders will follow these Community Impact Guidelines in determining
the consequences for any action they deem in violation of this Code of Conduct:

### 1. Correction

**Community Impact**: Use of inappropriate language or other behavior deemed
unprofessional or unwelcome in the community.

**Consequence**: A private, written warning from community leaders, providing
clarity around the nature of the violation and an explanation of why the
behavior was inappropriate. A public apology may be requested.

### 2. Warning

**Community Impact**: A violation through a single incident or series
of actions.

**Consequence**: A warning with consequences for continued behavior. No
interaction with the people involved, including unsolicited interaction with
those enforcing the Code of Conduct, for a specified period of time. This
includes avoiding interactions in community spaces as well as external channels
like social media. Violating these terms may lead to a temporary or
permanent ban.

### 3. Temporary Ban

**Community Impact**: A serious violation of community standards, including
sustained inappropriate behavior.

**Consequence**: A temporary ban from any sort of interaction or public
communication with the community for a specified period of time. No public or
private interaction with the people involved, including unsolicited interaction
with those enforcing the Code of Conduct, is allowed during this period.
Violating these terms may lead to a permanent ban.

### 4. Permanent Ban

**Community Impact**: Demonstrating a pattern of violation of community
standards, including sustained inappropriate behavior,  harassment of an
individual, or aggression toward or disparagement of classes of individuals.

**Consequence**: A permanent ban from any sort of public interaction within
the community.

## Attribution

This Code of Conduct is adapted from the [Contributor Covenant][homepage],
version 2.0, available at
https://www.contributor-covenant.org/version/2/0/code_of_conduct.html.

Community Impact Guidelines were inspired by [Mozilla's code of conduct
enforcement ladder](https://github.com/mozilla/diversity).

[homepage]: https://www.contributor-covenant.org

For answers to common questions about this code of conduct, see the FAQ at
https://www.contributor-covenant.org/faq. Translations are available at
https://www.contributor-covenant.org/translations.
`;

var contribution = '';
var credits = ''
// a table storing the lines for the table of contents
const contents = [
  `[discription](#discription) <br>`,
  `[usuage](#usage) <br>`,
  `[tests](##tests) <br>`,
  `[install](#install)<br>`,
]
// axios call to get profile picture



function generateMarkdown(data) {
  const avatar = axios.get(`https://api.github.com/users/${data.gitUser}/repos?per_page=100`)
  .then(function(res) {
    return res.avatar_url
  });
  // if credits are present generate a credits attribute
  if (data.creditCheck === 'yes'){
    const credit1 = `\n${data.creditName1} - ${data.creditEmail1}`
    const credit2 = `\n${data.creditName2} - ${data.creditEmail2}`
    const credit3 = `\n${data.creditName3} - ${data.creditEmail3}`
    credits = `# credits
    ${credit1}
    ${credit2}
    ${credit3}`
    contents.push("[credits](#credits) <br>")
  }
  // if contributors pledge
  if (data.ContributeCheck === 'yes'){
    contribution = contributorCov
    contents.push(`[contributions](###contribute) <br>`)
  }else{
    contribution = `# Contributors

    -insert your own text here-`;
    contents.push(`[contributions](#Contributors) <br>`);

  }
  

  // ---------- Stitches together the readme markdown file ---------
  return `
  ![GitHub repo size](https://img.shields.io/github/repo-size/${data.gitUser}/${data.gitRepo})
  ![License](https://img.shields.io/badge/License-${data.license}-brightgreen)
# ${data.title}

### Table of contents
---

${contents}

# discription

${data.discription}

# usage

${data.usage}

## tests
---

${data.tests}

# install

${data.install}

# contact

if you wise to contact the author of this repo please send an email to ${data.email}

<img src=${avatar}>

${credits}

${contribution}

`;
}

module.exports = generateMarkdown;
