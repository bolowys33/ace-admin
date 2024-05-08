import { Container } from "@mui/material";

const PostPage = ({ params }: { params: { url: string } }) => {
    const { url } = params;

    return (
        <div className="bg-[#182237] my-3 p-5 rounded-lg h-[500px]">
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
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Nisi exercitationem aperiam vel ea corrupti quidem eum ad
                    numquam vero fuga, itaque corporis officia expedita quos?
                    Enim doloremque tempora sed ducimus! Lorem ipsum dolor sit
                    amet consectetur adipisicing elit. Maxime accusamus ullam
                    quis perferendis deleniti ut officiis, fuga inventore? Eius
                    amet molestiae architecto, adipisci nisi debitis fuga iusto
                    sapiente provident eveniet?
                </p>
                <p>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Pariatur itaque ab, asperiores repudiandae aliquam
                    accusamus. Explicabo similique cum ipsa delectus qui tenetur
                    deleniti laborum recusandae repellendus. Iusto maiores
                    voluptates iste!
                </p>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quia repellat eum dolorum nostrum neque vitae nisi quasi
                    mollitia nihil recusandae temporibus autem delectus cum
                    modi, blanditiis, officiis maiores alias ipsa?
                </p>
            </Container>
        </div>
    );
};

export default PostPage;
