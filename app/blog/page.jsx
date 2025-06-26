import BlogList from "../components/blog/BlogList"

const page = () => {
    return (
        <div className="h-screen overflow-y-scroll z-10">
            <BlogList />
        </div>
    )
}
export default page