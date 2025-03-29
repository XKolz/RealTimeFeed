import { useEffect, useRef } from "react";
import axios from "axios";
import useFeedStore from "../store/useFeedStore";

const videoList = [
  "https://www.w3schools.com/html/movie.mp4",
  "https://www.w3schools.com/html/mov_bbb.mp4",
];

const useFeed = () => {
  const { posts, setPosts } = useFeedStore();
  const page = useRef(1);

  const fetchData = async (append = false) => {
    try {
      const res = await axios.get(
        `https://dummyjson.com/posts?limit=5&skip=${(page.current - 1) * 5}`
      );

      let videoIndex = 0;
      const formatted = res.data.posts.map((p, i) => {
        const isVideo = i % 2 !== 0;
        const video = isVideo
          ? videoList[videoIndex++ % videoList.length]
          : null;

        return {
          id: p.id,
          text: p.body,
          image: !isVideo ? `https://picsum.photos/seed/${p.id}/400/300` : null,
          video,
          views: 0,
        };
      });

      setPosts((prev) => (append ? [...prev, ...formatted] : formatted));
    } catch (err) {
      console.error("Failed to fetch posts:", err);
    }
  };

  const loadMore = () => {
    page.current += 1;
    fetchData(true);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { posts, loadMore };
};

export default useFeed;
