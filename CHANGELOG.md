All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [UNRELEASED]
(nothing yet)

## [1.1.0] - 2022-04-15
### Fixed
- crashing when `stdbuf` is not available
### Added
- `process-error` event
### Dev
- events emitter is now typed
- deps bumped

## [1.0.2] - 2021-09-06
### Fixed
- Poll hanging after few hours
- Not being able to catch first "STARTING" event
### Added
- "STARTED" event

## [1.0.1] - 2021-09-01
### Added
- type export to prevent some TS issues
### Dev
- added some package.json keywords

## [1.0.0] - 2021-09-01
### Added
- first version
