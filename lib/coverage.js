/*
 * Venus
 * Copyright 2013 LinkedIn
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 *     Unless required by applicable law or agreed to in writing,
 *     software distributed under the License is distributed on an "AS
 *     IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
 *     express or implied.   See the License for the specific language
 *     governing permissions and limitations under the License.
 **/

// Parse code coverage data
'use strict';

function CodeCoverage() {}

/**
 * Parse raw code coverage data and generate friendly metrics
 * @param {Object} data - raw code coverage generated by instrumentation tool (istanbul)
 */
CodeCoverage.prototype.parse = function (data) {
  var results = {};

  Object.keys(data).forEach(function (filePath) {
    results[filePath] = this.parseFileData(filePath, data[filePath]);
  }, this);

  return results;
};

/**
 * Parse file metrics
 */
CodeCoverage.prototype.parseFileData = function (filePath, data) {
  var result = {
    path: filePath,
    statements: this.parseStatements(data),
    functions: this.parseFunctions(data),
    branches: this.parseBranches(data)
  };

  return result;
};

/**
 * Parse metrics on token coverage
 */
CodeCoverage.prototype.parseTokenCoverage = function (data) {
  var total = 0,
      covered = 0;

  Object.keys(data).forEach(function (token) {
    countTokenData(data[token]);
  });

  function countTokenData(tokenValue) {
    if (typeof tokenValue === 'number') {
      total = total + 1;

      if (tokenValue > 0) {
        covered = covered + 1;
      }
    } else if (Array.isArray(tokenValue)) {
      tokenValue.forEach(function (tokenValue) {
        countTokenData(tokenValue);
      });
    }
  }


  return {
    percent: covered / total
  };

};

/**
 * Parse metrics on statement coverage
 */
CodeCoverage.prototype.parseStatements = function (data) {
  return this.parseTokenCoverage(data.s);
};

/**
 * Parse metrics on function coverage
 */
CodeCoverage.prototype.parseFunctions = function (data) {
  return this.parseTokenCoverage(data.f);
};

/**
 * Parse metrics on branch coverage
 */
CodeCoverage.prototype.parseBranches = function (data) {
  return this.parseTokenCoverage(data.b);
};

module.exports = new CodeCoverage();