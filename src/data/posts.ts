import __posts from "./jsons/__posts.json";
import { DEMO_CATEGORIES } from "./taxonomies";
import { PostDataType } from "./types";
import { DEMO_AUTHORS } from "./authors";

import imgPng1 from "@/images/ests/est_1.jpg";
import imgPng2 from "@/images/ests/est_2.jpg";
import imgPng3 from "@/images/ests/est_3.jpg";
import imgPng4 from "@/images/ests/est_4.jpg";
import imgPng5 from "@/images/ests/est_5.jpg";
import imgPng6 from "@/images/ests/est_6.jpg";
import imgPng7 from "@/images/ests/est-7.jpg";


export const estImgs = [imgPng1,imgPng2,imgPng3,imgPng4,imgPng5,imgPng6,imgPng7,imgPng1,imgPng3]

// FOR MAIN DEMO
const DEMO_POSTS = __posts.map((post): PostDataType => {
  //  ##########  GET CATEGORY BY CAT ID ######## //
  const categories = post.categoriesId.map(
    (id) => DEMO_CATEGORIES.filter((taxonomy) => taxonomy.id === id)[0]
  );

  return {
    ...post,
    author: DEMO_AUTHORS.filter((user) => user.id === post.authorId)[0],
    categories: [categories[0]],
  } as PostDataType;
});

export { DEMO_POSTS };
