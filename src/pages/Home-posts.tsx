import { Container, Row, Box } from "../components/layouts";
import usePosts, { Post } from "../hooks/usePosts";
import LoginForm from "../components/LoginForm";
import "./Home.scss";

function HomePagePosts() {
  const { posts, errors, isPending } = usePosts();

  console.log({ posts });
  return (
    <Container className={""} FULL={false} pageTitle={"Home"}>
      {/* <Row className={"prose"}>
        <h3>LOGIN</h3>
        <LoginForm />
      </Row> */}
      <Row className={"prose"}>
        <h3>PULLING DATA FROM WP w/ WPAPI-NODE</h3>
      </Row>
      <Row className={"prose flex flex-wrap justify-around"}>
        <ul>
          {posts.length &&
            posts.map((post: Post) => (
              <li key={post.id}>{post?.content?.rendered}</li>
            ))}
        </ul>
      </Row>
    </Container>
  );
}

export default HomePagePosts;
