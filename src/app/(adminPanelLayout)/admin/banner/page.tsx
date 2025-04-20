
import { getQueryClient } from "@/lib/get-query-client"
import { getBanner } from "@/lib/api"
import BannerPreview from "@/components/AdminPanel/Banner/BannerPreview"
import { dehydrate, HydrationBoundary } from "@tanstack/react-query"


const BannerPage = async () => {
    const queryClient = getQueryClient()

    await queryClient.prefetchQuery({
        queryKey: ['banner'],
        queryFn: getBanner
    })
    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            {/* Banner preview */}
            <BannerPreview />
        </HydrationBoundary>
    )
}

export default BannerPage