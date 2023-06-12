import {PageContainer} from "@/components/layout/PageContainer";
import {PostsAndCategories} from "@/components/layout/PostsAndCategories";
import {Panels} from "@/types";
import {fetchCategories} from "@/lib/categories";

export default async function Home() {
  const { categories, articles } = await fetchCategories()
  return (
      <PageContainer
          title="Projiris"
          subtitle="Project management and risk analysis"
          description=""
          sidebarImage='/assets/default-sidebar.jpg'
          showLinks={true}
          articles={articles}
          categories={categories}
          isMenuVisible={true}
      >
        <PostsAndCategories articles={articles} categories={categories} activePanel={Panels.POSTS} />
      </PageContainer>
  )
}
