# doremi

A simple CLI-tool to manage DO droplets.

*Note: The motivation for this project only stems from personal requirements for managing hobby projects and we do not plan to maintain or add features on a regular basis. Please feel free to fork and raise a pull request if you would like to add a feature. We're open to feature requests as well.*

## Installation

```
npm i -g doremi
```

Set `DO_TOKEN` environment variable as your digitalocean account's personal access token. The token must have write permissions for the droplets you wish to manage.

## Usage
```
doremi [command]

Commands:
  doremi resize <id> <size-slug> [wait]  resize droplet with id to provided
                                         size-slug

Options:
  --version  Show version number                                       [boolean]
  --help     Show help                                                 [boolean]
```
