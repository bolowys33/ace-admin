import { useState } from "react"

interface Comments {
    _id: string;
    author: string;
    body: string;
}

const useComment = () => {
    const [comments, setComments] = useState<Comments | null>(null)
}