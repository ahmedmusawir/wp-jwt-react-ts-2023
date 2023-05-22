import { useEffect, useState } from "react";
import { wp } from "../services/apiClient";

export interface Post {
  id: number;
  content: {
    rendered: string;
  };
  title: {
    rendered: string;
  };
}

export const usePosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [errors, setErrors] = useState<string>("");
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    async function fetchPosts() {
      try {
        setIsPending(true);
        // Fetch posts
        const fetchedPosts = await wp.posts().get();
        // console.log(fetchedPosts);

        setPosts(fetchedPosts);
        setIsPending(false);
      } catch (e: unknown) {
        // print error
        if (e instanceof Error) {
          console.log(e);
          setErrors(e.message);
        } else {
          console.log(e);
          setErrors(String(e));
        }
        return [];
      }
    }

    fetchPosts();
  }, []);

  return { posts, errors, isPending };
};

export default usePosts;
