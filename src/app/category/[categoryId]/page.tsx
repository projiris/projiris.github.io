'use client';
import {useCategoriesAndArticles} from "@/hooks/useCategoriesAndArticles";
import {PostsAndCategories} from "@/components/layout/PostsAndCategories";
import {PageContainer} from "@/components/layout/PageContainer";

export default function Page ({ params }) {
    const { categories } = useCategoriesAndArticles()
    const {categoryId: activeCategoryId} = params
    //const activeCategoryId = state?.activeItemId ?? getActiveItemId()
    const activeCategory = categories?.[activeCategoryId] ?? {
        title: '',
        image: ''
    }

    return <PageContainer
        title={activeCategory.title}
        sidebarImage={activeCategory.image}
    >
        <PostsAndCategories activeCategoryId={activeCategoryId}/>
    </PageContainer>
}
