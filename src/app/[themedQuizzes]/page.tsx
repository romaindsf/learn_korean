'use client'
import { useParams } from "next/navigation";

export default function QuizzPage() {
    const { theme } = useParams<{ theme: string }>();
    console.log(theme);
    return (
        <h1> {theme}&apos;s quizz </h1>
    )

}