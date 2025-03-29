import { create } from "zustand";

const useFeedStore = create((set) => ({
  posts: [], // ✅ initialized as an array

  setPosts: (updater) =>
    set((state) => {
      const updatedPosts =
        typeof updater === "function" ? updater(state.posts) : updater;

      console.log("Setting posts:", updatedPosts); // Debug log
      return { posts: updatedPosts };
    }),

  updatePostView: (postId) =>
    set((state) => {
      const updated = state.posts.map((p) =>
        p.id === postId ? { ...p, views: p.views + 1 } : p
      );
      return { posts: updated };
    }),
}));

export default useFeedStore;
