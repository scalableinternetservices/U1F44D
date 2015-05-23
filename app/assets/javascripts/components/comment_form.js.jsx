var Dispatcher = require('../flux/dispatcher');

var CommentForm = React.createClass({
  propTypes: {
    postID: React.PropTypes.number,
  },

  getInitialState: function() {
    return {
      comment: '',
    };
  },

  _changeComment: function(event) {
    this.setState({
      comment: event.target.value
    });
  },

  _submitComment: function(event) {
    event.preventDefault();
    // don't submit empty comments
    if (!this.state.comment) {
      return;
    }
    Dispatcher.dispatch({
      actionType: 'add_comment',
      id: this.props.postID,
      text: this.state.comment,
    });
    this.setState({
      comment: ''
    });
  },

  render: function() {
    return (
      <div>
        <input
          type="text"
          value={this.state.comment}
          onChange={this._changeComment}
        />
        <input type="submit" onClick={this._submitComment} value="Comment" />
      </div>
    );
  }
});

module.exports = CommentForm;
