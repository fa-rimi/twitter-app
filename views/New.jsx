const React = require("react");

function New() {
  return (
    <div>
      <h2>Create a new Tweet</h2>
      <form action="/api/tweets" method="post">
        Title: <input name="title" type="text" required />
        Author: <input name="author" type="text" required />
        <textarea name="body" required></textarea>
        <button>Create Tweet</button>
      </form>
    </div>
  );
}

module.exports = New;
