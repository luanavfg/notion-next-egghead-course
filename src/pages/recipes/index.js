import { Client } from "@notionhq/client";
import Link from "next/link";

const RecipePage = ({ recipes }) => {
  return recipes.map((recipe) => (
    <p key={recipe.id}>
      <Link href={`/recipes/${recipe.id}`}>{recipe.title}</Link>
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
      recipes.push({
        title: result.child_page.title,
        id: result.id,
      });
    }
  });

  return {
    props: {
      recipes,
    },
  };
};

export default RecipePage;
