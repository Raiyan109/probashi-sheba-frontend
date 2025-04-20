export async function getBMET() {
    try {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
        const res = await fetch(`${baseUrl}/bmet`, {
            next: { revalidate: 60 },
        })

        return await res.json()
    } catch (error) {
        console.error("Error fetching BMET:", error)
        console.info("Falling back to mock data")
    }
}

export async function loginAdmin(data: {
    admin_phone: string;
    admin_password: string;
}) {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const res = await fetch(`${baseUrl}/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });

    const response = await res.json();

    if (!res.ok) throw new Error(response.message || "Login failed");

    return response;
}

// GET Faq
export async function getFaq() {
    try {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
        const res = await fetch(`${baseUrl}/faq`, {
            next: { revalidate: 60 },
        })

        return await res.json()
    } catch (error) {
        console.error("Error fetching faq:", error)
        console.info("Falling back to mock data")
    }
}

// GET Checklist
export async function getChecklist() {
    try {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
        const res = await fetch(`${baseUrl}/checklist`, {
            next: { revalidate: 60 },
        })

        return await res.json()
    } catch (error) {
        console.error("Error fetching checklist:", error)
        console.info("Falling back to mock data")
    }
}

// GET Banner
export async function getBanner() {
    try {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
        const res = await fetch(`${baseUrl}/banner`, {
            next: { revalidate: 60 },
        })

        return await res.json()
    } catch (error) {
        console.error("Error fetching banner:", error)
        console.info("Falling back to mock data")
    }
}

// GET Testimonial
export async function getTestimonial() {
    try {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
        const res = await fetch(`${baseUrl}/testimonial`, {
            next: { revalidate: 60 },
        })

        return await res.json()
    } catch (error) {
        console.error("Error fetching testimonial:", error)
        console.info("Falling back to mock data")
    }
}