const React = require("react");

function Show({ tweet }) {
  console.log(tweet.sponsored);
  return (
    <div>
      <div>{tweet.title}</div>
      <div>{tweet.author}</div>
      <div>{tweet.body}</div>
      <div>{new Date(tweet.createdAt).toLocaleDateString()}</div>
      <div>{tweet.sponsored ? "sponsored" : null}</div>

      <div>
        {tweet.comments.length
          ? tweet.comments.map((comment) => {
              return (
                <div>
                  <br />
                  <div>{comment.body}</div>
                  <div>{comment.author}</div>
                </div>
              );
            })
          : null}
      </div>

      <div>
        <h3>Comment Form</h3>
        <form
          method="POST"
          action={`/api/tweets/add-comment/${tweet._id}?_method=PUT`}>
          Body: <input type="text" name="body" required />
          <br />
          Author: <input type="text" name="author" required />
          <br />
          <button>Add Comment</button>
        </form>
      </div>
    </div>
  );
}

module.exports = Show;
