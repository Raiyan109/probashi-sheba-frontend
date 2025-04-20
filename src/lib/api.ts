export async function getBMET() {
    try {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
        console.log(baseUrl);
        
        //   if (!baseUrl) {
        //     console.warn("BASE_URL environment variable is not set, using mock data")
        //     return getMockCategoriesResponse()
        //   }

        const res = await fetch(`${baseUrl}/bmet`, {
            next: { revalidate: 60 },
        })

        //   if (!res.ok) {
        //     console.warn(`API returned status ${res.status}, using mock data`)
        //     return getMockCategoriesResponse()
        //   }

        return await res.json()
    } catch (error) {
        console.error("Error fetching categories:", error)
        console.info("Falling back to mock data")
        // Return mock data as fallback
        //   return getMockCategoriesResponse()
    }
}