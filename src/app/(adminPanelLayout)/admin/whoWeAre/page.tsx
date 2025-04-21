import WhoWeAreComponent from '@/components/AdminPanel/WhoWeAreComponent';
import { getWhoWeAre } from '@/lib/api';
import { getQueryClient } from "@/lib/get-query-client"
import { dehydrate, HydrationBoundary } from "@tanstack/react-query"

const WhoWeArePage = async () => {
    const queryClient = getQueryClient()

    await queryClient.prefetchQuery({
        queryKey: ['faq'],
        queryFn: getWhoWeAre
    })
    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <WhoWeAreComponent />
        </HydrationBoundary>
    );
};

export default WhoWeArePage;