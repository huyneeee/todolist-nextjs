import React, { useEffect } from "react";
import { Typography, Input, Button, Form, message, Spin } from "antd";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { addTodo } from "@redux/actions";
import { useRouter } from "next/router";
import { useMutation, useQueryClient, useQuery } from "react-query";
const getTodo = (id: number) => {
    return fetch(`https://6161545037492500176312c5.mockapi.io/todo/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((response) => response.json())
        .then((data) => data);
};
const DetailTodo: React.FC = () => {
    const router = useRouter();
    const { id } = router.query;
    const { data, isLoading } = useQuery(["getTodo", id], () => getTodo(id));
    console.log("data", data);
    return (
        <div
            style={{
                backgroundColor: "#282c34",
                color: "#fff",
                textAlign: "center",
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
            }}
        >
            {isLoading && <Spin />}
            Name: {data?.name}
            <Button
                type="primary"
                onClick={() => {
                    router.push("/");
                }}
            >
                Back list
            </Button>
        </div>
    );
};

export default DetailTodo;
