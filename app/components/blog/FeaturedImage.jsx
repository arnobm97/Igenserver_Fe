const FeaturedImage = () => {
    return (
        <div className="relative h-64 lg:h-80 overflow-hidden">
            <img
                src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
                alt="A MacBook with lines of code on its screen on a busy desk"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
        </div>
    )
}
export default FeaturedImage