const CategoryFilter = ({
    categories,
    selectedCategory,
    setSelectedCategory
}) => {
    return (
        <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
                <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`text-base font-semibold transition-colors hover:text-white ${selectedCategory === category ? "text-white" : "text-gray-400 hover:text-gray-300"
                        }`}
                >
                    {category}
                </button>
            ))}
        </div>
    )
}
export default CategoryFilter