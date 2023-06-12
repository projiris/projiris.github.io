import {PostsAndCategories} from "@/components/layout/PostsAndCategories";
import {PageContainer} from "@/components/layout/PageContainer";
import {fetchCategories} from "@/lib/categories";
import {Panels} from "@/types";

interface CategpryPageParams {
    categoryId: string;
}

export default async function Page ({ params } : { params: CategpryPageParams}) {
    //const { categories } = useCategoriesAndArticles()
    const { categories, articles } = await fetchCategories()
    const {categoryId: activeCategoryId} = params
    //const activeCategoryId = state?.activeItemId ?? getActiveItemId()
    const activeCategory = categories?.[activeCategoryId] ?? {
        title: '',
        image: ''
    }

    return <PageContainer
        title={activeCategory.title}
        sidebarImage={activeCategory.image}
        articles={articles} categories={categories}
    >
        <PostsAndCategories articles={articles} categories={categories} activeCategoryId={activeCategoryId} activePanel={Panels.POSTS}/>
    </PageContainer>
}
