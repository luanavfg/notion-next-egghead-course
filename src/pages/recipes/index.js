import { Client } from "@notionhq/client";
import Link from "next/link";
import slugify from "slugify";

const RecipePage = ({ recipes }) => {
  return recipes.map((recipe) => (
    <p key={recipe}>
      <Link href={`/recipes/${slugify(recipe).toLowerCase()}`}>{recipe}</Link>
    </p>
  ));
};

export const getStaticProps = async () => {
  const notion = new Client({
    auth: process.env.NOTION_SECRET,
  });
  const data = await notion.blocks.children.list({
    block_id: process.env.PAGE_ID,
  });

  const recipes = [];
  data.results.forEach((result) => {
    if (result.type === "child_page") {
      recipes.push(result.child_page.title);
    }
  });

  return {
    props: {
      recipes,
    },
  };
};

export default RecipePage;
