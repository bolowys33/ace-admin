import { Container } from "@mui/material";

const LoadingPost = () => {
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
 
export default LoadingPost;