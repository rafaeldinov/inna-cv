import getAllPosts from '@/api-actions/get-all-posts';
import getPosts from '@/api-actions/get-posts';
import { Area, POSTS_PER_PAGE } from '@/app/const';
import { PostType } from '@/types/post-type';
import { create } from 'zustand';

const initialFilters = Object.values(Area);

interface PostsStore {
  pagesCount: undefined | number;
  currentPage: number;
  filters: string[];
  allPosts: PostType[];
  posts: PostType[];
  getAllPosts: () => Promise<void>;
  setFilters: (filters: string[]) => Promise<void>;
  setCurrentPage: (page: number) => Promise<void>;
}

export const usePostsStore = create<PostsStore>((set, get) => ({
  pagesCount: undefined,
  currentPage: 1,
  filters: initialFilters,
  posts: [],
  allPosts: [],
  getAllPosts: async () => {
    const allPosts = await getAllPosts();
    set(() => ({ allPosts }));
  },
  setFilters: async (filters: string[]) => {
    const currentFilters = filters.length === 0 ? initialFilters : filters;
    const page = get().currentPage;
    set(() => ({ filters: currentFilters }));
    const { posts, count } = await getPosts(currentFilters, page);
    set(() => ({ currentPage: 1 }));
    const pagesCount = Math.ceil(count / POSTS_PER_PAGE);
    set(() => ({ pagesCount }));
    set(() => ({ posts }));
  },
  setCurrentPage: async (page: number = 1) => {
    const filters = get().filters;
    set(() => ({ currentPage: page }));
    const { posts, count } = await getPosts(filters, page);
    const pagesCount = Math.ceil(count / POSTS_PER_PAGE);
    set(() => ({ pagesCount }));
    set(() => ({ posts }));
  },
}));
