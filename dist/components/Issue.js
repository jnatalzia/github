'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Requestable2 = require('./Requestable');

var _Requestable3 = _interopRequireDefault(_Requestable2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @file
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @copyright  2013 Michael Aufreiter (Development Seed) and 2016 Yahoo Inc.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @license    Licensed under {@link https://spdx.org/licenses/BSD-3-Clause-Clear.html BSD-3-Clause-Clear}.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *             Github.js is freely distributable.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

/**
 * Issue wraps the functionality to get issues for repositories
 */
var Issue = function (_Requestable) {
  _inherits(Issue, _Requestable);

  /**
   * Create a new Issue
   * @param {string} repository - the full name of the repository (`:user/:repo`) to get issues for
   * @param {Requestable.auth} [auth] - information required to authenticate to Github
   * @param {string} [apiBase=https://api.github.com] - the base Github API URL
   */
  function Issue(repository, auth, apiBase) {
    _classCallCheck(this, Issue);

    var _this = _possibleConstructorReturn(this, (Issue.__proto__ || Object.getPrototypeOf(Issue)).call(this, auth, apiBase));

    _this.__repository = repository;
    return _this;
  }

  /**
   * Create a new issue
   * @see https://developer.github.com/v3/issues/#create-an-issue
   * @param {Object} issueData - the issue to create
   * @param {Requestable.callback} [cb] - will receive the created issue
   * @return {Promise} - the promise for the http request
   */


  _createClass(Issue, [{
    key: 'createIssue',
    value: function createIssue(issueData, cb) {
      return this._request('POST', '/repos/' + this.__repository + '/issues', issueData, cb);
    }

    /**
     * List the issues for the repository
     * @see https://developer.github.com/v3/issues/#list-issues-for-a-repository
     * @param {Object} options - filtering options
     * @param {Requestable.callback} [cb] - will receive the array of issues
     * @return {Promise} - the promise for the http request
     */

  }, {
    key: 'listIssues',
    value: function listIssues(options, cb) {
      return this._requestAllPages('/repos/' + this.__repository + '/issues', options, cb);
    }

    /**
     * List the events for an issue
     * @see https://developer.github.com/v3/issues/events/#list-events-for-an-issue
     * @param {number} issue - the issue to get events for
     * @param {Requestable.callback} [cb] - will receive the list of events
     * @return {Promise} - the promise for the http request
     */

  }, {
    key: 'listIssueEvents',
    value: function listIssueEvents(issue, cb) {
      return this._requestAllPages('/repos/' + this.__repository + '/issues/' + issue + '/events', null, cb);
    }

    /**
     * List comments on an issue
     * @see https://developer.github.com/v3/issues/comments/#list-comments-on-an-issue
     * @param {number} issue - the id of the issue to get comments from
     * @param {Requestable.callback} [cb] - will receive the comments
     * @return {Promise} - the promise for the http request
     */

  }, {
    key: 'listIssueComments',
    value: function listIssueComments(issue, cb) {
      return this._requestAllPages('/repos/' + this.__repository + '/issues/' + issue + '/comments', null, cb);
    }

    /**
     * Get a single comment on an issue
     * @see https://developer.github.com/v3/issues/comments/#get-a-single-comment
     * @param {number} id - the comment id to get
     * @param {Requestable.callback} [cb] - will receive the comment
     * @return {Promise} - the promise for the http request
     */

  }, {
    key: 'getIssueComment',
    value: function getIssueComment(id, cb) {
      return this._request('GET', '/repos/' + this.__repository + '/issues/comments/' + id, null, cb);
    }

    /**
     * Comment on an issue
     * @see https://developer.github.com/v3/issues/comments/#create-a-comment
     * @param {number} issue - the id of the issue to comment on
     * @param {string} comment - the comment to add
     * @param {Requestable.callback} [cb] - will receive the created comment
     * @return {Promise} - the promise for the http request
     */

  }, {
    key: 'createIssueComment',
    value: function createIssueComment(issue, comment, cb) {
      return this._request('POST', '/repos/' + this.__repository + '/issues/' + issue + '/comments', { body: comment }, cb);
    }

    /**
     * Edit a comment on an issue
     * @see https://developer.github.com/v3/issues/comments/#edit-a-comment
     * @param {number} id - the comment id to edit
     * @param {string} comment - the comment to edit
     * @param {Requestable.callback} [cb] - will receive the edited comment
     * @return {Promise} - the promise for the http request
     */

  }, {
    key: 'editIssueComment',
    value: function editIssueComment(id, comment, cb) {
      return this._request('PATCH', '/repos/' + this.__repository + '/issues/comments/' + id, { body: comment }, cb);
    }

    /**
     * Delete a comment on an issue
     * @see https://developer.github.com/v3/issues/comments/#delete-a-comment
     * @param {number} id - the comment id to delete
     * @param {Requestable.callback} [cb] - will receive true if the request is successful
     * @return {Promise} - the promise for the http request
     */

  }, {
    key: 'deleteIssueComment',
    value: function deleteIssueComment(id, cb) {
      return this._request('DELETE', '/repos/' + this.__repository + '/issues/comments/' + id, null, cb);
    }

    /**
     * Edit an issue
     * @see https://developer.github.com/v3/issues/#edit-an-issue
     * @param {number} issue - the issue number to edit
     * @param {Object} issueData - the new issue data
     * @param {Requestable.callback} [cb] - will receive the modified issue
     * @return {Promise} - the promise for the http request
     */

  }, {
    key: 'editIssue',
    value: function editIssue(issue, issueData, cb) {
      return this._request('PATCH', '/repos/' + this.__repository + '/issues/' + issue, issueData, cb);
    }

    /**
     * Get a particular issue
     * @see https://developer.github.com/v3/issues/#get-a-single-issue
     * @param {number} issue - the issue number to fetch
     * @param {Requestable.callback} [cb] - will receive the issue
     * @return {Promise} - the promise for the http request
     */

  }, {
    key: 'getIssue',
    value: function getIssue(issue, cb) {
      return this._request('GET', '/repos/' + this.__repository + '/issues/' + issue, null, cb);
    }

    /**
     * List the milestones for the repository
     * @see https://developer.github.com/v3/issues/milestones/#list-milestones-for-a-repository
     * @param {Object} options - filtering options
     * @param {Requestable.callback} [cb] - will receive the array of milestones
     * @return {Promise} - the promise for the http request
     */

  }, {
    key: 'listMilestones',
    value: function listMilestones(options, cb) {
      return this._request('GET', '/repos/' + this.__repository + '/milestones', options, cb);
    }

    /**
     * Get a milestone
     * @see https://developer.github.com/v3/issues/milestones/#get-a-single-milestone
     * @param {string} milestone - the id of the milestone to fetch
     * @param {Requestable.callback} [cb] - will receive the milestone
     * @return {Promise} - the promise for the http request
     */

  }, {
    key: 'getMilestone',
    value: function getMilestone(milestone, cb) {
      return this._request('GET', '/repos/' + this.__repository + '/milestones/' + milestone, null, cb);
    }

    /**
     * Create a new milestone
     * @see https://developer.github.com/v3/issues/milestones/#create-a-milestone
     * @param {Object} milestoneData - the milestone definition
     * @param {Requestable.callback} [cb] - will receive the milestone
     * @return {Promise} - the promise for the http request
     */

  }, {
    key: 'createMilestone',
    value: function createMilestone(milestoneData, cb) {
      return this._request('POST', '/repos/' + this.__repository + '/milestones', milestoneData, cb);
    }

    /**
     * Edit a milestone
     * @see https://developer.github.com/v3/issues/milestones/#update-a-milestone
     * @param {string} milestone - the id of the milestone to edit
     * @param {Object} milestoneData - the updates to make to the milestone
     * @param {Requestable.callback} [cb] - will receive the updated milestone
     * @return {Promise} - the promise for the http request
     */

  }, {
    key: 'editMilestone',
    value: function editMilestone(milestone, milestoneData, cb) {
      return this._request('PATCH', '/repos/' + this.__repository + '/milestones/' + milestone, milestoneData, cb);
    }

    /**
     * Delete a milestone (this is distinct from closing a milestone)
     * @see https://developer.github.com/v3/issues/milestones/#delete-a-milestone
     * @param {string} milestone - the id of the milestone to delete
     * @param {Requestable.callback} [cb] - will receive the status
     * @return {Promise} - the promise for the http request
     */

  }, {
    key: 'deleteMilestone',
    value: function deleteMilestone(milestone, cb) {
      return this._request('DELETE', '/repos/' + this.__repository + '/milestones/' + milestone, null, cb);
    }

    /**
     * Create a new label
     * @see https://developer.github.com/v3/issues/labels/#create-a-label
     * @param {Object} labelData - the label definition
     * @param {Requestable.callback} [cb] - will receive the object representing the label
     * @return {Promise} - the promise for the http request
     */

  }, {
    key: 'createLabel',
    value: function createLabel(labelData, cb) {
      return this._request('POST', '/repos/' + this.__repository + '/labels', labelData, cb);
    }

    /**
     * List the labels for the repository
     * @see https://developer.github.com/v3/issues/labels/#list-all-labels-for-this-repository
     * @param {Object} options - filtering options
     * @param {Requestable.callback} [cb] - will receive the array of labels
     * @return {Promise} - the promise for the http request
     */

  }, {
    key: 'listLabels',
    value: function listLabels(options, cb) {
      return this._request('GET', '/repos/' + this.__repository + '/labels', options, cb);
    }

    /**
     * Get a label
     * @see https://developer.github.com/v3/issues/labels/#get-a-single-label
     * @param {string} label - the name of the label to fetch
     * @param {Requestable.callback} [cb] - will receive the label
     * @return {Promise} - the promise for the http request
     */

  }, {
    key: 'getLabel',
    value: function getLabel(label, cb) {
      return this._request('GET', '/repos/' + this.__repository + '/labels/' + label, null, cb);
    }

    /**
     * Edit a label
     * @see https://developer.github.com/v3/issues/labels/#update-a-label
     * @param {string} label - the name of the label to edit
     * @param {Object} labelData - the updates to make to the label
     * @param {Requestable.callback} [cb] - will receive the updated label
     * @return {Promise} - the promise for the http request
     */

  }, {
    key: 'editLabel',
    value: function editLabel(label, labelData, cb) {
      return this._request('PATCH', '/repos/' + this.__repository + '/labels/' + label, labelData, cb);
    }

    /**
     * Delete a label
     * @see https://developer.github.com/v3/issues/labels/#delete-a-label
     * @param {string} label - the name of the label to delete
     * @param {Requestable.callback} [cb] - will receive the status
     * @return {Promise} - the promise for the http request
     */

  }, {
    key: 'deleteLabel',
    value: function deleteLabel(label, cb) {
      return this._request('DELETE', '/repos/' + this.__repository + '/labels/' + label, null, cb);
    }
  }]);

  return Issue;
}(_Requestable3.default);

module.exports = Issue;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIklzc3VlLmpzIl0sIm5hbWVzIjpbIklzc3VlIiwicmVwb3NpdG9yeSIsImF1dGgiLCJhcGlCYXNlIiwiX19yZXBvc2l0b3J5IiwiaXNzdWVEYXRhIiwiY2IiLCJfcmVxdWVzdCIsIm9wdGlvbnMiLCJfcmVxdWVzdEFsbFBhZ2VzIiwiaXNzdWUiLCJpZCIsImNvbW1lbnQiLCJib2R5IiwibWlsZXN0b25lIiwibWlsZXN0b25lRGF0YSIsImxhYmVsRGF0YSIsImxhYmVsIiwiUmVxdWVzdGFibGUiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7O0FBT0E7Ozs7Ozs7Ozs7K2VBUEE7Ozs7Ozs7QUFTQTs7O0lBR01BLEs7OztBQUNIOzs7Ozs7QUFNQSxpQkFBWUMsVUFBWixFQUF3QkMsSUFBeEIsRUFBOEJDLE9BQTlCLEVBQXVDO0FBQUE7O0FBQUEsOEdBQzlCRCxJQUQ4QixFQUN4QkMsT0FEd0I7O0FBRXBDLFVBQUtDLFlBQUwsR0FBb0JILFVBQXBCO0FBRm9DO0FBR3RDOztBQUVEOzs7Ozs7Ozs7OztnQ0FPWUksUyxFQUFXQyxFLEVBQUk7QUFDeEIsYUFBTyxLQUFLQyxRQUFMLENBQWMsTUFBZCxjQUFnQyxLQUFLSCxZQUFyQyxjQUE0REMsU0FBNUQsRUFBdUVDLEVBQXZFLENBQVA7QUFDRjs7QUFFRDs7Ozs7Ozs7OzsrQkFPV0UsTyxFQUFTRixFLEVBQUk7QUFDckIsYUFBTyxLQUFLRyxnQkFBTCxhQUFnQyxLQUFLTCxZQUFyQyxjQUE0REksT0FBNUQsRUFBcUVGLEVBQXJFLENBQVA7QUFDRjs7QUFFRDs7Ozs7Ozs7OztvQ0FPZ0JJLEssRUFBT0osRSxFQUFJO0FBQ3hCLGFBQU8sS0FBS0csZ0JBQUwsYUFBZ0MsS0FBS0wsWUFBckMsZ0JBQTRETSxLQUE1RCxjQUE0RSxJQUE1RSxFQUFrRkosRUFBbEYsQ0FBUDtBQUNGOztBQUVEOzs7Ozs7Ozs7O3NDQU9rQkksSyxFQUFPSixFLEVBQUk7QUFDMUIsYUFBTyxLQUFLRyxnQkFBTCxhQUFnQyxL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QUFkLGNBQStCLEtBQUtILFlBQXBDLGNBQTJESSxPQUEzRCxFQUFvRUYsRUFBcEUsQ0FBUDtBQUNGOztBQUVGOzs7Ozs7Ozs7OzZCQU9VVyxLLEVBQU9YLEUsRUFBSTtBQUNqQixhQUFPLEtBQUtDLFFBQUwsQ0FBYyxLQUFkLGNBQStCLEtBQUtILFlBQXBDLGdCQUEyRGEsS0FBM0QsRUFBb0UsSUFBcEUsRUFBMEVYLEVBQTFFLENBQVA7QUFDRjs7QUFFRjs7Ozs7Ozs7Ozs7OEJBUVdXLEssRUFBT0QsUyxFQUFXVixFLEVBQUk7QUFDN0IsYUFBTyxLQUFLQyxRQUFMLENBQWMsT0FBZCxjQUFpQyxLQUFLSCxZQUF0QyxnQkFBNkRhLEtBQTdELEVBQXNFRCxTQUF0RSxFQUFpRlYsRUFBakYsQ0FBUDtBQUNGOztBQUVGOzs7Ozs7Ozs7O2dDQU9hVyxLLEVBQU9YLEUsRUFBSTtBQUNwQixhQUFPLEtBQUtDLFFBQUwsQ0FBYyxRQUFkLGNBQWtDLEtBQUtILFlBQXZDLGdCQUE4RGEsS0FBOUQsRUFBdUUsSUFBdkUsRUFBNkVYLEVBQTdFLENBQVA7QUFDRjs7OztFQTNPZ0JZLHFCOztBQThPcEJDLE9BQU9DLE9BQVAsR0FBaUJwQixLQUFqQiIsImZpbGUiOiJJc3N1ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGZpbGVcbiAqIEBjb3B5cmlnaHQgIDIwMTMgTWljaGFlbCBBdWZyZWl0ZXIgKERldmVsb3BtZW50IFNlZWQpIGFuZCAyMDE2IFlhaG9vIEluYy5cbiAqIEBsaWNlbnNlICAgIExpY2Vuc2VkIHVuZGVyIHtAbGluayBodHRwczovL3NwZHgub3JnL2xpY2Vuc2VzL0JTRC0zLUNsYXVzZS1DbGVhci5odG1sIEJTRC0zLUNsYXVzZS1DbGVhcn0uXG4gKiAgICAgICAgICAgICBHaXRodWIuanMgaXMgZnJlZWx5IGRpc3RyaWJ1dGFibGUuXG4gKi9cblxuaW1wb3J0IFJlcXVlc3RhYmxlIGZyb20gJy4vUmVxdWVzdGFibGUnO1xuXG4vKipcbiAqIElzc3VlIHdyYXBzIHRoZSBmdW5jdGlvbmFsaXR5IHRvIGdldCBpc3N1ZXMgZm9yIHJlcG9zaXRvcmllc1xuICovXG5jbGFzcyBJc3N1ZSBleHRlbmRzIFJlcXVlc3RhYmxlIHtcbiAgIC8qKlxuICAgICogQ3JlYXRlIGEgbmV3IElzc3VlXG4gICAgKiBAcGFyYW0ge3N0cmluZ30gcmVwb3NpdG9yeSAtIHRoZSBmdWxsIG5hbWUgb2YgdGhlIHJlcG9zaXRvcnkgKGA6dXNlci86cmVwb2ApIHRvIGdldCBpc3N1ZXMgZm9yXG4gICAgKiBAcGFyYW0ge1JlcXVlc3RhYmxlLmF1dGh9IFthdXRoXSAtIGluZm9ybWF0aW9uIHJlcXVpcmVkIHRvIGF1dGhlbnRpY2F0ZSB0byBHaXRodWJcbiAgICAqIEBwYXJhbSB7c3RyaW5nfSBbYXBpQmFzZT1odHRwczovL2FwaS5naXRodWIuY29tXSAtIHRoZSBiYXNlIEdpdGh1YiBBUEkgVVJMXG4gICAgKi9cbiAgIGNvbnN0cnVjdG9yKHJlcG9zaXRvcnksIGF1dGgsIGFwaUJhc2UpIHtcbiAgICAgIHN1cGVyKGF1dGgsIGFwaUJhc2UpO1xuICAgICAgdGhpcy5fX3JlcG9zaXRvcnkgPSByZXBvc2l0b3J5O1xuICAgfVxuXG4gICAvKipcbiAgICAqIENyZWF0ZSBhIG5ldyBpc3N1ZVxuICAgICogQHNlZSBodHRwczovL2RldmVsb3Blci5naXRodWIuY29tL3YzL2lzc3Vlcy8jY3JlYXRlLWFuLWlzc3VlXG4gICAgKiBAcGFyYW0ge09iamVjdH0gaXNzdWVEYXRhIC0gdGhlIGlzc3VlIHRvIGNyZWF0ZVxuICAgICogQHBhcmFtIHtSZXF1ZXN0YWJsZS5jYWxsYmFja30gW2NiXSAtIHdpbGwgcmVjZWl2ZSB0aGUgY3JlYXRlZCBpc3N1ZVxuICAgICogQHJldHVybiB7UHJvbWlzZX0gLSB0aGUgcHJvbWlzZSBmb3IgdGhlIGh0dHAgcmVxdWVzdFxuICAgICovXG4gICBjcmVhdGVJc3N1ZShpc3N1ZURhdGEsIGNiKSB7XG4gICAgICByZXR1cm4gdGhpcy5fcmVxdWVzdCgnUE9TVCcsIGAvcmVwb3MvJHt0aGlzLl9fcmVwb3NpdG9yeX0vaXNzdWVzYCwgaXNzdWVEYXRhLCBjYik7XG4gICB9XG5cbiAgIC8qKlxuICAgICogTGlzdCB0aGUgaXNzdWVzIGZvciB0aGUgcmVwb3NpdG9yeVxuICAgICogQHNlZSBodHRwczovL2RldmVsb3Blci5naXRodWIuY29tL3YzL2lzc3Vlcy8jbGlzdC1pc3N1ZXMtZm9yLWEtcmVwb3NpdG9yeVxuICAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSBmaWx0ZXJpbmcgb3B0aW9uc1xuICAgICogQHBhcmFtIHtSZXF1ZXN0YWJsZS5jYWxsYmFja30gW2NiXSAtIHdpbGwgcmVjZWl2ZSB0aGUgYXJyYXkgb2YgaXNzdWVzXG4gICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIHRoZSBwcm9taXNlIGZvciB0aGUgaHR0cCByZXF1ZXN0XG4gICAgKi9cbiAgIGxpc3RJc3N1ZXMob3B0aW9ucywgY2IpIHtcbiAgICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0QWxsUGFnZXMoYC9yZXBvcy8ke3RoaXMuX19yZXBvc2l0b3J5fS9pc3N1ZXNgLCBvcHRpb25zLCBjYik7XG4gICB9XG5cbiAgIC8qKlxuICAgICogTGlzdCB0aGUgZXZlbnRzIGZvciBhbiBpc3N1ZVxuICAgICogQHNlZSBodHRwczovL2RldmVsb3Blci5naXRodWIuY29tL3YzL2lzc3Vlcy9ldmVudHMvI2xpc3QtZXZlbnRzLWZvci1hbi1pc3N1ZVxuICAgICogQHBhcmFtIHtudW1iZXJ9IGlzc3VlIC0gdGhlIGlzc3VlIHRvIGdldCBldmVudHMgZm9yXG4gICAgKiBAcGFyYW0ge1JlcXVlc3RhYmxlLmNhbGxiYWNrfSBbY2JdIC0gd2lsbCByZWNlaXZlIHRoZSBsaXN0IG9mIGV2ZW50c1xuICAgICogQHJldHVybiB7UHJvbWlzZX0gLSB0aGUgcHJvbWlzZSBmb3IgdGhlIGh0dHAgcmVxdWVzdFxuICAgICovXG4gICBsaXN0SXNzdWVFdmVudHMoaXNzdWUsIGNiKSB7XG4gICAgICByZXR1cm4gdGhpcy5fcmVxdWVzdEFsbFBhZ2VzKGAvcmVwb3MvJHt0aGlzLl9fcmVwb3NpdG9yeX0vaXNzdWVzLyR7aXNzdWV9L2V2ZW50c2AsIG51bGwsIGNiKTtcbiAgIH1cblxuICAgLyoqXG4gICAgKiBMaXN0IGNvbW1lbnRzIG9uIGFuIGlzc3VlXG4gICAgKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLmdpdGh1Yi5jb20vdjMvaXNzdWVzL2NvbW1lbnRzLyNsaXN0LWNvbW1lbnRzLW9uLWFuLWlzc3VlXG4gICAgKiBAcGFyYW0ge251bWJlcn0gaXNzdWUgLSB0aGUgaWQgb2YgdGhlIGlzc3VlIHRvIGdldCBjb21tZW50cyBmcm9tXG4gICAgKiBAcGFyYW0ge1JlcXVlc3RhYmxlLmNhbGxiYWNrfSBbY2JdIC0gd2lsbCByZWNlaXZlIHRoZSBjb21tZW50c1xuICAgICogQHJldHVybiB7UHJvbWlzZX0gLSB0aGUgcHJvbWlzZSBmb3IgdGhlIGh0dHAgcmVxdWVzdFxuICAgICovXG4gICBsaXN0SXNzdWVDb21tZW50cyhpc3N1ZSwgY2IpIHtcbiAgICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0QWxsUGFnZXMoYC9yZXBvcy8ke3RoaXMuX19yZXBvc2l0b3J5fS9pc3N1ZXMvJHtpc3N1ZX0vY29tbWVudHNgLCBudWxsLCBjYik7XG4gICB9XG5cbiAgIC8qKlxuICAgICogR2V0IGEgc2luZ2xlIGNvbW1lbnQgb24gYW4gaXNzdWVcbiAgICAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIuZ2l0aHViLmNvbS92My9pc3N1ZXMvY29tbWVudHMvI2dldC1hLXNpbmdsZS1jb21tZW50XG4gICAgKiBAcGFyYW0ge251bWJlcn0gaWQgLSB0aGUgY29tbWVudCBpZCB0byBnZXRcbiAgICAqIEBwYXJhbSB7UmVxdWVzdGFibGUuY2FsbGJhY2t9IFtjYl0gLSB3aWxsIHJlY2VpdmUgdGhlIGNvbW1lbnRcbiAgICAqIEByZXR1cm4ge1Byb21pc2V9IC0gdGhlIHByb21pc2UgZm9yIHRoZSBodHRwIHJlcXVlc3RcbiAgICAqL1xuICAgZ2V0SXNzdWVDb21tZW50KGlkLCBjYikge1xuICAgICAgcmV0dXJuIHRoaXMuX3JlcXVlc3QoJ0dFVCcsIGAvcmVwb3MvJHt0aGlzLl9fcmVwb3NpdG9yeX0vaXNzdWVzL2NvbW1lbnRzLyR7aWR9YCwgbnVsbCwgY2IpO1xuICAgfVxuXG4gICAvKipcbiAgICAqIENvbW1lbnQgb24gYW4gaXNzdWVcbiAgICAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIuZ2l0aHViLmNvbS92My9pc3N1ZXMvY29tbWVudHMvI2NyZWF0ZS1hLWNvbW1lbnRcbiAgICAqIEBwYXJhbSB7bnVtYmVyfSBpc3N1ZSAtIHRoZSBpZCBvZiB0aGUgaXNzdWUgdG8gY29tbWVudCBvblxuICAgICogQHBhcmFtIHtzdHJpbmd9IGNvbW1lbnQgLSB0aGUgY29tbWVudCB0byBhZGRcbiAgICAqIEBwYXJhbSB7UmVxdWVzdGFibGUuY2FsbGJhY2t9IFtjYl0gLSB3aWxsIHJlY2VpdmUgdGhlIGNyZWF0ZWQgY29tbWVudFxuICAgICogQHJldHVybiB7UHJvbWlzZX0gLSB0aGUgcHJvbWlzZSBmb3IgdGhlIGh0dHAgcmVxdWVzdFxuICAgICovXG4gICBjcmVhdGVJc3N1ZUNvbW1lbnQoaXNzdWUsIGNvbW1lbnQsIGNiKSB7XG4gICAgICByZXR1cm4gdGhpcy5fcmVxdWVzdCgnUE9TVCcsIGAvcmVwb3MvJHt0aGlzLl9fcmVwb3NpdG9yeX0vaXNzdWVzLyR7aXNzdWV9L2NvbW1lbnRzYCwge2JvZHk6IGNvbW1lbnR9LCBjYik7XG4gICB9XG5cbiAgIC8qKlxuICAgICogRWRpdCBhIGNvbW1lbnQgb24gYW4gaXNzdWVcbiAgICAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIuZ2l0aHViLmNvbS92My9pc3N1ZXMvY29tbWVudHMvI2VkaXQtYS1jb21tZW50XG4gICAgKiBAcGFyYW0ge251bWJlcn0gaWQgLSB0aGUgY29tbWVudCBpZCB0byBlZGl0XG4gICAgKiBAcGFyYW0ge3N0cmluZ30gY29tbWVudCAtIHRoZSBjb21tZW50IHRvIGVkaXRcbiAgICAqIEBwYXJhbSB7UmVxdWVzdGFibGUuY2FsbGJhY2t9IFtjYl0gLSB3aWxsIHJlY2VpdmUgdGhlIGVkaXRlZCBjb21tZW50XG4gICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIHRoZSBwcm9taXNlIGZvciB0aGUgaHR0cCByZXF1ZXN0XG4gICAgKi9cbiAgIGVkaXRJc3N1ZUNvbW1lbnQoaWQsIGNvbW1lbnQsIGNiKSB7XG4gICAgICByZXR1cm4gdGhpcy5fcmVxdWVzdCgnUEFUQ0gnLCBgL3JlcG9zLyR7dGhpcy5fX3JlcG9zaXRvcnl9L2lzc3Vlcy9jb21tZW50cy8ke2lkfWAsIHtib2R5OiBjb21tZW50fSwgY2IpO1xuICAgfVxuXG4gICAvKipcbiAgICAqIERlbGV0ZSBhIGNvbW1lbnQgb24gYW4gaXNzdWVcbiAgICAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIuZ2l0aHViLmNvbS92My9pc3N1ZXMvY29tbWVudHMvI2RlbGV0ZS1hLWNvbW1lbnRcbiAgICAqIEBwYXJhbSB7bnVtYmVyfSBpZCAtIHRoZSBjb21tZW50IGlkIHRvIGRlbGV0ZVxuICAgICogQHBhcmFtIHtSZXF1ZXN0YWJsZS5jYWxsYmFja30gW2NiXSAtIHdpbGwgcmVjZWl2ZSB0cnVlIGlmIHRoZSByZXF1ZXN0IGlzIHN1Y2Nlc3NmdWxcbiAgICAqIEByZXR1cm4ge1Byb21pc2V9IC0gdGhlIHByb21pc2UgZm9yIHRoZSBodHRwIHJlcXVlc3RcbiAgICAqL1xuICAgZGVsZXRlSXNzdWVDb21tZW50KGlkLCBjYikge1xuICAgICAgcmV0dXJuIHRoaXMuX3JlcXVlc3QoJ0RFTEVURScsIGAvcmVwb3MvJHt0aGlzLl9fcmVwb3NpdG9yeX0vaXNzdWVzL2NvbW1lbnRzLyR7aWR9YCwgbnVsbCwgY2IpO1xuICAgfVxuXG4gICAvKipcbiAgICAqIEVkaXQgYW4gaXNzdWVcbiAgICAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIuZ2l0aHViLmNvbS92My9pc3N1ZXMvI2VkaXQtYW4taXNzdWVcbiAgICAqIEBwYXJhbSB7bnVtYmVyfSBpc3N1ZSAtIHRoZSBpc3N1ZSBudW1iZXIgdG8gZWRpdFxuICAgICogQHBhcmFtIHtPYmplY3R9IGlzc3VlRGF0YSAtIHRoZSBuZXcgaXNzdWUgZGF0YVxuICAgICogQHBhcmFtIHtSZXF1ZXN0YWJsZS5jYWxsYmFja30gW2NiXSAtIHdpbGwgcmVjZWl2ZSB0aGUgbW9kaWZpZWQgaXNzdWVcbiAgICAqIEByZXR1cm4ge1Byb21pc2V9IC0gdGhlIHByb21pc2UgZm9yIHRoZSBodHRwIHJlcXVlc3RcbiAgICAqL1xuICAgZWRpdElzc3VlKGlzc3VlLCBpc3N1ZURhdGEsIGNiKSB7XG4gICAgICByZXR1cm4gdGhpcy5fcmVxdWVzdCgnUEFUQ0gnLCBgL3JlcG9zLyR7dGhpcy5fX3JlcG9zaXRvcnl9L2lzc3Vlcy8ke2lzc3VlfWAsIGlzc3VlRGF0YSwgY2IpO1xuICAgfVxuXG4gICAvKipcbiAgICAqIEdldCBhIHBhcnRpY3VsYXIgaXNzdWVcbiAgICAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIuZ2l0aHViLmNvbS92My9pc3N1ZXMvI2dldC1hLXNpbmdsZS1pc3N1ZVxuICAgICogQHBhcmFtIHtudW1iZXJ9IGlzc3VlIC0gdGhlIGlzc3VlIG51bWJlciB0byBmZXRjaFxuICAgICogQHBhcmFtIHtSZXF1ZXN0YWJsZS5jYWxsYmFja30gW2NiXSAtIHdpbGwgcmVjZWl2ZSB0aGUgaXNzdWVcbiAgICAqIEByZXR1cm4ge1Byb21pc2V9IC0gdGhlIHByb21pc2UgZm9yIHRoZSBodHRwIHJlcXVlc3RcbiAgICAqL1xuICAgZ2V0SXNzdWUoaXNzdWUsIGNiKSB7XG4gICAgICByZXR1cm4gdGhpcy5fcmVxdWVzdCgnR0VUJywgYC9yZXBvcy8ke3RoaXMuX19yZXBvc2l0b3J5fS9pc3N1ZXMvJHtpc3N1ZX1gLCBudWxsLCBjYik7XG4gICB9XG5cbiAgIC8qKlxuICAgICogTGlzdCB0aGUgbWlsZXN0b25lcyBmb3IgdGhlIHJlcG9zaXRvcnlcbiAgICAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIuZ2l0aHViLmNvbS92My9pc3N1ZXMvbWlsZXN0b25lcy8jbGlzdC1taWxlc3RvbmVzLWZvci1hLXJlcG9zaXRvcnlcbiAgICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIC0gZmlsdGVyaW5nIG9wdGlvbnNcbiAgICAqIEBwYXJhbSB7UmVxdWVzdGFibGUuY2FsbGJhY2t9IFtjYl0gLSB3aWxsIHJlY2VpdmUgdGhlIGFycmF5IG9mIG1pbGVzdG9uZXNcbiAgICAqIEByZXR1cm4ge1Byb21pc2V9IC0gdGhlIHByb21pc2UgZm9yIHRoZSBodHRwIHJlcXVlc3RcbiAgICAqL1xuICAgbGlzdE1pbGVzdG9uZXMob3B0aW9ucywgY2IpIHtcbiAgICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0KCdHRVQnLCBgL3JlcG9zLyR7dGhpcy5fX3JlcG9zaXRvcnl9L21pbGVzdG9uZXNgLCBvcHRpb25zLCBjYik7XG4gICB9XG5cbiAgIC8qKlxuICAgICogR2V0IGEgbWlsZXN0b25lXG4gICAgKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLmdpdGh1Yi5jb20vdjMvaXNzdWVzL21pbGVzdG9uZXMvI2dldC1hLXNpbmdsZS1taWxlc3RvbmVcbiAgICAqIEBwYXJhbSB7c3RyaW5nfSBtaWxlc3RvbmUgLSB0aGUgaWQgb2YgdGhlIG1pbGVzdG9uZSB0byBmZXRjaFxuICAgICogQHBhcmFtIHtSZXF1ZXN0YWJsZS5jYWxsYmFja30gW2NiXSAtIHdpbGwgcmVjZWl2ZSB0aGUgbWlsZXN0b25lXG4gICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIHRoZSBwcm9taXNlIGZvciB0aGUgaHR0cCByZXF1ZXN0XG4gICAgKi9cbiAgIGdldE1pbGVzdG9uZShtaWxlc3RvbmUsIGNiKSB7XG4gICAgICByZXR1cm4gdGhpcy5fcmVxdWVzdCgnR0VUJywgYC9yZXBvcy8ke3RoaXMuX19yZXBvc2l0b3J5fS9taWxlc3RvbmVzLyR7bWlsZXN0b25lfWAsIG51bGwsIGNiKTtcbiAgIH1cblxuICAgLyoqXG4gICAgKiBDcmVhdGUgYSBuZXcgbWlsZXN0b25lXG4gICAgKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLmdpdGh1Yi5jb20vdjMvaXNzdWVzL21pbGVzdG9uZXMvI2NyZWF0ZS1hLW1pbGVzdG9uZVxuICAgICogQHBhcmFtIHtPYmplY3R9IG1pbGVzdG9uZURhdGEgLSB0aGUgbWlsZXN0b25lIGRlZmluaXRpb25cbiAgICAqIEBwYXJhbSB7UmVxdWVzdGFibGUuY2FsbGJhY2t9IFtjYl0gLSB3aWxsIHJlY2VpdmUgdGhlIG1pbGVzdG9uZVxuICAgICogQHJldHVybiB7UHJvbWlzZX0gLSB0aGUgcHJvbWlzZSBmb3IgdGhlIGh0dHAgcmVxdWVzdFxuICAgICovXG4gICBjcmVhdGVNaWxlc3RvbmUobWlsZXN0b25lRGF0YSwgY2IpIHtcbiAgICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0KCdQT1NUJywgYC9yZXBvcy8ke3RoaXMuX19yZXBvc2l0b3J5fS9taWxlc3RvbmVzYCwgbWlsZXN0b25lRGF0YSwgY2IpO1xuICAgfVxuXG4gICAvKipcbiAgICAqIEVkaXQgYSBtaWxlc3RvbmVcbiAgICAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIuZ2l0aHViLmNvbS92My9pc3N1ZXMvbWlsZXN0b25lcy8jdXBkYXRlLWEtbWlsZXN0b25lXG4gICAgKiBAcGFyYW0ge3N0cmluZ30gbWlsZXN0b25lIC0gdGhlIGlkIG9mIHRoZSBtaWxlc3RvbmUgdG8gZWRpdFxuICAgICogQHBhcmFtIHtPYmplY3R9IG1pbGVzdG9uZURhdGEgLSB0aGUgdXBkYXRlcyB0byBtYWtlIHRvIHRoZSBtaWxlc3RvbmVcbiAgICAqIEBwYXJhbSB7UmVxdWVzdGFibGUuY2FsbGJhY2t9IFtjYl0gLSB3aWxsIHJlY2VpdmUgdGhlIHVwZGF0ZWQgbWlsZXN0b25lXG4gICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIHRoZSBwcm9taXNlIGZvciB0aGUgaHR0cCByZXF1ZXN0XG4gICAgKi9cbiAgIGVkaXRNaWxlc3RvbmUobWlsZXN0b25lLCBtaWxlc3RvbmVEYXRhLCBjYikge1xuICAgICAgcmV0dXJuIHRoaXMuX3JlcXVlc3QoJ1BBVENIJywgYC9yZXBvcy8ke3RoaXMuX19yZXBvc2l0b3J5fS9taWxlc3RvbmVzLyR7bWlsZXN0b25lfWAsIG1pbGVzdG9uZURhdGEsIGNiKTtcbiAgIH1cblxuICAgLyoqXG4gICAgKiBEZWxldGUgYSBtaWxlc3RvbmUgKHRoaXMgaXMgZGlzdGluY3QgZnJvbSBjbG9zaW5nIGEgbWlsZXN0b25lKVxuICAgICogQHNlZSBodHRwczovL2RldmVsb3Blci5naXRodWIuY29tL3YzL2lzc3Vlcy9taWxlc3RvbmVzLyNkZWxldGUtYS1taWxlc3RvbmVcbiAgICAqIEBwYXJhbSB7c3RyaW5nfSBtaWxlc3RvbmUgLSB0aGUgaWQgb2YgdGhlIG1pbGVzdG9uZSB0byBkZWxldGVcbiAgICAqIEBwYXJhbSB7UmVxdWVzdGFibGUuY2FsbGJhY2t9IFtjYl0gLSB3aWxsIHJlY2VpdmUgdGhlIHN0YXR1c1xuICAgICogQHJldHVybiB7UHJvbWlzZX0gLSB0aGUgcHJvbWlzZSBmb3IgdGhlIGh0dHAgcmVxdWVzdFxuICAgICovXG4gICBkZWxldGVNaWxlc3RvbmUobWlsZXN0b25lLCBjYikge1xuICAgICAgcmV0dXJuIHRoaXMuX3JlcXVlc3QoJ0RFTEVURScsIGAvcmVwb3MvJHt0aGlzLl9fcmVwb3NpdG9yeX0vbWlsZXN0b25lcy8ke21pbGVzdG9uZX1gLCBudWxsLCBjYik7XG4gICB9XG5cbiAgIC8qKlxuICAgICogQ3JlYXRlIGEgbmV3IGxhYmVsXG4gICAgKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLmdpdGh1Yi5jb20vdjMvaXNzdWVzL2xhYmVscy8jY3JlYXRlLWEtbGFiZWxcbiAgICAqIEBwYXJhbSB7T2JqZWN0fSBsYWJlbERhdGEgLSB0aGUgbGFiZWwgZGVmaW5pdGlvblxuICAgICogQHBhcmFtIHtSZXF1ZXN0YWJsZS5jYWxsYmFja30gW2NiXSAtIHdpbGwgcmVjZWl2ZSB0aGUgb2JqZWN0IHJlcHJlc2VudGluZyB0aGUgbGFiZWxcbiAgICAqIEByZXR1cm4ge1Byb21pc2V9IC0gdGhlIHByb21pc2UgZm9yIHRoZSBodHRwIHJlcXVlc3RcbiAgICAqL1xuICAgY3JlYXRlTGFiZWwobGFiZWxEYXRhLCBjYikge1xuICAgICAgcmV0dXJuIHRoaXMuX3JlcXVlc3QoJ1BPU1QnLCBgL3JlcG9zLyR7dGhpcy5fX3JlcG9zaXRvcnl9L2xhYmVsc2AsIGxhYmVsRGF0YSwgY2IpO1xuICAgfVxuXG4gIC8qKlxuICAgKiBMaXN0IHRoZSBsYWJlbHMgZm9yIHRoZSByZXBvc2l0b3J5XG4gICAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIuZ2l0aHViLmNvbS92My9pc3N1ZXMvbGFiZWxzLyNsaXN0LWFsbC1sYWJlbHMtZm9yLXRoaXMtcmVwb3NpdG9yeVxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAtIGZpbHRlcmluZyBvcHRpb25zXG4gICAqIEBwYXJhbSB7UmVxdWVzdGFibGUuY2FsbGJhY2t9IFtjYl0gLSB3aWxsIHJlY2VpdmUgdGhlIGFycmF5IG9mIGxhYmVsc1xuICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIHRoZSBwcm9taXNlIGZvciB0aGUgaHR0cCByZXF1ZXN0XG4gICAqL1xuICAgbGlzdExhYmVscyhvcHRpb25zLCBjYikge1xuICAgICAgcmV0dXJuIHRoaXMuX3JlcXVlc3QoJ0dFVCcsIGAvcmVwb3MvJHt0aGlzLl9fcmVwb3NpdG9yeX0vbGFiZWxzYCwgb3B0aW9ucywgY2IpO1xuICAgfVxuXG4gIC8qKlxuICAgKiBHZXQgYSBsYWJlbFxuICAgKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLmdpdGh1Yi5jb20vdjMvaXNzdWVzL2xhYmVscy8jZ2V0LWEtc2luZ2xlLWxhYmVsXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBsYWJlbCAtIHRoZSBuYW1lIG9mIHRoZSBsYWJlbCB0byBmZXRjaFxuICAgKiBAcGFyYW0ge1JlcXVlc3RhYmxlLmNhbGxiYWNrfSBbY2JdIC0gd2lsbCByZWNlaXZlIHRoZSBsYWJlbFxuICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIHRoZSBwcm9taXNlIGZvciB0aGUgaHR0cCByZXF1ZXN0XG4gICAqL1xuICAgZ2V0TGFiZWwobGFiZWwsIGNiKSB7XG4gICAgICByZXR1cm4gdGhpcy5fcmVxdWVzdCgnR0VUJywgYC9yZXBvcy8ke3RoaXMuX19yZXBvc2l0b3J5fS9sYWJlbHMvJHtsYWJlbH1gLCBudWxsLCBjYik7XG4gICB9XG5cbiAgLyoqXG4gICAqIEVkaXQgYSBsYWJlbFxuICAgKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLmdpdGh1Yi5jb20vdjMvaXNzdWVzL2xhYmVscy8jdXBkYXRlLWEtbGFiZWxcbiAgICogQHBhcmFtIHtzdHJpbmd9IGxhYmVsIC0gdGhlIG5hbWUgb2YgdGhlIGxhYmVsIHRvIGVkaXRcbiAgICogQHBhcmFtIHtPYmplY3R9IGxhYmVsRGF0YSAtIHRoZSB1cGRhdGVzIHRvIG1ha2UgdG8gdGhlIGxhYmVsXG4gICAqIEBwYXJhbSB7UmVxdWVzdGFibGUuY2FsbGJhY2t9IFtjYl0gLSB3aWxsIHJlY2VpdmUgdGhlIHVwZGF0ZWQgbGFiZWxcbiAgICogQHJldHVybiB7UHJvbWlzZX0gLSB0aGUgcHJvbWlzZSBmb3IgdGhlIGh0dHAgcmVxdWVzdFxuICAgKi9cbiAgIGVkaXRMYWJlbChsYWJlbCwgbGFiZWxEYXRhLCBjYikge1xuICAgICAgcmV0dXJuIHRoaXMuX3JlcXVlc3QoJ1BBVENIJywgYC9yZXBvcy8ke3RoaXMuX19yZXBvc2l0b3J5fS9sYWJlbHMvJHtsYWJlbH1gLCBsYWJlbERhdGEsIGNiKTtcbiAgIH1cblxuICAvKipcbiAgICogRGVsZXRlIGEgbGFiZWxcbiAgICogQHNlZSBodHRwczovL2RldmVsb3Blci5naXRodWIuY29tL3YzL2lzc3Vlcy9sYWJlbHMvI2RlbGV0ZS1hLWxhYmVsXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBsYWJlbCAtIHRoZSBuYW1lIG9mIHRoZSBsYWJlbCB0byBkZWxldGVcbiAgICogQHBhcmFtIHtSZXF1ZXN0YWJsZS5jYWxsYmFja30gW2NiXSAtIHdpbGwgcmVjZWl2ZSB0aGUgc3RhdHVzXG4gICAqIEByZXR1cm4ge1Byb21pc2V9IC0gdGhlIHByb21pc2UgZm9yIHRoZSBodHRwIHJlcXVlc3RcbiAgICovXG4gICBkZWxldGVMYWJlbChsYWJlbCwgY2IpIHtcbiAgICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0KCdERUxFVEUnLCBgL3JlcG9zLyR7dGhpcy5fX3JlcG9zaXRvcnl9L2xhYmVscy8ke2xhYmVsfWAsIG51bGwsIGNiKTtcbiAgIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBJc3N1ZTtcbiJdfQ==
//# sourceMappingURL=Issue.js.map
