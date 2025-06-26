// app/components/ParallaxBlog.tsx
'use client';

import React, { useState, useMemo, useEffect, useRef } from 'react';
import BlogCard from "./BlogCard";
import { blogPosts, featuredPosts } from "../../data/blogData";
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import Searchbar from "./Searchbar";
import CategoryFilter from "./CategoryFilter";
import { Spotlight } from "../ui/Spotlight";
import { FloatingDock } from "../ui/FloatingDock";

const links = [
    {
        title: "Home",
        href: "#",
    },

    {
        title: "Products",
        href: "#",
    },
    {
        title: "Components",
        href: "#",
    },
    {
        title: "Aceternity UI",
        href: "#",
    },
    {
        title: "Changelog",
        href: "#",
    },
    {
        title: "Twitter",
        href: "#",
    },
    {
        title: "GitHub",
        href: "#",
    },
];

const ParallaxBlog = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');

    const categories = ['All', 'UI/UX Design', 'Web Development', 'Mobile Apps', 'AI/ML', 'Productivity'];

    const filteredPosts = useMemo(() => {
        return blogPosts.filter(post => {
            const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                post.description.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
            return matchesSearch && matchesCategory;
        });
    }, [searchQuery, selectedCategory]);

    const wrapperRef = useRef(null);
    const contentRef = useRef(null);
    const rightRef = useRef(null);
    const leftRef = useRef(null);
    const [scrollHeight, setScrollHeight] = useState(0);

    useEffect(() => {
        if (!wrapperRef.current || !rightRef.current || !contentRef.current || !leftRef.current) return;

        gsap.registerPlugin(ScrollTrigger);

        const rightHeight = rightRef.current.scrollHeight;
        const leftHeight = leftRef.current.offsetHeight;
        const scrollDistance = rightHeight - leftHeight;

        // ✅ Set total scroll space to wrapperRef
        if (wrapperRef.current) {
            wrapperRef.current.style.height = `${scrollDistance + leftHeight}px`;
        }

        // First phase: right column scrolls while left is fixed
        gsap.to(rightRef.current, {
            y: -scrollDistance,
            ease: 'none',
            scrollTrigger: {
                trigger: wrapperRef.current,
                start: 'top top',
                end: `+=${scrollDistance}`,
                scrub: true,
                pin: contentRef.current,
                anticipatePin: 1,
            },
        });

        // Second phase: left and right scroll together
        gsap.to(contentRef.current, {
            y: -leftHeight,
            ease: 'none',
            scrollTrigger: {
                trigger: wrapperRef.current,
                start: `top+=${scrollDistance} top`,
                end: `+=${leftHeight}`,
                scrub: true,
            },
        });
    }, []);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <Spotlight
                className="-top-40 left-0 md:-top-20 2xl:left-60"
                fill="white"
            />
            <FloatingDock items={links} />
            <div className="relative z-10 mx-auto w-full max-w-7xl flex flex-col gap-5 mb-12 p-4 pt-20 md:pt-0">
                <h1 className="bg-opacity-50 bg-gradient-to-b from-neutral-50 to-neutral-400 bg-clip-text text-4xl font-bold text-transparent md:text-7xl">
                    Blog
                </h1>
                <CategoryFilter
                    categories={categories}
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                />
            </div>
            {/* <div className="mb-12 space-y-6">
                <Searchbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

            </div> */}

            <section ref={wrapperRef} className="relative h-auto text-white">
                <div ref={contentRef} className="flex items-start gap-12 sticky top-0 will-change-transform">
                    {/* Left Blog */}
                    <div
                        ref={leftRef}
                        className="w-2/3 h-[500px] sticky top-12 flex items-start justify-start"
                    >
                        <BlogCard post={featuredPosts[0]} featured index={0} />
                    </div>

                    {/* Right Blogs */}
                    <div ref={rightRef} className="w-1/3 flex flex-col gap-6">
                        {filteredPosts.slice(1, 5).map((post, index) => (
                            <div key={post.id} className="h-1/3">
                                <BlogCard post={post} index={index} />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="mt-12">
                <h2 className="max-w-7xl mx-auto text-2xl font-bold text-white mb-8">Latest Articles</h2>
                {filteredPosts.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                        {filteredPosts.slice(1).map((post, index) => (
                            <BlogCard key={post.id} post={post} index={index} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <p className="text-gray-500 text-lg">No articles found matching your criteria.</p>
                    </div>
                )}
            </section>
        </div>
    );
};

export default ParallaxBlog;
