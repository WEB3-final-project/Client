"use client";

import { useEffect, useState } from "react";

import {
    createQuestion,
    getQuestions,
    upvoteQuestion
} from "@/lib/api/question";
export default function QuestionSection({
    sessionId,
}) {
    const [upvotedQuestions, setUpvotedQuestions] =
        useState([]);
    const [questions, setQuestions] =
        useState([]);

    const [content, setContent] =
        useState("");

    const [authorName, setAuthorName] =
        useState("");

    async function loadQuestions() {
        const data = await getQuestions(
            sessionId
        );

        setQuestions(data);
    }

    useEffect(() => {
        const saved =
            JSON.parse(
                localStorage.getItem(
                    "upvotedQuestions"
                ) || "[]"
            );

        setUpvotedQuestions(saved);
        loadQuestions();
    }, []);

    async function handleSubmit(e) {
        e.preventDefault();

        if (!content.trim()) return;

        await createQuestion({
            content,
            author_name: authorName,
            session_id: sessionId,
        });

        setContent("");
        setAuthorName("");

        loadQuestions();
    }

    async function handleUpvote(id) {

        if (
            upvotedQuestions.includes(id)
        ) {
            return;
        }

        await upvoteQuestion(id);

        const updated = [
            ...upvotedQuestions,
            id,
        ];

        setUpvotedQuestions(updated);

        localStorage.setItem(
            "upvotedQuestions",
            JSON.stringify(updated)
        );

        loadQuestions();
    }

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold">
                Questions
            </h2>

            <form
                onSubmit={handleSubmit}
                className="space-y-4"
            >
                <input
                    type="text"
                    placeholder="Your name"
                    value={authorName}
                    onChange={(e) =>
                        setAuthorName(
                            e.target.value
                        )
                    }
                    className="
            border
            p-2
            rounded
            w-full
          "
                />

                <textarea
                    placeholder="Your question"
                    value={content}
                    onChange={(e) =>
                        setContent(e.target.value)
                    }
                    className="
            border
            p-2
            rounded
            w-full
          "
                />

                <button
                    className="
            bg-black
            text-white
            px-4
            py-2
            rounded
          "
                >
                    Ask Question
                </button>
            </form>

            <div className="space-y-4">
                {questions.map((question) => (
                    <div
                        key={question.id}
                        className="
              border
              rounded
              p-4
            "
                    >
                        <div className="font-semibold">
                            {question.author_name}
                        </div>

                        <p className="mt-2">
                            {question.content}
                        </p>

                        <button
                            onClick={() =>
                                handleUpvote(question.id)
                            }
                            disabled={upvotedQuestions.includes(
                                question.id
                            )}
                            className="
    mt-3
    disabled:opacity-50
    disabled:cursor-not-allowed
  "
                        >
                            👍 {question.upvotes}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}