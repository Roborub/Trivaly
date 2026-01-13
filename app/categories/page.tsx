"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function CategoriesPage() {
    const [categoryData, setCategoryData] = useState<string[]>([]);

    useEffect(() => {
        async function fetchCategories() {
            const response = await fetch("/api/categories");
            const jsonData: { categories: string[] } = await response.json();

            setCategoryData(jsonData.categories);
        }
        fetchCategories();
    }, []);

    return (
        <main className="flex flex-wrap max-h-[80dvh] mt-5 w-full items-center justify-center p-4 overflow-auto">
            {
                categoryData.map(category => (
                    <div key={category} className="flex-col mb-5">
                        <Button className="w-50 h-50 cursor-pointer" variant="ghost">
                            <Link href={`/quiz?category=${category}`}>
                                <img    className="dark:hidden"
                                        src={`/images/categories/${category}--light-theme.svg`}
                                        alt={`${category}-category-image`} />
                                <img    className="hidden dark:block"
                                        src={`/images/categories/${category}--dark-theme.svg`}
                                        alt={`${category}-category-image`} />
                            </Link>
                        </Button>
                        <h4 className="text-darker dark:text-lighter">{category}</h4>
                    </div>
                ))
            }
        </main>
    )
}