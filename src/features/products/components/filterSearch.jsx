import { useProducts } from "../hooks/useProducts"

export default function FilterSearch({ cat, setCat }) {
    const { products } = useProducts()
    const categories = [...new Set(products.map(product => product.category))];

    return (
        <div className="flex">
            <select
                className="border p-3 rounded-2xl"
                value={cat}
                onChange={(e) => setCat(e.target.value)}
            >
                <option value="all">All</option>
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <div className="ml-4 ">
                <input type="text" placeholder="add subjectory" className="border p-3 rounded-2xl"/>
                
            </div>
        </div>
    )
}