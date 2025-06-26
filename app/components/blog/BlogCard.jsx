import { ArrowRight, Calendar, User } from "lucide-react";
import Link from "next/link";

const BlogCard = ({ post, featured = false, index = 0 }) => {
    const cardClass = featured
        ? "group relative w-full h-full flex flex-col gap-3 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-[1.02] cursor-pointer"
        : "group relative w-full h-full flex flex-col gap-3 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer";

    const contentClass = featured
        ? "relative z-10 flex flex-col justify-end"
        : "relative z-10 flex flex-col justify-end";

    return (
        <Link key={post.id} href={`/blog/${post.slug}`}
            className={cardClass}
            style={{ animationDelay: `${index * 100}ms` }}
        >
            <div className={`relative ${featured ? 'h-[400px]' : 'h-[250px]'}`}>
                {/* Gradient Background */}
                <div
                    className={`absolute inset-0 ${post.gradient} opacity-90 group-hover:opacity-100 transition-opacity duration-300`}
                />

                {/* Overlay for better text readability */}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />

                {/* Decorative elements */}
                <div className="absolute top-6 right-6 w-12 h-12 bg-white/20 backdrop-blur-sm opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
                <div className="absolute top-12 right-12 w-6 h-6 bg-white/30 backdrop-blur-sm opacity-40 group-hover:opacity-60 transition-opacity duration-300" />
            </div>

            <div className={contentClass}>

                {/* Title */}
                <h3 className={`font-medium text-white mb-3 group-hover:text-opacity-90 transition-colors duration-300 ${featured ? 'text-2xl md:text-3xl leading-tight' : 'text-xl leading-tight'
                    }`}>
                    {post.title}
                </h3>

                {/* Meta Information */}
                <div className="flex items-center justify-between text-white/80">
                    <div className="flex items-center space-x-4">
                        <p className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-sm font-medium">
                            {post.category}
                        </p>
                        <div className="flex items-center space-x-2">
                            <Calendar size={16} />
                            <span className="text-sm">{post.date}</span>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}
export default BlogCard