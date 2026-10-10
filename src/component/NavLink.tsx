import Link from "next/link";

interface Category {
id: string;
slug: string;
nameBn: string;
icon: string;
}

const NavLink = async () => {
const res = await fetch(
"https://openapi.programming-hero.com/api/bazardor/categories",
{
next: { revalidate: 3600 },
}
);

if (!res.ok) {
throw new Error("Category data load failed");
}

const data: Category[] = await res.json();

return ( <nav className="pt-6"> <div className="flex flex-wrap gap-3">
{data.map((item) => (
<Link
key={item.id}
href={`/products/${encodeURIComponent(item.slug)}`}
className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition duration-200 hover:border-green-200 hover:bg-green-50 hover:text-green-700"
> <span>{item.icon}</span> <span>{item.nameBn}</span> </Link>
))} </div> </nav>
);
};

export default NavLink;
