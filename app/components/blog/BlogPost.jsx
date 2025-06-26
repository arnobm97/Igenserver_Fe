import { Calendar, Clock, User, Share2, Bookmark, Heart } from "lucide-react";
import FloatingTags from "./FloatingTags";
import FeaturedImage from "./FeaturedImage";
// import { Button } from "../ui/button";

const BlogPost = ({ post }) => {
    const { type } = post;

    switch (type) {
        case 'standard':
            return <StandardTemplate post={post} />;
        case 'featured':
            return <FeaturedTemplate post={post} />;
        case 'video':
            return <VideoTemplate post={post} />;
        default:
            return <div>Unknown template type</div>;
    }

    return (
        <article className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-8 lg:p-12">

                {/* Article Header */}
                <header className="mb-8">
                    <h1 className="text-4xl lg:text-5xl font-serif font-bold text-gray-900 leading-tight mb-6">
                        Building Modern Web Applications with React and TypeScript
                    </h1>

                    <p className="text-xl text-gray-600 leading-relaxed mb-8 font-light">
                        Explore the latest techniques and best practices for creating scalable,
                        maintainable web applications that users love. From component architecture
                        to performance optimization.
                    </p>

                    {/* Article Meta */}
                    <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 border-b border-gray-100 pb-6">
                        <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <span>Dec 15, 2024</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            <span>8 min read</span>
                        </div>
                    </div>
                </header>

                <FeaturedImage />

                {/* Article Body */}
                <div className="prose prose-lg max-w-none">
                    <p className="text-gray-700 leading-relaxed mb-6 text-lg">
                        In the rapidly evolving landscape of web development, creating applications that are both
                        performant and maintainable has become more crucial than ever. React and TypeScript have
                        emerged as the perfect combination for building robust, scalable applications.
                    </p>

                    <h2 className="text-2xl font-serif font-semibold text-gray-900 mt-12 mb-6">
                        The Foundation: Setting Up Your Development Environment
                    </h2>

                    <p className="text-gray-700 leading-relaxed mb-6">
                        Before diving into code, it's essential to establish a solid foundation. Modern development
                        requires thoughtful tooling choices that enhance productivity while maintaining code quality.
                        Let's explore the key components of a professional React-TypeScript setup.
                    </p>

                    <div className="bg-gray-50 rounded-xl p-6 my-8 border-l-4 border-blue-200">
                        <h3 className="font-semibold text-gray-900 mb-3">Pro Tip</h3>
                        <p className="text-gray-700 leading-relaxed">
                            Always start with a clear project structure. Organize your components, hooks, and utilities
                            in a way that scales with your team and project complexity.
                        </p>
                    </div>

                    <h2 className="text-2xl font-serif font-semibold text-gray-900 mt-12 mb-6">
                        Component Architecture Patterns
                    </h2>

                    <p className="text-gray-700 leading-relaxed mb-6">
                        Effective component architecture is the backbone of maintainable React applications.
                        By following established patterns and principles, you can create components that are
                        reusable, testable, and easy to understand.
                    </p>

                    <ul className="space-y-3 mb-8 text-gray-700">
                        <li className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                            <span>Composition over inheritance for flexible component design</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                            <span>Single responsibility principle for focused components</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                            <span>Custom hooks for shared logic and state management</span>
                        </li>
                    </ul>

                    <h2 className="text-2xl font-serif font-semibold text-gray-900 mt-12 mb-6">
                        Performance Optimization Strategies
                    </h2>

                    <p className="text-gray-700 leading-relaxed mb-6">
                        Performance isn't just about fast loading times—it's about creating smooth, responsive
                        user experiences that feel natural and intuitive. Here are the key strategies that make
                        the difference between good and exceptional web applications.
                    </p>

                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-8 my-8">
                        <h3 className="font-semibold text-gray-900 mb-4 text-lg">Key Performance Metrics</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="text-center">
                                <div className="text-2xl font-bold text-blue-600 mb-2">&lt; 100ms</div>
                                <div className="text-sm text-gray-600">First Input Delay</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-purple-600 mb-2">&lt; 2.5s</div>
                                <div className="text-sm text-gray-600">Largest Contentful Paint</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-green-600 mb-2">&lt; 0.1</div>
                                <div className="text-sm text-gray-600">Cumulative Layout Shift</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </article>
    );
}

export default BlogPost;