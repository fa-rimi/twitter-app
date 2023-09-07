const React = require("react");
const DefaultLayout = require("./layout/Default");

function Index({ tweets }) {
  return (
    <DefaultLayout title="Index">
      <nav>
        <a href="/tweets/new">Create a new Tweet</a>
      </nav>

      <ul>
        {tweets.map((tweet) => {
          return (
            <li key={tweet._id} className="border p-5">
              <a href={`/tweets/${tweet._id}`}>{tweet.title}</a>
              <p>{tweet.body}</p>
              <p>{tweet.author}</p>
              <>
                <a href={`/api/tweets/add-like/${tweet.id}`}>Increase Like</a>
                <br />
                <span>Likes : {tweet.likes}</span>
              </>
              <span>
                {tweet.sponsored ? (
                  <span>
                    {" "}
                    <br />
                    Sponsored{" "}
                  </span>
                ) : (
                  ""
                )}
              </span>
              <br />
              <a href={`/tweets/${tweet._id}/edit`}>Edit Tweet</a>

              <form
                method="post"
                action={`/api/tweets/${tweet._id}?_method=DELETE`}>
                <button>Delete</button>
              </form>
            </li>
          );
        })}
      </ul>
    </DefaultLayout>
  );
}

module.exports = Index;
