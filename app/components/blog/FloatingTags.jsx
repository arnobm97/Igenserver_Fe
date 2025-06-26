import { Badge } from "lucide-react"

const FloatingTgs = ({ tags }) => {
    return (
        <div className="flex flex-wrap gap-3 mb-8">
            {tags.map((tag, index) => (
                <Badge
                    key={tag}
                    variant="secondary"
                    className="px-3 py-1 text-sm font-medium bg-gradient-to-r from-blue-50 to-purple-50 text-gray-700 border border-blue-100 hover:border-blue-200 transition-all duration-300 hover:shadow-sm hover:-translate-y-0.5 cursor-pointer"
                    style={{
                        animationDelay: `${index * 100}ms`
                    }}
                >
                    #{tag}
                </Badge>
            ))}
        </div>
    )
}
export default FloatingTgs