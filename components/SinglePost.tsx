import useSinglePost from "@/hooks/useSinglePost";
import { Container } from "@mui/material";
import Link from "next/link";

const SinglePost = ({ url }: { url: string }) => {
    const { post, error, isFetching } = useSinglePost(url);

    if (isFetching) {
        return (
            <Container
                maxWidth="md"
                className="space-y-4 font-poppins text-justify font-medium p-5">
                <div className="text-center my-5 space-y-2">
                    <div className="h-10 bg-gray-300 animate-pulse rounded-md"></div>
                    <div className="h-4 bg-gray-300 animate-pulse w-48 mx-auto rounded-md"></div>
                </div>
                <div className="h-16 bg-gray-300 animate-pulse rounded-md"></div>
                <div className="h-10 bg-gray-300 animate-pulse rounded-md"></div>
                <div className="h-16 bg-gray-300 animate-pulse rounded-md"></div>
                <div className="h-16 bg-gray-300 animate-pulse rounded-md"></div>
                <div className="h-10 bg-gray-300 animate-pulse rounded-md"></div>
            </Container>
        );
    }

    if (error) {
        return (
            <div className="grid bg-[#182237] my-3 p-5 rounded-lg h-[500px] w-full">
                <h3 className="place-self-center text-xl">
                    Error fetching post, check your network and try again
                </h3>
            </div>
        );
    }

    return (
        <div className="bg-[#182237] my-3 p-5 rounded-lg h-[500px]">
            {!isFetching && !post ? (
                <div className="grid bg-[#182237] my-3 p-5 rounded-lg h-[500px] w-full">
                    <h3 className="place-self-center text-xl">
                        Post not found, click{" "}
                        <Link href="/posts" className="underline text-blue-500">
                            here
                        </Link>{" "}
                        to view all posts
                    </h3>
                </div>
            ) : (
                <Container
                    maxWidth="md"
                    className="space-y-4 font-poppins text-justify font-medium">
                    <div className="text-center my-5 space-y-2">
                        <h1 className="font-bold text-2xl md:text-4xl ">
                            Immovable Assets as Securities; The New Era
                        </h1>
                        <p className="text-[#b7bac1] text-sm">
                            20th February 2024 | 15 comments
                        </p>
                    </div>
                    <p>
                        Lorem ipsum, dolor sit amet consectetur adipisicing
                        elit. Nisi exercitationem aperiam vel ea corrupti quidem
                        eum ad numquam vero fuga, itaque corporis officia
                        expedita quos? Enim doloremque tempora sed ducimus!
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Maxime accusamus ullam quis perferendis deleniti ut
                        officiis, fuga inventore? Eius amet molestiae
                        architecto, adipisci nisi debitis fuga iusto sapiente
                        provident eveniet?
                    </p>
                    <p>
                        Lorem ipsum dolor sit, amet consectetur adipisicing
                        elit. Pariatur itaque ab, asperiores repudiandae aliquam
                        accusamus. Explicabo similique cum ipsa delectus qui
                        tenetur deleniti laborum recusandae repellendus. Iusto
                        maiores voluptates iste!
                    </p>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Quia repellat eum dolorum nostrum neque vitae nisi quasi
                        mollitia nihil recusandae temporibus autem delectus cum
                        modi, blanditiis, officiis maiores alias ipsa?
                    </p>
                </Container>
            )}
        </div>
    );
};

export default SinglePost;
